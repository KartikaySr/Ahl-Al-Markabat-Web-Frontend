import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../common/LeafletMap';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, showToast, selectedCountry } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(0);

  const branches = [
    {
      nameEn: 'Ramallah - Main Headquarters',
      nameAr: 'المقر الرئيسي - رام الله والبيرة',
      addressEn: 'Al-Masyoun Street, Commercial Tower, Ramallah',
      addressAr: 'شارع المصيون، البرج التجاري، رام الله والبيرة',
      coords: [31.9038, 35.2034] as [number, number],
    },
    {
      nameEn: 'Nablus Hub & Operations',
      nameAr: 'فرع ومكتب عمليات نابلس',
      addressEn: 'Rafidia Main Street, Nablus',
      addressAr: 'شارع رفيديا الرئيسي، نابلس',
      coords: [32.2227, 35.2621] as [number, number],
    },
    {
      nameEn: 'Hebron Service Office',
      nameAr: 'فرع الخليل للخدمات والشركاء',
      addressEn: 'Ein Sara Street, Hebron',
      addressAr: 'شارع عين سارة، الخليل',
      coords: [31.5326, 35.0998] as [number, number],
    },
    {
      nameEn: 'Dubai Regional Office (UAE)',
      nameAr: 'المكتب الإقليمي - دبي (الإمارات)',
      addressEn: 'Al Quoz Industrial Area 3, Dubai, UAE',
      addressAr: 'المنطقة الصناعية 3، القوز، دبي، الإمارات',
      coords: [25.1384, 55.2341] as [number, number],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      showToast(
        language === 'ar'
          ? 'يرجى الموافقة على سياسة الخصوصية وشروط الاستخدام.'
          : 'Please agree to the Privacy Policy and Terms of Service.',
        'error'
      );
      return;
    }
    showToast(
      language === 'ar'
        ? `شكراً لتواصلك يا ${name}! تم إرسال رسالتك وسيقوم فريق الدعم بالرد خلال ساعتين.`
        : `Thank you ${name}! Your message has been sent. We will reply within 2 hours.`,
      'success'
    );
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs text-amber-400 font-black uppercase tracking-wider block">
              {language === 'ar' ? 'اتصل بنا • خدمة العملاء والشركاء' : 'CONTACT US'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'ar' ? 'تواصل معنا.' : 'Contact Us'} <br />
              <span className="text-amber-400">{language === 'ar' ? 'نحن دائماً في خدمتك' : "We're Here to Help"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'لديك استفسار، تحتاج إلى مساعدة في حجزك، أو ترغب في تسجيل ورشتك كشريك؟ تواصل مع فريق خدمة العملاء المتخصص وسنرد عليك فوراً.'
                : "Have questions, need assistance, or want to partner with us? Reach out to our team and we'll get back to you quickly."}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                {language === 'ar' ? 'سرعة استجابة فائقة' : 'Fast Response'}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {language === 'ar' ? 'فريق دعم فني متخصص' : 'Expert Support'}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-400" />
                {language === 'ar' ? 'متاح 24/7 على مدار الساعة' : '24/7 Available'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Form & Contact Channels Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Send Us a Message Form (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-black text-slate-900">
              {language === 'ar' ? 'أرسل لنا رسالة مباشرة' : 'Send Us a Message'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ar'
                ? 'املأ النموذج وسيقوم فريق الدعم الفني بالرد على طلبك في أقرب وقت.'
                : 'Fill out the form below and our team will get back to you shortly.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  {language === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكريم' : 'Enter your full name'}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  {language === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'example@domain.com' : 'Enter your email'}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">
                {language === 'ar' ? 'رقم الهاتف للتواصل *' : 'Phone Number *'}
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+970 59 XXX XXXX / +971 50 XXX XXXX"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900 font-mono"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">
                {language === 'ar' ? 'موضوع الرسالة *' : 'Subject *'}
              </span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900 cursor-pointer"
              >
                <option value="general">{language === 'ar' ? 'استفسار عام' : 'General Inquiry'}</option>
                <option value="booking">{language === 'ar' ? 'استفسار حول الحجوزات والمواعيد' : 'Booking & Appointments'}</option>
                <option value="pricing">{language === 'ar' ? 'الأسعار وعروض الورش' : 'Services & Pricing'}</option>
                <option value="technical">{language === 'ar' ? 'دعم فني للمنصة' : 'Technical Support'}</option>
                <option value="fleet">{language === 'ar' ? 'خدمات الشركات والأساطيل' : 'Fleet Solutions'}</option>
                <option value="partnership">{language === 'ar' ? 'شراكات وانضمام ورش' : 'Partnerships'}</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">
                {language === 'ar' ? 'تفاصيل الرسالة *' : 'Message *'}
              </span>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'كيف يمكننا مساعدتك اليوم؟ اكتب تفاصيل استفسارك هنا...'
                    : 'How can we help you?'
                }
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none resize-none text-slate-900"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded accent-blue-600 w-4 h-4"
              />
              <span>
                {language === 'ar'
                  ? 'أوافق على سياسة الخصوصية وشروط الاستخدام في أهل المركبات.'
                  : 'I agree to the Privacy Policy and Terms of Service'}
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: 4 Channels Cards (6 cols) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <strong className="text-xs font-black text-slate-900 block pt-1">
                {language === 'ar' ? 'المقر الرئيسي' : 'Head Office'}
              </strong>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                {language === 'ar'
                  ? 'شارع المصيون، البرج التجاري، رام الله، دولة فلسطين'
                  : 'Al-Ram, Al-Masyoun Street, Ramallah, Palestine (P.O. Box 1234)'}
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('locations-map');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 transition-all"
            >
              {language === 'ar' ? 'الاتجاهات على الخريطة' : 'Get Directions'}
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <strong className="text-xs font-black text-slate-900 block pt-1">
                {language === 'ar' ? 'الاتصال الهاتفي المباشر' : 'Call Us'}
              </strong>
              <span className="text-[11px] text-slate-500 block">
                {language === 'ar' ? 'الخط الساخن متاح 24/7' : 'Main Line 24/7 Available'}
              </span>
              <strong className="text-xs font-black text-slate-900 font-mono block">+970 59 123 4567</strong>
            </div>
            <a
              href="tel:+970591234567"
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 block text-center transition-all"
            >
              {language === 'ar' ? 'اتصل الآن' : 'Call Now'}
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <strong className="text-xs font-black text-slate-900 block pt-1">
                {language === 'ar' ? 'المراسلة عبر البريد' : 'Email Us'}
              </strong>
              <span className="text-[10px] text-slate-500 block font-mono">info@ahlalmarkabat.com</span>
              <span className="text-[10px] text-slate-500 block font-mono">support@ahlalmarkabat.com</span>
            </div>
            <a
              href="mailto:support@ahlalmarkabat.com"
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 block text-center transition-all"
            >
              {language === 'ar' ? 'إرسال بريد إلكتروني' : 'Send an Email'}
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <strong className="text-xs font-black text-slate-900 block pt-1">
                {language === 'ar' ? 'محادثة واتساب الفورية' : 'WhatsApp'}
              </strong>
              <span className="text-[11px] text-slate-500 block">
                {language === 'ar' ? 'ردود سريعة ومساعدة مباشرة' : 'Quick replies & live assistance'}
              </span>
              <strong className="text-xs font-black text-emerald-600 font-mono block">+970 59 123 4567</strong>
            </div>
            <a
              href="https://wa.me/970591234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs block text-center transition-all"
            >
              {language === 'ar' ? 'محادثة عبر واتساب' : 'Chat on WhatsApp'}
            </a>
          </div>
        </div>
      </div>

      {/* 3. Our Locations with Interactive Leaflet Map */}
      <div id="locations-map" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          {language === 'ar' ? 'مواقعنا ومكاتبنا الإقليمية' : 'Our Locations'}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-2">
            {branches.map((loc, i) => {
              const isSelected = selectedBranch === i;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedBranch(i)}
                  className={`p-4 rounded-2xl border shadow-2xs space-y-1 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-600 shadow-md ring-2 ring-blue-600/20'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <strong className="text-xs font-black text-slate-900 block">
                    {language === 'ar' ? loc.nameAr : loc.nameEn}
                  </strong>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {language === 'ar' ? loc.addressAr : loc.addressEn}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-8 h-80 rounded-3xl overflow-hidden border border-slate-200 shadow-2xs relative">
            <LeafletMap center={branches[selectedBranch].coords} height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};
