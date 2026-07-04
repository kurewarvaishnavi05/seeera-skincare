import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary-brown text-cream pt-24 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-heading font-bold tracking-widest uppercase mb-6">SEEERA</h2>
            <p className="font-light text-cream/70 max-w-sm mb-8 leading-relaxed">
              The New Era of Skin Care. Powered by science, designed for luxury. Skincare for every shade.
            </p>
            <div className="flex space-x-6 text-sm tracking-widest uppercase">
              <a href="#" className="hover:text-accent-brown transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent-brown transition-colors">TikTok</a>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-6">Shop</h3>
            <ul className="space-y-4 font-light text-cream/70">
              <li><Link href="#" className="hover:text-cream transition-colors">All Products</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">Sets & Bundles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-6">Company</h3>
            <ul className="space-y-4 font-light text-cream/70">
              <li><Link href="#" className="hover:text-cream transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">Ingredients</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row items-center justify-between font-light text-sm text-cream/50">
          <p>&copy; {new Date().getFullYear()} SEEERA Skin Care. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-cream transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
