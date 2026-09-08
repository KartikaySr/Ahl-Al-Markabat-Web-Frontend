import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { WorkshopBranch, StockTransferItem, BranchStaffMember } from '../../../types';
import {
  Building2,
  Users,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  MapPin,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Sliders,
  Phone,
  HelpCircle,
  Sparkles,
  ArrowRightLeft,
  Wrench,
  ShieldCheck,
  Send,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Navigation,
  Share2,
  Package,
  Layers,
  BarChart3,
  Map as MapIcon,
  Grid,
} from 'lucide-react';

interface ProviderBranchesTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderBranchesTab: React.FC<ProviderBranchesTabProps> = ({ onNavigateTab }) => {
  const {
    language,
    t,
    branches,
    selectedBranchId,
    setSelectedBranchId,
    addBranch,
    updateBranch,
    deleteBranch,
    stockTransfers,
    createStockTransfer,
    updateStockTransferStatus,
    branchStaff,
    assignStaffToBranch,
    inventory,
    formatPrice,
    showToast,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'branches' | 'map' | 'transfers' | 'staff' | 'analytics'>('branches');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Open' | 'Busy' | 'Closed'>('all');

  // Modals state
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<WorkshopBranch | null>(null);
  const [viewingBranch, setViewingBranch] = useState<WorkshopBranch | null>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // New branch form state
  const [newBranchData, setNewBranchData] = useState<Partial<WorkshopBranch>>({
    name: '',
    nameAr: '',
    code: `AML-BR-${Math.floor(10 + Math.random() * 90)}`,
    city: 'Ramallah & Al-Bireh',
    cityAr: 'رام الله والبيرة',
    area: '',
    areaAr: '',
    address: '',
    addressAr: '',
    phone: '',
    whatsapp: '',
    manager: '',
    managerPhone: '',
    status: 'Open',
    openingHours: '8:00 AM – 8:00 PM • Sat – Thu',
    openingHoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
    lat: 31.9038,
    lng: 35.2034,
    serviceBays: 6,
    activeTechnicians: 8,
    bookingsMonth: 0,
    revenueMonth: 0,
    utilization: 75,
    rating: 5.0,
    reviewCount: 0,
    isMainHub: false,
    supportedServices: ['Mechanic', 'Electrical', 'Diagnostics', 'Quick Service'],
    partsCount: 1000,
  });

  // New stock transfer form state
  const [newTransferData, setNewTransferData] = useState({
    partSku: inventory[0]?.sku || 'BRK-DISC-094',
    partName: inventory[0]?.nameEn || 'Brembo Ceramic Brake Rotors',
    partNameAr: inventory[0]?.nameAr || 'هوبات فرامل بريمبو سيراميك',
    fromBranch: branches[0]?.id || 'br-ram-01',
    fromBranchName: branches[0]?.name || 'AutoTech Premier Hub (Ramallah)',
    toBranch: branches[1]?.id || 'br-bir-02',
    toBranchName: branches[1]?.name || 'Rapid Fix Express (Al-Bireh)',
    quantity: 4,
    priority: 'Normal' as 'Normal' | 'Urgent' | 'Emergency',
    requestedBy: 'Workshop Inventory Manager',
    notes: '',
  });

  // Filtered branches
  const filteredBranches = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.nameAr.includes(searchQuery) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.cityAr.includes(searchQuery) ||
      b.manager.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = cityFilter === 'all' || b.city === cityFilter || b.cityAr === cityFilter;
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesCity && matchesStatus;
  });

  // Calculate Aggregates
  const totalBays = branches.reduce((acc, b) => acc + b.serviceBays, 0);
  const totalStaff = branchStaff.length > 0 ? branchStaff.length : branches.reduce((acc, b) => acc + b.activeTechnicians, 0);
  const totalRevenue = branches.reduce((acc, b) => acc + b.revenueMonth, 0);
  const totalBookings = branches.reduce((acc, b) => acc + b.bookingsMonth, 0);
  const avgUtilization = (branches.reduce((acc, b) => acc + b.utilization, 0) / (branches.length || 1)).toFixed(1);

  const handleCreateBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchData.name || !newBranchData.nameAr || !newBranchData.address) {
      showToast(language === 'ar' ? 'يرجى ملء جميع الحقول الإلزامية' : 'Please fill all required fields', 'error');
      return;
    }

    if (editingBranch) {
      updateBranch(editingBranch.id, newBranchData);
      setEditingBranch(null);
    } else {
      addBranch(newBranchData as Omit<WorkshopBranch, 'id'>);
    }

    setIsAddBranchModalOpen(false);
  };

  const handleCreateTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fromB = branches.find((b) => b.id === newTransferData.fromBranch);
    const toB = branches.find((b) => b.id === newTransferData.toBranch);

    if (newTransferData.fromBranch === newTransferData.toBranch) {
      showToast(language === 'ar' ? 'لا يمكن التحويل لنفس الفرع' : 'Source and destination branches cannot be the same', 'error');
      return;
    }

    createStockTransfer({
      partSku: newTransferData.partSku,
      partName: newTransferData.partName,
      partNameAr: newTransferData.partNameAr,
      fromBranch: newTransferData.fromBranch,
      fromBranchName: fromB ? (language === 'ar' ? fromB.nameAr : fromB.name) : newTransferData.fromBranchName,
      toBranch: newTransferData.toBranch,
      toBranchName: toB ? (language === 'ar' ? toB.nameAr : toB.name) : newTransferData.toBranchName,
      quantity: Number(newTransferData.quantity),
      priority: newTransferData.priority,
      requestedBy: newTransferData.requestedBy,
      notes: newTransferData.notes,
    });

    setIsTransferModalOpen(false);
  };

  const citiesList = [
    { id: 'all', nameAr: 'جميع المدن الفلسطينية', nameEn: 'All Cities' },
    { id: 'Ramallah & Al-Bireh', nameAr: 'رام الله والبيرة', nameEn: 'Ramallah & Al-Bireh' },
    { id: 'Nablus', nameAr: 'نابلس', nameEn: 'Nablus' },
    { id: 'Hebron', nameAr: 'الخليل', nameEn: 'Hebron' },
    { id: 'Bethlehem', nameAr: 'بيت لحم', nameEn: 'Bethlehem' },
    { id: 'Jenin', nameAr: 'جنين', nameEn: 'Jenin' },
    { id: 'Jerusalem', nameAr: 'القدس الشريف', nameEn: 'Jerusalem' },
    { id: 'Gaza', nameAr: 'غزة', nameEn: 'Gaza' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumbs & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <span>{language === 'ar' ? 'الورشة الذكية' : 'Workshop SaaS'}</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-extrabold">{language === 'ar' ? 'شبكة الفروع والمراكز' : 'Multi-Branch Network'}</span>
            <span>&gt;</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black">
              {branches.length} {language === 'ar' ? 'فروع نشطة' : 'Active Branches'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-600" />
            <span>{language === 'ar' ? 'إدارة شبكة الفروع والورش المركزية' : 'Multi-Branch Workshop Network'}</span>
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'مراقبة العمليات الحية، إدارة الفنيين، وتنسيق مناقلات قطع الغيار عبر كافة فروع فلسطين والمنطقة.'
              : 'Monitor real-time floor ops, manage technicians, and orchestrate inter-branch parts logistics across all locations.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs"
          >
            <ArrowRightLeft className="w-4 h-4 text-amber-400" />
            <span>{language === 'ar' ? 'مناقلة مخزون' : 'Transfer Stock'}</span>
          </button>

          <button
            onClick={() => {
              setEditingBranch(null);
              setIsAddBranchModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? '+ تدشين فرع جديد' : '+ Add New Branch'}</span>
          </button>
        </div>
      </div>

      {/* 2. 5 Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{language === 'ar' ? 'إجمالي الفروع' : 'Total Branches'}</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{branches.length}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{language === 'ar' ? 'فروع تغطية' : 'Locations'}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span>● {branches.filter((b) => b.status === 'Open').length} {language === 'ar' ? 'مفتوح الآن' : 'Open'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{language === 'ar' ? 'مسارات الخدمة (Bays)' : 'Service Bays'}</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{totalBays}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{language === 'ar' ? 'رافعة ومسار فحص' : 'Active Bays'}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold text-blue-600">
            {language === 'ar' ? 'استيعاب 120 سيارة/يوم' : 'Cap: 120 cars/day'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{language === 'ar' ? 'الفنيين الموزعين' : 'Active Staff'}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{totalStaff}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{language === 'ar' ? 'مهندس وفني معتمد' : 'Certified Staff'}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold text-emerald-600">
            ▲ +12% {language === 'ar' ? 'نمو الكادر' : 'Staff growth'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{language === 'ar' ? 'إيرادات الشبكة' : 'Network Revenue'}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{formatPrice(totalRevenue)}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{language === 'ar' ? 'هذا الشهر' : 'This Month'}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold text-emerald-600">
            ▲ +24.8% vs {language === 'ar' ? 'الشهر السابق' : 'last mo'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{language === 'ar' ? 'أوامر العمل' : 'Work Orders'}</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{totalBookings.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{language === 'ar' ? 'سيارة تمت صيانتها' : 'Serviced Cars'}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold text-purple-600">
            ▲ +16.2% {language === 'ar' ? 'طلبات مكتملة' : 'Completed'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{language === 'ar' ? 'متوسط الإشغال' : 'Bay Utilization'}</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{avgUtilization}%</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{language === 'ar' ? 'كفاءة التشغيل' : 'Floor Efficiency'}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold text-emerald-600">
            ★ 4.9 {language === 'ar' ? 'تقييم العملاء' : 'CSAT Rating'}
          </div>
        </div>
      </div>

      {/* 3. Sub-Tab Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab('branches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'branches'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>{language === 'ar' ? 'شبكة الفروع (Grid)' : 'Branches Network'}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeSubTab === 'branches' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {branches.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'map'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>{language === 'ar' ? 'خريطة التغطية الجغرافية' : 'Geographic Map'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('transfers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'transfers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{language === 'ar' ? 'مناقلات قطع الغيار' : 'Stock Transfers'}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeSubTab === 'transfers' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
              {stockTransfers.filter((t) => t.status !== 'Received').length} {language === 'ar' ? 'جارية' : 'active'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('staff')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'staff'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{language === 'ar' ? 'توزيع الفنيين والكادر' : 'Staff Allocation'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{language === 'ar' ? 'التحليلات المقارنة' : 'Branch Analytics'}</span>
          </button>
        </div>

        {/* Global Active Branch Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400">{language === 'ar' ? 'الفرع المحدد:' : 'Active Filter:'}</span>
          <select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{language === 'ar' ? '🏢 جميع الفروع (Consolidated)' : '🏢 All Branches (Consolidated)'}</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {language === 'ar' ? b.nameAr : b.name} ({language === 'ar' ? b.cityAr : b.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. SUB-TAB 1: BRANCHES NETWORK GRID */}
      {activeSubTab === 'branches' && (
        <div className="space-y-4">
          {/* Search & City Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'بحث بالاسم، المدينة، أو اسم المدير...' : 'Search branch name, city, manager...'}
                className="w-full ps-9 pe-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                {citiesList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'ar' ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                <option value="all">{language === 'ar' ? 'كافة الحالات' : 'All Statuses'}</option>
                <option value="Open">{language === 'ar' ? 'مفتوح (Open)' : 'Open'}</option>
                <option value="Busy">{language === 'ar' ? 'مزدحم (Busy)' : 'Busy'}</option>
                <option value="Closed">{language === 'ar' ? 'مغلق (Closed)' : 'Closed'}</option>
              </select>
            </div>
          </div>

          {/* Branches Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredBranches.map((b) => {
              const isSelected = selectedBranchId === b.id;
              const branchName = language === 'ar' ? b.nameAr : b.name;
              const branchCity = language === 'ar' ? b.cityAr : b.city;
              const branchAddress = language === 'ar' ? b.addressAr : b.address;
              const hours = language === 'ar' ? b.openingHoursAr : b.openingHours;

              return (
                <div
                  key={b.id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200/90'
                  }`}
                >
                  {/* Branch Facility Photo Banner */}
                  <div className="relative h-36 bg-slate-100 overflow-hidden">
                    <img
                      src={b.image || '/images/branch_autotech_hub.jpg'}
                      alt={branchName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-2.5 start-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{branchCity}</span>
                    </div>
                    {b.isMainHub && (
                      <div className="absolute top-2.5 end-2.5 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black shadow-sm">
                        {language === 'ar' ? 'المركز الرئيسي' : 'Main Hub'}
                      </div>
                    )}
                    <div className="absolute bottom-2 start-3 end-3 flex items-center justify-between text-white text-[11px] font-black">
                      <span className="truncate">{branchName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                        b.status === 'Open' ? 'bg-emerald-500 text-white' : b.status === 'Busy' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-white'
                      }`}>
                        {b.status === 'Open' ? (language === 'ar' ? 'مفتوح' : 'Open') : b.status === 'Busy' ? (language === 'ar' ? 'مزدحم' : 'Busy') : (language === 'ar' ? 'مغلق' : 'Closed')}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">

                    {/* Address & Hours */}
                    <div className="p-2.5 rounded-xl bg-slate-50 space-y-1 text-xs text-slate-600 border border-slate-100">
                      <p className="text-[11px] text-slate-700 font-medium line-clamp-1">{branchAddress}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{hours}</span>
                        </span>
                      </div>
                    </div>

                    {/* Manager & Direct Contact CTA */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'مدير الفرع' : 'Branch Manager'}</span>
                        <strong className="text-slate-800 font-bold text-xs">{b.manager}</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        <a
                          href={`tel:${b.phone}`}
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                          title="Call Branch"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors font-bold text-xs"
                          title="WhatsApp"
                        >
                          WA
                        </a>
                      </div>
                    </div>

                    {/* Financials & Bookings Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[9px] text-slate-400 font-bold block">{language === 'ar' ? 'الإيراد الشهري' : 'Revenue'}</span>
                        <strong className="text-slate-900 font-black text-xs">{formatPrice(b.revenueMonth)}</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[9px] text-slate-400 font-bold block">{language === 'ar' ? 'أوامر العمل' : 'Work Orders'}</span>
                        <strong className="text-slate-900 font-black text-xs">{b.bookingsMonth} {language === 'ar' ? 'حجز' : 'jobs'}</strong>
                      </div>
                    </div>

                    {/* Capacity & Bays Utilization Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-500">
                          {b.serviceBays} {language === 'ar' ? 'مسارات خدمة' : 'Bays'} • {b.activeTechnicians} {language === 'ar' ? 'فنيين' : 'Techs'}
                        </span>
                        <strong className="text-blue-600">{b.utilization}% {language === 'ar' ? 'إشغال' : 'Util'}</strong>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            b.utilization >= 90 ? 'bg-amber-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${b.utilization}%` }}
                        />
                      </div>
                    </div>

                    {/* Supported Services Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {b.supportedServices.slice(0, 3).map((srv, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold">
                          {srv}
                        </span>
                      ))}
                      {b.supportedServices.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-bold">
                          +{b.supportedServices.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mt-4">
                    <button
                      onClick={() => setViewingBranch(b)}
                      className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تفاصيل الفرع' : 'View Details'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingBranch(b);
                        setNewBranchData(b);
                        setIsAddBranchModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Edit Branch"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. SUB-TAB 2: GEOGRAPHIC MAP VIEW */}
      {activeSubTab === 'map' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-blue-600" />
                <span>{language === 'ar' ? 'خريطة التغطية الجغرافية للفروع في فلسطين' : 'Geographic Coverage & Dispatch Map'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ar'
                  ? 'رؤية مركزية لمواقع الورش ومسافات الخدمة ومناطق الاستجابة الفورية SOS.'
                  : 'Centralized GIS layout of physical workshops, mobile patrol radiuses, and emergency dispatch corridors.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                ● 100% {language === 'ar' ? 'تغطية المدن الرئيسية' : 'Regional Coverage'}
              </span>
            </div>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="relative rounded-2xl bg-[#09152B] p-6 text-white min-h-[420px] overflow-hidden flex flex-col justify-between border border-slate-800">
            {/* Background Grid Lines & Coordinates Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Navigation className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{language === 'ar' ? 'نظام تحديد المواقع المركزي PostGIS' : 'PostGIS Geolocation & Radius Query Engine'}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Palestine Grid: Lat 31.5°N - 32.5°N • Lng 34.4°E - 35.3°E
              </div>
            </div>

            {/* Map Branch Pins */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
              {branches.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setViewingBranch(b)}
                  className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-blue-950/80 border border-slate-700 hover:border-blue-500 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-xs font-black text-white block">{language === 'ar' ? b.nameAr : b.name}</strong>
                        <span className="text-[10px] text-slate-400 block">{language === 'ar' ? b.cityAr : b.city}</span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block">{language === 'ar' ? 'المسارات' : 'Bays'}</span>
                      <strong className="text-white">{b.serviceBays} {language === 'ar' ? 'رافعات' : 'bays'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{language === 'ar' ? 'الإشغال' : 'Occupancy'}</span>
                      <strong className="text-amber-400">{b.utilization}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{language === 'ar' ? 'الفروع مفتوحة وجاهزة للاستقبال' : 'Branches Open for Booking'}</span>
              </span>
              <span className="text-blue-400 font-bold">
                {language === 'ar' ? 'دعم الإرسال الفوري لخدمات المساعدة على الطريق SOS' : 'Emergency Towing & Mobile Dispatch Active 24/7'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. SUB-TAB 3: INTER-BRANCH STOCK TRANSFERS */}
      {activeSubTab === 'transfers' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                <span>{language === 'ar' ? 'مناقلات قطع الغيار وسلسلة التوريد بين الفروع' : 'Inter-Branch Parts Transfers'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ar'
                  ? 'طلب وإرسال قطع الغيار والمخزون بين الورش لتلبية حجوزات الصيانة العاجلة (Sections 28 & 29).'
                  : 'Orchestrate spare parts movement between hubs to satisfy work order demands seamlessly.'}
              </p>
            </div>

            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? '+ طلب مناقلة جديد' : '+ New Stock Transfer'}</span>
            </button>
          </div>

          {/* Transfers Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs text-slate-700">
              <thead className="bg-slate-50 border-y border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'رقم المناقلة' : 'Transfer ID'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'القطعة والرمز SKU' : 'Item & SKU'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'من فرع' : 'From Branch'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'إلى فرع' : 'To Branch'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الكمية' : 'Qty'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الأولوية' : 'Priority'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="py-3 px-4 text-end">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stockTransfers.map((tr) => (
                  <tr key={tr.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-black text-slate-900">{tr.transferId}</td>
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 font-bold block">{language === 'ar' ? tr.partNameAr : tr.partName}</strong>
                      <span className="text-[10px] text-slate-400 font-mono block">{tr.partSku}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{tr.fromBranchName}</td>
                    <td className="py-3.5 px-4 font-medium text-blue-700 font-bold">{tr.toBranchName}</td>
                    <td className="py-3.5 px-4 text-center font-black text-slate-900">{tr.quantity}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          tr.priority === 'Emergency'
                            ? 'bg-rose-100 text-rose-800'
                            : tr.priority === 'Urgent'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tr.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          tr.status === 'Received'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tr.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800 animate-pulse'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tr.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-end">
                      {tr.status !== 'Received' ? (
                        <button
                          onClick={() => updateStockTransferStatus(tr.id, 'Received')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black transition-colors"
                        >
                          {language === 'ar' ? 'تأكيد الاستلام' : 'Mark Received'}
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'مكتمل' : 'Received'}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. SUB-TAB 4: STAFF & TECHNICIANS ALLOCATION */}
      {activeSubTab === 'staff' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{language === 'ar' ? 'توزيع الفنيين والكوادر عبر الفروع' : 'Technicians & Staff Branch Allocation'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ar'
                  ? 'إدارة تعيينات الفنيين المعتمدين والمشرفين على مسارات العمل في كل ورشة.'
                  : 'Manage technician assignments and shift coverage across every workshop branch.'}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {branchStaff.length} {language === 'ar' ? 'فني مسجل' : 'Staff Members'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branchStaff.map((staff) => (
              <div key={staff.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 hover:shadow-xs transition-all">
                <div className="flex items-start gap-3">
                  <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div className="space-y-1">
                    <strong className="text-xs font-black text-slate-900 block">{language === 'ar' ? staff.nameAr : staff.name}</strong>
                    <span className="text-[10px] text-blue-600 font-bold block">{language === 'ar' ? staff.roleAr : staff.role}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{language === 'ar' ? staff.branchNameAr : staff.branchName}</span>
                    </span>
                  </div>
                </div>

                <div className="text-end space-y-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black">
                    {staff.status}
                  </span>
                  <div className="text-[10px] font-bold text-slate-600">
                    ★ {staff.rating} • {staff.completedJobs} {language === 'ar' ? 'عملية' : 'jobs'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. SUB-TAB 5: COMPARATIVE ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>{language === 'ar' ? 'التحليلات المالية والتشغيلية المقارنة للفروع' : 'Comparative Multi-Branch Analytics'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ar'
                ? 'مقارنة الإيرادات، حجم الحجوزات، وكفاءة مسارات العمل بين كافة مراكز الصيانة.'
                : 'Benchmark monthly revenue, work order volume, and capacity efficiency across all locations.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs text-slate-700">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'الفرع والمدينة' : 'Branch & City'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'عدد المسارات' : 'Bays'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الكادر' : 'Staff'}</th>
                  <th className="py-3 px-4 text-end">{language === 'ar' ? 'الإيراد الشهري' : 'Revenue'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'أوامر العمل' : 'Work Orders'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'معدل الإشغال' : 'Utilization'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'التقييم' : 'Rating'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 font-bold block">{language === 'ar' ? b.nameAr : b.name}</strong>
                      <span className="text-[10px] text-slate-400">{language === 'ar' ? b.cityAr : b.city}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">{b.serviceBays}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">{b.activeTechnicians}</td>
                    <td className="py-3.5 px-4 text-end font-black text-slate-900">{formatPrice(b.revenueMonth)}</td>
                    <td className="py-3.5 px-4 text-center font-black text-slate-900">{b.bookingsMonth}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black text-[10px]">
                        {b.utilization}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-amber-500">
                      ★ {b.rating} ({b.reviewCount})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT BRANCH MODAL */}
      {isAddBranchModalOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] flex flex-col">
            <div className="bg-[#09152B] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black">
                  {editingBranch
                    ? language === 'ar' ? 'تعديل بيانات الفرع' : 'Edit Branch'
                    : language === 'ar' ? 'تدشين فرع ورشة جديد' : 'Register New Workshop Branch'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddBranchModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBranchSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'اسم الفرع (بالعربية)*' : 'Branch Name (Arabic)*'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newBranchData.nameAr || ''}
                    onChange={(e) => setNewBranchData({ ...newBranchData, nameAr: e.target.value })}
                    placeholder="أوتوتك — فرع الخليل"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'اسم الفرع (بالإنجليزية)*' : 'Branch Name (English)*'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newBranchData.name || ''}
                    onChange={(e) => setNewBranchData({ ...newBranchData, name: e.target.value })}
                    placeholder="AutoTech — Hebron Branch"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'المدينة / المحافظة*' : 'City / Governorate*'}
                  </label>
                  <select
                    value={newBranchData.city || 'Ramallah & Al-Bireh'}
                    onChange={(e) => {
                      const selected = citiesList.find((c) => c.nameEn === e.target.value);
                      setNewBranchData({
                        ...newBranchData,
                        city: e.target.value,
                        cityAr: selected ? selected.nameAr : e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {citiesList.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.nameEn}>
                        {language === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'رمز الفرع (Code)' : 'Branch Code'}
                  </label>
                  <input
                    type="text"
                    value={newBranchData.code || ''}
                    onChange={(e) => setNewBranchData({ ...newBranchData, code: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ar' ? 'العنوان التفصيلي والشارع*' : 'Detailed Street Address*'}
                </label>
                <input
                  type="text"
                  required
                  value={newBranchData.addressAr || newBranchData.address || ''}
                  onChange={(e) =>
                    setNewBranchData({
                      ...newBranchData,
                      address: e.target.value,
                      addressAr: e.target.value,
                    })
                  }
                  placeholder="شارع القدس، بجانب المركز التجاري"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'اسم مدير الفرع' : 'Branch Manager'}
                  </label>
                  <input
                    type="text"
                    value={newBranchData.manager || ''}
                    onChange={(e) => setNewBranchData({ ...newBranchData, manager: e.target.value })}
                    placeholder="م. أحمد خليل"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'هاتف الفرع / الواتساب' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={newBranchData.phone || ''}
                    onChange={(e) =>
                      setNewBranchData({
                        ...newBranchData,
                        phone: e.target.value,
                        whatsapp: e.target.value,
                      })
                    }
                    placeholder="+970 59 123 4567"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'مسارات الخدمة (Bays)' : 'Service Bays'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newBranchData.serviceBays || 4}
                    onChange={(e) => setNewBranchData({ ...newBranchData, serviceBays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'عدد الفنيين' : 'Active Techs'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newBranchData.activeTechnicians || 6}
                    onChange={(e) => setNewBranchData({ ...newBranchData, activeTechnicians: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'حالة الفرع' : 'Status'}
                  </label>
                  <select
                    value={newBranchData.status || 'Open'}
                    onChange={(e) => setNewBranchData({ ...newBranchData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="Open">Open (مفتوح)</option>
                    <option value="Busy">Busy (مزدحم)</option>
                    <option value="Closed">Closed (مغلق)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddBranchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-sm"
                >
                  {editingBranch
                    ? language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'
                    : language === 'ar' ? 'تدشين الفرع' : 'Launch Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW BRANCH DEEP DIVE MODAL */}
      {viewingBranch && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] flex flex-col">
            <div className="bg-[#09152B] text-white p-6 relative">
              <button
                onClick={() => setViewingBranch(null)}
                className="absolute top-5 end-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{language === 'ar' ? viewingBranch.nameAr : viewingBranch.name}</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{language === 'ar' ? viewingBranch.cityAr : viewingBranch.city} • {viewingBranch.code}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Snapshot Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'مسارات الخدمة' : 'Service Bays'}</span>
                  <strong className="text-base font-black text-slate-900">{viewingBranch.serviceBays} {language === 'ar' ? 'رافعات' : 'Bays'}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الفنيين النشطين' : 'Active Techs'}</span>
                  <strong className="text-base font-black text-slate-900">{viewingBranch.activeTechnicians} {language === 'ar' ? 'فني' : 'Techs'}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الإيراد الشهري' : 'Revenue'}</span>
                  <strong className="text-base font-black text-slate-900">{formatPrice(viewingBranch.revenueMonth)}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الإشغال' : 'Utilization'}</span>
                  <strong className="text-base font-black text-blue-600">{viewingBranch.utilization}%</strong>
                </div>
              </div>

              {/* Location & Contact Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <strong className="text-xs font-black text-slate-900 block">{language === 'ar' ? 'بيانات الاتصال والموقع' : 'Contact & Location'}</strong>
                <p className="text-slate-700">{language === 'ar' ? viewingBranch.addressAr : viewingBranch.address}</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المدير المسؤول' : 'Manager'}</span>
                    <strong className="text-slate-800">{viewingBranch.manager}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</span>
                    <strong className="text-slate-800">{viewingBranch.phone}</strong>
                  </div>
                </div>
              </div>

              {/* Supported Services */}
              <div className="space-y-2">
                <strong className="text-xs font-black text-slate-900 block">{language === 'ar' ? 'الخدمات المعتمدة في هذا الفرع' : 'Certified Services at this Branch'}</strong>
                <div className="flex flex-wrap gap-1.5">
                  {viewingBranch.supportedServices.map((srv, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100">
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedBranchId(viewingBranch.id);
                  setViewingBranch(null);
                  showToast(language === 'ar' ? `تم تحديد فرع (${viewingBranch.nameAr}) كفرع نشط للوحة التحكم!` : `Selected ${viewingBranch.name} as active branch!`, 'success');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs"
              >
                {language === 'ar' ? 'تعيين كفرع نشط للعمليات' : 'Set as Active Branch'}
              </button>

              <button
                onClick={() => setViewingBranch(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: NEW INTER-BRANCH STOCK TRANSFER MODAL */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] flex flex-col">
            <div className="bg-[#09152B] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black">
                  {language === 'ar' ? 'طلب مناقلة قطع غيار بين الفروع' : 'Request Inter-Branch Stock Transfer'}
                </h3>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTransferSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ar' ? 'قطعة الغيار المطلوبة*' : 'Select Spare Part*'}
                </label>
                <select
                  value={newTransferData.partSku}
                  onChange={(e) => {
                    const selected = inventory.find((item) => item.sku === e.target.value);
                    if (selected) {
                      setNewTransferData({
                        ...newTransferData,
                        partSku: selected.sku,
                        partName: selected.nameEn,
                        partNameAr: selected.nameAr,
                      });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                >
                  {inventory.map((item) => (
                    <option key={item.id} value={item.sku}>
                      {language === 'ar' ? item.nameAr : item.nameEn} ({item.sku}) • Stock: {item.stockQuantity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'من فرع (المصدر)*' : 'From Branch (Source)*'}
                  </label>
                  <select
                    value={newTransferData.fromBranch}
                    onChange={(e) => setNewTransferData({ ...newTransferData, fromBranch: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {language === 'ar' ? b.nameAr : b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'إلى فرع (الوجهة)*' : 'To Branch (Destination)*'}
                  </label>
                  <select
                    value={newTransferData.toBranch}
                    onChange={(e) => setNewTransferData({ ...newTransferData, toBranch: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {language === 'ar' ? b.nameAr : b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'الكمية المطلوبة*' : 'Quantity*'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newTransferData.quantity}
                    onChange={(e) => setNewTransferData({ ...newTransferData, quantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-black"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'درجة الأولوية' : 'Priority'}
                  </label>
                  <select
                    value={newTransferData.priority}
                    onChange={(e) => setNewTransferData({ ...newTransferData, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="Normal">Normal (عادي)</option>
                    <option value="Urgent">Urgent (عاجل)</option>
                    <option value="Emergency">Emergency (طوارئ SOS)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'ar' ? 'سبب التحويل / ملاحظات أمر العمل' : 'Transfer Notes / Work Order Ref'}
                </label>
                <textarea
                  rows={2}
                  value={newTransferData.notes}
                  onChange={(e) => setNewTransferData({ ...newTransferData, notes: e.target.value })}
                  placeholder={language === 'ar' ? 'مطلوب لحجز صيانة فرامل عاجل للسيارة رقم...' : 'Required for scheduled overhaul...'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إرسال أمر المناقلة' : 'Dispatch Transfer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderBranchesTab;
