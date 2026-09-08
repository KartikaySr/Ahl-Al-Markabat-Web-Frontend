import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import {
  aiDiagnosticEngine,
  SymptomDiagnosisResult,
  ObdDiagnosisResult,
  BusinessAnalyticsResult,
} from '../../services/aiDiagnosticEngine';
import {
  Sparkles,
  X,
  Send,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  DollarSign,
  Shield,
  HelpCircle,
  BarChart3,
  Layers,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Package,
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  FileText,
  Star,
  Zap,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { PREDEFINED_CREDENTIALS } from '../../data/authCredentials';

type TaskActionType = 'book' | 'quote' | 'garage';
type ViewStep = 'diagnose' | 'account_bridge' | 'success';

export const AIAssistantModal: React.FC = () => {
  const {
    language,
    t,
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    setIsQuoteModalOpen,
    providers,
    formatPrice,
    selectedCountry,
    isAuthenticated,
    user,
    selectedVehicle,
    vehicles,
    registerUser,
    login,
    createBooking,
    createServiceRequest,
    createInspectionReport,
    setActiveTab,
    setCustomerActiveTab,
    showToast,
  } = useApp();

  // Modal View Steps
  const [viewStep, setViewStep] = useState<ViewStep>('diagnose');
  const [pendingAction, setPendingAction] = useState<TaskActionType>('book');
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // AI Diagnostic State
  const [aiMode, setAiMode] = useState<'symptoms' | 'obd' | 'business'>('symptoms');
  const [promptText, setPromptText] = useState(
    language === 'ar'
      ? 'السيارة ترج عند الدعس أو التسارع (اهتزاز وتقطيع)'
      : 'My car shakes when I accelerate (vibration and shudder)'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Results State
  const [symptomResult, setSymptomResult] = useState<SymptomDiagnosisResult | null>(null);
  const [obdResult, setObdResult] = useState<ObdDiagnosisResult | null>(null);
  const [businessResult, setBusinessResult] = useState<BusinessAnalyticsResult | null>(null);

  // Account Creation Form State
  const [fullName, setFullName] = useState(language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor');
  const [phone, setPhone] = useState('+970 59 123 4567');
  const [email, setEmail] = useState('ahmed.mansoor@example.ps');
  const [password, setPassword] = useState('Pass1234');
  const [city, setCity] = useState(language === 'ar' ? 'الخليل' : 'Hebron');

  // Vehicle Details Form State
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('Corolla Cross');
  const [vehicleYear, setVehicleYear] = useState('2023');
  const [vehiclePlate, setVehiclePlate] = useState('7-8899-22');

  // Sign In Form State (if switching to sign in)
  const [signInEmail, setSignInEmail] = useState(PREDEFINED_CREDENTIALS.customer.email);
  const [signInPassword, setSignInPassword] = useState(PREDEFINED_CREDENTIALS.customer.password);

  // Confirmed Receipt State
  const [taskReceipt, setTaskReceipt] = useState<{
    referenceId: string;
    actionType: TaskActionType;
    title: string;
    providerName?: string;
    scheduledDate?: string;
    scheduledTime?: string;
    totalCost?: string;
    vehicleSummary: string;
  } | null>(null);

  if (!isAIAssistantOpen) return null;

  const handleAnalyze = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const query = customText || promptText;
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setSymptomResult(null);
    setObdResult(null);
    setBusinessResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);

      if (aiMode === 'symptoms') {
        const result = aiDiagnosticEngine.diagnoseSymptom(query);
        setSymptomResult(result);
      } else if (aiMode === 'obd') {
        const result = aiDiagnosticEngine.lookupObdCode(query);
        setObdResult(result);
      } else {
        const result = aiDiagnosticEngine.queryBusinessAnalytics(query);
        setBusinessResult(result);
      }
    }, 450);
  };

  const matchedProvider = symptomResult
    ? providers.find((p) => p.id === symptomResult.recommendedProviderId) || providers[0]
    : providers[0];

  // Helper to extract diagnosis summary
  const getDiagnosisTitle = () => {
    if (symptomResult) {
      return language === 'ar' ? symptomResult.categoryAr : symptomResult.categoryEn;
    }
    if (obdResult) {
      return `${obdResult.code}: ${language === 'ar' ? obdResult.technicalAr : obdResult.technicalEn}`;
    }
    return language === 'ar' ? 'فحص وتشخيص العطل بالذكاء الاصطناعي' : 'AI Telemetry Diagnostic Service';
  };

  const getEstimatedCostText = () => {
    if (symptomResult) {
      return language === 'ar' ? symptomResult.estimatedCostAr : symptomResult.estimatedCostEn;
    }
    return '250 - 450 ILS';
  };

  // Execute the chosen task
  const executeTask = (actionType: TaskActionType, targetCustomerName: string, targetPhone: string, targetVehicleSummary: string, targetPlate: string) => {
    const diagTitle = getDiagnosisTitle();
    const costText = getEstimatedCostText();

    if (actionType === 'book') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      const bookingId = createBooking({
        providerId: matchedProvider.id,
        providerName: language === 'ar' ? matchedProvider.businessNameAr : matchedProvider.businessNameEn,
        providerImage: matchedProvider.avatar,
        serviceId: 'ai-diag-repair',
        serviceName: `${diagTitle} (AI Assisted)`,
        vehicleDetails: targetVehicleSummary,
        date: dateStr,
        timeSlot: '10:00 AM',
        serviceMode: 'workshop',
        price: 280,
        customerName: targetCustomerName,
        customerPhone: targetPhone,
        notes: language === 'ar'
          ? `تقرير تشخيص ذكي: ${diagTitle}. الأعراض: ${promptText}. دقة المطابقة: ${symptomResult?.confidence || 95}%`
          : `AI Telemetry Report: ${diagTitle}. Symptoms: ${promptText}. Confidence: ${symptomResult?.confidence || 95}%`,
      });

      setTaskReceipt({
        referenceId: bookingId,
        actionType: 'book',
        title: diagTitle,
        providerName: language === 'ar' ? matchedProvider.businessNameAr : matchedProvider.businessNameEn,
        scheduledDate: dateStr,
        scheduledTime: '10:00 AM',
        totalCost: costText,
        vehicleSummary: targetVehicleSummary,
      });
    } else if (actionType === 'quote') {
      const reqId = createServiceRequest({
        vehicleSummary: targetVehicleSummary,
        vehiclePlate: targetPlate,
        description: `${diagTitle}: ${promptText}`,
        symptoms: [promptText, diagTitle],
        serviceCategoryIds: ['cat-engine', 'cat-diagnostics'],
        serviceMethod: 'workshop',
        urgency: 'normal',
        locationAddress: city,
        city: city,
      });

      setTaskReceipt({
        referenceId: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        actionType: 'quote',
        title: diagTitle,
        totalCost: costText,
        vehicleSummary: targetVehicleSummary,
      });
    } else {
      // Save to Garage
      createInspectionReport({
        vehicleSummary: targetVehicleSummary,
        plateNumber: targetPlate,
        inspectorName: 'Ahl Al Markabat AI Telemetry Engine',
        overallScore: 92,
        recommendationsAr: `تم توثيق فحص الذكاء الاصطناعي بنجاح: ${diagTitle}.`,
        recommendationsEn: `AI Telemetry diagnostic report recorded: ${diagTitle}.`,
      });

      setTaskReceipt({
        referenceId: `DVI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        actionType: 'garage',
        title: diagTitle,
        vehicleSummary: targetVehicleSummary,
      });
    }

    try {
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    } catch {}

    setViewStep('success');
  };

  // Action Button Click Handler (from Diagnose view)
  const handleInitiateAction = (actionType: TaskActionType) => {
    setPendingAction(actionType);

    if (isAuthenticated) {
      // User is already logged in -> execute directly!
      const currentVeh = selectedVehicle || vehicles[0];
      const vehSummary = currentVeh
        ? `${currentVeh.make} ${currentVeh.model} (${currentVeh.year})`
        : `${vehicleMake} ${vehicleModel} (${vehicleYear})`;
      const plateNumber = currentVeh ? currentVeh.plateNumber : vehiclePlate;

      executeTask(actionType, user.name, user.phone, vehSummary, plateNumber);
    } else {
      // User is a guest -> open embedded Account Creation Bridge
      setViewStep('account_bridge');
    }
  };

  // Submit Account Creation and Accomplish Task
  const handleAccountBridgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'signup') {
      // 1. Register User in App Context
      registerUser('customer', {
        fullName,
        phone,
        email,
        city,
        password,
        vehicleMake,
        vehicleModel,
        vehicleYear: Number(vehicleYear) || 2023,
        vehiclePlate,
        vehicleMileage: 28000,
        vehicleFuel: 'petrol',
      });

      const vehSummary = `${vehicleMake} ${vehicleModel} (${vehicleYear})`;
      executeTask(pendingAction, fullName, phone, vehSummary, vehiclePlate);
    } else {
      // Sign In mode
      login('customer', {
        name: language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor',
        email: signInEmail,
        phone: '+970 59 123 4567',
        role: 'customer',
      });

      const vehSummary = `${vehicleMake} ${vehicleModel} (${vehicleYear})`;
      executeTask(pendingAction, fullName, phone, vehSummary, vehiclePlate);
    }
  };

  // Quick 1-Click Demo Login in Bridge
  const handleQuickDemoFill = () => {
    setSignInEmail(PREDEFINED_CREDENTIALS.customer.email);
    setSignInPassword(PREDEFINED_CREDENTIALS.customer.password);
    login('customer', {
      name: language === 'ar' ? PREDEFINED_CREDENTIALS.customer.displayNameAr : PREDEFINED_CREDENTIALS.customer.displayNameEn,
      email: PREDEFINED_CREDENTIALS.customer.email,
      phone: PREDEFINED_CREDENTIALS.customer.phone,
      role: 'customer',
    });
    const vehSummary = `${vehicleMake} ${vehicleModel} (${vehicleYear})`;
    executeTask(pendingAction, language === 'ar' ? PREDEFINED_CREDENTIALS.customer.displayNameAr : PREDEFINED_CREDENTIALS.customer.displayNameEn, PREDEFINED_CREDENTIALS.customer.phone, vehSummary, vehiclePlate);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-slide-up text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 px-6 py-4 text-white flex justify-between items-center border-b border-blue-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/50 border border-blue-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">{t.aiAssistant}</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-400/30">
                  AI v2.4 Live
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {language === 'ar' ? 'تشخيص ذكي، تسعير فوري، وحجز معتمد' : 'Smart Automotive Diagnostic, RFQ & Direct Booking'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="text-blue-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: DIAGNOSE & RESULT VIEW                           */}
        {/* ======================================================== */}
        {viewStep === 'diagnose' && (
          <>
            {/* 3 AI Sub-Modes Switcher */}
            <div className="bg-slate-50 p-2 border-b border-slate-200 flex items-center justify-around text-xs font-bold shrink-0">
              <button
                onClick={() => {
                  setAiMode('symptoms');
                  setPromptText(
                    language === 'ar'
                      ? 'يوجد صوت صفير في الفرامل واهتزاز خفيف عند التوقف'
                      : 'Squeaking noise in brakes and slight pedal vibration when stopping'
                  );
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  aiMode === 'symptoms'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.aiTabDiagnose}
              </button>

              <button
                onClick={() => {
                  setAiMode('obd');
                  setPromptText('P0302');
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  aiMode === 'obd'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.aiTabObdTranslator}
              </button>

              <button
                onClick={() => {
                  setAiMode('business');
                  setPromptText(
                    language === 'ar'
                      ? 'ما هي أفضل الخدمات طلباً وتنبيهات المخزون هذا الشهر؟'
                      : 'What are the top-requested services and inventory alerts this month?'
                  );
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  aiMode === 'business'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.aiTabAskBusiness}
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
              <form onSubmit={handleAnalyze} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  {aiMode === 'symptoms' &&
                    (language === 'ar'
                      ? 'صف أعراض العطل أو مشكلة سيارتك باللغة الطبيعية:'
                      : 'Describe your vehicle symptoms in plain language:')}
                  {aiMode === 'obd' &&
                    (language === 'ar'
                      ? 'أدخل كود العطل أو الخطأ OBD-II (مثل P0302 أو P0420):'
                      : 'Enter OBD-II Diagnostic Trouble Code (e.g. P0302):')}
                  {aiMode === 'business' &&
                    (language === 'ar'
                      ? 'اسأل الذكاء الاصطناعي عن تقارير ورشتك والمخزون:'
                      : 'Ask Ahl AI about workshop analytics & stock:')}
                </label>

                <div className="relative">
                  <textarea
                    rows={2}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder={t.aiPlaceholder}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none leading-relaxed shadow-sm transition-all"
                    required
                  />
                </div>

                {/* Quick Test Prompt Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400">
                    {language === 'ar' ? 'أمثلة سريعة للتجربة:' : 'Quick Tests:'}
                  </span>
                  {aiMode === 'symptoms' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const txt =
                            language === 'ar'
                              ? 'السيارة ترج عند الدعس أو التسارع'
                              : 'My car shakes when I accelerate';
                          setPromptText(txt);
                          handleAnalyze(undefined, txt);
                        }}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 border border-slate-200 transition-colors"
                      >
                        {language === 'ar' ? '⚡ رجة عند التسارع (§ 39)' : '⚡ Shakes on Acceleration'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const txt =
                            language === 'ar'
                              ? 'الأنوار تضعف عند التوقف في الإشارة'
                              : 'The headlights become weak when I stop';
                          setPromptText(txt);
                          handleAnalyze(undefined, txt);
                        }}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 border border-slate-200 transition-colors"
                      >
                        {language === 'ar' ? '💡 ضعف الأنوار' : '💡 Weak Headlights'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const txt =
                            language === 'ar'
                              ? 'صوت صفير في الفرامل واهتزاز خفيف'
                              : 'Squeaking noise in brakes and vibration';
                          setPromptText(txt);
                          handleAnalyze(undefined, txt);
                        }}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 border border-slate-200 transition-colors"
                      >
                        {language === 'ar' ? '🛑 صفير الفرامل' : '🛑 Brake Squeak'}
                      </button>
                    </>
                  )}
                  {aiMode === 'obd' && (
                    <>
                      {['P0302', 'P0101', 'P0420', 'P0171'].map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => {
                            setPromptText(code);
                            handleAnalyze(undefined, code);
                          }}
                          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors"
                        >
                          {code}
                        </button>
                      ))}
                    </>
                  )}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
                  >
                    {isAnalyzing ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin text-white" />
                        <span>{t.aiAnalyzing}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{language === 'ar' ? 'تحليل وتوجيه ذكي ⚡' : 'Analyze Telemetry ⚡'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* AI Mode 1 Result: Symptoms */}
              {symptomResult && (
                <div className="space-y-4 animate-slide-up">
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-900 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        {t.aiDiagnosis}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                        {language === 'ar'
                          ? `دقة المطابقة ${symptomResult.confidence}%`
                          : `Confidence ${symptomResult.confidence}%`}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-blue-950">
                      {language === 'ar' ? symptomResult.categoryAr : symptomResult.categoryEn}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {language === 'ar' ? symptomResult.explanationAr : symptomResult.explanationEn}
                    </p>
                    <div className="pt-2 border-t border-blue-200 text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>{t.aiEstCost}</span>
                      <strong className="text-blue-700 font-mono text-sm">
                        {language === 'ar' ? symptomResult.estimatedCostAr : symptomResult.estimatedCostEn}
                      </strong>
                    </div>
                  </div>

                  {/* Clarifying Questions */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase block">
                      {language === 'ar' ? 'أسئلة استرشادية للفحص الميداني:' : 'Diagnostic Guidance Checklist:'}
                    </span>
                    {(language === 'ar'
                      ? symptomResult.clarifyingQuestionsAr
                      : symptomResult.clarifyingQuestionsEn
                    ).map((q, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
                      >
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                          {i + 1}
                        </span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Mode 2 Result: OBD-II Translator */}
              {obdResult && (
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3 animate-slide-up text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-black text-sm bg-blue-600 text-white px-2.5 py-1 rounded-lg">
                      {obdResult.code}
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
                      {language === 'ar' ? 'مستوى الأهمية: عاجل وموصى بالفحص' : 'Urgency: Recommended Check'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-bold">
                      {language === 'ar' ? 'الترجمة التقنية (Technical):' : 'Technical Definition:'}
                    </span>
                    <p className="font-bold text-slate-900">
                      {language === 'ar' ? obdResult.technicalAr : obdResult.technicalEn}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
                    <span className="text-blue-900 text-[11px] font-black block">
                      {language === 'ar' ? 'الشرح المبسط لمالك المركبة:' : 'Driver-Friendly Explanation:'}
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {language === 'ar' ? obdResult.customerAr : obdResult.customerEn}
                    </p>
                  </div>
                </div>
              )}

              {/* AI Mode 3 Result: Business Intelligence */}
              {businessResult && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-slide-up text-xs">
                  <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>{language === 'ar' ? businessResult.answerAr : businessResult.answerEn}</span>
                  </h4>
                  <div className="space-y-2">
                    {(language === 'ar' ? businessResult.insightsAr : businessResult.insightsEn).map(
                      (ins, i) => (
                        <div
                          key={i}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-700">{ins}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* ACTIONABLE TASK ACCOMPLISHMENT HUB (SRS AI-004)          */}
              {/* ======================================================== */}
              {(symptomResult || obdResult) && (
                <div className="pt-3 space-y-3 border-t border-slate-200 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                        {language === 'ar'
                          ? 'إنجاز المهمة وحل المشكلة فوراً'
                          : 'Accomplish & Resolve This Issue'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {language === 'ar'
                          ? 'اختر الطريقة المفضلة لإتمام الصيانة وحفظ تقرير التشخيص'
                          : 'Choose your preferred next step to repair or save your vehicle report'}
                      </p>
                    </div>

                    {!isAuthenticated && (
                      <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                        {language === 'ar' ? '⚡ إنشاء حساب فوري' : '⚡ Instant Signup'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Action 1: Book Workshop */}
                    <button
                      type="button"
                      onClick={() => handleInitiateAction('book')}
                      className="p-3.5 rounded-2xl bg-gradient-to-b from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 border-2 border-blue-600 text-start flex flex-col justify-between group shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="space-y-1.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <h5 className="text-xs font-black text-blue-950">
                          {language === 'ar' ? 'حجز موعد ورشة فوري' : 'Book Specialist Workshop'}
                        </h5>
                        <p className="text-[10px] text-slate-600 line-clamp-2">
                          {language === 'ar'
                            ? `حجز موعد فحص لدى ${matchedProvider.businessNameAr}`
                            : `Direct booking at ${matchedProvider.businessNameEn}`}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-blue-200/60 flex items-center justify-between text-[10px] font-bold text-blue-700">
                        <span>{language === 'ar' ? 'تثبيت الموعد' : 'Book Slot'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Action 2: Request RFQ */}
                    <button
                      type="button"
                      onClick={() => handleInitiateAction('quote')}
                      className="p-3.5 rounded-2xl bg-gradient-to-b from-amber-50 to-white hover:from-amber-100 hover:to-amber-50 border border-amber-300 text-start flex flex-col justify-between group shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="space-y-1.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                          <FileText className="w-4 h-4" />
                        </div>
                        <h5 className="text-xs font-black text-slate-900">
                          {language === 'ar' ? 'طلب عروض أسعار منافسة' : 'Request 3+ Quotes (RFQ)'}
                        </h5>
                        <p className="text-[10px] text-slate-600 line-clamp-2">
                          {language === 'ar'
                            ? 'استلام عروض أسعار ومقارنة التكلفة والضمان'
                            : 'Receive competitive bids from verified garages'}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-amber-200 flex items-center justify-between text-[10px] font-bold text-amber-800">
                        <span>{language === 'ar' ? 'طلب تسعيرات' : 'Request Bids'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Action 3: Save to My Garage */}
                    <button
                      type="button"
                      onClick={() => handleInitiateAction('garage')}
                      className="p-3.5 rounded-2xl bg-gradient-to-b from-emerald-50 to-white hover:from-emerald-100 hover:to-emerald-50 border border-emerald-300 text-start flex flex-col justify-between group shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="space-y-1.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h5 className="text-xs font-black text-slate-900">
                          {language === 'ar' ? 'حفظ في كراجي الرقمي' : 'Save to Garage Vault'}
                        </h5>
                        <p className="text-[10px] text-slate-600 line-clamp-2">
                          {language === 'ar'
                            ? 'إضافة التقرير لسجل صحة المركبة وجوازها الفني'
                            : 'Store report in vehicle digital service passport'}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-emerald-200 flex items-center justify-between text-[10px] font-bold text-emerald-800">
                        <span>{language === 'ar' ? 'حفظ السجل' : 'Save Report'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Mandatory Non-Diagnosis Disclaimer (SRS FR-AI-003) */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-[11px] text-slate-500">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <p>{t.aiDisclaimer}</p>
              </div>
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: ACCOUNT CREATION / SIGN IN BRIDGE                */}
        {/* ======================================================== */}
        {viewStep === 'account_bridge' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 animate-slide-up">
            {/* Contextual Action Banner */}
            <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'الخطوة التالية لإتمام المهمة' : 'Next Step: Accomplish Task'}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {pendingAction === 'book' &&
                    (language === 'ar'
                      ? `حجز موعد الصيانة لدى: ${matchedProvider.businessNameAr}`
                      : `Booking Appointment at: ${matchedProvider.businessNameEn}`)}
                  {pendingAction === 'quote' &&
                    (language === 'ar'
                      ? 'طلب عروض أسعار منافسة للعطل المشخص'
                      : 'Broadcasting RFQ for Diagnosed Fault')}
                  {pendingAction === 'garage' &&
                    (language === 'ar'
                      ? 'حفظ تقرير الفحص الذكي في كراجك الرقمي'
                      : 'Saving AI Diagnostic Report to Your Garage')}
                </h4>
                <p className="text-xs text-blue-200">
                  {getDiagnosisTitle()} • {getEstimatedCostText()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewStep('diagnose')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                {language === 'ar' ? 'الرجوع للتشخيص' : 'Back to Diagnosis'}
              </button>
            </div>

            {/* Mode Switch: Signup vs Signin */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    authMode === 'signup'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {language === 'ar' ? 'إنشاء حساب جديد (عميل)' : 'Create New Account'}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    authMode === 'signin'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </button>
              </div>

              {/* 1-Click Demo Fill */}
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{language === 'ar' ? 'تجربة سريعة (حساب تجريبي)' : '1-Click Demo Customer'}</span>
              </button>
            </div>

            {/* Registration / Signin Form */}
            <form onSubmit={handleAccountBridgeSubmit} className="space-y-4">
              {authMode === 'signup' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-2.5 ps-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                          placeholder={language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor'}
                        />
                        <User className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone Number:'}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-2.5 ps-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                          placeholder="+970 59 123 4567"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2.5 ps-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                          placeholder="ahmed.mansoor@example.ps"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'المدينة:' : 'City:'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-2.5 ps-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                          placeholder={language === 'ar' ? 'الخليل / رام الله' : 'Hebron / Ramallah'}
                        />
                        <MapPin className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details Box */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-blue-600" />
                      {language === 'ar' ? 'بيانات مركبتك المراد صيانتها:' : 'Vehicle Details to Link with Garage:'}
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          {language === 'ar' ? 'الشركة المصنعة' : 'Make'}
                        </label>
                        <input
                          type="text"
                          required
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:border-blue-600 outline-none"
                          placeholder="Toyota"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          {language === 'ar' ? 'الموديل' : 'Model'}
                        </label>
                        <input
                          type="text"
                          required
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:border-blue-600 outline-none"
                          placeholder="RAV4 / Corolla"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          {language === 'ar' ? 'سنة الصنع' : 'Year'}
                        </label>
                        <input
                          type="text"
                          required
                          value={vehicleYear}
                          onChange={(e) => setVehicleYear(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:border-blue-600 outline-none"
                          placeholder="2023"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          {language === 'ar' ? 'رقم اللوحة' : 'Plate Number'}
                        </label>
                        <input
                          type="text"
                          required
                          value={vehiclePlate}
                          onChange={(e) => setVehiclePlate(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono font-bold focus:border-blue-600 outline-none"
                          placeholder="7-8899-22"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                    </label>
                    <input
                      type="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'كلمة المرور:' : 'Password:'}
                    </label>
                    <input
                      type="password"
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {authMode === 'signup'
                    ? language === 'ar'
                      ? 'إنشاء الحساب وإتمام المهمة فوراً ⚡'
                      : 'Create Account & Accomplish Task ⚡'
                    : language === 'ar'
                    ? 'تسجيل الدخول وتأكيد المهمة'
                    : 'Sign In & Confirm Task'}
                </span>
              </button>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: TASK ACCOMPLISHED & CONFIRMATION RECEIPT         */}
        {/* ======================================================== */}
        {viewStep === 'success' && taskReceipt && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 text-center animate-scale-up">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 border-2 border-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase text-emerald-600 tracking-wider">
                {language === 'ar' ? 'تم التنفيذ بنجاح' : 'Task Accomplished & Synced'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'ar'
                  ? '🎉 تم تأكيد طلبك وحفظه في كراجك بنجاح!'
                  : '🎉 Task Accomplished & Confirmed Successfully!'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === 'ar'
                  ? 'تم ربط مركبتك بحسابك الجديد، وتوثيق تقرير فحص الذكاء الاصطناعي مع إشعار الورشة المختصة.'
                  : 'Your vehicle has been linked to your account, AI report recorded, and workshop notified.'}
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 text-start space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-500">
                  {language === 'ar' ? 'رقم المرجع / الحجز:' : 'Reference ID:'}
                </span>
                <span className="font-mono font-black text-sm text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {taskReceipt.referenceId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {language === 'ar' ? 'المركبة المسجلة:' : 'Registered Vehicle:'}
                  </span>
                  <span className="font-black text-slate-800">{taskReceipt.vehicleSummary}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {language === 'ar' ? 'العطل المشخص:' : 'Diagnosed Fault:'}
                  </span>
                  <span className="font-black text-slate-800">{taskReceipt.title}</span>
                </div>

                {taskReceipt.providerName && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">
                      {language === 'ar' ? 'الورشة المختارة:' : 'Assigned Workshop:'}
                    </span>
                    <span className="font-bold text-slate-800">{taskReceipt.providerName}</span>
                  </div>
                )}

                {taskReceipt.scheduledDate && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">
                      {language === 'ar' ? 'الموعد المحدد:' : 'Appointment Time:'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {taskReceipt.scheduledDate} • {taskReceipt.scheduledTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAIAssistantOpen(false);
                  setActiveTab('customer');
                  if (taskReceipt.actionType === 'book') {
                    setCustomerActiveTab('bookings');
                  } else if (taskReceipt.actionType === 'quote') {
                    setActiveTab('quotes');
                  } else {
                    setCustomerActiveTab('garage');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>
                  {language === 'ar'
                    ? 'الانتقال إلى كراجي ومتابعة الحالة مباشرة 🚀'
                    : 'Go to My Garage & Live Track 🚀'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewStep('diagnose');
                  setSymptomResult(null);
                  setObdResult(null);
                  setBusinessResult(null);
                }}
                className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                {language === 'ar' ? 'تشخيص عطل آخر' : 'Diagnose Another Issue'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
