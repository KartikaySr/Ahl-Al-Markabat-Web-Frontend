import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Star,
  MessageSquare,
  TrendingUp,
  Award,
  AlertTriangle,
  Download,
  Calendar,
  ChevronDown,
  Filter,
  CheckCircle2,
  ThumbsUp,
  CornerDownRight,
  Send,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Search,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface ProviderReviewsTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderReviewsTab: React.FC<ProviderReviewsTabProps> = ({ onNavigateTab }) => {
  const { language, user, jobs, placedBookings, showToast } = useApp();
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('All Ratings');

  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const kpis = isNewUser
    ? [
        { label: 'Overall Rating', value: '5.0', stars: true, change: 'New Account', isUp: true, icon: Star },
        { label: 'Total Reviews', value: '0', change: 'Awaiting feedback', isUp: true, icon: MessageSquare },
        { label: 'Response Rate', value: '100%', change: 'Optimal', isUp: true, icon: TrendingUp },
        { label: 'Reputation Score', value: '100 / 100', change: 'Verified Partner', isUp: true, icon: Award },
        { label: 'Unresolved Complaints', value: '0', change: 'Zero complaints', isDanger: false, isUp: true, icon: AlertTriangle },
      ]
    : [
        { label: 'Overall Rating', value: '4.8', stars: true, change: '+0.2 vs Apr 1 – Apr 30', isUp: true, icon: Star },
        { label: 'Total Reviews', value: '2,458', change: '+18.4% vs last month', isUp: true, icon: MessageSquare },
        { label: 'Response Rate', value: '96.3%', change: '+7.4% vs last month', isUp: true, icon: TrendingUp },
        { label: 'Reputation Score', value: '92 / 100', change: '+6.1% vs last month', isUp: true, icon: Award },
        { label: 'Unresolved Complaints', value: '7', change: '-3 vs last month', isDanger: true, isUp: false, icon: AlertTriangle },
      ];

  const reviews = isNewUser
    ? []
    : [
        {
          name: 'Omar A.',
          car: 'Toyota Camry',
          service: 'Oil Change',
          rating: 5.0,
          comment: 'Excellent service! The team was professional, quick, and explained everything clearly.',
          date: 'May 30, 2025 • 10:45 AM',
          branch: 'Ramallah',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        },
        {
          name: 'Lina M.',
          car: 'Hyundai Tucson',
          service: 'AC Repair',
          rating: 4.0,
          comment: 'Very good experience. AC is working perfectly now. Staff were friendly.',
          date: 'May 30, 2025 • 09:20 AM',
          branch: 'Ramallah',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        },
        {
          name: 'Yousef K.',
          car: 'Kia Sportage',
          service: 'Brake Service',
          rating: 5.0,
          comment: 'Great service and transparent pricing. Will definitely come back.',
          date: 'May 30, 2025 • 04:15 PM',
          branch: 'Al-Bireh',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        },
        {
          name: 'Sara H.',
          car: 'Mercedes C200',
          service: 'General Service',
          rating: 4.0,
          comment: 'Good service overall. The waiting lounge is comfortable.',
          date: 'May 30, 2025 • 03:40 PM',
          branch: 'Ramallah',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
        },
        {
          name: 'Ahmed R.',
          car: 'Nissan X-Trail',
          service: 'Tires Replacement',
          rating: 2.0,
          comment: 'Took longer than expected and communication could be better.',
          date: 'May 30, 2025 • 12:10 PM',
          branch: 'Ramallah',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80',
        },
      ];

  const complaints = isNewUser
    ? []
    : [
        { id: 'C-2025-0457', name: 'Mohammed D.', issue: 'Delay in Service', status: 'New', color: 'bg-amber-100 text-amber-800' },
        { id: 'C-2025-0456', name: 'Rania S.', issue: 'Overcharging', status: 'In Progress', color: 'bg-blue-100 text-blue-800' },
        { id: 'C-2025-0455', name: 'Bilal H.', issue: 'Poor Communication', status: 'In Progress', color: 'bg-blue-100 text-blue-800' },
        { id: 'C-2025-0454', name: 'Lama T.', issue: 'Service Quality', status: 'Pending Info', color: 'bg-purple-100 text-purple-800' },
        { id: 'C-2025-0453', name: 'Zaid K.', issue: 'Parts Warranty', status: 'Resolved', color: 'bg-emerald-100 text-emerald-800' },
      ];

  const topPraised = isNewUser
    ? []
    : [
        { rank: 1, name: 'Oil Change', score: '4.9', count: 523, pct: '98%' },
        { rank: 2, name: 'AC Repair', score: '4.8', count: 412, pct: '94%' },
        { rank: 3, name: 'General Service', score: '4.8', count: 398, pct: '92%' },
        { rank: 4, name: 'Brake Service', score: '4.7', count: 321, pct: '89%' },
        { rank: 5, name: 'Tires Replacement', score: '4.6', count: 204, pct: '85%' },
      ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Date Filter & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'إدارة التقييمات والسمعة' : 'Reviews & Reputation Management'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor customer feedback, manage reviews, and build a trusted reputation.
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
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Cards matching Image 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${kpi.isDanger ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</span>
                {kpi.stars && <span className="text-amber-500 text-xs">★★★★★</span>}
              </div>
              <div className="mt-2 text-[10px] font-bold">
                <span className={kpi.isDanger ? 'text-rose-600' : 'text-emerald-600'}>
                  ▲ {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Charts Row: Rating Distribution, Reputation Trend, Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Distribution Donut */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
            {language === 'ar' ? 'توزيع التقييمات' : 'Rating Distribution'}
          </h3>
          <div className="flex items-center gap-4 mt-3">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                {!isNewUser && (
                  <>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="68, 100" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray="21, 100" strokeDashoffset="-68" />
                  </>
                )}
              </svg>
              <div className="absolute text-center">
                <strong className="text-sm font-black text-slate-900 block">
                  {isNewUser ? '0' : '2,458'}
                </strong>
                <span className="text-[7px] text-slate-400 font-bold block uppercase">
                  {language === 'ar' ? 'إجمالي التقييمات' : 'Total Reviews'}
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-1 text-[11px] font-bold text-slate-700">
              <div className="flex justify-between">
                <span className="text-emerald-600">5 Stars</span>
                <span>{isNewUser ? '0% (0)' : '68% (1,671)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">4 Stars</span>
                <span>{isNewUser ? '0% (0)' : '21% (516)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-500">3 Stars</span>
                <span>{isNewUser ? '0% (0)' : '7% (172)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-500">2 Stars</span>
                <span>{isNewUser ? '0% (0)' : '2% (49)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-500">1 Star</span>
                <span>{isNewUser ? '0% (0)' : '2% (50)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reputation Trend */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
            {language === 'ar' ? 'مؤشر السمعة' : 'Reputation Trend'}
          </h3>
          <div className="py-2">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-xl font-black text-slate-900">
                {isNewUser ? '5.0' : '4.8'}
              </strong>
              <span className="text-[10px] text-emerald-600 font-bold">
                {isNewUser ? '★ Verified Partner' : '▲ 0.2 vs last month'}
              </span>
            </div>
            <div className="h-20 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                {isNewUser ? (
                  <>
                    <line x1="10" y1="40" x2="290" y2="40" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="150" cy="40" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                  </>
                ) : (
                  <>
                    <path d="M 10 65 Q 60 50, 100 45 T 180 30 T 250 15 T 290 10" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                    <circle cx="290" cy="10" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  </>
                )}
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold">
              <span>{isNewUser ? 'Week 1' : 'May 1'}</span>
              <span>{isNewUser ? 'Week 2' : 'May 8'}</span>
              <span>{isNewUser ? 'Week 3' : 'May 15'}</span>
              <span>{isNewUser ? 'Week 4' : 'May 22'}</span>
              <span>{isNewUser ? 'Today' : 'May 29'}</span>
            </div>
          </div>
        </div>

        {/* Sentiment Overview */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
            {language === 'ar' ? 'انطباع العملاء' : 'Sentiment Overview'}
          </h3>
          <div className="flex items-center gap-4 mt-3">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray={isNewUser ? "100, 100" : "86, 100"} />
              </svg>
              <div className="absolute text-center">
                <strong className="text-sm font-black text-slate-900 block">
                  {isNewUser ? '100%' : '86%'}
                </strong>
                <span className="text-[7px] text-slate-400 font-bold block uppercase">
                  {isNewUser ? (language === 'ar' ? 'ممتاز' : 'Baseline') : (language === 'ar' ? 'إيجابي' : 'Positive')}
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 text-xs font-bold text-slate-700">
              <div className="flex justify-between">
                <span className="text-emerald-600">● Positive</span>
                <span>{isNewUser ? '100%' : '86%'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">● Neutral</span>
                <span>{isNewUser ? '0%' : '9%'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-600">● Negative</span>
                <span>{isNewUser ? '0%' : '5%'}</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 pt-2 block">
            {isNewUser ? (language === 'ar' ? 'معدل قياسي أولي للحساب الجديد' : 'Initial reputation standard for new provider') : '▲ 11% positive vs last month'}
          </span>
        </div>
      </div>

      {/* 4. Latest Reviews & Complaint Resolution Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Reviews (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Latest Reviews</h3>
            <select
              value={selectedRatingFilter}
              onChange={(e) => setSelectedRatingFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 outline-none"
            >
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>Low Ratings</option>
            </select>
          </div>

          {reviews.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-xs">
              No customer reviews yet. Reviews will automatically appear here once customers complete bookings at your workshop.
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <strong className="font-bold text-slate-900 block">{r.name}</strong>
                        <span className="text-[10px] text-slate-400">{r.car} • {r.service}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 font-black text-amber-500">
                      <span>★ {r.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-slate-700 text-[11px] leading-relaxed">{r.comment}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px] text-slate-400">
                    <span>{r.date} • {r.branch}</span>
                    <div className="flex items-center gap-2">
                      <button className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px]">
                        Reply
                      </button>
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="text-[11px] font-bold text-blue-600 text-center w-full pt-1">
            View All Reviews →
          </button>
        </div>

        {/* Complaint Resolution Queue (1/3) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Complaint Resolution Queue</h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>

            {complaints.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No active complaints. Your customer satisfaction is clear!
              </div>
            ) : (
              <div className="space-y-2.5 mt-3 text-xs">
                {complaints.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <strong className="font-bold text-slate-900 block">{c.id} • {c.name}</strong>
                      <span className="text-[10px] text-slate-500">{c.issue}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black ${c.color}`}>{c.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="text-[11px] font-bold text-blue-600 text-center w-full pt-2">
            View All Complaints →
          </button>
        </div>
      </div>

      {/* 5. Top Praised Services & Response Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Praised Services */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Top Praised Services</h3>
          {topPraised.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-xs">
              No rated services yet. Praise metrics will update as reviews are submitted.
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              {topPraised.map((s) => (
                <div key={s.rank} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] flex items-center justify-center shrink-0">
                    {s.rank}
                  </span>
                  <span className="w-32 truncate font-bold text-slate-800">{s.name}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: s.pct }} />
                  </div>
                  <span className="text-amber-500 font-black text-[11px]">★ {s.score}</span>
                  <span className="text-[10px] text-slate-400">({s.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Response Templates */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Response Templates</h3>
            <button className="text-[10px] font-bold text-blue-600">Manage</button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              'Thank You – Positive Review',
              'Apology – Negative Experience',
              'Service Follow Up',
              'Request More Details',
              'Complaint Resolved',
            ].map((t, i) => (
              <button
                key={i}
                onClick={() => showToast(`Template response "${t}" copied to composer!`, 'info')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-start flex items-center justify-between font-bold text-slate-700 cursor-pointer"
              >
                <span>{t}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'عزّز سمعتك مع أهل المركبات' : 'Grow Your Reputation with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            Happy customers. Strong reviews. More bookings every single month.
          </p>
        </div>
      </div>
    </div>
  );
};
