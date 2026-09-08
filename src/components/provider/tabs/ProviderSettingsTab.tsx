import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Wrench,
  Bell,
  Lock,
  FileText,
  CreditCard,
  Image as ImageIcon,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Check,
  Upload,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface ProviderSettingsTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderSettingsTab: React.FC<ProviderSettingsTabProps> = ({ onNavigateTab }) => {
  const { language, formatPrice, user, providerProfile, showToast } = useApp();

  const isDemo = user?.email === 'provider@ahlalmarkabat.com' || Boolean(user?.isDemoUser);
  const providerName = user?.name || providerProfile?.name || (isDemo ? 'AHL AL MARKABAT' : 'Erlindo Garage');

  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar'>('en');
  const [serviceRadius, setServiceRadius] = useState(15);
  const [businessNameEn, setBusinessNameEn] = useState(providerName);
  const [businessNameAr, setBusinessNameAr] = useState(isDemo ? 'أهل المركبات' : (user?.name || 'كراج إرليندو'));
  const [businessType, setBusinessType] = useState('Premium Car Workshop & Auto Services');
  const [taglineEn, setTaglineEn] = useState(
    isDemo ? 'Your Trusted Auto Service Partner' : 'Professional Automotive Repair & Maintenance'
  );
  const [taglineAr, setTaglineAr] = useState(
    isDemo ? 'شريكك الموثوق لصيانة وخدمات السيارات' : 'خدمات صيانة وإصلاح سيارات احترافية'
  );
  const [descEn, setDescEn] = useState(
    isDemo
      ? 'AHL AL MARKABAT is a premium automotive service center in UAE offering complete car care solutions with expert technicians, advanced equipment, and genuine parts.'
      : `${providerName} offers comprehensive automotive repair, diagnostic testing, routine servicing, and parts replacement with certified mechanics.`
  );
  const [descAr, setDescAr] = useState(
    isDemo
      ? 'أهل المركبات هي مركز صيانة سيارات متميز في الإمارات يقدم حلول صيانة متكاملة لجميع أنواع السيارات بأيدي خبراء متخصصين وأحدث المعدات.'
      : `يقدم ${providerName} حلولاً متكاملة لفحص وصيانة وتصليح السيارات بأعلى معايير الجودة والاحترافية.`
  );

  // Notification states
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifJobs, setNotifJobs] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifPromos, setNotifPromos] = useState(true);

  // Services chips
  const [servicesList, setServicesList] = useState([
    'General Service',
    'Oil Change',
    'Brake Repair',
    'Engine Diagnostics',
    'AC Service',
    'Battery Replacement',
    'Tire Services',
    'Suspension Repair',
    'Transmission Repair',
  ]);

  // Operating hours
  const days = [
    { name: 'Monday', from: '08:00 AM', to: '06:00 PM', open: true },
    { name: 'Tuesday', from: '08:00 AM', to: '06:00 PM', open: true },
    { name: 'Wednesday', from: '08:00 AM', to: '06:00 PM', open: true },
    { name: 'Thursday', from: '08:00 AM', to: '06:00 PM', open: true },
    { name: 'Friday', from: '08:00 AM', to: '06:00 PM', open: true },
    { name: 'Saturday', from: '08:00 AM', to: '06:00 PM', open: true },
    { name: 'Sunday', from: 'Closed', to: 'Closed', open: false },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumbs & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'الملف التعريفي والإعدادات' : 'Profile & Settings'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dashboard &gt; Profile & Settings • Manage your business profile, preferences, team and account settings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl">
            Discard
          </button>
          <button
            onClick={() => {
              if (showToast) showToast('Profile and workshop settings saved successfully!', 'success');
            }}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Profile Overview Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-black text-slate-900 pb-3 border-b border-slate-100">
              Business Profile
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
                  <Wrench className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-base font-black text-slate-900">{businessNameEn}</strong>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {isDemo ? 'Verified Business' : 'Active Provider'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">{businessType}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span>★</span>
                    <strong className="text-slate-900">{isDemo ? '4.8' : '5.0'}</strong>
                  </div>
                  <span className="text-[10px] text-slate-400">{isDemo ? '(120 reviews)' : '(0 reviews)'}</span>
                </div>
                <div className="border-s border-slate-200 ps-3">
                  <span className="text-[10px] text-slate-400 block">Avg. Response</span>
                  <strong className="text-slate-900">{isDemo ? '28 mins' : '< 15 mins'}</strong>
                </div>
                <div className="border-s border-slate-200 ps-3">
                  <span className="text-[10px] text-slate-400 block">Member Since</span>
                  <strong className="text-slate-900">{isDemo ? 'May 12, 2019' : 'Joined 2025'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information Form (English / Arabic toggle) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Business Information</h3>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeLangTab === 'en' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setActiveLangTab('ar')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeLangTab === 'ar' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Business Name (English)</label>
                <input
                  type="text"
                  value={businessNameEn}
                  onChange={(e) => setBusinessNameEn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">اسم المنشأة التجاري (بالعربية)</label>
                <input
                  type="text"
                  value={businessNameAr}
                  onChange={(e) => setBusinessNameAr(e.target.value)}
                  dir="rtl"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold text-end"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Business Type</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                >
                  <option>Premium Car Workshop & Auto Services</option>
                  <option>Quick Service & Lube Center</option>
                  <option>Body & Paint Shop</option>
                  <option>Tire & Wheel Center</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Tagline (English)</label>
                <input
                  type="text"
                  value={taglineEn}
                  onChange={(e) => setTaglineEn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">الشعار الإعلاني (بالعربية)</label>
                <input
                  type="text"
                  value={taglineAr}
                  onChange={(e) => setTaglineAr(e.target.value)}
                  dir="rtl"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-end"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Workshop Address & Service Area Map */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 pb-3 border-b border-slate-100">
              Workshop Address & Service Area
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Address Line 1</label>
                  <input
                    type="text"
                    defaultValue={isDemo ? 'Al Quoz Industrial Area 3' : (user?.city ? `Industrial Zone, ${user.city}` : 'Main Workshop Street')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Address Line 2</label>
                  <input
                    type="text"
                    defaultValue={isDemo ? 'Street 12, Building 24' : 'Building 1, Workshop Bay 4'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">City</label>
                    <input
                      type="text"
                      defaultValue={user?.city || (isDemo ? 'Dubai' : 'Ramallah')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Emirate / Province</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold">
                      <option>{user?.city || 'Dubai'}</option>
                      <option>Abu Dhabi</option>
                      <option>Sharjah</option>
                      <option>Ramallah</option>
                      <option>Nablus</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">P.O. Box (Optional)</label>
                    <input
                      type="text"
                      defaultValue={isDemo ? '124573' : '00000'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Zip Code</label>
                    <input
                      type="text"
                      defaultValue="00000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Service Radius & Map Visual */}
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                    alt="Service Area Map"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  {/* Service Radius Circle */}
                  <div className="relative w-28 h-28 rounded-full border-2 border-amber-500 bg-amber-400/20 flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-md" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Service Radius</span>
                    <strong className="text-blue-600">{serviceRadius} km</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours & Contact Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
                Operating Hours
              </h3>
              <div className="space-y-2 text-xs">
                {days.map((d, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="w-20 font-bold text-slate-700">{d.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {d.open ? `${d.from} – ${d.to}` : 'Closed'}
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked={d.open}
                      className="rounded border-slate-300 text-blue-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Social Links */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
                Contact & Social Links
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">Phone</label>
                  <input
                    type="text"
                    defaultValue={user?.phone || (isDemo ? '+971 50 123 4567' : '+970 59 123 4567')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">WhatsApp</label>
                  <input
                    type="text"
                    defaultValue={user?.phone || (isDemo ? '+971 50 123 4567' : '+970 59 123 4567')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">Email</label>
                  <input
                    type="text"
                    defaultValue={user?.email || (isDemo ? 'info@ahlalmarkabat.ae' : 'provider@garage.com')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">Website</label>
                  <input
                    type="text"
                    defaultValue={isDemo ? 'https://www.ahlalmarkabat.ae' : 'https://www.erlindogarage.com'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered Chips */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Services Offered</h3>
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                <Plus className="w-3.5 h-3.5" /> Add Service
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {servicesList.map((srv, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {srv}
                  <button
                    onClick={() => setServicesList(servicesList.filter((_, idx) => idx !== i))}
                    className="text-blue-400 hover:text-blue-700 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
              Notification Settings
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-bold">New Booking Alerts</strong>
                  <span className="text-[10px] text-slate-500">Get notified when a new booking is received.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifBooking}
                  onChange={(e) => setNotifBooking(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-bold">Job Updates</strong>
                  <span className="text-[10px] text-slate-500">Receive updates on job status changes.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifJobs}
                  onChange={(e) => setNotifJobs(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-bold">Customer Messages</strong>
                  <span className="text-[10px] text-slate-500">Get notified of new customer messages.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifMessages}
                  onChange={(e) => setNotifMessages(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Team Members & Access Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Team Members & Access</h3>
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                <Plus className="w-3.5 h-3.5" /> Add Team Member
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {(isDemo
                ? [
                    { name: 'Mohammed Ali', role: 'Admin', access: 'Full Access', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Ahmed Khan', role: 'Service Manager', access: 'Bookings, Jobs, Customers', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Zaid Ahmed', role: 'Technician', access: 'Jobs, Inventory', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Sara Nadeem', role: 'Receptionist', access: 'Bookings, Customers', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80' },
                  ]
                : [
                    { name: user?.name || 'Erlindo Garage Owner', role: 'Owner / Lead Tech', access: 'Full Access (Owner)', avatar: user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' },
                  ]
              ).map((m, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <strong className="font-bold text-slate-900 block">{m.name}</strong>
                      <span className="text-[10px] text-slate-400">{m.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{m.access}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents & Verification */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Documents & Verification</h3>
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                <Upload className="w-3.5 h-3.5" /> Upload Document
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(isDemo
                ? [
                    { title: 'Trade License', uploaded: 'Uploaded on May 12, 2019' },
                    { title: 'VAT Certificate', uploaded: 'Uploaded on May 12, 2019' },
                    { title: 'Insurance Certificate', uploaded: 'Uploaded on May 12, 2019' },
                    { title: 'ISO Certificate (Optional)', uploaded: 'Uploaded on May 12, 2019' },
                  ]
                : [
                    { title: 'Trade License', uploaded: 'Pending Upload / Verification' },
                    { title: 'VAT / Tax Certificate', uploaded: 'Pending Upload' },
                    { title: 'Workshop Liability Insurance', uploaded: 'Pending Upload' },
                    { title: 'Technician Certifications (Optional)', uploaded: 'Pending Upload' },
                  ]
              ).map((doc, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className={`w-4 h-4 ${isDemo ? 'text-emerald-600' : 'text-amber-500'}`} />
                    <div>
                      <strong className="font-bold text-slate-900 block">{doc.title}</strong>
                      <span className="text-[9px] text-slate-400">{doc.uploaded}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 font-bold text-[10px]">
                    {isDemo ? 'View' : 'Upload'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Support, Complete Profile, Quick Links) */}
        <div className="space-y-6">
          {/* Support & Help Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Support & Help</h3>
            <p className="text-xs text-slate-500">Find answers to common questions or reach out to our support team.</p>
            <div className="space-y-2 text-xs">
              <button className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-start flex items-center gap-2.5 font-bold text-slate-700">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Help Centre</span>
              </button>
              <button className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-start flex items-center gap-2.5 font-bold text-slate-700">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Video Guides</span>
              </button>
              <button className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-start flex items-center gap-2.5 font-bold text-slate-700">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Contact Support</span>
              </button>
            </div>
          </div>

          {/* Complete Your Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Complete Your Profile</h3>
            <p className="text-xs text-slate-500">Increase bookings by up to 40% by completing all profile sections.</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Profile Strength</span>
                <strong className="text-blue-600">85% Done</strong>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          {/* Branding & Logo Assets */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Branding & Logo Assets</h3>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block mb-1">Business Logo</span>
              <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl border border-amber-300">
                <Wrench className="w-8 h-8" />
              </div>
              <button className="text-blue-600 font-bold text-[10px] mt-1.5">Change Logo</button>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">Cover Image</span>
              <img
                src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=300&auto=format&fit=crop&q=80"
                alt="Workshop Cover"
                className="w-full h-24 rounded-xl object-cover border border-slate-200"
              />
              <button className="text-blue-600 font-bold text-[10px] mt-1.5">Change Cover</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Promo Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'نمّ أعمالك مع أهل المركبات' : 'Grow Your Business with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            Get more bookings, increase your visibility, and grow your revenue with premium features.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => showToast && showToast('Premium workshop verification & priority listing unlocked!', 'success')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
            >
              Explore Premium Features
            </button>
            <button
              onClick={() => showToast && showToast('Platform integration guide downloaded to your workspace knowledge base.', 'info')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
