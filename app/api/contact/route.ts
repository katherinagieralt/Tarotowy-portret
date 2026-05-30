import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/schemas/contact';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';
import { log, requestLoggerMiddleware } from '@/lib/logger';

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    log.error({ error: error instanceof Error ? error.message : 'Unknown' }, 'Turnstile verification failed');
    return false;
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Log incoming request
    requestLoggerMiddleware(req, 'POST', '/api/contact');

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      log.warn({ ip }, 'Rate limit exceeded for IP');
      return NextResponse.json(
        { error: 'Zbyt wiele zgłoszeń. Spróbuj ponownie za godzinę.' },
        { status: 429 }
      );
    }

    // 1. Parse request body
    let body;
    try {
      body = await req.json();
    } catch {
      log.error({ ip }, 'Invalid JSON in request body');
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // 2. Verify Turnstile token
    const turnstileToken = body.turnstileToken;
    if (!turnstileToken) {
      log.warn({ ip }, 'Missing Turnstile token');
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 400 }
      );
    }

    const isValidToken = await verifyTurnstile(turnstileToken);
    if (!isValidToken) {
      log.warn({ ip, token: turnstileToken }, 'Turnstile verification failed');
      return NextResponse.json(
        { error: 'Bot verification failed. Please try again.' },
        { status: 403 }
      );
    }

    log.info({ ip }, 'Turnstile verification succeeded');

    // 3. Validate input with Zod (exclude turnstileToken)
    const { turnstileToken: _, ...formData } = body;
    const result = ContactFormSchema.safeParse(formData);
    if (!result.success) {
      log.warn({ errors: result.error.flatten(), ip }, 'Contact form validation failed');
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const validatedData = result.data;

    // 4. Get source URL
    const sourceUrl =
      validatedData.sourceUrl || req.headers.get('referer') || undefined;

    // 5. Save to database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        sourceUrl: sourceUrl,
        status: 'NEW',
      },
    });

    log.db({ leadId: lead.id, email: lead.email }, 'Lead created in database');

    // 6. Send email notification
    try {
      await sendLeadNotification({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone || undefined,
        subject: lead.subject || undefined,
        message: lead.message,
        sourceUrl: lead.sourceUrl || undefined,
        createdAt: lead.createdAt,
      });

      log.info({ leadId: lead.id }, 'Email notification sent successfully');
    } catch (emailError) {
      // Log but don't fail the request
      log.error(
        { leadId: lead.id, error: emailError instanceof Error ? emailError.message : 'Unknown' },
        'Email notification failed'
      );
    }

    // 7. Return success response
    const duration = Date.now() - startTime;
    log.perf({ duration, leadId: lead.id }, 'Contact form request completed');

    return NextResponse.json(
      {
        success: true,
        message: 'Wiadomość została pomyślnie wysłana',
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log error for debugging
    const duration = Date.now() - startTime;
    log.error(
      {
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      'Contact form error'
    );

    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'Ten adres e-mail już istnieje w naszej bazie' },
          { status: 400 }
        );
      }
    }

    // Generic server error
    return NextResponse.json(
      { error: 'Nie udało się przetworzyć żądania. Spróbuj ponownie.' },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
