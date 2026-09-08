import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  Fuel,
  Wrench,
  ShieldCheck,
  Package,
  Calendar,
  PieChart,
  BarChart3,
  Download,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const CustomerAnalyticsTab: React.FC = () => {
  const { language } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'1y' | '6m' | 'all'>('1y');

  const stats = [
    { label: 'Total Ownership Spend (2024)', value: 'AED 6,420', change: '-12% vs last year', positive: true },
    { label: 'Operating Cost / Kilometer', value: 'AED 0.38 / km', change: 'Optimal Efficiency', positive: true },
    { label: 'Avg Fuel Consumption', value: '8.4 L/100km', change: 'Eco-rating A+', positive: true },
    { label: 'Preventive ROI Savings', value: 'AED 1,850', change: 'Saved via timely maintenance', positive: true },
  ];

  const expenseCategories = [
    { name: 'Routine Maintenance & Oil', amount: 'AED 2,568', pct: 40, color: 'bg-blue-600', icon: Wrench },
    { name: 'Fuel & Energy Expenses', amount: 'AED 2,247', pct: 35, color: 'bg-amber-500', icon: Fuel },
    { name: 'Comprehensive Insurance', amount: 'AED 1,155', pct: 18, color: 'bg-purple-600', icon: ShieldCheck },
    { name: 'Spare Parts & Consumables', amount: 'AED 450', pct: 7, color: 'bg-emerald-600', icon: Package },
  ];

  const monthlyHistory = [
    { month: 'Jan', maintenance: 180, fuel: 320, parts: 0 },
    { month: 'Feb', maintenance: 0, fuel: 310, parts: 45 },
    { month: 'Mar', maintenance: 850, fuel: 290, parts: 189 }, // Annual major service
    { month: 'Apr', maintenance: 0, fuel: 340, parts: 0 },
    { month: 'May', maintenance: 220, fuel: 350, parts: 0 },
    { month: 'Jun', maintenance: 0, fuel: 380, parts: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-1">
            <span className="text-slate-400 text-xs font-bold block">{stat.label}</span>
            <strong className="text-2xl font-black text-slate-900 font-mono block">{stat.value}</strong>
            <span className={`text-[10px] font-bold block ${stat.positive ? 'text-emerald-600' : 'text-slate-500'}`}>
              ✓ {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Expense Category Breakdown & Visual Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Category Bars (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                Total Cost of Ownership Breakdown
              </strong>
              <span className="text-xs text-slate-500">Categorized vehicle expenditures for 2024</span>
            </div>
            <button
              onClick={() => alert('Exporting full financial ownership statement...')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="space-y-4">
            {expenseCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-md ${cat.color}`} />
                      <span className="text-slate-800">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-mono">{cat.amount}</strong>
                      <span className="text-slate-400 text-[10px]">({cat.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>AI Insight:</strong> Regular oil changes &amp; tire rotations on your Toyota RAV4 saved an estimated <strong>AED 1,850</strong> in potential engine/suspension wear.
            </span>
          </div>
        </div>

        {/* Right: Monthly Spend Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between">
          <div>
            <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
              Monthly Expenditure Trend
            </strong>
            <span className="text-xs text-slate-500">Monthly breakdown over the last 6 months</span>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
            {monthlyHistory.map((m, i) => {
              const total = m.maintenance + m.fuel + m.parts;
              const heightPct = Math.min(100, Math.max(15, (total / 1400) * 100));

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {total}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all group-hover:brightness-110"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] font-bold text-slate-500 mt-1">{m.month}</span>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 text-center font-medium">
            💡 Peak spend in March reflects the scheduled 40,000 km Major Service.
          </div>
        </div>
      </div>
    </div>
  );
};
