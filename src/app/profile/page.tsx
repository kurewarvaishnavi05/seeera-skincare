"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Package, User as UserIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, token, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.filter((o: any) => o._id !== orderId));
      } else {
        alert(data.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Failed to delete order', error);
      alert('Failed to delete order');
    }
  };

  if (!user) return null; // Will redirect

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-heading text-primary-brown mb-2">My Account</h1>
            <p className="text-dark-brown/70 font-light">Welcome back, {user.name}!</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-dark-brown hover:text-dark-brown-red border-primary-brown/20 h-10 px-6 text-xs tracking-widest uppercase rounded-full shadow-none"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[20px] shadow-sm">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-primary-brown mb-6">
                <UserIcon className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-heading text-primary-brown mb-1">{user.name}</h2>
              <p className="text-sm text-dark-brown/70 font-light mb-6">{user.email}</p>
              
              <div className="pt-6 border-t border-gray-100">
                <button className="flex items-center text-sm text-primary-brown hover:text-accent-brown transition-colors mb-4 font-medium">
                  <Package className="w-4 h-4 mr-3" /> Order History
                </button>
                <button className="flex items-center text-sm text-dark-brown/70 hover:text-primary-brown transition-colors font-light">
                  <MapPin className="w-4 h-4 mr-3" /> Saved Addresses
                </button>
              </div>
            </div>
          </div>

          {/* Main Content: Orders */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 rounded-[20px] shadow-sm">
              <h2 className="text-2xl font-heading text-primary-brown mb-8">Order History</h2>

              {loading ? (
                <div className="text-center py-12 text-dark-brown/50 font-light">Loading your orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-dark-brown/70 font-light mb-6">You haven't placed any orders yet.</p>
                  <Button onClick={() => router.push('/shop')} className="bg-dark-brown-red text-white border-none text-xs uppercase tracking-widest">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order: any) => (
                    <div key={order._id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between mb-6 pb-6 border-b border-gray-50 gap-4">
                        <div>
                          <p className="text-xs text-dark-brown/50 uppercase tracking-widest mb-1">Order Placed</p>
                          <p className="text-sm font-medium text-primary-brown">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-dark-brown/50 uppercase tracking-widest mb-1">Total</p>
                          <p className="text-sm font-medium text-primary-brown">₹{(order.totalAmount || 0).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-dark-brown/50 uppercase tracking-widest mb-1">Order #</p>
                          <p className="text-sm font-medium text-primary-brown">{order._id.substring(order._id.length - 8)}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-medium text-primary-brown mb-1">Status: <span className="text-accent-brown">{order.orderStatus}</span></h3>
                          <p className="text-sm text-dark-brown/70 font-light">
                            {order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'} in this order
                          </p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button 
                            onClick={() => handleDeleteOrder(order._id)}
                            variant="outline" 
                            className="flex-1 sm:flex-none border-red-500/20 text-red-500 hover:bg-red-50 hover:border-red-500 text-xs tracking-widest uppercase h-10 px-6 rounded-full shadow-none transition-colors"
                          >
                            Delete
                          </Button>
                          <Button 
                            onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                            variant="outline" 
                            className="flex-1 sm:flex-none border-primary-brown/20 text-primary-brown hover:bg-cream text-xs tracking-widest uppercase h-10 px-6 rounded-full shadow-none"
                          >
                            {expandedOrderId === order._id ? 'Hide Details' : 'View Details'}
                          </Button>
                        </div>
                      </div>

                      {expandedOrderId === order._id && (
                        <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
                          <h4 className="text-sm font-medium text-primary-brown mb-4 uppercase tracking-widest">Items Included</h4>
                          <div className="space-y-4">
                            {order.items?.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-lg">
                                <div className="w-12 h-12 bg-white rounded flex-shrink-0 p-1 border border-gray-100">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                  ) : (
                                    <Package className="w-full h-full text-gray-300 p-2" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-primary-brown">{item.name}</p>
                                  <p className="text-xs text-dark-brown/70">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-medium text-primary-brown">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-primary-brown mb-2 uppercase tracking-widest">Shipping Address</h4>
                            <div className="bg-gray-50/50 p-4 rounded-lg text-sm text-dark-brown/80 font-light leading-relaxed">
                              <p className="font-medium text-primary-brown mb-1">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                              <p>{order.shippingAddress?.address}</p>
                              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                              <p>{order.shippingAddress?.country}</p>
                              <p className="mt-2 text-xs">Phone: {order.shippingAddress?.phone}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
