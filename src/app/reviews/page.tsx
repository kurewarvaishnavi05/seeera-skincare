import { Button } from '@/components/ui/Button';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const reviews = [
    { name: "Sarah J.", rating: 5, date: "October 12, 2023", title: "Completely transformed my skin", content: "I've struggled with adult acne and scarring for years. The PDRN serum has literally transformed my skin texture. The redness is gone and my skin feels so much more resilient." },
    { name: "Emily R.", rating: 5, date: "September 28, 2023", title: "Holy Grail Moisturizer", content: "The most hydrating moisturizer I've ever used. It doesn't feel heavy but it locks in moisture all day. My skin has that glass skin look!" },
    { name: "Jessica M.", rating: 4, date: "September 15, 2023", title: "Great results, took a few weeks", content: "Didn't see immediate results, but after 3 weeks of consistent use, the hyperpigmentation on my cheeks has faded significantly. Will repurchase." },
    { name: "Amanda T.", rating: 5, date: "August 30, 2023", title: "So gentle yet effective", content: "I have extremely sensitive skin and react to everything. This line is a lifesaver. No stinging, no redness, just calm, happy skin." }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-6">Customer Reviews</h1>
          <p className="text-lg text-dark-brown font-light max-w-2xl mx-auto">
            Don't just take our word for it. Read what our community has to say about their Seeera skincare journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-primary-brown/5">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-accent-brown text-accent-brown" : "text-gray-300"}`} />
                ))}
              </div>
              <h3 className="text-xl font-heading text-primary-brown mb-2">{review.title}</h3>
              <p className="text-dark-brown font-light mb-6 text-sm leading-relaxed">"{review.content}"</p>
              <div className="flex justify-between items-center text-xs text-primary-brown/60 uppercase tracking-wider font-medium">
                <span>{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-heading text-primary-brown mb-6">Ready for your glow up?</h3>
          <Button href="/shop" size="lg" className="bg-dark-brown-red text-white hover:bg-primary-brown px-12 h-14">
            Shop the Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
