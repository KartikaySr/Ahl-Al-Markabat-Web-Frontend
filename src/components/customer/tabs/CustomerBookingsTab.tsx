import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Send,
  Image,
  Paperclip,
  CheckCheck,
  DollarSign,
  User,
  Wrench,
  Sparkles,
} from 'lucide-react';

export const CustomerBookingsTab: React.FC = () => {
  const {
    language,
    setActiveTab,
    customerActiveTab,
    setCustomerActiveTab,
    showToast,
    user,
    placedBookings,
    formatPrice,
  } = useApp();
  const [subView, setSubView] = useState<'active_job' | 'quotes' | 'chat'>('active_job');

  // Chat State
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'advisor',
      textEn: 'Good morning Ahmed! We have received your Toyota RAV4 for the AC diagnostic service.',
      textAr: 'صباح الخير عمر! استلمنا مركبتك تويوتا راف فور وبدأنا عملية فحص دائرة التكييف وغاز الفريون.',
      time: '10:15 AM',
    },
    {
      sender: 'user',
      textEn: 'Hi Mohammed! The driver side vent was blowing warmer air than usual.',
      textAr: 'أهلاً م. محمد! فتحة التكييف من جهة السائق كانت تصدر هواءً دافئاً على غير المعتاد.',
      time: '10:18 AM',
    },
    {
      sender: 'advisor',
      textEn: 'We found the refrigerant level was slightly low. We are recharging R134a and leak-testing the valve now.',
      textAr: 'وجدنا انخفاضاً طفيفاً في ضغط الغاز. نقوم الآن بسحب الفاكيوم وإعادة الشحن وفحص الصمام للتأكد من عدم وجود تسريب.',
      time: '10:35 AM',
    },
    {
      sender: 'advisor',
      textEn: 'Your vehicle service is progressing on schedule! Finishing final vacuum check.',
      textAr: 'العمل يسير حسب الجدول الزمني بدقة، ننتهي من فحص الفاكيوم النهائي ونبدأ الفحص الشامل DVI.',
      time: '10:45 AM',
    },
  ]);

  const quotes = [
    {
      id: 'quote-1',
      provider: 'AutoTech Premier Garage',
      providerAr: 'مركز أوتو تك بريميير للصيانة',
      rating: 4.9,
      reviewCount: 532,
      distance: '1.2 km away',
      distanceAr: 'على بعد 1.2 كم (القوز الصناعية)',
      price: 'AED 380.00',
      labor: 'AED 160.00',
      parts: 'AED 210.00',
      vat: 'AED 10.00 (5%)',
      duration: '3 - 5 Hours',
      durationAr: '3 - 5 ساعات عمل',
      warranty: '12 Months / 20,000 km Warranty',
      warrantyAr: 'ضمان 12 شهراً أو 20,000 كم',
      includes: ['OEM Ceramic Front Brake Pads', 'Rotors Precision Resurfacing', '60-Point DVI Safety Inspection'],
      includesAr: ['فحمات فرامل أمامية سيراميك أصلية', 'خرط وتلميع هوبات بالليزر', 'فحص سلامة شامل 60 نقطة DVI'],
      isRecommended: true,
    },
    {
      id: 'quote-2',
      provider: 'Rapid Fix Mobile Auto Care',
      providerAr: 'مركز رابيد فيكس للصيانة المتنقلة',
      rating: 4.8,
      reviewCount: 310,
      distance: '2.5 km (Mobile Van Dispatch)',
      distanceAr: 'على بعد 2.5 كم (خدمة متنقلة أمام المنزل)',
      price: 'AED 340.00',
      labor: 'AED 150.00',
      parts: 'AED 180.00',
      vat: 'AED 10.00 (5%)',
      duration: 'Done at Your Villa / Office',
      durationAr: 'تنفيذ كامل أمام منزلك أو مكتبك',
      warranty: '6 Months Replacement Warranty',
      warrantyAr: 'ضمان استبدال 6 أشهر',
      includes: ['Premium Aftermarket Brake Pads', 'Mobile Technician Callout Fee Included'],
      includesAr: ['فحمات فرامل درجة أولى معتمدة', 'شامل رسوم انتقال الفني المتنقل'],
      isRecommended: false,
    },
    {
      id: 'quote-3',
      provider: 'PalAuto Diagnostic Center',
      providerAr: 'مركز بال أوتو للتشخيص والهايبرد',
      rating: 4.9,
      reviewCount: 420,
      distance: '4.0 km away',
      distanceAr: 'على بعد 4.0 كم (شارع الإرسال)',
      price: 'AED 410.00',
      labor: 'AED 190.00',
      parts: 'AED 210.00',
      vat: 'AED 10.00 (5%)',
      duration: 'Same Day Completion',
      durationAr: 'تسليم في نفس اليوم',
      warranty: '18 Months Warranty',
      warrantyAr: 'ضمان ممتد 18 شهراً',
      includes: ['OEM Brake Pads', 'Laser Rotor Balancing', 'Complimentary AC Refresh'],
      includesAr: ['فحمات أصلية معتمدة', 'ميزان هوبات إلكتروني', 'غسيل وتعقيم مجاني للمكيف'],
      isRecommended: false,
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLog((prev) => [
      ...prev,
      {
        sender: 'user',
        textEn: chatMessage,
        textAr: chatMessage,
        time: 'Just now',
      },
    ]);
    setChatMessage('');
    showToast(language === 'ar' ? 'تم إرسال الرسالة للمستشار الفني' : 'Message sent to advisor', 'success');
  };

  return (
    <div className="space-y-6">
      {/* 1. Sub-Tabs Bar (Matching Image 2) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubView('active_job')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'active_job'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{language === 'ar' ? 'الطلب النشط والتتبع المباشر GPS' : 'Active Job & GPS'}</span>
          {(!user?.isDemoUser && placedBookings.length === 0) ? null : (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setSubView('quotes')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'quotes'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{language === 'ar' ? 'عروض الأسعار والمقارنة' : 'Quotations'}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              subView === 'quotes' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
            }`}
          >
            {!user?.isDemoUser && placedBookings.length === 0 ? 0 : 3}
          </span>
        </button>

        <button
          onClick={() => setSubView('chat')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'chat'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{language === 'ar' ? 'المحادثة مع المستشار الفني' : 'Advisor Chat'}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              subView === 'chat' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {!user?.isDemoUser && placedBookings.length === 0 ? (language === 'ar' ? '0' : '0') : (language === 'ar' ? '1 جديد' : '1 New')}
          </span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* VIEW A: ACTIVE SERVICE JOB & LIVE GPS TRACKING               */}
      {/* ============================================================ */}
      {subView === 'active_job' && (
        <div className="space-y-6">
          {!user?.isDemoUser && placedBookings.length === 0 ? (
            <div className="bg-[#09152B] text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {language === 'ar' ? 'لا توجد حجوزات صيانة أو معاملات نشطة' : 'No Active Bookings or Transactions'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'حسابك جديد كلياً! عند قيامك بحجز أي موعد صيانة من الموقع العام أو طلب فني لمركبتك، ستظهر تفاصيل الحجز ومتابعة الفني مباشرة هنا.'
                    : 'Your account is brand new! When you book an appointment from the public site or pick a verified workshop, your active booking details and live status will appear right here.'}
                </p>
              </div>
              <button
                onClick={() => setCustomerActiveTab('providers')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'ar' ? 'استعراض الورش المعتمدة وحجز خدمة الآن' : 'Find Workshops & Book Service'}</span>
              </button>
            </div>
          ) : placedBookings.length > 0 ? (
            <div className="space-y-6">
              {placedBookings.map((b) => (
                <div key={b.id} className="bg-[#09152B] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                        <Car className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-base sm:text-lg font-black text-white">
                            {b.vehicleDetails} • {b.serviceName}
                          </strong>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                            {language === 'ar' ? '● تم تأكيد الحجز' : '● Booking Confirmed'}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {language === 'ar' ? 'رقم الحجز:' : 'Booking ID:'} #{b.id} • {b.providerName} • {b.date} ({b.timeSlot})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('track-booking')}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
                    >
                      <span>{language === 'ar' ? 'تتبع الموعد مباشرة على الخريطة' : 'Track Live on Map'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-0.5">{language === 'ar' ? 'طريقة الخدمة' : 'Service Mode'}</span>
                      <strong className="text-white block">{b.serviceMode}</strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-0.5">{language === 'ar' ? 'المركز المعتمد' : 'Provider'}</span>
                      <strong className="text-white block truncate">{b.providerName}</strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-0.5">{language === 'ar' ? 'الموعد المحدد' : 'Scheduled Time'}</span>
                      <strong className="text-white block">{b.date} • {b.timeSlot}</strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-0.5">{language === 'ar' ? 'الإجمالي المقدر' : 'Total Amount'}</span>
                      <strong className="text-amber-400 font-mono font-black text-sm">{formatPrice(b.price)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Active Job Card Demo Fallback */
            <div className="bg-[#09152B] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-base sm:text-lg font-black text-white">
                        {language === 'ar'
                          ? 'تويوتا راف فور هايبرد • صيانة التكييف وفحص الكمبيوتر'
                          : 'Toyota RAV4 • Major AC & Diagnostic Service'}
                      </strong>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                        {language === 'ar' ? '● في الطريق (الوصول خلال 12 د)' : '● On The Way (ETA 12 min)'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {language === 'ar' ? 'رقم الطلب:' : 'Job ID:'} #BOOK-78291 • {language === 'ar' ? 'لوحة: دبي أ 12345' : 'Dubai A 12345'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('track-booking')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
                >
                  <span>{language === 'ar' ? 'تتبع الموقع مباشرة على الخريطة' : 'Track Live on Map'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>{language === 'ar' ? 'مراحل الإنجاز (المرحلة 3 من 5)' : 'Milestone Progress (Step 3 of 5)'}</span>
                  <span className="text-amber-400 font-mono font-black">60% {language === 'ar' ? 'مكتمل' : 'Completed'}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 w-3/5" />
                </div>
              </div>

              {/* Provider & Technician Info */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Technician"
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <strong className="text-white font-bold block">
                      {language === 'ar' ? 'م. محمد علي (كبير مهندسي التشخيص والفحص)' : 'Mohammed Ali (Lead Diagnostic Tech)'}
                    </strong>
                    <span className="text-[11px] text-slate-400 block">
                      {language === 'ar' ? 'مركز أوتو تك بريميير للصيانة • مهندس معتمد ASE' : 'AutoTech Premier Garage • Master Certified'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSubView('chat')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? 'محادثة المستشار' : 'Chat'}</span>
                  </button>
                  <a
                    href="tel:+971501234567"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'اتصال مباشر' : 'Call'}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW B: MULTI-GARAGE QUOTATIONS COMPARISON MATRIX            */}
      {/* ============================================================ */}
      {subView === 'quotes' && (
        <div className="space-y-6">
          {!user?.isDemoUser && placedBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-2xs text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <DollarSign className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'لا توجد عروض أسعار مطلوبة حالياً' : 'No Quotations Yet'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'يمكنك طلب عروض أسعار مقارنة من عدة ورش معتمدة بنقرة واحدة عند حجز أي خدمة صيانة.'
                    : 'You can request competitive quotes from verified workshops in one click when booking any service.'}
                </p>
              </div>
              <button
                onClick={() => setCustomerActiveTab('providers')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'ar' ? 'استعراض الورش وطلب عرض أسعار' : 'Find Workshops & Request Quotes'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  className={`bg-white rounded-3xl p-6 border shadow-2xs space-y-4 flex flex-col justify-between transition-all ${
                    q.isRecommended ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <strong className="text-sm font-black text-slate-900 block">
                          {language === 'ar' ? q.providerAr : q.provider}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">
                          {language === 'ar' ? q.distanceAr : q.distance}
                        </span>
                      </div>
                      {q.isRecommended && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{language === 'ar' ? 'العرض الأفضل' : 'Best Value'}</span>
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>{language === 'ar' ? 'أجور اليد العاملة:' : 'Labor:'}</span>
                        <strong className="text-slate-800 font-mono">{q.labor}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>{language === 'ar' ? 'قطع الغيار:' : 'Parts:'}</span>
                        <strong className="text-slate-800 font-mono">{q.parts}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>{language === 'ar' ? 'ضريبة القيمة المضافة (5%):' : 'VAT (5%):'}</span>
                        <strong className="text-slate-800 font-mono">{q.vat}</strong>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs font-bold text-slate-900">
                        <span>{language === 'ar' ? 'الإجمالي الصافي:' : 'Total Price:'}</span>
                        <strong className="text-base font-black text-blue-600 font-mono">{q.price}</strong>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{language === 'ar' ? q.durationAr : q.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{language === 'ar' ? q.warrantyAr : q.warranty}</span>
                      </div>
                    </div>

                    {/* Included Services */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {language === 'ar' ? 'يشمل العرض:' : 'Includes:'}
                      </span>
                      {(language === 'ar' ? q.includesAr : q.includes).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(
                        language === 'ar' ? `تم قبول عرض ${q.providerAr} وبدء تجهيز أمر العمل!` : `Accepted quote from ${q.provider}!`,
                        'success'
                      );
                      setSubView('active_job');
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all text-center"
                  >
                    {language === 'ar' ? 'قبول العرض وحجز الموعد ←' : 'Accept Quote & Book →'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW C: LIVE SERVICE ADVISOR CHAT                            */}
      {/* ============================================================ */}
      {subView === 'chat' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[520px]">
          {!user?.isDemoUser && placedBookings.length === 0 ? (
            <div className="m-auto text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-inner">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'لا توجد محادثات نشطة مع الورش' : 'No Active Workshop Chats'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'عند حجز خدمة أو بدء فحص لمركبتك، تفتح قناة محادثة فورية مباشرة مع المستشار الفني والفني المعتمد.'
                    : 'When you book a service or an inspection starts, a direct real-time chat with your certified technician opens automatically here.'}
                </p>
              </div>
              <button
                onClick={() => setCustomerActiveTab('providers')}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'ar' ? 'استعراض الورش وبدء خدمة' : 'Find Workshops & Start Service'}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Advisor"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <strong className="text-xs font-black text-slate-900 block">
                      {language === 'ar' ? 'م. محمد علي — مركز أوتو تك بريميير' : 'Mohammed Ali — AutoTech Premier'}
                    </strong>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {language === 'ar' ? 'متصل الآن للإجابة على استفساراتك' : 'Online & in workshop bay'}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  {language === 'ar' ? 'المركبة: تويوتا راف فور هايبرد' : 'Vehicle: Toyota RAV4 Hybrid'}
                </span>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                {chatLog.map((msg, idx) => {
                  const isMe = msg.sender === 'user';
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[75%] p-3.5 rounded-2xl text-xs space-y-1 ${
                          isMe
                            ? 'bg-blue-600 text-white rounded-be-none shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-900 rounded-bs-none shadow-2xs'
                        }`}
                      >
                        <p className="leading-relaxed font-medium">
                          {language === 'ar' ? msg.textAr || msg.textEn : msg.textEn || msg.textAr}
                        </p>
                        <span className={`text-[9px] block text-end ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك للمستشار الفني مباشرة...' : 'Type message to service advisor...'}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-blue-600 font-medium"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-all flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};
