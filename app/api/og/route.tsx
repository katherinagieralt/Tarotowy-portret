import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Tarotowy Portret';
    const description = searchParams.get('description') || 'Agency Landing Page Boilerplate';
    const type = searchParams.get('type') || 'landing'; // landing, blog, project

    // Determine style based on type
    const styles = getStyleByType(type);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: styles.bgColor,
            backgroundImage: styles.bgGradient,
            padding: '60px',
            justifyContent: 'space-between',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {/* Header with logo/brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(2, 132, 199, 0.8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              M
            </div>
            <span style={{ color: styles.accentColor, fontSize: '18px', fontWeight: '600' }}>
              Tarot
            </span>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Gradient title */}
            <div
              style={{
                display: 'flex',
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#fff',
                lineHeight: '1.2',
                maxWidth: '900px',
                background: styles.textGradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  maxWidth: '700px',
                  lineHeight: '1.4',
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer with metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '16px' }}>
              tarot.pl
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <span>Next.js 16</span>
              <span>•</span>
              <span>React 19</span>
              <span>•</span>
              <span>Tailwind 4</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG image generation error:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}

/**
 * Style definitions by OG image type
 */
function getStyleByType(type: string) {
  const styles: Record<
    string,
    {
      bgColor: string;
      bgGradient: string;
      textGradient: string;
      accentColor: string;
    }
  > = {
    landing: {
      bgColor: '#0f172a',
      bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      textGradient: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #10b981 100%)',
      accentColor: '#0284c7',
    },
    blog: {
      bgColor: '#1e1b4b',
      bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      textGradient: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
      accentColor: '#a78bfa',
    },
    project: {
      bgColor: '#0c4a6e',
      bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0f766e 100%)',
      textGradient: 'linear-gradient(135deg, #38bdf8 0%, #14b8a6 100%)',
      accentColor: '#38bdf8',
    },
  };

  return styles[type] || styles.landing;
}
