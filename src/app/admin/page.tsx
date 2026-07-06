"use client";

import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: '₹0',
    totalOrders: 0,
    totalCustomers: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // In a real scenario, this would fetch from an aggregated admin endpoint
    // For now, we will fetch orders directly to calculate stats
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        
        if (data.success && data.data) {
          const orders = data.data;
          
          const totalRev = orders.reduce((acc: number, order: any) => acc + order.totalPrice, 0);
          
          setStats({
            totalRevenue: `₹${totalRev.toFixed(2)}`,
            totalOrders: orders.length,
            totalCustomers: new Set(orders.map((o: any) => o.user)).size // unique users
          });

          // Sort and get top 5
          const sorted = orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setRecentOrders(sorted.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white shadow-sm border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+5.2% from last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <span>Unique buyers</span>
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order._id.substring(order._id.length - 6)}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-900">{order.user?.name || 'Guest'}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
