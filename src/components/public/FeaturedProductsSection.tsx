import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingCart,
  Check,
  Star,
  ShieldCheck,
  Truck,
  ArrowRight,
  Tag,
  Package,
  Sparkles,
} from 'lucide-react';

export const FeaturedProductsSection: React.FC = () => {
  const { language, formatPrice, setActiveTab, addToCart, cart, showToast } = useApp();

  const featuredProducts = [
    {
      id: 'part-1',
      nameEn: 'Brembo Ceramic Front Brake Pads',
      nameAr: 'فحمات فرامل أمامية سيراميك بريمبو',
      partNum: 'P 83 142N',
      price: 185,
      oldPrice: 220,
      fitmentEn: 'Toyota Land Cruiser / Prado (2015–2024)',
      fitmentAr: 'تويوتا لاند كروزر / برادو (2015–2024)',
      rating: 4.9,
      reviews: 142,
      badgeEn: 'Best Seller',
      badgeAr: 'الأكثر مبيعاً',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      sellerEn: 'Al Zahra Auto Parts LLC',
      sellerAr: 'شركة الزهراء لقطع الغيار',
      image: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?w=400&auto=format&fit=crop&q=80',
      inStock: true,
    },
    {
      id: 'part-2',
      nameEn: 'Mobil 1 Advanced Full Synthetic 5W-30 (4L)',
      nameAr: 'زيت محرك موبيل 1 تخليقي بالكامل 5W-30 (4 لتر)',
      partNum: 'MOB-5W30-4L',
      price: 145,
      oldPrice: 175,
      fitmentEn: 'Universal – All Gasoline & Turbo Engines',
      fitmentAr: 'شامل – لكافة محركات البنزين والتيربو',
      rating: 5.0,
      reviews: 310,
      badgeEn: 'OEM Approved',
      badgeAr: 'معتمد وكالة',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      sellerEn: 'Emirates Lubricants Co.',
      sellerAr: 'شركة الإمارات للزيوت والمشتقات',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop&q=80',
      inStock: true,
    },
    {
      id: 'part-3',
      nameEn: 'Bosch Double Platinum Spark Plugs (Set of 4)',
      nameAr: 'بواجي بوش بلاتينيوم مزدوج أصلية (طقم 4)',
      partNum: 'FR7DPP33+',
      price: 110,
      oldPrice: 135,
      fitmentEn: 'Nissan Patrol / X-Trail / Altima',
      fitmentAr: 'نيسان باترول / إكس تريل / ألتيما',
      rating: 4.8,
      reviews: 98,
      badgeEn: 'Hot Deal',
      badgeAr: 'عرض خاص',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      sellerEn: 'Gulf Tech Spare Parts',
      sellerAr: 'مؤسسة جلف تك لقطع الغيار',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80',
      inStock: true,
    },
    {
      id: 'part-4',
      nameEn: 'Bosch S4 High-Output 12V 70Ah Battery',
      nameAr: 'بطارية بوش S4 عالية الأداء 12 فولت 70 أمبير',
      partNum: '0 092 S40 080',
      price: 320,
      oldPrice: 380,
      fitmentEn: 'Sedans & SUVs (Direct Fit Replacement)',
      fitmentAr: 'سيارات السيدان والدفع الرباعي',
      rating: 4.9,
      reviews: 184,
      badgeEn: '2-Year Warranty',
      badgeAr: 'ضمان سنتين',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      sellerEn: 'Universal Batteries LLC',
      sellerAr: 'الشركة العالمية للبطاريات',
      image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=400&auto=format&fit=crop&q=80',
      inStock: true,
    },
    {
      id: 'part-5',
      nameEn: 'Michelin Pilot Sport 4 SUV Tire (265/50 R20)',
      nameAr: 'إطار ميشلان بايلوت سبورت 4 SUV (265/50 R20)',
      partNum: 'MICH-PS4-2655020',
      price: 850,
      oldPrice: 980,
      fitmentEn: 'Luxury SUVs, Range Rover, Porsche Cayenne',
      fitmentAr: 'مركبات الدفع الرباعي الفارهة، رينج روفر، بورش كايين',
      rating: 5.0,
      reviews: 76,
      badgeEn: 'Premium Choice',
      badgeAr: 'خيار النخبة',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      sellerEn: 'Emirates Tires Hub',
      sellerAr: 'مركز الإمارات للإطارات',
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80',
      inStock: true,
    },
    {
      id: 'part-6',
      nameEn: 'K&N High-Flow Engine Air Filter (Reusable)',
      nameAr: 'فلتر هواء رياضي عالي التدفق K&N قابل للغسيل',
      partNum: '33-2480',
      price: 240,
      oldPrice: 285,
      fitmentEn: 'Ford F-150 / Mustang / Explorer',
      fitmentAr: 'فورد F-150 / موستانج / إكسبلورر',
      rating: 4.8,
      reviews: 115,
      badgeEn: 'Million Mile Warranty',
      badgeAr: 'ضمان مليون ميل',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      sellerEn: 'Performance Auto Parts',
      sellerAr: 'وكالة قطع الأداء العالي',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80',
      inStock: true,
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
    <section className="py-16 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Package className="w-4 h-4 text-amber-600" />
              <span>{language === 'ar' ? 'قطع الغيار الأصلية المعتمدة' : 'Genuine Spare Parts & Products'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {language === 'ar' ? 'سوق قطع الغيار والزيوت المعتمدة' : 'Featured Auto Parts & Fluids'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'اطلب قطع الغيار الأصلية والزيوت والإطارات المعتمدة مع التوصيل السريع لباب منزلك أو للورشة مباشرة.'
                : 'Order 100% authentic OEM and certified aftermarket parts, fluids, and batteries with fast express delivery.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all flex items-center gap-2 shadow-sm self-start md:self-auto cursor-pointer"
          >
            <span>{language === 'ar' ? 'استعراض كافة قطع الغيار (1,200+) ←' : 'Browse All Marketplace Parts (1,200+) →'}</span>
          </button>
        </div>

        {/* Products Grid with Direct Add-to-Cart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {featuredProducts.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2.5">
                  {/* Image & Badge */}
                  <div
                    onClick={() => setActiveTab('marketplace')}
                    className="relative rounded-2xl overflow-hidden aspect-square bg-white border border-slate-200 p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.nameEn}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-2 start-2 px-2 py-0.5 rounded-full text-[9px] font-black shadow-xs border ${product.badgeColor}`}>
                      {language === 'ar' ? product.badgeAr : product.badgeEn}
                    </span>
                  </div>

                  {/* Part Details */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold block">{product.partNum}</span>
                    <h3
                      onClick={() => setActiveTab('marketplace')}
                      className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug mt-0.5"
                    >
                      {language === 'ar' ? product.nameAr : product.nameEn}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-medium">
                      {language === 'ar' ? product.fitmentAr : product.fitmentEn}
                    </p>
                  </div>

                  {/* Rating & In-Stock */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="text-amber-500 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </span>
                    <span className="text-slate-400">({product.reviews})</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-black">
                      {language === 'ar' ? 'متوفر بالمخزون' : 'In Stock'}
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="pt-2 border-t border-slate-200/80 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <strong className="text-base font-black text-slate-900 font-mono">
                      {formatPrice(product.price)}
                    </strong>
                    {product.oldPrice > 0 && (
                      <span className="text-[11px] text-slate-400 line-through font-mono">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2.5 rounded-xl font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isInCart
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'أضيف للسلة ✓' : 'In Cart ✓'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'إضافة إلى السلة' : '+ Add to Cart'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-black text-slate-900 block">
                {language === 'ar' ? 'قطع أصلية ومضمونة 100%' : '100% Genuine & OEM Certified'}
              </strong>
              <span className="text-[10px] text-slate-500 block">
                {language === 'ar' ? 'مرفقة بشهادات الضمان المباشر من الموزع' : 'Direct distributor warranty on all items'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-black text-slate-900 block">
                {language === 'ar' ? 'توصيل سريع لباب بيتك أو الورشة' : 'Fast Express Delivery'}
              </strong>
              <span className="text-[10px] text-slate-500 block">
                {language === 'ar' ? 'شحن فوري خلال 24–48 ساعة لجميع المناطق' : 'Direct to your home or chosen garage in 24–48h'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-black text-slate-900 block">
                {language === 'ar' ? 'إرجاع واستبدال مرن خلال 14 يوماً' : '14-Day Easy Returns'}
              </strong>
              <span className="text-[10px] text-slate-500 block">
                {language === 'ar' ? 'ضمان تطابق المقاس ورقم الهيكل بالكامل' : 'Guaranteed fitment or 100% money back'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
