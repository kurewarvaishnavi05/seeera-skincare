import { Accordion } from '../ui/Accordion';

const faqs = [
  { id: '1', title: 'What is PDRN?', content: 'PDRN (Polydeoxyribonucleotide) is a naturally occurring building block in your DNA that helps to repair damaged skin cells, stimulate collagen production, and reduce inflammation. It is known as the "salmon sperm" ingredient in Korean skincare for its incredible regenerative properties.' },
  { id: '2', title: 'Is this suitable for sensitive skin?', content: 'Yes! Our formulas are specifically designed with CICA (Centella Asiatica) which is renowned for its calming and soothing properties, making it perfect for sensitive and compromised skin barriers.' },
  { id: '3', title: 'Are your products cruelty-free?', content: 'Absolutely. We are committed to ethical skincare. All SEEERA products are 100% cruelty-free and never tested on animals.' },
];

export function FAQSection() {
  return (
    <section className="py-32 bg-cream">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <span className="text-xs tracking-[0.2em] text-accent-brown uppercase mb-4 block">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-heading text-primary-brown mb-6 leading-tight">
              Frequently <br className="hidden lg:block"/>Asked Questions
            </h2>
            <p className="text-dark-brown font-light leading-relaxed">
              Everything you need to know about our products, ingredients, and philosophy. Can&apos;t find your answer? Feel free to contact us.
            </p>
          </div>
          <div className="lg:col-span-8 pt-4 lg:pt-0">
            <Accordion items={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
