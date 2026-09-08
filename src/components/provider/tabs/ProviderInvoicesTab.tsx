import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  DollarSign,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Printer,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Building2,
  Calendar,
  Eye,
  Check,
  Zap,
  X,
} from 'lucide-react';

interface ProviderInvoicesTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderInvoicesTab: React.FC<ProviderInvoicesTabProps> = ({ onNavigateTab }) => {
  const { language, user, jobs, placedBookings } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const initialInvoices = isNewUser
    ? []
    : [
        { id: 'INV-2025-1248', customer: 'Omar A.', phone: '+970 59 123 4567', vehicle: 'Toyota Camry 2021', plate: '6-1234-PA', service: 'AC Repair', issueDate: 'May 31, 2025', dueDate: 'Jun 15, 2025', subtotal: 320, vat: 'AED 32', total: 'AED 352', status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' },
        { id: 'INV-2025-1247', customer: 'Ahmed R.', phone: '+970 59 765 4321', vehicle: 'Hyundai Tucson 2021', plate: '7-4321-B', service: 'General Service', issueDate: 'May 30, 2025', dueDate: 'Jun 13, 2025', subtotal: 420, vat: 'AED 42', total: 'AED 462', status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' },
        { id: 'INV-2025-1246', customer: 'Sara M.', phone: '+970 59 999 8888', vehicle: 'Nissan Patrol 2019', plate: '3-9876-C', service: 'Brake Service', issueDate: 'May 30, 2025', dueDate: 'Jun 14, 2025', subtotal: 330, vat: 'AED 33', total: 'AED 363', status: 'Pending', statusClass: 'bg-amber-100 text-amber-800' },
        { id: 'INV-2025-1245', customer: 'Yousef K.', phone: '+970 59 222 3333', vehicle: 'Kia Sportage 2022', plate: '5-5555-D', service: 'Oil Change', issueDate: 'May 29, 2025', dueDate: 'Jun 12, 2025', subtotal: 200, vat: 'AED 20', total: 'AED 220', status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' },
        { id: 'INV-2025-1244', customer: 'Lina M.', phone: '+970 59 444 1111', vehicle: 'Mitsubishi Pajero 2020', plate: '8-1122-E', service: 'Transmission Service', issueDate: 'May 29, 2025', dueDate: 'Jun 13, 2025', subtotal: 900, vat: 'AED 95', total: 'AED 995', status: 'Pending', statusClass: 'bg-amber-100 text-amber-800' },
        { id: 'INV-2025-1243', customer: 'Rami T.', phone: '+970 59 777 6666', vehicle: 'BMW 520i 2019', plate: '1-6677-F', service: 'Diagnostics', issueDate: 'May 28, 2025', dueDate: 'Jun 11, 2025', subtotal: 180, vat: 'AED 19', total: 'AED 199', status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' },
        { id: 'INV-2025-1242', customer: 'Khalid S.', phone: '+970 59 333 4444', vehicle: 'Mercedes C200 2021', plate: '4-3344-G', service: 'AC Repair', issueDate: 'May 28, 2025', dueDate: 'Jun 10, 2025', subtotal: 450, vat: 'AED 47', total: 'AED 497', status: 'Overdue', statusClass: 'bg-rose-100 text-rose-800' },
        { id: 'INV-2025-1241', customer: 'Fatima N.', phone: '+970 59 888 2222', vehicle: 'Honda Civic 2022', plate: '2-2288-H', service: 'Battery Service', issueDate: 'May 27, 2025', dueDate: 'Jun 10, 2025', subtotal: 230, vat: 'AED 23', total: 'AED 253', status: 'Pending', statusClass: 'bg-amber-100 text-amber-800' },
        { id: 'INV-2025-1240', customer: 'Ali M.', phone: '+970 59 555 7777', vehicle: 'Ford Explorer 2020', plate: '9-7755-J', service: 'General Service', issueDate: 'May 27, 2025', dueDate: 'Jun 9, 2025', subtotal: 340, vat: 'AED 34', total: 'AED 374', status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' },
        { id: 'INV-2025-1239', customer: 'Hassan A.', phone: '+970 59 111 9999', vehicle: 'Chevrolet Tahoe 2021', plate: '7-9911-K', service: 'Engine Repair', issueDate: 'May 26, 2025', dueDate: 'Jun 9, 2025', subtotal: 1100, vat: 'AED 123', total: 'AED 1,223', status: 'Overdue', statusClass: 'bg-rose-100 text-rose-800' },
      ];

  const [invoicesList, setInvoicesList] = useState(initialInvoices);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(initialInvoices[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal & Form State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    customer: '',
    phone: '',
    vehicle: '',
    service: 'General Service',
    subtotal: '350',
    status: 'Paid',
    dueDateDays: '14',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const subNum = parseFloat(newInvoiceForm.subtotal) || 0;
    const vatNum = subNum * 0.05;
    const totalNum = subNum + vatNum;

    const newId = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const due = new Date();
    due.setDate(due.getDate() + parseInt(newInvoiceForm.dueDateDays || '14', 10));
    const dueStr = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newInv = {
      id: newId,
      customer: newInvoiceForm.customer || 'Walk-in Customer',
      phone: newInvoiceForm.phone || '+971 50 123 4567',
      vehicle: newInvoiceForm.vehicle || 'Standard Vehicle',
      plate: '12345 • GCC',
      service: newInvoiceForm.service,
      issueDate: todayStr,
      dueDate: dueStr,
      subtotal: subNum,
      vat: `AED ${vatNum.toFixed(2)}`,
      total: `AED ${totalNum.toFixed(2)}`,
      status: newInvoiceForm.status,
      statusClass:
        newInvoiceForm.status === 'Paid'
          ? 'bg-emerald-100 text-emerald-800'
          : newInvoiceForm.status === 'Pending'
          ? 'bg-amber-100 text-amber-800'
          : 'bg-rose-100 text-rose-800',
    };

    setInvoicesList([newInv, ...invoicesList]);
    setSelectedInvoiceId(newId);
    setIsCreateModalOpen(false);
    showToast(`Invoice ${newId} created successfully!`);
    setNewInvoiceForm({
      customer: '',
      phone: '',
      vehicle: '',
      service: 'General Service',
      subtotal: '350',
      status: 'Paid',
      dueDateDays: '14',
    });
  };

  const filteredInvoices = invoicesList.filter((inv) => {
    const matchQuery =
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchQuery && matchStatus;
  });

  const activeInvoice = invoicesList.find((i) => i.id === selectedInvoiceId) || invoicesList[0];

  const totalBilled = invoicesList.reduce((acc, curr) => {
    const num = parseFloat(curr.total.replace(/[^0-9.]/g, '')) || 0;
    return acc + num;
  }, 0);

  const kpis = invoicesList.length === 0 ? [
    { label: 'Total Invoices', value: '0', change: '0% vs last month', isUp: true, icon: FileText },
    { label: 'Paid Invoices', value: '0', change: '0% vs last month', isUp: true, icon: CheckCircle2 },
    { label: 'Pending Invoices', value: '0', change: '0% vs last month', isUp: true, icon: Clock },
    { label: 'Overdue Invoices', value: '0', change: '0% vs last month', isDanger: false, isUp: true, icon: AlertTriangle },
    { label: 'Total Billed Revenue', value: 'AED 0.00', change: '0% vs last month', isUp: true, icon: DollarSign },
  ] : [
    { label: 'Total Invoices', value: `${invoicesList.length}`, change: '+12.5% vs last month', isUp: true, icon: FileText },
    { label: 'Paid Invoices', value: `${invoicesList.filter(i => i.status === 'Paid').length}`, change: '+15.2% vs last month', isUp: true, icon: CheckCircle2 },
    { label: 'Pending Invoices', value: `${invoicesList.filter(i => i.status === 'Pending').length}`, change: '+6.1% vs last month', isUp: true, icon: Clock },
    { label: 'Overdue Invoices', value: `${invoicesList.filter(i => i.status === 'Overdue').length}`, change: 'Active', isDanger: true, isUp: false, icon: AlertTriangle },
    { label: 'Total Billed Revenue', value: `AED ${totalBilled.toLocaleString()}`, change: '+18.7% vs last month', isUp: true, icon: DollarSign },
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

      {/* 1. Header with Breadcrumb & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'الفواتير والعمليات المالية' : 'Invoices & Billing'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dashboard &gt; Invoices & Billing • Manage invoices, payments, and billing operations with ease.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              if (activeInvoice) {
                showToast(`Invoice ${activeInvoice.id} sent to ${activeInvoice.customer} via Email & SMS!`);
              } else {
                showToast('Please select or create an invoice first.');
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Invoice</span>
          </button>
          <button
            onClick={() => showToast('Full billing tax report downloaded as PDF / Excel!')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Invoice</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Cards matching Image 5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${kpi.isDanger ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[10px] font-bold">
                <span className={kpi.isDanger ? 'text-rose-600' : 'text-emerald-600'}>
                  ▲ {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Invoices Table (Left 2/3) & Selected Invoice Preview (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-xs font-black text-slate-900">Invoices ({filteredInvoices.length})</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search invoice ID, customer..."
                  className="bg-slate-50 border border-slate-200 rounded-lg ps-8 pe-2.5 py-1 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-3 px-3 text-start">Invoice ID</th>
                  <th className="py-3 px-3 text-start">Customer</th>
                  <th className="py-3 px-3 text-start">Vehicle</th>
                  <th className="py-3 px-3 text-start">Service</th>
                  <th className="py-3 px-3 text-end">Total</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                          <FileText className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-black text-slate-900">
                            {language === 'ar' ? 'لا توجد فواتير مطابقة' : 'No Invoices Found'}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {language === 'ar'
                              ? 'يمكنك إنشاء فواتير ضريبية معتمدة عند إكمال أوامر العمل أو للخدمات المباشرة مع احتساب ضريبة القيمة المضافة تلقائياً.'
                              : 'Generate tax-compliant VAT invoices for completed work orders, parts sales, and direct walk-in customers.'}
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'إنشاء فاتورة جديدة' : '+ Create First Invoice'}</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedInvoiceId(inv.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedInvoiceId === inv.id ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-blue-600 whitespace-nowrap">{inv.id}</td>
                      <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-900">{inv.customer}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">{inv.vehicle}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">{inv.service}</td>
                      <td className="py-3 px-3 text-end font-black text-slate-900 whitespace-nowrap">{inv.total}</td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${inv.statusClass}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoiceId(inv.id);
                            showToast(`Loaded invoice ${inv.id}`);
                          }}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold text-[10px] cursor-pointer"
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

        {/* Invoice Preview Card (Right 1/3) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
          {!activeInvoice ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'حدد فاتورة لمعاينة التفاصيل وإصدار الإيصال' : 'Select an invoice to preview summary & VAT details'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-900">Invoice Preview</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${activeInvoice.statusClass}`}>
                    {activeInvoice.status === 'Paid' ? '✓ Paid' : activeInvoice.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Invoice Number</span>
                  <strong className="text-sm font-mono font-black text-blue-600 block">{activeInvoice.id}</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Issue Date:</span>
                    <strong className="text-slate-800">{activeInvoice.issueDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <strong className="text-slate-800">{activeInvoice.dueDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <strong className="text-slate-800">{activeInvoice.customer}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <strong className="text-slate-800">{activeInvoice.vehicle}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <strong className="text-slate-800">{activeInvoice.service}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>AED {(typeof activeInvoice.subtotal === 'number' ? activeInvoice.subtotal : 320).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>VAT (5%):</span>
                    <span>{activeInvoice.vat}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-200">
                    <span>Total:</span>
                    <span className="text-blue-600">{activeInvoice.total}</span>
                  </div>
                </div>

                {/* Status Stamp / Action */}
                <div
                  className={`p-3 rounded-xl border text-center space-y-0.5 ${
                    activeInvoice.status === 'Paid'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : activeInvoice.status === 'Pending'
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <span className="font-black text-sm uppercase tracking-widest block">{activeInvoice.status}</span>
                  <span className="text-[10px] block">
                    {activeInvoice.status === 'Paid'
                      ? 'Payment verified via Online / Card'
                      : `Due on ${activeInvoice.dueDate}`}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {activeInvoice.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      const updated = invoicesList.map((i) =>
                        i.id === activeInvoice.id ? { ...i, status: 'Paid', statusClass: 'bg-emerald-100 text-emerald-800' } : i
                      );
                      setInvoicesList(updated);
                      showToast(`Invoice ${activeInvoice.id} marked as Paid!`);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Mark as Paid
                  </button>
                )}
                <button
                  onClick={() => showToast(`Full invoice details opened for ${activeInvoice.id}`)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  View Full Invoice
                </button>
                <button
                  onClick={() => showToast(`PDF receipt for ${activeInvoice.id} generated and downloaded!`)}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Recurring Fleet Invoices */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">Recurring Fleet Invoices</h3>
          <button
            onClick={() => showToast('Viewing all 4 fleet recurring billing schedules')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th className="py-2.5 px-4 text-start">Fleet / Company</th>
                <th className="py-2.5 px-4 text-center">Vehicles</th>
                <th className="py-2.5 px-4 text-start">Next Invoice Date</th>
                <th className="py-2.5 px-4 text-start">Frequency</th>
                <th className="py-2.5 px-4 text-end">Amount (Est.)</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {isNewUser ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    {language === 'ar' ? 'لا توجد عقود أساطيل أو فواتير متكررة حالياً' : 'No recurring fleet contracts or automated billing schedules.'}
                  </td>
                </tr>
              ) : (
                [
                  { name: 'Rapid Fix Fleet', veh: '12 Vehicles', next: 'Jun 5, 2025', freq: 'Monthly', amt: 'AED 5,450', status: 'Active' },
                  { name: 'CityCare Logistics', veh: '6 Vehicles', next: 'Jun 7, 2025', freq: 'Monthly', amt: 'AED 6,320', status: 'Active' },
                  { name: 'PalAuto Fleet', veh: '95 Vehicles', next: 'Jun 18, 2025', freq: 'Monthly', amt: 'AED 11,780', status: 'Active' },
                  { name: 'Al Quds Transport', veh: '4 Vehicles', next: 'Jun 12, 2025', freq: 'Monthly', amt: 'AED 4,250', status: 'Paused' },
                ].map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{f.name}</td>
                    <td className="py-3 px-4 text-center font-medium">{f.veh}</td>
                    <td className="py-3 px-4">{f.next}</td>
                    <td className="py-3 px-4">{f.freq}</td>
                    <td className="py-3 px-4 text-end font-black text-slate-900">{f.amt}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          f.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Create New Invoice Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Create Tax Invoice</h3>
                  <p className="text-[11px] text-slate-500">Generate VAT compliant tax invoice</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceForm.customer}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, customer: e.target.value })}
                    placeholder="e.g. Salim Al Suwaidi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newInvoiceForm.phone}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, phone: e.target.value })}
                    placeholder="050 123 4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Description *</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceForm.vehicle}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, vehicle: e.target.value })}
                    placeholder="e.g. Nissan Patrol 2020"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Type</label>
                  <select
                    value={newInvoiceForm.service}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="AC Repair">AC Repair & Gas Fill</option>
                    <option value="Brake Service">Brake Replacement</option>
                    <option value="General Service">General Maintenance</option>
                    <option value="Oil Change">Engine Oil & Filters</option>
                    <option value="Diagnostics">Full Scan Diagnostics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subtotal Amount (AED) *</label>
                  <input
                    type="number"
                    required
                    value={newInvoiceForm.subtotal}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, subtotal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
                  <select
                    value={newInvoiceForm.status}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Paid">Paid (Cash/Card Received)</option>
                    <option value="Pending">Pending (Awaiting Payment)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Total Amount (+ 5% VAT):</span>
                <span className="text-sm font-black text-blue-600">
                  AED {((parseFloat(newInvoiceForm.subtotal) || 0) * 1.05).toFixed(2)}
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
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'قوّة أعمالك مع إدارة الفواتير الذكية' : 'Power Your Business with Smart Billing Management'}
          </h2>
          <p className="text-xs text-slate-300">
            Automated invoicing & reminders. Secure payments & real-time tracking. Seamless fleet billing solutions.
          </p>
        </div>
      </div>
    </div>
  );
};
