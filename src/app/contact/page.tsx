"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] selection:bg-accent-brown/30 flex flex-col">
      <Navbar />
      
      <div className="pt-40 pb-20 bg-[#522929] text-white text-center">
        <h1 className="text-5xl md:text-7xl font-heading mb-6 tracking-wide text-white">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-white/80 px-6">
          We would love to hear from you. Reach out with any questions, feedback, or concerns.
        </p>
      </div>

      <section className="py-24 container mx-auto px-6 max-w-4xl flex-grow">
        <div className="bg-white p-10 md:p-16 rounded-2xl shadow-xl">
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs font-medium text-primary-brown mb-3 uppercase tracking-widest">First Name</label>
                <input required type="text" className="w-full border-b border-primary-brown/30 pb-3 bg-transparent focus:outline-none focus:border-primary-brown text-dark-brown transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-brown mb-3 uppercase tracking-widest">Last Name</label>
                <input required type="text" className="w-full border-b border-primary-brown/30 pb-3 bg-transparent focus:outline-none focus:border-primary-brown text-dark-brown transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-primary-brown mb-3 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full border-b border-primary-brown/30 pb-3 bg-transparent focus:outline-none focus:border-primary-brown text-dark-brown transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary-brown mb-3 uppercase tracking-widest">Message</label>
              <textarea required rows={5} className="w-full border-b border-primary-brown/30 pb-3 bg-transparent focus:outline-none focus:border-primary-brown text-dark-brown resize-none transition-colors"></textarea>
            </div>
            <div className="pt-4 text-center md:text-left">
              <Button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="w-full md:w-auto bg-[#522929] hover:bg-[#3D1E1E] text-white border-none py-4 px-12 rounded-full uppercase tracking-widest text-xs font-semibold transition-all shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:shadow-none"
              >
                {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
