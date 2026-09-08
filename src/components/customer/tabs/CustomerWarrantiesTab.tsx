import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Wrench,
  Package,
  AlertCircle,
  FileCheck,
  ExternalLink,
  Calendar,
} from 'lucide-react';

export const CustomerWarrantiesTab: React.FC = () => {
  const { language, setCustomerActiveTab, showToast } = useApp();

  const warranties = [
    {
      id: 'w-1',
      itemEn: 'Bosch S5 AGM High-Performance Battery (70Ah)',
      itemAr: 'بطارية بوش S5 AGM عالية الأداء (70 أمبير)',
      type: 'parts',
      warrantyPeriodEn: '24 Months Replacement',
      warrantyPeriodAr: '24 شهراً استبدال فوري',
      issuedOn: '2024-01-18',
      expiresOn: '2026-01-18',
      remainingEn: '18 Months Remaining',
      remainingAr: 'متبقي 18 شهراً',
      coverageStatusEn: 'Active & Protected',
      coverageStatusAr: 'ساري ومحمي رسمياً',
      workshopEn: 'Rapid Fix Mobile Care',
      workshopAr: 'مركز رابيد فيكس للصيانة المتنقلة',
      invoiceNumber: 'INV-2024-002',
      badgeEn: 'Full Replacement Guarantee',
      badgeAr: 'ضمان استبدال شامل',
    },
    {
      id: 'w-2',
      itemEn: 'OEM Ceramic Front Brake Pad Set & Rotor Resurfacing',
      itemAr: 'طقم فحمات فرامل سيراميك وكالة OEM + خرط هوبات ليزر',
      type: 'parts_and_labor',
      warrantyPeriodEn: '12 Months / 20,000 km',
      warrantyPeriodAr: '12 شهراً أو 20,000 كم',
      issuedOn: '2024-08-14',
      expiresOn: '2025-08-14',
      remainingEn: '14,200 km / 4 Months Remaining',
      remainingAr: 'متبقي 14,200 كم أو 4 أشهر',
      coverageStatusEn: 'Active & Protected',
      coverageStatusAr: 'ساري ومحمي رسمياً',
      workshopEn: 'AutoTech Premier Garage',
      workshopAr: 'مركز أوتو تك بريميير للصيانة',
      invoiceNumber: 'INV-2024-001',
      badgeEn: 'Parts + Labor Covered',
      badgeAr: 'شامل القطع وأجور اليد',
    },
    {
      id: 'w-3',
      itemEn: 'AC Compressor Replacement & R134a Re-Gas',
      itemAr: 'استبدال كمبروسر المكيف وشحن فريون أصلي R134a',
      type: 'labor',
      warrantyPeriodEn: '12 Months Unlimited Mileage',
      warrantyPeriodAr: '12 شهراً مفتوح الكيلومترات',
      issuedOn: '2024-05-02',
      expiresOn: '2025-05-02',
      remainingEn: '9 Months Remaining',
      remainingAr: 'متبقي 9 أشهر',
      coverageStatusEn: 'Active & Protected',
      coverageStatusAr: 'ساري ومحمي رسمياً',
      workshopEn: 'German Tech Center',
      workshopAr: 'المركز الألماني المتخصص (بي إم دبليو ومرسيدس)',
      invoiceNumber: 'INV-2024-003',
      badgeEn: 'Workshop Verified',
      badgeAr: 'موثق من المركز',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{' '}
              {language === 'ar' ? 'درع حماية الضمانات المعتمد' : 'Platform Warranty Shield'}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {language === 'ar' ? 'مضمون وموثق 100%' : '100% Guaranteed'}
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            {language === 'ar' ? 'الضمانات والكفالات النشطة لمركباتك' : 'Active Warranties & Parts Guarantees'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'كل إصلاح وقطعة غيار معتمدة تم شراؤها عبر منصة أهل المركبات تشمل شهادة ضمان رقمية مربوطة بجواز سفر سيارتك.'
              : 'Every verified repair and spare part purchased via Ahl Al Markabat includes traceable digital warranty certificates.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {language === 'ar'
              ? '3 ضمانات سارية تحمي وتغطي مركبتك حالياً'
              : '3 Active Warranties Protecting Your Vehicle'}
          </span>
        </div>
      </div>

      {/* 2. Active Warranty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warranties.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" /> {language === 'ar' ? w.remainingAr : w.remainingEn}
                </span>
              </div>

              <div>
                <strong className="text-sm font-black text-slate-900 block leading-snug">
                  {language === 'ar' ? w.itemAr : w.itemEn}
                </strong>
                <span className="text-[10px] text-slate-400 font-bold block mt-1 font-mono">
                  {language === 'ar' ? `رقم الفاتورة: ${w.invoiceNumber}` : `Invoice: ${w.invoiceNumber}`}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{language === 'ar' ? 'مدة الضمان:' : 'Warranty Term:'}</span>
                  <strong className="text-slate-800 font-mono font-bold">
                    {language === 'ar' ? w.warrantyPeriodAr : w.warrantyPeriodEn}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{language === 'ar' ? 'المركز المنفذ:' : 'Serviced By:'}</span>
                  <strong className="text-blue-600 font-bold">
                    {language === 'ar' ? w.workshopAr : w.workshopEn}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{language === 'ar' ? 'صالح لغاية:' : 'Valid Until:'}</span>
                  <strong className="text-slate-800 font-mono font-bold">{w.expiresOn}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  showToast(
                    language === 'ar'
                      ? `جاري فتح مطالبة الضمان لـ: ${w.itemAr}...`
                      : `Opening warranty service claim for ${w.itemEn}...`,
                    'info'
                  );
                  setCustomerActiveTab('bookings');
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'المطالبة بالضمان / حجز موعد فحص' : 'Claim Warranty / Book Check'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
