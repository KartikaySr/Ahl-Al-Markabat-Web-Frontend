import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Package,
  Search,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Star,
  Zap,
  Building2,
  Wrench,
  Car,
  ChevronDown,
  ArrowRight,
  Truck,
  RotateCcw,
  Tag,
  Flame,
  Clock,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { SHARED_PARTS_CATALOG } from '../../../data/partsCatalog';

export const CustomerMarketplaceTab: React.FC = () => {
  const {
    language,
    formatPrice,
    setActiveTab,
    showToast,
    user,
    placedOrders,
    addToCart,
    setIsCartModalOpen,
    cart,
  } = useApp();
  const [subView, setSubView] = useState<'catalog' | 'deals' | 'orders'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'oem' | 'aftermarket'>('all');
  const [selectedCar, setSelectedCar] = useState('veh-1');

  const categories = [
    { id: 'All', nameEn: 'All Categories', nameAr: 'كافة التصنيفات', count: 12 },
    { id: 'Brakes', nameEn: 'Brake Systems & Rotors', nameAr: 'الفرامل والأقراص', count: 148 },
    { id: 'Filters', nameEn: 'Filters & Fluids', nameAr: 'الفلاتر والزيوت التخليقية', count: 85 },
    { id: 'Electrical', nameEn: 'Batteries & Electrical', nameAr: 'البطاريات والكهرباء والإنارة', count: 64 },
    { id: 'Suspension', nameEn: 'Suspension & Shocks', nameAr: 'المساعدات ونظام التعليق', count: 42 },
    { id: 'Ignition', nameEn: 'Spark Plugs & Ignition', nameAr: 'البواجي ونظام الإشعال', count: 96 },
    { id: 'Cooling', nameEn: 'Cooling & AC System', nameAr: 'التكييف والتبريد', count: 115 },
    { id: 'Engine', nameEn: 'Engine & Belts', nameAr: 'المحرك والسيور', count: 232 },
  ];

  const parts = SHARED_PARTS_CATALOG;

  const filteredParts = parts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleAr.includes(searchQuery) ||
      p.oem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === 'all' ||
      (filterType === 'oem' && p.type.includes('OEM')) ||
      (filterType === 'aftermarket' && p.type.includes('Aftermarket'));

    return matchesCategory && matchesSearch && matchesType;
  });

  const demoOrders = [
    {
      id: 'ORD-98214',
      date: 'May 02, 2024',
      dateAr: '02 مايو 2024',
      items: 'OEM Ceramic Front Brake Pads + Motul 0W-20 Oil (5L)',
      itemsAr: 'فحمات فرامل سيراميك وكالة + زيت موتول 0W-20 (5 لتر)',
      status: 'Delivered & Installed at AutoTech Premier',
      statusAr: 'تم التوصيل والتركيب في مركز أوتو تك بريميير',
      total: 'AED 334.00',
      tracking: 'DELIVERED',
      trackingAr: 'تم التسليم والتركيب',
      deliveryMode: 'Workshop Fitting',
      deliveryModeAr: 'تركيب في الورشة',
      city: 'Dubai',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'ORD-89102',
      date: 'Jan 18, 2024',
      dateAr: '18 يناير 2024',
      items: 'Bosch S5 AGM Battery (70Ah)',
      itemsAr: 'بطارية بوش S5 AGM عالية الأداء (70Ah)',
      status: 'Mobile Fitting Completed by Rapid Fix',
      statusAr: 'تم التركيب المتنقل بواسطة رابيد فيكس بنجاح',
      total: 'AED 380.00',
      tracking: 'COMPLETED',
      trackingAr: 'مكتمل',
      deliveryMode: 'Mobile Service',
      deliveryModeAr: 'خدمة متنقلة',
      city: 'Dubai',
      paymentMethod: 'Cash on Delivery',
    },
  ];

  const totalOrdersCount = placedOrders.length + demoOrders.length;

  const handleAddToCart = (part: any, openCheckoutModal: boolean = true) => {
    const partTitle = language === 'ar' ? (part.titleAr || part.title) : (part.title || part.titleAr);
    const numericPrice =
      typeof part.price === 'string'
        ? parseFloat(part.price.replace(/[^0-9.]/g, '')) || 95
        : part.price || 95;

    addToCart({
      id: part.id || `part-${Date.now()}`,
      nameEn: part.title || partTitle,
      nameAr: part.titleAr || partTitle,
      partNum: part.oem || 'OEM-PART',
      price: numericPrice,
      image: part.img || '/images/categories/oil_filters_quick.jpg',
      sellerEn: part.seller || 'AutoTech Parts Hub',
      sellerAr: part.sellerAr || 'مركز قطع أوتو تك',
    });

    if (openCheckoutModal) {
      setIsCartModalOpen(true);
    } else {
      showToast(
        language === 'ar' ? `🛒 تمت إضافة «${partTitle}» إلى سلة مشترياتك!` : `🛒 ${partTitle} added to your cart!`,
        'success'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Sub-Tabs Bar (Matching Image 2) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubView('catalog')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'catalog'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{language === 'ar' ? 'كتالوج القطع المتوافقة هندسياً' : 'Guaranteed Fitment Catalog'}</span>
        </button>

        <button
          onClick={() => setSubView('deals')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'deals'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span>{language === 'ar' ? 'عروض وتخفيضات خاصة 🔥' : 'Special Offers 🔥'}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
            {language === 'ar' ? 'وفر حتى 25%' : 'Up to 25% Off'}
          </span>
        </button>

        <button
          onClick={() => setSubView('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'orders'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{language === 'ar' ? 'طلباتي ومتابعة الشحن والتركيب' : 'My Parts Orders'}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              subView === 'orders' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            {totalOrdersCount}
          </span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* VIEW 1: CATALOG WITH VIN & VEHICLE FITMENT                   */}
      {/* ============================================================ */}
      {subView === 'catalog' && (
        <div className="space-y-6">
          {/* Smart Vehicle Fitment Banner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">
                    {language === 'ar' ? 'المركبة المحددة للبحث:' : 'Searching Parts For:'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{language === 'ar' ? 'ضمان التوافق 100%' : '100% Fitment Guaranteed'}</span>
                  </span>
                </div>
                <strong className="text-base font-black text-slate-900 block">
                  {selectedCar === 'veh-1'
                    ? (language === 'ar' ? 'تويوتا راف فور 2022 (Toyota RAV4 Hybrid • دبي أ 12345)' : 'Toyota RAV4 2022 (2.5L AWD • Dubai A 12345)')
                    : selectedCar === 'veh-2'
                    ? (language === 'ar' ? 'هيونداي توسان 2021 (Hyundai Tucson • رام الله 6-4521-90)' : 'Hyundai Tucson 2021 (2.0L • Ramallah 6-4521-90)')
                    : (language === 'ar' ? 'مرسيدس-بنز C200 2023 (Mercedes-Benz C200 • أبوظبي 12 99824)' : 'Mercedes-Benz C200 2023 (AMG Line • Abu Dhabi 12 99824)')}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <select
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
              >
                <option value="veh-1">{language === 'ar' ? 'تويوتا راف فور 2022 (دبي)' : 'Toyota RAV4 2022 (Dubai)'}</option>
                <option value="veh-2">{language === 'ar' ? 'هيونداي توسان 2021 (رام الله)' : 'Hyundai Tucson 2021 (Ramallah)'}</option>
                <option value="veh-3">{language === 'ar' ? 'مرسيدس-بنز C200 2023 (أبوظبي)' : 'Mercedes-Benz C200 2023 (Abu Dhabi)'}</option>
              </select>
            </div>
          </div>

          {/* Search & Categories Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث باسم القطعة، رقم القطعة OEM (مثل 04465-06280)، أو التصنيف...' : 'Search by part name, OEM part number, or category...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-10 pe-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === 'all' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                  }`}
                >
                  {language === 'ar' ? 'الكل' : 'All'}
                </button>
                <button
                  onClick={() => setFilterType('oem')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === 'oem' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                  }`}
                >
                  {language === 'ar' ? 'أصلي وكالة OEM' : 'OEM Genuine'}
                </button>
                <button
                  onClick={() => setFilterType('aftermarket')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === 'aftermarket' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                  }`}
                >
                  {language === 'ar' ? 'درجة أولى معتمد' : 'Aftermarket'}
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white font-black shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <img src={p.img} alt={p.title} className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                      OEM: {p.oem}
                    </span>
                    <span className="absolute bottom-2.5 start-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] shadow-sm">
                      ✓ {language === 'ar' ? 'متوافق مع مركبتك' : 'Fitment Verified'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {language === 'ar' ? p.typeAr : p.type}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{p.rating} ({p.reviews})</span>
                      </div>
                    </div>
                    <strong className="text-sm font-black text-slate-900 block leading-snug mt-1">
                      {language === 'ar' ? p.titleAr : p.title}
                    </strong>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {language === 'ar' ? `المورد: ${p.sellerAr}` : `Seller: ${p.seller}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <div>
                      <strong className="text-lg font-black text-slate-900 font-mono block">{formatPrice(p.price)}</strong>
                      <span className="text-[10px] text-slate-400 line-through font-mono">{formatPrice(p.oldPrice)}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-[10px] font-bold text-emerald-700 block">{language === 'ar' ? p.warrantyAr : p.warranty}</span>
                      <span className="text-[10px] text-blue-600 font-bold block">{language === 'ar' ? p.installFeeAr : p.installFee}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleAddToCart(p, false)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all flex items-center justify-center shrink-0 shadow-2xs"
                    title={language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                  >
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleAddToCart(p, true)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === 'ar' ? 'شراء فوري ومعاملة' : 'Add to Cart & Checkout'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: FLASH DEALS & BUNDLES                                */}
      {/* ============================================================ */}
      {subView === 'deals' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 fill-slate-950" />
                <strong className="text-xl font-black text-slate-950">
                  {language === 'ar' ? 'عروض الصيف الحصرية على باقات الصيانة الشاملة' : 'Summer Exclusive Maintenance Bundles'}
                </strong>
              </div>
              <p className="text-xs font-bold text-slate-900/80">
                {language === 'ar'
                  ? 'اشترِ قطع الصيانة الأصلية واحصل على خصم 50% على أجور التركيب في أفضل الورش المعتمدة.'
                  : 'Buy genuine service kits and get 50% off professional workshop installation fees.'}
              </p>
            </div>

            <button
              onClick={() => showToast(language === 'ar' ? 'تم تطبيق كود الخصم SUMMER50 على سلة مشترياتك!' : 'Applied promo code SUMMER50!', 'success')}
              className="px-5 py-2.5 bg-slate-950 text-white font-black text-xs rounded-xl shadow-md transition-all shrink-0 self-start sm:self-center"
            >
              {language === 'ar' ? 'تفعيل كود الخصم SUMMER50' : 'Apply Promo SUMMER50'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parts.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                <img src={p.img} alt={p.title} className="w-24 h-24 rounded-2xl object-contain p-1.5 bg-slate-50 border border-slate-200 shrink-0" />
                <div className="space-y-1 flex-1 text-center sm:text-start">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                    {language === 'ar' ? p.discountAr : p.discount}
                  </span>
                  <strong className="text-sm font-black text-slate-900 block">
                    {language === 'ar' ? p.titleAr : p.title}
                  </strong>
                  <span className="text-xs text-slate-500 font-mono block">
                    {formatPrice(p.price)} <span className="line-through text-slate-400">{formatPrice(p.oldPrice)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddToCart(p, false)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700"
                    title={language === 'ar' ? 'إضافة للسلة' : 'Add to Cart'}
                  >
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(p, true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0"
                  >
                    {language === 'ar' ? 'شراء بالعرض' : 'Buy Deal'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 3: MY ORDERS & TRACKING                                 */}
      {/* ============================================================ */}
      {subView === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <strong className="text-base font-black text-slate-900 uppercase tracking-wider block">
                {language === 'ar' ? 'سجل طلبات قطع الغيار والمعاملات والتوصيل' : 'My Parts Purchase & Workshop Installation Orders'}
              </strong>
              <span className="text-xs text-slate-500 block mt-0.5">
                {language === 'ar'
                  ? `إجمالي الطلبات المسجلة: ${totalOrdersCount} طلبات • تتبع مباشر للشحنات والتركيب`
                  : `Total registered orders: ${totalOrdersCount} orders • Live tracking & workshop fitting`}
              </span>
            </div>

            <button
              onClick={() => setIsCartModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all inline-flex items-center gap-2 self-start sm:self-center"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'فتح سلة المشتريات' : 'Open Cart'}</span>
              {cart.length > 0 && (
                <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 rounded-full text-[10px] font-black">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Dynamic Placed Orders from AppContext */}
          {placedOrders.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <strong className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                  {language === 'ar' ? 'الطلبات والمعاملات الحديثة المكتملة:' : 'Recent Completed Transactions:'}
                </strong>
              </div>

              <div className="space-y-3">
                {placedOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-blue-50/40 border-2 border-emerald-300/80 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-emerald-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono font-black text-xs shadow-2xs">
                          #{ord.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{language === 'ar' ? 'معاملة مؤكدة وجاري التجهيز' : 'Transaction Confirmed'}</span>
                        </span>
                      </div>

                      <div className="text-start sm:text-end text-xs">
                        <span className="text-slate-500">{language === 'ar' ? 'تاريخ الطلب:' : 'Order Date:'} </span>
                        <strong className="text-slate-900 font-mono">{new Date(ord.date).toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Ordered Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80"
                        >
                          <img
                            src={item.image}
                            alt={item.nameEn}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/categories/oil_filters_quick.jpg';
                            }}
                            className="w-11 h-11 rounded-lg object-cover bg-slate-50 border border-slate-200 shrink-0 p-1"
                          />
                          <div className="min-w-0 flex-1">
                            <strong className="text-xs font-black text-slate-900 block truncate">
                              {language === 'ar' ? item.nameAr : item.nameEn}
                            </strong>
                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                              <span>OEM: {item.partNum}</span>
                              <span className="font-bold text-blue-700">
                                {item.quantity}x {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Payment Info Ribbon */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                      <div className="space-y-0.5 text-slate-600">
                        <div>
                          <strong className="text-slate-900">{ord.recipientName}</strong> ({ord.phone})
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {ord.city} • {ord.address} • <span className="font-bold text-slate-700">{ord.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-center">
                        <div className="text-start sm:text-end">
                          <span className="text-[10px] text-slate-500 block">{language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Paid:'}</span>
                          <strong className="text-base font-black text-blue-700 font-mono block leading-none">
                            {formatPrice(ord.total)}
                          </strong>
                        </div>

                        <button
                          onClick={() => showToast(language === 'ar' ? `🚚 الشحنة رقم #${ord.id} قيد التجهيز بمستودع المورد!` : `🚚 Order #${ord.id} is being processed at supplier hub!`, 'info')}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5 text-amber-400" />
                          <span>{language === 'ar' ? 'تتبع الشحنة' : 'Track Order'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous / Demo Orders */}
          <div className="space-y-3 pt-2">
            <strong className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              {language === 'ar' ? 'سجل الطلبات السابقة والمعاملات المكتملة:' : 'Previous Orders & Service History:'}
            </strong>

            <div className="space-y-3">
              {demoOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold text-sm">
                        #{ord.id} • {language === 'ar' ? ord.itemsAr : ord.items}
                      </strong>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-200">
                        {language === 'ar' ? ord.trackingAr : ord.tracking}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {language === 'ar' ? ord.statusAr : ord.status} • {language === 'ar' ? ord.dateAr : ord.date} • {ord.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 self-start sm:self-center">
                    <div className="text-start sm:text-end">
                      <strong className="text-base font-black text-slate-900 font-mono block">{ord.total}</strong>
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        {language === 'ar' ? '✓ شامل التوصيل والتركيب' : '✓ Delivered & Installed'}
                      </span>
                    </div>

                    <button
                      onClick={() => showToast(language === 'ar' ? `📄 تم تحميل فاتورة الطلب #${ord.id}` : `📄 Downloaded invoice for #${ord.id}`, 'success')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      {language === 'ar' ? 'الفاتورة' : 'Invoice'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
