import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Wrench,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Calendar,
  Phone,
  Car,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Headphones,
  Sparkles,
  Zap,
  Check,
  Users,
} from 'lucide-react';

interface ProviderJobsTabProps {
  onSelectJob: (jobId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ProviderJobsTab: React.FC<ProviderJobsTabProps> = ({ onSelectJob, onNavigateTab }) => {
  const { language, user, jobs, placedBookings, formatPrice } = useApp();
  const isNewUser = Boolean(user?.isNewUser) || jobs.length === 0 || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);
  const [activeTabFilter, setActiveTabFilter] = useState<'new' | 'active' | 'completed' | 'cancelled'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [techFilter, setTechFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. KPI Cards matching Image 3
  const kpis = isNewUser ? [
    {
      id: 'total_jobs',
      label: 'Total Jobs',
      labelAr: 'إجمالي أوامر العمل',
      value: String(jobs.length),
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: FileText,
    },
    {
      id: 'new_jobs',
      label: 'New Jobs',
      labelAr: 'أعمال جديدة',
      value: '0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: Sparkles,
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      labelAr: 'قيد التنفيذ',
      value: '0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: Clock,
    },
    {
      id: 'completed',
      label: 'Completed',
      labelAr: 'المكتملة',
      value: '0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: CheckCircle2,
    },
    {
      id: 'delayed',
      label: 'Delayed',
      labelAr: 'المتأخرة',
      value: '0',
      change: '0%',
      vs: 'vs last month',
      isUp: true,
      icon: AlertCircle,
    },
  ] : [
    {
      id: 'total_jobs',
      label: 'Total Jobs',
      labelAr: 'إجمالي أوامر العمل',
      value: '1,248',
      change: '+16.2%',
      vs: 'vs last month',
      isUp: true,
      icon: FileText,
    },
    {
      id: 'new_jobs',
      label: 'New Jobs',
      labelAr: 'أعمال جديدة',
      value: '236',
      change: '+22.4%',
      vs: 'vs last month',
      isUp: true,
      icon: Sparkles,
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      labelAr: 'قيد التنفيذ',
      value: '428',
      change: '+4.1%',
      vs: 'vs last month',
      isUp: true,
      icon: Clock,
    },
    {
      id: 'completed',
      label: 'Completed',
      labelAr: 'المكتملة',
      value: '542',
      change: '+15.7%',
      vs: 'vs last month',
      isUp: true,
      icon: CheckCircle2,
    },
    {
      id: 'delayed',
      label: 'Delayed',
      labelAr: 'المتأخرة',
      value: '42',
      change: '-26.7%',
      vs: 'vs last month',
      isUp: false,
      isDanger: true,
      icon: AlertCircle,
    },
  ];

  // 2. Jobs List matching Image 3
  const allJobs = [
    {
      id: 'AML-2025-1248',
      customer: 'Omar Al Balushi',
      phone: '+968 9123 4567',
      date: 'May 31, 2025 • 10:45 AM',
      vehicle: 'Toyota Camry',
      plate: '2021 • 1234 AR',
      category: 'General Service',
      technician: 'Ali Al Hatmi',
      techAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      progress: 68,
      progressDots: 3,
      quotation: 'Approved',
      parts: 'Partial',
      nextAction: 'Waiting for Parts',
      nextActionDate: 'Jun 01, 2025 09:00 AM',
      type: 'active',
    },
    {
      id: 'AML-2025-1247',
      customer: 'Salim Al Wahabi',
      phone: '+968 9876 5432',
      date: 'May 31, 2025 • 09:20 AM',
      vehicle: 'Nissan Patrol',
      plate: '2019 • 5678 CD',
      category: 'Engine Repair',
      technician: 'Khalid Al Siyabi',
      techAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      progress: 40,
      progressDots: 2,
      quotation: 'Pending',
      parts: 'Pending',
      nextAction: 'Confirm Quotation',
      nextActionDate: 'May 31, 2025 02:00 PM',
      type: 'active',
    },
    {
      id: 'AML-2025-1246',
      customer: 'Hamed Al Fadhli',
      phone: '+968 9001 2250',
      date: 'May 31, 2025 • 08:00 AM',
      vehicle: 'Hyundai Tucson',
      plate: '2023 • 8765 EF',
      category: 'AC Repair',
      technician: 'Said Al Rawahi',
      techAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      progress: 100,
      progressDots: 4,
      quotation: 'Approved',
      parts: 'Ready',
      nextAction: 'Vehicle Ready',
      nextActionDate: 'May 31, 2025 05:00 PM',
      type: 'completed',
    },
    {
      id: 'AML-2025-1245',
      customer: 'Khalid Al Busaidi',
      phone: '+968 9444 6677',
      date: 'May 30, 2025 • 04:15 PM',
      vehicle: 'Honda Accord',
      plate: '2020 • 1122 GH',
      category: 'Brake Service',
      technician: 'Yahya Al Amri',
      techAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
      progress: 20,
      progressDots: 1,
      quotation: 'Pending',
      parts: 'Partial',
      nextAction: 'Follow up Parts',
      nextActionDate: 'Jun 01, 2025 11:00 AM',
      type: 'active',
    },
    {
      id: 'AML-2025-1244',
      customer: 'Fatima Al Hashmi',
      phone: '+968 9555 8899',
      date: 'May 30, 2025 • 03:40 PM',
      vehicle: 'Kia Sportage',
      plate: '2021 • 3344 IJ',
      category: 'General Service',
      technician: 'Ali Al Hatmi',
      techAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      progress: 60,
      progressDots: 3,
      quotation: 'Approved',
      parts: 'Ready',
      nextAction: 'Quality Check',
      nextActionDate: 'May 31, 2025 02:00 PM',
      type: 'active',
    },
    {
      id: 'AML-2025-1243',
      customer: 'Muhsin Al Lawati',
      phone: '+968 9333 7781',
      date: 'May 30, 2025 • 02:00 PM',
      vehicle: 'Mitsubishi Pajero',
      plate: '2018 • 5566 KL',
      category: 'Transmission',
      technician: 'Khalid Al Siyabi',
      techAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      progress: 15,
      progressDots: 1,
      quotation: 'Pending',
      parts: 'Pending',
      nextAction: 'Prepare Quotation',
      nextActionDate: 'May 31, 2025 10:00 AM',
      type: 'new',
    },
    {
      id: 'AML-2025-1242',
      customer: 'Ahmed Al Maroofi',
      phone: '+968 9666 2211',
      date: 'May 30, 2025 • 01:10 PM',
      vehicle: 'Ford Explorer',
      plate: '2021 • 7788 MN',
      category: 'Suspension',
      technician: 'Said Al Rawahi',
      techAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      progress: 78,
      progressDots: 3,
      quotation: 'Approved',
      parts: 'Ready',
      nextAction: 'Test Drive',
      nextActionDate: 'May 31, 2025 04:00 PM',
      type: 'active',
    },
    {
      id: 'AML-2025-1241',
      customer: 'Zainab Al Battashi',
      phone: '+968 9777 3344',
      date: 'May 30, 2025 • 12:25 PM',
      vehicle: 'Chevrolet Captiva',
      plate: '2020 • 9900 OP',
      category: 'Electrical',
      technician: 'Yahya Al Amri',
      techAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
      progress: 38,
      progressDots: 2,
      quotation: 'Pending',
      parts: 'Partial',
      nextAction: 'Diagnose Issue',
      nextActionDate: 'May 31, 2025 08:30 AM',
      type: 'active',
    },
    {
      id: 'AML-2025-1240',
      customer: 'Nasser Al Radi',
      phone: '+968 9888 4455',
      date: 'May 30, 2025 • 11:40 AM',
      vehicle: 'Lexus ES 350',
      plate: '2022 • 2211 QR',
      category: 'General Service',
      technician: 'Ali Al Hatmi',
      techAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      progress: 55,
      progressDots: 2,
      quotation: 'Approved',
      parts: 'Ready',
      nextAction: 'Waiting for Parts',
      nextActionDate: 'Jun 01, 2025 12:00 PM',
      type: 'active',
    },
    {
      id: 'AML-2025-1239',
      customer: 'Mansoor Al Riyami',
      phone: '+968 9000 5566',
      date: 'May 30, 2025 • 10:15 AM',
      vehicle: 'BMW 520',
      plate: '2021 • 4455 ST',
      category: 'Engine Repair',
      technician: 'Khalid Al Siyabi',
      techAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      progress: 10,
      progressDots: 1,
      quotation: 'Pending',
      parts: 'Pending',
      nextAction: 'Confirm Quotation',
      nextActionDate: 'May 31, 2025 01:00 PM',
      type: 'new',
    },
  ];

  const jobsToDisplay = isNewUser ? [] : allJobs;

  return (
    <div className="space-y-6">
      {/* 1. Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'إدارة أوامر العمل' : 'Jobs Management'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'ar'
              ? 'تتبع وإدارة وتحسين جميع أوامر العمل وخدمات الصيانة.'
              : 'Track, manage and optimize all service jobs & work orders'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {new Date().toLocaleDateString(language === 'ar' ? 'ar' : 'en-US', { month: 'long', year: 'numeric' })}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => onSelectJob('AML-2025-1248')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'أمر عمل جديد' : '+ New Job'}</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Metric Cards matching Image 3 */}
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
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    kpi.isDanger ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
              </div>

              <div className="mt-2 text-[10px] font-bold">
                <span className={kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}>
                  {kpi.isUp ? '▲' : '▼'} {kpi.change}{' '}
                  <span className="text-slate-400 font-medium">{kpi.vs}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Status Tabs matching Image 3 */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTabFilter('new')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeTabFilter === 'new'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>New</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {isNewUser ? jobs.filter(j => j.status === 'scheduled').length : '236'}
          </span>
        </button>

        <button
          onClick={() => setActiveTabFilter('active')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeTabFilter === 'active'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Active</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {isNewUser ? jobs.filter(j => j.status === 'in_progress').length : '428'}
          </span>
        </button>

        <button
          onClick={() => setActiveTabFilter('completed')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeTabFilter === 'completed'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Completed</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {isNewUser ? jobs.filter(j => j.status === 'completed').length : '542'}
          </span>
        </button>

        <button
          onClick={() => setActiveTabFilter('cancelled')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeTabFilter === 'cancelled'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Delayed</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {isNewUser ? jobs.filter(j => j.status === 'cancelled').length : '42'}
          </span>
        </button>
      </div>

      {/* 4. Filter Toolbar matching Image 3 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'البحث برقم أمر العمل، اسم العميل، المركبة...' : 'Search by Job ID, Customer, Vehicle...'}
            className="w-full ps-10 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Dropdowns & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
          >
            <option value="All">All Services</option>
            <option value="General Service">General Service</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Engine Repair">Engine Repair</option>
            <option value="Brake Service">Brake Service</option>
          </select>

          <select
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
          >
            <option value="All">All Technicians</option>
            <option value="Ali Al Hatmi">Ali Al Hatmi</option>
            <option value="Khalid Al Siyabi">Khalid Al Siyabi</option>
            <option value="Rashid Al Balushi">Rashid Al Balushi</option>
          </select>

          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 5. Jobs Table matching Image 3 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 text-start">Job ID</th>
                <th className="py-3 px-4 text-start">Customer</th>
                <th className="py-3 px-4 text-start">Vehicle</th>
                <th className="py-3 px-4 text-start">Service Category</th>
                <th className="py-3 px-4 text-start">Technician</th>
                <th className="py-3 px-4 text-start">Progress</th>
                <th className="py-3 px-4 text-start">Quotation</th>
                <th className="py-3 px-4 text-start">Parts</th>
                <th className="py-3 px-4 text-start">Next Action</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {isNewUser && jobs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                        <Wrench className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900">
                          {language === 'ar' ? 'لا توجد أوامر عمل حالياً' : 'No Work Orders Yet'}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {language === 'ar'
                            ? 'ابدأ بإنشاء أول أمر عمل لسيارة عميل أو انتظر الحجوزات الواردة لمتابعة مراحل الصيانة والإصلاح.'
                            : 'Create your first job ticket or accept booking requests to track repair progress, assign technicians, and bill customers.'}
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => onSelectJob('new')}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm transition-all inline-flex items-center gap-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'إنشاء أمر عمل جديد' : '+ Create First Job'}</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                jobsToDisplay.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Job ID */}
                    <td className="py-3.5 px-4 font-black text-blue-600 whitespace-nowrap">
                      {job.id}
                      <span className="block text-[10px] text-slate-400 font-medium">{job.date}</span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <strong className="font-bold text-slate-900 block">{job.customer}</strong>
                      <span className="text-[10px] text-slate-400 block">{job.phone}</span>
                    </td>

                    {/* Vehicle */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <strong className="font-bold text-slate-800 block">{job.vehicle}</strong>
                      <span className="text-[10px] text-slate-400 block">{job.plate}</span>
                    </td>

                    {/* Service Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
                        {job.category}
                      </span>
                    </td>

                    {/* Technician */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          src={job.techAvatar}
                          alt={job.technician}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-800 text-xs">{job.technician}</span>
                      </div>
                    </td>

                    {/* Progress Bar & Milestone Dots */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1 w-28">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>Progress</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map((dot) => (
                            <div
                              key={dot}
                              className={`h-1.5 flex-1 rounded-full ${
                                dot <= job.progressDots ? 'bg-blue-600' : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Quotation */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          job.quotation === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {job.quotation}
                      </span>
                    </td>

                    {/* Parts */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          job.parts === 'Ready'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : job.parts === 'Partial'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {job.parts}
                      </span>
                    </td>

                    {/* Next Action */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <strong className="font-bold text-slate-900 block text-[11px]">{job.nextAction}</strong>
                      <span className="text-[10px] text-slate-400 block">{job.nextActionDate}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onSelectJob(job.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-bold text-slate-600">
          <span>
            {isNewUser && jobs.length === 0
              ? (language === 'ar' ? 'لا توجد أوامر عمل' : '0 jobs')
              : `Showing 1 to ${Math.min(10, isNewUser ? jobs.length : allJobs.length)} of ${isNewUser ? jobs.length : allJobs.length} jobs`}
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
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">24</button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. Bottom Widgets Grid matching Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget 1: Jobs Pipeline Donut */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 pb-3 border-b border-slate-100">Jobs Pipeline</h3>
            {isNewUser ? (
              <div className="py-7 text-center text-slate-400">
                <Wrench className="w-7 h-7 mx-auto text-slate-300 mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد أوامر عمل بعد' : 'No Jobs in Pipeline Yet'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'ستظهر مراحل إنجاز أوامر العمل وحالاتها فور بدء أول عمل' : 'Work order distribution will appear as jobs are created.'}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-4 mt-3">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="4"
                      strokeDasharray="18.9, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      strokeDasharray="34.3, 100"
                      strokeDashoffset="-18.9"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="4"
                      strokeDasharray="43.4, 100"
                      strokeDashoffset="-53.2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="4"
                      strokeDasharray="3.4, 100"
                      strokeDashoffset="-96.6"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <strong className="text-base font-black text-slate-900 block leading-none">1,248</strong>
                    <span className="text-[9px] text-slate-400 font-bold block">Total Jobs</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-[11px] font-bold text-slate-700">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" /> New
                    </span>
                    <span>236 (18.9%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> In Progress
                    </span>
                    <span>428 (34.3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
                    </span>
                    <span>542 (43.4%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Delayed
                    </span>
                    <span>42 (3.4%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-600 block mt-3">
            {isNewUser ? (language === 'ar' ? 'حساب جديد جاهز' : 'New account ready') : '▲ 18.2% vs last month'}
          </span>
        </div>

        {/* Widget 2: Workload Summary */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Workload Summary</h3>
              <button
                onClick={() => onNavigateTab('technicians')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
              >
                View Full Report →
              </button>
            </div>

            {isNewUser ? (
              <div className="py-7 text-center text-slate-400">
                <Users className="w-7 h-7 mx-auto text-slate-300 mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'لا توجد بيانات فنيين بعد' : 'No Technicians Assigned Yet'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {language === 'ar' ? 'أضف الفنيين ووزع المهام لمتابعة كفاءة فريق العمل' : 'Add technicians and assign tasks to track team workload.'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 py-2">
                  <span>Technicians: <strong className="text-slate-900">12</strong></span>
                  <span>Avg. Jobs / Tech: <strong className="text-slate-900">35.7</strong></span>
                </div>

                <div className="space-y-2 mt-1">
                  {[
                    { name: 'Ali Al Hatmi', jobs: '8 Jobs', pct: '67%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Khalid Al Siyabi', jobs: '7 Jobs', pct: '58%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Said Al Rawahi', jobs: '6 Jobs', pct: '50%', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Yahya Al Amri', jobs: '4 Jobs', pct: '33%', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&auto=format&fit=crop&q=80' },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs">
                      <img src={tech.avatar} alt={tech.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                      <span className="w-28 truncate font-bold text-slate-800">{tech.name}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: tech.pct }} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold w-12 text-end">{tech.jobs}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Widget 3: Today's Overview & Support */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Today's Overview</h3>
            <div className="grid grid-cols-2 gap-2.5 mt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold block">Total Jobs</span>
                <strong className="text-lg font-black text-slate-900">
                  {isNewUser ? jobs.length : 42}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <span className="text-[10px] text-emerald-600 font-bold block">Completed</span>
                <strong className="text-lg font-black text-emerald-800">
                  {isNewUser ? jobs.filter(j => j.status === 'completed').length : 18}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50">
                <span className="text-[10px] text-blue-600 font-bold block">In Progress</span>
                <strong className="text-lg font-black text-blue-800">
                  {isNewUser ? jobs.filter(j => j.status === 'in_progress').length : 20}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-red-50">
                <span className="text-[10px] text-red-600 font-bold block">Delayed</span>
                <strong className="text-lg font-black text-red-800">
                  {isNewUser ? jobs.filter(j => j.status === 'cancelled').length : 4}
                </strong>
              </div>
            </div>
          </div>

          <div className="bg-[#0B1528] text-white rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-amber-400" />
              <strong className="text-xs font-black">Need Help?</strong>
            </div>
            <p className="text-[10px] text-slate-300">Our support team is ready to assist you with any questions.</p>
            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors"
            >
              Contact Support
            </button>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>+970 59 123 4567</span>
              <span>support@ahlalmarkabat.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Quotation & Parts Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Quotation Overview</h3>
            <button
              onClick={() => onNavigateTab('quotes')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
            >
              View Details →
            </button>
          </div>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-amber-600">● Pending: {isNewUser ? '0 (0%)' : '96 (23.5%)'}</span>
            <span className="text-emerald-600">● Approved: {isNewUser ? '0 (0%)' : '312 (71.8%)'}</span>
            <span className="text-rose-600">● Rejected: {isNewUser ? '0 (0%)' : '28 (5.4%)'}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Total Value</span>
              <strong className="text-sm font-black text-slate-900">
                {isNewUser ? formatPrice(0) : formatPrice(24580)}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Approved Value</span>
              <strong className="text-sm font-black text-slate-900">
                {isNewUser ? formatPrice(0) : formatPrice(17680)}
              </strong>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Parts Status Overview</h3>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
            >
              View Details →
            </button>
          </div>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-600">● Ready: {isNewUser ? '0 (0%)' : '312 (50.2%)'}</span>
            <span className="text-amber-600">● Partial: {isNewUser ? '0 (0%)' : '156 (25.1%)'}</span>
            <span className="text-rose-600">● Pending: {isNewUser ? '0 (0%)' : '152 (24.7%)'}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Total Parts Value</span>
              <strong className="text-sm font-black text-slate-900">
                {isNewUser ? formatPrice(0) : formatPrice(12430)}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Parts Issued Value</span>
              <strong className="text-sm font-black text-slate-900">
                {isNewUser ? formatPrice(0) : formatPrice(8670)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'نمّ أعمالك مع أهل المركبات' : 'Grow Your Business with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            {language === 'ar'
              ? 'احصل على المزيد من الحجوزات، وأدر عمليات ورشتك بذكاء وسرعة.'
              : 'Get more bookings, manage your jobs smarter, and keep your customers coming back.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
            >
              Explore Our Solutions
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
    </div>
  );
};
