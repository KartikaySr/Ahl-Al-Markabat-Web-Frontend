import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Users,
  UserCheck,
  DollarSign,
  Calendar,
  Star,
  Search,
  Filter,
  Download,
  Plus,
  MessageSquare,
  Car,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  Send,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ChevronDown,
  X,
} from 'lucide-react';

interface ProviderCustomersTabProps {
  onNavigateTab: (tab: string) => void;
}

export const ProviderCustomersTab: React.FC<ProviderCustomersTabProps> = ({ onNavigateTab }) => {
  const { language, user, jobs, placedBookings } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');
  const [segmentFilter, setSegmentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [newCustForm, setNewCustForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    tag: 'New',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. KPI Cards matching Image 5
  const kpis = isNewUser ? [
    {
      id: 'total_customers',
      label: 'Total Customers',
      labelAr: 'إجمالي العملاء',
      value: '0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: Users,
    },
    {
      id: 'repeat_customers',
      label: 'Repeat Customers',
      labelAr: 'العملاء المتكررين',
      value: '0',
      subtext: '0% of total',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: UserCheck,
    },
    {
      id: 'avg_spend',
      label: 'Average Spend',
      labelAr: 'متوسط الإنفاق',
      value: 'AED 0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: DollarSign,
    },
    {
      id: 'active_bookings',
      label: 'Active Bookings',
      labelAr: 'الحجوزات النشطة',
      value: '0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: Calendar,
    },
    {
      id: 'satisfaction',
      label: 'Customer Satisfaction',
      labelAr: 'رضا العملاء',
      value: 'New',
      star: false,
      change: '0',
      vs: 'vs last month',
      isUp: true,
      icon: Star,
    },
  ] : [
    {
      id: 'total_customers',
      label: 'Total Customers',
      labelAr: 'إجمالي العملاء',
      value: '2,448',
      change: '+12.8%',
      vs: 'vs Apr',
      isUp: true,
      icon: Users,
    },
    {
      id: 'repeat_customers',
      label: 'Repeat Customers',
      labelAr: 'العملاء المتكررين',
      value: '1,356',
      subtext: '55.5% of total',
      change: '+8.2%',
      vs: 'vs Apr',
      isUp: true,
      icon: UserCheck,
    },
    {
      id: 'avg_spend',
      label: 'Average Spend',
      labelAr: 'متوسط الإنفاق',
      value: 'AED 1,248',
      change: '+9.6%',
      vs: 'vs Apr',
      isUp: true,
      icon: DollarSign,
    },
    {
      id: 'active_bookings',
      label: 'Active Bookings',
      labelAr: 'الحجوزات النشطة',
      value: '324',
      change: '+14.7%',
      vs: 'vs Apr',
      isUp: true,
      icon: Calendar,
    },
    {
      id: 'satisfaction',
      label: 'Customer Satisfaction',
      labelAr: 'رضا العملاء',
      value: '4.8',
      star: true,
      change: '+0.3',
      vs: 'vs Apr',
      isUp: true,
      icon: Star,
    },
  ];

  // 2. Customers Table Data matching Image 5
  const customers = [
    {
      id: 'CUST-1',
      name: 'Ahmed Al Mansoori',
      joined: 'Joined Mar 15, 2022',
      phone: '+971 50 123 4567',
      email: 'ahmed.m@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 2,
      lastServiceDate: 'May 28, 2025',
      lastServiceType: 'Oil Change',
      ltv: 'AED 4,680',
      tag: 'VIP',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-2',
      name: 'Fatima Al Zaabi',
      joined: 'Joined Jan 11, 2023',
      phone: '+971 50 987 6543',
      email: 'fatima.z@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 1,
      lastServiceDate: 'May 20, 2025',
      lastServiceType: 'Brake Service',
      ltv: 'AED 2,840',
      tag: 'Loyal',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-3',
      name: 'Mohammed Shah',
      joined: 'Joined Feb 18, 2021',
      phone: '+971 55 234 5678',
      email: 'm.shah@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 3,
      lastServiceDate: 'May 16, 2025',
      lastServiceType: 'Oil Change',
      ltv: 'AED 6,230',
      tag: 'VIP',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-4',
      name: 'Sara Khan',
      joined: 'Joined Nov 5, 2023',
      phone: '+971 52 345 6789',
      email: 'sara.khan@email.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 1,
      lastServiceDate: 'May 12, 2025',
      lastServiceType: 'AC Service',
      ltv: 'AED 1,655',
      tag: 'New',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-5',
      name: 'Yousef Al Blooshi',
      joined: 'Joined Aug 21, 2022',
      phone: '+971 50 456 7890',
      email: 'yousef.b@email.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 2,
      lastServiceDate: 'Apr 30, 2025',
      lastServiceType: 'Full Service',
      ltv: 'AED 3,950',
      tag: 'Loyal',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-6',
      name: 'Noora Al Shamsi',
      joined: 'Joined Apr 3, 2020',
      phone: '+971 56 789 0123',
      email: 'noora.s@email.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 1,
      lastServiceDate: 'Apr 25, 2025',
      lastServiceType: 'Battery Replacement',
      ltv: 'AED 1,240',
      tag: 'New',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      status: 'Inactive',
      statusColor: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'CUST-7',
      name: 'Khalid Rahman',
      joined: 'Joined Jul 14, 2022',
      phone: '+971 55 678 9012',
      email: 'khalel.r@email.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 4,
      lastServiceDate: 'Apr 22, 2025',
      lastServiceType: 'Transmission Service',
      ltv: 'AED 8,760',
      tag: 'VIP',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-8',
      name: 'Lina Haddad',
      joined: 'Joined Mar 28, 2023',
      phone: '+971 52 654 3210',
      email: 'lina.h@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 1,
      lastServiceDate: 'Apr 15, 2025',
      lastServiceType: 'Wheel Alignment',
      ltv: 'AED 980',
      tag: 'New',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-9',
      name: 'Omar Farooq',
      joined: 'Joined Sep 2, 2022',
      phone: '+971 50 321 6549',
      email: 'omar.f@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 2,
      lastServiceDate: 'Apr 10, 2025',
      lastServiceType: 'Full Service',
      ltv: 'AED 2,220',
      tag: 'Loyal',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'CUST-10',
      name: 'Aisha Malik',
      joined: 'Joined Dec 19, 2022',
      phone: '+971 56 149 2553',
      email: 'aisha.m@email.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      vehiclesCount: 1,
      lastServiceDate: 'Apr 5, 2025',
      lastServiceType: 'Oil Change',
      ltv: 'AED 760',
      tag: 'New',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
  ];

  const customersToDisplay = isNewUser ? [] : customers;

  return (
    <div className="space-y-6">
      {/* 1. Header with Title, Add Customer & Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'إدارة العملاء' : 'Customers'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'ar'
              ? 'إدارة عملائك، بناء علاقات قوية وتنمية القيمة الدائمة للعملاء.'
              : 'Manage your customers, build relationships, and grow lifetime value.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>May 1 – May 31, 2025</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setIsAddCustomerModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة عميل' : '+ Add Customer'}</span>
          </button>

          <button
            onClick={() => showToast('Customer database exported as CSV / Excel successfully!')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Metric Cards matching Image 5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  {language === 'ar' ? kpi.labelAr : kpi.label}
                </span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
                {kpi.star && <span className="text-amber-500 text-sm">★</span>}
                {kpi.subtext && <span className="text-[10px] text-slate-400 font-bold">{kpi.subtext}</span>}
              </div>

              <div className="mt-2 text-[10px] font-bold">
                <span className="text-emerald-600">
                  ▲ {kpi.change}{' '}
                  <span className="text-slate-400 font-medium">{kpi.vs}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Grid: Left Column (Customers Table, 68%) & Right Column (Widgets, 32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Customers Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Filter Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customers..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="All">All Tags</option>
                  <option value="VIP">VIP</option>
                  <option value="Fleet">Fleet</option>
                  <option value="Loyal">Loyal</option>
                  <option value="New">New</option>
                </select>
              </div>
            </div>

            {/* Customers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                    <th className="py-3 px-4 text-start">Customer</th>
                    <th className="py-3 px-4 text-start">Contact</th>
                    <th className="py-3 px-4 text-center">Vehicles</th>
                    <th className="py-3 px-4 text-start">Last Service</th>
                    <th className="py-3 px-4 text-start">LTV</th>
                    <th className="py-3 px-4 text-center">Tags</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {isNewUser && customersToDisplay.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <div className="max-w-md mx-auto space-y-4">
                          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                            <Users className="w-8 h-8" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-black text-slate-900">
                              {language === 'ar' ? 'قاعدة العملاء فارغة حالياً' : 'No Customers in Directory Yet'}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {language === 'ar'
                                ? 'عندما يقوم العملاء بحجز خدماتك أو زيارة الورشة، سيتم حفظ بياناتهم وسجلات مركباتهم وتاريخ الصيانة هنا تلقائياً.'
                                : 'Customers who book appointments or have work orders created will automatically appear here with their vehicle histories.'}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    customersToDisplay.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedCustomerId(c.id)}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                          selectedCustomerId === c.id ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        {/* Customer */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <strong className="text-xs font-black text-slate-900 block">{c.name}</strong>
                              <span className="text-[10px] text-slate-400 block">{c.joined}</span>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-slate-800 block text-[11px]">{c.phone}</span>
                          <span className="text-[10px] text-slate-400 block">{c.email}</span>
                        </td>

                        {/* Vehicles */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className="font-black text-xs text-slate-900">{c.vehiclesCount}</span>
                        </td>

                        {/* Last Service */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <strong className="text-xs font-bold text-slate-900 block">{c.lastServiceDate}</strong>
                          <span className="text-[10px] text-slate-400 block">{c.lastServiceType}</span>
                        </td>

                        {/* LTV */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <strong className="text-xs font-black text-slate-900">{c.ltv}</strong>
                        </td>

                        {/* Tags */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${c.tagColor}`}>
                            {c.tag}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${c.statusColor}`}>
                            {c.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                              <Calendar className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-bold text-slate-600">
            <span>
              {isNewUser && customersToDisplay.length === 0
                ? (language === 'ar' ? 'لا يوجد عملاء' : '0 customers')
                : `Showing 1 to ${Math.min(10, customersToDisplay.length)} of ${customersToDisplay.length} customers`}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs">1</button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">2</button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">3</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">245</button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Conversations, Tasks, Selected Customer Profile */}
        <div className="space-y-4">
          {/* Recent Conversations */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Recent Conversations</h3>
              <button
                onClick={() => onNavigateTab('messages')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
              >
                View All →
              </button>
            </div>

            {isNewUser ? (
              <div className="py-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <strong className="text-xs font-bold text-slate-800 block">No Recent Conversations</strong>
                <p className="text-[10px] text-slate-400 mt-0.5 max-w-xs mx-auto">
                  Incoming customer chats from WhatsApp and the marketplace will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-3 text-xs">
                {[
                  { name: 'Ahmed Al Mansoori', msg: 'Thanks for the quick service!', time: '02:20 AM', unread: 1, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80' },
                  { name: 'Fatima Al Zaabi', msg: 'When is my next service due?', time: '09:47 AM', unread: 0, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80' },
                  { name: 'Mohammed Shah', msg: 'Can I reschedule tomorrow?', time: 'Yesterday', unread: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80' },
                  { name: 'Sara Khan', msg: 'Thanks! Great experience.', time: 'Yesterday', unread: 0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80' },
                  { name: 'Khalid Rahman', msg: 'Requesting quotation for tires.', time: 'May 30', unread: 0, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&auto=format&fit=crop&q=80' },
                ].map((chat, i) => (
                  <div key={i} className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full object-cover" />
                      <div className="min-w-0">
                        <strong className="text-xs font-bold text-slate-900 block truncate">{chat.name}</strong>
                        <span className="text-[11px] text-slate-500 block truncate">{chat.msg}</span>
                      </div>
                    </div>
                    <div className="text-end shrink-0">
                      <span className="text-[9px] text-slate-400 block">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-black inline-flex items-center justify-center mt-0.5">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Follow-up Tasks */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Follow-up Tasks</h3>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All →</button>
            </div>

            {isNewUser ? (
              <div className="py-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <strong className="text-xs font-bold text-slate-800 block">No Pending Follow-ups</strong>
                <p className="text-[10px] text-slate-400 mt-0.5 max-w-xs mx-auto">
                  Automated service reminders, quote follow-ups, and booking confirmations will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 mt-3 text-xs">
                {[
                  { title: 'Call Ahmed Al Mansoori', desc: 'Follow up on transmission noise', due: 'Today', dueColor: 'text-rose-600' },
                  { title: 'Send Offer to Noora Al Shamsi', desc: '20% off AC Service', due: 'Tomorrow', dueColor: 'text-amber-600' },
                  { title: 'Confirm Booking with Omar Farooq', desc: 'Full Service – Jun 5, 2025', due: 'Jun 2', dueColor: 'text-blue-600' },
                  { title: 'Reminder: Fatima Al Zaabi', desc: 'Service due in 7 days', due: 'Jun 3', dueColor: 'text-slate-600' },
                  { title: 'Collect Feedback from Aisha Malik', desc: 'After service follow-up', due: 'Jun 5', dueColor: 'text-slate-600' },
                ].map((task, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <strong className="text-xs font-bold text-slate-900 block truncate">{task.title}</strong>
                      <span className="text-[10px] text-slate-500 block truncate">{task.desc}</span>
                    </div>
                    <span className={`text-[10px] font-black shrink-0 ${task.dueColor}`}>{task.due}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer Notes & Preferences Card (Selected Customer) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Customer Notes & Preferences</h3>
              {!isNewUser && <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">Edit</button>}
            </div>

            {isNewUser ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-2 border border-slate-200">
                  <Users className="w-6 h-6" />
                </div>
                <strong className="text-xs font-bold text-slate-800 block">No Customer Selected</strong>
                <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  Select a customer from your directory to inspect vehicle records, service history, and custom workshop notes.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="Ahmed Al Mansoori"
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <strong className="text-sm font-black text-slate-900 block">Ahmed Al Mansoori</strong>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                      VIP Customer
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-700 block">Personal Notes</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    Prefers early morning bookings. Values quality over price. Always request car wash after service.
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <span className="font-bold text-slate-700 block">Preferences</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Preferred Contact:</span>
                      <strong className="text-slate-800">WhatsApp</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Preferred Time:</span>
                      <strong className="text-slate-800">8:00 AM – 10:00 AM</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Preferred Services:</span>
                      <strong className="text-slate-800">Full Service, AC</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Payment Method:</span>
                      <strong className="text-slate-800">Card ending in 4342</strong>
                    </div>
                  </div>
                </div>

                {/* Vehicles */}
                <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                  <span className="font-bold text-slate-700 block">Vehicles (2)</span>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <strong className="text-xs font-bold text-slate-900 block">Toyota Land Cruiser 2021</strong>
                        <span className="text-[10px] text-slate-400">White • GCC</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-black">12345</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <strong className="text-xs font-bold text-slate-900 block">Lexus LX 570 2019</strong>
                        <span className="text-[10px] text-slate-400">Black • GCC</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-black">67899</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl">
                  View Full Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5. Bottom Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loyalty Overview */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Loyalty Overview</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View Details</button>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                {!isNewUser && (
                  <>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="26, 100" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="74, 100" strokeDashoffset="-26" />
                  </>
                )}
              </svg>
              <div className="absolute text-center">
                <strong className="text-sm font-black text-slate-900 block leading-none">{isNewUser ? '0' : '1,356'}</strong>
                <span className="text-[8px] text-slate-400 font-bold block">Loyal Customers</span>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-xs font-bold">
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5 text-amber-600">● VIP</span>
                <span>{isNewUser ? '0 (0%)' : '356 (26%)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5 text-blue-600">● Loyal</span>
                <span>{isNewUser ? '0 (0%)' : '1,000 (74%)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Retention Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Retention Rate</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View Details</button>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl font-black text-slate-900">{isNewUser ? '0%' : '78.4%'}</strong>
              <span className={`text-[11px] font-bold ${isNewUser ? 'text-slate-400' : 'text-emerald-600'}`}>
                {isNewUser ? '0% baseline' : '▲ 6.3% vs Apr'}
              </span>
            </div>

            <div className="h-24 w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 200 80">
                {!isNewUser ? (
                  <path d="M 10 60 Q 60 40, 110 35 T 190 20" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                ) : (
                  <path d="M 10 70 L 190 70" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                )}
              </svg>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Lifetime Value */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Customer Lifetime Value (CLV)</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View Details</button>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl font-black text-slate-900">{isNewUser ? 'AED 0' : 'AED 3,128'}</strong>
              <span className={`text-[11px] font-bold ${isNewUser ? 'text-slate-400' : 'text-emerald-600'}`}>
                {isNewUser ? '0% baseline' : '▲ 11.2% vs Apr'}
              </span>
            </div>

            <div className="space-y-1.5 mt-3 text-xs font-bold text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Top 20% Customers</span>
                <span>{isNewUser ? 'AED 0' : 'AED 7,640'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Middle 60% Customers</span>
                <span>{isNewUser ? 'AED 0' : 'AED 3,120'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bottom 20% Customers</span>
                <span>{isNewUser ? 'AED 0' : 'AED 620'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Top Customer Segments & Top Customers by LTV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customer Segments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Top Customer Segments</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View Details</button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div>
                <strong className="font-bold text-blue-900 block">VIP Customers</strong>
                <span className="text-[10px] text-blue-700">{isNewUser ? '0 customers' : '356 customers'}</span>
              </div>
              <strong className="text-sm font-black text-blue-900">{isNewUser ? 'AED 0' : 'AED 2.45M'}</strong>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div>
                <strong className="font-bold text-emerald-900 block">Loyal Customers</strong>
                <span className="text-[10px] text-emerald-700">{isNewUser ? '0 customers' : '1,000 customers'}</span>
              </div>
              <strong className="text-sm font-black text-emerald-900">{isNewUser ? 'AED 0' : 'AED 3.15M'}</strong>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
              <div>
                <strong className="font-bold text-purple-900 block">New Customers</strong>
                <span className="text-[10px] text-purple-700">{isNewUser ? '0 customers' : '620 customers'}</span>
              </div>
              <strong className="text-sm font-black text-purple-900">{isNewUser ? 'AED 0' : 'AED 612K'}</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <strong className="font-bold text-slate-700 block">Inactive Customers</strong>
                <span className="text-[10px] text-slate-500">{isNewUser ? '0 customers' : '472 customers'}</span>
              </div>
              <strong className="text-sm font-black text-slate-700">{isNewUser ? 'AED 0' : 'AED 290K'}</strong>
            </div>
          </div>
        </div>

        {/* Top Customers by Lifetime Value */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Top Customers by Lifetime Value</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {isNewUser ? (
              <div className="py-8 text-center text-slate-400">
                <p className="text-xs font-bold text-slate-600">No Customer Spending History Yet</p>
                <p className="text-[10px] text-slate-400 mt-1">Top spending customers will be ranked here as jobs complete.</p>
              </div>
            ) : (
              [
                { rank: 1, name: 'Khalid Rahman', ltv: 'AED 8,760', bookings: 24, date: 'Apr 22, 2025' },
                { rank: 2, name: 'Mohammed Shah', ltv: 'AED 6,230', bookings: 15, date: 'May 16, 2025' },
                { rank: 3, name: 'Ahmed Al Mansoori', ltv: 'AED 4,680', bookings: 13, date: 'May 28, 2025' },
                { rank: 4, name: 'Yousef Al Blooshi', ltv: 'AED 3,950', bookings: 12, date: 'Apr 30, 2025' },
                { rank: 5, name: 'Fatima Al Zaabi', ltv: 'AED 2,840', bookings: 11, date: 'May 20, 2025' },
              ].map((top, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center">
                      {top.rank}
                    </span>
                    <strong className="font-bold text-slate-900">{top.name}</strong>
                  </div>
                  <div className="flex items-center gap-4 text-end">
                    <div>
                      <strong className="font-black text-slate-900 block">{top.ltv}</strong>
                      <span className="text-[10px] text-slate-400">{top.bookings} Bookings</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline-block">{top.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 7. Quick Actions Row (5 buttons matching Image 5) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <h3 className="text-xs font-black text-slate-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => setIsAddCustomerModalOpen(true)}
            className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-start flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <strong className="text-xs font-bold block leading-tight text-slate-900">Add Customer</strong>
              <span className="text-[9px] text-slate-400">Manually add to your list</span>
            </div>
          </button>

          <button
            onClick={() => showToast('Import Customer CSV template ready!')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-start flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <strong className="text-xs font-bold block leading-tight text-slate-900">Import Customers</strong>
              <span className="text-[9px] text-slate-400">Upload CSV or Excel file</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab ? onNavigateTab('marketing') : showToast('Navigating to Marketing...')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-start flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <strong className="text-xs font-bold block leading-tight text-slate-900">Send Campaign</strong>
              <span className="text-[9px] text-slate-400">Promotions & offers</span>
            </div>
          </button>

          <button
            onClick={() => showToast('Customer segmentation filter applied: VIP & Active')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-start flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <strong className="text-xs font-bold block leading-tight text-slate-900">Create Segment</strong>
              <span className="text-[9px] text-slate-400">Targeted customer groups</span>
            </div>
          </button>

          <button
            onClick={() => showToast('SMS feedback survey request sent to recent customers!')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-start flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <strong className="text-xs font-bold block leading-tight text-slate-900">Customer Feedback</strong>
              <span className="text-[9px] text-slate-400">Send feedback requests</span>
            </div>
          </button>
        </div>
      </div>

      {/* 8. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'ابنِ علاقات أقوى مع عملائك' : 'Build Stronger Relationships with Your Customers'}
          </h2>
          <p className="text-xs text-slate-300">
            Use personalized offers, timely follow-ups, and excellent service to increase retention and grow your business.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
            >
              Create Campaign
            </button>
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* 9. Add Customer Modal */}
      {isAddCustomerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Add New Customer</h3>
                  <p className="text-[11px] text-slate-500">Register vehicle owner details</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddCustomerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddCustomerModalOpen(false);
                showToast(`Customer "${newCustForm.name || 'New Customer'}" added to your workshop CRM!`);
                setNewCustForm({
                  name: '',
                  phone: '',
                  email: '',
                  vehicle: '',
                  tag: 'New',
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={newCustForm.name}
                  onChange={(e) => setNewCustForm({ ...newCustForm, name: e.target.value })}
                  placeholder="e.g. Tariq Al Nuaimi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newCustForm.phone}
                    onChange={(e) => setNewCustForm({ ...newCustForm, phone: e.target.value })}
                    placeholder="050 123 4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newCustForm.email}
                    onChange={(e) => setNewCustForm({ ...newCustForm, email: e.target.value })}
                    placeholder="customer@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Details</label>
                  <input
                    type="text"
                    value={newCustForm.vehicle}
                    onChange={(e) => setNewCustForm({ ...newCustForm, vehicle: e.target.value })}
                    placeholder="e.g. Toyota Land Cruiser 2022"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Tag</label>
                  <select
                    value={newCustForm.tag}
                    onChange={(e) => setNewCustForm({ ...newCustForm, tag: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="New">New</option>
                    <option value="VIP">VIP</option>
                    <option value="Loyal">Loyal</option>
                    <option value="Fleet">Fleet</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
