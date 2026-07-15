export default function ShippingPolicyPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-4 text-center">Shipping Policy</h1>
        <p className="text-center text-dark-brown/70 font-light mb-16">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[20px] shadow-sm border border-gray-100 space-y-8 text-dark-brown font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">Processing Time</h2>
            <p>All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">Domestic Shipping Rates and Estimates</h2>
            <p>We offer free standard shipping on all orders within India. For expedited shipping options, shipping charges for your order will be calculated and displayed at checkout.</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-cream/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Shipping Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Estimated Delivery</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-brown">Standard Shipping</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-brown">4-7 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-brown">Free</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-brown">Express Shipping</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-brown">2-3 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-brown">₹150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">International Shipping</h2>
            <p>At this time, we only ship within India. We are working hard to expand our delivery network internationally and will update this policy once international shipping becomes available.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary-brown mb-4">How do I check the status of my order?</h2>
            <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
            <p className="mt-4">If you haven’t received your order within 7 days of receiving your shipping confirmation email, please contact us at support@seeeraskincare.com with your name and order number, and we will look into it for you.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
