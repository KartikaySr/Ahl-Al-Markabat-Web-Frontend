import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import {
  ShieldCheck,
  Award,
  PhoneCall,
  Clock,
  MapPin,
  Car,
  Sparkles,
  ArrowRight,
  Smartphone,
  CheckCircle2,
  Mail,
  Send,
  MessageCircle,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Lock,
  CreditCard,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, selectedCountry, setIsQuoteModalOpen, setIsSOSModalOpen, setActiveTab, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0B1528] text-slate-300 border-t border-slate-800 text-xs relative overflow-hidden">
      {/* 4 Trust Highlights Ribbon */}
      <div className="border-b border-slate-800/80 bg-[#070E1B] py-6 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1700px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'ar' ? '100% ورش وفنيين معتمدين' : '100% Verified Specialists'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {language === 'ar' ? 'تدقيق وفحص التراخيص المهنية' : 'KYC verified credentials'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'ar' ? 'ضمان الجودة وقطع أصلية' : 'Quality & OEM Warranty'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {language === 'ar' ? 'ضمان معتمد حتى 12 شهراً' : 'Warranties up to 12 months'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-900/40 border border-red-700/60 flex items-center justify-center text-red-400 shrink-0">
              <PhoneCall className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'ar' ? 'طوارئ ونش وإنقاذ 24/7' : '24/7 Roadside Assistance'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {language === 'ar' ? 'استجابة فورية وتتبع GPS حي' : 'Immediate roadside GPS dispatch'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-900/40 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0">
              <Car className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">
                {language === 'ar' ? 'كراج رقمي متكامل' : 'Permanent Digital Garage'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {language === 'ar' ? 'سجل صيانة دائم وفواتير PDF' : 'Immutable service ledger'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" variant="dark" mode="night" />
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              {language === 'ar'
                ? 'أهل المركبات هي المنظومة الرقمية الشاملة لخدمات وصيانة المركبات في فلسطين والعالم العربي. نربط مالكي المركبات بأفضل الورش ومراكز الصيانة المعتمدة بكل شفافية واحترافية.'
                : 'The leading automotive services platform in Palestine & the Arab world. Your vehicle, in expert hands.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1 text-slate-400">
              <button
                onClick={() => showToast('Opening Ahl Al Markabat on Facebook...', 'info')}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening Ahl Al Markabat on Instagram...', 'info')}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening Ahl Al Markabat on LinkedIn...', 'info')}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening Ahl Al Markabat YouTube Channel...', 'info')}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ar' ? 'الخدمات' : 'Services'}
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'كافة الخدمات (21 تخصص)' : 'All Services'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'الصيانة الدورية والزيوت' : 'Maintenance'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'فحص وبرمجة كمبيوتر' : 'Diagnostics & ECU'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'ميكانيك ومحركات' : 'Repairs & Overhaul'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'إطارات وميزان ليزري' : 'Tires & Wheels'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'سوق قطع الغيار' : 'Spare Parts'}
                </button>
              </li>
            </ul>
          </div>

          {/* For Customers Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ar' ? 'للعملاء' : 'For Customers'}
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('customer')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'كراجي الرقمي' : 'My Garage'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('providers')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'البحث عن ورشة معتمدة' : 'Find Providers'}
                </button>
              </li>
              <li>
                <button onClick={() => setIsQuoteModalOpen(true)} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'طلب عرض سعر فوري' : 'Request a Quote'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bookings')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'تتبع الحجوزات والصيانة' : 'Bookings & Tracking'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('help')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'مركز الأسئلة والمساعدة' : 'FAQ & Support'}
                </button>
              </li>
            </ul>
          </div>

          {/* For Providers Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ar' ? 'للمزودين والورش' : 'For Providers'}
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => setActiveTab('become-provider')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'انضم كمزود خدمة معتمد' : 'Join as Provider'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('workshop')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'لوحة تحكم الورشة SaaS' : 'Provider Dashboard'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('workshop')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'إدارة أوامر العمل والمخزون' : 'Jobs & Inventory'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'باقات الاشتراك للورش' : 'Provider Plans'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition-colors">
                  {language === 'ar' ? 'لوحة إدارة الفروع' : 'Multi-Branch Admin'}
                </button>
              </li>
            </ul>
          </div>

          {/* Subscribe to Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ar' ? 'النشرة البريدية' : 'Subscribe to Newsletter'}
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'ar'
                ? 'اشترك ليصلك أحدث العروض الحصرية ونصائح الصيانة الدورية لمركبتك.'
                : 'Get the latest updates, maintenance guides, and exclusive offers.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:border-amber-400 outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md"
              >
                {isSubscribed
                  ? (language === 'ar' ? '✓ تم الاشتراك بنجاح!' : '✓ Subscribed!')
                  : (language === 'ar' ? 'اشتراك' : 'Subscribe')}
              </button>
            </form>

            <div className="pt-2 space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-white font-bold">+970 59 123 4567</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@ahlalmarkabat.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Location & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-semibold">
              {language === 'ar' ? 'فلسطين (رام الله، القدس، نابلس، الخليل)' : "We're in Palestine (Ramallah, Jerusalem, Nablus, Hebron)"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-300">
              {language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-300">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <span className="text-amber-400 font-bold">
              {language === 'ar' ? 'صُنع بـ ❤️ في فلسطين' : 'Made with ❤️ in Palestine'}
            </span>
          </div>

          <div>
            <span>© 2025 AHL AL MARKABAT. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
