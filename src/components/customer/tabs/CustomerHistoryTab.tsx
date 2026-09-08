import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  Download,
  ShieldCheck,
  Calendar,
  Wrench,
  CheckCircle2,
  TrendingUp,
  Fuel,
  DollarSign,
  Bell,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronDown,
  Eye,
  ExternalLink,
  Package,
} from 'lucide-react';

export const CustomerHistoryTab: React.FC = () => {
  const { language, setCustomerActiveTab, showToast, user, placedBookings, placedOrders } = useApp();
  const [subView, setSubView] = useState<'timeline' | 'analytics' | 'alerts' | 'invoices'>('timeline');

  // Service Timeline Records
  const serviceRecords = [
    {
      id: 'srv-1',
      date: 'May 02, 2024',
      dateAr: '02 مايو 2024',
      mileage: '35,200 km',
      mileageAr: '35,200 كم',
      title: 'Major Service & Brake System Refresh',
      titleAr: 'صيانة دورية رئيسية وتجديد منظومة الفرامل',
      provider: 'AutoTech Premier Garage (Dubai)',
      providerAr: 'مركز أوتو تك بريميير للصيانة (دبي - القوز)',
      totalCost: 'AED 850.00',
      dviStatus: 'Passed (60/60 points)',
      dviStatusAr: 'ناجح باقتدار (60/60 نقطة)',
      technician: 'Mohammed Ali (Master Tech)',
      technicianAr: 'م. محمد علي (كبير الفنيين)',
      items: [
        { name: 'Engine Oil Replacement (0W-20 Full Synthetic)', nameAr: 'تغيير زيت المحرك (0W-20 تخليقي بالكامل 10 آلاف)', qty: '4.5L', price: 'AED 180' },
        { name: 'OEM Ceramic Front Brake Pads', nameAr: 'طقم فحمات فرامل أمامية سيراميك أصلية', qty: '1 Set', price: 'AED 240' },
        { name: 'Front Rotors Surface Balancing', nameAr: 'خرط وتلميع هوبات أمامية ليزر', qty: '2 Units', price: 'AED 160' },
        { name: 'AC Cabin Filter Replacement & Sanitization', nameAr: 'استبدال فلتر المكيف الداخلي وتعقيم الدائرة', qty: '1 Unit', price: 'AED 95' },
        { name: 'Comprehensive Multi-Point DVI Inspection', nameAr: 'فحص رقمي شامل بالفيديو والصور DVI', qty: '1 Session', price: 'AED 0 (مجاني)' },
      ],
      dviImages: [
        'https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'srv-2',
      date: 'Jan 18, 2024',
      dateAr: '18 يناير 2024',
      mileage: '28,100 km',
      mileageAr: '28,100 كم',
      title: 'High-Performance Battery Replacement & Diagnostics',
      titleAr: 'استبدال بطارية عالية الأداء وفحص الشحن',
      provider: 'Rapid Fix Mobile Auto Care',
      providerAr: 'مركز رابيد فيكس للصيانة المتنقلة',
      totalCost: 'AED 450.00',
      dviStatus: 'Passed (Full Electrical Test)',
      dviStatusAr: 'ناجح (فحص الدائرة الكهربائية 100%)',
      technician: 'Saeed Al-Khatib',
      technicianAr: 'سعيد الخطيب (فني متنقل)',
      items: [
        { name: 'Bosch S5 AGM Battery (70Ah)', nameAr: 'بطارية بوش S5 AGM (سعة 70 أمبير)', qty: '1 Unit', price: 'AED 380' },
        { name: 'Alternator Charging Rate & Starter Motor Test', nameAr: 'فحص دينامو الشحن وسلف التشغيل', qty: '1 Test', price: 'AED 70' },
      ],
      dviImages: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80',
      ],
    },
  ];

  // Invoices Records
  const invoices = [
    {
      id: 'INV-2024-001',
      date: 'May 02, 2024',
      dateAr: '02 مايو 2024',
      service: 'Major Service & Brake System Refresh',
      serviceAr: 'صيانة دورية رئيسية وتجديد الفرامل',
      provider: 'AutoTech Premier Garage',
      providerAr: 'مركز أوتو تك بريميير للصيانة',
      amount: 'AED 850.00',
      vat: 'AED 42.50 (5%)',
      status: 'Paid Online • Visa **** 4242',
      statusAr: 'مدفوع إلكترونياً • فيزا **** 4242',
    },
    {
      id: 'INV-2024-002',
      date: 'Jan 18, 2024',
      dateAr: '18 يناير 2024',
      service: 'High-Performance Battery Replacement',
      serviceAr: 'استبدال بطارية عالية الأداء',
      provider: 'Rapid Fix Mobile Care',
      providerAr: 'مركز رابيد فيكس للصيانة المتنقلة',
      amount: 'AED 450.00',
      vat: 'AED 22.50 (5%)',
      status: 'Paid Online • Apple Pay',
      statusAr: 'مدفوع إلكترونياً • Apple Pay',
    },
  ];

  // Smart Alerts
  const alerts = [
    {
      id: 'alt-1',
      title: 'Full Synthetic Engine Oil Change Due',
      titleAr: 'موعد تغيير زيت المحرك التخليقي 10,000 كم',
      priority: 'high',
      dueIn: '1,550 km / 18 Days',
      dueInAr: 'متبقي 1,550 كم / 18 يوماً',
      desc: 'Based on current driving patterns (38,450 km), 40,000 km oil change milestone is approaching.',
      descAr: 'بناءً على نمط القيادة ومسافة العداد (38,450 كم)، اقترب موعد صيانة الـ 40,000 كم الدورية.',
      actionText: 'Book Oil Service',
      actionTextAr: 'حجز موعد غيار زيت',
    },
    {
      id: 'alt-2',
      title: 'Summer AC Cooling Refresh & Anti-Bacterial Clean',
      titleAr: 'فحص كفاءة التبريد الصيفي وتعقيم المكيف',
      priority: 'medium',
      dueIn: 'Recommended for UAE Summer',
      dueInAr: 'يوصى به لموسم الصيف',
      desc: 'High ambient temperature optimization. Inspect cabin microfilter and compressor pressures.',
      descAr: 'تحسين كفاءة التبريد لدرجات الحرارة المرتفعة، فحص ضغط الكمبروسر وتبديل فلتر الهواء الداخلي.',
      actionText: 'Schedule AC Check',
      actionTextAr: 'جدولة فحص التكييف',
    },
  ];

  // Analytics Stats
  const analyticsStats = [
    { label: 'Annual Spend (2024)', labelAr: 'إجمالي المصروفات (2024)', value: 'AED 6,420' },
    { label: 'Cost / Kilometer', labelAr: 'تكلفة الكيلومتر الواحد', value: 'AED 0.38 / km' },
    { label: 'Avg Fuel Economy', labelAr: 'معدل استهلاك الوقود', value: '8.4 L/100km' },
    { label: 'Preventive ROI Saved', labelAr: 'وفر الصيانة الوقائية', value: 'AED 1,850' },
  ];

  const expenseCategories = [
    { name: 'Routine Maintenance & Oil', nameAr: 'الصيانة الدورية والزيوت', amount: 'AED 2,568', pct: 40, color: 'bg-blue-600' },
    { name: 'Brakes & Suspension', nameAr: 'الفرامل والمساعدين', amount: 'AED 1,926', pct: 30, color: 'bg-emerald-600' },
    { name: 'Battery & Electrical', nameAr: 'البطارية والكهرباء', amount: 'AED 963', pct: 15, color: 'bg-amber-500' },
    { name: 'AC & Climate Control', nameAr: 'التكييف والتبريد', amount: 'AED 963', pct: 15, color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Sub-Tabs Bar (Matching Image 2) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubView('timeline')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'timeline'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{language === 'ar' ? 'سجل الصيانة الرقمي وجواز السفر' : 'Passport & Timeline'}</span>
        </button>

        <button
          onClick={() => setSubView('alerts')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'alerts'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{language === 'ar' ? 'تنبيهات الصيانة الذكية' : 'Smart Alerts'}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              subView === 'alerts' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
            }`}
          >
            {!user?.isDemoUser && placedBookings.length === 0 ? '0' : (language === 'ar' ? '2 مستحق' : '2 Due')}
          </span>
        </button>

        <button
          onClick={() => setSubView('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'analytics'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{language === 'ar' ? 'تحليلات المصروفات والتكلفة' : 'Cost Analytics'}</span>
        </button>

        <button
          onClick={() => setSubView('invoices')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            subView === 'invoices'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{language === 'ar' ? 'الفواتير الضريبية وسندات الدفع' : 'VAT Invoices'}</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* VIEW 1: SERVICE TIMELINE & DIGITAL PASSPORT                  */}
      {/* ============================================================ */}
      {subView === 'timeline' && (
        <div className="space-y-6">
          {/* Header Card with Blockchain Verification */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <strong className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'جواز السفر الرقمي الموثق للمركبة' : 'Blockchain-Verified Maintenance Passport'}
                </strong>
              </div>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'سجل غير قابل للتعديل يرفع القيمة السوقية للمركبة بنسبة تصل إلى +15% عند إعادة البيع.'
                  : 'Immutable digital history log that increases vehicle resale value by up to +15%.'}
              </p>
            </div>

            <button
              onClick={() => showToast(language === 'ar' ? 'تجهيز وتحميل التقرير الشامل PDF...' : 'Exporting full passport report...', 'info')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'تصدير جواز السفر PDF' : 'Export Full PDF'}</span>
            </button>
          </div>

          {/* Timeline Stream */}
          {!user?.isDemoUser && placedBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-2xs text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <strong className="text-base font-black text-slate-900 block">
                  {language === 'ar' ? 'جواز السفر الرقمي جاهز للتوثيق' : 'Digital Passport Ready for Certification'}
                </strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'حسابك جديد كلياً! لا توجد سجلات صيانة سابقة لمركبتك بعد. كل عملية صيانة أو فحص تحجزها عبر ورشنا المعتمدة ستوثق هنا رقمياً بشكل دائم مع تقارير DVI بالفيديو والصور وفواتير الضمان.'
                    : 'Your account is brand new! No past service records yet. Every certified maintenance or repair you book on Ahl Al Markabat will be permanently documented here with photo-backed DVI inspection reports and warranty invoices.'}
                </p>
              </div>
              <button
                onClick={() => setCustomerActiveTab('bookings')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'ar' ? 'احجز أول صيانة لمركبتك' : 'Book Your First Service'}</span>
              </button>
            </div>
          ) : placedBookings.length > 0 ? (
            <div className="space-y-4">
              {placedBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base font-black text-slate-900">
                          {b.serviceName} • {b.vehicleDetails}
                        </strong>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                          ✓ {language === 'ar' ? 'حجز نشط ومؤكد' : 'Confirmed Booking'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {b.providerName} • {b.serviceMode}
                      </span>
                    </div>

                    <div className="text-start sm:text-end">
                      <strong className="text-lg font-black text-blue-600 font-mono block">#{b.id}</strong>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {b.date} • {b.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {serviceRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base font-black text-slate-900">
                          {language === 'ar' ? rec.titleAr : rec.title}
                        </strong>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                          ✓ {language === 'ar' ? rec.dviStatusAr : rec.dviStatus}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {language === 'ar' ? rec.providerAr : rec.provider} • {language === 'ar' ? rec.technicianAr : rec.technician}
                      </span>
                    </div>

                    <div className="text-start sm:text-end">
                      <strong className="text-lg font-black text-slate-900 font-mono block">{rec.totalCost}</strong>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {language === 'ar' ? rec.dateAr : rec.date} • {language === 'ar' ? rec.mileageAr : rec.mileage}
                      </span>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-start">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="pb-2 text-start">{language === 'ar' ? 'الخدمة / القطعة' : 'Service / Part Item'}</th>
                          <th className="pb-2 text-center">{language === 'ar' ? 'الكمية' : 'Qty'}</th>
                          <th className="pb-2 text-end">{language === 'ar' ? 'السعر' : 'Price'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {rec.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2.5 text-slate-800">{language === 'ar' ? item.nameAr : item.name}</td>
                            <td className="py-2.5 text-center text-slate-500 font-mono">{item.qty}</td>
                            <td className="py-2.5 text-end font-mono font-bold text-slate-900">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* DVI Inspection Photos */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === 'ar' ? 'صور ومعاينة الفحص الفني الرقمي (DVI):' : 'Attached Workshop DVI Inspection Photos:'}
                    </span>
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                      {rec.dviImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Inspection log"
                          className="w-24 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: SMART MAINTENANCE ALERTS                            */}
      {/* ============================================================ */}
      {subView === 'alerts' && (
        <div className="space-y-4">
          {!user?.isDemoUser && placedBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-2xs text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Bell className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <strong className="text-base font-black text-slate-900 block">
                  {language === 'ar' ? 'لا توجد تنبيهات صيانة مستحقة' : 'No Pending Maintenance Alerts'}
                </strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'حسابك جديد كلياً! سجّل بيانات مركبتك وقراءة العداد لتفعيل التنبيهات الاستباقية لمواعيد تغيير الزيت والفحمات وفحص السوائل.'
                    : 'Your account is brand new! Add your vehicle and record current mileage to activate proactive reminders for oil changes, brake pads, and seasonal checkups.'}
                </p>
              </div>
            </div>
          ) : (
            alerts.map((alt) => (
              <div
                key={alt.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        alt.priority === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {alt.priority === 'high' ? (language === 'ar' ? 'أولوية عاجلة' : 'High Priority') : (language === 'ar' ? 'أولوية متوسطة' : 'Medium Priority')}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {language === 'ar' ? alt.dueInAr : alt.dueIn}
                    </span>
                  </div>
                  <strong className="text-base font-black text-slate-900 block">
                    {language === 'ar' ? alt.titleAr : alt.title}
                  </strong>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    {language === 'ar' ? alt.descAr : alt.desc}
                  </p>
                </div>

                <button
                  onClick={() => setCustomerActiveTab('bookings')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 self-start sm:self-center"
                >
                  {language === 'ar' ? alt.actionTextAr : alt.actionText} →
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 3: EXPENSE ANALYTICS & INSIGHTS                         */}
      {/* ============================================================ */}
      {subView === 'analytics' && (
        <div className="space-y-6">
          {!user?.isDemoUser && placedBookings.length === 0 && placedOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-2xs text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <strong className="text-base font-black text-slate-900 block">
                  {language === 'ar' ? 'لا توجد بيانات مصروفات أو تحليلات بعد' : 'No Expense Analytics Yet'}
                </strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'حسابك جديد كلياً ولا توجد معاملات أو مصروفات سابقة. عند قيامك بحجز أول خدمة صيانة أو شراء قطع غيار، سيتم احتساب معدلات التكلفة والوفر المالي تلقائياً هنا.'
                    : 'Your account is brand new with zero transactions. Once you complete your first service booking or parts purchase, your cost per km, annual spend, and ROI will be calculated automatically here.'}
                </p>
              </div>
              <button
                onClick={() => setCustomerActiveTab('bookings')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'ar' ? 'احجز أول صيانة لبدء التتبع' : 'Book Your First Service'}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsStats.map((st, i) => (
                  <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      {language === 'ar' ? st.labelAr : st.label}
                    </span>
                    <strong className="text-2xl font-black text-slate-900 font-mono block">{st.value}</strong>
                  </div>
                ))}
              </div>

              {/* Expense Breakdown by Category */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'توزيع المصروفات حسب فئة الخدمة' : 'Expense Breakdown by Category'}
                </strong>

                <div className="space-y-3">
                  {expenseCategories.map((cat, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-800">{language === 'ar' ? cat.nameAr : cat.name}</span>
                        <span className="text-slate-900 font-mono">{cat.amount} ({cat.pct}%)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 4: VAT INVOICES LEDGER                                  */}
      {/* ============================================================ */}
      {subView === 'invoices' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
            {language === 'ar' ? 'سجل الفواتير الضريبية الإلكترونية المعتمدة' : 'Official VAT Invoices & Receipts'}
          </strong>

          {!user?.isDemoUser && placedBookings.length === 0 && placedOrders.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <DollarSign className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'لا توجد فواتير ضريبية سابقة' : 'No Tax Invoices Yet'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'ستظهر هنا كافة الفواتير الإلكترونية المعتمدة ضريبياً لعمليات الصيانة وقطع الغيار بمجرد إتمامها.'
                    : 'All verified digital invoices for auto services and spare parts will appear here once processed.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold text-sm">
                        #{inv.id} • {language === 'ar' ? inv.serviceAr : inv.service}
                      </strong>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        {language === 'ar' ? inv.statusAr : inv.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {language === 'ar' ? inv.providerAr : inv.provider} • {language === 'ar' ? inv.dateAr : inv.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 self-start sm:self-center">
                    <div className="text-start sm:text-end">
                      <strong className="text-base font-black text-slate-900 font-mono block">{inv.amount}</strong>
                      <span className="text-[10px] text-slate-400">{language === 'ar' ? `شامل الضريبة ${inv.vat}` : `Incl. ${inv.vat}`}</span>
                    </div>

                    <button
                      onClick={() => showToast(language === 'ar' ? `تحميل الفاتورة الضريبية #${inv.id}` : `Downloading #${inv.id}`, 'info')}
                      className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 shadow-2xs"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
