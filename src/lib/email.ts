import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_for_build');

export interface LeadNotificationData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  sourceUrl?: string;
  createdAt: Date;
}

/**
 * Send lead notification email to admin
 */
export async function sendLeadNotification(lead: LeadNotificationData) {
  if (!process.env.ADMIN_EMAIL) {
    console.warn('ADMIN_EMAIL not set, skipping notification');
    return null;
  }

  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0f172a; color: white; padding: 20px; border-radius: 8px; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { margin: 20px 0; }
            .field { margin: 15px 0; border-bottom: 1px solid #eee; padding-bottom: 15px; }
            .label { font-weight: bold; color: #0284c7; }
            .value { margin-top: 5px; word-break: break-word; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
            .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0284c7; color: white; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Nowy Lead</h1>
              <p>Właśnie dotarło do Ciebie nowe zgłoszenie z formularz kontaktowego.</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Imię i Nazwisko</div>
                <div class="value">${escapeHtml(lead.name)}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></div>
              </div>
              
              ${lead.phone ? `
              <div class="field">
                <div class="label">Telefon</div>
                <div class="value"><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></div>
              </div>
              ` : ''}
              
              ${lead.subject ? `
              <div class="field">
                <div class="label">Temat</div>
                <div class="value">${escapeHtml(lead.subject)}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Wiadomość</div>
                <div class="value">${escapeHtml(lead.message).replace(/\n/g, '<br>')}</div>
              </div>
              
              ${lead.sourceUrl ? `
              <div class="field">
                <div class="label">Źródło</div>
                <div class="value"><a href="${escapeHtml(lead.sourceUrl)}" target="_blank">${escapeHtml(lead.sourceUrl)}</a></div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Data i Czas</div>
                <div class="value">${new Date(lead.createdAt).toLocaleString('pl-PL')}</div>
              </div>
            </div>
            

            <div class="footer">
              <p>To jest automatyczna wiadomość z formularza kontaktowego Archeya.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Archeya <hello@getarcheya.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `[Kontakt - ${lead.subject || 'Ogólne'}] Nowe zgłoszenie od ${lead.name}`,
      html,
      replyTo: lead.email,
    });

    return result;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
