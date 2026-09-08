import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Car,
  Calendar,
  Clock,
  Wrench,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Download,
  Share2,
  ChevronRight,
  ArrowLeft,
  Plus,
  Send,
  MessageCircle,
  Sparkles,
  ChevronDown,
  Info,
  Check,
  ExternalLink,
  Sliders,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';

interface ProviderVehicleDetailsTabProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ProviderVehicleDetailsTab: React.FC<ProviderVehicleDetailsTabProps> = ({
  onBack,
  onNavigateTab,
}) => {
  const { language, user, jobs } = useApp();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [invoiceTab, setInvoiceTab] = useState<'all' | 'quotes' | 'invoices'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);
  const hasVehicleData = !isNewUser || jobs.length > 0;

  if (!hasVehicleData) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'ar' ? 'تفاصيل مركبة العميل' : 'Customer Vehicle Details'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ar'
                ? 'لوحة الورشة > العملاء > المركبات > سجل وتفاصيل المركبة'
                : 'Dashboard > Customers > Vehicles > Vehicle Diagnostic & Service Records'}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => (onNavigateTab ? onNavigateTab('customers') : onBack?.())}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الرجوع إلى دليل العملاء' : 'Back to Customers'}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
            <Car className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-black text-slate-900">
              {language === 'ar' ? 'لا توجد مركبات مخدومة بعد' : 'No Serviced Vehicle Records Yet'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {language === 'ar'
                ? 'عندما يقوم العملاء بحجز مواعيد أو تقوم بإنشاء أوامر عمل جديدة لورشتك، ستظهر ملفات المركبات ومواصفاتها وسجل الفحص الشامل هنا.'
                : 'When customers book appointments or you create repair jobs at your workshop, comprehensive vehicle diagnostic profiles, specs, and service history will appear here.'}
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('jobs')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm transition-all"
            >
              {language === 'ar' ? '+ إنشاء أول أمر عمل / صيانة' : '+ Create First Repair Job'}
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('calendar')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              {language === 'ar' ? 'عرض جدول المواعيد' : 'View Calendar Schedule'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const photos = [
    { title: 'Front View', date: 'May 1, 2025', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80' },
    { title: 'Odometer', date: 'May 1, 2025', url: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400&auto=format&fit=crop&q=80' },
    { title: 'Damage – Rear Bumper', date: 'Feb 28, 2025', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=80' },
    { title: 'Tire Condition', date: 'Nov 10, 2024', url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumbs & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Vehicle Details
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Home &gt; Customers &gt; Vehicles &gt; Customer Vehicle Details
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab && onNavigateTab('customers')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Vehicles</span>
          </button>
          <button
            onClick={() => showToast('Vehicle quick actions: schedule maintenance or export telemetry')}
            className="flex items-center gap-2 px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
          >
            <span>Quick Action</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Top Split: Vehicle Card (2/3) & Owner Card (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Main Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Vehicle Image Thumbnail with Primary Badge */}
            <div className="relative w-full sm:w-56 h-40 sm:h-auto rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80"
                alt="Hyundai Tucson"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black shadow-sm">
                Primary Vehicle
              </span>
              <span className="absolute bottom-2.5 end-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                📷 1/12
              </span>
            </div>

            {/* Vehicle Specs */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Hyundai Tucson</h2>
                  <span className="text-xs text-slate-500 font-bold">2.0L GLS | 2021 | SUV</span>
                </div>
                {/* Number Plate Graphic */}
                <div className="px-3 py-1 bg-slate-900 text-white rounded-lg border border-slate-700 font-mono font-black text-xs flex items-center gap-1.5 shadow-xs">
                  <span className="text-[9px] text-amber-400 font-sans font-bold">DUBAI</span>
                  <span className="text-amber-400">D</span>
                  <span>12345</span>
                  <span className="text-[9px] text-slate-400 font-sans font-bold">UAE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">VIN</span>
                  <strong className="text-[11px] font-mono font-bold text-slate-800 truncate block">KM8J3CA4XMU123455</strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Mileage</span>
                  <strong className="text-[11px] font-black text-slate-900 block">48,765 km</strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Fuel & Trans</span>
                  <strong className="text-[11px] font-bold text-slate-800 block">Petrol • Auto</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Active
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    No Alerts
                  </span>
                </div>

                <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
                  View Vehicle Report →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Profile Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Owner</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Ahmed Al Mansoori"
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-black text-slate-900">Ahmed Al Mansoori</h3>
                <span className="text-[11px] text-amber-600 font-bold">Loyalty Tier: Gold Member</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-slate-800">+971 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">ahmed.almansoori@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Customer Since: Jan 15, 2022</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('customers')}
            className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs border border-slate-200 transition-all"
          >
            View Customer Profile
          </button>
        </div>
      </div>

      {/* 3. Action Buttons Bar (5 Action Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          {
            title: 'Book Service',
            sub: 'Schedule now',
            icon: Calendar,
            color: 'text-blue-600 bg-blue-50',
            onClick: () => (onNavigateTab ? onNavigateTab('calendar') : showToast('Navigating to Calendar...')),
          },
          {
            title: 'Create Quote',
            sub: 'New estimate',
            icon: FileText,
            color: 'text-emerald-600 bg-emerald-50',
            onClick: () => (onNavigateTab ? onNavigateTab('quotes') : showToast('Navigating to Quotes...')),
          },
          {
            title: 'Send Reminder',
            sub: 'WhatsApp / Email',
            icon: MessageCircle,
            color: 'text-purple-600 bg-purple-50',
            onClick: () => showToast('Service maintenance reminder sent to vehicle owner via WhatsApp!'),
          },
          {
            title: 'Vehicle Report',
            sub: 'Download PDF',
            icon: Download,
            color: 'text-amber-600 bg-amber-50',
            onClick: () => showToast('Complete vehicle diagnostic report downloaded as PDF!'),
          },
          {
            title: 'More Actions',
            sub: 'Manage Vehicle',
            icon: Sliders,
            color: 'text-slate-600 bg-slate-50',
            onClick: () => showToast('Vehicle OBD-II live diagnostic telemetry synced!'),
          },
        ].map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={act.onClick}
              className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-sm text-start transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-xl ${act.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-black text-slate-900 block">{act.title}</strong>
                <span className="text-[10px] text-slate-400 font-medium block">{act.sub}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Service History (Left 2/3) & Diagnosed Issues + Reminders (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service History Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Service History</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View Full History →</button>
          </div>

          <div className="space-y-4">
            {[
              {
                date: 'May 1, 2025',
                title: 'General Service',
                status: 'Completed',
                desc: 'Engine Oil Change + Oil Filter + 20-Point Check',
                km: '48,100 km',
                job: 'Job #AML-2025-1248',
                branch: 'AHL Al Markabat, Ramallah',
              },
              {
                date: 'Feb 28, 2025',
                title: 'Brake Inspection & Service',
                status: 'Completed',
                desc: 'Brake Pads + Disc Check + Fluid Top-up',
                km: '44,250 km',
                job: 'Job #AML-2025-3253',
                branch: 'AHL Al Markabat, Ramallah',
              },
              {
                date: 'Nov 10, 2024',
                title: 'AC Service & Cleaning',
                status: 'Completed',
                desc: 'AC Cleaning + Gas Refill + Filter Replacement',
                km: '41,000 km',
                job: 'Job #AML-2024-1987',
                branch: 'AHL Al Markabat, Ramallah',
              },
              {
                date: 'Aug 22, 2024',
                title: 'Tire Rotation & Balance',
                status: 'Completed',
                desc: 'Rotation + Balance + Alignment Check',
                km: '38,500 km',
                job: 'Job #AML-2024-1020',
                branch: 'AHL Al Markabat, Ramallah',
              },
              {
                date: 'May 5, 2024',
                title: 'General Checkup',
                status: 'Completed',
                desc: 'General Inspection + Fluids Check + Report',
                km: '35,220 km',
                job: 'Job #AML-2024-0045',
                branch: 'AHL Al Markabat, Ramallah',
              },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3.5 text-xs pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <strong className="font-bold text-slate-900">{s.title}</strong>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black">
                        {s.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{s.date}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{s.desc}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mt-1">
                    <span>{s.km}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-mono font-bold">{s.job}</span>
                    <span>•</span>
                    <span>{s.branch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="text-[11px] font-bold text-blue-600 text-center w-full pt-1">
            View All Service History →
          </button>
        </div>

        {/* Right Column: Diagnosed Issues & Maintenance Reminders */}
        <div className="space-y-6">
          {/* Last Diagnosed Issues */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Last Diagnosed Issues</h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="font-bold text-slate-900">Brake Pads Wear</strong>
                  <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[9px] font-black">Medium Priority</span>
                </div>
                <p className="text-[10px] text-slate-600">Recommended replacement in 5,000 km</p>
                <span className="text-[9px] text-slate-400 block font-bold">May 1, 2025</span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="font-bold text-slate-900">Engine Air Filter Dirty</strong>
                  <span className="px-1.5 py-0.5 bg-blue-200 text-blue-900 rounded text-[9px] font-black">Low Priority</span>
                </div>
                <p className="text-[10px] text-slate-600">Recommended replacement</p>
                <span className="text-[9px] text-slate-400 block font-bold">May 1, 2025</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="font-bold text-slate-900">AC Cooling Performance</strong>
                  <span className="px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded text-[9px] font-black">Normal</span>
                </div>
                <p className="text-[10px] text-slate-600">No issues detected</p>
                <span className="text-[9px] text-slate-400 block font-bold">May 1, 2025</span>
              </div>
            </div>
          </div>

          {/* Maintenance Reminders */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Maintenance Reminders</h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="font-bold text-slate-900 block">Engine Oil Change</strong>
                  <span className="text-[10px] text-slate-400">Due in 3,235 km</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600">Est. Jun 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="font-bold text-slate-900 block">Tire Rotation</strong>
                  <span className="text-[10px] text-slate-400">Due in 5,235 km</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600">Est. May 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="font-bold text-slate-900 block">Brake Fluid Check</strong>
                  <span className="text-[10px] text-slate-400">Due in 5,000 km</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600">Est. Aug 2025</span>
              </div>
            </div>
            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200">
              + Set Custom Reminder
            </button>
          </div>
        </div>
      </div>

      {/* 5. Warranty, Insurance & Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Warranty Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Warranty Information
            </h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">Active</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <strong className="text-slate-900 block">Hyundai Warranty</strong>
            <div>Coverage: <span className="font-bold text-slate-800">Basic Warranty</span></div>
            <div>Valid until: <span className="font-bold text-slate-800">May 15, 2026</span></div>
            <div>Remaining: <span className="font-black text-emerald-600">8 months</span></div>
          </div>
          <button className="text-[11px] font-bold text-blue-600 block pt-1">View Warranty Details →</button>
        </div>

        {/* Insurance Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" /> Insurance Information
            </h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">Active</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <strong className="text-slate-900 block">Oman Insurance Company</strong>
            <div>Policy No: <span className="font-mono font-bold text-slate-800">OIC-2024-778899</span></div>
            <div>Valid Until: <span className="font-bold text-slate-800">Nov 28, 2025</span></div>
            <div>Coverage: <span className="font-bold text-slate-800">Comprehensive</span></div>
          </div>
          <button className="text-[11px] font-bold text-blue-600 block pt-1">View Insurance Details →</button>
        </div>

        {/* Location & Pickup Info */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" /> Vehicle Location & Pickup
            </h3>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <div>Last Known Location: <strong className="text-slate-900">Ramallah, Palestine</strong></div>
            <div>Preferred Pickup: <strong className="text-slate-900">Home</strong></div>
          </div>
          <div className="h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
              alt="Map thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-rose-600 drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Uploaded Images & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uploaded Images Gallery */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Uploaded Images</h3>
            <button className="text-[11px] font-bold text-blue-600">View All (12) →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((p, i) => (
              <div key={i} className="space-y-1 text-center">
                <img src={p.url} alt={p.title} className="w-full h-20 rounded-xl object-cover border border-slate-200" />
                <strong className="text-[10px] font-bold text-slate-900 block truncate">{p.title}</strong>
                <span className="text-[9px] text-slate-400 block">{p.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Documents</h3>
            <button className="text-[11px] font-bold text-blue-600">View All →</button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { title: 'Registration Card', date: 'Uploaded on May 1, 2025', format: 'PDF' },
              { title: 'Insurance Policy', date: 'Uploaded on May 1, 2025', format: 'PDF' },
              { title: 'Driving License', date: 'Uploaded on May 1, 2025', format: 'JPG' },
            ].map((d, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <strong className="font-bold text-slate-900 block">{d.title}</strong>
                    <span className="text-[9px] text-slate-400">{d.date}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">{d.format}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Parts Used History & Previous Quotes/Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parts Used History */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Parts Used History</h3>
            <button className="text-[11px] font-bold text-blue-600">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold border-b border-slate-100 text-[10px]">
                  <th className="py-2 px-2 text-start">Date</th>
                  <th className="py-2 px-2 text-start">Part Name</th>
                  <th className="py-2 px-2 text-start">Part No.</th>
                  <th className="py-2 px-2 text-center">Qty</th>
                  <th className="py-2 px-2 text-end">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  { date: 'May 1, 2025', name: 'Oil Filter', no: '26300-35505', qty: 1, price: '45.00' },
                  { date: 'May 1, 2025', name: 'Engine Oil 5W-30 (4L)', no: '05100-00441', qty: 1, price: '135.00' },
                  { date: 'Feb 28, 2025', name: 'Front Brake Pads', no: '58101-D3A00', qty: 1, price: '210.00' },
                  { date: 'Feb 28, 2025', name: 'Brake Cleaner Spray', no: 'BRK-CLN-500', qty: 1, price: '25.00' },
                  { date: 'Nov 10, 2024', name: 'AC Cabin Filter', no: '97133-D1000', qty: 1, price: '68.00' },
                ].map((p, i) => (
                  <tr key={i}>
                    <td className="py-2 px-2 text-slate-500">{p.date}</td>
                    <td className="py-2 px-2 font-bold text-slate-900">{p.name}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-slate-500">{p.no}</td>
                    <td className="py-2 px-2 text-center font-bold">{p.qty}</td>
                    <td className="py-2 px-2 text-end font-bold">AED {p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Previous Quotes & Invoices */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Previous Quotes & Invoices</h3>
            <button className="text-[11px] font-bold text-blue-600">View All →</button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { id: 'INV-2025-1128', date: 'May 1, 2025', amount: 'AED 265.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-800' },
              { id: 'INV-2025-0891', date: 'Feb 28, 2025', amount: 'AED 875.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-800' },
              { id: 'INV-2024-0072', date: 'Nov 10, 2024', amount: 'AED 355.00', status: 'Paid', color: 'bg-emerald-100 text-emerald-800' },
              { id: 'Q-2025-1568', date: 'May 10, 2025', amount: 'AED 1,250.00', status: 'Sent', color: 'bg-blue-100 text-blue-800' },
            ].map((inv, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="font-mono font-bold text-blue-600 block">{inv.id}</strong>
                  <span className="text-[9px] text-slate-400">{inv.date}</span>
                </div>
                <div className="text-end">
                  <strong className="font-black text-slate-900 block">{inv.amount}</strong>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black ${inv.color}`}>{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'حافظ على سلاسة وأمان رحلتك' : 'Keep Your Journey Smooth & Safe'}
          </h2>
          <p className="text-xs text-slate-300">
            Book your next service today and enjoy peace of mind on every drive.
          </p>
        </div>
      </div>
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
