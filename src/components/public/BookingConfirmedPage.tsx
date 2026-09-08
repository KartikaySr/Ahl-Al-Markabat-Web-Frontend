import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Car,
  FileText,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Download,
  Share2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  QrCode,
  Sparkles,
  CreditCard,
  Building2,
  Wrench,
  Check,
} from 'lucide-react';

export const BookingConfirmedPage: React.FC = () => {
  const { language, formatPrice, setActiveTab, selectedVehicle, showToast, selectedCountry } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const nextSteps = [
    {
      num: 1,
      titleEn: 'Booking Confirmed',
      titleAr: 'تأكيد الحجز بنجاح',
      dateEn: 'May 24, 10:45 AM',
      dateAr: '24 مايو، 10:45 ص',
      descEn: 'Confirmation email & SMS sent to your phone.',
      descAr: 'تم إرسال تفاصيل الموعد والفاتورة لهاتفك وبريدك.',
      done: true,
    },
    {
      num: 2,
      titleEn: 'Smart Reminder',
      titleAr: 'تذكير ذكي بالموعد',
      dateEn: 'May 26, 8:00 AM',
      dateAr: '26 مايو، 8:00 ص',
      descEn: "We'll remind you 2 hours before your appointment.",
      descAr: 'سنرسل لك إشعاراً تذكيرياً قبل الموعد بساعتين.',
      done: false,
    },
    {
      num: 3,
      titleEn: 'Service In Progress',
      titleAr: 'تنفيذ الصيانة وفحص DVI',
      dateEn: 'May 26, 10:30 AM',
      dateAr: '26 مايو، 10:30 ص',
      descEn: 'Experts will inspect and service your vehicle.',
      descAr: 'يقوم الفني المعتمد بفحص وصيانة السيارة.',
      done: false,
    },
    {
      num: 4,
      titleEn: 'Quality & Road Test',
      titleAr: 'اختبار الجودة وتجربة القيادة',
      dateEn: 'After Service',
      dateAr: 'بعد انتهاء الصيانة',
      descEn: 'Safety and quality checklist verification.',
      descAr: 'التأكد من معايير السلامة التامة ومطابقة القطع.',
      done: false,
    },
    {
      num: 5,
      titleEn: 'Handover & Warranty',
      titleAr: 'استلام المركبة والضمان',
      dateEn: '',
      dateAr: '',
      descEn: "You'll receive the inspection report & warranty.",
      descAr: 'استلام تقرير الفحص وتفعيل شهادة الضمان فوراً.',
      done: false,
    },
  ];

  const suggestedServices = [
    {
      titleEn: 'AC Service & Repair',
      titleAr: 'صيانة وتبريد المكيف',
      descEn: 'Keep your AC cool & efficient',
      descAr: 'تعبئة غاز فريون وفحص الكمبروسر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=200&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'Brake Inspection & Pads',
      titleAr: 'فحص فحمات وديسكات الفرامل',
      descEn: 'Ensure your safety on the road',
      descAr: 'كفاءة كبح عالية وسلامة مضمونة',
      price: 249,
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&auto=format&fit=crop&q=80',
    },
    {
      titleEn: '3D Wheel Alignment',
      titleAr: 'ميزان واستقامة الإطارات 3D',
      descEn: 'Better handling & tire life',
      descAr: 'ثبات فائق على السرعات العالية',
      price: 159,
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=200&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'Computer Diagnostics',
      titleAr: 'فحص كمبيوتر الأعطال الشامل',
      descEn: 'Detect hidden issues early',
      descAr: 'كشف دقيق لكافة الحساسات والمحرك',
      price: 150,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      qEn: 'How can I reschedule my appointment?',
      qAr: 'كيف يمكنني تعديل وقت الموعد أو تأجيله؟',
      aEn: 'You can reschedule directly by clicking the Reschedule button above or contacting the service center up to 2 hours prior.',
      aAr: 'يمكنك تعديل الموعد بسهولة عبر النقر على زر "تعديل الموعد" أعلاه أو الاتصال بمركز الصيانة قبل ساعتين من الحجز مجاناً.',
    },
    {
      qEn: 'Can I cancel my booking?',
      qAr: 'هل يمكنني إلغاء الحجز واسترداد المبلغ؟',
      aEn: 'Yes, cancellation is 100% free with instant refund up to 2 hours prior to your scheduled appointment.',
      aAr: 'نعم، الإلغاء مجاني بالكامل مع استرداد المبلغ فوراً لحسابك حتى ساعتين قبل موعد الصيانة.',
    },
    {
      qEn: 'How do I download my official VAT invoice?',
      qAr: 'كيف أحصل على الفاتورة الضريبية الرسمية؟',
      aEn: 'Click Download Official Invoice PDF in the payment summary card above to save your tax invoice immediately.',
      aAr: 'اضغط على زر "تحميل الفاتورة الضريبية PDF" في قسم ملخص الدفع أعلاه لحفظ الفاتورة مباشرة.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* 1. Hero Header */}
      <div className="relative bg-[#070E1B] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070E1B] via-[#0B1A33]/90 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=80"
          alt="Confirmed Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="max-w-[1700px] mx-auto relative z-20 space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <span>›</span>
            <button onClick={() => setActiveTab('bookings')} className="hover:text-amber-400 transition-colors">
              {language === 'ar' ? 'حجوزاتي' : 'Bookings'}
            </button>
            <span>›</span>
            <span className="text-white font-bold">
              {language === 'ar' ? 'تأكيد الحجز بنجاح' : 'Booking Confirmation'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg ring-4 ring-emerald-500/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {language === 'ar' ? 'تم تأكيد حجزك بنجاح!' : 'Booking Confirmed!'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  {language === 'ar'
                    ? 'تم حجز موعد صيانة سيارتك وتأكيده مع المركز. أرسلنا كافة التفاصيل لرسائلك وبريدك الإلكتروني.'
                    : "Your service appointment is confirmed. We've sent the details to your email and SMS."}
                </p>
                <p className="text-xs font-bold text-amber-400 pt-1">
                  {language === 'ar' ? 'شكراً لثقتك بمنصة أهل المركبات.' : 'Thank you for choosing AHL AL MARKABAT.'}
                </p>
              </div>
            </div>

            {/* Booking ID Box */}
            <div className="bg-[#0B1528]/90 border border-slate-700/80 p-4 rounded-2xl backdrop-blur-md space-y-1 shrink-0 md:w-64">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {language === 'ar' ? 'رقم تأكيد الحجز' : 'Booking ID'}
              </span>
              <strong className="text-lg font-black font-mono text-amber-400 block">BK-2025-05126</strong>
              <span className="text-[11px] text-slate-300 font-mono block">24 مايو 2025 • 10:45 ص</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 space-y-8">
        {/* 2. Quick Status Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'حالة الحجز' : 'Status'}
              </span>
              <strong className="text-emerald-700 font-bold">
                {language === 'ar' ? 'مؤكد ومجدول' : 'Confirmed'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'حالة السداد' : 'Payment Status'}
              </span>
              <strong className="text-blue-700 font-bold">
                {language === 'ar' ? 'مدفوع بالكامل' : 'Paid'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}
              </span>
              <strong className="text-slate-900 font-mono font-black">{formatPrice(349.00)}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'وسيلة الدفع' : 'Payment Method'}
              </span>
              <strong className="text-slate-900 font-mono">VISA •••• 4242</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'الدعم الفني 24/7' : 'Need Help?'}
              </span>
              <strong className="text-slate-900 font-mono">+970 59 123 4567</strong>
            </div>
          </div>
        </div>

        {/* 3. Booking Summary 3-Column Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950">
              {language === 'ar' ? 'تفاصيل ومعلومات الحجز المعتمد' : 'Booking Summary'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'ar'
                ? 'إليك كافة بيانات الموعد والمركز والمركبة الخاصة بك.'
                : 'Here are the details of your confirmed appointment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Service Provider */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-black block">
                  {language === 'ar' ? 'مركز الصيانة المعتمد' : 'Service Provider'}
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="German Auto Experts"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <strong className="text-xs font-black text-slate-950 block">
                      {language === 'ar' ? 'مركز خبراء السيارات الألمانية ✓' : 'German Auto Experts ✓'}
                    </strong>
                    <span className="text-[10px] text-slate-500">★ 4.9 (532 تقييم)</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 pt-2 border-t border-slate-200/80 font-medium">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> +970 59 123 4567
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      {language === 'ar'
                        ? 'المنطقة الصناعية، بالقرب من دوار المنارة، رام الله'
                        : 'Industrial Zone, Ramallah, Palestine'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('providers')}
                className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all shadow-2xs"
              >
                {language === 'ar' ? 'عرض الملف التعريفي للمركز' : 'View Provider Profile'}
              </button>
            </div>

            {/* 2. Appointment Details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-3 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-black block">
                  {language === 'ar' ? 'توقيت وموعد الحضور' : 'Appointment Details'}
                </span>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {language === 'ar' ? 'التاريخ المحدد' : 'Date'}
                    </span>
                    <strong className="text-slate-900 block font-bold">
                      {language === 'ar' ? 'الاثنين، 26 مايو 2025' : 'Monday, May 26, 2025'}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {language === 'ar' ? 'فترة الحضور' : 'Time'}
                    </span>
                    <strong className="text-slate-900 block font-bold">10:30 ص – 12:00 م</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('track-booking')}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تتبع مسار الوصول المباشر' : 'Track Booking ↗'}</span>
              </button>
            </div>

            {/* 3. Vehicle Details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-black block">
                  {language === 'ar' ? 'بيانات المركبة المحجوزة' : 'Vehicle Details'}
                </span>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&auto=format&fit=crop&q=80"
                    alt="Toyota RAV4"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <strong className="text-xs font-black text-slate-950 block">
                      {language === 'ar' ? 'تويوتا راف فور' : 'Toyota RAV4'}
                    </strong>
                    <span className="text-[10px] text-slate-500 font-mono">2021 • SUV</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'رقم اللوحة:' : 'Plate Number:'}</span>
                    <strong className="text-slate-900 font-mono">6-1234-90</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'اللون:' : 'Color:'}</span>
                    <strong className="text-slate-900">{language === 'ar' ? 'أبيض لؤلؤي' : 'Pearl White'}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('garage')}
                className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all shadow-2xs"
              >
                {language === 'ar' ? 'عرض في كراجي الرقمي' : 'View in Garage'}
              </button>
            </div>
          </div>
        </div>

        {/* 4. What Happens Next? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-wide">
              {language === 'ar' ? 'ماذا بعد تأكيد الحجز؟' : 'What Happens Next?'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ar' ? 'نحن نجهز كافة الترتيبات لضمان أفضل خدمة لسيارتك.' : "We're preparing everything for your service."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {nextSteps.map((step) => (
              <div key={step.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                <div
                  className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                    step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {step.done ? '✓' : step.num}
                </div>
                <strong className="text-xs font-black text-slate-900 block">
                  {language === 'ar' ? step.titleAr : step.titleEn}
                </strong>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {language === 'ar' ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-slate-950">
            {language === 'ar' ? 'الأسئلة الشائعة حول تأكيد ومتابعة الحجز' : 'Help & Support'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-start font-bold text-xs text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 font-medium">
                    {language === 'ar' ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
