"use client";

import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { Button } from '../ui/Button';

export function ResultsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            {/* Decreased max width to max-w-sm, removed forced aspect ratio, changed to object-contain */}
            <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md bg-gray-50 flex items-center justify-center p-4">
              <motion.img 
                src="/images/clinical-results.jpg" 
                alt="Clinical Results Before and After" 
                className="w-full h-auto object-contain"
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.05 }}
                viewport={{ once: false }}
                transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="text-sm tracking-[0.2em] text-accent-brown uppercase mb-6 block">Clinical Results</span>
            <h2 className="text-4xl md:text-5xl font-heading text-primary-brown mb-8 leading-tight">
              Visibly transformed skin in just 14 days.
            </h2>
            <p className="text-dark-brown font-light text-lg mb-6 leading-relaxed">
              Our PDRN and CICA complex works at the cellular level to repair compromised skin barriers. 
              The results? A dramatic reduction in redness, restored hydration, and a luminous glass-skin glow.
            </p>
            <ul className="space-y-4 mb-10 text-dark-brown">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-brown mr-3 shrink-0"></span>
                92% noticed improved skin texture and glow
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-brown mr-3 shrink-0"></span>
                88% saw a reduction in redness and inflammation
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-brown mr-3 shrink-0"></span>
                100% felt their skin was deeply hydrated
              </li>
            </ul>
            <Button size="lg" className="bg-dark-brown-red hover:bg-[#522929] text-white border-none">Shop The Routine</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
