import { Button } from '@/components/ui/Button';

export default function FAQPage() {
  const faqs = [
    { question: "What skin types are your products suitable for?", answer: "Our formulations are rigorously tested and are suitable for all skin types, including sensitive and acne-prone skin. We avoid harsh irritants and focus on barrier-strengthening ingredients." },
    { question: "Are your products cruelty-free?", answer: "Yes, Seeera Skincare is 100% cruelty-free. We do not test our products or ingredients on animals at any stage of product development." },
    { question: "How long until I see results?", answer: "While some ingredients provide immediate hydration and plumping, most active ingredients like PDRN and Niacinamide take about 4-6 weeks of consistent use to show visible improvements in skin texture and tone." },
    { question: "Can I use your products while pregnant?", answer: "Most of our products are safe for use during pregnancy, as we avoid retinoids and high concentrations of salicylic acid. However, we always recommend consulting with your physician." },
    { question: "Do you ship internationally?", answer: "Currently, we ship within the US and to select international destinations. Please check our shipping page for the full list of countries." }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-dark-brown font-light">
            Everything you need to know about our products and services.
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-brown/5">
              <h3 className="text-xl font-heading text-primary-brown mb-3">{faq.question}</h3>
              <p className="text-dark-brown font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-dark-brown mb-6">Still have questions?</p>
          <Button href="/contact" size="lg" className="bg-primary-brown text-white hover:bg-dark-brown-red px-10">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
