import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Wrench,
  DollarSign,
  Star,
  Mail,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Plus,
  FileText,
  UserPlus,
  Car,
  Package,
  Bell,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Phone,
  HelpCircle,
  Download,
  Check,
  Truck,
  Radio,
  ShieldAlert,
  MapPin,
  Zap,
  Sparkles,
} from 'lucide-react';

interface ProviderOverviewTabProps {
  onNavigateTab: (tab: string) => void;
}

export const ProviderOverviewTab: React.FC<ProviderOverviewTabProps> = ({ onNavigateTab }) => {
  const {
    language,
    formatPrice,
    jobs,
    placedBookings,
    serviceRequests,
    user,
    providerProfile,
    activeEmergency,
    acceptEmergencySOS,
    completeEmergencySOS,
  } = useApp();
  const [dateRange] = useState('May 1 – May 31, 2025');
  const [revenuePeriod] = useState('This Month');

  const currentProviderId = user?.id || providerProfile?.id || 'prov-1';
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const myJobs = jobs.filter((j) => j.providerId === currentProviderId || (!j.providerId && !isNewUser));
  const myBookings = placedBookings.filter((b) => b.providerId === currentProviderId || (!b.providerId && !isNewUser));
  const activeJobsCount = myJobs.filter((j) => j.status === 'in_progress' || j.status === 'scheduled').length;
  const totalRevenueAmount =
    myJobs.filter((j) => j.status === 'completed').reduce((acc, j) => acc + (j.totalAmount || 0), 0) +
    myBookings.reduce((acc, b) => acc + (b.price || 0), 0);
  const totalBookingsCount = myBookings.length + myJobs.length;
  const pendingRequestsCount = isNewUser ? 0 : serviceRequests.length;

  const workshopTitle = user?.name || providerProfile?.name || 'Erlindo Garage';

  // 1. Dynamic KPI Stats
  const kpis = [
    {
      id: 'bookings',
      label: 'Total Bookings',
      labelAr: 'إجمالي الحجوزات',
      value: isNewUser ? '0' : String(totalBookingsCount > 0 ? totalBookingsCount : 142),
      change: isNewUser ? 'New' : '+18.4%',
      vs: isNewUser ? 'Ready for bookings' : 'vs Apr',
      isUp: true,
      icon: CalendarIcon,
    },
    {
      id: 'active_jobs',
      label: 'Active Jobs',
      labelAr: 'الأعمال النشطة',
      value: isNewUser ? '0' : String(activeJobsCount > 0 ? activeJobsCount : 18),
      change: isNewUser ? '0 on floor' : '+12.6%',
      vs: isNewUser ? 'Add walk-in job' : 'vs Apr',
      isUp: true,
      icon: Wrench,
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      labelAr: 'إجمالي الإيرادات',
      value: isNewUser ? formatPrice(0) : (totalRevenueAmount > 0 ? formatPrice(totalRevenueAmount) : (language === 'ar' ? '68,450 د.إ' : 'AED 68,450')),
      change: isNewUser ? '0.00' : '+24.8%',
      vs: isNewUser ? 'First sale pending' : 'vs Apr',
      isUp: true,
      icon: DollarSign,
    },
    {
      id: 'rating',
      label: 'Average Rating',
      labelAr: 'متوسط التقييم',
      value: isNewUser ? (language === 'ar' ? 'جديد' : 'New') : '4.95',
      star: !isNewUser,
      change: isNewUser ? '★' : '+0.15',
      vs: isNewUser ? 'Unrated' : 'vs Apr',
      isUp: true,
      icon: Star,
    },
    {
      id: 'pending',
      label: 'Pending Requests',
      labelAr: 'الطلبات المعلقة',
      value: isNewUser ? '0' : String(pendingRequestsCount > 0 ? pendingRequestsCount : 7),
      change: isNewUser ? '0' : '+4',
      vs: isNewUser ? 'Ready' : 'vs Apr',
      isUp: false,
      icon: Mail,
    },
  ];

  // Fallback realistic dummy data (only shown for demo provider account)
  const fallbackBookingRequests = [
    {
      id: 'REQ-101',
      name: 'Ahmed Al Mansoori',
      service: 'Major Service & Brake Check',
      vehicle: '2023 Toyota Land Cruiser (Dubai A 88912)',
      time: 'Today • 10:30 AM',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'REQ-102',
      name: 'Mariam Al-Hashemi',
      service: 'Dual Zone AC Climate Flush & Freon',
      vehicle: '2022 Lexus RX350 (Dubai B 45129)',
      time: 'Today • 11:45 AM',
      status: 'confirmed',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'REQ-103',
      name: 'Tariq Mansour',
      service: 'HV Battery SOH Assessment & Inverter',
      vehicle: '2023 Hyundai Ioniq 5 (Abu Dhabi 12 44321)',
      time: 'Today • 02:00 PM',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'REQ-104',
      name: 'Saeed Al-Khatib',
      service: '3D Laser Alignment & Pirelli Tires',
      vehicle: '2021 BMW 530i (Dubai C 77123)',
      time: 'Tomorrow • 09:00 AM',
      status: 'confirmed',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const fallbackActiveJobs = [
    {
      id: 'AML-2025-1248',
      vehicle: '2022 Mercedes-Benz C200 AMG',
      customer: 'Tariq Mansour',
      service: 'Air Suspension & Transmission Oil Service',
      time: 'Bay 3 • 2h Remaining',
      status: 'In Progress',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'AML-2025-1249',
      vehicle: '2023 Toyota Land Cruiser GR Sport',
      customer: 'Ahmed Al Mansoori',
      service: 'OEM Brembo Brake Pads & Rotor Skimming',
      time: 'Bay 1 • 45m Remaining',
      status: 'In Progress',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'AML-2025-1250',
      vehicle: '2021 Hyundai Tucson Smartstream',
      customer: 'Saeed Al-Khatib',
      service: '10,000 km Full Synthetic Oil & Multi-Point DVI',
      time: 'Bay 4 • Quality Check',
      status: 'Ready',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'AML-2025-1251',
      vehicle: '2023 Porsche Cayenne S',
      customer: 'Dr. Munir Al-Disi',
      service: 'Dual Compressor AC Climate Overhaul',
      time: 'Bay 2 • In Progress',
      status: 'In Progress',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const fallbackAppointments = [
    {
      time: '09:30 AM',
      vehicle: '2023 Toyota Land Cruiser GR',
      customer: 'Ahmed Al Mansoori',
      service: 'Brake Overhaul & Laser Skimming',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=120&auto=format&fit=crop&q=80',
    },
    {
      time: '11:00 AM',
      vehicle: '2022 Mercedes-Benz C200',
      customer: 'Tariq Mansour',
      service: 'Air Suspension Diagnostic',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=120&auto=format&fit=crop&q=80',
    },
    {
      time: '02:15 PM',
      vehicle: '2021 Hyundai Tucson',
      customer: 'Saeed Al-Khatib',
      service: 'Oil & Filter Service',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&auto=format&fit=crop&q=80',
    },
    {
      time: '04:30 PM',
      vehicle: '2023 Porsche Cayenne S',
      customer: 'Dr. Munir Al-Disi',
      service: 'AC Cooling & Freon',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&auto=format&fit=crop&q=80',
    },
  ];

  // 2. Recent Booking Requests
  const recentBookingRequests = myBookings.length > 0
    ? myBookings.slice(0, 5).map((b) => ({
        id: b.id,
        name: b.customerName || 'Customer',
        service: b.serviceName,
        vehicle: b.vehicleDetails,
        time: `${b.date} • ${b.timeSlot}`,
        status: b.status,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      }))
    : isNewUser
    ? []
    : fallbackBookingRequests;

  // 3. Active Jobs
  const activeJobs = myJobs.length > 0
    ? myJobs.map((j) => ({
        id: j.id,
        vehicle: j.vehicleName,
        customer: j.customerName,
        service: j.serviceTitle,
        time: j.scheduledTime || 'Scheduled',
        status: j.status === 'in_progress' ? 'In Progress' : j.status === 'ready' ? 'Ready' : j.status,
        statusColor: j.status === 'in_progress' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=120&auto=format&fit=crop&q=80',
      }))
    : isNewUser
    ? []
    : fallbackActiveJobs;

  // 4. Today's Appointments
  const todayAppointments = myBookings.length > 0
    ? myBookings.map((b) => ({
        time: b.timeSlot || 'Scheduled',
        vehicle: b.vehicleDetails,
        customer: b.customerName,
        service: b.serviceName,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=120&auto=format&fit=crop&q=80',
      }))
    : isNewUser
    ? []
    : fallbackAppointments;

  // 5. Notifications matching Image 1 (empty for new provider accounts)
  const notifications = isNewUser
    ? []
    : [
        {
          id: '1',
          title: 'New booking request from Omar A.',
          subtitle: 'Oil Change • Toyota Camry',
          time: '7m',
          icon: CalendarIcon,
          color: 'bg-red-100 text-red-600',
          dot: true,
        },
        {
          id: '2',
          title: 'Payment received from Lina M.',
          subtitle: '$120.00 for Brake Inspection',
          time: '1h',
          icon: DollarSign,
          color: 'bg-emerald-100 text-emerald-600',
          dot: true,
        },
        {
          id: '3',
          title: 'Parts order delivered',
          subtitle: 'Order #PRF-4587 has been delivered',
          time: '2h',
          icon: Package,
          color: 'bg-blue-100 text-blue-600',
          dot: true,
        },
        {
          id: '4',
          title: 'New review received',
          subtitle: 'Sara H. left a 5-star rating ⭐',
          time: '3h',
          icon: Star,
          color: 'bg-amber-100 text-amber-600',
          dot: false,
        },
        {
          id: '5',
          title: 'Job completed',
          subtitle: 'AC Repair for Yousef K. completed',
          time: '4h',
          icon: CheckCircle2,
          color: 'bg-emerald-100 text-emerald-600',
          dot: false,
        },
      ];

  // 6. Top Services matching Image 1 (empty for new provider accounts)
  const topServices = isNewUser
    ? []
    : [
        { name: 'Oil Change', nameAr: 'تغيير الزيت', count: 248, change: '+18%', isUp: true, icon: '🛢️' },
        { name: 'Brake Service', nameAr: 'صيانة الفرامل', count: 186, change: '+12%', isUp: true, icon: '🛑' },
        { name: 'AC Repair', nameAr: 'صيانة التكييف', count: 142, change: '+22%', isUp: true, icon: '❄️' },
        { name: 'Tire Replacement', nameAr: 'تبديل الإطارات', count: 118, change: '+9%', isUp: true, icon: '🛞' },
        { name: 'Battery Service', nameAr: 'فحص البطارية', count: 96, change: '+15%', isUp: true, icon: '🔋' },
      ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Title & Date / Export controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'نظرة عامة على لوحة التحكم' : 'Dashboard Overview'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'ar'
              ? `مرحباً بعودتك يا ${workshopTitle}! إليك ملخص أداء أعمال ورشتك.`
              : `Welcome back, ${workshopTitle}! Here's what's happening with your business.`}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تصدير التقرير' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* Live Emergency SOS Dispatch Radar (if emergency is active) */}
      {activeEmergency && activeEmergency.status !== 'completed' && activeEmergency.status !== 'cancelled' && (
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 border-2 border-rose-600/60 shadow-2xl shadow-rose-950/40 space-y-4 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center animate-pulse shrink-0 shadow-md">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] uppercase shadow-sm">
                    {language === 'ar' ? 'رادار طوارئ SOS نشط' : 'LIVE SOS RADAR ACTIVE'}
                  </span>
                  <span className="text-xs text-rose-300 font-mono font-bold">
                    #{activeEmergency.id}
                  </span>
                  {activeEmergency.price && (
                    <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {formatPrice(activeEmergency.price)}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-1">
                  {language === 'ar'
                    ? `طلب إنقاذ سطحة وارد: ${activeEmergency.emergencyType} (${activeEmergency.vehicleName})`
                    : `Incoming Emergency Dispatch: ${activeEmergency.emergencyType} (${activeEmergency.vehicleName})`}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {activeEmergency.status === 'searching' ? (
                <button
                  type="button"
                  onClick={() =>
                    acceptEmergencySOS(activeEmergency.id, {
                      name: providerProfile?.name || 'AutoTech Tow Patrol',
                      phone: providerProfile?.phone || '+970 59 999 8888',
                    })
                  }
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>{language === 'ar' ? 'قبول الطلب وتوجيه الونش ⚡' : 'Accept & Deploy Patrol ⚡'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => completeEmergencySOS(activeEmergency.id)}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{language === 'ar' ? 'إتمام المهمة وإصدار الفاتورة' : 'Complete & Issue Report'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-2 border-t border-slate-800">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">
                {language === 'ar' ? 'العميل والهاتف:' : 'Customer & Phone:'}
              </span>
              <strong className="text-white font-bold block truncate">
                {activeEmergency.customerName} ({activeEmergency.customerPhone})
              </strong>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">
                {language === 'ar' ? 'الموقع الجغرافي:' : 'Breakdown Location:'}
              </span>
              <strong className="text-white font-bold block truncate">
                {activeEmergency.locationAddress}
              </strong>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">
                {language === 'ar' ? 'رقم اللوحة:' : 'Vehicle Plate:'}
              </span>
              <strong className="text-amber-400 font-mono font-bold block">
                {activeEmergency.vehiclePlate || '7-8899-22'}
              </strong>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">
                {language === 'ar' ? 'الحالة الحالية:' : 'Current Status:'}
              </span>
              <span className="text-emerald-400 font-black flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeEmergency.status}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0F1E36] text-white shadow-md border border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E36] via-[#0F1E36]/90 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=1400&auto=format&fit=crop&q=80"
          alt="Automotive Workshop"
          className="absolute inset-0 w-full h-full object-cover object-center mix-blend-overlay opacity-60"
        />

        <div className="relative z-20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">
              {isNewUser ? (
                <>
                  {language === 'ar' ? 'أهلاً بك في منصة' : 'Welcome to Your'}{' '}
                  <span className="text-amber-400 font-black">
                    {language === 'ar' ? 'إدارة ورشتك الرقمية' : 'Workshop Command Center'}
                  </span>
                </>
              ) : (
                <>
                  {language === 'ar' ? 'حافظ على تقدم أعمالك' : 'Keep Your Business'}{' '}
                  <span className="text-amber-400 font-black">
                    {language === 'ar' ? 'نحو الأمام' : 'Moving Forward'}
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {isNewUser
                ? (language === 'ar'
                    ? `تم تفعيل حساب ورشة "${workshopTitle}" بنجاح! ابدأ بضبط قائمة خدماتك وأسعارك وتعيين الفنيين لبدء استقبال الحجوزات.`
                    : `Your workshop account for "${workshopTitle}" is live! Add your services, bays, and staff to start receiving bookings.`)
                : (language === 'ar'
                    ? 'أداءك ممتاز اليوم! لديك أوامر عمل نشطة وطلبات حجز جديدة.'
                    : "You're doing great! Here is your live workshop floor and active bookings overview.")}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onNavigateTab(isNewUser ? 'services' : 'booking-requests')}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isNewUser ? (language === 'ar' ? 'إعداد قائمة الخدمات والأسعار' : 'Configure Services & Pricing') : (language === 'ar' ? 'عرض الحجوزات' : 'View Bookings')}</span>
              </button>
              <button
                onClick={() => onNavigateTab('jobs')}
                className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إنشاء أمر عمل لمركبة واردة' : 'Create Walk-in Job'}</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&auto=format&fit=crop&q=80"
              alt="Technician"
              className="w-48 h-32 rounded-xl object-cover border-2 border-white/10 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* 3. 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-500">
                  {language === 'ar' ? kpi.labelAr : kpi.label}
                </span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
                {kpi.star && <span className="text-amber-400 text-base font-bold">★</span>}
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold">
                <span
                  className={`flex items-center gap-0.5 ${
                    kpi.isUp ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {kpi.isUp ? '▲' : '▼'} {kpi.change}
                </span>
                <span className="text-slate-400">{kpi.vs}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Second Row: Revenue Overview (2/3) & Recent Booking Requests (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'نظرة عامة على الإيرادات' : 'Revenue Overview'}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{isNewUser ? formatPrice(0) : '$24,580'}</span>
                <span className={`text-[11px] font-bold ${isNewUser ? 'text-slate-400' : 'text-emerald-600'} flex items-center gap-0.5`}>
                  {isNewUser
                    ? (language === 'ar' ? 'ورشة جديدة — سيبدأ الرسم البياني بالتسجيل فور إتمام الطلبات' : 'New Workshop — Live revenue charts upon completion')
                    : '▲ 15.3% vs last month'}
                </span>
              </div>
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100">
                <span>{revenuePeriod}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="py-6">
            <div className="relative h-44 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                {/* Area fill */}
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={isNewUser
                    ? "M 20 140 L 480 140 L 480 140 L 20 140 Z"
                    : "M 20 130 Q 70 95, 110 70 T 210 95 T 310 40 T 400 75 T 480 30 L 480 140 L 20 140 Z"}
                  fill="url(#revenueGrad)"
                />

                {/* Main line */}
                <path
                  d={isNewUser
                    ? "M 20 140 L 480 140"
                    : "M 20 130 Q 70 95, 110 70 T 210 95 T 310 40 T 400 75 T 480 30"}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Node Points */}
                {(isNewUser ? [{ x: 20, y: 140 }, { x: 480, y: 140 }] : [
                  { x: 20, y: 130 },
                  { x: 110, y: 70 },
                  { x: 210, y: 95 },
                  { x: 310, y: 40 },
                  { x: 400, y: 75 },
                  { x: 480, y: 30 },
                ]).map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-2">
                <span>May 1</span>
                <span>May 8</span>
                <span>May 15</span>
                <span>May 22</span>
                <span>May 29</span>
              </div>
            </div>
          </div>

          {/* Sub-revenue breakdowns */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block">Service Revenue</span>
              <span className="text-sm font-black text-slate-900 block mt-0.5">{isNewUser ? formatPrice(0) : '$18,420'}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">{isNewUser ? '0 orders' : '▲ 16.2%'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block">Parts Revenue</span>
              <span className="text-sm font-black text-slate-900 block mt-0.5">{isNewUser ? formatPrice(0) : '$4,850'}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">{isNewUser ? '0 parts' : '▲ 11.7%'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block">Other Revenue</span>
              <span className="text-sm font-black text-slate-900 block mt-0.5">{isNewUser ? formatPrice(0) : '$1,310'}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">{isNewUser ? '0 other' : '▲ 8.6%'}</span>
            </div>
          </div>
        </div>

        {/* Recent Booking Requests List */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'أحدث طلبات الحجز' : 'Recent Booking Requests'}
              </h3>
              <button
                onClick={() => onNavigateTab('booking-requests')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </button>
            </div>

            {recentBookingRequests.length > 0 ? (
              <div className="divide-y divide-slate-100 mt-2">
                {recentBookingRequests.map((req) => (
                  <div key={req.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={req.avatar}
                        alt={req.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <strong className="text-xs font-black text-slate-900 block truncate">{req.name}</strong>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {req.service} • {req.vehicle}
                        </span>
                        <span className="text-[9px] text-slate-400 block">{req.time}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                        req.status === 'confirmed'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد طلبات حجز واردة حتى الآن' : 'No Incoming Booking Requests Yet'}
                </p>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  {language === 'ar'
                    ? 'ستظهر هنا طلبات الصيانة المحجوزة من العملاء عبر المنصة في الوقت الفعلي.'
                    : 'Customer appointment requests from the platform will appear here in real-time.'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateTab('booking-requests')}
            className="w-full py-2.5 mt-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs text-center flex items-center justify-center gap-1.5 border border-slate-200/80 transition-all"
          >
            <span>{language === 'ar' ? 'عرض جميع الطلبات' : 'View All Requests'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Third Row: Active Jobs (Col 1), Today's Appointments (Col 2), Quick Actions & Notifications (Col 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Col 1: Active Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'أوامر العمل قيد التنفيذ' : 'Active Work Orders'}
              </h3>
              <button
                onClick={() => onNavigateTab('jobs')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </button>
            </div>

            {activeJobs.length > 0 ? (
              <div className="space-y-3 mt-3">
                {activeJobs.map((job, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={job.image}
                        alt={job.vehicle}
                        className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <strong className="text-xs font-black text-slate-900 block truncate">{job.vehicle}</strong>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {job.customer} • {job.service}
                        </span>
                      </div>
                    </div>
                    <div className="text-end shrink-0">
                      <span className="text-[9px] text-slate-400 font-bold block">{job.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border mt-0.5 inline-block ${job.statusColor}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Wrench className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد سيارات قيد الصيانة حالياً' : 'No Active Vehicles on Bays'}
                </p>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  {language === 'ar'
                    ? 'عند بدء العمل على مركبة جديدة ستظهر تفاصيل تقدم الصيانة هنا.'
                    : 'When you start a job on a vehicle, repair progress will update here.'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateTab('jobs')}
            className="w-full py-2 mt-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs text-center flex items-center justify-center gap-1.5 border border-slate-200/80"
          >
            <span>{language === 'ar' ? 'عرض جميع الأعمال النشطة' : 'View All Active Jobs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Col 2: Today's Appointments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'مواعيد اليوم' : "Today's Appointments"}
              </h3>
              <button
                onClick={() => onNavigateTab('calendar')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                {language === 'ar' ? 'عرض التقويم' : 'View Calendar'}
              </button>
            </div>

            {todayAppointments.length > 0 ? (
              <div className="space-y-3 mt-3">
                {todayAppointments.map((app, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-black text-slate-600 w-16 shrink-0">{app.time}</span>
                      <img
                        src={app.image}
                        alt={app.vehicle}
                        className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <strong className="text-xs font-black text-slate-900 block truncate">{app.vehicle}</strong>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {app.customer} • {app.service}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد مواعيد مقررة لليوم' : 'No Scheduled Appointments Today'}
                </p>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  {language === 'ar'
                    ? 'ستظهر هنا المواعيد المحجوزة والمؤكدة لهذا اليوم.'
                    : 'Confirmed bookings scheduled for today will be displayed here.'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateTab('calendar')}
            className="w-full py-2 mt-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs text-center flex items-center justify-center gap-1.5 border border-slate-200/80"
          >
            <span>{language === 'ar' ? 'عرض الجدول الكامل' : 'View Full Schedule'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Col 3: Quick Actions (3x2 grid) & Notifications */}
        <div className="space-y-4">
          {/* Quick Actions 6-grid matching Image 1 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-black text-slate-900 mb-3">
              {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onNavigateTab('calendar')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all"
              >
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">New Booking</span>
              </button>

              <button
                onClick={() => onNavigateTab('jobs')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all"
              >
                <Wrench className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Create Job</span>
              </button>

              <button
                onClick={() => onNavigateTab('customers')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all"
              >
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Add Customer</span>
              </button>

              <button
                onClick={() => onNavigateTab('customers')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all"
              >
                <Car className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Add Vehicle</span>
              </button>

              <button
                onClick={() => onNavigateTab('quotes')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all"
              >
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Create Quote</span>
              </button>

              <button
                onClick={() => onNavigateTab('inventory')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all"
              >
                <Package className="w-4 h-4 text-amber-600" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Order Parts</span>
              </button>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">
                {language === 'ar' ? 'الإشعارات والتنبيهات' : 'Notifications'}
              </h3>
              <button
                onClick={() => onNavigateTab('notifications')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
              >
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </button>
            </div>

            {notifications.length === 0 ? (
              <div className="py-7 text-center text-slate-400">
                <Bell className="w-7 h-7 mx-auto text-slate-300 mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد إشعارات جديدة' : 'No New Notifications'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'ستظهر تنبيهات الحجوزات والمدفوعات والمراجعات هنا فور وصولها' : 'Booking alerts, payments, and reviews will appear here.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 mt-1">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div key={notif.id} className="py-2 flex items-start gap-2.5">
                      <div className={`w-6 h-6 rounded-lg ${notif.color} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">{notif.title}</p>
                        <span className="text-[9px] text-slate-400 block truncate">{notif.subtitle}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[9px] text-slate-400 font-bold">{notif.time}</span>
                        {notif.dot && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Fourth Row: Top Services (Col 1), Customer Satisfaction (Col 2), Mini Calendar (Col 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Col 1: Top Services */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900">
              {language === 'ar' ? 'أفضل الخدمات (هذا الشهر)' : 'Top Services (This Month)'}
            </h3>
            <button
              onClick={() => onNavigateTab('services')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          {topServices.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <Wrench className="w-8 h-8 mx-auto text-slate-300 mb-2 opacity-60" />
              <p className="text-xs font-bold text-slate-700">
                {language === 'ar' ? 'لا توجد بيانات خدمات بعد' : 'No Service Statistics Yet'}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[240px] mx-auto leading-relaxed">
                {language === 'ar' ? 'ستظهر الخدمات الأكثر طلباً وإحصائياتها فور إتمام أولى أوامر العمل' : 'Top requested services will appear automatically as work orders are completed.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3 mt-3">
              {topServices.map((srv, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{srv.icon}</span>
                    <span className="text-xs font-bold text-slate-800">
                      {language === 'ar' ? srv.nameAr : srv.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-black text-slate-900">{srv.count}</strong>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                      ▲ {srv.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Col 2: Customer Satisfaction Donut & Star breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
              {language === 'ar' ? 'رضا العملاء والتقييمات' : 'Customer Satisfaction'}
            </h3>

            <div className="flex items-center gap-6 mt-4">
              {/* Circular Gauge */}
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeDasharray={isNewUser ? "100, 100" : "96, 100"}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-slate-900 leading-tight">
                    {isNewUser ? (language === 'ar' ? 'جديد' : 'New') : '4.8'}
                  </span>
                  <div className="flex text-amber-400 text-[9px]">★★★★★</div>
                  <span className="text-[7px] text-slate-400 font-bold">
                    {isNewUser ? (language === 'ar' ? '0 تقييم' : '0 reviews') : 'Based on 185 reviews'}
                  </span>
                </div>
              </div>

              {/* Star Rating Breakdown bars */}
              <div className="flex-1 space-y-1 text-[10px] font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-8 shrink-0">5 Stars</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: isNewUser ? '0%' : '84%' }} />
                  </div>
                  <span className="w-6 text-end text-slate-400">{isNewUser ? '0%' : '84%'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 shrink-0">4 Stars</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: isNewUser ? '0%' : '11%' }} />
                  </div>
                  <span className="w-6 text-end text-slate-400">{isNewUser ? '0%' : '11%'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 shrink-0">3 Stars</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: isNewUser ? '0%' : '3%' }} />
                  </div>
                  <span className="w-6 text-end text-slate-400">{isNewUser ? '0%' : '3%'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 shrink-0">2 Stars</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: isNewUser ? '0%' : '1%' }} />
                  </div>
                  <span className="w-6 text-end text-slate-400">{isNewUser ? '0%' : '1%'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 shrink-0">1 Star</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: isNewUser ? '0%' : '1%' }} />
                  </div>
                  <span className="w-6 text-end text-slate-400">{isNewUser ? '0%' : '1%'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-[11px] font-bold text-emerald-800">
            <ThumbsUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isNewUser
                ? (language === 'ar' ? 'حساب ورشة معتمد وجديد — أكمل طلبات العمل لبدء استلام التقييمات الموثقة.' : 'New verified workshop account — Complete jobs to start collecting verified reviews.')
                : 'Keep it up! Your rating is higher than 92% of other providers.'}
            </span>
          </div>
        </div>

        {/* Col 3: Mini Calendar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'التقويم المصغر' : 'Mini Calendar'}
              </h3>
              <div className="flex items-center gap-1.5">
                <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-black text-slate-800">
                  {new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', year: 'numeric' })}
                </span>
                <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mt-2 text-center">
              <div className="grid grid-cols-7 text-[9px] font-bold text-slate-400 pb-1">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-slate-700">
                <span className="text-slate-300 py-1"></span>
                <span className="text-slate-300 py-1"></span>
                <span className="text-slate-300 py-1"></span>
                <span className="text-slate-300 py-1"></span>
                <span className="py-1 hover:bg-slate-100 rounded">1</span>
                <span className="py-1 hover:bg-slate-100 rounded">2</span>
                <span className="py-1 hover:bg-slate-100 rounded">3</span>
                <span className="py-1 hover:bg-slate-100 rounded">4</span>
                <span className="py-1 hover:bg-slate-100 rounded">5</span>
                <span className="py-1 hover:bg-slate-100 rounded">6</span>
                <span className="py-1 hover:bg-slate-100 rounded">7</span>
                <span className="py-1 hover:bg-slate-100 rounded">8</span>
                <span className="py-1 hover:bg-slate-100 rounded">9</span>
                <span className="py-1 hover:bg-slate-100 rounded">10</span>
                <span className="py-1 hover:bg-slate-100 rounded">11</span>
                <span className="py-1 hover:bg-slate-100 rounded">12</span>
                <span className="py-1 hover:bg-slate-100 rounded">13</span>
                <span className="py-1 hover:bg-slate-100 rounded">14</span>
                <span className="py-1 hover:bg-slate-100 rounded">15</span>
                <span className={`py-1 rounded-full font-black ${isNewUser ? 'bg-slate-100 text-slate-900' : 'bg-blue-600 text-white'}`}>16</span>
                <span className="py-1 hover:bg-slate-100 rounded">17</span>
                <span className="py-1 hover:bg-slate-100 rounded">18</span>
                <span className="py-1 hover:bg-slate-100 rounded">19</span>
                <span className="py-1 hover:bg-slate-100 rounded">20</span>
                <span className="py-1 hover:bg-slate-100 rounded">21</span>
                <span className="py-1 hover:bg-slate-100 rounded">22</span>
                <span className="py-1 hover:bg-slate-100 rounded">23</span>
                <span className="py-1 hover:bg-slate-100 rounded">24</span>
                <span className="py-1 hover:bg-slate-100 rounded">25</span>
                <span className="py-1 hover:bg-slate-100 rounded">26</span>
                <span className="py-1 hover:bg-slate-100 rounded">27</span>
                <span className="py-1 hover:bg-slate-100 rounded">28</span>
                <span className="py-1 hover:bg-slate-100 rounded">29</span>
                <span className="py-1 hover:bg-slate-100 rounded">30</span>
                <span className="py-1 hover:bg-slate-100 rounded">31</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pt-3 border-t border-slate-100 mt-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {isNewUser ? '0 Appointments' : 'Appointments'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {isNewUser ? '0 Bookings' : 'Bookings'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Holidays
            </span>
          </div>
        </div>
      </div>

      {/* 7. Bottom Promotional Banner matching Image 1 */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'نمّ أعمالك مع أهل المركبات' : 'Grow Your Business with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            {language === 'ar'
              ? 'احصل على المزيد من الحجوزات، وأدر عمليات ورشتك بكفاءة، وضاعف إيراداتك مع أدواتنا الاحترافية.'
              : 'Get more bookings, manage your operations efficiently, and grow your revenue with our premium tools.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
            >
              {language === 'ar' ? 'استكشف حلول الأساطيل' : 'Explore Fleet Solutions'}
            </button>
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              {language === 'ar' ? 'معرفة المزيد' : 'Learn More'}
            </button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80"
          alt="Fleet car"
          className="hidden md:block absolute -end-10 -bottom-10 w-96 object-cover opacity-80 mix-blend-screen"
        />
      </div>
    </div>
  );
};
