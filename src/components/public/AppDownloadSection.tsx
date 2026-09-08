import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  QrCode,
  Download,
  BellRing,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
} from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  const { language, setActiveTab, setRole } = useApp();

  return (
    <section className="py-16 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200 space-y-16">
      {/* 1. Mobile App Companion Showcase */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="bg-[#0B1528] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl overflow-hidden relative text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 text-amber-400 text-xs font-bold border border-blue-700/60">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'رفيق سيارتك الذكي في جيبك' : 'Your Car Care Companion'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {language === 'ar' ? (
                  <>
                    حمّل تطبيق أهل المركبات، <br />
                    <span className="text-amber-400">واستمتع بتجربة صيانة ولا أسهل.</span>
                  </>
                ) : (
                  <>
                    Download the Ahl Al Markabat app. <br />
                    <span className="text-amber-400">Everything you need on the go.</span>
                  </>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {language === 'ar'
                  ? 'احجز المواعيد في ثوانٍ، تتبع الفنيين مباشرة، واحفظ سجل الصيانة والفواتير في كراجك الرقمي الدائم.'
                  : 'Book services in seconds, track providers in real time, and access your digital garage ledger anytime.'}
              </p>

              {/* 4 App Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? 'حجز الصيانة خلال ثوانٍ' : 'Book services in seconds'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? 'تتبع المزودين على الخريطة حياً' : 'Track providers in real time'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? 'تنبيهات المواعيد والسجل الرقمي' : 'Get reminders & service history'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? 'دفع آمن وفواتير إلكترونية' : 'Secure payments & digital receipts'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="text-lg">🍎</span>
                  <div className="text-start">
                    <span className="text-[9px] text-slate-400 block uppercase">Download on</span>
                    <strong className="text-xs">App Store</strong>
                  </div>
                </button>

                <button
                  type="button"
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="text-lg">🤖</span>
                  <div className="text-start">
                    <span className="text-[9px] text-slate-400 block uppercase">Get it on</span>
                    <strong className="text-xs">Google Play</strong>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Phone Visual & QR Code */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Phone Mockup Screen Artwork */}
              <div className="relative w-44 h-72 rounded-[28px] overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-950 shrink-0">
                <img
                  src="/images/01_Onboarding.png"
                  alt="Ahl Al Markabat Mobile Experience"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* QR Code Scan Card */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xl text-slate-900 shrink-0">
                <div className="w-24 h-24 bg-slate-50 p-2 rounded-xl mx-auto flex items-center justify-center border border-slate-200">
                  <img
                    src="/images/AHL AL MARKABAT.png"
                    alt="Scan QR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-black text-slate-950 block">
                    {language === 'ar' ? 'امسح للتحميل مجاناً' : 'Scan to Download'}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-medium">
                    {language === 'ar' ? 'مجاني 100%' : "It's free!"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dual Action Banners (For Providers / For Workshops & Businesses) */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner 1: For Providers */}
          <div className="bg-[#0B1528] rounded-3xl p-8 border border-slate-800 text-white flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-900/80 text-amber-400 text-xs font-bold border border-blue-700/60 inline-block">
                {language === 'ar' ? 'لأصحاب الورش ومزودي الخدمات' : 'For Providers'}
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === 'ar'
                  ? 'نمّ أعمال ورشتك مع منصة أهل المركبات'
                  : 'Grow your business with AHL AL MARKABAT'}
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'استقبل طلبات صيانة وعملاء جدد يومياً' : 'Get more customers'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'إدارة المواعيد وأوامر العمل بسهولة' : 'Manage bookings easily'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'بناء سمعة رقمية وتقييمات موثوقة' : 'Grow your reputation'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('become-provider')}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-105"
              >
                {language === 'ar' ? 'انضم كمزود خدمة' : 'Join as Provider'}
              </button>
              <button
                onClick={() => setActiveTab('become-provider')}
                className="text-xs text-slate-300 hover:text-white font-bold transition-colors"
              >
                {language === 'ar' ? 'معرفة المزيد ←' : 'Learn more →'}
              </button>
            </div>
          </div>

          {/* Banner 2: For Workshops & Businesses */}
          <div className="bg-[#0B1528] rounded-3xl p-8 border border-slate-800 text-white flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-900/80 text-amber-400 text-xs font-bold border border-blue-700/60 inline-block">
                {language === 'ar' ? 'للشركات ومراكز الصيانة الكبرى' : 'For Workshops & Businesses'}
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === 'ar'
                  ? 'طوّر عمليات ورشتك بأحدث الأدوات الرقمية'
                  : 'Power your operations with smart tools'}
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'حلول متكاملة لإدارة أساطيل المركبات' : 'Fleet management solutions'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'أتمتة سير العمل والمخزون والفواتير' : 'Automated workflows'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'تقارير أداء وتحليلات مالية دقيقة' : 'Insights & performance analytics'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('workshop');
                  setRole('provider');
                }}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-105"
              >
                {language === 'ar' ? 'استكشف الحلول' : 'Explore Solutions'}
              </button>
              <button
                onClick={() => setActiveTab('fleet')}
                className="text-xs text-slate-300 hover:text-white font-bold transition-colors"
              >
                {language === 'ar' ? 'معرفة المزيد ←' : 'Learn more →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
