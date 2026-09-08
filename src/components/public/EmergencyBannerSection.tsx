import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  Truck,
  BatteryCharging,
  Disc,
  Fuel,
  Key,
  Wrench,
  Radio,
  PhoneCall,
  Clock,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export const EmergencyBannerSection: React.FC = () => {
  const { language, setIsSOSModalOpen, selectedCountry } = useApp();

  const hotline =
    selectedCountry?.code === 'SA'
      ? '+966 50 123 4567'
      : selectedCountry?.code === 'AE'
      ? '+971 50 123 4567'
      : selectedCountry?.code === 'JO'
      ? '+962 79 123 4567'
      : selectedCountry?.code === 'QA'
      ? '+974 55 123 456'
      : selectedCountry?.code === 'EG'
      ? '+20 10 1234 5678'
      : '+970 59 123 4567';

  const countryName =
    language === 'ar'
      ? (selectedCountry?.nameAr || 'فلسطين')
      : (selectedCountry?.nameEn || 'Palestine');

  return (
    <section className="py-12 bg-white text-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Navy Emergency Pill Banner */}
        <div className="bg-[#0B1528] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-8 h-8 text-red-500 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>24/7 {language === 'ar' ? 'طوارئ ونش وإنقاذ' : 'Emergency Roadside SOS'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === 'ar' ? 'خدمة طوارئ وإنقاذ الطرق على مدار 24 ساعة' : 'Emergency Roadside Assistance'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'ar'
                  ? `عالق على الطريق؟ أقرب ونش وفني إنقاذ عندك خلال دقائق في كافة محافظات وطرق ${countryName}.`
                  : `Stuck somewhere? We’re just a call away with instant GPS dispatch across ${countryName}.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSOSModalOpen(true)}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>{language === 'ar' ? `طلب طوارئ ${hotline}` : `Call Emergency ${hotline}`}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
