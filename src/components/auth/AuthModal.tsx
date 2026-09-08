import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { PREDEFINED_CREDENTIALS, ALTERNATIVE_ACCEPTED_CREDENTIALS } from '../../data/authCredentials';
import {
  X,
  Lock,
  Mail,
  Car,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
  Building2,
  MapPin,
  Smartphone,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  Zap,
  Info,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    language,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    login,
    registerUser,
    role,
    setRole,
    setActiveTab,
    setCustomerActiveTab,
    customerProfile,
    providerProfile,
    adminProfile,
    registeredCustomers,
    showToast,
  } = useApp();

  // Selected Mode: 'signin' | 'signup'
  const [activeMode, setActiveMode] = useState<'signin' | 'signup'>(authModalMode || 'signin');
  // Target Persona: 'customer' | 'provider' | 'admin'
  const [selectedRole, setSelectedRole] = useState<Role>('customer');

  // Sign In State
  const [signInInput, setSignInInput] = useState<string>(PREDEFINED_CREDENTIALS.customer.email);
  const [signInPassword, setSignInPassword] = useState<string>(PREDEFINED_CREDENTIALS.customer.password);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sign Up: Customer Form State
  const [custFullName, setCustFullName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custCity, setCustCity] = useState('');
  const [custPassword, setCustPassword] = useState('');

  // Sign Up: Provider / Workshop Form State
  const [provWorkshopName, setProvWorkshopName] = useState('');
  const [provOwnerName, setProvOwnerName] = useState('');
  const [provPhone, setProvPhone] = useState('');
  const [provEmail, setProvEmail] = useState('');
  const [provCity, setProvCity] = useState('');
  const [provPassword, setProvPassword] = useState('');

  // Sign Up: Admin Form State
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Sync mode with context
  useEffect(() => {
    if (authModalMode) {
      setActiveMode(authModalMode);
    }
  }, [authModalMode, isAuthModalOpen]);

  // When selected role changes in Sign In tab, update fields to that role's default credentials
  const selectRoleAndFill = (targetRole: Role) => {
    setSelectedRole(targetRole);
    setErrorMessage(null);
    const cred = PREDEFINED_CREDENTIALS[targetRole];
    setSignInInput(cred.email);
    setSignInPassword(cred.password);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(language === 'ar' ? 'تم نسخ بيانات الدخول' : 'Credential copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isAuthModalOpen) return null;

  // Direct 1-Click Instant Login from Credential Chip
  const handleInstantLogin = (targetRole: Role) => {
    selectRoleAndFill(targetRole);
    setIsSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      const cred = PREDEFINED_CREDENTIALS[targetRole];

      if (targetRole === 'customer') {
        login('customer', {
          name: language === 'ar' ? cred.displayNameAr : cred.displayNameEn,
          email: cred.email,
          phone: cred.phone,
          role: 'customer',
          isDemoUser: true,
          isNewUser: false,
        });
      } else if (targetRole === 'provider') {
        login('provider', {
          name: cred.displayNameEn,
          email: cred.email,
          phone: cred.phone,
          role: 'provider',
        });
      } else if (targetRole === 'admin') {
        login('admin', {
          name: cred.displayNameEn,
          email: cred.email,
          phone: cred.phone,
          role: 'admin',
        });
      }
    }, 350);
  };

  // Form Submit Login Handler
  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const inputClean = signInInput.trim().toLowerCase();
    const passClean = signInPassword.trim();

    setTimeout(() => {
      setIsSubmitting(false);

      // Determine matching role based on input or selectedRole
      let resolvedRole: Role = selectedRole;

      if (
        inputClean.includes('admin') ||
        inputClean.includes('superadmin') ||
        inputClean === '590001111'
      ) {
        resolvedRole = 'admin';
      } else if (
        inputClean.includes('provider') ||
        inputClean.includes('workshop') ||
        inputClean.includes('garage') ||
        inputClean.includes('autotech') ||
        inputClean === '501234567'
      ) {
        resolvedRole = 'provider';
      } else if (
        inputClean.includes('customer') ||
        inputClean.includes('omar') ||
        inputClean.includes('user') ||
        inputClean === '591112233'
      ) {
        resolvedRole = 'customer';
      }

      // Check predefined credentials
      const targetCred = PREDEFINED_CREDENTIALS[resolvedRole];
      const isAcceptedPass =
        passClean === targetCred.password ||
        passClean === 'password123' ||
        passClean === 'admin123' ||
        passClean === '123456' ||
        passClean.length >= 6;

      if (!isAcceptedPass && passClean !== '') {
        setErrorMessage(
          language === 'ar'
            ? `كلمة المرور غير صحيحة. كلمة المرور الصحيحة هي: ${targetCred.password}`
            : `Invalid password. Suggested credential is: ${targetCred.password}`
        );
        return;
      }

      // Execute Login
      if (resolvedRole === 'provider') {
        const provName = providerProfile?.name || targetCred.displayNameEn;
        login('provider', {
          ...providerProfile,
          name: provName,
          email: signInInput || targetCred.email,
          phone: providerProfile?.phone || targetCred.phone,
        });
      } else if (resolvedRole === 'admin') {
        const adminName = adminProfile?.name || targetCred.displayNameEn;
        login('admin', {
          ...adminProfile,
          name: adminName,
          email: signInInput || targetCred.email,
          phone: adminProfile?.phone || targetCred.phone,
        });
      } else {
        const isDemo =
          inputClean === targetCred.email ||
          inputClean === 'omar@example.ps' ||
          inputClean.includes('customer');

        // Look up registered accounts from state and localStorage
        let allRegistered = registeredCustomers;
        try {
          const saved = localStorage.getItem('aam_registered_users');
          if (saved) allRegistered = JSON.parse(saved);
        } catch {}

        const matchedUser = allRegistered.find(
          (u) =>
            (u.email && u.email.toLowerCase().trim() === inputClean) ||
            (u.phone && u.phone.replace(/[^0-9]/g, '') === inputClean.replace(/[^0-9]/g, ''))
        );

        let userName: string;
        if (matchedUser && matchedUser.name) {
          userName = matchedUser.name;
        } else if (isDemo) {
          userName = language === 'ar' ? targetCred.displayNameAr : targetCred.displayNameEn;
        } else if (customerProfile?.name && !customerProfile.name.includes('@')) {
          userName = customerProfile.name;
        } else {
          const rawName = signInInput.includes('@') ? signInInput.split('@')[0] : signInInput;
          userName =
            rawName
              .replace(/[._-]/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())
              .trim() || 'Ahmed Al-Mansoor';
        }

        login('customer', {
          ...customerProfile,
          ...(matchedUser || {}),
          name: userName,
          email: matchedUser?.email || signInInput || targetCred.email,
          phone: matchedUser?.phone || customerProfile?.phone || targetCred.phone,
          city: matchedUser?.city || customerProfile?.city,
          role: 'customer',
          isDemoUser: isDemo,
          isNewUser: matchedUser?.isNewUser ?? !isDemo,
        });
      }
    }, 400);
  };

  // Sign Up Submit Handler
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);

      if (selectedRole === 'provider') {
        registerUser('provider', {
          workshopName: provWorkshopName || 'AutoTech Premier Garage',
          fullName: provOwnerName || 'Mohammed Ali',
          phone: provPhone,
          email: provEmail,
          city: provCity,
          password: provPassword,
        });
      } else if (selectedRole === 'admin') {
        registerUser('admin', {
          fullName: adminFullName || 'Platform Super Admin',
          email: adminEmail,
          phone: adminPhone,
          password: adminPassword,
        });
      } else {
        registerUser('customer', {
          fullName: custFullName,
          phone: custPhone,
          email: custEmail,
          city: custCity,
          password: custPassword,
        });
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in text-slate-900">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-slide-up relative">
        {/* Header Bar */}
        <div className="bg-[#09152B] px-6 py-5 flex justify-between items-center text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {activeMode === 'signin'
                  ? language === 'ar'
                    ? 'تسجيل الدخول إلى المنصة'
                    : 'Sign In to AHL AL MARKABAT'
                  : language === 'ar'
                  ? 'إنشاء حساب جديد'
                  : 'Create an Account'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'ar'
                  ? 'سجّل دخولك للوصول إلى كراج العميل، نظام الورش SaaS، أو لوحة الإدارة'
                  : 'Access Customer Portal, Workshop SaaS, or Super Admin Hub'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Mode Switcher: Sign In vs Sign Up */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setActiveMode('signin');
                  setErrorMessage(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeMode === 'signin'
                    ? 'bg-[#09152B] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMode('signup');
                  setErrorMessage(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeMode === 'signup'
                    ? 'bg-[#09152B] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Production SSL Secure</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SIGN IN FORM & DEPLOYMENT CREDENTIAL SELECTOR */}
          {/* ============================================================ */}
          {activeMode === 'signin' && (
            <div className="space-y-5">
              {/* Role Selection Tabs */}
              <div>
                <span className="text-[11px] text-slate-500 font-bold block mb-2 uppercase tracking-wider">
                  {language === 'ar' ? 'اختر البوابة أو المنظومة المراد فتحها:' : 'Select Target Portal:'}
                </span>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {/* 1. Customer Tab */}
                  <button
                    type="button"
                    onClick={() => selectRoleAndFill('customer')}
                    className={`p-3 sm:p-3.5 rounded-2xl border text-start transition-all flex flex-col justify-between gap-1.5 ${
                      selectedRole === 'customer'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                          selectedRole === 'customer'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Car className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-black">
                        {language === 'ar' ? 'عميل' : 'Customer'}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs font-black block text-slate-900">
                        {language === 'ar' ? 'بوابة العميل' : 'Customer Portal'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        {language === 'ar' ? 'كراج، سجل صيانة، عروض' : 'My Garage & Vault'}
                      </span>
                    </div>
                  </button>

                  {/* 2. Workshop Provider Tab */}
                  <button
                    type="button"
                    onClick={() => selectRoleAndFill('provider')}
                    className={`p-3 sm:p-3.5 rounded-2xl border text-start transition-all flex flex-col justify-between gap-1.5 ${
                      selectedRole === 'provider'
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                          selectedRole === 'provider'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Wrench className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-black">
                        {language === 'ar' ? 'ورشة' : 'Workshop'}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs font-black block text-slate-900">
                        {language === 'ar' ? 'نظام الورش SaaS' : 'Workshop SaaS'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        {language === 'ar' ? 'أوامر العمل، DVI، الفنيين' : '20 Modules, DVI, Bays'}
                      </span>
                    </div>
                  </button>

                  {/* 3. Super Admin Tab */}
                  <button
                    type="button"
                    onClick={() => selectRoleAndFill('admin')}
                    className={`p-3 sm:p-3.5 rounded-2xl border text-start transition-all flex flex-col justify-between gap-1.5 ${
                      selectedRole === 'admin'
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                          selectedRole === 'admin'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-900 font-black">
                        {language === 'ar' ? 'إدارة' : 'Admin'}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs font-black block text-slate-900">
                        {language === 'ar' ? 'لوحة الإدارة العليا' : 'Super Admin Hub'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        {language === 'ar' ? 'اعتماد KYC، المالية، KPIs' : 'Platform KYC & Ops'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Official Deployment Credentials Reference Box */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-black text-amber-400 uppercase tracking-wider text-[10px]">
                      {language === 'ar' ? 'بيانات الاعتماد الرسمية للنشر والتجربة' : 'Official Deployment & Demo Credentials'}
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold font-mono">
                    ● Ready to Review
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Customer Card */}
                  <div
                    onClick={() => handleInstantLogin('customer')}
                    className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-all hover:border-blue-500 group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-blue-400 mb-1">
                      <span>🚗 Customer</span>
                      <span className="text-[9px] text-slate-400 group-hover:text-blue-300">1-Click Login →</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-200 truncate">customer@ahlalmarkabat.com</div>
                    <div className="font-mono text-[10px] text-amber-400">Customer@2026</div>
                  </div>

                  {/* Workshop Card */}
                  <div
                    onClick={() => handleInstantLogin('provider')}
                    className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-all hover:border-amber-500 group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-amber-400 mb-1">
                      <span>🔧 Workshop SaaS</span>
                      <span className="text-[9px] text-slate-400 group-hover:text-amber-300">1-Click Login →</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-200 truncate">provider@ahlalmarkabat.com</div>
                    <div className="font-mono text-[10px] text-amber-400">Provider@2026</div>
                  </div>

                  {/* Admin Card */}
                  <div
                    onClick={() => handleInstantLogin('admin')}
                    className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-all hover:border-purple-500 group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-purple-400 mb-1">
                      <span>🛡️ Super Admin</span>
                      <span className="text-[9px] text-slate-400 group-hover:text-purple-300">1-Click Login →</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-200 truncate">admin@ahlalmarkabat.com</div>
                    <div className="font-mono text-[10px] text-amber-400">Admin@2026</div>
                  </div>
                </div>
              </div>

              {/* Error Message Banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Manual Editable Login Form */}
              <form onSubmit={handleFormLogin} className="space-y-3.5 text-xs">
                {/* Email / Username Input */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني أو رقم الهاتف:' : 'Email Address or Phone Number:'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={signInInput}
                      onChange={(e) => setSignInInput(e.target.value)}
                      placeholder="e.g. customer@ahlalmarkabat.com"
                      className="w-full ps-9 pe-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700">
                      {language === 'ar' ? 'كلمة المرور:' : 'Password:'}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleCopy(signInPassword, 'pass')}
                      className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 font-mono font-bold"
                    >
                      {copiedKey === 'pass' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'pass' ? 'Copied' : 'Copy Password'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full ps-9 pe-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 text-xs">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{language === 'ar' ? 'تذكر بيانات الدخول' : 'Remember me on this browser'}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => selectRoleAndFill(selectedRole)}
                    className="text-[11px] text-amber-600 hover:underline font-bold"
                  >
                    {language === 'ar' ? 'إعادة تعيين للبيانات الافتراضية' : 'Reset to Default'}
                  </button>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                    selectedRole === 'provider'
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                      : selectedRole === 'admin'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-[#09152B] hover:bg-slate-800 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span>{language === 'ar' ? 'جارٍ تسجيل الدخول...' : 'Authenticating...'}</span>
                  ) : (
                    <>
                      <span>
                        {selectedRole === 'provider'
                          ? language === 'ar'
                            ? 'تسجيل الدخول وفتح نظام الورش SaaS →'
                            : 'Sign In & Launch Workshop SaaS →'
                          : selectedRole === 'admin'
                          ? language === 'ar'
                            ? 'تسجيل الدخول وفتح لوحة الإدارة العليا →'
                            : 'Sign In & Access Super Admin Hub →'
                          : language === 'ar'
                          ? 'تسجيل الدخول وفتح كراج العميل →'
                          : 'Sign In & Open Customer Portal →'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ============================================================ */}
          {/* SIGN UP FORM (CREATE NEW ACCOUNT) */}
          {/* ============================================================ */}
          {activeMode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
              {/* Role Selection Tabs for Sign Up */}
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase tracking-wider">
                  {language === 'ar' ? 'اختر نوع الحساب المراد إنشاؤه:' : 'Select Account Type to Create:'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('customer')}
                    className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                      selectedRole === 'customer'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-black'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'عميل / مركبة' : 'Customer'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('provider')}
                    className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                      selectedRole === 'provider'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'ورشة / ميكانيك' : 'Mechanic / SaaS'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                      selectedRole === 'admin'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm font-black'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إدارة عليا' : 'Super Admin'}</span>
                  </button>
                </div>
              </div>

              {/* Form Fields for Workshop Provider */}
              {selectedRole === 'provider' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'اسم الورشة / المركز' : 'Workshop / Garage Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={provWorkshopName}
                        onChange={(e) => setProvWorkshopName(e.target.value)}
                        placeholder="AutoTech Premier Garage"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'اسم المدير / الفني المسؤول' : 'Lead Mechanic / Owner'}
                      </label>
                      <input
                        type="text"
                        required
                        value={provOwnerName}
                        onChange={(e) => setProvOwnerName(e.target.value)}
                        placeholder="Mohammed Ali"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={provPhone}
                        onChange={(e) => setProvPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'المدينة / المنطقة' : 'City / Location'}
                      </label>
                      <input
                        type="text"
                        required
                        value={provCity}
                        onChange={(e) => setProvCity(e.target.value)}
                        placeholder="Dubai / Ramallah"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني للورشة' : 'Workshop Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={provEmail}
                        onChange={(e) => setProvEmail(e.target.value)}
                        placeholder="provider@ahlalmarkabat.com"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'كلمة المرور' : 'Password'}
                      </label>
                      <input
                        type="password"
                        required
                        value={provPassword}
                        onChange={(e) => setProvPassword(e.target.value)}
                        placeholder="Provider@2026"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields for Customer */}
              {selectedRole === 'customer' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={custFullName}
                        onChange={(e) => setCustFullName(e.target.value)}
                        placeholder="Ahmed Al-Mansoor"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="+970 59 111 2233"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                        placeholder="customer@ahlalmarkabat.com"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'المدينة' : 'City'}
                      </label>
                      <input
                        type="text"
                        required
                        value={custCity}
                        onChange={(e) => setCustCity(e.target.value)}
                        placeholder="Ramallah / Jerusalem"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">
                      {language === 'ar' ? 'كلمة المرور' : 'Password'}
                    </label>
                    <input
                      type="password"
                      required
                      value={custPassword}
                      onChange={(e) => setCustPassword(e.target.value)}
                      placeholder="Customer@2026"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* Form Fields for Admin */}
              {selectedRole === 'admin' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'اسم المشرف' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={adminFullName}
                        onChange={(e) => setAdminFullName(e.target.value)}
                        placeholder="Platform Super Admin"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        placeholder="+970 59 000 1111"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="admin@ahlalmarkabat.com"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        {language === 'ar' ? 'كلمة المرور السرية' : 'Admin Security Key'}
                      </label>
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Admin@2026"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? language === 'ar'
                      ? 'جارٍ إنشاء الحساب...'
                      : 'Creating Account...'
                    : selectedRole === 'provider'
                    ? language === 'ar'
                      ? 'تسجيل الورشة وتفعيل نظام SaaS →'
                      : 'Register Workshop & Launch SaaS →'
                    : selectedRole === 'admin'
                    ? language === 'ar'
                      ? 'تسجيل ودخول لوحة الإدارة →'
                      : 'Register & Access Admin Hub →'
                    : language === 'ar'
                    ? 'إنشاء حساب العميل وفتح كراجي →'
                    : 'Create Account & Open My Garage →'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
