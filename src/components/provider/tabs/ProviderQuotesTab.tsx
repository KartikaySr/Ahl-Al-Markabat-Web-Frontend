import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send,
  Printer,
  Share2,
  Check,
  User,
  Car,
  Wrench,
  Sparkles,
  HelpCircle,
  Phone,
  Calendar,
  AlertCircle,
  MoreVertical,
  X,
} from 'lucide-react';

interface ProviderQuotesTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderQuotesTab: React.FC<ProviderQuotesTabProps> = ({ onNavigateTab }) => {
  const { language, formatPrice, user, jobs, placedBookings } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const initialQuotes = isNewUser
    ? []
    : [
        {
          id: 'QT-2025-0436',
          customer: 'Ahmed Al Mansoori',
          phone: '050 123 4567',
          vehicle: 'Toyota Land Cruiser',
          plate: '2021 • GCC',
          service: 'Major Service',
          serviceDetail: '60,000 KM',
          labor: 'AED 650.00',
          parts: 'AED 1,250.00',
          tax: 'AED 190.00',
          total: 'AED 2,090.00',
          validUntil: 'May 31, 2025',
          validLeft: '10 days left',
          status: 'Sent',
          statusClass: 'bg-blue-100 text-blue-800 border-blue-200',
        },
        {
          id: 'QT-2025-0435',
          customer: 'Fatima Al Zaabi',
          phone: '050 987 6543',
          vehicle: 'Nissan Patrol',
          plate: '2019 • GCC',
          service: 'Brake Repair',
          serviceDetail: 'Front & Rear',
          labor: 'AED 300.00',
          parts: 'AED 650.00',
          tax: 'AED 47.50',
          total: 'AED 1,069.50',
          validUntil: 'May 28, 2025',
          validLeft: '7 days left',
          status: 'Accepted',
          statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'QT-2025-0434',
          customer: 'Khalid Al Reyami',
          phone: '055 456 7890',
          vehicle: 'Hyundai Sonata',
          plate: '2020 • GCC',
          service: 'AC Service',
          serviceDetail: 'Full System',
          labor: 'AED 180.00',
          parts: 'AED 420.00',
          tax: 'AED 30.00',
          total: 'AED 630.00',
          validUntil: 'May 25, 2025',
          validLeft: '4 days left',
          status: 'Draft',
          statusClass: 'bg-amber-100 text-amber-800 border-amber-200',
        },
        {
          id: 'QT-2025-0433',
          customer: 'Sara Al Qasimi',
          phone: '050 654 3210',
          vehicle: 'BMW X5',
          plate: '2021 • GCC',
          service: 'Suspension Repair',
          serviceDetail: 'Front & Rear',
          labor: 'AED 750.00',
          parts: 'AED 2,100.00',
          tax: 'AED 142.50',
          total: 'AED 2,992.50',
          validUntil: 'May 24, 2025',
          validLeft: '3 days left',
          status: 'Sent',
          statusClass: 'bg-blue-100 text-blue-800 border-blue-200',
        },
        {
          id: 'QT-2025-0432',
          customer: 'Omar Al Hammi',
          phone: '052 233 5544',
          vehicle: 'Mitsubishi Pajero',
          plate: '2017 • GCC',
          service: 'Engine Diagnostic',
          serviceDetail: 'Full Scan',
          labor: 'AED 200.00',
          parts: 'AED 0.00',
          tax: 'AED 10.00',
          total: 'AED 210.00',
          validUntil: 'May 21, 2025',
          validLeft: '1 day left',
          status: 'Rejected',
          statusClass: 'bg-rose-100 text-rose-800 border-rose-200',
        },
      ];

  const [quotesList, setQuotesList] = useState(initialQuotes);
  const [selectedQuoteId, setSelectedQuoteId] = useState(initialQuotes[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newQuoteForm, setNewQuoteForm] = useState({
    customer: '',
    phone: '',
    vehicle: '',
    plate: '',
    service: 'Major Service',
    serviceDetail: 'Standard Diagnostic & Inspection',
    labor: '450',
    parts: '650',
    validityDays: '14',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const laborNum = parseFloat(newQuoteForm.labor) || 0;
    const partsNum = parseFloat(newQuoteForm.parts) || 0;
    const subtotal = laborNum + partsNum;
    const taxNum = subtotal * 0.05;
    const totalNum = subtotal + taxNum;

    const newId = `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuoteItem = {
      id: newId,
      customer: newQuoteForm.customer || 'Walk-in Customer',
      phone: newQuoteForm.phone || '+971 50 000 0000',
      vehicle: newQuoteForm.vehicle || 'Vehicle',
      plate: newQuoteForm.plate || '2024 • GCC',
      service: newQuoteForm.service,
      serviceDetail: newQuoteForm.serviceDetail,
      labor: `AED ${laborNum.toFixed(2)}`,
      parts: `AED ${partsNum.toFixed(2)}`,
      tax: `AED ${taxNum.toFixed(2)}`,
      total: `AED ${totalNum.toFixed(2)}`,
      validUntil: `In ${newQuoteForm.validityDays} Days`,
      validLeft: `${newQuoteForm.validityDays} days left`,
      status: 'Sent',
      statusClass: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    setQuotesList([newQuoteItem, ...quotesList]);
    setSelectedQuoteId(newId);
    setIsCreateModalOpen(false);
    showToast(language === 'ar' ? `تم إصدار عرض السعر ${newId} بنجاح!` : `Quote ${newId} created and sent successfully!`);
    // Reset Form
    setNewQuoteForm({
      customer: '',
      phone: '',
      vehicle: '',
      plate: '',
      service: 'Major Service',
      serviceDetail: 'Standard Diagnostic & Inspection',
      labor: '450',
      parts: '650',
      validityDays: '14',
    });
  };

  // 1. KPI Cards matching Image 3
  const kpis = quotesList.length === 0 ? [
    { label: 'Draft Quotes', value: '0', change: '0% vs last month', isUp: false, icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'Sent Quotes', value: '0', change: '0% vs last month', isUp: true, icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Accepted Quotes', value: '0', change: '0% vs last month', isUp: true, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected Quotes', value: '0', change: '0% vs last month', isUp: false, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Conversion Rate', value: '0%', change: '0% vs last month', isUp: true, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  ] : [
    { label: 'Draft Quotes', value: `${quotesList.filter(q => q.status === 'Draft').length}`, change: '-12% vs last month', isUp: false, icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'Sent Quotes', value: `${quotesList.filter(q => q.status === 'Sent').length}`, change: '+12% vs last month', isUp: true, icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Accepted Quotes', value: `${quotesList.filter(q => q.status === 'Accepted').length}`, change: '+25% vs last month', isUp: true, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected Quotes', value: `${quotesList.filter(q => q.status === 'Rejected').length}`, change: '-5% vs last month', isUp: false, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Conversion Rate', value: '75%', change: '+5% vs last month', isUp: true, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  // Filtered quotes
  const filteredQuotes = quotesList.filter((q) => {
    const matchSearch =
      q.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || q.status === statusFilter;
    const matchService = serviceFilter === 'All' || q.service.toLowerCase().includes(serviceFilter.toLowerCase());
    return matchSearch && matchStatus && matchService;
  });

  const activeQuote = quotesList.find((q) => q.id === selectedQuoteId) || quotesList[0];

  // Detailed Services in Selected Quote
  const laborItems = [
    { num: 1, title: 'Engine Oil & Filter Change', desc: 'Replace engine oil and oil filter', cost: '130.00' },
    { num: 2, title: 'Air Filter Replacement', desc: 'Replace engine air filter', cost: '60.00' },
    { num: 3, title: 'AC Filter Replacement', desc: 'Replace cabin AC filter', cost: '40.00' },
    { num: 4, title: 'Brake Inspection & Cleaning', desc: 'Inspect & clean brake system', cost: '140.00' },
    { num: 5, title: 'Multi-point Vehicle Inspection', desc: 'Comprehensive vehicle inspection', cost: '280.00' },
  ];

  // Detailed Parts in Selected Quote
  const partsItems = [
    { num: 1, name: 'Engine Oil (5W-30)', desc: 'Fully Synthetic', qty: 6, unitPrice: '55.00', total: '330.00' },
    { num: 2, name: 'Oil Filter', desc: 'Genuine Part', qty: 1, unitPrice: '65.00', total: '65.00' },
    { num: 3, name: 'Air Filter', desc: 'Genuine Part', qty: 1, unitPrice: '120.00', total: '120.00' },
    { num: 4, name: 'AC Filter', desc: 'Genuine Part', qty: 1, unitPrice: '90.00', total: '90.00' },
    { num: 5, name: 'Brake Cleaner (500ml)', desc: 'High Quality', qty: 1, unitPrice: '45.00', total: '45.00' },
    { num: 6, name: 'Misc. Consumables', desc: 'Grease, washers, etc.', qty: 1, unitPrice: '600.00', total: '600.00' },
  ];

  // Recommended Add-Ons
  const addOns = [
    { name: 'Fuel System Cleaner', desc: 'Improves engine performance', price: 'AED 80.00' },
    { name: 'Throttle Body Cleaning', desc: 'Enhances throttle response', price: 'AED 120.00' },
    { name: 'Wheel Alignment', desc: 'Better handling & safety', price: 'AED 150.00' },
    { name: 'Nitrogen Tire Fill', desc: 'Better tire pressure stability', price: 'AED 40.00' },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Breadcrumb & Create Quote */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'عروض الأسعار والتقديرات' : 'Quotes & Estimates'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Home &gt; Quotes & Estimates • Create, manage and track all your customer quotes & estimates.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ar' ? 'إنشاء عرض سعر جديد' : '+ Create New Quote'}</span>
        </button>
      </div>

      {/* 2. 5 KPI Cards matching Image 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[10px] font-bold">
                <span className={kpi.isUp ? 'text-emerald-600' : 'text-slate-400'}>{kpi.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Filters Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Quote ID, customer, vehicle or service..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Draft">Draft</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All">All Services</option>
              <option value="Major">Major Service</option>
              <option value="Brake">Brake Repair</option>
              <option value="AC">AC Service</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setServiceFilter('All');
                showToast('Filters reset to default.');
              }}
              className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={() => showToast('Quotes list exported as CSV / Excel successfully!')}
              className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. All Quotes Table matching Image 3 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">
            All Quotes ({filteredQuotes.length})
          </h3>
          <button
            onClick={() => showToast('Quotes list exported as CSV / Excel successfully!')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            Export →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-3 text-start">Quote ID</th>
                <th className="py-3 px-3 text-start">Customer</th>
                <th className="py-3 px-3 text-start">Vehicle</th>
                <th className="py-3 px-3 text-start">Service</th>
                <th className="py-3 px-3 text-end">Labor Cost</th>
                <th className="py-3 px-3 text-end">Parts Cost</th>
                <th className="py-3 px-3 text-end">Tax</th>
                <th className="py-3 px-3 text-end">Total</th>
                <th className="py-3 px-3 text-start">Valid Until</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900">
                          {language === 'ar' ? 'لا توجد عروض أسعار حالياً' : 'No Quotations Found'}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {language === 'ar'
                            ? 'يمكنك إعداد وإرسال عروض أسعار تفصيلية لقطع الغيار وأجور اليد للعملاء أو الرد على طلبات التسعير (RFQs).'
                            : 'Prepare and send itemized quotes for labor, spare parts, and diagnostic estimates to customers.'}
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => setIsCreateModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'إنشاء عرض سعر جديد' : '+ Create New Quote'}</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => setSelectedQuoteId(q.id)}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      selectedQuoteId === q.id ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3 font-black text-blue-600 whitespace-nowrap">{q.id}</td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <strong className="font-bold text-slate-900 block">{q.customer}</strong>
                      <span className="text-[10px] text-slate-400 block">{q.phone}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <strong className="font-bold text-slate-800 block">{q.vehicle}</strong>
                      <span className="text-[10px] text-slate-400 block">{q.plate}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-slate-800 block">{q.service}</span>
                      <span className="text-[10px] text-slate-400 block">{q.serviceDetail}</span>
                    </td>
                    <td className="py-3.5 px-3 text-end font-medium whitespace-nowrap">{q.labor}</td>
                    <td className="py-3.5 px-3 text-end font-medium whitespace-nowrap">{q.parts}</td>
                    <td className="py-3.5 px-3 text-end font-medium whitespace-nowrap">{q.tax}</td>
                    <td className="py-3.5 px-3 text-end font-black text-slate-900 whitespace-nowrap">{q.total}</td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-slate-800 block text-[11px]">{q.validUntil}</span>
                      <span className="text-[10px] text-slate-400 block">{q.validLeft}</span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${q.statusClass}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedQuoteId(q.id);
                          showToast(`Viewing details for quote ${q.id}`);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Quote Preview Detailed View */}
      {activeQuote && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6">
          {/* Quote Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-900">Quote Preview: {activeQuote.id}</h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${activeQuote.statusClass}`}>
                    {activeQuote.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Created recently • Real-time Sync</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-end">
                <span className="text-[10px] text-slate-400 font-bold block">Valid Until: {activeQuote.validUntil}</span>
                <strong className="text-xl font-black text-slate-900">{activeQuote.total}</strong>
              </div>
              <button
                onClick={() => showToast(`Reminder SMS & WhatsApp sent to ${activeQuote.customer} (${activeQuote.phone})`)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Reminder</span>
              </button>
            </div>
          </div>

          {/* 3 Overview Cards: Customer, Vehicle, Service */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Customer Details</span>
              <strong className="text-sm font-black text-slate-900 block">{activeQuote.customer}</strong>
              <span className="text-slate-600 block">{activeQuote.phone}</span>
              <span className="text-slate-500 block">customer@example.com</span>
              <span className="text-slate-400 block text-[10px]">Al Warqa, Dubai, UAE</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Vehicle Details</span>
              <strong className="text-sm font-black text-slate-900 block">{activeQuote.vehicle}</strong>
              <span className="text-slate-600 block">{activeQuote.plate}</span>
              <span className="text-slate-500 block font-mono text-[10px]">VIN: JT111HY03J882255156</span>
              <span className="text-slate-400 block text-[10px]">Odometer: 58,450 KM</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Service Details</span>
              <strong className="text-sm font-black text-slate-900 block">{activeQuote.service}</strong>
              <span className="text-slate-600 block">Workshop: {user?.name || 'AHL Al Markabat Garage'}</span>
              <span className="text-slate-500 block">Advisor: Service Desk</span>
            </div>
          </div>

          {/* Services & Spare Parts Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Services Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-xs">
                <span>Services (Labor)</span>
                <span>Labor Cost (AED)</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {laborItems.map((item) => (
                  <div key={item.num} className="p-2.5 flex items-center justify-between">
                    <div>
                      <strong className="font-bold text-slate-900 block">{item.title}</strong>
                      <span className="text-[10px] text-slate-400">{item.desc}</span>
                    </div>
                    <strong className="font-bold text-slate-800">{item.cost}</strong>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between font-black text-xs">
                <span>Total Labor Cost</span>
                <span>{activeQuote.labor}</span>
              </div>
            </div>

            {/* Spare Parts Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-xs">
                <span>Spare Parts</span>
                <span>Total (AED)</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {partsItems.map((part) => (
                  <div key={part.num} className="p-2.5 flex items-center justify-between">
                    <div>
                      <strong className="font-bold text-slate-900 block">{part.name}</strong>
                      <span className="text-[10px] text-slate-400">Qty: {part.qty} @ AED {part.unitPrice}</span>
                    </div>
                    <strong className="font-bold text-slate-800">{part.total}</strong>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between font-black text-xs">
                <span>Total Parts Cost</span>
                <span>{activeQuote.parts}</span>
              </div>
            </div>
          </div>

          {/* Summary, Terms, Approval Workflow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            {/* Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-black text-slate-900">Summary</h4>
              <div className="flex justify-between text-slate-600">
                <span>Labor Cost</span>
                <span>{activeQuote.labor}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Parts Cost</span>
                <span>{activeQuote.parts}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT (5%)</span>
                <span>{activeQuote.tax}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-blue-600">{activeQuote.total}</span>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-black text-slate-900">Terms & Conditions</h4>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>This quote is valid until the date mentioned above.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prices are inclusive of VAT.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Work will commence after quote acceptance.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Warranty as per workshop policy.</span>
                </li>
              </ul>
            </div>

            {/* Approval Workflow */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h4 className="font-black text-slate-900">Approval Workflow</h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quote Created • Valid & Active</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 font-bold">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Available on Customer Portal</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Status</span>
                  <strong className="text-xs font-bold text-slate-800">{activeQuote.status}</strong>
                </div>
                <button
                  onClick={() => {
                    const updated = quotesList.map((q) =>
                      q.id === activeQuote.id ? { ...q, status: 'Accepted', statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' } : q
                    );
                    setQuotesList(updated);
                    showToast(`Quote ${activeQuote.id} marked as Accepted!`);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Mark as Accepted
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Add-Ons */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black text-slate-900">Recommended Add-Ons</h4>
              <span className="text-[11px] font-bold text-slate-500">Quick Upsells</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {addOns.map((add, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <strong className="font-bold text-slate-900 block">{add.name}</strong>
                    <span className="text-[10px] text-slate-400">{add.desc}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                    <strong className="text-slate-900 font-bold">{add.price}</strong>
                    <button
                      onClick={() => showToast(`Added "${add.name}" to Quote ${activeQuote.id}`)}
                      className="px-2 py-0.5 bg-amber-400 hover:bg-amber-500 rounded text-[10px] font-black text-slate-950 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Create New Quote Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Create New Quotation</h3>
                  <p className="text-[11px] text-slate-500">Enter customer and repair estimate details</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newQuoteForm.customer}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, customer: e.target.value })}
                    placeholder="e.g. Mohammed Al Hashmi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newQuoteForm.phone}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, phone: e.target.value })}
                    placeholder="050 123 4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Make & Model *</label>
                  <input
                    type="text"
                    required
                    value={newQuoteForm.vehicle}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, vehicle: e.target.value })}
                    placeholder="e.g. Toyota Land Cruiser 2022"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Plate Number / Year</label>
                  <input
                    type="text"
                    value={newQuoteForm.plate}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, plate: e.target.value })}
                    placeholder="e.g. Dubai A 12345"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Service *</label>
                  <select
                    value={newQuoteForm.service}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Major Service">Major Service (60k KM)</option>
                    <option value="Brake Repair">Brake Repair & Pads</option>
                    <option value="AC Maintenance">AC System Service</option>
                    <option value="Suspension Repair">Suspension Overhaul</option>
                    <option value="Engine Diagnostic">Full Engine Diagnostic</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quote Validity (Days)</label>
                  <input
                    type="number"
                    value={newQuoteForm.validityDays}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, validityityDays: e.target.value } as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Labor Cost (AED)</label>
                  <input
                    type="number"
                    value={newQuoteForm.labor}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, labor: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Parts Cost (AED)</label>
                  <input
                    type="number"
                    value={newQuoteForm.parts}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, parts: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Estimated Total (Incl. 5% VAT):</span>
                <span className="text-sm font-black text-blue-600">
                  AED {(((parseFloat(newQuoteForm.labor) || 0) + (parseFloat(newQuoteForm.parts) || 0)) * 1.05).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Generate & Send Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'ارفع مبيعاتك مع أهل المركبات' : 'Grow Your Business with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            Create professional quotes, convert more customers, and track approval in real time.
          </p>
        </div>
      </div>
    </div>
  );
};
