import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Users,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Star,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Send,
  MoreVertical,
  Wrench,
  ShieldCheck,
  UserCheck,
  X,
  Phone,
} from 'lucide-react';

interface ProviderTechniciansTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderTechniciansTab: React.FC<ProviderTechniciansTabProps> = ({ onNavigateTab }) => {
  const { language, user, jobs, placedBookings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const initialTechnicians = isNewUser
    ? [
        {
          id: 'TECH-001',
          name: user?.name || 'Owner & Lead Specialist',
          role: 'Owner / Lead Technician',
          specialty: 'Workshop Operations & General Inspection',
          schedule: '08:00 AM – 06:00 PM',
          jobs: 0,
          rating: '5.0',
          reviews: 0,
          status: 'On Duty',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        },
      ]
    : [
        { id: 'TECH-1001', name: 'Ahmed Hassan', role: 'Master Technician', specialty: 'Engine, Diagnostics', schedule: '09:00 AM – 06:00 PM', jobs: 3, rating: '4.9', reviews: 120, status: 'On Duty', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1002', name: 'Faisal Khan', role: 'Senior Technician', specialty: 'Transmission, Clutch', schedule: '09:00 AM – 06:00 PM', jobs: 2, rating: '4.8', reviews: 102, status: 'On Duty', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1003', name: 'Rashid Al Mansoori', role: 'Technician', specialty: 'Electrical, AC', schedule: '10:00 AM – 07:00 PM', jobs: 1, rating: '4.7', reviews: 89, status: 'On Duty', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1004', name: 'Imran Ali', role: 'Technician', specialty: 'Brakes, Suspension', schedule: '09:00 AM – 06:00 PM', jobs: 2, rating: '4.6', reviews: 78, status: 'On Duty', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1005', name: 'Sajid Mahmood', role: 'Junior Technician', specialty: 'General Service', schedule: '09:00 AM – 06:00 PM', jobs: 1, rating: '4.4', reviews: 51, status: 'On Duty', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1006', name: 'Mohammed Yousuf', role: 'Technician', specialty: 'Engine, Tuning', schedule: '02:00 PM – 10:00 PM', jobs: 2, rating: '4.5', reviews: 68, status: 'On Duty', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1007', name: 'Sultan Al Zaabi', role: 'Master Technician', specialty: 'Diagnostics, ECM', schedule: '09:00 AM – 06:00 PM', jobs: 0, rating: '4.9', reviews: 135, status: 'Off Duty', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80' },
        { id: 'TECH-1008', name: 'Arun Kumar', role: 'Technician', specialty: 'AC, Electrical', schedule: '10:00 AM – 07:00 PM', jobs: 0, rating: '4.3', reviews: 42, status: 'Off Duty', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80' },
      ];

  const [techList, setTechList] = useState(initialTechnicians);

  // Modal State
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    role: 'Technician',
    specialty: 'Brakes & Suspension',
    schedule: '08:00 AM – 05:00 PM',
    phone: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TECH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMember = {
      id: newId,
      name: newMemberForm.name || 'New Specialist',
      role: newMemberForm.role,
      specialty: newMemberForm.specialty,
      schedule: newMemberForm.schedule,
      jobs: 0,
      rating: '5.0',
      reviews: 0,
      status: 'On Duty',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    };

    setTechList([newMember, ...techList]);
    setIsAddMemberModalOpen(false);
    showToast(`Technician ${newMember.name} added to your team!`);
    setNewMemberForm({
      name: '',
      role: 'Technician',
      specialty: 'Brakes & Suspension',
      schedule: '08:00 AM – 05:00 PM',
      phone: '',
    });
  };

  const filteredTechs = techList.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'All' || t.role.includes(roleFilter);
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const onDutyCount = techList.filter((t) => t.status === 'On Duty').length;

  // 1. KPI Cards
  const kpis = [
    { label: 'Total Staff', value: `${techList.length}`, change: '+3 this month', isUp: true, icon: Users },
    { label: 'On-Duty Technicians', value: `${onDutyCount}`, change: `${Math.round((onDutyCount / Math.max(1, techList.length)) * 100)}% active`, isUp: true, icon: UserCheck },
    { label: 'Certifications', value: isNewUser ? '1' : '42', change: 'Verified', isUp: true, icon: Award },
    { label: 'Productivity Score', value: isNewUser ? '5.0 / 5' : '4.7 / 5', change: '+0.3 vs last month', isUp: true, icon: TrendingUp },
  ];

  // 3. Performance Scores
  const performance = [
    { name: 'Ahmed Hassan', pct: '96%' },
    { name: 'Faisal Khan', pct: '91%' },
    { name: 'Rashid Al Mansoori', pct: '85%' },
    { name: 'Imran Ali', pct: '84%' },
    { name: 'Sajid Mahmood', pct: '81%' },
  ];

  // 4. Certifications
  const certs = [
    { title: 'ASE Master Technician', count: '8 Technicians', status: 'Valid', color: 'text-emerald-700 bg-emerald-50' },
    { title: 'Hybrid/EV Certified', count: '5 Technicians', status: 'Valid', color: 'text-emerald-700 bg-emerald-50' },
    { title: 'AC Systems Specialist', count: '7 Technicians', status: 'Valid', color: 'text-emerald-700 bg-emerald-50' },
    { title: 'Advanced Diagnostics', count: '6 Technicians', status: 'Expires Soon', color: 'text-amber-700 bg-amber-50' },
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

      {/* 1. Header with Title & Add Member */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'الفنيين وفريق العمل' : 'Technicians & Team'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your team, performance, schedules and productivity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Team roster schedule exported!')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Shift Schedule</span>
          </button>

          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة عضو' : '+ Add Member'}</span>
          </button>
        </div>
      </div>

      {/* 2. 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{kpi.label}</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[11px] font-bold text-emerald-600">
                ▲ {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Team Overview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-black text-slate-900">Technicians Directory ({filteredTechs.length})</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technician..."
                className="bg-slate-50 border border-slate-200 rounded-lg ps-8 pe-2.5 py-1 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All">All Status</option>
              <option value="On Duty">On Duty</option>
              <option value="Off Duty">Off Duty</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4 text-start">Technician</th>
                <th className="py-3 px-4 text-start">Role</th>
                <th className="py-3 px-4 text-start">Specialization</th>
                <th className="py-3 px-4 text-start">Schedule</th>
                <th className="py-3 px-4 text-center">Rating</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Toggle Duty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTechs.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <strong className="text-slate-900 font-bold block">{t.name}</strong>
                      <span className="text-[10px] font-mono text-slate-400">{t.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{t.role}</td>
                  <td className="py-3 px-4 text-slate-600">{t.specialty}</td>
                  <td className="py-3 px-4 text-slate-500">{t.schedule}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 font-black text-amber-600">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {t.rating}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        t.status === 'On Duty' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        const newStatus = t.status === 'On Duty' ? 'Off Duty' : 'On Duty';
                        const updated = techList.map((item) =>
                          item.id === t.id ? { ...item, status: newStatus } : item
                        );
                        setTechList(updated);
                        showToast(`${t.name} is now ${newStatus}`);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Team Productivity & Certification Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-xs font-black text-slate-900">Technician Efficiency Scores</h3>
          <div className="space-y-3">
            {performance.map((p, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">{p.name}</span>
                  <span className="font-black text-blue-600">{p.pct}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: p.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-xs font-black text-slate-900">Certifications & Accreditations</h3>
          <div className="space-y-2.5">
            {certs.map((c, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 font-bold block">{c.title}</strong>
                  <span className="text-[10px] text-slate-500">{c.count}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.color}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grow Your Team Card */}
        <div className="bg-[#0B1528] text-white rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-black text-white">Grow Your Team</h3>
            <p className="text-xs text-slate-300">Add skilled technicians to boost productivity and handle more service jobs.</p>
            <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
              <li>✓ Post job openings</li>
              <li>✓ Assign diagnostic bays</li>
              <li>✓ Track billable labor hours</li>
              <li>✓ Performance metrics</li>
            </ul>
          </div>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="w-full py-2.5 mt-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
          >
            + Add New Member
          </button>
        </div>
      </div>

      {/* 5. Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Add Team Member / Technician</h3>
                  <p className="text-[11px] text-slate-500">Register workshop technician profile</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  placeholder="e.g. Tariq Al Nuaimi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role</label>
                  <select
                    value={newMemberForm.role}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Master Technician">Master Technician</option>
                    <option value="Senior Technician">Senior Technician</option>
                    <option value="Technician">Technician</option>
                    <option value="Junior Technician">Junior Technician</option>
                    <option value="Service Advisor">Service Advisor</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Specialization</label>
                  <input
                    type="text"
                    value={newMemberForm.specialty}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, specialty: e.target.value })}
                    placeholder="e.g. Engine, Transmission"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shift Schedule</label>
                  <input
                    type="text"
                    value={newMemberForm.schedule}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, schedule: e.target.value })}
                    placeholder="08:00 AM – 05:00 PM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Save & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
