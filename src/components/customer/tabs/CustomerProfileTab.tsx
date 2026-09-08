import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  User,
  MapPin,
  Bell,
  CreditCard,
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export const CustomerProfileTab: React.FC = () => {
  const { language, user, updateUserProfile, showToast } = useApp();

  const [name, setName] = useState(user?.name || 'عمر عبد الله');
  const [email, setEmail] = useState(user?.email || 'omar@example.ps');
  const [phone, setPhone] = useState(user?.phone || '+970 59 111 2233');

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.email) setEmail(user.email);
    if (user?.phone) setPhone(user.phone);
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone });
    showToast(
      language === 'ar' ? 'تم تحديث بيانات الحساب بنجاح' : 'Profile updated successfully!',
      'success'
    );
  };

  const savedAddresses = [
    { label: 'Home Villa', address: 'Villa 14, Al Barsha 1, Dubai, UAE', type: 'primary' },
    { label: 'Office HQ', address: 'Floor 24, Boulevard Plaza Tower 1, Downtown Dubai, UAE', type: 'work' },
    { label: 'Family Residence', address: 'Al-Masyoun Street, Ramallah, Palestine', type: 'other' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Profile & Ahl Al Markabat Plus Hero */}
      <div className="bg-[#09152B] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-xl font-black text-white">{name}</strong>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Plus Member
                </span>
              </div>
              <span className="text-xs text-slate-300 block">{email} • {phone}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Member since Jan 2024. Your vehicles are backed by verified provider warranties and priority roadside dispatch.
          </p>
        </div>

        {/* Plus Card Badge */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/90 border border-amber-400/40 space-y-2 text-xs">
          <div className="flex items-center justify-between text-amber-400 font-black">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> VIP Roadside Guarantee
            </span>
            <span>Active</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Enjoy unlimited free towing up to 50 km, at-home battery jumpstarts, and zero diagnostic dispatch fees.
          </p>
        </div>
      </div>

      {/* 2. Personal Information & Saved Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Account Details</h3>

          <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Full Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Phone Number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Saved Addresses (UAE & Palestine) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Saved Service Addresses</h3>
              <button className="text-[11px] font-bold text-blue-600">+ Add New</button>
            </div>

            <div className="space-y-2.5 pt-3 text-xs">
              {savedAddresses.map((addr, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold">{addr.label}</strong>
                      {addr.type === 'primary' && (
                        <span className="px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800 text-[9px] font-bold">Default</span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{addr.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-900 text-[11px] font-medium">
            💡 Address coordinates are used for rapid mobile technician dispatch &amp; emergency roadside assistance.
          </div>
        </div>
      </div>
    </div>
  );
};
