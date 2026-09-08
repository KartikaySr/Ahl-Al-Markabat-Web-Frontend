import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Building2,
  Clock,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';

export const CustomerQuotationsTab: React.FC = () => {
  const { language, formatPrice, setActiveTab, setCustomerActiveTab } = useApp();

  const [quotes, setQuotes] = useState([
    {
      id: 'QUO-92014',
      requestTitle: 'Engine Misfire & Spark Plug / Ignition Coil Replacement',
      vehicle: 'Toyota RAV4 (2022 • Dubai A 12345)',
      requestedDate: 'Yesterday, 04:30 PM',
      status: 'Pending Review',
      offers: [
        {
          providerId: 'autotech',
          providerName: 'AutoTech Premier Garage',
          rating: '4.9 (532)',
          city: 'Dubai - Al Quoz, UAE',
          distance: '1.2 km',
          laborCost: 'AED 120.00',
          partsCost: 'AED 240.00',
          tax: 'AED 18.00',
          total: 'AED 378.00',
          estimatedTime: '2 - 3 Hours',
          partsIncluded: '4x Denso Iridium Spark Plugs + 1x OEM Ignition Coil',
          warranty: '12 Months / 20,000 km Warranty',
          recommended: true,
          status: 'pending',
        },
        {
          providerId: 'rapidfix',
          providerName: 'Rapid Fix Mobile Care',
          rating: '4.8 (312)',
          city: 'Dubai - Al Barsha, UAE',
          distance: '2.4 km',
          laborCost: 'AED 140.00',
          partsCost: 'AED 220.00',
          tax: 'AED 18.00',
          total: 'AED 378.00',
          estimatedTime: 'Mobile at Doorstep (Today)',
          partsIncluded: '4x NGK Laser Iridium Spark Plugs + Aftermarket Coil',
          warranty: '6 Months Warranty',
          recommended: false,
          status: 'pending',
        },
        {
          providerId: 'palauto',
          providerName: 'PalAuto Express Center',
          rating: '4.7 (186)',
          city: 'Dubai - Deira, UAE',
          distance: '5.6 km',
          laborCost: 'AED 100.00',
          partsCost: 'AED 250.00',
          tax: 'AED 17.50',
          total: 'AED 367.50',
          estimatedTime: 'Tomorrow Morning',
          partsIncluded: 'OEM Genuine Toyota Parts',
          warranty: '12 Months Warranty',
          recommended: false,
          status: 'pending',
        },
      ],
    },
  ]);

  const handleApprove = (quoteId: string, providerName: string) => {
    alert(`Quotation from ${providerName} approved! Proceeding to scheduled booking & deposit.`);
    setActiveTab('track-booking');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Quotations &amp; Price Estimates</h2>
          <p className="text-xs text-slate-500">Compare incoming estimates from verified workshops, approve the best offer, or chat.</p>
        </div>
        <button
          onClick={() => setCustomerActiveTab('providers')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          {language === 'ar' ? 'استعراض الورش وطلب عرض جديد +' : 'Find Workshops & Request Quote +'}
        </button>
      </div>

      {/* 2. Quotation Comparison Cards */}
      <div className="space-y-6">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
            {/* Request Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-blue-600 text-sm">#{q.id}</span>
                  <strong className="text-sm font-black text-slate-900">{q.requestTitle}</strong>
                </div>
                <span className="text-slate-500 text-[11px] block mt-0.5">{q.vehicle} • Requested {q.requestedDate}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black self-start sm:self-center">
                ● 3 Offers Received
              </span>
            </div>

            {/* 3 Side-by-Side Offer Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {q.offers.map((offer, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-6 border flex flex-col justify-between space-y-4 transition-all relative ${
                    offer.recommended
                      ? 'border-amber-400 bg-white shadow-xl ring-2 ring-amber-400/20'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  {offer.recommended && (
                    <span className="absolute -top-3 start-6 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Best Value &amp; Rating
                    </span>
                  )}

                  <div className="space-y-3 text-xs">
                    <div>
                      <strong className="text-sm font-black text-slate-900 block">{offer.providerName}</strong>
                      <div className="flex items-center gap-2 text-slate-500 text-[10px] mt-0.5">
                        <span className="text-amber-500 font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                          <span>{offer.rating}</span>
                        </span>
                        <span>•</span>
                        <span>{offer.city} ({offer.distance})</span>
                      </div>
                    </div>

                    {/* Total Price Hero */}
                    <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Estimate</span>
                      <strong className="text-2xl font-black text-slate-900 font-mono block">{offer.total}</strong>
                      <span className="text-[9px] text-slate-500">Includes VAT &amp; Disposal Fees</span>
                    </div>

                    {/* Itemized Breakdown */}
                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="flex justify-between"><span>Labor:</span><strong className="text-slate-800 font-mono">{offer.laborCost}</strong></div>
                      <div className="flex justify-between"><span>Parts:</span><strong className="text-slate-800 font-mono">{offer.partsCost}</strong></div>
                      <div className="flex justify-between"><span>VAT (5%):</span><strong className="text-slate-800 font-mono">{offer.tax}</strong></div>
                      <div className="flex justify-between pt-1 border-t border-slate-200">
                        <span>Duration:</span>
                        <strong className="text-slate-900">{offer.estimatedTime}</strong>
                      </div>
                    </div>

                    {/* Parts & Warranty */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[10px] space-y-1">
                      <span className="text-slate-400 font-bold block">Parts: {offer.partsIncluded}</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {offer.warranty}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => handleApprove(q.id, offer.providerName)}
                      className={`w-full py-2.5 rounded-xl font-black text-xs transition-all ${
                        offer.recommended
                          ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-[#09152B] hover:bg-slate-800 text-white'
                      }`}
                    >
                      Approve This Quote →
                    </button>
                    <button
                      onClick={() => alert(`Opening live chat with ${offer.providerName}`)}
                      className="w-full py-1.5 rounded-xl text-slate-600 hover:bg-slate-200 font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Question</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
