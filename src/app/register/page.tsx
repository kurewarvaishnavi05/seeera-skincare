"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (data.success) {
        setAuth(data.token, data.user);
        router.push('/profile');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2] flex flex-col items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 md:p-10 rounded-[20px] shadow-sm"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading text-primary-brown mb-2">Create Account</h1>
          <p className="text-dark-brown/70 font-light text-sm">Join the Seeera community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg text-center font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary-brown tracking-wide">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white transition-colors"
              placeholder="Jane Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary-brown tracking-wide">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary-brown tracking-wide">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-cream/30 border border-primary-brown/20 rounded-lg text-sm focus:outline-none focus:border-primary-brown focus:bg-white transition-colors"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <Button 
            disabled={loading}
            className="w-full h-12 bg-dark-brown-red hover:bg-primary-brown text-white tracking-widest uppercase text-sm disabled:opacity-70 shadow-none border-none"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-dark-brown/70 font-light">
          Already have an account?{' '}
          <Link href="/login" className="text-primary-brown font-medium hover:text-accent-brown transition-colors">
            Sign in
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
