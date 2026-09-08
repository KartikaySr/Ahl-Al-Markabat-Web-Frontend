import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  CheckCircle2,
  Users,
  Percent,
  Sparkles,
  PieChart,
  BarChart3,
  Award,
  Star,
  FileText,
  Phone,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ProviderReportsTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderReportsTab: React.FC<ProviderReportsTabProps> = ({ onNavigateTab }) => {
  const { language, user } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const kpis = isNewUser
    ? [
        { label: 'Total Revenue', value: '$0', change: '0%', isUp: true, icon: DollarSign },
        { label: 'Net Profit', value: '$0', change: '0%', isUp: true, icon: TrendingUp },
        { label: 'Completed Jobs', value: '0', change: '0%', isUp: true, icon: CheckCircle2 },
        { label: 'Customer Retention', value: '0%', change: '0%', isUp: true, icon: Users },
        { label: 'Conversion Rate', value: '0%', change: '0%', isUp: true, icon: Percent },
        { label: 'Avg. Ticket Size', value: '$0', change: '0%', isUp: true, icon: Award },
      ]
    : [
        { label: 'Total Revenue', value: '$24,580', change: '+18.6% vs Apr 1 – Apr 30', isUp: true, icon: DollarSign },
        { label: 'Net Profit', value: '$6,845', change: '+14.2% vs Apr 1 – Apr 30', isUp: true, icon: TrendingUp },
        { label: 'Completed Jobs', value: '428', change: '+16.4% vs Apr 1 – Apr 30', isUp: true, icon: CheckCircle2 },
        { label: 'Customer Retention', value: '68.7%', change: '+9.3% vs Apr 1 – Apr 30', isUp: true, icon: Users },
        { label: 'Conversion Rate', value: '26.4%', change: '+9.8% vs Apr 1 – Apr 30', isUp: true, icon: Percent },
        { label: 'Avg. Ticket Size', value: '$57.43', change: '+6.7% vs Apr 1 – Apr 30', isUp: true, icon: Award },
      ];

  const technicians = isNewUser
    ? []
    : [
        { name: 'Ahmed H.', jobs: 32, rate: '100%', rev: '$1,850', rating: '4.9 ★', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
        { name: 'Omar K.', jobs: 28, rate: '96%', rev: '$1,540', rating: '4.8 ★', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
        { name: 'Yousef N.', jobs: 25, rate: '96%', rev: '$1,380', rating: '4.7 ★', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80' },
        { name: 'Bilal A.', jobs: 22, rate: '100%', rev: '$1,650', rating: '4.9 ★', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80' },
        { name: 'Mohammed A.', jobs: 18, rate: '90%', rev: '$1,130', rating: '4.6 ★', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80' },
      ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Filters & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'التقارير والتحليلات المتقدمة' : 'Reports & Advanced Analytics'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time insights and performance analytics to grow your automotive service business.
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
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* 2. 6 KPI Cards matching Image 5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500">{kpi.label}</span>
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-3 h-3" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-lg sm:text-xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-1 text-[9px] font-bold text-emerald-600">
                ▲ {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Top Charts: Revenue Trend Line Chart & Jobs by Service Type Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-black text-slate-900">
                  {language === 'ar' ? 'مؤشر الإيرادات' : 'Revenue Trend'}
                </h3>
                <span className="text-[10px] text-emerald-600 font-bold">
                  {isNewUser ? 'Awaiting initial transactions' : '▲ 18.6% vs previous month'}
                </span>
              </div>
              <strong className="text-base font-black text-slate-900">
                {isNewUser ? '$0' : '$24,580'}
              </strong>
            </div>

            <div className="h-44 w-full relative py-3">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                {isNewUser ? (
                  <line x1="10" y1="100" x2="490" y2="100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                ) : (
                  <>
                    <path d="M 10 100 Q 80 80, 150 40 T 300 70 T 420 30 T 490 20" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 10 110 Q 80 95, 150 70 T 300 85 T 420 55 T 490 45" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                  </>
                )}
              </svg>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-2">
                <span>{isNewUser ? 'Week 1' : 'May 1'}</span>
                <span>{isNewUser ? 'Week 2' : 'May 8'}</span>
                <span>{isNewUser ? 'Week 3' : 'May 15'}</span>
                <span>{isNewUser ? 'Week 4' : 'May 22'}</span>
                <span>{isNewUser ? 'Today' : 'May 31'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-2 border-t border-slate-100">
            <span className="text-blue-600">● {language === 'ar' ? 'هذا الشهر' : 'This Month'}</span>
            <span className="text-slate-400">--- {language === 'ar' ? 'الشهر السابق' : 'Previous Month'}</span>
          </div>
        </div>

        {/* Jobs by Service Type Donut */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
              {language === 'ar' ? 'الخدمات حسب النوع' : 'Jobs by Service Type'}
            </h3>
            <div className="flex items-center gap-4 mt-3">
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  {!isNewUser && (
                    <>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="32, 100" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="18, 100" strokeDashoffset="-32" />
                    </>
                  )}
                </svg>
                <div className="absolute text-center">
                  <strong className="text-sm font-black text-slate-900 block">
                    {isNewUser ? '0' : '428'}
                  </strong>
                  <span className="text-[7px] text-slate-400 font-bold block uppercase">
                    {language === 'ar' ? 'إجمالي الطلبات' : 'Total Jobs'}
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-1 text-[10px] font-bold text-slate-700">
                <div className="flex justify-between">
                  <span className="text-blue-600">General Service</span>
                  <span>{isNewUser ? '0%' : '32% (136)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">AC &amp; Cooling</span>
                  <span>{isNewUser ? '0%' : '18% (77)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-500">Brake Service</span>
                  <span>{isNewUser ? '0%' : '15% (64)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Diagnostics</span>
                  <span>{isNewUser ? '0%' : '12% (51)'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full py-1.5 mt-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200">
            View Full Report →
          </button>
        </div>
      </div>

      {/* 4. Middle Section: Technician Performance & Expenses vs Profit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technician Performance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">
              {language === 'ar' ? 'أداء الفنيين' : 'Technician Performance'}
            </h3>
            <button className="text-[10px] font-bold text-blue-600">View All Technicians →</button>
          </div>
          {technicians.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              {language === 'ar' ? 'لا يوجد سجلات أداء فنيين بعد' : 'No technician performance logs recorded yet.'}
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {technicians.map((t, i) => (
                <div key={i} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <strong className="font-bold text-slate-900 block">{t.name}</strong>
                      <span className="text-[10px] text-slate-400">{t.jobs} jobs completed</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="font-bold text-emerald-600 block">{t.rev}</span>
                    <span className="text-[10px] text-slate-400">{t.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Download Detailed Reports Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Download Detailed Reports</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[
                { title: 'Financial Report', desc: 'P&L, Revenue, Expenses', icon: DollarSign },
                { title: 'Jobs Report', desc: 'Jobs, Services, Technicians', icon: CheckCircle2 },
                { title: 'Customer Report', desc: 'Customers, Retention, Reviews', icon: Users },
                { title: 'Performance Report', desc: 'KPIs, Trends, Heatmaps', icon: TrendingUp },
              ].map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <strong className="text-xs font-bold text-slate-900 block">{r.title}</strong>
                      <span className="text-[9px] text-slate-400 block">{r.desc}</span>
                    </div>
                    <button className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-50">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm">
            Export All Reports
          </button>
        </div>
      </div>

      {/* 5. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'قد أعمالك ببيانات متقدمة' : 'Drive More Revenue. Deliver Excellence.'}
          </h2>
          <p className="text-xs text-slate-300">
            Use data-driven insights to grow your business and deliver exceptional service every single time.
          </p>
        </div>
      </div>
    </div>
  );
};
