export default function RefundPolicyPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-4 text-center">Refund Policy</h1>
        <p className="text-center text-dark-brown/70 font-light mb-16">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[20px] shadow-sm border border-gray-100 space-y-8 text-dark-brown font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">Returns</h2>
            <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.</p>
            <p className="mt-4">To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">Refunds (if applicable)</h2>
            <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
            <p className="mt-4">If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">Late or Missing Refunds</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>If you haven’t received a refund yet, first check your bank account again.</li>
              <li>Then contact your credit card company, it may take some time before your refund is officially posted.</li>
              <li>Next contact your bank. There is often some processing time before a refund is posted.</li>
              <li>If you’ve done all of this and you still have not received your refund yet, please contact us at support@seeeraskincare.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">Shipping Returns</h2>
            <p>To return your product, you should mail your product to:</p>
            <address className="mt-4 not-italic">
              SeeEra Skincare<br />
              BHAIRAV RESIDENCY, Beverly Park<br />
              Mira Bhayandar, Mumbai, Maharashtra 401107
            </address>
            <p className="mt-4">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
