import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Mail,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Phone,
  MessageSquare,
  MoreVertical,
  X,
  Plus,
  Send,
  Download,
  AlertTriangle,
  MapPin,
  Car,
  ChevronLeft,
  ChevronRight,
  Zap,
  ArrowRight,
  Share2,
  UserPlus,
  Ban,
  Sparkles,
  Inbox,
} from 'lucide-react';

interface ProviderBookingRequestsTabProps {
  onNavigateTab: (tab: string) => void;
}

export const ProviderBookingRequestsTab: React.FC<ProviderBookingRequestsTabProps> = ({
  onNavigateTab,
}) => {
  const { language, user, placedBookings, jobs, showToast } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  // Filters state
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<'quote' | 'accept' | 'template' | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // 1. KPI Stats matching Image 2
  const kpis = isNewUser ? [
    {
      id: 'new_requests',
      label: 'New Requests',
      labelAr: 'طلبات جديدة',
      value: String(placedBookings.length),
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: Mail,
    },
    {
      id: 'accepted_today',
      label: 'Accepted Today',
      labelAr: 'مقبولة اليوم',
      value: '0',
      change: '0%',
      vs: 'vs yesterday',
      isUp: true,
      icon: CheckCircle2,
    },
    {
      id: 'pending_response',
      label: 'Pending Response',
      labelAr: 'بانتظار الرد',
      value: '0',
      note: 'All clear',
      noteAr: 'لا توجد طلبات معلقة',
      isOrange: false,
      icon: Clock,
    },
    {
      id: 'conversion_rate',
      label: 'Conversion Rate',
      labelAr: 'معدل التحويل',
      value: '0%',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: TrendingUp,
    },
  ] : [
    {
      id: 'new_requests',
      label: 'New Requests',
      labelAr: 'طلبات جديدة',
      value: '32',
      change: '+28%',
      vs: 'vs Apr 1 – Apr 30',
      isUp: true,
      icon: Mail,
    },
    {
      id: 'accepted_today',
      label: 'Accepted Today',
      labelAr: 'مقبولة اليوم',
      value: '12',
      change: '+9%',
      vs: 'vs yesterday',
      isUp: true,
      icon: CheckCircle2,
    },
    {
      id: 'pending_response',
      label: 'Pending Response',
      labelAr: 'بانتظار الرد',
      value: '15',
      note: 'Respond within 2h',
      noteAr: 'الرد خلال ساعتين',
      isOrange: true,
      icon: Clock,
    },
    {
      id: 'conversion_rate',
      label: 'Conversion Rate',
      labelAr: 'معدل التحويل',
      value: '38%',
      change: '+8%',
      vs: 'vs Apr 1 – Apr 30',
      isUp: true,
      icon: TrendingUp,
    },
  ];

  // 2. Incoming Booking Requests List (10 rows matching Image 2)
  const allRequests = [
    {
      id: 'REQ-01',
      customer: 'Ahmed Al Mansoori',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Toyota Camry 2021',
      vehicleDetail: 'White • 74,820 km',
      service: 'Major Service (50,000 km)',
      serviceDesc: 'Oil change, filter, inspection',
      dateTime: 'May 3, 2025 10:00 AM',
      location: 'Abu Dhabi Mussafah',
      urgency: 'High',
      estValue: 'AED 850 (Est.)',
      status: 'NEW',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'REQ-02',
      customer: 'Sara Khalifa',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Nissan Patrol 2019',
      vehicleDetail: 'Silver • 59,010 km',
      service: 'Brake Pad Replacement',
      serviceDesc: 'Front & rear brake pads',
      dateTime: 'May 4, 2025 2:00 PM',
      location: 'Abu Dhabi Khalifa City',
      urgency: 'Medium',
      estValue: 'AED 750 (Est.)',
      status: 'NEW',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'REQ-03',
      customer: 'Omar Al Hosani',
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      vehicle: 'BMW 520i 2020',
      vehicleDetail: 'Black • 41,500 km',
      service: 'AC Diagnostic & Repair',
      serviceDesc: 'AC not cooling properly',
      dateTime: 'May 3, 2025 11:30 AM',
      location: 'Abu Dhabi Electra St.',
      urgency: 'High',
      estValue: 'AED 480 (Est.)',
      status: 'NEW',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'REQ-04',
      customer: 'Layth Al Ali',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Honda CR-V 2018',
      vehicleDetail: 'Grey • 100,210 km',
      service: 'Suspension Check & Repair',
      serviceDesc: 'Noise while driving over bumps',
      dateTime: 'May 5, 2025 9:00 AM',
      location: 'Abu Dhabi Mussafah',
      urgency: 'Medium',
      estValue: 'AED 650 (Est.)',
      status: 'PENDING',
      statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      id: 'REQ-05',
      customer: 'Yousef Al Mazroui',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Chevrolet Tahoe 2019',
      vehicleDetail: 'White • 125,000 km',
      service: 'Engine Oil Leak Inspection',
      serviceDesc: 'Oil leak from engine area',
      dateTime: 'May 6, 2025 1:00 PM',
      location: 'Abu Dhabi Khalifa City',
      urgency: 'Low',
      estValue: 'AED 600 (Est.)',
      status: 'PENDING',
      statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      id: 'REQ-06',
      customer: 'Fatima Al Nuaimi',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Lexus RC 350 2020',
      vehicleDetail: 'Silver • 54,120 km',
      service: 'Full Detailing (Interior + Exterior)',
      serviceDesc: 'Premium wash, polish, vacuum',
      dateTime: 'May 3, 2025 3:00 PM',
      location: 'Abu Dhabi Corniche',
      urgency: 'Low',
      estValue: 'AED 350 (Est.)',
      status: 'QUOTED',
      statusColor: 'bg-purple-100 text-purple-900 border-purple-300',
      note: 'Quote sent on May 1, 2025 at 10:00 AM',
    },
    {
      id: 'REQ-07',
      customer: 'Khalid Al Jaberi',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Ford Explorer 2018',
      vehicleDetail: 'Blue • 88,900 km',
      service: 'Transmission Fluid Change',
      serviceDesc: 'Drain & refill transmission fluid',
      dateTime: 'May 2, 2025 4:00 PM',
      location: 'Abu Dhabi Mussafah',
      urgency: 'Medium',
      estValue: 'AED 900 (Est.)',
      status: 'ACCEPTED',
      statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      note: 'Accepted on May 1, 2025 at 9:15 AM',
    },
    {
      id: 'REQ-08',
      customer: 'Salim Al Zaabi',
      rating: 4.5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Volkswagen Passat 2016',
      vehicleDetail: 'White • 130,500 km',
      service: 'Battery Replacement',
      serviceDesc: 'Battery not holding charge',
      dateTime: 'Apr 29, 2025 1:30 PM',
      location: 'Abu Dhabi Electra St.',
      urgency: 'Low',
      estValue: 'AED 290 (Est.)',
      status: 'EXPIRED',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      note: 'Expiration Apr 30, 2025',
    },
    {
      id: 'REQ-09',
      customer: 'Mariam Al Hashmi',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Kia Sportage 2019',
      vehicleDetail: 'Grey • 73,000 km',
      service: 'Wheel Alignment & Balancing',
      serviceDesc: 'Alignment issue noticed',
      dateTime: 'Apr 28, 2025 11:00 AM',
      location: 'Abu Dhabi Mussafah',
      urgency: 'Low',
      estValue: 'AED 220 (Est.)',
      status: 'REJECTED',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      note: 'Rejected on Apr 28, 2025',
    },
    {
      id: 'REQ-10',
      customer: 'Hamad Al Shamsi',
      rating: 3.7,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      vehicle: 'Mercedes E200 2021',
      vehicleDetail: 'Black • 48,000 km',
      service: 'Major Service (40,000 km)',
      serviceDesc: 'Oil, filters, inspection & top-up',
      dateTime: 'Apr 25, 2025 10:00 AM',
      location: 'Abu Dhabi Khalifa City',
      urgency: 'Low',
      estValue: 'AED 720 (Est.)',
      status: 'FULFILLED',
      statusColor: 'bg-slate-100 text-slate-800 border-slate-300',
      note: 'Completed on Apr 25, 2025',
    },
  ];

  // 3. Quick Response Templates
  const templates = [
    {
      title: 'Thanks for your request!',
      titleAr: 'شكراً على طلبك!',
      text: "Thank you for reaching out! We've received your request and will get back to you shortly.",
      textAr: 'شكراً لتواصلك معنا! لقد استلمنا طلبك وسنعاود الاتصال بك بأقرب وقت.',
    },
    {
      title: 'Quote Follow-up',
      titleAr: 'متابعة عرض السعر',
      text: 'Just checking in! Have you had a chance to review the quote? Let me know if you have any questions.',
      textAr: 'نود الاطمئنان! هل أتيحت لك فرصة مراجعة عرض السعر؟ يرجى إعلامنا إن كان لديك أي استفسار.',
    },
    {
      title: 'Need More Info',
      titleAr: 'طلب معلومات إضافية',
      text: 'To provide an accurate quote, please share more details or photos of the issue.',
      textAr: 'لتقديم عرض سعر دقيق، يرجى تزويدنا بمزيد من التفاصيل أو صور للمشكلة.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Title & Date / Export controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'طلبات الحجز الواردة' : 'Booking Requests'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'ar'
              ? 'إدارة العملاء المحتملين والرد السريع لكسب المزيد من الأعمال.'
              : 'Manage incoming leads and respond quickly to win more business.'}
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
            <span>{language === 'ar' ? 'تصدير' : 'Export'}</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar matching Image 2 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Quoted">Quoted</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Service Type</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Services</option>
              <option value="Major">Major Service</option>
              <option value="Brake">Brake Service</option>
              <option value="AC">AC Repair</option>
              <option value="Suspension">Suspension</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Locations</option>
              <option value="Mussafah">Mussafah</option>
              <option value="Khalifa">Khalifa City</option>
              <option value="Electra">Electra St.</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Date Range</label>
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700">
              <span className="truncate">May 1 - May 31</span>
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Urgency</label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-end h-full">
            <button
              onClick={() => {
                setStatusFilter('All');
                setServiceFilter('All');
                setLocationFilter('All');
                setUrgencyFilter('All');
              }}
              className="w-full py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 text-center"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* 3. 4 KPI Metric Cards matching Image 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {language === 'ar' ? kpi.labelAr : kpi.label}
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
              </div>

              <div className="mt-2 text-[11px] font-bold">
                {kpi.change ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    ▲ {kpi.change} <span className="text-slate-400 font-medium">{kpi.vs}</span>
                  </span>
                ) : (
                  <span className="text-amber-600 font-bold">{kpi.note}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Two Column Layout: Requests List (Left 68%) & Sidebar (Right 32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Incoming Booking Requests Table/Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'طلبات الحجز الواردة' : 'Incoming Booking Requests'}
                </h2>
                <span className="text-xs text-slate-400 font-medium">
                  {isNewUser && placedBookings.length === 0
                    ? (language === 'ar' ? 'لا توجد طلبات واردة حالياً' : '0 active requests')
                    : `Showing 1 – ${Math.min(10, (isNewUser ? placedBookings.length : allRequests.length))} of ${isNewUser ? placedBookings.length : allRequests.length} requests`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="Newest First">Newest First</option>
                  <option value="Oldest First">Oldest First</option>
                  <option value="Highest Value">Highest Value</option>
                </select>
              </div>
            </div>

            {/* List of Requests or Clean Empty State */}
            {isNewUser && placedBookings.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                  <Inbox className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-base font-black text-slate-900">
                    {language === 'ar' ? 'لا توجد طلبات حجز حالياً' : 'No Booking Requests Yet'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'ar'
                      ? 'عندما يقوم العملاء بحجز خدمات ورشتك عبر المنصة أو إرسال استفسارات، ستظهر هنا فوراً لإدارتها والرد عليها.'
                      : 'When customers book your garage services online or request quotations, all incoming appointments will appear here.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigateTab('services')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تعديل قائمة الخدمات والأسعار' : 'Configure Services & Pricing'}</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab('settings')}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{language === 'ar' ? 'إعدادات عنوان الورشة ومواعيد العمل' : 'Garage Location & Hours'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {allRequests.map((req) => (
                  <div key={req.id} className="py-4 hover:bg-slate-50/60 rounded-xl px-2 transition-all space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Customer & Vehicle */}
                      <div className="flex items-start gap-3 min-w-0">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border shrink-0 ${req.statusColor}`}>
                          {req.status}
                        </span>
                        <img
                          src={req.avatar}
                          alt={req.customer}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <strong className="text-xs font-black text-slate-900 block truncate">{req.customer}</strong>
                            <span className="text-[10px] font-bold text-amber-500">★ {req.rating}</span>
                          </div>
                          <span className="text-[11px] text-slate-600 font-bold block">{req.vehicle}</span>
                          <span className="text-[10px] text-slate-400 block">{req.vehicleDetail}</span>
                        </div>
                      </div>

                      {/* Service Info */}
                      <div className="min-w-0 md:text-start">
                        <strong className="text-xs font-black text-slate-800 block truncate">{req.service}</strong>
                        <span className="text-[10px] text-slate-500 block truncate">{req.serviceDesc}</span>
                      </div>

                      {/* Date, Location & Urgency */}
                      <div className="text-[11px] text-slate-600 shrink-0 space-y-0.5">
                        <div className="font-bold text-slate-900">{req.dateTime}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{req.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">Urgency:</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-black ${
                              req.urgency === 'High'
                                ? 'bg-rose-100 text-rose-700'
                                : req.urgency === 'Medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {req.urgency}
                          </span>
                        </div>
                      </div>

                      {/* Est. Value & Actions */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <strong className="text-xs font-black text-slate-900">{req.estValue}</strong>

                        <div className="flex items-center gap-1.5">
                          {req.status === 'NEW' || req.status === 'PENDING' || req.status === 'QUOTED' ? (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedRequest(req);
                                  setActiveModal('accept');
                                }}
                                className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] rounded-lg shadow-2xs"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedRequest(req);
                                  setActiveModal('quote');
                                }}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px] rounded-lg"
                              >
                                Send Quote
                              </button>
                            </>
                          ) : null}

                          <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          {req.status === 'NEW' || req.status === 'PENDING' ? (
                            <button className="text-rose-600 hover:text-rose-700 text-[10px] font-bold px-1">
                              Reject
                            </button>
                          ) : (
                            <button className="p-1 rounded text-slate-400 hover:text-slate-600">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {req.note && (
                      <div className="text-[10px] font-medium text-slate-400 ps-12">
                        {req.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs">1</button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">2</button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">3</button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Show</span>
                <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-bold">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span className="text-slate-400">per page</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Sources, Activity, Templates, Quick Actions */}
        <div className="space-y-4">
          {/* Lead Sources Donut */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Lead Sources</h3>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All Sources →</button>
            </div>

            {isNewUser ? (
              <div className="py-7 text-center text-slate-400">
                <Inbox className="w-7 h-7 mx-auto text-slate-300 mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد مصادر عملاء بعد' : 'No Lead Source Data Yet'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'ستظهر قنوات استقطاب العملاء عند بدء استلام طلبات الصيانة' : 'Lead acquisition channels will appear as customers find your workshop.'}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-4 mt-3">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="4"
                      strokeDasharray="61, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      strokeDasharray="22, 100"
                      strokeDashoffset="-61"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[9px] text-slate-400 font-bold block">Total</span>
                    <strong className="text-base font-black text-slate-900 block leading-none">23</strong>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-[11px] font-bold">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" /> AHL App / Web
                    </span>
                    <span>14 (61%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Google Search
                    </span>
                    <span>5 (22%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Social Media
                    </span>
                    <span>2 (9%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Existing Customer
                    </span>
                    <span>2 (8%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Recent Activity</h3>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All Activity →</button>
            </div>

            {isNewUser ? (
              <div className="py-7 text-center text-slate-400">
                <Clock className="w-7 h-7 mx-auto text-slate-300 mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا يوجد نشاط حديث بعد' : 'No Recent Activity Yet'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'ستظهر تفاعلات العملاء والعروض والردود هنا فور إرسالها' : 'Inquiries, quotes, and customer updates will appear here.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 leading-tight">
                      New request from <span className="text-blue-600">Ahmed Al Mansoori</span>
                    </p>
                    <span className="text-[10px] text-slate-400">2 min ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 leading-tight">
                      <span className="text-blue-600">Sara Khalifa</span> requested Brake Pad Replacement
                    </p>
                    <span className="text-[10px] text-slate-400">8 min ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Send className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 leading-tight">
                      You sent a quote to <span className="text-blue-600">Fatima Al Nuaimi</span>
                    </p>
                    <span className="text-[10px] text-slate-400">22 min ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 leading-tight">
                      <span className="text-blue-600">Khalid Al Jaberi</span> accepted your quote
                    </p>
                    <span className="text-[10px] text-slate-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Response Templates */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Quick Response Templates</h3>
              <button
                onClick={() => setActiveModal('template')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
              >
                Manage Templates →
              </button>
            </div>

            <div className="space-y-2.5">
              {templates.map((tpl, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1 hover:border-blue-300 transition-all cursor-pointer"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(tpl.text);
                    }
                    showToast(language === 'ar' ? `تم نسخ قالب "${tpl.title}"` : `Template "${tpl.title}" copied to clipboard!`, 'success');
                  }}
                >
                  <strong className="text-xs font-bold text-slate-900 block">{tpl.title}</strong>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{tpl.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal('template')}
              className="w-full py-2 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Template</span>
            </button>
          </div>

          {/* Quick Actions List */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Quick Actions</h3>

            <button
              onClick={() => onNavigateTab('calendar')}
              className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-start flex items-center gap-3 transition-all"
            >
              <Ban className="w-4 h-4 text-blue-600" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Block Unavailable Time</strong>
                <span className="text-[10px] text-slate-500">Manage your workshop availability</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('services')}
              className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-start flex items-center gap-3 transition-all"
            >
              <Plus className="w-4 h-4 text-amber-500" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Add New Service</strong>
                <span className="text-[10px] text-slate-500">Expand your service list</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-start flex items-center gap-3 transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Promote Workshop</strong>
                <span className="text-[10px] text-slate-500">Get more visibility</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-start flex items-center gap-3 transition-all"
            >
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Invite Team Member</strong>
                <span className="text-[10px] text-slate-500">Add staff to manage requests</span>
              </div>
            </button>
          </div>

          {/* Enable Instant Quotes Promotion Card */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-black text-xs">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Enable Instant Quotes</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Let customers get instant estimated prices for common services to boost conversions by up to 40%.
            </p>
            <button
              onClick={() => showToast(language === 'ar' ? 'تم تفعيل عروض الأسعار الفورية للحجوزات عبر الإنترنت!' : 'Instant quotes enabled for online bookings!', 'success')}
              className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm"
            >
              Enable Now
            </button>
          </div>
        </div>
      </div>

      {/* 5. Request Insights matching Image 2 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900">Request Insights</h2>
            <span className="text-xs text-slate-400 font-medium">Performance analytics & conversion trends</span>
          </div>

          <div className="flex items-center gap-2">
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700">
              <option>This Month</option>
              <option>This Quarter</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700">
              <option>Compare: Previous Month</option>
              <option>Compare: Previous Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Volume Trend Chart */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Request Volume Trend</h4>
            {isNewUser ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-slate-400">
                <TrendingUp className="w-8 h-8 text-slate-300 mb-1.5 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد بيانات حركة طلبات بعد' : 'No Request Volume Data Yet'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 max-w-[240px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'سيتم رسم مسار نمو الطلبات أسبوعياً فور بدء نشاط الورشة' : 'Request volume trends will populate as incoming bookings arrive.'}
                </p>
              </div>
            ) : (
              <>
                <div className="h-40 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="400" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="400" y2="110" stroke="#E2E8F0" />

                    {/* Line 1 This month */}
                    <path
                      d="M 10 100 Q 80 80, 150 50 T 250 65 T 380 20"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                    />
                    {/* Line 2 Previous month */}
                    <path
                      d="M 10 110 Q 80 95, 150 85 T 250 75 T 380 50"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-2">
                    <span>May 1</span>
                    <span>May 8</span>
                    <span>May 15</span>
                    <span>May 22</span>
                    <span>May 29</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600 mt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 bg-blue-600 rounded" /> This Month
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 bg-slate-400 rounded" /> Previous Month
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Requests by Service Type */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Requests by Service Type</h4>
            {isNewUser ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-slate-400">
                <Inbox className="w-8 h-8 text-slate-300 mb-1.5 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا يوجد توزيع خدمات بعد' : 'No Service Distribution Yet'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 max-w-[240px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'ستظهر النسب المئوية للخدمات الأكثر طلباً مع استقبال الطلبات' : 'Category distribution will appear as requests arrive.'}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-6 mt-2">
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="4"
                      strokeDasharray="39, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      strokeDasharray="26, 100"
                      strokeDashoffset="-39"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <strong className="text-base font-black text-slate-900 block">23</strong>
                    <span className="text-[9px] text-slate-400 font-bold block">Total</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-xs font-bold text-slate-700">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" /> Major Service
                    </span>
                    <span>9 (39%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Repairs
                    </span>
                    <span>6 (26%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" /> Diagnostics
                    </span>
                    <span>4 (17%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500" /> Detailing
                    </span>
                    <span>2 (9%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Others
                    </span>
                    <span>2 (9%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 block">Avg. Response Time</span>
            <span className="text-base font-black text-slate-900 block mt-0.5">
              {isNewUser ? '0m' : '1h 45m'}
            </span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
              {isNewUser ? (language === 'ar' ? 'جاهز للرد' : 'Ready to respond') : '▼ 22% vs last month'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 block">Quote Sent Rate</span>
            <span className="text-base font-black text-slate-900 block mt-0.5">
              {isNewUser ? '0%' : '71%'}
            </span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
              {isNewUser ? (language === 'ar' ? 'لا توجد عروض' : 'No quotes sent') : '▲ 2% vs last month'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 block">Acceptance Rate</span>
            <span className="text-base font-black text-slate-900 block mt-0.5">
              {isNewUser ? '0%' : '54%'}
            </span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
              {isNewUser ? (language === 'ar' ? 'بانتظار الطلبات' : 'Awaiting orders') : '▲ 7% vs last month'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 block">Repeat Customer Rate</span>
            <span className="text-base font-black text-slate-900 block mt-0.5">
              {isNewUser ? '0%' : '32%'}
            </span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
              {isNewUser ? (language === 'ar' ? 'حساب جديد' : 'New account') : '▲ 5% vs last month'}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Promotional Banner matching Image 2 */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'نمّ ورشتك مع أهل المركبات' : 'Grow Your Workshop with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            {language === 'ar'
              ? 'احصل على المزيد من طلبات الحجز، وزد من ظهور ورشتك، وابنِ ثقة دائمة مع آلاف ملاك السيارات.'
              : 'Get more bookings, increase your visibility, and build trust with thousands of car owners.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
            >
              {language === 'ar' ? 'استكشف العروض الترويجية' : 'Explore Promotions'}
            </button>
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              {language === 'ar' ? 'معرفة المزيد' : 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
