import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  DollarSign,
  Heart,
  Clock,
  Users,
  Star,
  Building2,
  TrendingUp,
  Target,
  Eye,
  HelpCircle,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, setActiveTab, selectedCountry } = useApp();

  const statsHero = [
    { labelEn: 'Years in Business', labelAr: 'سنوات من الخبرة والريادة', value: '12+' },
    { labelEn: 'Happy Customers', labelAr: 'عميل يثقون بخدماتنا', value: '25,000+' },
    { labelEn: 'Average Rating', labelAr: 'متوسط تقييم رضا العملاء', value: '4.8 ★' },
    { labelEn: 'Support Available', labelAr: 'دعم فني وطوارئ على مدار الساعة', value: '24/7' },
  ];

  const problems = [
    {
      titleEn: 'Hard to Find Trusted Services',
      titleAr: 'صعوبة العثور على ورش موثوقة',
      descEn: 'Finding reliable workshops or technicians you can trust is time-consuming.',
      descAr: 'البحث عن كراجات وفنيين ذوي كفاءة وأمانة يستنزف الكثير من الوقت والجهد.',
      icon: HelpCircle,
    },
    {
      titleEn: 'Lack of Transparency',
      titleAr: 'غياب الشفافية في الأسعار',
      descEn: 'Unclear pricing, hidden costs, and inconsistent service quality.',
      descAr: 'أسعار غير معلنة، تكاليف خفية مفاجئة، وتفاوت غير مبرر في جودة القطع والخدمة.',
      icon: DollarSign,
    },
    {
      titleEn: 'Wasted Time & Effort',
      titleAr: 'إهدار الوقت والانتظار في الطوابير',
      descEn: 'Calling multiple garages and waiting in queues wastes your time.',
      descAr: 'الاتصال بالعديد من الورش والانتظار لساعات دون معرفة موعد التسليم الدقيق.',
      icon: Clock,
    },
    {
      titleEn: 'Fleet Management Challenges',
      titleAr: 'تحديات إدارة ومتابعة الأساطيل',
      descEn: 'Businesses struggle to track, manage, and optimize their vehicle operations.',
      descAr: 'صعوبة تتبع تكاليف الصيانة الدورية ومواعيد التراخيص لمركبات الشركات.',
      icon: Building2,
    },
  ];

  const impactStats = [
    { labelEn: 'Happy Customers', labelAr: 'عميل نشط وموثق', value: '12,482+' },
    { labelEn: 'Verified Providers', labelAr: 'ورشة ومركز صيانة معتمد', value: '1,250+' },
    { labelEn: 'Services Completed', labelAr: 'عملية صيانة وفحص ناجحة', value: '24,000+' },
    { labelEn: 'Average Rating', labelAr: 'متوسط التقييم العام', value: '4.9 ★' },
    { labelEn: 'Satisfaction Rate', labelAr: 'نسبة الرضا والضمان', value: '98%' },
    { labelEn: 'Support Available', labelAr: 'دعم متواصل 24/7', value: '24/7' },
  ];

  const leadership = [
    {
      nameEn: 'Omar A.',
      nameAr: 'عمر ع.',
      roleEn: 'Chief Executive Officer',
      roleAr: 'الرئيس التنفيذي (CEO)',
      cityEn: 'Ramallah, Palestine',
      cityAr: 'رام الله، فلسطين',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Lina M.',
      nameAr: 'لينا م.',
      roleEn: 'Chief Operating Officer',
      roleAr: 'مدير العمليات التشغيلية (COO)',
      cityEn: 'Al-Bireh, Palestine',
      cityAr: 'البيرة، فلسطين',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Yousef K.',
      nameAr: 'يوسف ك.',
      roleEn: 'Chief Technology Officer',
      roleAr: 'المدير التقني والبرمجة (CTO)',
      cityEn: 'Nablus, Palestine',
      cityAr: 'نابلس، فلسطين',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Mohammed A.S',
      nameAr: 'محمد ع.',
      roleEn: 'Head of Partnerships',
      roleAr: 'رئيس شبكة الشركاء والورش',
      cityEn: 'Ramallah, Palestine',
      cityAr: 'رام الله، فلسطين',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Tariq H.',
      nameAr: 'طارق ح.',
      roleEn: 'Head of Fleet & Business',
      roleAr: 'مدير قطاع الأساطيل والشركات',
      cityEn: 'Dubai, UAE',
      cityAr: 'دبي، الإمارات',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    },
  ];

  const values = [
    {
      titleEn: 'Trust & Integrity',
      titleAr: 'الأمانة والنزاهة',
      descEn: 'We build trust through complete honesty and transparent pricing.',
      descAr: 'نبني الثقة من خلال الشفافية المطلقة والوضوح في الأسعار والتشخيص.',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Customer First',
      titleAr: 'العميل أولاً دائماً',
      descEn: 'We put our customers’ needs and peace of mind at the heart of everything.',
      descAr: 'نضع راحة بال العميل وسلامة مركبته في صدارة أولوياتنا في كل قرار.',
      icon: Heart,
    },
    {
      titleEn: 'Excellence & Quality',
      titleAr: 'الجودة والتميز',
      descEn: 'We strive for the highest standards in every service we enable.',
      descAr: 'نلتزم بأعلى معايير الجودة والضمان المعتمد لكافة أعمال الصيانة والقطع.',
      icon: Award,
    },
    {
      titleEn: 'Innovation',
      titleAr: 'الابتكار والرقمنة',
      descEn: 'We embrace technology to create smarter, simpler automotive solutions.',
      descAr: 'نوظف أحدث التقنيات لتبسيط فحص وصيانة السيارات وحجز المواعيد إلكترونياً.',
      icon: Sparkles,
    },
    {
      titleEn: 'Partnership',
      titleAr: 'الشراكة والنمو المشترك',
      descEn: 'We grow together with our verified workshops and community.',
      descAr: 'ننمو مع شركائنا من الورش المعتمدة ونساعدهم على تقديم أفضل تجربة للمستهلك.',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs text-amber-400 font-black uppercase tracking-wider block">
              {language === 'ar' ? 'من نحن • منصة أهل المركبات' : 'ABOUT US'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'ar' ? 'مركبتك في أيدٍ أمينة وخبرة موثوقة' : 'Your Vehicle, In Expert Hands.'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'أهل المركبات هي المنصة الرقمية الرائدة لخدمات السيارات، تربط أصحاب المركبات بأفضل الورش ومراكز الصيانة المعتمدة لتقديم تجربة صيانة مريحة، شفافة، وبأعلى معايير الجودة والضمان.'
                : "AHL AL MARKABAT is Palestine's leading digital platform for automotive services, connecting vehicle owners with trusted providers for reliable, transparent, and convenient car care."}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                {language === 'ar' ? 'شبكة ورش موثوقة' : 'Trusted Network'}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                {language === 'ar' ? 'فنيون وخبراء معتمدون' : 'Verified Experts'}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-blue-400" />
                {language === 'ar' ? 'أسعار شفافة وبدون مفاجآت' : 'Transparent Pricing'}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                {language === 'ar' ? 'العميل محور اهتمامنا' : 'Customer First'}
              </span>
            </div>
          </div>

          {/* 4 Stats Cards */}
          <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {statsHero.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <strong className="text-2xl sm:text-3xl font-black text-white font-mono block">
                  {s.value}
                </strong>
                <span className="text-xs text-slate-400 font-bold">
                  {language === 'ar' ? s.labelAr : s.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Mission & Vision */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <strong className="text-lg font-black text-slate-900 block">
            {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
          </strong>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {language === 'ar'
              ? 'تبسيط وتسهيل العناية بالمركبات من خلال بناء منظومة رقمية ذكية وموثوقة توفر الوقت والمال وتمنح أصحاب السيارات راحة البال التامة أينما كانوا.'
              : 'To simplify car care by building a smart, reliable, and transparent automotive ecosystem that saves time, reduces costs, and delivers peace of mind to vehicle owners across Palestine and the region.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <strong className="text-lg font-black text-slate-900 block">
            {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
          </strong>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {language === 'ar'
              ? 'أن نكون المنصة الرقمية الأكثر موثوقية وتميزاً لخدمات وصيانة وقطع غيار السيارات في الشرق الأوسط، بتمكين الأفراد والشركات بأحدث الحلول التقنية.'
              : 'To become the most trusted automotive platform in the region—empowering people and businesses with innovative digital technology, vetted partnerships, and service excellence.'}
          </p>
        </div>
      </div>

      {/* 3. The Problem We Solve */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'المشاكل والتحديات التي نحلها' : 'The Problem We Solve'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'نجمع كافة خدمات واحتياجات المركبات في منصة ذكية وموحدة لتبحث وتحجز وتدير صيانة سيارتك بكل ثقة.'
              : 'We bring everything together in one platform—so you can find, book, and manage car services with confidence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-2 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <strong className="text-xs font-black text-slate-900 block">
                  {language === 'ar' ? p.titleAr : p.titleEn}
                </strong>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {language === 'ar' ? p.descAr : p.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Our Impact So Far */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
          <h2 className="text-xl font-black text-slate-900 text-center">
            {language === 'ar' ? 'أثرنا وإنجازاتنا بالأرقام' : 'Our Impact So Far'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {impactStats.map((im, idx) => (
              <div key={idx} className="space-y-1">
                <strong className="text-2xl font-black text-slate-900 font-mono block">
                  {im.value}
                </strong>
                <span className="text-[10px] text-slate-500 font-bold">
                  {language === 'ar' ? im.labelAr : im.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Our Leadership */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'فريق القيادة والإدارة' : 'Our Leadership'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'خبراء وكفاءات متخصصة شغوفة بإحداث ثورة رقمية وتطوير قطاع خدمات السيارات في الوطن العربي.'
              : 'Experienced professionals passionate about revolutionizing the automotive experience.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {leadership.map((l, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 text-center">
              <img src={l.avatar} alt={l.nameEn} className="w-16 h-16 rounded-full mx-auto object-cover border border-slate-200" />
              <div>
                <strong className="text-xs font-black text-slate-900 block">
                  {language === 'ar' ? l.nameAr : l.nameEn}
                </strong>
                <span className="text-[10px] text-blue-600 font-bold block">
                  {language === 'ar' ? l.roleAr : l.roleEn}
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  {language === 'ar' ? l.cityAr : l.cityEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Our Values */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
          <h2 className="text-xl font-black text-slate-900 text-center">
            {language === 'ar' ? 'قيمنا ومبادئنا الجوهرية' : 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">
                    {language === 'ar' ? v.titleAr : v.titleEn}
                  </strong>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    {language === 'ar' ? v.descAr : v.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
