import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Archeya',
  description: 'Terms and conditions for providing electronic services in the Archeya platform.',
};

export default function TermsAndConditionsPageEn() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-8 sm:p-12 md:p-16 shadow-xl shadow-black/5">
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Terms and Conditions
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-8 mx-auto md:mx-0"></div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-500 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
          
          <h2 className="text-2xl mt-10 mb-4">1. General Provisions</h2>
          <p>
            These Terms and Conditions define the general rules and methods of providing electronic services through the <strong>Archeya</strong> website (hereinafter: the "Service").
          </p>
          <p>
            The owner of the Service and the Seller is <strong>Katarzyna Gierałt</strong>, conducting unregistered business activity at: ul. Okęcka 7/14, 02-658 Warsaw, Poland (operating under the Archeya brand). Contact with the Seller is possible via e-mail at: <strong>hello@getarcheya.com</strong>.
          </p>

          <h2 className="text-2xl mt-10 mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Client/User</strong>, a natural person with full legal capacity who uses the Service.</li>
            <li><strong>Digital Product</strong>, a personalized "Tarot Portrait" report in PDF format, generated based on the birth date provided by the Client.</li>
            <li><strong>Agreement</strong>, an agreement for the provision of electronic services or a contract for the sale of a Digital Product concluded between the Client and the Seller.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">3. Type and Scope of Services</h2>
          <p>
            The Service allows Clients to generate a paid, personalized psychological profile based on Tarot archetypes. The product is strictly for educational, entertainment, and self-discovery purposes. It does not constitute psychological, medical, or legal advice.
          </p>
          <p>
            To use the Service, a device with Internet access and an up-to-date web browser are required. Receiving the Digital Product requires an active e-mail account and a program capable of opening PDF files.
          </p>

          <h2 className="text-2xl mt-10 mb-4">4. Conclusion of the Agreement and Order Execution</h2>
          <p>
            The Agreement is concluded when the Client clicks the button confirming the purchase (e.g., "Buy and pay") and completes the payment via the integrated payment operator (e.g., Stripe).
          </p>
          <p>
            After the payment is cleared, the Digital Product (PDF report) is generated automatically and sent to the e-mail address provided by the Client during the ordering process, usually within a few minutes (up to a maximum of 24 hours).
          </p>

          <div className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-4 my-8 rounded-r-lg">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 mt-0 mb-2">5. Exclusion of the Right of Withdrawal</h3>
            <p className="text-sm m-0 text-amber-900 dark:text-amber-200">
              Due to the nature of the Digital Product (digital content not supplied on a tangible medium), which is prepared and delivered immediately after payment, <strong>the Client, by consenting to the performance of the service before the expiration of the withdrawal period, loses the right to withdraw from a distance contract</strong> (in accordance with Article 38 point 13 of the Polish Consumer Rights Act).
            </p>
          </div>

          <h2 className="text-2xl mt-10 mb-4">6. Payments</h2>
          <p>
            The prices of Products presented in the Service are gross prices (including taxes). Payments are handled by secure, external operators (e.g., Stripe). The Seller does not store Clients' payment card details.
          </p>

          <h2 className="text-2xl mt-10 mb-4">7. Complaints</h2>
          <p>
            In the event of technical defects in the delivered Digital Product (e.g., the PDF file is corrupted, won't open, or has not arrived in the inbox despite payment), the Client has the right to submit a complaint.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Complaints should be sent to: <strong>hello@getarcheya.com</strong>.</li>
            <li>In the notification, please provide the e-mail address used during the order and a description of the problem.</li>
            <li>Complaints will be processed within 14 days of receipt.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">8. Intellectual Property and Terms of Use</h2>
          <p>
            The structure of the Service, source codes, branding, the unique layout of the Digital Products, and the proprietary content curation rules are legally protected and constitute the Seller's property. The Service also utilizes artificial intelligence technologies to generate personalized descriptions, and the card images are based on open licenses or public domain sources.
          </p>
          <p className="mt-4">
            Under this Agreement, the purchased PDF report is intended <strong>strictly for the Client's personal use</strong>. Regardless of the copyright status of individual components, the Client does not have the right to resell, commercially distribute, or mass-reproduce the reports generated for them without the Seller's consent.
          </p>

          <h2 className="text-2xl mt-10 mb-4">9. Final Provisions</h2>
          <p>
            In matters not covered by these Terms and Conditions, generally applicable provisions of Polish law shall apply, in particular the Civil Code and the Consumer Rights Act.
          </p>
          <p>
            The Seller reserves the right to amend the Terms and Conditions for important reasons (e.g., changes in the law). Contracts concluded before the amendment to the Terms and Conditions will be governed by the version in force at the time of purchase.
          </p>

        </div>
      </div>
    </main>
  );
}
