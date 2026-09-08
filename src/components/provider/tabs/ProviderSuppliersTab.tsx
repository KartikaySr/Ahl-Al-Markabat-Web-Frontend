import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Building2,
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  XCircle,
  Truck,
  AlertCircle,
  X,
} from 'lucide-react';

interface ProviderSuppliersTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderSuppliersTab: React.FC<ProviderSuppliersTabProps> = ({ onNavigateTab }) => {
  const { language, formatPrice, user, jobs, placedBookings } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const initialSuppliers = isNewUser
    ? []
    : [
        { id: 1, name: 'AutoParts Direct', cat: 'Filters, Spark Plugs, Belts', contact: 'Kareem Nader', phone: '+971 4 333 1122', email: 'orders@autopartsdirect.ae', rating: 4.8, orders: 48, spend: 'AED 45,200', activePOs: 2 },
        { id: 2, name: 'Brembo Middle East', cat: 'Brake Pads, Rotors, Calipers', contact: 'Marco Rossi', phone: '+971 4 888 4455', email: 'sales@brembome.com', rating: 4.9, orders: 36, spend: 'AED 62,800', activePOs: 1 },
        { id: 3, name: 'Lube Solutions Co.', cat: 'Synthetic Oils, Fluids, Grease', contact: 'Tariq Mansoor', phone: '+971 4 222 7788', email: 'supply@lubesolutions.ae', rating: 4.7, orders: 52, spend: 'AED 38,400', activePOs: 1 },
        { id: 4, name: 'Denso Arabia', cat: 'AC Compressors, Alternators, Starters', contact: 'Kenji Tanaka', phone: '+971 4 555 9900', email: 'gulf@denso-arabia.com', rating: 4.9, orders: 28, spend: 'AED 54,100', activePOs: 0 },
        { id: 5, name: 'Gulf Battery Hub', cat: 'Car Batteries, Terminals, Chargers', contact: 'Rashid Al Nuaimi', phone: '+971 4 444 3322', email: 'sales@gulfbattery.ae', rating: 4.6, orders: 40, spend: 'AED 29,600', activePOs: 1 },
      ];

  const initialPOs = isNewUser
    ? []
    : [
        { id: 'PO-2025-0847', supplier: 'AutoParts Direct', items: 'Oil Filters (50), Air Filters (30)', date: 'May 30, 2025', amount: 'AED 4,850', status: 'Delivered', color: 'bg-emerald-100 text-emerald-800' },
        { id: 'PO-2025-0846', supplier: 'Brembo Middle East', items: 'Brake Pads Front (20 sets), Rotors (10)', date: 'May 28, 2025', amount: 'AED 8,600', status: 'In Transit', color: 'bg-blue-100 text-blue-800' },
        { id: 'PO-2025-0845', supplier: 'Lube Solutions Co.', items: 'Synthetic 5W-30 (100L), ATF (40L)', date: 'May 25, 2025', amount: 'AED 6,200', status: 'Approved', color: 'bg-amber-100 text-amber-800' },
        { id: 'PO-2025-0844', supplier: 'Gulf Battery Hub', items: 'AGM Batteries 70Ah (15), 90Ah (10)', date: 'May 22, 2025', amount: 'AED 11,400', status: 'Delivered', color: 'bg-emerald-100 text-emerald-800' },
        { id: 'PO-2025-0843', supplier: 'Denso Arabia', items: 'AC Compressors (4), Cabin Filters (30)', date: 'May 20, 2025', amount: 'AED 9,800', status: 'Pending', color: 'bg-slate-100 text-slate-700' },
      ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [poList, setPoList] = useState(initialPOs);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isNewPOModalOpen, setIsNewPOModalOpen] = useState(false);
  const [newPOForm, setNewPOForm] = useState({
    supplier: 'AutoParts Direct',
    items: '',
    amount: '3500',
    status: 'Pending',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newPO = {
      id: newId,
      supplier: newPOForm.supplier,
      items: newPOForm.items || 'General Spare Parts & Consumables',
      date: todayStr,
      amount: `AED ${parseFloat(newPOForm.amount || '0').toLocaleString()}`,
      status: newPOForm.status,
      color:
        newPOForm.status === 'Delivered'
          ? 'bg-emerald-100 text-emerald-800'
          : newPOForm.status === 'In Transit'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-amber-100 text-amber-800',
    };

    setPoList([newPO, ...poList]);
    setIsNewPOModalOpen(false);
    showToast(`Purchase Order ${newId} created successfully!`);
    setNewPOForm({
      supplier: 'AutoParts Direct',
      items: '',
      amount: '3500',
      status: 'Pending',
    });
  };

  const kpis = poList.length === 0 ? [
    { label: 'Active Suppliers', value: '0', change: '0% vs last month', icon: Building2 },
    { label: 'Active POs', value: '0', change: '0 POs in progress', icon: FileText },
    { label: 'Pending Delivery', value: '0', change: '0 shipments', icon: Clock },
    { label: 'Monthly Procurement', value: 'AED 0.00', change: '0% vs last month', icon: DollarSign },
    { label: 'Supplier Rating', value: '5.0★', change: 'Top Tier Quality', icon: TrendingUp },
  ] : [
    { label: 'Active Suppliers', value: `${suppliers.length}`, change: '+2 new this month', icon: Building2 },
    { label: 'Active POs', value: `${poList.filter(p => p.status !== 'Delivered').length}`, change: '3 in progress', icon: FileText },
    { label: 'Pending Delivery', value: `${poList.filter(p => p.status === 'In Transit' || p.status === 'Pending').length}`, change: 'Expected this week', icon: Clock },
    { label: 'Monthly Procurement', value: 'AED 40,850', change: '+12.4% vs last month', icon: DollarSign },
    { label: 'Supplier Rating', value: '4.8★', change: 'Top Tier Quality', icon: TrendingUp },
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

      {/* 1. Header with Breadcrumb & Create PO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'الموردين وأوامر الشراء' : 'Suppliers & Purchase Orders'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dashboard &gt; Procurement &gt; Suppliers &amp; POs • Manage suppliers, track purchase orders, and monitor procurement performance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Procurement summary report generated!')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Report</span>
          </button>

          <button
            onClick={() => setIsNewPOModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Purchase Order</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{kpi.label}</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[10px] font-bold text-emerald-600">
                ▲ {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Supplier Directory Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            {language === 'ar' ? 'دليل الموردين' : 'Supplier Directory'}
          </h3>
          <button
            onClick={() => showToast('Showing all registered verified suppliers')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            {language === 'ar' ? 'عرض جميع الموردين ←' : 'View All Suppliers →'}
          </button>
        </div>

        {suppliers.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-2xs text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              {language === 'ar' ? 'لا يوجد موردين مضافين حالياً' : 'No Suppliers Connected Yet'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'ar'
                ? 'اربط ورشتك بالموردين المعتمدين لقطع الغيار الأصلية والمستوردة لتسهيل الشراء الفوري.'
                : 'Connect with verified OEM and aftermarket auto parts suppliers for direct purchase orders.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-black text-slate-900 block">{s.name}</strong>
                    <span className="text-[11px] text-slate-500">{s.cat}</span>
                  </div>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-black text-[10px] border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {s.rating}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">Active POs: <strong className="text-slate-900 font-bold">{s.activePOs}</strong></span>
                  <button
                    onClick={() => {
                      setNewPOForm({ ...newPOForm, supplier: s.name });
                      setIsNewPOModalOpen(true);
                    }}
                    className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-lg cursor-pointer"
                  >
                    + Create PO
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Recent Purchase Orders */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">Purchase Orders History ({poList.length})</h3>
          <button
            onClick={() => showToast('PO history exported!')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            Export All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4 text-start">PO Number</th>
                <th className="py-3 px-4 text-start">Supplier</th>
                <th className="py-3 px-4 text-start">Items Ordered</th>
                <th className="py-3 px-4 text-start">Order Date</th>
                <th className="py-3 px-4 text-end">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {poList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    No purchase orders recorded yet.
                  </td>
                </tr>
              ) : (
                poList.map((po, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">{po.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{po.supplier}</td>
                    <td className="py-3 px-4 text-slate-600">{po.items}</td>
                    <td className="py-3 px-4 text-slate-500">{po.date}</td>
                    <td className="py-3 px-4 text-end font-black text-slate-900">{po.amount}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${po.color}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => showToast(`Tracking details loaded for ${po.id}`)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. New Purchase Order Modal */}
      {isNewPOModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Create Purchase Order (PO)</h3>
                  <p className="text-[11px] text-slate-500">Procure parts directly from suppliers</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewPOModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Supplier *</label>
                <select
                  value={newPOForm.supplier}
                  onChange={(e) => setNewPOForm({ ...newPOForm, supplier: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                >
                  <option value="AutoParts Direct">AutoParts Direct (Filters, Spark Plugs)</option>
                  <option value="Brembo Middle East">Brembo Middle East (Brake Systems)</option>
                  <option value="Lube Solutions Co.">Lube Solutions Co. (Oils & Fluids)</option>
                  <option value="Denso Arabia">Denso Arabia (AC & Electrical)</option>
                  <option value="Gulf Battery Hub">Gulf Battery Hub (Batteries)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Items Description & Quantities *</label>
                <textarea
                  required
                  rows={3}
                  value={newPOForm.items}
                  onChange={(e) => setNewPOForm({ ...newPOForm, items: e.target.value })}
                  placeholder="e.g. 20x Oil Filters, 10x Front Brake Pads, 5x Mobil 1 Synthetic 5W-30 (4L)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Amount (AED) *</label>
                  <input
                    type="number"
                    required
                    value={newPOForm.amount}
                    onChange={(e) => setNewPOForm({ ...newPOForm, amount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
                  <select
                    value={newPOForm.status}
                    onChange={(e) => setNewPOForm({ ...newPOForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Pending">Pending Approval</option>
                    <option value="Approved">Approved & Sent</option>
                    <option value="In Transit">In Transit</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewPOModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Submit Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
