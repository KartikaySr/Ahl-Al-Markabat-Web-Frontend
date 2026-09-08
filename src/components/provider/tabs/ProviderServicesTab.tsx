import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ProviderCustomService } from '../../../types';
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Clock,
  CheckCircle2,
  Edit2,
  Trash2,
  MoreVertical,
  Layers,
  Percent,
  TrendingUp,
  Tag,
  Phone,
  HelpCircle,
  Sliders,
  DollarSign,
  Wrench,
  Package,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';

interface ProviderServicesTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderServicesTab: React.FC<ProviderServicesTabProps> = ({ onNavigateTab }) => {
  const {
    language,
    formatPrice,
    providerServices,
    addProviderService,
    updateProviderService,
    deleteProviderService,
    user,
    providerProfile,
  } = useApp();

  const currentProviderId = user?.id || providerProfile?.id || 'prov-1';

  // Filter services belonging to this provider
  const myServices = providerServices.filter((s) => s.providerId === currentProviderId || !s.providerId);

  const [activeCategory, setActiveCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form State
  const [serviceName, setServiceName] = useState('');
  const [serviceNameAr, setServiceNameAr] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Maintenance');
  const [serviceDuration, setServiceDuration] = useState('45 min');
  const [servicePrice, setServicePrice] = useState('150');
  const [serviceLaborCost, setServiceLaborCost] = useState('80');
  const [servicePartsCost, setServicePartsCost] = useState('70');
  const [isMobile, setIsMobile] = useState(true);
  const [isWorkshop, setIsWorkshop] = useState(true);
  const [serviceWarranty, setServiceWarranty] = useState('6 Months / 10,000 km');
  const [serviceDescription, setServiceDescription] = useState('');

  const openAddModal = () => {
    setEditingServiceId(null);
    setServiceName('');
    setServiceNameAr('');
    setServiceCategory('Maintenance');
    setServiceDuration('45 min');
    setServicePrice('150');
    setServiceLaborCost('80');
    setServicePartsCost('70');
    setIsMobile(true);
    setIsWorkshop(true);
    setServiceWarranty('6 Months / 10,000 km');
    setServiceDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (service: ProviderCustomService) => {
    setEditingServiceId(service.id);
    setServiceName(service.name);
    setServiceNameAr(service.nameAr || '');
    setServiceCategory(service.category);
    setServiceDuration(service.duration);
    setServicePrice(String(service.price));
    setServiceLaborCost(String(service.laborPrice || 0));
    setServicePartsCost(String(service.partsPrice || 0));
    setIsMobile(service.mobile);
    setIsWorkshop(service.workshop);
    setServiceWarranty(service.warranty || '');
    setServiceDescription(service.description || '');
    setIsModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) return;

    const parsedPrice = Number(servicePrice) || 0;
    const parsedLabor = Number(serviceLaborCost) || 0;
    const parsedParts = Number(servicePartsCost) || 0;

    if (editingServiceId) {
      updateProviderService(editingServiceId, {
        name: serviceName.trim(),
        nameAr: serviceNameAr.trim() || serviceName.trim(),
        category: serviceCategory,
        duration: serviceDuration,
        price: parsedPrice,
        laborPrice: parsedLabor,
        partsPrice: parsedParts,
        mobile: isMobile,
        workshop: isWorkshop,
        warranty: serviceWarranty,
        description: serviceDescription,
      });
    } else {
      addProviderService({
        providerId: currentProviderId,
        name: serviceName.trim(),
        nameAr: serviceNameAr.trim() || serviceName.trim(),
        category: serviceCategory,
        duration: serviceDuration,
        price: parsedPrice,
        laborPrice: parsedLabor,
        partsPrice: parsedParts,
        mobile: isMobile,
        workshop: isWorkshop,
        warranty: serviceWarranty,
        description: serviceDescription,
        status: 'Active',
      });
    }

    setIsModalOpen(false);
  };

  const categories = [
    'All Services',
    'Maintenance',
    'Repairs',
    'Diagnostics',
    'Tires & Wheels',
    'Electrical & Electronics',
    'Body & Paint',
  ];

  // Filtered Services
  const filteredServices = myServices.filter((s) => {
    const matchesCategory = activeCategory === 'All Services' || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nameAr && s.nameAr.includes(searchQuery)) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalServicesCount = myServices.length;
  const activeServicesCount = myServices.filter((s) => s.status === 'Active').length;
  const avgPrice =
    totalServicesCount > 0
      ? Math.round(myServices.reduce((acc, s) => acc + s.price, 0) / totalServicesCount)
      : 0;

  const kpis = [
    { label: language === 'ar' ? 'إجمالي الخدمات' : 'Total Services', value: String(totalServicesCount), change: totalServicesCount > 0 ? '+100%' : '0%', isUp: true, icon: Sparkles },
    { label: language === 'ar' ? 'الخدمات النشطة' : 'Active Services', value: String(activeServicesCount), change: activeServicesCount > 0 ? '+100%' : '0%', isUp: true, icon: CheckCircle2 },
    { label: language === 'ar' ? 'متوسط السعر' : 'Average Price', value: formatPrice(avgPrice), change: avgPrice > 0 ? '+0%' : '0%', isUp: true, icon: DollarSign },
    { label: language === 'ar' ? 'الحجوزات المباشرة' : 'Bookings', value: '0', change: '0%', isUp: true, icon: TrendingUp },
    { label: language === 'ar' ? 'الخدمات المضافة' : 'Add-ons Sold', value: '0', change: '0%', isUp: true, icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Add Service Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'إدارة الخدمات والأسعار' : 'Services & Pricing Management'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'قم بإضافة وتخصيص أسعار خدمات ورشتك لتبدأ في استقبال طلبات الحجز من العملاء.'
              : 'Configure and price what your workshop offers to start receiving customer bookings.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? '+ إضافة خدمة وتسعيرة جديدة' : '+ Add New Service'}</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{kpi.label}</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[10px] font-bold text-slate-400">
                {language === 'ar' ? 'محدث للآن' : 'Live state'}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'البحث عن خدمة بالاسم أو التصنيف...' : 'Search services by name or category...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-1 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              {language === 'ar' ? 'مسح' : 'Clear'}
            </button>
          )}
        </div>
      </div>

      {/* 4. Services List Table / Empty State */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">
            {language === 'ar' ? `قائمة الخدمات المعروضة (${filteredServices.length})` : `Services List (${filteredServices.length})`}
          </h3>
          <span className="text-xs text-slate-400">
            {filteredServices.length} {language === 'ar' ? 'خدمات معروضة' : 'configured services'}
          </span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
              <Wrench className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="text-base font-black text-slate-900">
                {language === 'ar' ? 'لا توجد خدمات مضافة حتى الآن' : 'No Services Configured Yet'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'لم تقم بإضافة أي خدمة بعد. انقر على الزر أدناه لتحديد ما تقدمه ورشتك وتحديد أسعار أجور اليد وقطع الغيار.'
                  : 'You have not added any service offerings yet. Click below to add what your workshop offers and set your custom pricing.'}
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all shadow-sm cursor-pointer"
            >
              {language === 'ar' ? '+ إضافة أول خدمة وتسعيرة' : '+ Add Your First Service'}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'اسم الخدمة' : 'Service Name'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'التصنيف' : 'Category'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'المدة' : 'Duration'}</th>
                  <th className="py-3 px-4 text-end">{language === 'ar' ? 'السعر الأساسي' : 'Base Price'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'خدمة متنقلة' : 'Mobile'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'داخل الورشة' : 'Workshop'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الضمان' : 'Warranty'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="py-3 px-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredServices.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {language === 'ar' ? s.nameAr || s.name : s.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{s.category}</td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">{s.duration}</td>
                    <td className="py-3 px-4 text-end font-black text-slate-900 whitespace-nowrap font-mono">
                      {formatPrice(s.price)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {s.mobile ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {s.workshop ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap text-slate-500">{s.warranty || '—'}</td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600 me-1.5 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProviderService(s.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-[#0B1528] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">
                    {editingServiceId
                      ? language === 'ar' ? 'تعديل بيانات الخدمة' : 'Edit Service'
                      : language === 'ar' ? 'إضافة خدمة وتسعيرة جديدة' : 'Add New Service & Pricing'}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    {language === 'ar' ? 'حدد تفاصيل الخدمة والأسعار وأسلوب التقديم' : 'Configure service details, rates, and delivery mode.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'اسم الخدمة (بالعربية) *' : 'Service Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceNameAr}
                    onChange={(e) => setServiceNameAr(e.target.value)}
                    placeholder="مثال: غيار زيت وسيرفيس دوري"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'اسم الخدمة (بالإنجليزية)' : 'Service Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Synthetic Oil & Filter Service"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'التصنيف' : 'Category'}
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none"
                  >
                    <option value="Maintenance">Maintenance (صيانة دورية)</option>
                    <option value="Repairs">Repairs (إصلاحات وميكانيك)</option>
                    <option value="Diagnostics">Diagnostics (فحص كمبيوتر)</option>
                    <option value="Tires & Wheels">Tires & Wheels (إطارات وميزان)</option>
                    <option value="Electrical & Electronics">Electrical (كهرباء وبطاريات)</option>
                    <option value="Body & Paint">Body & Paint (سمكرة ودهان)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'المدة التقديرية للعمل' : 'Estimated Duration'}
                  </label>
                  <input
                    type="text"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                    placeholder="e.g. 45 min, 2 hrs"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {language === 'ar' ? 'السعر الإجمالي (شيكل/عملة)' : 'Total Price'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-black text-blue-600 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {language === 'ar' ? 'أجور اليد' : 'Labor Cost'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={serviceLaborCost}
                    onChange={(e) => setServiceLaborCost(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {language === 'ar' ? 'تكلفة القطع' : 'Parts Cost'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={servicePartsCost}
                    onChange={(e) => setServicePartsCost(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'ar' ? 'مدة الضمان الممنوح' : 'Warranty Coverage'}
                </label>
                <input
                  type="text"
                  value={serviceWarranty}
                  onChange={(e) => setServiceWarranty(e.target.value)}
                  placeholder="e.g. 6 Months / 10,000 km"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isWorkshop}
                    onChange={(e) => setIsWorkshop(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>{language === 'ar' ? 'متاح داخل الورشة' : 'Available in Workshop'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isMobile}
                    onChange={(e) => setIsMobile(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>{language === 'ar' ? 'متاح كخدمة متنقلة (فان)' : 'Mobile Van Service'}</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md cursor-pointer"
                >
                  {editingServiceId
                    ? language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'
                    : language === 'ar' ? 'إضافة الخدمة للمتجر' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
