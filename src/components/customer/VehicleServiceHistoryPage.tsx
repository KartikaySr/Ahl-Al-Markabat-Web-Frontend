import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  ShieldCheck,
  Calendar as CalendarIcon,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Download,
  Upload,
  ChevronDown,
  Wrench,
  DollarSign,
  Fuel,
  Gauge,
  User,
  Star,
  Printer,
  ChevronRight,
} from 'lucide-react';

export const VehicleServiceHistoryPage: React.FC = () => {
  const {
    language,
    formatPrice,
    setActiveTab,
    setCustomerActiveTab,
    user,
    placedBookings,
    vehicles,
  } = useApp();
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');
  const [activeSubTab, setActiveSubTab] = useState<'history' | 'costs' | 'parts' | 'analytics' | 'docs'>('history');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isNewAccount = user?.isNewUser || (!user?.isDemoUser && placedBookings.length === 0);

  const metrics = isNewAccount
    ? [
        { label: language === 'ar' ? 'إجمالي الخدمات' : 'Total Services', value: '0' },
        { label: language === 'ar' ? 'إجمالي المصروفات' : 'Total Spent', value: formatPrice(0) },
        { label: language === 'ar' ? 'متوسط تكلفة الصيانة' : 'Avg. Cost / Service', value: '—' },
        { label: language === 'ar' ? 'موعد الصيانة القادمة' : 'Next Service Due', value: language === 'ar' ? 'غير محدد بعد' : 'Not scheduled' },
        { label: language === 'ar' ? 'حالة الضمان' : 'Warranty Status', value: language === 'ar' ? 'لا يوجد ضمان مسجل' : 'No active warranty' },
        { label: language === 'ar' ? 'آخر صيانة' : 'Last Service', value: language === 'ar' ? 'لا توجد صيانة سابقة' : 'No prior service' },
      ]
    : [
        { label: 'Total Services', value: '12' },
        { label: 'Total Spent', value: formatPrice(6845) },
        { label: 'Avg. Cost / Service', value: formatPrice(570) },
        { label: 'Next Service Due', value: 'In 3,580 km' },
        { label: 'Warranty Status', value: 'Valid until 18 Mar 2026' },
        { label: 'Last Service', value: '12 May 2025' },
      ];

  const timelineEvents = [
    {
      date: '12 May 2025',
      mileage: '58,420 km',
      title: 'Major Service (60,000 km)',
      garage: 'AutoTech Garage, Ramallah',
      category: 'Maintenance • General Service • Oil Change',
      desc: 'Full inspection, engine oil & filter change, brake check, tire rotation.',
      cost: 685,
      status: 'Completed',
    },
    {
      date: '18 Dec 2024',
      mileage: '52,300 km',
      title: 'Brake System Repair',
      garage: 'Rapid Fix Center, Ramallah',
      category: 'Repair • Brakes',
      desc: 'Replaced front brake pads and machined rotors.',
      cost: 920,
      status: 'Completed',
    },
    {
      date: '08 Sep 2024',
      mileage: '45,800 km',
      title: 'AC Service & Gas Refill',
      garage: 'PalAuto Service, Ramallah',
      category: 'Maintenance • AC & Cooling',
      desc: 'AC system cleaning, gas refill, and performance check.',
      cost: 350,
      status: 'Completed',
    },
    {
      date: '02 Jun 2024',
      mileage: '39,100 km',
      title: 'Minor Service (40,000 km)',
      garage: 'CityCare Auto Solutions, Ramallah',
      category: 'Maintenance • General Service',
      desc: 'Oil change, filters, multi-point inspection.',
      cost: 480,
      status: 'Completed',
    },
    {
      date: '11 Mar 2024',
      mileage: '31,330 km',
      title: 'Tire Replacement',
      garage: 'AutoTech Garage, Ramallah',
      category: 'Repair • Tires',
      desc: 'Replaced 4 tires with premium all-season tires.',
      cost: 1250,
      status: 'Completed',
    },
  ];

  const partsUsed = [
    { date: '12 May 2025', part: 'Engine Oil 0W-20', num: '08880-83261', brand: 'Toyota Genuine', qty: '5L', cost: 185 },
    { date: '12 May 2025', part: 'Oil Filter', num: '90915-YZZE2', brand: 'Toyota Genuine', qty: '1', cost: 45 },
    { date: '18 Dec 2024', part: 'Front Brake Pads', num: '04465-42060', brand: 'Toyota Genuine', qty: '1 Set', cost: 320 },
    { date: '18 Dec 2024', part: 'Brake Rotor (Front)', num: '43512-42050', brand: 'Toyota Genuine', qty: '2', cost: 380 },
    { date: '11 Mar 2024', part: 'All-Season Tire 225/65R17', num: 'DSR1-2266517', brand: 'Dunlop', qty: '4', cost: 1000 },
  ];

  const invoices = [
    { num: 'INV-2025-0512', date: '12 May 2025', amount: 685 },
    { num: 'INV-2024-1218', date: '18 Dec 2024', amount: 920 },
    { num: 'INV-2024-0908', date: '08 Sep 2024', amount: 350 },
    { num: 'INV-2024-0602', date: '02 Jun 2024', amount: 480 },
  ];

  const reviewsList = [
    { garage: 'AutoTech Garage', date: '12 May 2025', rating: 4.9, comment: 'Excellent service, professional team and transparent pricing. Highly recommend!' },
    { garage: 'Rapid Fix Center', date: '18 Dec 2024', rating: 4.8, comment: 'Quick and reliable brake repair. Great customer service.' },
    { garage: 'PalAuto Service', date: '08 Sep 2024', rating: 4.7, comment: 'AC working perfectly now. Very satisfied with the service.' },
    { garage: 'CityCare Auto Solutions', date: '02 Jun 2024', rating: 4.8, comment: 'Smooth experience and detailed inspection report.' },
  ];

  const activeTimelineEvents = isNewAccount
    ? placedBookings.map((b) => ({
        date: b.date,
        mileage: '—',
        title: b.serviceName,
        garage: b.providerName,
        category: b.serviceMode,
        desc: language === 'ar' ? `حجز صيانة مؤكد لمركبة ${b.vehicleDetails}` : `Confirmed booking for ${b.vehicleDetails}`,
        cost: 0,
        status: language === 'ar' ? 'مؤكد' : 'Confirmed',
      }))
    : timelineEvents;

  const activeParts = isNewAccount ? [] : partsUsed;
  const activeInvoices = isNewAccount ? [] : invoices;
  const activeReviews = isNewAccount ? [] : reviewsList;

  const faqs = [
    { q: 'How often should I service my vehicle?', a: 'Routine minor service (oil & filter) is recommended every 10,000 km or 6 months. Major service is recommended every 40,000 to 60,000 km.' },
    { q: 'What services are included in a major service?', a: 'A major service covers spark plug replacement, transmission fluid, brake flush, cooling system flush, cabin and engine air filters, and full multi-point diagnostic OBD scan.' },
    { q: 'How can I download my service invoices?', a: 'Click the PDF button next to any invoice in the Invoices section below to download official certified VAT receipts.' },
    { q: 'Can I add a service done outside your network?', a: 'Yes! You can manually log external service records and upload photos or receipts under the Documents tab.' },
    { q: 'How do I know when my next service is due?', a: 'The Next Service Due widget automatically calculates your daily driving average and alerts you in advance.' },
    { q: 'Can I share my service history with others?', a: 'Yes, you can export a verified digital vehicle passport PDF to share with prospective buyers or insurance providers.' },
    { q: 'Are the parts used genuine?', a: 'Yes, all verified network workshops use genuine OEM or tier-1 certified aftermarket parts with verifiable part numbers.' },
    { q: 'How is the vehicle health score calculated?', a: 'It is aggregated from your digital diagnostic inspections (DVI), fluid change intervals, and OBD diagnostic sensor readings.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. Header Banner */}
      <div className="bg-[#0B1528] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1700px] mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Home &gt; Vehicle Service History</span>
            <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 text-xs">
              Change Vehicle ▾
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {language === 'ar' ? 'سجل صيانة المركبة الرقمي' : 'Vehicle Service History'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {language === 'ar'
              ? 'تتبع رحلة صيانة مركبتك الكاملة، السجلات الدورية، الإصلاحات، التكاليف، ومستوى الأداء في مكان واحد.'
              : "Track your vehicle's complete service journey, maintenance records, repairs, costs, and performance all in one place."}
          </p>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 space-y-8">
        {/* 2. Active Vehicle Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80"
                alt="Toyota RAV4 2022"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {vehicles.length > 0
                      ? `${vehicles[0].make} ${vehicles[0].model} ${vehicles[0].year}`
                      : isNewAccount
                      ? (language === 'ar' ? 'كراجك الرقمي جاهز لإضافة مركبتك الأولى' : 'Digital Garage Ready for Your Vehicle')
                      : 'Toyota RAV4 2022'}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {isNewAccount ? (language === 'ar' ? '● حساب مفعل جديد' : '● Activated Account') : '✓ Active Vehicle'}
                  </span>
                </div>
                <div className="text-end text-xs">
                  <span className="text-slate-400 text-[10px] block">{language === 'ar' ? 'المالك' : 'Owner'}</span>
                  <strong className="text-slate-900">
                    {user?.name || (language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor')}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">VIN</span>
                  <strong className="font-mono text-slate-900">
                    {vehicles.length > 0 ? (vehicles[0].vin || 'JTMDFREV4ND088219') : isNewAccount ? '—' : '.TMPFRREV1UJ2318467'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">{language === 'ar' ? 'رقم اللوحة' : 'License Plate'}</span>
                  <strong className="font-mono text-slate-900">
                    {vehicles.length > 0 ? (vehicles[0].plateNumber || '—') : isNewAccount ? '—' : '12345 - P'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">{language === 'ar' ? 'المسافة المقطوعة' : 'Mileage'}</span>
                  <strong className="font-mono text-slate-900">
                    {vehicles.length > 0 ? `${vehicles[0].mileage || 0} km` : isNewAccount ? '0 km' : '58,420 km'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">{language === 'ar' ? 'الوقود وناقل الحركة' : 'Fuel & Transmission'}</span>
                  <strong className="text-slate-900">
                    {vehicles.length > 0 ? `${vehicles[0].fuelType || 'Petrol'} • Automatic` : isNewAccount ? '—' : 'Petrol • Automatic'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-semibold">{m.label}</span>
                <strong className="text-sm font-black text-slate-950 font-mono block">{m.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('history')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeSubTab === 'history' ? 'bg-blue-600 text-white font-black shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Service History
          </button>
          <button
            onClick={() => setActiveSubTab('costs')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeSubTab === 'costs' ? 'bg-blue-600 text-white font-black shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Costs & Invoices
          </button>
          <button
            onClick={() => setActiveSubTab('parts')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeSubTab === 'parts' ? 'bg-blue-600 text-white font-black shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Parts & Repairs
          </button>
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeSubTab === 'analytics' ? 'bg-blue-600 text-white font-black shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Analytics & Health Score
          </button>
          <button
            onClick={() => setActiveSubTab('docs')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeSubTab === 'docs' ? 'bg-blue-600 text-white font-black shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Documents & Reminders
          </button>
        </div>

        {/* 4. Service Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-950">Service Timeline</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  viewMode === 'timeline' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Timeline View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          {activeTimelineEvents.length === 0 ? (
            <div className="p-8 sm:p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'لا توجد سجلات صيانة سابقة للمركبة' : 'No Service History Records Yet'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'حسابك جديد كلياً ولا توجد معاملات صيانة أو فواتير سابقة. عند قيامك بحجز أول موعد صيانة أو فحص معتمد ستوثق تفاصيل الخدمة والفواتير الرقمية هنا تلقائياً.'
                    : 'This account has no prior transactions or service history. Once you complete any maintenance or certified inspection, full records will populate here.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('customer');
                  setCustomerActiveTab('providers');
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'ar' ? 'استعراض الورش وحجز موعد الآن' : 'Find Workshops & Book Service'}</span>
              </button>
            </div>
          ) : viewMode === 'timeline' ? (
            <div className="space-y-4 relative before:absolute before:inset-0 before:start-6 before:w-0.5 before:bg-slate-200">
              {activeTimelineEvents.map((evt, idx) => (
                <div key={idx} className="relative flex items-start gap-4 ps-12">
                  <div className="absolute start-4 top-1.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] ring-4 ring-white">
                    {idx + 1}
                  </div>

                  <div className="flex-1 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-400 font-mono">{evt.date}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">{evt.mileage}</span>
                      </div>
                      <strong className="text-sm font-black text-slate-900 block">{evt.title}</strong>
                      <span className="text-xs text-blue-600 font-semibold block">{evt.garage}</span>
                      <p className="text-xs text-slate-500">{evt.desc}</p>
                    </div>

                    <div className="text-end shrink-0 space-y-2">
                      <span className="text-base font-black text-slate-900 font-mono block">
                        {formatPrice(evt.cost)}
                      </span>
                      <button className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50">
                        View Details &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                  <tr>
                    <th className="p-3 text-start">Date</th>
                    <th className="p-3 text-start">Mileage</th>
                    <th className="p-3 text-start">Service / Repair</th>
                    <th className="p-3 text-start">Provider</th>
                    <th className="p-3 text-end">Cost</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {activeTimelineEvents.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono">{t.date}</td>
                      <td className="p-3 font-mono">{t.mileage}</td>
                      <td className="p-3 font-bold text-slate-900">{t.title}</td>
                      <td className="p-3 text-blue-600">{t.garage}</td>
                      <td className="p-3 text-end font-mono font-bold">{formatPrice(t.cost)}</td>
                      <td className="p-3 text-center text-emerald-600 font-bold">✓ {t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 5. Invoices Download & Parts Used */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Invoices List */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">Invoices & Certified Receipts</h3>
            {activeInvoices.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 space-y-1">
                <strong className="text-slate-700 block font-bold">
                  {language === 'ar' ? 'لا توجد فواتير ضريبية صادرة بعد' : 'No Invoices Yet'}
                </strong>
                <p>{language === 'ar' ? 'ستصدر الفواتير الضريبية فور إتمام خدمات الصيانة.' : 'Invoices will appear after completed services.'}</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeInvoices.map((inv, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="font-mono text-slate-900 block font-bold">{inv.num}</strong>
                      <span className="text-[10px] text-slate-400">{inv.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <strong className="font-mono text-slate-900">{formatPrice(inv.amount)}</strong>
                      <button className="px-3 py-1 rounded-lg bg-white border border-slate-300 hover:bg-blue-50 text-blue-600 font-bold flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Parts Used */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">Parts Used & Authenticity</h3>
            {activeParts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 space-y-1">
                <strong className="text-slate-700 block font-bold">
                  {language === 'ar' ? 'لا توجد قطع غيار مستبدلة بعد' : 'No Replaced Parts Yet'}
                </strong>
                <p>{language === 'ar' ? 'يتم توثيق القطع الأصلية وفترات ضمانها هنا تلقائياً.' : 'Genuine parts and warranty periods will be tracked here.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-slate-50 font-bold border-y border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-2.5 text-start">Date</th>
                      <th className="p-2.5 text-start">Part Name</th>
                      <th className="p-2.5 text-start">Part #</th>
                      <th className="p-2.5 text-start">Brand</th>
                      <th className="p-2.5 text-end">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeParts.map((p, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-mono text-[11px] text-slate-400">{p.date}</td>
                        <td className="p-2.5 font-bold text-slate-900">{p.part}</td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-600">{p.num}</td>
                        <td className="p-2.5 text-blue-600">{p.brand}</td>
                        <td className="p-2.5 text-end font-mono font-bold">{formatPrice(p.cost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* 6. Maintenance Cost & Health Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase block">Total Spent</span>
            <strong className="text-3xl font-black text-slate-900 font-mono block">
              {formatPrice(isNewAccount ? 0 : 6845)}
            </strong>
            <span className="text-xs text-slate-500">
              {isNewAccount
                ? (language === 'ar' ? '0 سجلات صيانة سابقة' : '0 verified service records')
                : 'Across 12 verified service records'}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase block">Cost Breakdown</span>
            {isNewAccount ? (
              <div className="py-3 text-xs text-slate-400 italic">
                {language === 'ar' ? 'لا توجد مصروفات مسجلة بعد' : 'No recorded expenses yet'}
              </div>
            ) : (
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span>Maintenance:</span><strong className="font-mono">42%</strong></div>
                <div className="flex justify-between"><span>Repairs:</span><strong className="font-mono">30%</strong></div>
                <div className="flex justify-between"><span>Parts:</span><strong className="font-mono">15%</strong></div>
                <div className="flex justify-between"><span>Others:</span><strong className="font-mono">13%</strong></div>
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Vehicle Health Score</span>
              <strong className="text-4xl font-black text-emerald-600 font-mono block">
                {isNewAccount ? (vehicles.length > 0 ? '100 / 100' : '—') : '92 / 100'}
              </strong>
              <span className="text-xs font-bold text-emerald-700">
                {isNewAccount
                  ? vehicles.length > 0
                    ? (language === 'ar' ? 'مركبة جديدة' : 'New Vehicle')
                    : (language === 'ar' ? 'بانتظار تسجيل المركبة' : 'Pending Registration')
                  : 'Excellent Condition'}
              </span>
            </div>
            <ShieldCheck className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        {/* 7. Rate & Review Verified Workshops */}
        <div className="space-y-4">
          <h3 className="text-base font-black text-slate-950">Rate & Review Your Service</h3>
          {activeReviews.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
              {language === 'ar' ? 'لا توجد خدمات صيانة سابقة لتقييمها بعد' : 'No past services to review yet'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeReviews.map((r, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-slate-900">{r.garage}</strong>
                      <span className="text-xs text-amber-500 font-bold">{r.rating} ★</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">{r.date}</span>
                    <p className="text-xs text-slate-600 italic">"{r.comment}"</p>
                  </div>
                  <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">
                    Write Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 8. FAQs & Bottom CTA Banner */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-950 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-start font-bold text-xs text-slate-900 flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-[11px] text-slate-600 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0B1528] rounded-3xl p-8 text-white border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">Keep Your Vehicle in Top Condition</h3>
            <p className="text-xs text-slate-300">Book your next routine service or repair with verified workshops.</p>
          </div>

          <button
            onClick={() => {
              setActiveTab('customer');
              setCustomerActiveTab('providers');
            }}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md shrink-0 transition-all hover:scale-105 active:scale-95"
          >
            {language === 'ar' ? 'استعراض الورش المعتمدة والحجز ←' : 'Find Workshops & Book Service →'}
          </button>
        </div>
      </div>
    </div>
  );
};
