import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Archeya',
  description: 'Rules for processing personal data and using cookies on the Archeya platform.',
};

export default function PrivacyPolicyPageEn() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-8 sm:p-12 md:p-16 shadow-xl shadow-black/5">
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-8 mx-auto md:mx-0"></div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-500 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
          
          <h2 className="text-2xl mt-10 mb-4">1. General Provisions</h2>
          <p>
            This Privacy Policy sets out the rules for the processing and protection of personal data provided by Users in connection with their use of the <strong>Archeya</strong> platform (hereinafter: the "Service").
          </p>
          <p>
            We value your trust, which is why we ensure that all your data, including sensitive information such as your date of birth (necessary to calculate your Tarot Portrait), is treated with the utmost confidentiality, in accordance with the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR).
          </p>

          <h2 className="text-2xl mt-10 mb-4">2. Data Controller</h2>
          <p>
            The controller of your personal data is <strong>Katarzyna Gierałt</strong>, conducting unregistered business activity at: ul. Okęcka 7/14, 02-658 Warsaw, Poland, operating within the Archeya platform. 
            Any questions regarding data processing can be directed to the e-mail address: <strong>hello@getarcheya.com</strong>.
          </p>

          <h2 className="text-2xl mt-10 mb-4">3. What data do we collect and why?</h2>
          <p>When using the Service, we collect and process the following data:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Data necessary to provide the service:</strong> Name, date of birth (yours and possibly the second person's), e-mail address. The legal basis is Art. 6(1)(b) GDPR (necessity for the performance of a contract).</li>
            <li><strong>Billing and payment data:</strong> Processed through secure external payment operators (e.g., Stripe). The legal basis is Art. 6(1)(c) GDPR (legal obligation).</li>
            <li><strong>Communication data:</strong> If you contact us via e-mail, we process your e-mail address and the content of the message. The legal basis is Art. 6(1)(f) GDPR (our legitimate interest).</li>
            <li><strong>Marketing (Newsletter):</strong> With your explicit consent, we may send you inspiration and educational materials (Art. 6(1)(a) GDPR).</li>
          </ul>
          
          <div className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-4 my-8 rounded-r-lg">
            <p className="text-sm m-0 text-amber-900 dark:text-amber-200">
              <strong>Remember:</strong> Your date of birth is used EXCLUSIVELY to generate your archetypal psychological profile. We never share it with third parties.
            </p>
          </div>

          <h2 className="text-2xl mt-10 mb-4">4. Who do we share data with?</h2>
          <p>
            Your personal data may be transferred only to trusted third-party entities (so-called processors) to the minimum extent necessary for the functioning of the Service. These include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Hosting and database service providers.</li>
            <li>Payment system operators (e.g., Stripe) to process transactions.</li>
            <li>Mailing service providers (for automated delivery of ordered PDF files).</li>
            <li>Accounting offices for accounting purposes.</li>
          </ul>
          <p>
            All collaborating entities guarantee the application of appropriate personal data protection and security measures required by law.
          </p>

          <h2 className="text-2xl mt-10 mb-4">5. Cookies</h2>
          <p>
            Our Service uses cookies (small text files stored on your device). They are used for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Essential cookies:</strong> Ensuring the proper functioning of the site (e.g., remembering your dark/light theme choice, maintaining payment sessions).</li>
            <li><strong>Analytical cookies:</strong> (Google Analytics, Vercel Analytics) for analyzing site traffic without identifying specific individuals, which allows us to improve the site.</li>
          </ul>
          <p>
            You can change your browser settings regarding cookies at any time.
          </p>

          <h2 className="text-2xl mt-10 mb-4">6. How long do we keep your data?</h2>
          <p>
            We store your data only for the period necessary to achieve the purposes for which it was collected:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Generated PDF reports and their input data (name, date of birth) are kept for the time needed to process the order and potential complaints (usually up to 30 days).</li>
            <li>Accounting and billing data are stored for 5 years from the end of the calendar year (legal obligation).</li>
            <li>In the case of subscribing to a newsletter, until you withdraw your consent.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">7. Your rights</h2>
          <p>In accordance with GDPR regulations, you have full right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Access</strong> your data and request a copy of it,</li>
            <li><strong>Rectify</strong> your data if it is incorrect or incomplete,</li>
            <li><strong>Delete</strong> your data (the "right to be forgotten"), unless we have a legal obligation to store it longer,</li>
            <li><strong>Restrict processing</strong>,</li>
            <li><strong>Portability</strong> of data,</li>
            <li><strong>Withdraw consent</strong> at any time (which does not affect the lawfulness of processing based on consent before its withdrawal),</li>
            <li><strong>Lodge a complaint</strong> with the supervisory authority if you believe that the processing violates the regulations.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">8. Changes to the Privacy Policy</h2>
          <p>
            We reserve the right to make changes to the Privacy Policy in connection with the development of Internet technology, changes in the law, or the development of our Service. We will inform about any significant changes in a visible and understandable way on our website.
          </p>

        </div>
      </div>
    </main>
  );
}
