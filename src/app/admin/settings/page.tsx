"use client";

import { useState } from 'react';
import { Store, Mail, Globe, Lock, Bell, CreditCard, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General Information', icon: Store },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security & Privacy', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">Manage your store preferences and account configurations.</p>
        </div>
        <Button className="bg-primary-brown text-white shadow-none h-10 px-6 rounded-xl hover:bg-dark-brown-red text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary-brown text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Store Details</h3>
                  <p className="text-sm text-gray-500 mb-6">Update your store name, contact info, and operational settings.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Store Name</label>
                      <input 
                        type="text" 
                        defaultValue="SEEERA Skincare"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-brown focus:ring-1 focus:ring-primary-brown outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Support Email</label>
                      <input 
                        type="email" 
                        defaultValue="support@seeera.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-brown focus:ring-1 focus:ring-primary-brown outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <input 
                        type="text" 
                        defaultValue="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-brown focus:ring-1 focus:ring-primary-brown outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Currency</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-brown focus:ring-1 focus:ring-primary-brown outline-none transition-all text-sm appearance-none bg-white">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Store Address</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Street Address</label>
                      <input 
                        type="text" 
                        defaultValue="123 Skincare Lane, Beauty District"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-brown focus:ring-1 focus:ring-primary-brown outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <input type="text" defaultValue="Mumbai" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">State</label>
                        <input type="text" defaultValue="Maharashtra" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ZIP</label>
                        <input type="text" defaultValue="400001" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'general' && (
              <div className="py-16 text-center animate-in fade-in duration-300">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Coming Soon</h3>
                <p className="text-sm text-gray-500">The {tabs.find(t => t.id === activeTab)?.name} section is currently under development.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
