import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  Gauge,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';

export const DigitalGaragePreviewSection: React.FC = () => {
  const { language, vehicles, setActiveTab, isAuthenticated, openAuthModal, setCustomerActiveTab } = useApp();

  const primaryVehicle = vehicles.find((v) => v.isPrimary) || vehicles[0];

  const handleOpenGarage = () => {
    if (isAuthenticated) {
      setActiveTab('customer');
      setCustomerActiveTab('garage');
    } else {
      openAuthModal('signup');
    }
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <Car className="w-4 h-4 text-blue-600" />
              <span>{language === 'ar' ? 'الكراج الرقمي لمالكي المركبات' : 'Digital Vehicle Ownership Cockpit'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {language === 'ar' ? 'سجل صيانة رقمي متكامل، وصحة دائمة لمركبتك' : 'Permanent Digital Maintenance Ledger'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'وثّق سجل الصيانة الدوري، احتفظ برخصتك وتأمينك، وتابع مؤشر صحة المحرك والأنظمة الميكانيكية لحظة بلحظة.'
                : 'Maintain an immutable service history, track digital vehicle documents, and monitor multi-system telemetry.'}
            </p>
          </div>

          <button
            onClick={handleOpenGarage}
            className="btn-shimmer px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            {isAuthenticated ? (
              <>
                <Car className="w-4 h-4 text-white" />
                <span>{language === 'ar' ? 'دخول إلى كراجي الرقمي ←' : 'Open My Digital Garage →'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{language === 'ar' ? 'أنشئ حسابك وافتح كراجك الرقمي ←' : 'Open My Digital Garage →'}</span>
              </>
            )}
          </button>
        </div>

        {/* Cockpit Visual Demonstration Card (Clean White) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-6">
          {/* Sample Demo Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200/80">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {language === 'ar' ? 'نموذج تجريبي توضيحي' : 'Interactive Sample Demo'}
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-500 hidden sm:inline">
                {language === 'ar'
                  ? 'هكذا ستظهر بيانات مركبتك وسجلات صيانتها فور إنشاء حسابك'
                  : 'This is how your vehicle health and service records will look once registered'}
              </span>
            </div>

            {!isAuthenticated && (
              <button
                onClick={() => openAuthModal('signup')}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'أنشئ حسابك المجاني الآن' : 'Create Free Account to Activate'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Vehicle Photo & Spec Snapshot */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <img
                  src={primaryVehicle?.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'}
                  alt={primaryVehicle?.make}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-amber-300 font-mono font-bold block text-[10px]">
                      {language === 'ar' ? 'نموذج تجريبي لمركبة مسجلة' : 'Sample Registered Vehicle'}
                    </span>
                    <strong className="text-white text-base font-black">
                      {language === 'ar' ? (primaryVehicle?.makeAr || primaryVehicle?.make) : primaryVehicle?.make}{' '}
                      {language === 'ar' ? (primaryVehicle?.modelAr || primaryVehicle?.model) : primaryVehicle?.model}{' '}
                      ({primaryVehicle?.year})
                    </strong>
                  </div>
                  <span className="px-3 py-1 bg-white text-slate-900 font-black rounded-lg text-xs font-mono shadow-sm">
                    {language === 'ar' ? (primaryVehicle?.plateNumber || 'دبي أ 12345') : primaryVehicle?.plateNumber}
                  </span>
                </div>
              </div>

              {/* 3 Quick Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">
                    {language === 'ar' ? 'المسافة المقطوعة' : 'Odometer Mileage'}
                  </span>
                  <strong className="text-blue-700 font-mono font-bold">
                    {primaryVehicle?.mileage.toLocaleString()} {language === 'ar' ? 'كم' : 'km'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">
                    {language === 'ar' ? 'انتهاء الترخيص' : 'Mulkiya Expiry'}
                  </span>
                  <strong className="text-emerald-700 font-mono font-bold">2027/05</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">
                    {language === 'ar' ? 'التأمين الشامل' : 'Comprehensive Insurance'}
                  </span>
                  <strong className="text-blue-600 font-mono font-bold">
                    {language === 'ar' ? 'ساري وموثق' : 'Active & Verified'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Right: Circular Gauge + Subsystem Diagnostic Matrix */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* SVG Circular Health Meter (88%) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner text-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="text-slate-200"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="text-blue-600 transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 * (1 - 0.88)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black font-mono text-slate-900">88%</span>
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {language === 'ar' ? 'حالة ممتازة' : 'Excellent State'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 mt-2">
                    {language === 'ar' ? 'مؤشر الصحة العام للمركبة' : 'Overall Vehicle Health Score'}
                  </span>
                </div>

                {/* 6 Subsystem Diagnostics List */}
                <div className="sm:col-span-7 grid grid-cols-2 gap-2.5 text-xs">
                  {[
                    { labelAr: 'المحرك والبخاخات', labelEn: 'Engine & Fuel', statusAr: 'سليم 100%', statusEn: '100% Good', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { labelAr: 'منظومة الفرامل ABS', labelEn: 'Brake System', statusAr: 'سليم 95%', statusEn: '95% Good', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { labelAr: 'الجير وناقل الحركة', labelEn: 'Transmission', statusAr: 'سليم 100%', statusEn: '100% Good', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { labelAr: 'البطارية والشحن', labelEn: 'Battery & Alt', statusAr: 'سليم 90%', statusEn: '90% Good', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { labelAr: 'التكييف والفلتر', labelEn: 'AC & Cabin Air', statusAr: 'يوصى بالفحص', statusEn: 'Check Soon', color: 'text-amber-800 bg-amber-50 border-amber-200' },
                    { labelAr: 'ضغط وعمق الإطارات', labelEn: 'Tires & TPMS', statusAr: 'سليم 92%', statusEn: '92% Good', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-800 font-bold text-[11px]">{language === 'ar' ? item.labelAr : item.labelEn}</span>
                      <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border ${item.color}`}>
                        {language === 'ar' ? item.statusAr : item.statusEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Key Platform Value Props for Car Owners */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {language === 'ar' ? 'سجل صيانة دائم يزيد من قيمة المركبة عند البيع' : 'Immutable service ledger increases resale vehicle value'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {language === 'ar' ? 'تنبيهات تلقائية بمواعيد الزيوت والتراخيص' : 'Automatic maintenance and license renewal reminders'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {language === 'ar' ? 'فواتير وتقارير DVI معتمدة بصيغة PDF' : 'Certified DVI inspection reports and itemized PDF invoices'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
