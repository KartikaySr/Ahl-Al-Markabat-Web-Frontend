import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SHARED_PARTS_CATALOG } from '../../data/partsCatalog';
import {
  Search,
  Filter,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Car,
  Star,
  ArrowRight,
  Package,
  Wrench,
  Tag,
  Truck,
  RotateCcw,
  CreditCard,
  ChevronDown,
  PhoneCall,
  SlidersHorizontal,
  Flame,
  Zap,
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { language, formatPrice, setActiveTab, showToast, selectedCountry, cart, addToCart } = useApp();
  const [searchMethod, setSearchMethod] = useState<'vehicle' | 'name' | 'partNumber'>('vehicle');
  const [selectedMake, setSelectedMake] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('RAV4');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Parts', nameAr: 'كافة القطع' },
    { id: 'brakes', nameEn: 'Brake Systems & Rotors', nameAr: 'أنظمة الفرامل والأقراص' },
    { id: 'filters', nameEn: 'Filters & Oils', nameAr: 'الفلاتر والزيوت' },
    { id: 'electrical', nameEn: 'Electrical & Batteries', nameAr: 'الكهرباء والبطاريات' },
    { id: 'suspension', nameEn: 'Suspension & Shocks', nameAr: 'المساعدين والتعليق' },
    { id: 'ignition', nameEn: 'Spark Plugs & Ignition', nameAr: 'البواجي ونظام الإشعال' },
    { id: 'cooling', nameEn: 'Cooling & AC', nameAr: 'التبريد والمكيف' },
    { id: 'engine', nameEn: 'Engine & Belts', nameAr: 'المحرك والسيور' },
  ];

  const products = SHARED_PARTS_CATALOG;

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const featuredSellers = [
    {
      nameEn: 'AutoTech Premier Parts',
      nameAr: 'مركز أوتو تك للقطع المعتمدة',
      rating: 4.9,
      ordersEn: '1,248 Orders',
      ordersAr: '1,248 طلب منجز',
      satisfactionEn: '98% Positive',
      satisfactionAr: '98% تقييم إيجابي',
      image: '/images/garage_autotech.jpg',
    },
    {
      nameEn: 'Rapid Fix Parts Hub',
      nameAr: 'مركز رابيد فيكس للقطع السريعة',
      rating: 4.8,
      ordersEn: '980 Orders',
      ordersAr: '980 طلب منجز',
      satisfactionEn: '97% Positive',
      satisfactionAr: '97% تقييم إيجابي',
      image: '/images/garage_rapidfix.jpg',
    },
    {
      nameEn: 'PalAuto Original Parts',
      nameAr: 'مركز بال أوتو للقطع الأصلية',
      rating: 4.7,
      ordersEn: '765 Orders',
      ordersAr: '765 طلب منجز',
      satisfactionEn: '96% Positive',
      satisfactionAr: '96% تقييم إيجابي',
      image: '/images/garage_palauto.jpg',
    },
    {
      nameEn: 'German Auto Parts Center',
      nameAr: 'المركز الألماني لقطع الغيار الفارهة',
      rating: 4.7,
      ordersEn: '620 Orders',
      ordersAr: '620 طلب منجز',
      satisfactionEn: '95% Positive',
      satisfactionAr: '95% تقييم إيجابي',
      image: '/images/categories/body_paint.jpg',
    },
  ];

  const brands = ['BOSCH', 'NGK', 'DENSO', 'MANN FILTER', 'TRW', 'GATES', 'SKF', 'VALEO', 'ACDELCO'];

  const faqs = [
    {
      qEn: 'How do I find the right part for my vehicle?',
      qAr: 'كيف أتأكد من توافق القطعة بدقة مع سيارتي؟',
      aEn: 'Use our Search by Vehicle selector above to filter products matching your exact make, model, year, and engine specification.',
      aAr: 'استخدم أداة البحث حسب نوع المركبة والموديل وسنة الصنع أو رقم الهيكل (VIN) لضمان مطابقة القطعة 100% دون أي خطأ.',
    },
    {
      qEn: 'Are the parts genuine and authentic?',
      qAr: 'هل القطع المعروضة أصلية ومضمونة؟',
      aEn: 'All parts are 100% authentic OEM or certified tier-1 aftermarket sourced directly from authorized distributors.',
      aAr: 'جميع القطع أصلية وكالة (OEM) أو من شركات تصنيع عالمية درجة أولى معتمدة ومرفقة بشهادات الضمان الرسمية.',
    },
    {
      qEn: 'Can I return a part if it does not fit?',
      qAr: 'هل يمكنني إرجاع القطعة في حال عدم مطابقتها؟',
      aEn: 'Yes! We offer a 14-day hassle-free return policy if the part remains unused and in original packaging.',
      aAr: 'نعم! نوفر سياسة إرجاع واستبدال مرنة خلال 14 يوماً بشرط بقاء القطعة في غلافها الأصلي غير مستخدمة.',
    },
    {
      qEn: 'How long does delivery take across the region?',
      qAr: 'كم يستغرق شحن وتوصيل القطع؟',
      aEn: 'Delivery takes 24 to 48 hours directly to your doorstep across major cities.',
      aAr: 'يستغرق التوصيل السريع بين 24 إلى 48 ساعة لباب منزلك أو للورشة التي تختارها في كافة المحافظات والمناطق.',
    },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      partNum: product.partNum,
      price: product.price,
      image: product.image,
      sellerEn: product.sellerEn,
      sellerAr: product.sellerAr,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. Header Banner */}
      <div className="bg-[#0B1528] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1700px] mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              {language === 'ar' ? 'سوق قطع الغيار المعتمدة' : 'PARTS MARKETPLACE'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">
              {language === 'ar' ? 'متجر قطع الغيار' : 'Spare Parts'}{' '}
              <span className="text-amber-400">{language === 'ar' ? 'المضمونة' : 'Marketplace'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {language === 'ar'
                ? 'قطع أصلية وكالة (OEM)، درجة أولى، ومستعملة مفحوصة. اعثر على القطعة المطابقة لسيارتك بأفضل سعر وضمان.'
                : 'Genuine, Aftermarket, Used. All in one place. Find the right parts at the best prices from trusted sellers across Palestine.'}
            </p>
          </div>

          {/* Search by Vehicle Widget */}
          <div className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 text-slate-900 space-y-4">
            <div className="flex items-center gap-4 text-xs font-bold border-b border-slate-100 pb-3">
              <button
                onClick={() => setSearchMethod('vehicle')}
                className={`flex items-center gap-1.5 pb-1 transition-all ${
                  searchMethod === 'vehicle' ? 'text-blue-600 border-b-2 border-blue-600 font-black' : 'text-slate-500'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>{language === 'ar' ? 'بحث حسب المركبة' : 'Search by Vehicle'}</span>
              </button>
              <button
                onClick={() => setSearchMethod('name')}
                className={`flex items-center gap-1.5 pb-1 transition-all ${
                  searchMethod === 'name' ? 'text-blue-600 border-b-2 border-blue-600 font-black' : 'text-slate-500'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>{language === 'ar' ? 'بحث باسم القطعة' : 'Search by Part Name'}</span>
              </button>
              <button
                onClick={() => setSearchMethod('partNumber')}
                className={`flex items-center gap-1.5 pb-1 transition-all ${
                  searchMethod === 'partNumber' ? 'text-blue-600 border-b-2 border-blue-600 font-black' : 'text-slate-500'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>{language === 'ar' ? 'بحث برقم القطعة OEM' : 'Search by Part Number'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-600"
              >
                <option value="Toyota">{language === 'ar' ? 'تويوتا (Toyota)' : 'Toyota'}</option>
                <option value="Hyundai">{language === 'ar' ? 'هيونداي (Hyundai)' : 'Hyundai'}</option>
                <option value="Kia">{language === 'ar' ? 'كيا (Kia)' : 'Kia'}</option>
                <option value="Mercedes-Benz">{language === 'ar' ? 'مرسيدس-بنز (Mercedes-Benz)' : 'Mercedes-Benz'}</option>
                <option value="BMW">{language === 'ar' ? 'بي إم دبليو (BMW)' : 'BMW'}</option>
              </select>

              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-600"
              >
                <option value="RAV4">{language === 'ar' ? 'راف فور (RAV4)' : 'RAV4'}</option>
                <option value="Camry">{language === 'ar' ? 'كامري (Camry)' : 'Camry'}</option>
                <option value="Corolla">{language === 'ar' ? 'كورولا (Corolla)' : 'Corolla'}</option>
                <option value="Elantra">{language === 'ar' ? 'إلنترا (Elantra)' : 'Elantra'}</option>
                <option value="Tucson">{language === 'ar' ? 'توسان (Tucson)' : 'Tucson'}</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-600"
              >
                {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-600">
                <option>{language === 'ar' ? 'كافة تصنيفات القطع' : 'All Part Categories'}</option>
                <option>{language === 'ar' ? 'قطع المحرك والفلاتر' : 'Engine Parts & Filters'}</option>
                <option>{language === 'ar' ? 'فحمات وهوبات الفرامل' : 'Brake Pads & Rotors'}</option>
                <option>{language === 'ar' ? 'المساعدين ونظام التوجيه' : 'Suspension & Steering'}</option>
                <option>{language === 'ar' ? 'البطاريات والكهرباء' : 'Electrical & Batteries'}</option>
              </select>

              <button
                onClick={() =>
                  showToast(
                    language === 'ar'
                      ? `تم تصفية القطع المتوافقة لمركبة ${selectedMake} ${selectedModel} ${selectedYear}!`
                      : `Filtered catalog for ${selectedMake} ${selectedModel} ${selectedYear}!`,
                    'success'
                  )
                }
                className="py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'ar' ? 'بحث عن القطع' : 'Search Parts'}</span>
              </button>
            </div>
          </div>

          {/* 5 Value Pillars Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs text-slate-300 pt-2 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'قطع أصلية ومضمونة 100%' : '100% Authentic Parts'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'أفضل الأسعار والعروض' : 'Best Prices & Deals'}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'إرجاع سهل خلال 14 يوماً' : 'Easy 14-Day Returns'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'توصيل سريع لكافة المناطق' : 'Fast Delivery'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'دفع إلكتروني أو عند الاستلام' : 'Secure Payments & COD'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 space-y-12">
        {/* 2. Category Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-black shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            );
          })}
        </div>

        {/* 3. Catalog Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <strong className="text-sm font-black text-slate-950 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? 'تصفية النتائج' : 'Filters'}</span>
                </strong>
                <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800">
                  {language === 'ar' ? 'إعادة ضبط' : 'Clear All'}
                </button>
              </div>

              {/* Part Type Filter */}
              <div className="space-y-2 text-xs">
                <span className="text-xs font-bold text-slate-700 block">
                  {language === 'ar' ? 'نوع القطعة' : 'Part Type'}
                </span>
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>{language === 'ar' ? 'أصلي وكالة OEM' : 'OEM / Genuine'}</span>
                </label>
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>{language === 'ar' ? 'درجة أولى Aftermarket' : 'Aftermarket Tier-1'}</span>
                </label>
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>{language === 'ar' ? 'مستعمل مفحوص مع الضمان' : 'Used / Reconditioned'}</span>
                </label>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <span className="text-xs font-bold text-slate-700 block">
                  {language === 'ar' ? 'الماركة المصنعة' : 'Brand'}
                </span>
                {['Bosch', 'NGK', 'Denso', 'Mann-Filter', 'SKF'].map((b, i) => (
                  <label key={i} className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 2} className="rounded text-blue-600" />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>
                {language === 'ar' ? `عرض ${filteredProducts.length} من أصل 12 قطعة معتمدة` : `Showing 1 – ${filteredProducts.length} of 12 verified parts`}
              </span>
              <div className="flex items-center gap-2">
                <span>{language === 'ar' ? 'الترتيب:' : 'Sort by:'}</span>
                <select className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none text-slate-900">
                  <option>{language === 'ar' ? 'الأكثر ملاءمة' : 'Most Relevant'}</option>
                  <option>{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                  <option>{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                  <option>{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200 hover:border-blue-400 shadow-2xs space-y-3 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-2">
                    <div
                      onClick={() => setActiveTab('product-detail')}
                      className="relative rounded-2xl overflow-hidden aspect-square bg-slate-50 border border-slate-200 p-2 flex items-center justify-center cursor-pointer"
                    >
                      <img src={p.image || p.img} alt={p.nameEn} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform" />
                      {(language === 'ar' ? p.badgeAr : p.badgeEn) && (
                        <span className={`absolute top-2 start-2 px-2 py-0.5 rounded-full text-[9px] font-bold shadow-sm ${p.badgeColor}`}>
                          {language === 'ar' ? p.badgeAr : p.badgeEn}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block font-bold">{p.partNum}</span>
                      <h4
                        onClick={() => setActiveTab('product-detail')}
                        className="text-xs font-black text-slate-950 group-hover:text-blue-600 cursor-pointer line-clamp-1"
                      >
                        {language === 'ar' ? p.nameAr : p.nameEn}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {language === 'ar' ? p.fitmentAr : p.fitmentEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-amber-500 font-bold">{p.rating} ★</span>
                      <span className="text-slate-400">({p.reviews})</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold text-[10px]">
                        {language === 'ar' ? 'متوفر بالمخزون' : 'In Stock'}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      {language === 'ar' ? 'البائع:' : 'Sold by'}{' '}
                      <strong className="text-slate-700">{language === 'ar' ? p.sellerAr : p.sellerEn}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <strong className="text-base font-black text-slate-900 font-mono">{formatPrice(p.price)}</strong>
                      {p.oldPrice > 0 && (
                        <span className="text-xs text-slate-400 line-through font-mono">{formatPrice(p.oldPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* 4. Featured Sellers & Brand Logos */}
        <div className="space-y-6">
          <h3 className="text-base font-black text-slate-950">
            {language === 'ar' ? 'أبرز بائعي القطع المعتمدين والموثقين' : 'Featured Certified Parts Sellers'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSellers.map((s, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs flex items-center gap-4">
                <img src={s.image} alt={s.nameEn} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0" />
                <div className="space-y-0.5">
                  <strong className="text-xs font-black text-slate-900 block">
                    {language === 'ar' ? s.nameAr : s.nameEn}
                  </strong>
                  <span className="text-xs text-amber-500 font-bold">{s.rating} ★</span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {language === 'ar' ? s.ordersAr : s.ordersEn} • {language === 'ar' ? s.satisfactionAr : s.satisfactionEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 border-y border-slate-200 text-slate-400 font-black text-sm sm:text-base font-mono">
            {brands.map((b, i) => (
              <span key={i} className="hover:text-blue-600 transition-colors cursor-pointer">{b}</span>
            ))}
          </div>
        </div>

        {/* 5. Mega Deals 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B1528] rounded-3xl p-6 text-white border border-slate-800 space-y-3 shadow-md">
            <span className="text-[10px] text-amber-400 font-black uppercase">
              {language === 'ar' ? 'عرض خاص' : 'MEGA DEAL'}
            </span>
            <h4 className="text-lg font-black">
              {language === 'ar' ? 'خصم يصل حتى 30%' : 'Up to 30% OFF'}
            </h4>
            <p className="text-xs text-slate-300">
              {language === 'ar' ? 'على قطع المحرك والفلاتر الأصلية المختارة' : 'On Selected Engine Parts & Filters'}
            </p>
            <button className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl">
              {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
            </button>
          </div>

          <div className="bg-blue-900 rounded-3xl p-6 text-white border border-blue-800 space-y-3 shadow-md">
            <span className="text-[10px] text-amber-300 font-black uppercase">
              {language === 'ar' ? 'شحن مجاني' : 'FREE DELIVERY'}
            </span>
            <h4 className="text-lg font-black">
              {language === 'ar' ? `توصيل مجاني للطلبات فوق ${formatPrice(200)}` : 'Free Shipping on Orders'}
            </h4>
            <p className="text-xs text-blue-100">
              {language === 'ar' ? 'توصيل سريع لباب منزلك أو ورشة الصيانة' : 'Fast delivery to your home or garage'}
            </p>
            <button className="px-4 py-2 bg-white text-blue-950 font-black text-xs rounded-xl">
              {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
            </button>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-700 space-y-3 shadow-md">
            <span className="text-[10px] text-emerald-400 font-black uppercase">
              {language === 'ar' ? 'ضمان أفضل سعر' : 'BEST PRICE'}
            </span>
            <h4 className="text-lg font-black">
              {language === 'ar' ? 'ضمان مطابقة الأسعار المعتمدة' : 'Price Match Guarantee'}
            </h4>
            <p className="text-xs text-slate-300">
              {language === 'ar' ? 'نطابق أي سعر أقل معتمد رسمي' : 'We match certified lower prices'}
            </p>
            <button className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700">
              {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
            </button>
          </div>
        </div>

        {/* 6. FAQs */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-950 text-center">
            {language === 'ar' ? 'الأسئلة الشائعة حول متجر القطع' : 'Frequently Asked Questions'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-start font-bold text-xs text-slate-900 flex items-center justify-between gap-2"
                  >
                    <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-[11px] text-slate-600 border-t border-slate-100 font-medium leading-relaxed">
                      {language === 'ar' ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. Bottom CTA Banner */}
        <div className="bg-[#0B1528] rounded-3xl p-8 text-white border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">
              {language === 'ar' ? 'لم تجد القطعة التي تبحث عنها؟' : "Can't Find the Part You Need?"}
            </h3>
            <p className="text-xs text-slate-300">
              {language === 'ar'
                ? 'فريق توريد قطع الغيار سيبحث لك عن القطع النادرة أو الأصلية عبر شبكتنا المعتمدة ويوفرها لك فوراً.'
                : 'Our parts sourcing team will find rare OEM or aftermarket parts across our Palestinian supplier network.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('request-quote')}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all"
            >
              {language === 'ar' ? 'طلب مساعدة لتوفير قطعة' : 'Request Part Assistance'}
            </button>
            <a
              href="tel:+970591234567"
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700"
            >
              {language === 'ar' ? 'اتصل بنا: +970 59 123 4567' : 'Call Us: +970 59 123 4567'}
            </a>
          </div>
        </div>
      </div>

      {/* Floating Cart Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => setActiveTab('cart-checkout')}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-2xl flex items-center gap-3 border-2 border-slate-950 transition-transform hover:scale-105"
          >
            <div className="w-6 h-6 rounded-full bg-slate-950 text-white text-xs font-black flex items-center justify-center">
              {cart.reduce((acc, i) => acc + i.quantity, 0)}
            </div>
            <span>
              {language === 'ar' ? 'عرض السلة وإتمام الشراء' : 'View Cart & Checkout'}
            </span>
            <span className="font-mono bg-slate-950/10 px-2.5 py-0.5 rounded-lg font-bold">
              {formatPrice(cart.reduce((acc, i) => acc + i.price * i.quantity, 0))}
            </span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};
