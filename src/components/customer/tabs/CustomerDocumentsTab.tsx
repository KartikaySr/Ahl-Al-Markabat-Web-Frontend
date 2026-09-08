import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Download,
  Upload,
  CheckCircle2,
  ExternalLink,
  Lock,
  Plus,
  Car,
  Clock,
} from 'lucide-react';

export const CustomerDocumentsTab: React.FC = () => {
  const { language } = useApp();

  const documents = [
    {
      id: 'doc-1',
      title: 'Vehicle Registration Card (Mulkiya / Istimara)',
      titleAr: 'رخصة سير المركبة (الملكية / الاستمارة)',
      type: 'registration',
      vehicle: '2022 Toyota RAV4 (Dubai A 12345)',
      authority: 'Roads & Transport Authority (RTA) / Ministry of Transport',
      issueDate: '15 Mar 2023',
      expiryDate: '14 Mar 2025',
      daysLeft: 42,
      status: 'expiring_soon',
      fileSize: '2.4 MB PDF',
      verified: true,
    },
    {
      id: 'doc-2',
      title: 'Comprehensive Motor Insurance Policy',
      titleAr: 'وثيقة التأمين الشامل للمركبة',
      type: 'insurance',
      vehicle: '2022 Toyota RAV4 (Dubai A 12345)',
      authority: 'Al Buhaira National Insurance / Palestine Insurance Co.',
      issueDate: '15 Mar 2023',
      expiryDate: '14 Mar 2025',
      daysLeft: 42,
      status: 'active',
      fileSize: '3.8 MB PDF',
      verified: true,
      policyNumber: 'POL-DXB-998241',
      coverage: 'Full Comprehensive + Roadside SOS Assistance',
    },
    {
      id: 'doc-3',
      title: 'Annual Technical Vehicle Inspection Pass (DVI)',
      titleAr: 'شهادة الفحص الفني الدوري والجاهزية',
      type: 'inspection',
      vehicle: '2022 Toyota RAV4 (Dubai A 12345)',
      authority: 'Tasjeel Testing Center / Verified Inspection Station',
      issueDate: '12 Mar 2024',
      expiryDate: '11 Mar 2025',
      daysLeft: 39,
      status: 'active',
      fileSize: '1.9 MB PDF',
      verified: true,
      score: '100% Passed (Emissions, Brakes, Lighting & Chassis)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center gap-1">
              <Lock className="w-3 h-3 text-blue-600" /> Tamper-Proof Cloud Vault
            </span>
            <span className="text-xs font-bold text-slate-500">256-bit AES Encryption</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Vehicle Documents &amp; Insurance Vault
          </h2>
          <p className="text-xs text-slate-500">
            Never miss a Mulkiya registration renewal, insurance policy expiry, or annual technical vehicle inspection.
          </p>
        </div>

        <button
          onClick={() => alert('Document upload modal opened.')}
          className="px-5 py-3 bg-[#09152B] hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* 2. Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                {doc.daysLeft <= 45 ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black flex items-center gap-1 animate-pulse">
                    <Clock className="w-3 h-3 text-amber-600" /> Expires in {doc.daysLeft} days
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Valid
                  </span>
                )}
              </div>

              <div>
                <strong className="text-sm font-black text-slate-900 block leading-snug">
                  {doc.title}
                </strong>
                <span className="text-[11px] text-slate-500 block mt-1">{doc.vehicle}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Authority:</span>
                  <strong className="text-slate-800 text-end truncate max-w-[150px]">{doc.authority}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Expires On:</span>
                  <strong className="text-amber-700 font-mono font-bold">{doc.expiryDate}</strong>
                </div>
                {doc.policyNumber && (
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Policy #:</span>
                    <strong className="text-blue-600 font-mono font-bold">{doc.policyNumber}</strong>
                  </div>
                )}
                {doc.score && (
                  <div className="text-[10px] text-emerald-700 font-bold pt-1 border-t border-slate-200/60">
                    ✓ {doc.score}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => alert(`Downloading ${doc.title}...`)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>

              <button
                onClick={() => alert('Initiating renewal request with RTA / Insurer...')}
                className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Renew Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
