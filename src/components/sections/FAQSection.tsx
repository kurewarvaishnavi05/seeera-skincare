import { Accordion } from '../ui/Accordion';

const faqs = [
  { id: '1', title: 'What is PDRN?', content: 'PDRN (Polydeoxyribonucleotide) is a naturally occurring building block in your DNA that helps to repair damaged skin cells, stimulate collagen production, and reduce inflammation. It is known as the "salmon sperm" ingredient in Korean skincare for its incredible regenerative properties.' },
  { id: '2', title: 'Is this suitable for sensitive skin?', content: 'Yes! Our formulas are specifically designed with CICA (Centella Asiatica) which is renowned for its calming and soothing properties, making it perfect for sensitive and compromised skin barriers.' },
  { id: '3', title: 'Are your products cruelty-free?', content: 'Absolutely. We are committed to ethical skincare. All SEEERA products are 100% cruelty-free and never tested on animals.' },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-primary-brown mb-4">
            Common Questions
          </h2>
        </div>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
