import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Megaphone,
  Tag,
  Users,
  TrendingUp,
  Plus,
  Calendar,
  Clock,
  ChevronDown,
  DollarSign,
  Percent,
  CheckCircle2,
  Share2,
  Smartphone,
  Mail,
  MessageCircle,
  MoreVertical,
  X,
  Send,
} from 'lucide-react';

interface ProviderMarketingTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderMarketingTab: React.FC<ProviderMarketingTabProps> = ({ onNavigateTab }) => {
  const { language, formatPrice, user, jobs, placedBookings } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const initialCampaigns = isNewUser
    ? []
    : [
        {
          title: 'AC Summer Special 2025',
          sub: '20% OFF on AC Diagnostics & Refill',
          date: 'May 1 – Jun 30, 2025',
          redeemed: '142 times',
          rev: 'AED 35,500',
          img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=80',
        },
        {
          title: 'Free Brake Inspection',
          sub: 'Free Multi-point & Brake Diagnostic',
          date: 'May 10 – May 31, 2025',
          redeemed: '98 times',
          rev: 'AED 19,600',
          img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80',
        },
        {
          title: 'Full Synthetic Oil Deal',
          sub: 'Free Filter with Every Oil Service',
          date: 'May 1 – May 31, 2025',
          redeemed: '215 times',
          rev: 'AED 53,750',
          img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
        },
      ];

  const initialCoupons = isNewUser
    ? []
    : [
        { code: 'SUMMER20', discount: '20% OFF', min: 'AED 200', start: 'May 1, 2025', end: 'Jun 30, 2025', usage: '142 / 500', status: 'Active', color: 'bg-emerald-100 text-emerald-800' },
        { code: 'BRAKE15', discount: '15% OFF', min: 'AED 350', start: 'May 10, 2025', end: 'May 31, 2025', usage: '98 / 200', status: 'Active', color: 'bg-emerald-100 text-emerald-800' },
        { code: 'EID2025', discount: '25% OFF', min: 'AED 500', start: 'Apr 5, 2025', end: 'Apr 15, 2025', usage: '210 / 250', status: 'Expired', color: 'bg-slate-100 text-slate-700' },
      ];

  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const [newCampaignForm, setNewCampaignForm] = useState({
    title: '',
    sub: '',
    discount: '20% OFF',
    date: '30 Days Campaign',
  });

  const [newCouponForm, setNewCouponForm] = useState({
    code: '',
    discount: '15% OFF',
    min: 'AED 150',
    days: '30',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCamp = {
      title: newCampaignForm.title || 'Special Promotion Campaign',
      sub: newCampaignForm.sub || `${newCampaignForm.discount} on service repairs`,
      date: `Active for next ${newCampaignForm.date}`,
      redeemed: '0 times',
      rev: 'AED 0.00',
      img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=80',
    };

    setCampaigns([newCamp, ...campaigns]);
    setIsCampaignModalOpen(false);
    showToast(`Campaign "${newCamp.title}" launched successfully!`);
    setNewCampaignForm({
      title: '',
      sub: '',
      discount: '20% OFF',
      date: '30 Days Campaign',
    });
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const exp = new Date();
    exp.setDate(exp.getDate() + parseInt(newCouponForm.days || '30', 10));
    const expStr = exp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newC = {
      code: (newCouponForm.code || 'OFFER25').toUpperCase(),
      discount: newCouponForm.discount,
      min: newCouponForm.min,
      start: todayStr,
      end: expStr,
      usage: '0 / 200',
      status: 'Active',
      color: 'bg-emerald-100 text-emerald-800',
    };

    setCoupons([newC, ...coupons]);
    setIsCouponModalOpen(false);
    showToast(`Coupon code "${newC.code}" created and active!`);
    setNewCouponForm({
      code: '',
      discount: '15% OFF',
      min: 'AED 150',
      days: '30',
    });
  };

  // 1. KPI Cards
  const kpis = campaigns.length === 0 ? [
    { label: 'Active Promotions', value: '0', change: '0% vs last month', isUp: true, icon: Megaphone },
    { label: 'Promo Revenue', value: 'AED 0.00', change: '0% vs last month', isUp: true, icon: DollarSign },
    { label: 'Promo Redemptions', value: '0', change: '0% vs last month', isUp: true, icon: Tag },
    { label: 'New Customer Growth', value: '0%', change: '0% vs last month', isUp: true, icon: Users },
  ] : [
    { label: 'Active Promotions', value: `${campaigns.length}`, change: '+1 this month', isUp: true, icon: Megaphone },
    { label: 'Promo Revenue', value: 'AED 108,850', change: '+24.5% vs last month', isUp: true, icon: DollarSign },
    { label: 'Promo Redemptions', value: '455', change: '+32% vs last month', isUp: true, icon: Tag },
    { label: 'New Customer Growth', value: '+18.2%', change: '+4.1% vs last month', isUp: true, icon: Users },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Breadcrumb & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'التسويق والحملات الترويجية' : 'Marketing & Promotions'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Drive growth, boost vehicle bookings, and increase customer retention with targeted campaigns.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCampaignModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Campaign</span>
          </button>
        </div>
      </div>

      {/* 2. 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{kpi.label}</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[11px] font-bold text-emerald-600">
                ▲ {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Active Campaigns Cards & Seasonal Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {language === 'ar' ? 'الحملات التسويقية النشطة' : 'Active Campaigns'}
            </h3>
            <button
              onClick={() => showToast('Showing all ongoing marketing campaigns')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              {language === 'ar' ? 'عرض الكل ←' : 'View All Campaigns →'}
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-2xs text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Megaphone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'لا توجد حملات تسويقية بعد' : 'No Active Campaigns Yet'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === 'ar'
                  ? 'أنشئ حملتك الترويجية الأولى لجذب المزيد من ملاك السيارات وتقديم خصومات موسمية.'
                  : 'Launch your first promo campaign to attract vehicle owners and increase service appointments.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCampaignModalOpen(true)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-xl text-slate-950 font-black text-xs shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Launch First Campaign</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {campaigns.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-28 overflow-hidden">
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 start-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black">
                        Active
                      </span>
                    </div>
                    <div className="p-3 space-y-1">
                      <strong className="text-xs font-black text-slate-900 block truncate">{c.title}</strong>
                      <span className="text-[10px] text-slate-500 font-bold block">{c.sub}</span>
                      <span className="text-[9px] text-slate-400 block">{c.date}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-[9px] text-slate-400 block">Redeemed: {c.redeemed}</span>
                      <strong className="text-slate-900 font-black">{c.rev}</strong>
                    </div>
                    <button
                      onClick={() => showToast(`Campaign analytics loaded for "${c.title}"`)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seasonal Offers Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {language === 'ar' ? 'العروض الموسمية المقترحة' : 'Seasonal Templates'}
            </h3>
            <span className="text-[11px] font-bold text-slate-400">Ready to Use</span>
          </div>

          <div className="space-y-3">
            {[
              { title: 'SUMMER CHECK-UP', sub: 'Keep your car cool', badge: 'Up to 25% OFF', discount: '25% OFF' },
              { title: 'RAMADAN OFFER', sub: 'Special Discounts', badge: 'Up to 30% OFF', discount: '30% OFF' },
              { title: 'WINTER CARE', sub: 'Stay safe this winter', badge: 'Up to 20% OFF', discount: '20% OFF' },
            ].map((o, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#09152B] text-white border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-xs font-black text-amber-400 block">{o.title}</strong>
                  <span className="text-[10px] text-slate-300">{o.sub}</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{o.badge}</span>
                </div>
                <button
                  onClick={() => {
                    setNewCampaignForm({
                      title: o.title,
                      sub: o.sub,
                      discount: o.discount,
                      date: 'Summer Period',
                    });
                    setIsCampaignModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[10px] cursor-pointer"
                >
                  {language === 'ar' ? 'تفعيل' : 'Use Template'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Coupons Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">
            {language === 'ar' ? 'إدارة كوبونات الخصم' : 'Coupons Management'} ({coupons.length})
          </h3>
          <button
            onClick={() => setIsCouponModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? '+ إنشاء كوبون' : '+ Create Coupon'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4 text-start">Code</th>
                <th className="py-3 px-4 text-start">Discount</th>
                <th className="py-3 px-4 text-start">Min. Spend</th>
                <th className="py-3 px-4 text-start">Start Date</th>
                <th className="py-3 px-4 text-start">End Date</th>
                <th className="py-3 px-4 text-center">Usage</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    <p className="font-bold text-slate-600">
                      {language === 'ar' ? 'لا توجد كوبونات خصم مضافة بعد' : 'No promo coupons created yet'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {language === 'ar' ? 'انقر على "+ إنشاء كوبون" لتقديم كود خصم لعملائك' : 'Click "+ Create Coupon" to launch a discount code for your customers'}
                    </p>
                  </td>
                </tr>
              ) : (
                coupons.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-black text-blue-600">{c.code}</td>
                    <td className="py-3 px-4 font-bold">{c.discount}</td>
                    <td className="py-3 px-4 text-slate-600">{c.min}</td>
                    <td className="py-3 px-4 text-slate-500">{c.start}</td>
                    <td className="py-3 px-4 text-slate-500">{c.end}</td>
                    <td className="py-3 px-4 text-center font-bold">{c.usage}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${c.color}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(c.code);
                          showToast(`Coupon code ${c.code} copied to clipboard!`);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded cursor-pointer"
                      >
                        Copy Code
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Promotional Channels: SMS, Email, WhatsApp */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'SMS Campaigns',
            sub: 'Reach customers instantly',
            sent: isNewUser ? '0' : '5,426',
            rate: isNewUser ? '0% Delivered' : '98% Delivered',
            icon: Smartphone,
            color: 'text-blue-600',
          },
          {
            title: 'Email Campaigns',
            sub: 'Engage with rich offers',
            sent: isNewUser ? '0' : '3,218',
            rate: isNewUser ? '0% Opened' : '42% Opened',
            icon: Mail,
            color: 'text-emerald-600',
          },
          {
            title: 'WhatsApp Campaigns',
            sub: 'Personal & effective',
            sent: isNewUser ? '0' : '2,189',
            rate: isNewUser ? '0% Delivered' : '97% Delivered',
            icon: MessageCircle,
            color: 'text-purple-600',
          },
        ].map((ch, i) => {
          const Icon = ch.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${ch.color}`} />
                  </div>
                  <div>
                    <strong className="text-xs font-black text-slate-900 block">{ch.title}</strong>
                    <span className="text-[10px] text-slate-400">{ch.sub}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sent</span>
                    <strong className="text-slate-900 font-bold">{ch.sent}</strong>
                  </div>
                  <div className="text-end">
                    <span className="text-[10px] text-slate-400 block">Performance</span>
                    <strong className="text-emerald-600 font-bold">{ch.rate}</strong>
                  </div>
                </div>
              </div>
              <button
                onClick={() => showToast(`${ch.title} broadcast initiated to active customer segment!`)}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
              >
                Launch {ch.title.split(' ')[0]}
              </button>
            </div>
          );
        })}
      </div>

      {/* 6. Create Campaign Modal */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Launch New Marketing Campaign</h3>
                  <p className="text-[11px] text-slate-500">Create promotion banners & customer offers</p>
                </div>
              </div>
              <button
                onClick={() => setIsCampaignModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={newCampaignForm.title}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, title: e.target.value })}
                  placeholder="e.g. Free AC Inspection & 20% Off Refill"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Offer Subtitle / Description</label>
                <input
                  type="text"
                  value={newCampaignForm.sub}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, sub: e.target.value })}
                  placeholder="e.g. Comprehensive cooling system checkup for all sedan & SUV models"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount Tag</label>
                  <input
                    type="text"
                    value={newCampaignForm.discount}
                    onChange={(e) => setNewCampaignForm({ ...newCampaignForm, discount: e.target.value })}
                    placeholder="e.g. 25% OFF"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Campaign Duration</label>
                  <input
                    type="text"
                    value={newCampaignForm.date}
                    onChange={(e) => setNewCampaignForm({ ...newCampaignForm, date: e.target.value })}
                    placeholder="e.g. 30 Days"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Create Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Create Discount Coupon Code</h3>
                  <p className="text-[11px] text-slate-500">Provide promo codes for online checkout</p>
                </div>
              </div>
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={newCouponForm.code}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, code: e.target.value })}
                  placeholder="e.g. SAVE20"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-blue-600 outline-none uppercase focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount Rate *</label>
                  <input
                    type="text"
                    required
                    value={newCouponForm.discount}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, discount: e.target.value })}
                    placeholder="e.g. 20% OFF or AED 50 OFF"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min. Spend Required</label>
                  <input
                    type="text"
                    value={newCouponForm.min}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, min: e.target.value })}
                    placeholder="e.g. AED 200"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Validity (Days from now)</label>
                <input
                  type="number"
                  value={newCouponForm.days}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, days: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Generate Coupon Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
