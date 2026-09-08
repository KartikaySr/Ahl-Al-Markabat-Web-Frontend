import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export const FeaturedProvidersSection: React.FC = () => {
  const {
    language,
    t,
    providers,
    setSelectedProviderModal,
    setActiveTab,
    selectedCountry,
  } = useApp();

  const featured = providers.slice(0, 4);

  return (
    <section className="py-16 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {language === 'ar' ? 'الورش ومراكز الصيانة المعتمدة القريبة منك' : 'Verified Providers Near You'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {language === 'ar'
                ? 'مراكز صيانة وفنيون معتمدون خضعوا للتدقيق الميداني ومعايير الجودة المعتمدة.'
                : 'Top-rated, KYC-audited automotive workshops across all verified service regions.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('providers')}
            className="text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>{language === 'ar' ? 'استعراض كافة الورش (الدليل والخريطة) ←' : 'View all providers →'}</span>
          </button>
        </div>

        {/* Featured Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((provider) => (
            <div
              key={provider.id}
              onClick={() => setSelectedProviderModal(provider)}
              className="card-hover-lift bg-white rounded-3xl border border-slate-200 hover:border-blue-400 overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Workshop Facility Photo */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.businessNameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Verified Badge */}
                  <div className="absolute top-3 start-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>{language === 'ar' ? 'معتمد' : 'Verified'}</span>
                  </div>

                  {/* Open Now Pill */}
                  <div className="absolute top-3 end-3 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                    {language === 'ar' ? 'مفتوح الآن' : 'Open Now'}
                  </div>

                  {/* Distance info */}
                  <div className="absolute bottom-2.5 start-3 flex items-center gap-1 text-[11px] text-white font-semibold bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{language === 'ar' ? provider.cityAr : provider.cityEn}</span>
                    <span>•</span>
                    <span className="text-amber-300 font-mono font-bold">{provider.distanceKm} km</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {language === 'ar' ? provider.businessNameAr : provider.businessNameEn}
                    </h3>
                  </div>

                  {/* Rating row */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{provider.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-400">({provider.reviewCount} {language === 'ar' ? 'تقييم' : 'reviews'})</span>
                  </div>

                  {/* Specialties Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {provider.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-[11px] font-medium text-slate-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProviderModal(provider);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#0B1528] hover:bg-blue-900 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  <span>{language === 'ar' ? 'عرض الملف' : 'View Profile'}</span>
                </button>

                <a
                  href={`tel:${provider.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-colors border border-slate-200"
                  title="Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
