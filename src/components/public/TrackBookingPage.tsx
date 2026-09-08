import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../common/LeafletMap';
import {
  Clock,
  MapPin,
  Car,
  Wrench,
  DollarSign,
  Phone,
  MessageSquare,
  Send,
  Download,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Star,
  Check,
  ArrowRight,
  AlertCircle,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';

export const TrackBookingPage: React.FC = () => {
  const {
    language,
    formatPrice,
    setActiveTab,
    showToast,
    selectedCountry,
    activeEmergency,
    cancelEmergencySOS,
    isAuthenticated,
    openAuthModal,
    placedBookings,
    setCustomerActiveTab,
  } = useApp();

  const [searchBookingQuery, setSearchBookingQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'tech',
      textEn: 'Hello! I am on my way with the diagnostic unit and will arrive in approx. 12 minutes.',
      textAr: 'مرحباً بك! أنا في طريقي إليك مع أجهزة الفحص وسأصل خلال 12 دقيقة تقريباً.',
      time: '10:40 AM',
    },
    {
      sender: 'user',
      textEn: 'Great! The car is parked outside the main gate.',
      textAr: 'ممتاز! السيارة متوقفة أمام البوابة الرئيسية.',
      time: '10:41 AM',
    },
    {
      sender: 'tech',
      textEn: 'Noted, see you shortly!',
      textAr: 'تمام، أراك قريباً إن شاء الله!',
      time: '10:42 AM',
    },
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const latestBooking = placedBookings && placedBookings.length > 0 ? placedBookings[0] : null;
  const isDemoMode = !latestBooking && !activeEmergency;

  const displayBookingId = latestBooking ? `#${latestBooking.id}` : '#BOOK-78291';
  const displayServiceName = latestBooking ? latestBooking.serviceName : (language === 'ar' ? 'صيانة وتعبئة غاز المكيف' : 'AC Repair & Service');
  const displayVehicle = latestBooking ? latestBooking.vehicleDetails : (language === 'ar' ? 'تويوتا راف فور (2021)' : 'Toyota RAV4 (2021)');
  const displayProviderName = latestBooking ? latestBooking.providerName : (language === 'ar' ? 'مركز أوتو تك للصيانة المعتمدة' : 'German Auto Experts');
  const displayPrice = latestBooking ? latestBooking.price : 295.00;
  const displayDate = latestBooking ? `${latestBooking.date} • ${latestBooking.timeSlot}` : (language === 'ar' ? '22 مايو 2025 • 10:30 ص' : 'May 22, 2025 • 10:30 AM');

  const handleSearchBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchBookingQuery.trim()) {
      showToast(
        language === 'ar'
          ? 'يرجى إدخال رقم الحجز أو رقم الهاتف'
          : 'Please enter a booking reference or phone number',
        'error'
      );
      return;
    }
    const found = placedBookings.find(
      (b) =>
        b.id.toLowerCase().includes(searchBookingQuery.toLowerCase().trim()) ||
        b.customerPhone?.includes(searchBookingQuery.trim())
    );
    if (found) {
      showToast(
        language === 'ar' ? `تم العثور على الحجز #${found.id}` : `Found booking #${found.id}`,
        'success'
      );
    } else {
      showToast(
        language === 'ar'
          ? `لم يتم العثور على حجز نشط برقم "${searchBookingQuery}". جاري عرض المحاكي التفاعلي.`
          : `No active booking found for "${searchBookingQuery}". Displaying live demo simulator.`,
        'info'
      );
    }
  };

  const trackerSteps = [
    {
      titleEn: 'Request Received',
      titleAr: 'تم استلام الحجز',
      timeEn: '10:30 AM',
      timeAr: '10:30 ص',
      subEn: 'Your booking has been registered successfully.',
      subAr: 'تم تسجيل طلب الصيانة بنجاح في النظام.',
      done: true,
    },
    {
      titleEn: 'Provider Assigned',
      titleAr: 'تعيين مركز الصيانة',
      timeEn: '10:33 AM',
      timeAr: '10:33 ص',
      subEn: `${displayProviderName} accepted your booking.`,
      subAr: `قبلت ${displayProviderName} حجزك وجاري إسناد الفني.`,
      done: true,
    },
    {
      titleEn: 'Technician On The Way',
      titleAr: 'الفني في الطريق إليك',
      timeEn: '10:40 AM',
      timeAr: '10:40 ص',
      subEn: 'Live GPS navigation to your location is active.',
      subAr: 'جاري تتبع موقع الفني المباشر على الخريطة.',
      active: true,
    },
    {
      titleEn: 'Inspection In Progress',
      titleAr: 'جاري الفحص والصيانة',
      timeEn: 'Est. 10:55 AM',
      timeAr: 'المتوقع 10:55 ص',
      subEn: 'Digital DVI inspection report will be generated.',
      subAr: 'سيتم تصوير وإصدار تقرير الفحص الرقمي.',
      done: false,
    },
    {
      titleEn: 'Job Completed & Warranty',
      titleAr: 'اكتمال الخدمة والضمان',
      timeEn: 'Est. 12:15 PM',
      timeAr: 'المتوقع 12:15 م',
      subEn: 'Warranty activated in your digital garage.',
      subAr: 'تفعيل شهادة الضمان فوراً في حسابك.',
      done: false,
    },
  ];

  const faqs = [
    {
      qEn: 'How can I track my booking?',
      qAr: 'كيف أتابع وصول الفني لموقعي؟',
      aEn: 'You can follow live GPS updates directly on this map as the technician approaches your vehicle.',
      aAr: 'يمكنك متابعة خط سير الفني المباشر عبر نظام الملاحة الموضح على الخريطة أعلاه لحظة بلحظة.',
    },
    {
      qEn: 'What if the technician is delayed?',
      qAr: 'ماذا أفعل إذا تأخر الفني عن الموعد؟',
      aEn: 'You can call or chat with your assigned technician directly using the contact buttons on this page.',
      aAr: 'يمكنك الاتصال المباشر بالفني أو التحدث معه عبر صندوق الدردشة الفوري أدناه.',
    },
    {
      qEn: 'Can I reschedule or cancel my booking?',
      qAr: 'هل يمكنني تغيير وقت الموعد أو إلغاؤه؟',
      aEn: 'Yes, cancellations or rescheduling can be made up to 2 hours prior to arrival free of charge.',
      aAr: 'نعم، يمكنك تعديل أو إلغاء الحجز مجاناً حتى ساعتين قبل الموعد المحدد.',
    },
    {
      qEn: 'What happens after the service is completed?',
      qAr: 'ماذا يحدث بعد انتهاء عملية الصيانة؟',
      aEn: 'The technician will upload a digital DVI report with photos, and your warranty certificate will be activated.',
      aAr: 'يقوم الفني برفع تقرير الفحص DVI الشامل بالصور وتفعيل شهادة الضمان مباشرة في كراجك الرقمي.',
    },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([
      ...chatHistory,
      {
        sender: 'user',
        textEn: chatMessage,
        textAr: chatMessage,
        time: 'Now',
      },
    ]);
    setChatMessage('');
    showToast(language === 'ar' ? 'تم إرسال رسالتك للفني' : 'Message sent to technician', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-10 font-sans">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#09152B] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'نظام التتبع والترحيل المباشر' : 'Live Dispatch & Service Tracker'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {language === 'ar' ? 'تتبع حجز ومراحل صيانة سيارتك' : 'Track Your Service Booking'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === 'ar'
                ? 'فريقنا والورش المعتمدة في خدمتك! تابع خط سير الفني بالـ GPS وتحديثات أوامر العمل لحظة بلحظة.'
                : 'Track your automotive service in real-time with live GPS navigation, milestones, and direct mechanic chat.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-end">
            <span className="text-[10px] text-slate-400 font-bold block">
              {language === 'ar' ? 'تحتاج مساعدة طارئة فورية؟' : 'Need Immediate Help?'}
            </span>
            <strong className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">
              +970 59 123 4567
            </strong>
            <a
              href="tel:+970591234567"
              className="mt-1 px-4 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-lg inline-block transition-all"
            >
              {language === 'ar' ? 'اتصل الآن' : 'Call Now'}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Booking Metadata Strip & 5-Step Tracker */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Interactive Live Demo Simulator Banner (When viewing demo) */}
        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-sm text-lg">
                ⚡
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-black text-[10px] uppercase tracking-wide">
                    {language === 'ar' ? 'محاكي تتبع الخدمة المباشرة (نموذج تجريبي)' : 'Interactive Live Tracker Simulator'}
                  </span>
                  <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                  <span className="text-slate-600 text-xs font-bold hidden sm:inline">
                    {language === 'ar' ? 'لا يوجد حجز نشط حالياً' : 'No Active Live Booking'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'ar'
                    ? 'هذه معاينة حية توضح كيف يتابع العملاء موقع الفني بالـ GPS ومراحل الصيانة والمحادثة الفورية عند حجز خدمة.'
                    : 'This is a real-time simulator showing how you track GPS dispatch, step milestones, and live chat with technicians once booked.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('book-service')}
                className="btn-shimmer px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'احجز موعد صيانة جديد ←' : 'Book a Service Now →'}</span>
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    setActiveTab('customer');
                    setCustomerActiveTab('bookings');
                  }}
                  className="px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all shrink-0"
                >
                  {language === 'ar' ? 'سجل حجوزاتي' : 'My Bookings'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Booking Reference Lookup Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-slate-700 text-xs font-bold w-full sm:w-auto">
            <Search className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{language === 'ar' ? 'لديك رقم حجز وترغب بتتبعه؟' : 'Have a Booking ID or Phone to track?'}</span>
          </div>

          <form onSubmit={handleSearchBooking} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchBookingQuery}
              onChange={(e) => setSearchBookingQuery(e.target.value)}
              placeholder={language === 'ar' ? 'مثال: BOOK-78291 أو رقم هاتفك' : 'e.g. BOOK-78291 or Phone'}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none text-slate-900 focus:border-blue-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'تتبع' : 'Track'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>

        {/* Active Emergency SOS Alert Card (if triggered) */}
        {activeEmergency && (
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-600/40 shadow-2xl space-y-6 animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-rose-600/30 border-2 border-rose-500/60 flex items-center justify-center animate-pulse shrink-0 shadow-lg shadow-rose-600/30">
                  <span className="text-3xl">🚨</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] uppercase shadow-sm">
                      {language === 'ar' ? 'طلب طوارئ نشط ومباشر' : 'Active Live SOS Request'}
                    </span>
                    <span className="text-xs text-rose-300 font-bold font-mono">
                      #{activeEmergency.id}
                    </span>
                    {activeEmergency.price && (
                      <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        {formatPrice(activeEmergency.price)}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
                    {activeEmergency.status === 'searching' &&
                      (language === 'ar'
                        ? 'جارٍ البحث عن أقرب ونش سطحة ودورية إنقاذ...'
                        : 'Searching for nearest recovery unit...')}
                    {activeEmergency.status === 'en_route' &&
                      (language === 'ar'
                        ? 'تم تعيين ونش الإنقاذ وهو في طريقه إليك الآن! 🚚'
                        : 'Recovery Patrol assigned and en route! 🚚')}
                    {activeEmergency.status === 'arrived' &&
                      (language === 'ar'
                        ? 'وصلت دورية الإنقاذ لموقع مركبتك الآن! 📍'
                        : 'Recovery patrol arrived at your vehicle! 📍')}
                    {activeEmergency.status === 'completed' &&
                      (language === 'ar'
                        ? 'تم إتمام عملية الإنقاذ بنجاح وتوثيق التقرير! 🎉'
                        : 'Emergency rescue completed and recorded! 🎉')}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {activeEmergency.acceptedProvider && (
                  <a
                    href={`tel:${activeEmergency.acceptedProvider.phone}`}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{language === 'ar' ? 'اتصال مباشر بالسائق' : 'Call Driver'}</span>
                  </a>
                )}
                <button
                  onClick={() => cancelEmergencySOS(activeEmergency.id)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-rose-900/60 border border-slate-700 text-rose-300 font-bold text-xs rounded-xl transition-all"
                >
                  {language === 'ar' ? 'إلغاء الطلب' : 'Cancel SOS'}
                </button>
              </div>
            </div>

            {/* 5-Step Live Milestone Stepper */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                {language === 'ar' ? 'مراحل تتبع المهمة المباشرة (GPS Telemetry):' : 'Live Milestone Tracking (GPS Telemetry):'}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  {
                    step: 1,
                    titleAr: 'تم إرسال النداء',
                    titleEn: 'Broadcasted',
                    done: (activeEmergency.currentStep || 1) >= 1,
                    active: (activeEmergency.currentStep || 1) === 1,
                  },
                  {
                    step: 2,
                    titleAr: 'تعيين الونش',
                    titleEn: 'Assigned',
                    done: (activeEmergency.currentStep || 1) >= 2,
                    active: (activeEmergency.currentStep || 1) === 2,
                  },
                  {
                    step: 3,
                    titleAr: 'في الطريق (GPS)',
                    titleEn: 'En Route',
                    done: (activeEmergency.currentStep || 1) >= 3,
                    active: (activeEmergency.currentStep || 1) === 3,
                  },
                  {
                    step: 4,
                    titleAr: 'الوصول للموقع',
                    titleEn: 'Arrived',
                    done: (activeEmergency.currentStep || 1) >= 4,
                    active: (activeEmergency.currentStep || 1) === 4,
                  },
                  {
                    step: 5,
                    titleAr: 'اكتمال الإنقاذ',
                    titleEn: 'Completed',
                    done: (activeEmergency.currentStep || 1) >= 5,
                    active: (activeEmergency.currentStep || 1) === 5,
                  },
                ].map((st) => (
                  <div
                    key={st.step}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                      st.active
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-black ring-2 ring-rose-500/20'
                        : st.done
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                        st.done ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {st.done ? '✓' : st.step}
                    </span>
                    <span className="text-[11px] truncate">
                      {language === 'ar' ? st.titleAr : st.titleEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">
                  {language === 'ar' ? 'نوع الطوارئ والمركبة' : 'Service & Vehicle'}
                </span>
                <strong className="text-white font-black block truncate">
                  {activeEmergency.emergencyType} • {activeEmergency.vehicleName}
                </strong>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">
                  {language === 'ar' ? 'موقعك المسجل' : 'Breakdown Location'}
                </span>
                <strong className="text-white font-bold truncate block">
                  {activeEmergency.locationAddress}
                </strong>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">
                  {language === 'ar' ? 'وحدة الإنقاذ المعينة' : 'Patrol Unit & Plate'}
                </span>
                <strong className="text-amber-400 font-bold block truncate">
                  {activeEmergency.acceptedProvider?.name || (language === 'ar' ? 'جارٍ التعيين...' : 'Assigning...')}
                  {activeEmergency.acceptedProvider?.vehiclePlate && ` (${activeEmergency.acceptedProvider.vehiclePlate})`}
                </strong>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">
                  {language === 'ar' ? 'الوقت المتوقع للوصول' : 'Estimated Arrival'}
                </span>
                <strong className="text-emerald-400 font-black font-mono text-sm">
                  {activeEmergency.etaMinutes} {language === 'ar' ? 'دقائق' : 'mins'}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* Guest User Digital Garage Activation Banner (If not logged in) */}
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-blue-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
                <span>🚗</span>
              </div>
              <div>
                <strong className="text-sm font-black text-white block">
                  {language === 'ar'
                    ? 'هل ترغب بحفظ سجل الخدمة وشهادة الضمان في كراجك الرقمي؟'
                    : 'Save this service record & warranty certificate to your Digital Garage!'}
                </strong>
                <p className="text-xs text-blue-200">
                  {language === 'ar'
                    ? 'أنشئ حسابك المجاني برقم هاتفك لحفظ الفواتير وتتبع صيانة مركبتك مستقبلاً.'
                    : 'Create your free account to claim your invoices, warranty, and vehicle service logs.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => openAuthModal('signup')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2"
            >
              <span>{language === 'ar' ? 'إنشاء حساب / تسجيل الدخول' : 'Create Account / Sign In'}</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* Booking Card Strip */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs grid grid-cols-2 sm:grid-cols-5 gap-4 items-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              {language === 'ar' ? 'رقم الحجز' : 'Booking ID'}
            </span>
            <div className="flex items-center gap-1.5">
              <strong className="text-sm font-black text-blue-600 font-mono">{displayBookingId}</strong>
              {isDemoMode && (
                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                  {language === 'ar' ? 'تجريبي' : 'Sample'}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 block">{displayDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              {language === 'ar' ? 'الخدمة المطلوبة' : 'Service'}
            </span>
            <strong className="text-xs font-black text-slate-900 block">
              {displayServiceName}
            </strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              {language === 'ar' ? 'بيانات المركبة' : 'Vehicle'}
            </span>
            <strong className="text-xs font-black text-slate-900 block">
              {displayVehicle}
            </strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              {language === 'ar' ? 'الورشة / الموقع' : 'Provider / Location'}
            </span>
            <strong className="text-xs font-black text-slate-900 block truncate">
              {displayProviderName}
            </strong>
            <span className="text-[10px] text-slate-500 block">
              {language === 'ar' ? selectedCountry.nameAr : selectedCountry.nameEn}
            </span>
          </div>
          <div className="text-end">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              {language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}
            </span>
            <strong className="text-base font-black text-slate-900 font-mono block">
              {formatPrice(displayPrice)}
            </strong>
            <span className="text-[10px] text-emerald-600 font-bold block">
              {language === 'ar' ? '● مؤكد ومعتمد' : '● Confirmed'}
            </span>
          </div>
        </div>

        {/* 5-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span>{language === 'ar' ? 'مراحل تنفيذ الصيانة' : 'Service Status'}</span>
            {isDemoMode && (
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {language === 'ar' ? 'محاكاة لمراحل التتبع' : 'Simulated Live Progress'}
              </span>
            )}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {trackerSteps.map((st, i) => (
              <div key={i} className="relative space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      st.done
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : st.active
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {st.done ? '✓' : i + 1}
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">
                    {language === 'ar' ? st.titleAr : st.titleEn}
                  </strong>
                </div>
                <span className="text-[10px] text-slate-400 block ps-9 font-medium">
                  {language === 'ar' ? st.timeAr : st.timeEn}
                </span>
                <p className="text-[10px] text-slate-500 ps-9 leading-tight font-medium">
                  {language === 'ar' ? st.subAr : st.subEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Live Map & Service Provider Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live GPS Map (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-xs font-black text-slate-900 block">
                  {language === 'ar' ? 'التتبع المباشر لموقع الفني' : 'Live GPS Tracking'}
                </strong>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  {language === 'ar' ? '● الفني في الطريق إلى مركبتك' : '● Provider is on the way'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-700">
                <span>
                  {language === 'ar' ? 'الوقت المتوقع:' : 'ETA:'}{' '}
                  <strong className="text-blue-600">{language === 'ar' ? '12 دقيقة' : '12 min'}</strong>
                </span>
                <span>•</span>
                <span>
                  {language === 'ar' ? 'المسافة:' : 'Distance:'}{' '}
                  <strong className="text-slate-900">{language === 'ar' ? '3.2 كم' : '3.2 km'}</strong>
                </span>
              </div>
            </div>

            <div className="h-72 sm:h-84 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <LeafletMap
                height="100%"
                userLocation={[selectedCountry.cities[0].lat, selectedCountry.cities[0].lng]}
                rescueTruckLocation={{
                  lat: selectedCountry.cities[0].lat + 0.005,
                  lng: selectedCountry.cities[0].lng + 0.007,
                  title: language === 'ar' ? 'فني الصيانة في الطريق' : 'Technician Approaching',
                }}
              />
            </div>
          </div>

          {/* Service Provider Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <strong className="text-sm font-black text-slate-900 block">
                    {displayProviderName}
                  </strong>
                  <span className="text-amber-500 text-xs font-bold">★ 4.9 (532 تقييم)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  {language === 'ar' ? 'مركز معتمد' : 'Verified'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+970591234567"
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-xs border border-slate-200 flex items-center justify-center gap-1 text-slate-900 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{language === 'ar' ? 'اتصال هاتف' : 'Call'}</span>
                </a>
                <a
                  href="https://wa.me/970591234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-xl font-bold text-xs border border-emerald-200 flex items-center justify-center gap-1 text-emerald-800 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>

              {/* Technician Info */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                  alt="Technician"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <strong className="text-xs font-black text-slate-900 block">
                    {language === 'ar' ? 'م. محمد علي (فني معتمد)' : 'Mohammed Ali (Certified Tech)'}
                  </strong>
                  <span className="text-[10px] text-slate-500 block font-medium">
                    {language === 'ar' ? 'خبير أنظمة تكييف وكهرباء • ★ 4.9' : 'AC & Electrical Specialist • ★ 4.9'}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    {language === 'ar' ? 'يصل إليك خلال 12 دقيقة' : 'Arriving in 12 min'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <strong className="block font-black">
                {language === 'ar' ? 'تحتاج مساعدة أو استفسار؟' : 'Need assistance?'}
              </strong>
              <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                {language === 'ar'
                  ? 'فريق خدمة عملاء أهل المركبات متاح لمساعدتك على مدار الساعة على الرقم +970 59 123 4567.'
                  : 'Our customer care desk is available 24/7 at +970 59 123 4567.'}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Invoice Summary & In-App Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {language === 'ar' ? 'ملخص الفاتورة والرسوم' : 'Invoice Summary'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  {language === 'ar' ? '● مسددة بالكامل' : '● Paid'}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-3 font-medium">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'أجور الفحص والخدمة' : 'Service Fee'}</span>
                  <strong className="text-slate-900 font-mono">{formatPrice(Math.round(displayPrice * 0.85))}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'المواد وقطع الغيار' : 'Parts & Materials'}</span>
                  <strong className="text-slate-900 font-mono">{formatPrice(Math.round(displayPrice * 0.1))}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'ضريبة القيمة المضافة (5%)' : 'VAT (5%)'}</span>
                  <strong className="text-slate-900 font-mono">{formatPrice(Math.round(displayPrice * 0.05))}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
                  <span>{language === 'ar' ? 'المجموع النهائي الصافي' : 'Total Amount'}</span>
                  <span className="font-mono text-blue-600 font-black">{formatPrice(displayPrice)}</span>
                </div>
                <span className="text-[10px] text-slate-400 block pt-1 font-mono">
                  {language === 'ar' ? 'مدفوعة بواسطة فيزا •••• 6242' : 'Paid via Visa •••• 6242'}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                showToast(
                  language === 'ar' ? 'جاري تحميل الفاتورة الضريبية PDF...' : 'Downloading VAT Invoice...',
                  'info'
                )
              }
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تحميل الفاتورة الضريبية الرسمية PDF' : 'Download VAT Invoice'}</span>
            </button>
          </div>

          {/* Chat with Provider */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {language === 'ar' ? 'المحادثة الفورية مع الفني' : 'Chat with Technician'}
              </h3>
              <span className="text-[10px] text-emerald-600 font-bold">
                {language === 'ar' ? '● متصل الآن' : '● Online'}
              </span>
            </div>

            <div className="space-y-2 text-xs max-h-36 overflow-y-auto">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-2xl max-w-[80%] text-[11px] font-medium ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white ms-auto' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p>{language === 'ar' ? msg.textAr || msg.textEn : msg.textEn || msg.textAr}</p>
                  <span className="text-[8px] opacity-70 block text-end mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'ar' ? 'اكتب رسالتك للفني...' : 'Type your message...'}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none text-slate-900"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-amber-400 hover:bg-amber-500 rounded-xl text-slate-950 font-black transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FAQs Accordion */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h3 className="text-lg font-black text-slate-900 text-center">
          {language === 'ar' ? 'الأسئلة الشائعة حول الحجوزات ومتابعة الفني' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-2 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-start font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-4 bg-slate-50 text-xs text-slate-600 border-t border-slate-100 leading-relaxed font-medium">
                  {language === 'ar' ? faq.aAr : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
