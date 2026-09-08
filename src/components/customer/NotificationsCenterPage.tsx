import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Calendar,
  Package,
  Clock,
  Tag,
  User,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Star,
  FileText,
  Percent,
  Check,
  ChevronRight,
  Search,
  Filter,
  SlidersHorizontal,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const NotificationsCenterPage: React.FC = () => {
  const { language, formatPrice, setActiveTab, markAllNotificationsAsRead, notifications } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'bookings' | 'orders' | 'reminders' | 'offers' | 'account'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);

  const kpis = [
    { id: 'all', title: 'All Notifications', count: 12, icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'bookings', title: 'Bookings', count: 4, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'orders', title: 'Orders', count: 3, icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'reminders', title: 'Reminders', count: 2, icon: Clock, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'offers', title: 'Offers', count: 2, icon: Tag, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'account', title: 'Account', count: 1, icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const timelineSteps = [
    { title: 'Booking Confirmed', place: 'PitStop Auto Care - Al Qouz', time: 'Today, 11:30 AM', status: 'Confirmed', color: 'bg-emerald-50 text-emerald-700' },
    { title: 'Technician Assigned', place: 'John D. has been assigned to your booking', time: 'Today, 11:45 AM', status: 'Update', color: 'bg-blue-50 text-blue-700' },
    { title: 'Vehicle Check-in', place: 'Your vehicle has been received at the center', time: 'Today, 01:00 PM', status: 'Update', color: 'bg-blue-50 text-blue-700' },
    { title: 'Service In Progress', place: 'Your service is currently in progress', time: 'Today, 02:30 PM', status: 'In Progress', color: 'bg-amber-50 text-amber-700' },
    { title: 'Estimated Completion', place: 'Your service will be completed by 04:30 PM', time: 'Today, 02:15 PM', status: 'Upcoming', color: 'bg-slate-100 text-slate-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* 1. Header with Search Bar */}
      <div className="bg-[#070E1B] text-white py-10 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1700px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Notifications Center</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Stay updated with your bookings, orders, offers and account updates.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, orders, bookings... ⌘K"
                  className="ps-9 pe-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 sm:w-80"
                />
              </div>

              <button
                onClick={markAllNotificationsAsRead}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تمييز الكل كمقروء' : 'Mark all as read'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 space-y-6">
        {/* 2. 6 Category KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpis.map((k) => {
            const Icon = k.icon;
            const isSelected = activeFilter === k.id;
            return (
              <div
                key={k.id}
                onClick={() => setActiveFilter(k.id as any)}
                className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-sm' : 'border-slate-200 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{k.title}</span>
                  <div className={`w-7 h-7 rounded-lg ${k.bg} ${k.color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <strong className="text-2xl font-black font-mono text-slate-950 block">{k.count}</strong>
                  <span className="text-[10px] text-slate-400">Unread</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Filter Navigation Tabs */}
        <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            {kpis.map((k) => (
              <button
                key={k.id}
                onClick={() => setActiveFilter(k.id as any)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeFilter === k.id
                    ? 'bg-[#0B1528] text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {k.title} ({k.count})
              </button>
            ))}
          </div>

          <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0 ms-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
        </div>

        {/* 4. Priority Alerts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Priority Alerts
            </span>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-950 font-black">Upcoming Booking in 2 Hours</strong>
                    <span className="px-1.5 py-0.2 rounded bg-red-500 text-white text-[9px] font-bold">High</span>
                  </div>
                  <p className="text-slate-600">Your booking at Rapid Auto Care - Al Qouz is scheduled today at 03:00 PM.</p>
                  <span className="text-[10px] text-slate-400 font-mono block pt-0.5">10:00 AM</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('bookings')}
                className="px-3 py-1.5 bg-[#0B1528] text-white hover:bg-slate-800 rounded-xl text-xs font-bold shrink-0"
              >
                View Booking
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-950 font-black">Payment Pending</strong>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white text-[9px] font-bold">High</span>
                  </div>
                  <p className="text-slate-600">Payment for Order #AHL-78421 is pending. Complete payment to avoid cancellation.</p>
                  <span className="text-[10px] text-slate-400 font-mono block pt-0.5">09:15 AM</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('cart-checkout')}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-black shrink-0"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        {/* 5. Notifications List Grouped By Date */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Today */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Today</span>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Booking Confirmed</strong>
                    <span className="text-slate-500">Your booking #BK-12345 has been confirmed with PitStop Auto Care.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">11:30 AM</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Order Update</strong>
                    <span className="text-slate-500">Your order #AHL-78421 has been shipped and is on the way.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">10:45 AM</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Service Reminder</strong>
                    <span className="text-slate-500">It's time for your Toyota Camry (ABC-123) service. Book now to keep it in top shape.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">09:00 AM</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Offer Just for You!</strong>
                    <span className="text-slate-500">Get 20% OFF on AC Services. Valid for today only!</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">08:15 AM</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Review Request</strong>
                    <span className="text-slate-500">How was your experience with Auto Pro Garage? We'd love to hear your feedback.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">07:30 AM</span>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">This Week</span>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Order Delivered</strong>
                    <span className="text-slate-500">Your order #AHL-78312 has been delivered successfully.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Price Drop Alert</strong>
                    <span className="text-slate-500">Good news! The product you saved is now 18% cheaper.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">2 days ago</span>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Booking Reminder</strong>
                    <span className="text-slate-500">Reminder: Your booking with Al Futtaim Motors is tomorrow at 04:00 PM.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">3 days ago</span>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Document Uploaded</strong>
                    <span className="text-slate-500">Your insurance document has been uploaded successfully.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">4 days ago</span>
              </div>
            </div>
          </div>

          {/* Earlier */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Earlier</span>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Welcome to AHL AL MARKABAT</strong>
                    <span className="text-slate-500">Thanks for joining! Explore services and offers tailored for you.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">1 week ago</span>
              </div>

              <div className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Payment Successful</strong>
                    <span className="text-slate-500">Payment of AED 420.00 for Order #AHL-78211 was successful.</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">1 week ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Timeline & Exclusive Offers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Booking & Order Timeline (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-950">Booking &amp; Order Timeline</h3>
              <button onClick={() => setActiveTab('bookings')} className="text-xs font-bold text-blue-600 hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-bold">{step.title}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${step.color}`}>{step.status}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{step.place}</p>
                    <span className="text-[10px] text-slate-400 font-mono block">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusive Offers For You (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-950">Exclusive Offers For You</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>

            {/* Offer 1 */}
            <div className="bg-[#0B1528] text-white rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-2xl font-black text-amber-400">20% OFF</span>
                  <strong className="block text-xs font-bold">on AC Services</strong>
                  <p className="text-[11px] text-slate-300">Stay cool this summer • Valid till 31 May 2025</p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  20% OFF
                </div>
              </div>
              <button
                onClick={() => setActiveTab('book-service')}
                className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-2xs transition-all"
              >
                Claim Offer
              </button>
            </div>

            {/* Offer 2 */}
            <div className="bg-[#0B1528] text-white rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-lg font-black text-amber-400">Free Car Wash</span>
                  <strong className="block text-xs font-bold">with Major Service</strong>
                  <p className="text-[11px] text-slate-300">Limited time offer • Valid till 15 Jun 2025</p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-black text-[10px]">
                  FREE WASH
                </div>
              </div>
              <button
                onClick={() => setActiveTab('book-service')}
                className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-2xs transition-all"
              >
                Claim Offer
              </button>
            </div>
          </div>
        </div>

        {/* 7. Manage Communication Preferences & Need Help */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Communication Preferences (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-950">Manage Communication Preferences</h3>
            <p className="text-xs text-slate-500">Choose how you want to receive notifications from us.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block font-bold">Push Notifications</strong>
                  <span className="text-[10px] text-slate-400">Instant alerts on your device</span>
                </div>
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block font-bold">Email Notifications</strong>
                  <span className="text-[10px] text-slate-400">Receive updates via email</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailEnabled}
                  onChange={(e) => setEmailEnabled(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block font-bold">SMS Notifications</strong>
                  <span className="text-[10px] text-slate-400">Important updates via SMS</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block font-bold">WhatsApp Notifications</strong>
                  <span className="text-[10px] text-slate-400">Receive updates on WhatsApp</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappEnabled}
                  onChange={(e) => setWhatsappEnabled(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Need Help (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-950">Need Help?</h3>
            <p className="text-xs text-slate-500">Can't find what you're looking for? Our support team is here to help.</p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => setActiveTab('help')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <div>
                    <strong className="block font-bold">Help Center</strong>
                    <span className="text-[10px] text-slate-400">Browse FAQs and guides</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <div>
                    <strong className="block font-bold">Contact Support</strong>
                    <span className="text-[10px] text-slate-400">Chat with our team</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
