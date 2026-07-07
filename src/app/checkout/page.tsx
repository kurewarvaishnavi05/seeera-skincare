"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [shipping, setShipping] = useState({
    name: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setLoading(true);
    setError('');

    try {
      // Simulate "Cash on Delivery" or bypass payment gateway by directly creating the order
      const orderData = {
        products: items.map(item => ({ 
          product: String(item.id).length === 24 ? item.id : "64c23565e3146b9a84abf532", 
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          address: shipping.street,
          city: shipping.city,
          postalCode: shipping.zip,
          country: shipping.state || "India",
          phone: shipping.phone
        },
        paymentInfo: {
          id: 'simulated_txn_' + Math.random().toString(36).substr(2, 9),
          status: 'Cash on Delivery'
        },
        itemsPrice: total,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: total
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        router.push('/profile'); // Redirect to profile to see the order
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (err: any) {
      setError('Network error while placing order.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-heading text-primary-brown mb-4">Your Cart is Empty</h1>
        <p className="text-dark-brown/70 font-light mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => router.push('/shop')} className="bg-dark-brown-red text-white">Continue Shopping</Button>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Shipping Form */}
          <div className="w-full lg:w-3/5">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
              
              {!user && (
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-primary-brown">Already have an account?</h3>
                    <p className="text-sm text-dark-brown/70 font-light">Log in for a faster checkout</p>
                  </div>
                  <Link href="/login" className="text-accent-brown text-sm font-medium hover:underline">Log In</Link>
                </div>
              )}

              <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                <h2 className="text-xl font-heading text-primary-brown mb-6 flex items-center">
                  <Truck className="w-5 h-5 mr-3 text-accent-brown" /> Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary-brown tracking-wide">Full Name</label>
                    <input 
                      required
                      type="text" 
                      autoComplete="name"
                      value={shipping.name}
                      onChange={(e) => setShipping({...shipping, name: e.target.value})}
                      className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary-brown tracking-wide">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      autoComplete="tel"
                      value={shipping.phone}
                      onChange={(e) => setShipping({...shipping, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-primary-brown tracking-wide">Street Address</label>
                    <input 
                      required
                      type="text" 
                      autoComplete="street-address"
                      value={shipping.street}
                      onChange={(e) => setShipping({...shipping, street: e.target.value})}
                      className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary-brown tracking-wide">City</label>
                    <input 
                      required
                      type="text" 
                      autoComplete="address-level2"
                      value={shipping.city}
                      onChange={(e) => setShipping({...shipping, city: e.target.value})}
                      className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2 flex gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-primary-brown tracking-wide block mb-2">State</label>
                      <input 
                        required
                        type="text" 
                        autoComplete="address-level1"
                        value={shipping.state}
                        onChange={(e) => setShipping({...shipping, state: e.target.value})}
                        className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm font-medium text-primary-brown tracking-wide block mb-2">ZIP Code</label>
                      <input 
                        required
                        type="text" 
                        autoComplete="postal-code"
                        inputMode="numeric"
                        value={shipping.zip}
                        onChange={(e) => setShipping({...shipping, zip: e.target.value})}
                        className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                <h2 className="text-xl font-heading text-primary-brown mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-3 text-accent-brown" /> Payment Method
                </h2>
                
                <div className="p-4 border-2 border-primary-brown rounded-xl bg-cream/20 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-[5px] border-primary-brown mr-4"></div>
                    <span className="font-medium text-primary-brown">Cash on Delivery</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-dark-brown/50 mt-4 font-light">
                  For this demo, we are simulating a Cash on Delivery transaction to securely save the order to your MongoDB database.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg text-center font-light">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-heading text-primary-brown mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cream/30 rounded-lg overflow-hidden shrink-0 p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary-brown line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-dark-brown/70 font-light">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-primary-brown">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-dark-brown/70 font-light">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-dark-brown/70 font-light">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-medium text-primary-brown pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                form="checkout-form"
                type="submit"
                disabled={loading}
                className="w-full mt-8 h-14 bg-dark-brown-red hover:bg-primary-brown text-white tracking-widest uppercase text-sm disabled:opacity-70 shadow-none border-none"
              >
                {loading ? 'Processing...' : 'Place Order • Cash on Delivery'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
