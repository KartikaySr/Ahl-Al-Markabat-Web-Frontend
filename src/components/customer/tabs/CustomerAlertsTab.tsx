import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Bell,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Droplets,
  Disc,
  Snowflake,
  BatteryCharging,
  Car,
} from 'lucide-react';

export const CustomerAlertsTab: React.FC = () => {
  const { language, setActiveTab, setCustomerActiveTab } = useApp();

  const alerts = [
    {
      id: 'alt-1',
      title: 'Engine Oil & Filter Service Due',
      desc: 'Based on your current mileage (38,450 km) and 6-month interval, your next synthetic oil change is due in 1,550 km.',
      urgency: 'high',
      dueIn: 'Due in 18 Days or 1,550 km',
      icon: Droplets,
      recommendedService: 'Full Synthetic 0W-20 Oil & OEM Filter',
      estPrice: 'AED 180',
    },
    {
      id: 'alt-2',
      title: 'Front Brake Pad Wear Inspection',
      desc: 'Last inspection showed 65% pad life remaining at 32,100 km. Recommended safety check before next long highway trip.',
      urgency: 'medium',
      dueIn: 'Recommended within 45 Days',
      icon: Disc,
      recommendedService: 'Brake Safety Check & Pad Measurement',
      estPrice: 'Free with any service',
    },
    {
      id: 'alt-3',
      title: 'Summer AC Cooling Refresh (UAE Climate)',
      desc: 'Temperatures rising. We recommend an AC compressor gas pressure check and cabin anti-bacterial filter clean.',
      urgency: 'medium',
      dueIn: 'Recommended for Summer',
      icon: Snowflake,
      recommendedService: 'AC Gas Top-Up & Cabin Vapor Clean',
      estPrice: 'AED 199',
    },
    {
      id: 'alt-4',
      title: 'Tire Rotation & 3D Wheel Alignment',
      desc: 'Regular 10,000 km rotation prevents uneven tread wear and improves fuel economy by up to 4%.',
      urgency: 'low',
      dueIn: 'Due at 40,000 km',
      icon: Car,
      recommendedService: '4-Wheel Rotation & 3D Laser Alignment',
      estPrice: 'AED 120',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with AI Diagnosis Badge */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Predictive Maintenance Engine</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">Smart Vehicle Health Reminders</h2>
          <p className="text-xs text-slate-500">
            Real-time alerts calculated from your odometer, driving history, and manufacturer maintenance schedules.
          </p>
        </div>

        <button
          onClick={() => setCustomerActiveTab('providers')}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all shrink-0"
        >
          {language === 'ar' ? 'استعراض الورش وحجز الخدمات المستحقة ←' : 'Find Workshops & Book Due Services →'}
        </button>
      </div>

      {/* 2. List of Smart Alerts */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const isHigh = alert.urgency === 'high';

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-3xl p-6 border shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                isHigh ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isHigh ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm font-black text-slate-900">{alert.title}</strong>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isHigh ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {alert.dueIn}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{alert.desc}</p>
                  <div className="flex items-center gap-3 text-xs pt-1">
                    <span className="text-slate-400 font-bold text-[11px]">Recommended:</span>
                    <strong className="text-slate-900 text-[11px]">{alert.recommendedService}</strong>
                    <span>•</span>
                    <span className="font-mono text-emerald-600 font-black">{alert.estPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <button
                  onClick={() => setCustomerActiveTab('providers')}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'استعراض الورش والحجز' : 'Find Workshops'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
