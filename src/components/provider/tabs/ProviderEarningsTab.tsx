import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Calendar,
  Wallet,
  Download,
  Building2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Percent,
  Lock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Check,
  Zap,
} from 'lucide-react';

interface ProviderEarningsTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderEarningsTab: React.FC<ProviderEarningsTabProps> = ({ onNavigateTab }) => {
  const { language, formatPrice, jobs, placedBookings, user, providerProfile, showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const isDemo = user?.email === 'provider@ahlalmarkabat.com' || Boolean(user?.isDemoUser);
  const currentProviderId = user?.id || providerProfile?.id || 'prov-1';
  const myJobs = isDemo
    ? jobs.filter((j) => j.providerId === currentProviderId || !j.providerId)
    : jobs.filter((j) => j.providerId === currentProviderId);
  const myBookings = isDemo
    ? placedBookings.filter((b) => b.providerId === currentProviderId || !b.providerId)
    : placedBookings.filter((b) => b.providerId === currentProviderId);
  const totalRevenueAmount =
    myJobs.filter((j) => j.status === 'completed').reduce((acc, j) => acc + (j.totalAmount || 0), 0) +
    myBookings.reduce((acc, b) => acc + (b.price || 0), 0);
  const netEarningsAmount = Math.round(totalRevenueAmount * 0.9);
  const totalBookingsCount = myBookings.length + myJobs.length;
  const avgOrderValue = totalBookingsCount > 0 ? Math.round(totalRevenueAmount / totalBookingsCount) : 0;

  // 1. Live KPI Stats
  const kpis = [
    {
      id: 'total_revenue',
      label: 'Total Revenue',
      labelAr: 'إجمالي الإيرادات',
      value: formatPrice(totalRevenueAmount),
      change: totalRevenueAmount > 0 ? '+100%' : '0%',
      vs: 'vs Apr',
      isUp: true,
      icon: Calendar,
    },
    {
      id: 'net_earnings',
      label: 'Net Earnings',
      labelAr: 'صافي الأرباح',
      value: formatPrice(netEarningsAmount),
      change: netEarningsAmount > 0 ? '+100%' : '0%',
      vs: 'vs Apr',
      isUp: true,
      icon: Wallet,
    },
    {
      id: 'total_bookings',
      label: 'Total Bookings',
      labelAr: 'إجمالي الحجوزات',
      value: String(totalBookingsCount),
      change: totalBookingsCount > 0 ? '+100%' : '0%',
      vs: 'vs Apr',
      isUp: true,
      icon: TrendingUp,
    },
    {
      id: 'aov',
      label: 'Average Order Value',
      labelAr: 'متوسط قيمة الطلب',
      value: formatPrice(avgOrderValue),
      change: avgOrderValue > 0 ? '+100%' : '0%',
      vs: 'vs Apr',
      isUp: true,
      icon: DollarSign,
    },
    {
      id: 'conv_rate',
      label: 'Conversion Rate',
      labelAr: 'معدل التحويل',
      value: totalBookingsCount > 0 ? '100%' : '0%',
      change: '0%',
      vs: 'vs Apr',
      isUp: true,
      icon: Percent,
    },
  ];

  // 2. Best Performing Services from live bookings
  const bestServices = myBookings.slice(0, 5).map((b) => ({
    name: b.serviceName,
    bookings: '1 Booking',
    revenue: formatPrice(b.price || 0),
    change: '+100%',
    isUp: true,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=80&auto=format&fit=crop&q=80',
  }));

  // 3. Transactions from live completed bookings
  const transactions = myBookings.map((b) => ({
    date: b.date || 'Today',
    desc: `Booking #${b.id.slice(0, 8)} – ${b.serviceName}`,
    type: 'Revenue',
    amount: `+${formatPrice(b.price || 0)}`,
    status: b.status === 'completed' ? 'Completed' : 'Confirmed',
    isPositive: true,
  }));

  // 4. FAQs
  const faqs = [
    { q: 'How often are payouts processed?', a: 'Payouts are processed every Monday for the previous week’s completed jobs directly into your verified bank account.' },
    { q: 'What is the minimum payout amount?', a: 'The minimum payout threshold is $100.00. Earnings below this rollover to the next payout cycle.' },
    { q: 'How long does it take to receive my payout?', a: 'Bank transfers typically take 1 to 2 business days depending on your local bank.' },
    { q: 'What fees are deducted from my earnings?', a: 'Standard platform commission (70/30 or your tiered rate), payment gateway processing fee (typically 2.9% + $0.30), and local VAT where applicable.' },
    { q: 'Can I change my payout method?', a: 'Yes, you can update your IBAN or payment method anytime under Bank & Payout Settings.' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Title & Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'الأرباح والتحويلات المالية' : 'Earnings & Payouts'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'ar'
              ? 'تتبع أرباحك، إدارة عمليات السحب، واستعراض الأداء المالي.'
              : 'Track your earnings, manage payouts, and view financial performance.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>May 1 – May 31, 2025</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تصدير التقرير' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Stat Cards matching Image 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  {language === 'ar' ? kpi.labelAr : kpi.label}
                </span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
              </div>

              <div className="mt-2 text-[10px] font-bold">
                <span className="text-emerald-600">
                  ▲ {kpi.change} <span className="text-slate-400 font-medium">{kpi.vs}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Pending Payout Banner */}
      <div className={`rounded-2xl p-5 border shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        (isDemo ? 3842.75 : netEarningsAmount) > 0
          ? 'bg-amber-50 border-amber-200/80'
          : 'bg-slate-50 border-slate-200/80'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black shrink-0 shadow-sm ${
            (isDemo ? 3842.75 : netEarningsAmount) > 0
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-200 text-slate-600'
          }`}>
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <strong className={`text-sm font-black block ${
              (isDemo ? 3842.75 : netEarningsAmount) > 0 ? 'text-amber-950' : 'text-slate-900'
            }`}>
              {(isDemo ? 3842.75 : netEarningsAmount) > 0 ? 'Pending Payout' : 'No Pending Payouts'}
            </strong>
            <p className={`text-xs font-medium mt-0.5 ${
              (isDemo ? 3842.75 : netEarningsAmount) > 0 ? 'text-amber-900' : 'text-slate-500'
            }`}>
              {(isDemo ? 3842.75 : netEarningsAmount) > 0
                ? 'You have funds ready to be paid out. Minimum payout threshold met.'
                : 'Completed customer bookings and repair jobs will accumulate here for weekly payout.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Amount</span>
            <strong className="text-2xl font-black text-slate-900 leading-none">
              {isDemo ? '$3,842.75' : formatPrice(netEarningsAmount)}
            </strong>
          </div>

          <button
            onClick={() => {
              if ((isDemo ? 3842.75 : netEarningsAmount) > 0) {
                showToast(
                  language === 'ar'
                    ? 'تم تقديم طلب السحب بنجاح إلى حسابك البنكي المسجل!'
                    : `Payout requested for ${isDemo ? '$3,842.75' : formatPrice(netEarningsAmount)}! Transfer processing (1-2 business days).`,
                  'success'
                );
              } else {
                showToast(
                  language === 'ar' ? 'لا يوجد رصيد معلق متاح للسحب حالياً.' : 'No pending payout balance available yet.',
                  'info'
                );
              }
            }}
            disabled={(isDemo ? 3842.75 : netEarningsAmount) === 0}
            className={`px-5 py-2.5 rounded-xl font-black text-xs shadow-sm transition-all whitespace-nowrap ${
              (isDemo ? 3842.75 : netEarningsAmount) > 0
                ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* 4. Revenue Overview Line Chart (2/3) & Commission Breakdown (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900">Revenue Overview</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* SVG Line Chart */}
          <div className="py-4">
            <div className="h-44 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" />

                {isDemo || totalRevenueAmount > 0 ? (
                  <>
                    <path
                      d="M 20 130 Q 70 110, 110 70 T 210 95 T 310 40 T 400 70 T 480 25"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {[
                      { x: 20, y: 130 },
                      { x: 70, y: 115 },
                      { x: 110, y: 70 },
                      { x: 160, y: 85 },
                      { x: 210, y: 95 },
                      { x: 260, y: 55 },
                      { x: 310, y: 40 },
                      { x: 360, y: 50 },
                      { x: 400, y: 70 },
                      { x: 450, y: 35 },
                      { x: 480, y: 25 },
                    ].map((pt, i) => (
                      <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                    ))}
                  </>
                ) : (
                  <>
                    <path
                      d="M 20 140 L 480 140"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />
                    {[20, 110, 210, 310, 400, 480].map((x, i) => (
                      <circle key={i} cx={x} cy={140} r="3" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="1.5" />
                    ))}
                  </>
                )}
              </svg>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-2">
                <span>May 1</span>
                <span>May 6</span>
                <span>May 11</span>
                <span>May 16</span>
                <span>May 21</span>
                <span>May 26</span>
                <span>May 31</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block">This Month</span>
              <strong className="text-base font-black text-slate-900 block mt-0.5">
                {isDemo ? '$24,348' : formatPrice(totalRevenueAmount)}
              </strong>
              <span className={`text-[10px] font-bold block mt-0.5 ${totalRevenueAmount > 0 || isDemo ? 'text-emerald-600' : 'text-slate-400'}`}>
                {isDemo ? '▲ 18.2%' : totalRevenueAmount > 0 ? '▲ 100%' : '0%'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block">Last Month</span>
              <strong className="text-base font-black text-slate-900 block mt-0.5">
                {isDemo ? '$20,584' : formatPrice(0)}
              </strong>
              <span className={`text-[10px] font-bold block mt-0.5 ${isDemo ? 'text-emerald-600' : 'text-slate-400'}`}>
                {isDemo ? '▲ 12.4%' : '0%'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block">This Year (YTD)</span>
              <strong className="text-base font-black text-slate-900 block mt-0.5">
                {isDemo ? '$128,690' : formatPrice(totalRevenueAmount)}
              </strong>
              <span className={`text-[10px] font-bold block mt-0.5 ${totalRevenueAmount > 0 || isDemo ? 'text-emerald-600' : 'text-slate-400'}`}>
                {isDemo ? '▲ 22.5%' : totalRevenueAmount > 0 ? '▲ 100%' : '0%'}
              </span>
            </div>
          </div>
        </div>

        {/* Commission Breakdown Donut */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
              Commission Breakdown
            </h3>

            <div className="flex items-center gap-4 mt-4">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  {(isDemo || totalRevenueAmount > 0) && (
                    <>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="70, 100" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="18.9, 100" strokeDashoffset="-70" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="11.1, 100" strokeDashoffset="-88.9" />
                    </>
                  )}
                </svg>
                <div className="absolute text-center">
                  <span className="text-[8px] text-slate-400 font-bold block">Total Commission</span>
                  <strong className="text-xs font-black text-slate-900 block leading-tight">
                    {isDemo ? '$6,718.60' : formatPrice(Math.round(totalRevenueAmount * 0.1))}
                  </strong>
                </div>
              </div>

              <div className="flex-1 space-y-2 text-xs font-bold text-slate-700">
                <div>
                  <span className="flex items-center gap-1.5 text-blue-600">● Platform Commission</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {isDemo ? '$4,695.02 (70%)' : `${formatPrice(Math.round(totalRevenueAmount * 0.07))} (70%)`}
                  </span>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-emerald-600">● Payment Processing</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {isDemo ? '$1,273.14 (18.9%)' : `${formatPrice(Math.round(totalRevenueAmount * 0.02))} (20%)`}
                  </span>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-amber-500">● VAT (5%)</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {isDemo ? '$750.44 (11.1%)' : `${formatPrice(Math.round(totalRevenueAmount * 0.01))} (10%)`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-blue-600 font-bold">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Learn more about our commission structure</span>
          </div>
        </div>
      </div>

      {/* 5. Best Performing Services, Financial Insights & Payout Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Best Performing Services */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Best Performing Services</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>

          <div className="space-y-3 mt-3">
            {bestServices.length > 0 ? (
              bestServices.map((srv, i) => (
                <div key={i} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={srv.image} alt={srv.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <div className="min-w-0">
                      <strong className="font-bold text-slate-900 block truncate">{srv.name}</strong>
                      <span className="text-[10px] text-slate-400 block">{srv.bookings}</span>
                    </div>
                  </div>
                  <div className="text-end shrink-0">
                    <strong className="font-black text-slate-900 block">{srv.revenue}</strong>
                    <span className="text-[10px] font-bold text-emerald-600">▲ {srv.change}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400">
                <p className="text-xs font-bold text-slate-600">No Service Revenue Records Yet</p>
                <p className="text-[10px] text-slate-400 mt-1">Top performing services will appear here once bookings are completed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Financial Insights */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Financial Insights</h3>
              <select className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-[10px] font-bold">
                <option>This Month</option>
              </select>
            </div>

            {isDemo ? (
              <div className="space-y-3 mt-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="font-bold text-slate-900 block">Revenue Growth</strong>
                    <p className="text-[10px] text-slate-500">Your revenue is up 18.2% compared to last month.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="font-bold text-slate-900 block">Top Service</strong>
                    <p className="text-[10px] text-slate-500">Oil Change is your top performing service.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="font-bold text-slate-900 block">Peak Day</strong>
                    <p className="text-[10px] text-slate-500">Most bookings on Saturdays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="font-bold text-slate-900 block">Customer Retention</strong>
                    <p className="text-[10px] text-slate-500">55% of your customers are returning.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <strong className="text-xs font-bold text-slate-800 block">New Provider Financial Summary</strong>
                <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Complete customer repair jobs to unlock automated revenue growth analytics, top service rankings, and booking retention metrics.
                </p>
              </div>
            )}
          </div>

          <button className="w-full py-2 mt-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs border border-slate-200">
            View Detailed Analytics
          </button>
        </div>

        {/* Payout Settings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 pb-3 border-b border-slate-100">Payout Settings</h3>

            <div className="space-y-3 mt-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Payout Method</span>
                  <strong className="text-slate-900 font-bold">Bank Transfer</strong>
                </div>
                <button className="text-blue-600 font-bold text-[10px]">Change</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Payout Frequency</span>
                  <strong className="text-slate-900 font-bold">Weekly (Every Monday)</strong>
                </div>
                <button className="text-blue-600 font-bold text-[10px]">Change</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Minimum Payout</span>
                  <strong className="text-slate-900 font-bold">{formatPrice(100)}</strong>
                </div>
                <button className="text-blue-600 font-bold text-[10px]">Change</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Next Payout Date</span>
                  <strong className="text-emerald-700 font-black">Next Monday</strong>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-2 mt-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs border border-slate-200">
            Manage Settings
          </button>
        </div>
      </div>

      {/* 6. Transaction History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">Transaction History</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-600">
              <Filter className="w-3 h-3" />
              <span>Filter</span>
            </button>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All Transactions</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4 text-start">Date</th>
                <th className="py-2.5 px-4 text-start">Description</th>
                <th className="py-2.5 px-4 text-start">Type</th>
                <th className="py-2.5 px-4 text-end">Amount</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800">{tx.date}</td>
                    <td className="py-3 px-4 font-medium">{tx.desc}</td>
                    <td className="py-3 px-4 text-slate-500">{tx.type}</td>
                    <td className={`py-3 px-4 font-black text-end ${tx.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.amount}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                    No transaction records yet. Completed customer bookings and payout distributions will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Bank Account Information & Payout Process */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bank Account Information */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
            Bank Account Information
          </h3>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#091E42] text-white flex items-center justify-center font-black text-xs">
                {isDemo ? 'NBD' : 'BANK'}
              </div>
              <div>
                <strong className="text-xs font-black text-slate-900 block">
                  {isDemo ? 'Emirates NBD' : (user?.name || providerProfile?.name || 'Your Business Bank')}
                </strong>
                <span className="text-[10px] text-slate-400">
                  {isDemo ? '•••• 4567 • AED Account' : 'Direct IBAN Payouts'}
                </span>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
              isDemo ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isDemo ? 'Verified' : 'Setup Required'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Account Holder:</span>
              <strong className="text-slate-800">
                {isDemo ? 'AHL Auto Garage LLC' : (user?.name || providerProfile?.name || 'Erlindo Garage')}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IBAN:</span>
              <strong className="text-slate-800 font-mono">
                {isDemo ? 'AE32 3456 7890 1234 5678 901' : '•••• •••• •••• •••• •••• •••'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Currency:</span>
              <strong className="text-slate-800">{isDemo ? 'AED' : 'ILS (₪) / AED'}</strong>
            </div>
          </div>

          <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-blue-600 font-bold text-xs rounded-xl">
            {isDemo ? 'Update Bank Details' : '+ Connect Verified Bank Account'}
          </button>
        </div>

        {/* Payout Process */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Payout Process</h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <strong className="font-bold text-slate-900 block">Request Payout</strong>
                <span className="text-[10px] text-slate-500">You request a payout from your earnings.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <strong className="font-bold text-slate-900 block">Processing</strong>
                <span className="text-[10px] text-slate-500">We review and process your payout.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <strong className="font-bold text-slate-900 block">Bank Transfer</strong>
                <span className="text-[10px] text-slate-500">Funds are transferred to your bank account.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                ✓
              </span>
              <div>
                <strong className="font-bold text-slate-900 block">Completed</strong>
                <span className="text-[10px] text-slate-500">You receive the payout in your bank account.</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 text-[10px] text-amber-900 font-bold flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Payouts are processed every Monday for weekly payouts.</span>
          </div>
        </div>
      </div>

      {/* 8. FAQs & Need Help? matching Image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
            Frequently Asked Questions
          </h3>

          <div className="space-y-2 text-xs">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-3 bg-slate-50 hover:bg-slate-100/80 text-start font-bold text-slate-800 flex items-center justify-between"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-3 text-[11px] text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 block text-center w-full pt-1">
            View All FAQs →
          </button>
        </div>

        {/* Need Help Support Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 pb-3 border-b border-slate-100">Need Help?</h3>

            <div className="flex items-center gap-4 mt-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Support Agent"
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our support team is available 24/7 to assist you with any questions about earnings and payouts.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <button
              onClick={() => showToast('Support hotline: +971 50 123 4567 (Toll-free 24/7)', 'info')}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
            >
              Contact Support
            </button>
            <button
              onClick={() => showToast('Live support chat session connected with Agent Sarah', 'success')}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 cursor-pointer"
            >
              Chat with Us
            </button>
          </div>
        </div>
      </div>

      {/* 9. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'نمّ أعمالك مع أهل المركبات' : 'Grow Your Business with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            Get more bookings, reach new customers, and increase your earnings with our premium tools.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
            >
              Explore Premium Tools
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
