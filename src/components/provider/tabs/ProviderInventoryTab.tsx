import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Package,
  AlertTriangle,
  Clock,
  TrendingDown,
  DollarSign,
  Plus,
  Search,
  Filter,
  ArrowRightLeft,
  SlidersHorizontal,
  Upload,
  FileText,
  Building2,
  Calendar,
  CheckCircle2,
  X,
  Edit,
  Truck,
} from 'lucide-react';

interface ProviderInventoryTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderInventoryTab: React.FC<ProviderInventoryTabProps> = ({ onNavigateTab }) => {
  const { language, user, jobs, placedBookings } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const initialStockItems = isNewUser
    ? []
    : [
        { name: 'Oil Filter', sku: 'OF-204', brand: 'Bosch', cat: 'Filters', qty: 3, reorder: 5, supplier: 'AutoParts Direct', loc: 'Shelf A-12', status: 'Low Stock', color: 'bg-amber-100 text-amber-800' },
        { name: 'Brake Pads Front', sku: 'BP-088', brand: 'Brembo', cat: 'Brakes', qty: 2, reorder: 4, supplier: 'Brembo ME', loc: 'Shelf B-04', status: 'Low Stock', color: 'bg-amber-100 text-amber-800' },
        { name: 'Air Filter', sku: 'AF-112', brand: 'Bosch', cat: 'Filters', qty: 8, reorder: 4, supplier: 'AutoParts Direct', loc: 'Shelf A-14', status: 'In Stock', color: 'bg-emerald-100 text-emerald-800' },
        { name: 'Spark Plug Iridium', sku: 'SP-990', brand: 'NGK', cat: 'Ignition', qty: 1, reorder: 8, supplier: 'Gulf Spark Co.', loc: 'Shelf C-01', status: 'Low Stock', color: 'bg-rose-100 text-rose-800' },
        { name: 'Synthetic Oil 5W-30 (1L)', sku: 'OIL-530', brand: 'Mobil 1', cat: 'Fluids', qty: 24, reorder: 10, supplier: 'Lube Solutions', loc: 'Rack F-02', status: 'In Stock', color: 'bg-emerald-100 text-emerald-800' },
        { name: 'Cabin AC Filter', sku: 'CF-301', brand: 'Denso', cat: 'Filters', qty: 12, reorder: 6, supplier: 'Denso Arabia', loc: 'Shelf A-08', status: 'In Stock', color: 'bg-emerald-100 text-emerald-800' },
        { name: 'Brake Fluid DOT 4', sku: 'BF-400', brand: 'Castrol', cat: 'Fluids', qty: 6, reorder: 4, supplier: 'Lube Solutions', loc: 'Rack F-05', status: 'In Stock', color: 'bg-emerald-100 text-emerald-800' },
        { name: 'Wiper Blades 22"', sku: 'WB-220', brand: 'Bosch', cat: 'Exterior', qty: 15, reorder: 5, supplier: 'AutoParts Direct', loc: 'Shelf D-03', status: 'In Stock', color: 'bg-emerald-100 text-emerald-800' },
      ];

  const [stockItems, setStockItems] = useState(initialStockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);
  const [newPartForm, setNewPartForm] = useState({
    name: '',
    sku: '',
    brand: 'Bosch',
    cat: 'Filters',
    qty: '10',
    reorder: '4',
    supplier: 'AutoParts Direct',
    loc: 'Shelf A-01',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    const qtyNum = parseInt(newPartForm.qty, 10) || 0;
    const reorderNum = parseInt(newPartForm.reorder, 10) || 0;
    const isLow = qtyNum <= reorderNum;

    const newPart = {
      name: newPartForm.name || 'Custom Spare Part',
      sku: newPartForm.sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
      brand: newPartForm.brand,
      cat: newPartForm.cat,
      qty: qtyNum,
      reorder: reorderNum,
      supplier: newPartForm.supplier,
      loc: newPartForm.loc,
      status: isLow ? 'Low Stock' : 'In Stock',
      color: isLow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
    };

    setStockItems([newPart, ...stockItems]);
    setIsAddPartModalOpen(false);
    showToast(`Added "${newPart.name}" to inventory!`);
    setNewPartForm({
      name: '',
      sku: '',
      brand: 'Bosch',
      cat: 'Filters',
      qty: '10',
      reorder: '4',
      supplier: 'AutoParts Direct',
      loc: 'Shelf A-01',
    });
  };

  const filteredItems = stockItems.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'All' || item.cat === categoryFilter;
    const matchBrand = brandFilter === 'All' || item.brand === brandFilter;
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchSearch && matchCat && matchBrand && matchStatus;
  });

  const kpis = stockItems.length === 0 ? [
    { label: 'Total Items in Stock', value: '0', change: '0% vs last month', isUp: true, icon: Package },
    { label: 'Low Stock Alerts', value: '0', change: '0 items', isDanger: false, isUp: true, icon: AlertTriangle },
    { label: 'Pending Orders', value: '0', change: '0 POs', isUp: true, icon: Clock },
    { label: 'Stock Valuation', value: 'AED 0.00', change: '0% vs last month', isUp: true, icon: DollarSign },
    { label: 'Stock Turnover', value: '0.0x', change: '0% vs last month', isUp: true, icon: TrendingDown },
  ] : [
    { label: 'Total Items in Stock', value: `${stockItems.reduce((acc, i) => acc + i.qty, 0)}`, change: '+3.2% vs last month', isUp: true, icon: Package },
    { label: 'Low Stock Alerts', value: `${stockItems.filter(i => i.status === 'Low Stock').length}`, change: 'Needs Reorder', isDanger: true, isUp: false, icon: AlertTriangle },
    { label: 'Pending Orders', value: '3', change: 'Active POs', isUp: true, icon: Clock },
    { label: 'Stock Valuation', value: 'AED 148,250', change: '+4.5% vs last month', isUp: true, icon: DollarSign },
    { label: 'Stock Turnover', value: '4.8x', change: '+0.3x vs last month', isUp: true, icon: TrendingDown },
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
            {language === 'ar' ? 'المخزون وقطع الغيار' : 'Inventory & Spare Parts'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dashboard &gt; Inventory &gt; Overview • Manage workshop stock, monitor low-inventory alerts, and organize spare parts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('Stock status report generated and downloaded!')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Stock Sheet</span>
          </button>

          <button
            onClick={() => setIsAddPartModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Part / SKU</span>
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

      {/* 3. Filters Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts by name, SKU, or supplier..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All">Category: All</option>
              <option value="Filters">Filters</option>
              <option value="Brakes">Brakes</option>
              <option value="Fluids">Fluids & Oils</option>
              <option value="Ignition">Ignition</option>
            </select>
          </div>

          <div>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All">Brand: All</option>
              <option value="Bosch">Bosch</option>
              <option value="Brembo">Brembo</option>
              <option value="NGK">NGK</option>
              <option value="Mobil 1">Mobil 1</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCategoryFilter('All');
                setBrandFilter('All');
                setStatusFilter('All');
                setSearchQuery('');
                showToast('Filters reset.');
              }}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={() => showToast('Filtered stock list exported to Excel!')}
              className="py-2 px-3 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setIsAddPartModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Part</span>
        </button>

        <button
          onClick={() => {
            if (onNavigateTab) onNavigateTab('suppliers');
            else showToast('Navigate to Suppliers & Purchase Orders tab');
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>Create PO</span>
        </button>

        <button
          onClick={() => showToast('Stock Transfer: Select source and destination branch bay')}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-purple-600" />
          <span>Stock Transfer</span>
        </button>

        <button
          onClick={() => showToast('Stock Adjustment tool: Select SKU to recount')}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
          <span>Adjust Stock</span>
        </button>

        <button
          onClick={() => showToast('Import Parts CSV template ready for upload!')}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-amber-600" />
          <span>Import Parts</span>
        </button>
      </div>

      {/* 5. Stock Overview Table matching Image 5 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">Stock Overview ({filteredItems.length} items)</h3>
          <span className="text-xs text-slate-400 font-medium">Real-time Bay Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4 text-start">Part Name</th>
                <th className="py-3 px-4 text-start">SKU</th>
                <th className="py-3 px-4 text-start">Brand</th>
                <th className="py-3 px-4 text-start">Category</th>
                <th className="py-3 px-4 text-center">Qty on Hand</th>
                <th className="py-3 px-4 text-center">Reorder Level</th>
                <th className="py-3 px-4 text-start">Supplier</th>
                <th className="py-3 px-4 text-start">Shelf Location</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                        <Package className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900">
                          {language === 'ar' ? 'المخزون فارغ حالياً' : 'No Items in Inventory'}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {language === 'ar'
                            ? 'أضف قطع الغيار، الزيوت، والمستهلكات لتتبع الكميات المتوفرة وتنبيهات إعادة الطلب التلقائية.'
                            : 'Add spare parts, filters, lubricants, and workshop materials to track on-hand stock and automate reordering.'}
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => setIsAddPartModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'إضافة صنف / قطعة جديدة' : '+ Add First Item / SKU'}</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 font-mono text-blue-600">{item.sku}</td>
                    <td className="py-3 px-4 text-slate-600">{item.brand}</td>
                    <td className="py-3 px-4 text-slate-600">{item.cat}</td>
                    <td className="py-3 px-4 text-center font-black text-slate-900">{item.qty}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{item.reorder}</td>
                    <td className="py-3 px-4 text-slate-600">{item.supplier}</td>
                    <td className="py-3 px-4 text-slate-500">{item.loc}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${item.color}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          const updated = stockItems.map((s, idx) =>
                            idx === i ? { ...s, qty: s.qty + 5, status: 'In Stock', color: 'bg-emerald-100 text-emerald-800' } : s
                          );
                          setStockItems(updated);
                          showToast(`Restocked +5 units for "${item.name}"`);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                      >
                        + Restock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Add Part Modal */}
      {isAddPartModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Add Part / SKU to Stock</h3>
                  <p className="text-[11px] text-slate-500">Record new spare part or fluid item</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddPartModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPart} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Part Name *</label>
                  <input
                    type="text"
                    required
                    value={newPartForm.name}
                    onChange={(e) => setNewPartForm({ ...newPartForm, name: e.target.value })}
                    placeholder="e.g. Brake Pads Front"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SKU / Code</label>
                  <input
                    type="text"
                    value={newPartForm.sku}
                    onChange={(e) => setNewPartForm({ ...newPartForm, sku: e.target.value })}
                    placeholder="e.g. BP-088"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    value={newPartForm.brand}
                    onChange={(e) => setNewPartForm({ ...newPartForm, brand: e.target.value })}
                    placeholder="e.g. Brembo / Bosch"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newPartForm.cat}
                    onChange={(e) => setNewPartForm({ ...newPartForm, cat: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Filters">Filters</option>
                    <option value="Brakes">Brakes</option>
                    <option value="Fluids">Fluids & Oils</option>
                    <option value="Ignition">Ignition</option>
                    <option value="Exterior">Exterior & Body</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity on Hand *</label>
                  <input
                    type="number"
                    required
                    value={newPartForm.qty}
                    onChange={(e) => setNewPartForm({ ...newPartForm, qty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reorder Alert Level</label>
                  <input
                    type="number"
                    value={newPartForm.reorder}
                    onChange={(e) => setNewPartForm({ ...newPartForm, reorder: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Supplier Name</label>
                  <input
                    type="text"
                    value={newPartForm.supplier}
                    onChange={(e) => setNewPartForm({ ...newPartForm, supplier: e.target.value })}
                    placeholder="e.g. AutoParts Direct"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shelf / Bay Location</label>
                  <input
                    type="text"
                    value={newPartForm.loc}
                    onChange={(e) => setNewPartForm({ ...newPartForm, loc: e.target.value })}
                    placeholder="e.g. Shelf B-04"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPartModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Save Item to Stock
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
            {language === 'ar' ? 'تحكم ذكي في المخزون وسلسلة التوريد' : 'Master Your Stock & Parts Supply'}
          </h2>
          <p className="text-xs text-slate-300">
            Automated reorder triggers, supplier integration, barcode tracking, and multi-bay inventory management.
          </p>
        </div>
      </div>
    </div>
  );
};
