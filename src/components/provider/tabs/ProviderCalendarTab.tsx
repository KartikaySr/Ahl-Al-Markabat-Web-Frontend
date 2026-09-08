import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
  Filter,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Wrench,
  Car,
  ChevronDown,
  Check,
  RotateCcw,
  Ban,
  Send,
  FileText,
  Settings,
  X,
} from 'lucide-react';

interface ProviderCalendarTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderCalendarTab: React.FC<ProviderCalendarTabProps> = ({ onNavigateTab }) => {
  const { language, user, jobs, placedBookings } = useApp();
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDay, setSelectedDay] = useState(8);
  const [workingDays, setWorkingDays] = useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [slotDuration, setSlotDuration] = useState('30 Minutes');
  const [bufferTime, setBufferTime] = useState('15 Minutes');
  const [allowOnline, setAllowOnline] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [newApptForm, setNewApptForm] = useState({
    customer: '',
    phone: '',
    vehicle: '',
    service: 'Major Service',
    timeSlot: '09:00 AM',
    date: new Date().toISOString().split('T')[0],
    tech: 'Ahmed Khan',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isNewUser = Boolean(user?.isNewUser) || jobs.length === 0 || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  // 1. KPI Stats matching Image 4
  const stats = isNewUser
    ? [
        { id: 'today', label: "Today's Appointments", labelAr: 'مواعيد اليوم', value: '0', change: '0%', vs: 'vs yesterday', isUp: true, icon: CalendarIcon },
        { id: 'week', label: 'This Week', labelAr: 'هذا الأسبوع', value: '0', change: '0%', vs: 'vs last week', isUp: true, icon: CalendarIcon },
        { id: 'month', label: 'This Month', labelAr: 'هذا الشهر', value: '0', change: '0%', vs: 'vs last month', isUp: true, icon: CalendarIcon },
        { id: 'completed', label: 'Completed Today', labelAr: 'المكتملة اليوم', value: '0', change: '0%', vs: 'of today', isUp: true, icon: CheckCircle2 },
        { id: 'no_show', label: 'No-Show Rate', labelAr: 'نسبة عدم الحضور', value: '0%', change: '0%', vs: 'vs yesterday', isUp: true, icon: AlertTriangle },
      ]
    : [
        { id: 'today', label: "Today's Appointments", labelAr: 'مواعيد اليوم', value: '28', change: '+12%', vs: 'vs yesterday', isUp: true, icon: CalendarIcon },
        { id: 'week', label: 'This Week', labelAr: 'هذا الأسبوع', value: '156', change: '+8.5%', vs: 'vs last week', isUp: true, icon: CalendarIcon },
        { id: 'month', label: 'This Month', labelAr: 'هذا الشهر', value: '642', change: '+18.3%', vs: 'vs last month', isUp: true, icon: CalendarIcon },
        { id: 'completed', label: 'Completed Today', labelAr: 'المكتملة اليوم', value: '18', change: '64%', vs: 'of today', isUp: true, icon: CheckCircle2 },
        { id: 'no_show', label: 'No-Show Rate', labelAr: 'نسبة عدم الحضور', value: '4.8%', change: '-1.2%', vs: 'vs yesterday', isUp: true, icon: AlertTriangle },
      ];

  // 2. Upcoming Appointments List matching Image 4
  const upcoming = isNewUser
    ? placedBookings.map(b => ({
        time: b.timeSlot || 'Scheduled',
        vehicle: b.vehicleDetails,
        plate: 'Plate pending',
        service: b.serviceName,
        status: b.status === 'confirmed' ? 'Confirmed' : 'Pending',
      }))
    : [
        { time: '09:00 AM', vehicle: 'Toyota Land Cruiser', plate: 'AHH 7862', service: 'Major Service', status: 'Confirmed' },
        { time: '10:30 AM', vehicle: 'BMW X5', plate: 'D 12345', service: 'Diagnostics', status: 'Confirmed' },
        { time: '12:00 PM', vehicle: 'Mercedes C200', plate: 'K 54121', service: 'Brake Service', status: 'Confirmed' },
        { time: '01:30 PM', vehicle: 'Nissan Patrol', plate: 'M 98765', service: 'AC Repair', status: 'Pending' },
        { time: '03:00 PM', vehicle: 'Honda Accord', plate: 'L 11223', service: 'Tire Replacement', status: 'Confirmed' },
      ];

  // 3. Technician Schedules matching Image 4
  const techSchedules = isNewUser
    ? []
    : [
        { name: 'Ahmed Khan', role: 'Master Technician', pct: '85%', count: '17 / 20', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80' },
        { name: 'Bilal Ahmed', role: 'Auto Electrician', pct: '70%', count: '14 / 20', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80' },
        { name: 'Faisal Mahmood', role: 'Diagnostics Expert', pct: '90%', count: '18 / 20', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&auto=format&fit=crop&q=80' },
        { name: 'Omar Farooq', role: 'AC Specialist', pct: '60%', count: '12 / 20', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&auto=format&fit=crop&q=80' },
        { name: 'Yasir Ali', role: 'Tire Technician', pct: '75%', count: '15 / 20', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&auto=format&fit=crop&q=80' },
      ];

  // 4. Time-Slot Matrix matching Image 4
  const timeSlots = isNewUser
    ? [
        { time: '08:00 AM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '09:00 AM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '10:00 AM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '11:00 AM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '12:00 PM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '01:00 PM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '02:00 PM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '03:00 PM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '04:00 PM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
        { time: '05:00 PM', d1: 'Available', d2: 'Available', d3: 'Available', d4: 'Available' },
      ]
    : [
        { time: '08:00 AM', d1: 'Booked', d2: 'Available', d3: 'Booked', d4: 'Available' },
        { time: '09:00 AM', d1: 'Booked', d2: 'Booked', d3: 'Available', d4: 'Blocked' },
        { time: '10:00 AM', d1: 'Booked', d2: 'Booked', d3: 'Available', d4: 'Available' },
        { time: '11:00 AM', d1: 'Available', d2: 'Available', d3: 'Booked', d4: 'Available' },
        { time: '12:00 PM', d1: 'Booked', d2: 'Available', d3: 'Booked', d4: 'Booked' },
        { time: '01:00 PM', d1: 'Booked', d2: 'Booked', d3: 'Maintenance', d4: 'Available' },
        { time: '02:00 PM', d1: 'Booked', d2: 'Booked', d3: 'Available', d4: 'Available' },
        { time: '03:00 PM', d1: 'Booked', d2: 'Booked', d3: 'Booked', d4: 'Available' },
        { time: '04:00 PM', d1: 'Available', d2: 'Available', d3: 'Booked', d4: 'Available' },
        { time: '05:00 PM', d1: 'Booked', d2: 'Booked', d3: 'Booked', d4: 'Maintenance' },
      ];

  // 5. Recent Appointments Table matching Image 4
  const recentAppointments = isNewUser
    ? placedBookings.map(b => ({
        date: `${b.date} ${b.timeSlot || '09:00 AM'}`,
        customer: b.customerName || 'Customer',
        vehicle: b.vehicleDetails,
        service: b.serviceName,
        tech: 'Unassigned',
        status: b.status === 'confirmed' ? 'Confirmed' : 'Pending',
        source: 'Online',
      }))
    : [
        { date: 'May 8, 2025 09:00 AM', customer: 'Khalid Al Mansoori', vehicle: 'Toyota Land Cruiser', service: 'Major Service', tech: 'Ahmed Khan', status: 'Confirmed', source: 'Online' },
        { date: 'May 8, 2025 10:30 AM', customer: 'Sara Al Blooshi', vehicle: 'BMW X5', service: 'Diagnostics', tech: 'Faisal Mahmood', status: 'Confirmed', source: 'Online' },
        { date: 'May 8, 2025 12:00 PM', customer: 'Omar Al Zaabi', vehicle: 'Mercedes C200', service: 'Brake Service', tech: 'Bilal Ahmed', status: 'Confirmed', source: 'Phone' },
        { date: 'May 8, 2025 01:30 PM', customer: 'Yousef Al Muslihi', vehicle: 'Nissan Patrol', service: 'AC Repair', tech: 'Omar Farooq', status: 'Pending', source: 'Walk-in' },
        { date: 'May 8, 2025 03:00 PM', customer: 'Fatima Al Shamsi', vehicle: 'Honda Accord', service: 'Tire Replacement', tech: 'Yasir Ali', status: 'Confirmed', source: 'Online' },
      ];

  const getSlotBadgeClass = (status: string) => {
    switch (status) {
      case 'Booked':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Blocked':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with View toggle & New Appointment */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'التقويم والمواعيد' : 'Calendar & Appointments'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'ar'
              ? 'إدارة الجداول، المواعيد والموارد بكفاءة عالية.'
              : 'Manage schedules, appointments and resources efficiently.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Month / Week / Day Switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['month', 'week', 'day'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCalendarView(view)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  calendarView === view ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {new Date().toLocaleDateString(language === 'ar' ? 'ar' : 'en-US', { month: 'long', year: 'numeric' })}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">
            {language === 'ar' ? 'اليوم' : 'Today'}
          </button>

          <button
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'موعد جديد' : '+ New Appointment'}</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Stat Cards matching Image 4 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((kpi) => {
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

              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
              </div>

              <div className="mt-2 text-[10px] font-bold">
                <span className="text-emerald-600">
                  ▲ {kpi.change} <span className="text-slate-400 font-medium">{kpi.vs}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Monthly Calendar & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">
                {new Date().toLocaleDateString(language === 'ar' ? 'ar' : 'en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
              <option>Month</option>
              <option>Week</option>
              <option>Day</option>
            </select>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 py-3 border-b border-slate-100">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-1.5 pt-2 text-xs">
            {/* April overflow */}
            <div className="min-h-[70px] p-1.5 rounded-xl bg-slate-50/50 text-slate-300">27</div>
            <div className="min-h-[70px] p-1.5 rounded-xl bg-slate-50/50 text-slate-300">28</div>
            <div className="min-h-[70px] p-1.5 rounded-xl bg-slate-50/50 text-slate-300">29</div>
            <div className="min-h-[70px] p-1.5 rounded-xl bg-slate-50/50 text-slate-300">30</div>

            {/* May Days */}
            {Array.from({ length: 31 }, (_, idx) => {
              const day = idx + 1;
              const isToday = day === 8;
              const isSelected = selectedDay === day;

              // Demo events only for non-new demo user
              const demoEvents: Record<number, { text: string; bg: string; textCol: string }> = {
                1: { text: '10:00 AM Major Service', bg: 'bg-amber-100', textCol: 'text-amber-900' },
                4: { text: '12:00 PM AC Repair', bg: 'bg-blue-100', textCol: 'text-blue-900' },
                6: { text: '2:00 PM Diagnostics', bg: 'bg-purple-100', textCol: 'text-purple-900' },
                9: { text: '9:00 AM Oil Change', bg: 'bg-emerald-100', textCol: 'text-emerald-900' },
                13: { text: '10:30 AM Battery Check', bg: 'bg-amber-100', textCol: 'text-amber-900' },
                16: { text: '1:00 PM Tire Replacement', bg: 'bg-rose-100', textCol: 'text-rose-900' },
                19: { text: '11:00 AM Engine Check', bg: 'bg-amber-100', textCol: 'text-amber-900' },
                21: { text: '10:00 AM Wheel Alignment', bg: 'bg-blue-100', textCol: 'text-blue-900' },
                23: { text: '2:30 PM AC Repair', bg: 'bg-blue-100', textCol: 'text-blue-900' },
                27: { text: '09:30 AM Diagnostics', bg: 'bg-purple-100', textCol: 'text-purple-900' },
                29: { text: '2:00 PM Major Service', bg: 'bg-amber-100', textCol: 'text-amber-900' },
              };
              const event = !isNewUser ? demoEvents[day] : null;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[70px] p-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/30'
                      : isToday
                      ? 'bg-blue-50/60 border-blue-200'
                      : 'border-slate-100 hover:border-blue-300'
                  } ${event ? 'space-y-1' : ''}`}
                >
                  {isToday ? (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-[10px]">
                      {day}
                    </span>
                  ) : (
                    <span className={`font-bold block ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                      {day}
                    </span>
                  )}
                  {event && (
                    <span className={`block px-1.5 py-0.5 rounded ${event.bg} ${event.textCol} text-[9px] font-bold truncate`}>
                      {event.text}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Upcoming Appointments</h3>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
            </div>

            {upcoming.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">No Scheduled Appointments</p>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  When customers book appointments for your garage, their reserved slots will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-3">
                {upcoming.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-600">{item.time}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                          item.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <strong className="text-xs font-bold text-slate-900 block">{item.vehicle}</strong>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{item.plate}</span>
                      <span className="font-medium text-slate-700">{item.service}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="w-full py-2.5 mt-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs text-center border border-slate-200">
            View Full Schedule →
          </button>
        </div>
      </div>

      {/* 4. Technician Schedules & Time-Slot Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technician Schedules */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Technician Schedules</h3>
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All →</button>
          </div>

          {techSchedules.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No technician shifts assigned yet.
            </div>
          ) : (
            <div className="space-y-3.5 mt-3">
              {techSchedules.map((tech, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={tech.avatar} alt={tech.name} className="w-6 h-6 rounded-full object-cover" />
                      <strong className="font-bold text-slate-900">{tech.name}</strong>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">{tech.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: tech.pct }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time-Slot Management Matrix */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Time-Slot Management</h3>
            <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700">
              <Plus className="w-3 h-3" />
              <span>Add Slot</span>
            </button>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="py-2 px-2 text-start">Time</th>
                  <th className="py-2 px-2 text-center">Day 1</th>
                  <th className="py-2 px-2 text-center">Day 2</th>
                  <th className="py-2 px-2 text-center">Day 3</th>
                  <th className="py-2 px-2 text-center">Day 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timeSlots.map((slot, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 px-2 font-bold text-slate-700">{slot.time}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSlotBadgeClass(slot.d1)}`}>
                        {slot.d1}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSlotBadgeClass(slot.d2)}`}>
                        {slot.d2}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSlotBadgeClass(slot.d3)}`}>
                        {slot.d3}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSlotBadgeClass(slot.d4)}`}>
                        {slot.d4}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Availability Settings, Reschedule & Service Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Availability Settings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Settings className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black text-slate-900">Availability Settings</h3>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Working Hours</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700">
              <option>08:00 AM – 06:00 PM</option>
              <option>09:00 AM – 07:00 PM</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Working Days</label>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <button
                  key={d}
                  onClick={() =>
                    setWorkingDays((prev) =>
                      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                    )
                  }
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    workingDays.includes(d)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Slot Duration</label>
              <select
                value={slotDuration}
                onChange={(e) => setSlotDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold"
              >
                <option>30 Minutes</option>
                <option>45 Minutes</option>
                <option>60 Minutes</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Buffer Time</label>
              <select
                value={bufferTime}
                onChange={(e) => setBufferTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold"
              >
                <option>15 Minutes</option>
                <option>30 Minutes</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 pt-1 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={allowOnline}
                onChange={(e) => setAllowOnline(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span>Allow Online Booking</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={autoConfirm}
                onChange={(e) => setAutoConfirm(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span>Auto-Confirm Appointments</span>
            </label>
          </div>

          <button
            onClick={() => showToast('Online booking and auto-confirm schedule settings saved!')}
            className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
          >
            Save Settings
          </button>
        </div>

        {/* Reschedule Appointment */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-black text-slate-900">Reschedule Appointment</h3>
          </div>

          {isNewUser && placedBookings.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <RotateCcw className="w-6 h-6 mx-auto text-slate-300 opacity-60" />
              <p className="text-xs font-bold text-slate-700">
                {language === 'ar' ? 'لا توجد مواعيد لإعادة جدولتها' : 'No Appointments to Reschedule'}
              </p>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                {language === 'ar'
                  ? 'عند حجز العملاء لمواعيد في ورشتك، ستتمكن من تعديل التوقيت وإشعار العميل فوراً.'
                  : 'Select an appointment from your calendar to change dates or times.'}
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Current Appointment</label>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800">
                  {placedBookings[0]
                    ? `${placedBookings[0].date} – ${placedBookings[0].timeSlot || '10:30 AM'}`
                    : 'May 8, 2025 – 10:30 AM'} <br />
                  <span className="text-[10px] text-slate-500 font-normal">
                    {placedBookings[0]
                      ? `${placedBookings[0].vehicleDetails} – ${placedBookings[0].serviceName}`
                      : 'BMW X5 – Diagnostics'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">New Date</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">New Time</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold">
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Reason (Optional)</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700">
                  <option>Customer Request</option>
                  <option>Technician Unavailable</option>
                  <option>Parts Delayed</option>
                </select>
              </div>

              <button
                onClick={() => showToast('Appointment rescheduled and customer notified via SMS!')}
                className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm mt-2 cursor-pointer"
              >
                Reschedule
              </button>
            </>
          )}
        </div>

        {/* Service Reminders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900">Service Reminders</h3>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All →</button>
            </div>

            <div className="space-y-2 mt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <span className="font-bold text-blue-900">Due Today</span>
                <strong className="text-sm font-black text-blue-900">{isNewUser ? '0' : '12'}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                <span className="font-bold text-amber-900">Due This Week</span>
                <strong className="text-sm font-black text-amber-900">{isNewUser ? '0' : '36'}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <span className="font-bold text-emerald-900">Due This Month</span>
                <strong className="text-sm font-black text-emerald-900">{isNewUser ? '0' : '98'}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
                <span className="font-bold text-rose-900">Overdue</span>
                <strong className="text-sm font-black text-rose-900">{isNewUser ? '0' : '5'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Charts Row: Appointments Trend, No-Show Rate, Peak Hours, Service Mix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Appointments Trend */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h4 className="text-xs font-black text-slate-900 mb-2">Appointments Trend</h4>
          <div className="h-28 w-full flex items-center justify-center">
            {isNewUser ? (
              <div className="text-center text-slate-400 py-4">
                <TrendingUp className="w-5 h-5 mx-auto text-slate-300 mb-1 opacity-60" />
                <span className="text-[10px] block font-bold text-slate-600">Awaiting Booking Activity</span>
              </div>
            ) : (
              <svg className="w-full h-full" viewBox="0 0 150 80">
                <path d="M 10 60 Q 40 40, 75 45 T 140 20" fill="none" stroke="#2563EB" strokeWidth="2.5" />
              </svg>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            {isNewUser ? (language === 'ar' ? 'حساب جديد جاهز' : 'New account ready') : 'This Month'}
          </span>
        </div>

        {/* No-Show Rate Circle */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs text-center flex flex-col items-center justify-center">
          <h4 className="text-xs font-black text-slate-900 mb-2">No-Show Rate</h4>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
              {!isNewUser && (
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="4.8, 100" />
              )}
            </svg>
            <div className="absolute text-center">
              <strong className="text-sm font-black text-slate-900">{isNewUser ? '0%' : '4.8%'}</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 mt-1">
            {isNewUser ? (language === 'ar' ? 'معدل الحضور 100%' : 'Optimal attendance') : '▼ 1.2% vs last month'}
          </span>
        </div>

        {/* Peak Hours Bar Chart */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h4 className="text-xs font-black text-slate-900 mb-2">Peak Hours</h4>
          {isNewUser ? (
            <div className="h-20 flex items-center justify-center text-center text-slate-400">
              <span className="text-[10px] font-bold text-slate-500">
                {language === 'ar' ? 'لا توجد بيانات ساعات ذروة بعد' : 'No peak traffic data yet'}
              </span>
            </div>
          ) : (
            <div className="flex items-end justify-between h-20 pt-2 gap-1.5">
              {[
                { label: '8AM', val: 30 },
                { label: '10AM', val: 75 },
                { label: '12PM', val: 50 },
                { label: '2PM', val: 90 },
                { label: '4PM', val: 60 },
                { label: '6PM', val: 20 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-600 rounded-t" style={{ height: `${bar.val}%` }} />
                  <span className="text-[8px] font-bold text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Mix Donut */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h4 className="text-xs font-black text-slate-900 mb-2">Service Mix</h4>
          <div className="space-y-1 text-[10px] font-bold text-slate-600">
            <div className="flex justify-between">
              <span>● General Service</span>
              <span>{isNewUser ? '0%' : '40%'}</span>
            </div>
            <div className="flex justify-between">
              <span>● Diagnostics</span>
              <span>{isNewUser ? '0%' : '31%'}</span>
            </div>
            <div className="flex justify-between">
              <span>● Repairs</span>
              <span>{isNewUser ? '0%' : '20%'}</span>
            </div>
            <div className="flex justify-between">
              <span>● Others</span>
              <span>{isNewUser ? '0%' : '9%'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Quick Actions Row (8 buttons matching Image 4) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <h3 className="text-xs font-black text-slate-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { label: 'New Appointment', icon: CalendarIcon, onClick: () => setIsNewAppointmentModalOpen(true) },
            { label: 'Block Time', icon: Ban, onClick: () => showToast('Select time slot on calendar to block workshop bay hours') },
            { label: 'Add Technician', icon: Users, onClick: () => onNavigateTab ? onNavigateTab('technicians') : showToast('Navigating to Technicians...') },
            { label: 'Walk-in Booking', icon: Car, onClick: () => setIsNewAppointmentModalOpen(true) },
            { label: 'Manage Bay', icon: Wrench, onClick: () => showToast('Diagnostic Bay 1 & Bay 2 are online and available') },
            { label: 'Send Reminder', icon: Send, onClick: () => showToast('Automated reminder SMS sent to all scheduled customers!') },
            { label: 'Export Calendar', icon: Download, onClick: () => showToast('Calendar schedule exported as iCal / Google Calendar file!') },
            { label: 'Booking Reports', icon: FileText, onClick: () => showToast('Booking utilization report downloaded as PDF!') },
          ].map((act, i) => {
            const Icon = act.icon;
            return (
              <button
                key={i}
                onClick={act.onClick}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 text-center flex flex-col items-center gap-1 transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4 text-slate-600" />
                <span className="text-[9px] font-bold text-slate-700 leading-tight">{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Recent Appointments Table matching Image 4 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900">Recent Appointments</h3>
          {!isNewUser && <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All →</button>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4 text-start">Date & Time</th>
                <th className="py-2.5 px-4 text-start">Customer</th>
                <th className="py-2.5 px-4 text-start">Vehicle</th>
                <th className="py-2.5 px-4 text-start">Service</th>
                <th className="py-2.5 px-4 text-start">Technician</th>
                <th className="py-2.5 px-4 text-start">Status</th>
                <th className="py-2.5 px-4 text-start">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {isNewUser && recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    <CalendarIcon className="w-7 h-7 mx-auto text-slate-300 mb-2 opacity-60" />
                    <p className="font-bold text-slate-700">
                      {language === 'ar' ? 'لا توجد مواعيد محجوزة حالياً' : 'No Appointments Booked Yet'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {language === 'ar'
                        ? 'ستظهر هنا المواعيد الواردة من العملاء عبر التطبيق أو المسجلة يدوياً في الورشة'
                        : 'Online customer bookings and direct walk-in reservations will appear here.'}
                    </p>
                  </td>
                </tr>
              ) : (
                recentAppointments.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.date}</td>
                    <td className="py-2.5 px-4">{row.customer}</td>
                    <td className="py-2.5 px-4 font-bold">{row.vehicle}</td>
                    <td className="py-2.5 px-4">{row.service}</td>
                    <td className="py-2.5 px-4">{row.tech}</td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          row.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">{row.source}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'حسّن جدول مواعيدك مع أهل المركبات' : 'Optimize Your Schedule with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            Smart scheduling, happy customers, higher productivity.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm"
            >
              Explore Calendar Features
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('settings')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* 10. New Appointment Modal */}
      {isNewAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Book New Appointment</h3>
                  <p className="text-[11px] text-slate-500">Schedule customer workshop visit</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewAppointmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsNewAppointmentModalOpen(false);
                showToast(`Appointment booked for ${newApptForm.customer || 'Customer'} on ${newApptForm.date} at ${newApptForm.timeSlot}!`);
                setNewApptForm({
                  customer: '',
                  phone: '',
                  vehicle: '',
                  service: 'Major Service',
                  timeSlot: '09:00 AM',
                  date: new Date().toISOString().split('T')[0],
                  tech: 'Ahmed Khan',
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newApptForm.customer}
                    onChange={(e) => setNewApptForm({ ...newApptForm, customer: e.target.value })}
                    placeholder="e.g. Sultan Al Nuaimi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newApptForm.phone}
                    onChange={(e) => setNewApptForm({ ...newApptForm, phone: e.target.value })}
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
                    value={newApptForm.vehicle}
                    onChange={(e) => setNewApptForm({ ...newApptForm, vehicle: e.target.value })}
                    placeholder="e.g. Nissan Patrol 2021"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Required</label>
                  <select
                    value={newApptForm.service}
                    onChange={(e) => setNewApptForm({ ...newApptForm, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Major Service">Major Service</option>
                    <option value="Diagnostics">Full Diagnostics</option>
                    <option value="Brake Service">Brake Service</option>
                    <option value="AC Repair">AC System Service</option>
                    <option value="Oil Change">Oil & Filter Change</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={newApptForm.date}
                    onChange={(e) => setNewApptForm({ ...newApptForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                  <select
                    value={newApptForm.timeSlot}
                    onChange={(e) => setNewApptForm({ ...newApptForm, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewAppointmentModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Confirm Booking
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
