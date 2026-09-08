import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOBILE_MOCKUP_SCREENS } from '../../data/mockupsData';
import {
  Wrench,
  Radio,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Camera,
  DollarSign,
  MessageSquare,
  Building,
  Plus,
  Phone,
  Navigation,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Image,
  Sparkles,
} from 'lucide-react';

export const ProviderAppSimulator: React.FC = () => {
  const {
    language,
    t,
    jobs,
    updateJobStatus,
    isProviderOnline,
    setIsProviderOnline,
    formatPrice,
    showToast,
  } = useApp();

  const [simulatorMode, setSimulatorMode] = useState<'interactive' | 'mockup'>('interactive');
  const [activeTab, setActiveTab] = useState<'home' | 'requests' | 'jobs' | 'messages' | 'business'>('home');
  const [selectedMockupIndex, setSelectedMockupIndex] = useState(0);

  // Provider Mobile Screens (31 to 60)
  const providerMockups = MOBILE_MOCKUP_SCREENS.filter((s) => s.category === 'mobile_provider');
  const currentMockup = providerMockups[selectedMockupIndex] || providerMockups[0];
  const activeJob = jobs.find((j) => j.status !== 'completed') || jobs[0];

  return (
    <div className="py-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Container Device Heading & Mode Switcher */}
      <div className="text-center mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-bold border border-emerald-400/30">
          <Wrench className="w-3.5 h-3.5" />
          <span>Ahl Al Markabat • Service Provider Mobile App (React Native Simulated)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {language === 'ar' ? 'تطبيق الفني والمزود النقال (Provider App)' : 'Provider Mobile Application'}
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {language === 'ar'
            ? 'يمكنك التبديل بين المحاكي التفاعلي المباشر ومعرض شاشات عمليات الفني الأصلية (30 شاشة معتمدة)'
            : 'Toggle between live interactive flow and 30 authentic technician operation mockup screens'}
        </p>

        {/* Mode Switcher Pill */}
        <div className="inline-flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <button
            onClick={() => setSimulatorMode('interactive')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              simulatorMode === 'interactive'
                ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'المحاكي التفاعلي' : 'Live Interactive App'}</span>
          </button>

          <button
            onClick={() => setSimulatorMode('mockup')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              simulatorMode === 'mockup'
                ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'شاشات الفني الأصلية (31-60)' : 'Technician Mockups (31-60)'}</span>
          </button>
        </div>
      </div>

      {/* iPhone 16 Pro Device Frame */}
      <div className="relative w-full max-w-[390px] h-[820px] bg-slate-950 rounded-[50px] p-3.5 shadow-2xl border-[5px] border-slate-800 ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
          <div className={`w-3 h-3 rounded-full ${isProviderOnline ? 'bg-emerald-400' : 'bg-red-500'} animate-pulse`} />
        </div>

        {/* MODE 1: NATIVE MOCKUP SCREEN VIEWER */}
        {simulatorMode === 'mockup' ? (
          <div className="bg-slate-950 flex-1 rounded-[40px] overflow-hidden flex flex-col pt-9 pb-2 relative text-white">
            {/* Mockup Image Display */}
            <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
              <img
                src={currentMockup.path}
                alt={currentMockup.titleEn}
                className="w-full h-full object-cover object-top"
              />

              {/* Prev / Next Floating Navigation */}
              <button
                onClick={() =>
                  setSelectedMockupIndex((prev) =>
                    prev > 0 ? prev - 1 : providerMockups.length - 1
                  )
                }
                className="absolute start-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-emerald-400 hover:text-slate-950 text-white backdrop-blur-md transition-all shadow-lg"
                title="Previous Screen"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  setSelectedMockupIndex((prev) =>
                    prev < providerMockups.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute end-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-emerald-400 hover:text-slate-950 text-white backdrop-blur-md transition-all shadow-lg"
                title="Next Screen"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Screen Switcher Toolbar */}
            <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5 truncate">
                <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                  Screen #{currentMockup.number} • {currentMockup.filename}
                </span>
                <p className="font-bold text-white text-[11px] truncate">
                  {language === 'ar' ? currentMockup.titleAr : currentMockup.titleEn}
                </p>
              </div>

              <select
                value={selectedMockupIndex}
                onChange={(e) => setSelectedMockupIndex(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded-lg px-2 py-1 outline-none cursor-pointer shrink-0"
              >
                {providerMockups.map((m, idx) => (
                  <option key={m.id} value={idx}>
                    #{m.number} - {m.filename}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          /* MODE 2: INTERACTIVE REACT SIMULATOR */
          <div className="bg-slate-900 text-white flex-1 rounded-[40px] overflow-hidden flex flex-col pt-9 pb-2 select-none relative font-sans">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: HOME */}
            {activeTab === 'home' && (
              <div className="space-y-4 animate-fade-in text-xs">
                {/* Brand Header */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <img
                      src="/logo-night.png"
                      alt="Ahl Al Markabat Provider"
                      className="w-8 h-8 rounded-xl object-contain shadow-md border border-amber-400/40"
                    />
                    <div>
                      <h3 className="font-black text-white text-xs leading-none">
                        {language === 'ar' ? 'أهل المركبات' : 'Ahl Al Markabat'}
                      </h3>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        {language === 'ar' ? 'بوابة مزود الخدمة' : 'Provider Mobile Portal'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Online / Offline Status Toggle Bar */}
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        isProviderOnline ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-ping' : 'bg-slate-500'
                      }`}
                    />
                    <div>
                      <h4 className="font-black text-white text-xs">
                        {isProviderOnline
                          ? (language === 'ar' ? 'متاح لاستقبال الطلبات (Online)' : 'Online & Ready')
                          : (language === 'ar' ? 'غير متاح حالياً (Offline)' : 'Offline')}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {isProviderOnline ? 'تظهر على الخريطة في محيط 15 كم' : 'لا تستقبل إشعارات جديدة'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsProviderOnline(!isProviderOnline);
                      showToast(
                        !isProviderOnline
                          ? (language === 'ar' ? 'أنت الآن متاح على الخريطة لاستقبال الطلبات!' : 'You are now Online!')
                          : (language === 'ar' ? 'تم تحويل حالتك إلى غير متاح' : 'You are now Offline')
                      );
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-[11px] transition-all ${
                      isProviderOnline
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-emerald-500 text-slate-950 shadow-md'
                    }`}
                  >
                    {isProviderOnline ? (language === 'ar' ? 'إيقاف' : 'Go Offline') : (language === 'ar' ? 'تفعيل' : 'Go Online')}
                  </button>
                </div>

                {/* Quick Earnings / KPI summary */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">إيراد اليوم</span>
                    <span className="text-base font-black text-amber-400 font-mono">
                      {formatPrice(420)}
                    </span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">أوامر العمل</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {jobs.filter((j) => j.status !== 'completed').length} نشطة
                    </span>
                  </div>
                </div>

                {/* Active Job Tracker */}
                {activeJob && (
                  <div className="bg-slate-800 p-3.5 rounded-2xl border border-amber-400/40 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-amber-400 font-bold">{activeJob.referenceId}</span>
                      <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        قيد التنفيذ
                      </span>
                    </div>

                    <h4 className="font-black text-white text-xs">{activeJob.vehicleName}</h4>
                    <p className="text-[11px] text-slate-300">{activeJob.serviceTitle}</p>

                    <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between text-[11px]">
                      <span>العميل: {activeJob.customerName}</span>
                      <a
                        href={`tel:${activeJob.customerPhone}`}
                        className="text-emerald-400 font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>اتصال</span>
                      </a>
                    </div>

                    {/* Step Advancement */}
                    <div className="pt-1 flex gap-2">
                      <button
                        onClick={() => updateJobStatus(activeJob.id, 'ready')}
                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-[11px]"
                      >
                        جاهز للتسليم ✓
                      </button>
                      <button
                        onClick={() => showToast(language === 'ar' ? 'تم فتح الكاميرا لتوثيق صور الإصلاح' : 'Camera opened')}
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-650 rounded-xl text-slate-200"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Incoming Request Alert */}
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[10px]">طلب جديد وارد الآن (1.2 كم)</span>
                    <span className="text-amber-400 text-[10px] font-bold">بنزين</span>
                  </div>
                  <h4 className="font-bold text-white">Hyundai Tucson 2021</h4>
                  <p className="text-[11px] text-slate-400">تغيير فحمات فرامل أمامية وخرط هوبات</p>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => showToast(language === 'ar' ? 'تم قبول الطلب وإرسال عرض السعر' : 'Request Accepted')}
                      className="flex-1 py-1.5 bg-amber-400 text-slate-950 font-black rounded-lg text-[11px]"
                    >
                      إرسال تسعيرة 380 ₪
                    </button>
                    <button
                      onClick={() => showToast(language === 'ar' ? 'تم رفض الطلب' : 'Request Declined')}
                      className="px-3 py-1.5 bg-slate-700 text-slate-300 font-bold rounded-lg text-[11px]"
                    >
                      تجاهل
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: REQUESTS */}
            {activeTab === 'requests' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <h3 className="text-sm font-black text-white">
                  {language === 'ar' ? 'طلبات التسعير الواردة' : 'Incoming Quote Requests'}
                </h3>
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                  <span className="font-mono text-amber-400 text-[10px]">REQ-2026-0512</span>
                  <h4 className="font-bold text-white">Toyota RAV4 Hybrid 2022</h4>
                  <p className="text-slate-400 text-[11px]">صوت صفير في الفرامل مع اهتزاز بسيط عند التوقف</p>
                  <span className="text-emerald-400 font-bold block text-[10px]">تم إرسال عرض سعر بقيمة 420 ₪</span>
                </div>
              </div>
            )}

            {/* TAB 3: JOBS */}
            {activeTab === 'jobs' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <h3 className="text-sm font-black text-white">
                  {language === 'ar' ? 'أوامر العمل (Work Orders)' : 'Active Work Orders'}
                </h3>
                {jobs.map((job) => (
                  <div key={job.id} className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-amber-400 font-bold text-[10px]">{job.referenceId}</span>
                      <span className="text-emerald-400 font-bold text-[10px]">{job.status}</span>
                    </div>
                    <h4 className="font-bold text-white">{job.vehicleName}</h4>
                    <p className="text-slate-400 text-[10px]">{job.serviceTitle}</p>
                    <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-[10px]">
                      <span>الفني: {job.technicianName}</span>
                      <span className="font-bold font-mono text-amber-400">{formatPrice(job.totalAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <h3 className="text-sm font-black text-white">
                  {language === 'ar' ? 'محادثات العملاء (Chat)' : 'Customer Messages'}
                </h3>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center">
                      ع ع
                    </div>
                    <div>
                      <h4 className="font-bold text-white">عمر عبد الله</h4>
                      <p className="text-[10px] text-slate-400">هل فحمات التويوتا أصلية وكالة؟</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">الآن</span>
                </div>
              </div>
            )}

            {/* TAB 5: BUSINESS */}
            {activeTab === 'business' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <div className="text-center space-y-1 py-2">
                  <div className="w-14 h-14 rounded-2xl bg-brand-navy border border-amber-400 text-amber-400 font-black text-lg flex items-center justify-center mx-auto">
                    AT
                  </div>
                  <h4 className="font-bold text-white text-sm">مركز أوتو تك للصيانة</h4>
                  <p className="text-emerald-400 text-[10px]">✓ مزود معتمد (Premium Verified)</p>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 divide-y divide-slate-700 text-slate-300">
                  <div className="p-3 flex justify-between items-center">
                    <span>إجمالي الأرباح والسحب</span>
                    <span className="font-mono text-amber-400 font-bold">{formatPrice(24580)}</span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span>باقة الاشتراك الحالية</span>
                    <span className="text-amber-400 font-bold">Business SaaS</span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span>فريق العمل والفنيين</span>
                    <span className="text-slate-400">6 فنيين</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Native Provider Navigation Bar (From Section 20 of Blueprint) */}
          <div className="bg-slate-950 border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px] font-bold">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'home' ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'requests' ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{language === 'ar' ? 'الطلبات' : 'Requests'}</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'jobs' ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{language === 'ar' ? 'الأوامر' : 'Jobs'}</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'messages' ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'ar' ? 'المحادثات' : 'Chat'}</span>
            </button>

            <button
              onClick={() => setActiveTab('business')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'business' ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{language === 'ar' ? 'أعمالي' : 'Business'}</span>
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
