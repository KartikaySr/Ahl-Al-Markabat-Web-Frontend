import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
  Plus,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export const CustomerInvoicesTab: React.FC = () => {
  const { language, formatPrice } = useApp();

  const invoices = [
    {
      id: 'INV-2026-0811',
      bookingId: 'BOOK-78291',
      date: 'Aug 11, 2026',
      service: 'Synthetic Oil & Filter 24-Point Service',
      workshop: 'AutoTech Premier Garage (TRN: 100294829100003)',
      amount: 'AED 240.00',
      vat: 'AED 12.00',
      total: 'AED 252.00',
      status: 'Paid',
      method: 'Visa •••• 6242',
    },
    {
      id: 'INV-2026-0504',
      bookingId: 'BOOK-64019',
      date: 'May 04, 2026',
      service: 'Front Ceramic Brake Pads & Disc Resurfacing',
      workshop: 'AutoTech Premier Garage',
      amount: 'AED 400.00',
      vat: 'AED 20.00',
      total: 'AED 420.00',
      status: 'Paid',
      method: 'Apple Pay',
    },
    {
      id: 'INV-2026-0118',
      bookingId: 'BOOK-51204',
      date: 'Jan 18, 2026',
      service: '12V AGM Battery Replacement & Load Test',
      workshop: 'Rapid Fix Mobile Care',
      amount: 'AED 361.90',
      vat: 'AED 18.10',
      total: 'AED 380.00',
      status: 'Paid',
      method: 'Mastercard •••• 1928',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header & Total Spent Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-slate-900">Invoices &amp; Payment Receipts</h2>
          <p className="text-xs text-slate-500">View official VAT tax receipts and manage your saved payment methods.</p>
        </div>

        <div className="flex items-center gap-4 text-end">
          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Spent (2026)</span>
            <strong className="text-xl font-black text-blue-600 font-mono">AED 1,052.00</strong>
          </div>
        </div>
      </div>

      {/* 2. Invoices Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-[#09152B] text-white font-bold text-[11px]">
                <th className="py-4 px-6 text-start">Invoice ID</th>
                <th className="py-4 px-6 text-start">Service &amp; Provider</th>
                <th className="py-4 px-6 text-start">Date</th>
                <th className="py-4 px-6 text-start">Payment Method</th>
                <th className="py-4 px-6 text-end">Total Amount</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-mono font-black text-blue-600">{inv.id}</td>
                  <td className="py-4 px-6">
                    <strong className="font-black text-slate-900 block">{inv.service}</strong>
                    <span className="text-[10px] text-slate-400">{inv.workshop}</span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-500">{inv.date}</td>
                  <td className="py-4 px-6 font-medium">{inv.method}</td>
                  <td className="py-4 px-6 text-end font-mono font-black text-slate-900">{inv.total}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      ● {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => alert(`Downloading ${inv.id} VAT Invoice PDF`)}
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-blue-600 rounded-lg font-bold text-[11px] border border-slate-200 flex items-center gap-1 mx-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
