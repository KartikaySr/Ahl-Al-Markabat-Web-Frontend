import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ArrowLeft,
  Printer,
  FileText,
  User,
  Car,
  Phone,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Camera,
  Plus,
  Send,
  Download,
  Share2,
  ChevronDown,
  Check,
  X,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Truck,
  Eye,
  Sliders,
} from 'lucide-react';

interface ProviderWorkOrderTabProps {
  jobId?: string;
  onBack: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ProviderWorkOrderTab: React.FC<ProviderWorkOrderTabProps> = ({
  jobId = 'WD-2025-01456',
  onBack,
  onNavigateTab,
}) => {
  const { language, formatPrice } = useApp();
  const [photoTab, setPhotoTab] = useState<'before' | 'during' | 'after'>('during');
  const [currentStep, setCurrentStep] = useState(4); // In Progress
  const [jobStatus, setJobStatus] = useState('In Progress');
  const [progressPercent, setProgressPercent] = useState(62);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const steps = [
    { num: 1, title: 'Received', time: 'May 1, 10:24 AM', status: 'done' },
    { num: 2, title: 'Diagnosis', time: 'May 1, 11:15 AM', status: 'done' },
    { num: 3, title: 'Quote Sent', time: 'May 1, 1:30 PM', status: 'done' },
    { num: 4, title: 'In Progress', time: 'May 1, 2:00 PM', status: 'active' },
    { num: 5, title: 'Quality Check', time: 'Pending', status: 'pending' },
    { num: 6, title: 'Completed', time: 'Pending', status: 'pending' },
  ];

  const laborItems = [
    { name: 'Engine Misfire Diagnosis', tech: 'Ahmed H.', hours: '1.0', rate: '150.00', total: '150.00' },
    { name: 'Spark Plug Replacement', tech: 'Ahmed H.', hours: '1.5', rate: '150.00', total: '225.00' },
    { name: 'Ignition Coil Replacement', tech: 'Ahmed H.', hours: '1.0', rate: '150.00', total: '150.00' },
    { name: 'Brake Pad Inspection & Replace (Front)', tech: 'Yousef K.', hours: '1.5', rate: '150.00', total: '225.00' },
    { name: 'Air Filter Replacement', tech: 'Yousef K.', hours: '0.5', rate: '100.00', total: '50.00' },
    { name: 'Final Road Test & Check', tech: 'Ahmed H.', hours: '0.5', rate: '100.00', total: '50.00' },
  ];

  const partsItems = [
    { name: 'Spark Plug (NGK)', qty: 4, unitPrice: '65.00', total: '260.00', issuedBy: 'Yousef K.', time: 'May 1, 2:05 PM' },
    { name: 'Ignition Coil', qty: 1, unitPrice: '350.00', total: '350.00', issuedBy: 'Yousef K.', time: 'May 1, 2:06 PM' },
    { name: 'Brake Pad Set (Front)', qty: 1, unitPrice: '280.00', total: '280.00', issuedBy: 'Yousef K.', time: 'May 1, 2:20 PM' },
    { name: 'Air Filter', qty: 1, unitPrice: '95.00', total: '95.00', issuedBy: 'Yousef K.', time: 'May 1, 2:22 PM' },
    { name: 'Engine Oil 5W-30 (4L)', qty: 1, unitPrice: '180.00', total: '180.00', issuedBy: 'Yousef K.', time: 'May 1, 2:25 PM' },
    { name: 'Oil Filter', qty: 1, unitPrice: '120.00', total: '120.00', issuedBy: 'Yousef K.', time: 'May 1, 2:26 PM' },
  ];

  const photos = [
    '/images/parts/engine_oil_filter.jpg',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&auto=format&fit=crop&q=80',
    '/images/parts/ceramic_brake_pads.jpg',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80',
    '/images/parts/iridium_spark_plugs.jpg',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumb & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Job / Work Order Details
            </h1>
            <p className="text-xs text-slate-500">
              Track, update and manage every detail of the job in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast(`Work order ${jobId} PDF exported and sent to printer!`)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print / Download</span>
          </button>
          <button
            onClick={() => setIsActionsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
          >
            <span>Actions</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Top Job Overview Banner Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-slate-100">
          {/* Job ID & Source */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Job ID</span>
            <div className="flex items-center gap-2">
              <strong className="text-base font-black text-slate-900 font-mono">{jobId}</strong>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black">Open</span>
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[9px] font-black me-1">High Priority</span>
              <span>Created: May 1, 2025 • 10:24 AM</span>
            </div>
            <span className="text-[10px] text-slate-400 block">Source: Mobile App • General Service</span>
          </div>

          {/* Customer */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Customer</span>
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                alt="Omar Al-Harbi"
                className="w-9 h-9 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Omar Al-Harbi</strong>
                <span className="text-[10px] text-slate-500 font-mono">+970 59 123 4567</span>
              </div>
            </div>
            <button className="text-[10px] font-bold text-blue-600">View Profile</button>
          </div>

          {/* Vehicle */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Vehicle</span>
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=80&auto=format&fit=crop&q=80"
                alt="2021 Hyundai Tucson"
                className="w-12 h-9 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">2021 Hyundai Tucson</strong>
                <span className="text-[10px] text-slate-400 block font-mono">Plate: 7-1234-A</span>
              </div>
            </div>
            <button className="text-[10px] font-bold text-blue-600">View Vehicle</button>
          </div>

          {/* Assigned Technician */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Technician</span>
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                alt="Ahmed H."
                className="w-9 h-9 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Ahmed H.</strong>
                <span className="text-[10px] text-slate-400 block">Senior Technician • ★ 4.9</span>
              </div>
            </div>
            <button className="text-[10px] font-bold text-blue-600">Chat</button>
          </div>
        </div>

        {/* Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[9px] text-slate-400 font-bold block uppercase">Current Mileage</span>
            <strong className="text-slate-900 font-bold">62,458 km</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[9px] text-slate-400 font-bold block uppercase">Due Date</span>
            <strong className="text-slate-900 font-bold">May 3, 2025 • 5:00 PM</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[9px] text-slate-400 font-bold block uppercase">Estimated Time</span>
            <strong className="text-slate-900 font-bold">6 – 8 Hours</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-[9px] text-blue-600 font-bold block uppercase">Job Status</span>
            <strong className="text-blue-900 font-black">In Progress</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-[9px] text-emerald-600 font-bold block uppercase">Payment Status</span>
            <strong className="text-emerald-900 font-black">Quote Sent</strong>
          </div>
        </div>
      </div>

      {/* 3. Job Progress Step Tracker matching Image 2 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <h3 className="text-xs font-black text-slate-900 mb-4">Job Progress</h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`p-3 rounded-xl border text-xs ${
                step.status === 'done'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : step.status === 'active'
                  ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                {step.status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold">
                    {step.num}
                  </span>
                )}
                <strong className="text-[11px] block">{step.title}</strong>
              </div>
              <span className="text-[9px] text-slate-500 block">{step.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Diagnostics & Issue Summary & Job Status (62%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diagnostics & Issue Summary (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-900">Diagnostics & Issue Summary</h3>
            <button className="text-[11px] font-bold text-blue-600">View Full Report →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-rose-600 uppercase block">Primary Issues</span>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Engine misfire detected on cylinder #2</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Check engine light is ON (P0302)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Reduced power and rough idle</span>
                </li>
              </ul>

              <div className="pt-2">
                <span className="text-[10px] font-bold text-amber-600 uppercase block">Secondary Issues</span>
                <ul className="space-y-1 text-slate-600 text-[11px] mt-1">
                  <li>• Brake pads front worn out</li>
                  <li>• Air filter dirty – needs replacement</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-[11px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Diagnostic Details</span>
              <div>OBD-II Code: <strong className="font-mono font-bold text-slate-900">P0302 – Cylinder 2 Misfire</strong></div>
              <div>System Scanned: <span className="font-medium text-slate-700">Engine, Transmission, ABS, Airbag</span></div>
              <div>Diagnostic Tools: <span className="font-medium text-slate-700">Launch X431 Pro v5.0</span></div>
              <div className="pt-1 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 block">Technician Notes:</span>
                <p className="text-slate-600 italic">Misfire likely due to faulty spark plug or ignition coil.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Status Card (62% Complete) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Job Status</h3>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                ● In Progress
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-2xl font-black text-slate-900">{progressPercent}%</span>
                <span className="text-slate-400 text-[10px]">{jobStatus}</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 block">Status: {jobStatus} • Bay 2 Diagnostic</span>
            </div>
          </div>

          <button
            onClick={() => setIsStatusModalOpen(true)}
            className="w-full py-2.5 mt-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* 5. Quotation Summary & Labor Breakdown & Parts */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-6">
        {/* Quotation Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <h3 className="text-sm font-black text-slate-900">Quotation Summary</h3>
            <span className="text-[11px] text-slate-400">Sent on May 1, 2025 • 1:30 PM</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Parts</span>
              <strong className="text-slate-900 font-bold">AED 1,245.00</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Total Labor</span>
              <strong className="text-slate-900 font-bold">AED 850.00</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Taxes (5%)</span>
              <strong className="text-slate-900 font-bold">AED 104.75</strong>
            </div>
            <div className="border-s border-slate-200 ps-4">
              <span className="text-[10px] text-slate-400 block">Grand Total</span>
              <strong className="text-base font-black text-blue-600">AED 2,199.75</strong>
            </div>
          </div>
        </div>

        {/* Labor Breakdown Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-900">Labor Breakdown</h4>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-2.5 px-3 text-start">Service / Task</th>
                  <th className="py-2.5 px-3 text-start">Technician</th>
                  <th className="py-2.5 px-3 text-center">Hours</th>
                  <th className="py-2.5 px-3 text-end">Rate (AED)</th>
                  <th className="py-2.5 px-3 text-end">Amount (AED)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {laborItems.map((l, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{l.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{l.tech}</td>
                    <td className="py-2.5 px-3 text-center font-bold">{l.hours}</td>
                    <td className="py-2.5 px-3 text-end">{l.rate}</td>
                    <td className="py-2.5 px-3 text-end font-bold text-slate-900">{l.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between text-xs font-black pt-1">
            <span>Total Labor Cost: 5.0 Hours</span>
            <span className="text-blue-600">AED 850.00</span>
          </div>
        </div>

        {/* Parts Required vs Parts Issued */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-900">Parts Required & Issued</h4>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-2.5 px-3 text-start">Part Name</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-end">Unit Price</th>
                  <th className="py-2.5 px-3 text-end">Total</th>
                  <th className="py-2.5 px-3 text-start">Issued By</th>
                  <th className="py-2.5 px-3 text-end">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {partsItems.map((p, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 text-center font-bold">{p.qty}</td>
                    <td className="py-2.5 px-3 text-end">AED {p.unitPrice}</td>
                    <td className="py-2.5 px-3 text-end font-bold text-slate-900">AED {p.total}</td>
                    <td className="py-2.5 px-3 text-slate-600">{p.issuedBy}</td>
                    <td className="py-2.5 px-3 text-end text-slate-400 text-[10px]">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between text-xs font-black pt-1">
            <span className="text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All parts issued and recorded
            </span>
            <span className="text-blue-600">Total Parts: AED 1,245.00</span>
          </div>
        </div>
      </div>

      {/* 6. Photo Attachments Gallery */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-900">Photo Attachments</h3>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setPhotoTab('before')}
              className={`px-3 py-1 rounded-lg ${photoTab === 'before' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Before Service (3)
            </button>
            <button
              onClick={() => setPhotoTab('during')}
              className={`px-3 py-1 rounded-lg ${photoTab === 'during' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              During Service (4)
            </button>
            <button
              onClick={() => setPhotoTab('after')}
              className={`px-3 py-1 rounded-lg ${photoTab === 'after' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              After Service (0)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {photos.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Inspection photo"
              className="w-full h-24 rounded-xl object-cover border border-slate-200"
            />
          ))}
        </div>
      </div>

      {/* 7. Technician Notes, Service Checklist & Quality Control Signature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Checklist */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Service Checklist</h3>
          <div className="space-y-2 text-xs">
            {[
              { title: 'Diagnostic Scan', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              { title: 'Engine Repair', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              { title: 'Parts Replacement', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              { title: 'Fluids & Filters', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              { title: 'Brake System', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              { title: 'Road Test', status: 'In Progress', color: 'bg-blue-100 text-blue-800' },
              { title: 'Final Inspection', status: 'Pending', color: 'bg-slate-100 text-slate-600' },
              { title: 'Customer Approval', status: 'Pending', color: 'bg-slate-100 text-slate-600' },
            ].map((chk, i) => (
              <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                <span className="font-bold text-slate-800">✓ {chk.title}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black ${chk.color}`}>{chk.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Control & Signature */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">Quality Control</h3>
            <div className="space-y-2 text-xs mt-2">
              {[
                { title: 'Workmanship Quality', status: 'Pass' },
                { title: 'Parts Quality', status: 'Pass' },
                { title: 'Safety Check', status: 'Pass' },
                { title: 'Cleanliness', status: 'Pass' },
                { title: 'Test Drive', status: 'Pass' },
              ].map((qc, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span className="font-bold text-slate-800">✓ {qc.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">{qc.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Technician Signature</span>
              <strong className="text-xs font-bold text-slate-800">Ahmed H.</strong>
            </div>
            <div className="font-serif italic text-blue-600 text-lg font-black">Ahmed H.</div>
          </div>
        </div>
      </div>

      {/* 8. Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
        >
          Back to Jobs
        </button>
        <button
          onClick={() => {
            setJobStatus('Completed');
            setProgressPercent(100);
            setCurrentStep(7);
            showToast(`Job ${jobId} marked as completed and customer notified!`);
          }}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm cursor-pointer"
        >
          {jobStatus === 'Completed' ? '✓ Job Completed' : 'Complete Job'}
        </button>
      </div>

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Update Job Step</h3>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-bold text-slate-700">
              {[
                { name: 'Parts Arrived & Bay Assigned', pct: 40, step: 3 },
                { name: 'In Progress (Active Labor)', pct: 62, step: 4 },
                { name: 'Quality Inspection & Road Test', pct: 85, step: 5 },
                { name: 'Final Invoice Ready & Complete', pct: 100, step: 7 },
              ].map((st, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setJobStatus(st.name);
                    setProgressPercent(st.pct);
                    setCurrentStep(st.step);
                    setIsStatusModalOpen(false);
                    showToast(`Job progress updated to ${st.pct}% (${st.name})`);
                  }}
                  className="w-full text-start p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 transition-all cursor-pointer"
                >
                  <span className="block text-slate-900">{st.name}</span>
                  <span className="text-[10px] text-slate-400">{st.pct}% Completion</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions Modal */}
      {isActionsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Work Order Actions</h3>
              <button
                onClick={() => setIsActionsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-bold text-slate-700">
              <button
                onClick={() => {
                  setIsActionsModalOpen(false);
                  showToast('Reassigned to Senior Technician Ahmed Hassan');
                }}
                className="w-full text-start p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                Reassign Technician
              </button>
              <button
                onClick={() => {
                  setIsActionsModalOpen(false);
                  showToast('SMS & WhatsApp status update sent to vehicle owner');
                }}
                className="w-full text-start p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                Notify Customer via WhatsApp
              </button>
              <button
                onClick={() => {
                  setIsActionsModalOpen(false);
                  if (onNavigateTab) onNavigateTab('invoices');
                  else showToast('Navigating to Invoices...');
                }}
                className="w-full text-start p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                Generate Tax Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
