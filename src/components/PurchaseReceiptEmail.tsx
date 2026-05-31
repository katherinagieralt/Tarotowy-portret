export interface PurchaseReceiptEmailProps {
  email: string;
  downloadLink: string;
  reportType: string;
  baseUrl: string;
  locale?: string;
}

export function PurchaseReceiptEmail({
  email,
  downloadLink,
  reportType,
  baseUrl,
  locale = "pl",
}: PurchaseReceiptEmailProps) {
  const isEnglish = locale === "en";

  const reportTypeNamePl = reportType === 'INDIVIDUAL' ? 'Portret Indywidualny' : 'Portret Partnerski';
  const reportTypeNameEn = reportType === 'INDIVIDUAL' ? 'Individual Portrait' : 'Partnership Portrait';
  const reportTypeName = isEnglish ? reportTypeNameEn : reportTypeNamePl;

  const textGreeting = isEnglish ? "Thank you for your purchase!" : "Dziękujemy za zakup!";
  const textBodyHtml = isEnglish 
    ? `Your <strong>${reportTypeName}</strong> has been successfully generated and is ready to download.`
    : `Twój <strong>${reportTypeName}</strong> został pomyślnie wygenerowany i jest gotowy do odbioru.`;
  const textButton = isEnglish ? "Download My Report" : "Odbierz Mój Raport";
  const textFallback = isEnglish 
    ? "If the button doesn't work, copy and paste this link into your browser:"
    : "Jeżeli przycisk nie działa, skopiuj ten link do przeglądarki:";
  const textDisclaimer = isEnglish 
    ? "The report was generated automatically for self-exploration purposes. Remember that final decisions and interpretations are solely yours."
    : "Raport wygenerowano automatycznie w celach samopoznawczych. Pamiętaj, że ostateczne decyzje i interpretacje należą wyłącznie do Ciebie.";
  const textRights = isEnglish ? "© 2026 Archeya. All rights reserved." : "© 2026 Archeya. Wszystkie prawa zastrzeżone.";
  const textSentTo = isEnglish ? "Sent to:" : "Wysłano na adres:";

  return {
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; background: #f3f4f6; margin: 0; padding: 0; }
            .wrapper { padding: 40px 20px; }
            .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { padding: 40px 40px 20px 40px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 300; letter-spacing: 0.05em; color: #111827; font-family: Georgia, serif; }
            .content { padding: 20px 40px 40px 40px; text-align: center; }
            .greeting { font-size: 18px; font-weight: 500; color: #111827; margin-bottom: 16px; }
            .body-text { font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 24px; }
            .button { display: inline-block; margin: 10px 0 30px 0; padding: 14px 32px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; letter-spacing: 0.02em; }
            .divider { border: none; border-top: 1px solid #e5e7eb; margin: 30px 0; }
            .footer { background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { font-size: 12px; color: #6b7280; margin: 4px 0; }
            .disclaimer { font-size: 12px; color: #9ca3af; line-height: 1.5; margin-top: 15px; }
            .link-fallback { font-size: 13px; color: #6b7280; word-break: break-all; margin-top: 20px; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <img src="${baseUrl}/Logo/PNG/archeya-logo-vertical-dark.png" alt="Archeya" style="max-width: 140px; height: auto; display: inline-block; margin: 0 auto;" />
              </div>
              
              <div class="content" style="padding: 20px 40px 40px 40px; text-align: center; color: #111827;">
                <div class="greeting" style="font-size: 18px; font-weight: 500; margin-bottom: 16px;">${textGreeting}</div>
                <p class="body-text" style="font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 24px;">
                  ${textBodyHtml}
                </p>
                
                <center>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 10px auto 30px auto;">
                    <tr>
                      <td align="center" bgcolor="#111827" style="border-radius: 6px;">
                        <a href="${downloadLink}" style="display: inline-block; padding: 14px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 500; letter-spacing: 0.02em; border: 1px solid #111827; border-radius: 6px;">${textButton}</a>
                      </td>
                    </tr>
                  </table>
                </center>
                
                <p class="link-fallback">
                  ${textFallback}<br>
                  <a href="${downloadLink}" style="color: #4b5563; text-decoration: underline;">${downloadLink}</a>
                </p>
                
                <hr class="divider">
                
                <p class="disclaimer">
                  ${textDisclaimer}
                </p>
              </div>
              
              <div class="footer">
                <p class="footer-text">${textRights}</p>
                <p class="footer-text">${textSentTo} ${email}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: isEnglish ? `
Archeya - Report Ready!

Thank you for your purchase!

Your report "${reportTypeName}" has been generated and is ready to download.

Click the link below to download your PDF:
${downloadLink}

---

If the link does not work, copy and paste the URL above into your browser.

---

This report was generated automatically based on your date of birth. 
It is intended solely for self-exploration and personal development purposes.

© 2026 Archeya
    ` : `
Archeya - Raport Gotowy!

Dziękujemy za zakup!

Twój raport "${reportTypeName}" został wygenerowany i jest gotowy do pobrania.

Kliknij na poniższy link, aby pobrać plik PDF:
${downloadLink}

---

Jeśli link nie działa, skopiuj powyższy URL do przeglądarki.

---

Ten raport został wygenerowany automatycznie na podstawie Twojej daty urodzenia. 
Jest przeznaczony wyłącznie do celów rozwojowych i samopoznawczych.

© 2026 Archeya
    `,
  };
}
