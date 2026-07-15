export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-4 text-center">Privacy Policy</h1>
        <p className="text-center text-dark-brown/70 font-light mb-16">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[20px] shadow-sm border border-gray-100 space-y-8 text-dark-brown font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">1. Introduction</h2>
            <p>Welcome to SeeEra Skincare ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at support@seeeraskincare.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">2. Information We Collect</h2>
            <p className="mb-2">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, or otherwise when you contact us. This may include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Names, phone numbers, email addresses, and mailing addresses</li>
              <li>Billing and shipping addresses</li>
              <li>Passwords and contact preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">3. How We Use Your Information</h2>
            <p className="mb-2">We use personal information collected via our website for a variety of business purposes described below:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To facilitate account creation and logon process</li>
              <li>To fulfill and manage your orders and payments</li>
              <li>To send administrative information to you (e.g., product updates, policy changes)</li>
              <li>To send you marketing and promotional communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">4. Will Your Information Be Shared?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">5. Contact Us</h2>
            <p>If you have questions or comments about this notice, you may email us at support@seeeraskincare.com or by post to:</p>
            <address className="mt-4 not-italic">
              SeeEra Skincare<br />
              BHAIRAV RESIDENCY, Beverly Park<br />
              Mira Bhayandar, Mumbai, Maharashtra 401107
            </address>
          </section>
        </div>
      </div>
    </main>
  );
}
