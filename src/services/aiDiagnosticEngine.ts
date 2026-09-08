export interface SymptomDiagnosisResult {
  categoryAr: string;
  categoryEn: string;
  confidence: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  explanationAr: string;
  explanationEn: string;
  estimatedCostAr: string;
  estimatedCostEn: string;
  clarifyingQuestionsAr: string[];
  clarifyingQuestionsEn: string[];
  recommendedProviderCategory: string;
  recommendedProviderId: string;
  suggestedParts: { nameAr: string; nameEn: string }[];
}

export interface ObdDiagnosisResult {
  code: string;
  titleAr: string;
  titleEn: string;
  technicalAr: string;
  technicalEn: string;
  customerAr: string;
  customerEn: string;
  recommendedActionAr: string;
  recommendedActionEn: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  categoryAr: string;
  categoryEn: string;
}

export interface BusinessAnalyticsResult {
  queryAr: string;
  queryEn: string;
  answerAr: string;
  answerEn: string;
  insightsAr: string[];
  insightsEn: string[];
  keyMetrics?: { label: string; value: string; change?: string }[];
}

const OBD_DATABASE: Record<string, ObdDiagnosisResult> = {
  P0302: {
    code: 'P0302',
    titleAr: 'فقدان إشعال في الأسطوانة رقم 2 (Cylinder 2 Misfire)',
    titleEn: 'Cylinder 2 Misfire Detected',
    technicalAr: 'Cylinder 2 Misfire Detected (خلل في احتراق الأسطوانة رقم 2 بسبب شمعة الاحتراق أو الكويل أو البخاخ)',
    technicalEn: 'Combustion failure in Cylinder 2 detected by crankshaft position sensor variance.',
    customerAr:
      'تم رصد خلل في عملية الاحتراق داخل الأسطوانة رقم 2. السبب الأكثر شيوعاً هو تلف شمعة الاحتراق (البوجية) أو كويل الإشعال أو انسداد بخاخ الوقود.',
    customerEn:
      'A combustion problem was detected in cylinder 2. Further inspection of the spark plug, ignition coil, and fuel injector is recommended.',
    recommendedActionAr: 'فحص واستبدال شمعات الاحتراق (بواجي) وفحص كويل الإشعال وبخاخ الأسطوانة 2.',
    recommendedActionEn: 'Inspect & replace spark plug and ignition coil; clean fuel injector for cylinder 2.',
    urgencyLevel: 'medium',
    categoryAr: 'محركات البنزين والتشخيص',
    categoryEn: 'Gasoline Engine Diagnostics',
  },
  P0300: {
    code: 'P0300',
    titleAr: 'فقدان إشعال عشوائي في أسطوانات متعددة (Random Misfire)',
    titleEn: 'Random/Multiple Cylinder Misfire Detected',
    technicalAr: 'Random/Multiple Cylinder Misfire Detected (فقدان إشعال عشوائي غير محدد بأسطوانة واحدة)',
    technicalEn: 'Multiple cylinders misfiring due to fuel pressure, vacuum leak, or ignition module issue.',
    customerAr:
      'المحرك يعاني من تقطيع عشوائي في أكثر من أسطوانة، مما يسبب اهتزازاً وضعفاً في عزم السيارة وزيادة استهلاك الوقود.',
    customerEn:
      'Multiple cylinders are failing to fire properly, causing noticeable engine shaking, sluggish acceleration, and higher fuel consumption.',
    recommendedActionAr: 'فحص ضغط مضخة الوقود، فحص تسريب الهواء في المانيفولد، وفحص حساس الكرنك.',
    recommendedActionEn: 'Check fuel rail pressure, test for intake vacuum leaks, and inspect crankshaft sensor.',
    urgencyLevel: 'high',
    categoryAr: 'محركات البنزين والتشخيص',
    categoryEn: 'Gasoline Engine Diagnostics',
  },
  P0101: {
    code: 'P0101',
    titleAr: 'خلل في قراءة حساس تدفق الهواء (MAF Sensor Range)',
    titleEn: 'Mass Air Flow (MAF) Sensor Performance Problem',
    technicalAr: 'Mass Air Flow (MAF) Circuit Range/Performance Problem',
    technicalEn: 'Airflow volume reading deviates beyond ECU target map tolerances.',
    customerAr:
      'حساس قياس كمية الهواء الداخل للمحرك يقرأ بيانات غير دقيقة بسبب تراكم الأتربة أو تلف في الحساس، مما يؤدي إلى خنقة في التسارع.',
    customerEn:
      'The Mass Air Flow sensor is sending inconsistent readings to the engine computer, usually due to dust buildup or a dirty intake filter.',
    recommendedActionAr: 'تنظيف سلك حساس الماف بمنظف مخصص واستبدال فلتر الهواء وفحص خراطيم السحب.',
    recommendedActionEn: 'Clean MAF sensor element with specialized solvent, check intake boot for cracks, replace air filter.',
    urgencyLevel: 'medium',
    categoryAr: 'كهرباء وحساسات المحرك',
    categoryEn: 'Engine Electrical & Sensors',
  },
  P0420: {
    code: 'P0420',
    titleAr: 'كفاءة دبة التلوث / المحول الحفاز أقل من الحد المسموح (Catalyst Efficiency)',
    titleEn: 'Catalytic Converter Efficiency Below Threshold (Bank 1)',
    technicalAr: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    technicalEn: 'Downstream O2 oxygen sensor response indicates catalytic converter failure or degradation.',
    customerAr:
      'دبة البيئة (الفلتر البيئي للشكمان) لا تعمل بالكفاءة المطلوبة لتنقية الغازات العادمة، أو يوجد خلل في حساس الأكسجين الخلفي.',
    customerEn:
      'The catalytic converter is not cleaning exhaust emissions effectively, or the downstream oxygen sensor is providing degraded feedback.',
    recommendedActionAr: 'فحص حساس الأكسجين الخلفي بالكمبيوتر، وغسيل دبة البيئة بمواد كيميائية مخصصة.',
    recommendedActionEn: 'Scan upstream and downstream O2 sensor waveforms; inspect catalytic converter for internal core blockage.',
    urgencyLevel: 'low',
    categoryAr: 'العادم والانبعاثات',
    categoryEn: 'Exhaust & Emissions',
  },
  P0171: {
    code: 'P0171',
    titleAr: 'خليط وقود ضعيف - زيادة هواء (System Too Lean Bank 1)',
    titleEn: 'System Too Lean (Bank 1)',
    technicalAr: 'Fuel Trim System Lean (Bank 1) - Excessive unmetered air or low fuel delivery',
    technicalEn: 'ECU adding positive fuel trim (+25%) indicating lean air-fuel ratio.',
    customerAr:
      'نسبة الهواء الداخل للمحرك أكبر من نسبة البنزين المطلوبة، ويحدث هذا غالباً بسبب تسريب هواء من الخراطيم أو ضعف في طرمبة البنزين.',
    customerEn:
      'The engine is receiving too much air relative to fuel (running lean), commonly caused by vacuum leaks, faulty PCV valve, or weak fuel pump.',
    recommendedActionAr: 'إجراء فحص دخان (Smoke Test) للكشف عن تسريب الهواء وفحص ضغط طرمبة البنزين.',
    recommendedActionEn: 'Perform intake smoke leak test, check fuel pump delivery pressure, inspect PCV valve.',
    urgencyLevel: 'medium',
    categoryAr: 'محركات البنزين والوقود',
    categoryEn: 'Gasoline Engine & Fuel',
  },
  P0700: {
    code: 'P0700',
    titleAr: 'طلب فحص كمبيوتر ناقل الحركة (Transmission Control System)',
    titleEn: 'Transmission Control System Malfunction',
    technicalAr: 'Transmission Control Module (TCM) Requested MIL Illumination',
    technicalEn: 'Transmission computer has logged one or more diagnostic fault codes.',
    customerAr:
      'كمبيوتر الجير رصد خللاً في تبديلات السرعة أو حساسات الصمامات الهيدروليكية، ويجب فحص كمبيوتر الجير لقراءة الرموز الفرعية.',
    customerEn:
      'The transmission controller has detected an issue with shifting, solenoid operation, or fluid temperature.',
    recommendedActionAr: 'فحص كمبيوتر الجير، فحص مستوى وحالة زيت الجير، وفحص صمامات البودي بلف.',
    recommendedActionEn: 'Scan transmission module DTCs, check ATF level and quality, inspect valve body solenoids.',
    urgencyLevel: 'high',
    categoryAr: 'الجير وناقل الحركة',
    categoryEn: 'Transmission & Gearbox',
  },
  P0A80: {
    code: 'P0A80',
    titleAr: 'استبدال أو إعادة تأهيل بطارية الهايبرد (Replace Hybrid Battery Pack)',
    titleEn: 'Replace Hybrid Battery Pack',
    technicalAr: 'High-Voltage Battery Block Voltage Difference Exceeds 0.2V Threshold',
    technicalEn: 'Individual nickel-metal hydride or lithium cell block degradation detected.',
    customerAr:
      'بطارية الجهد العالي لمنظومة الهايبرد تعاني من تفاوت في شحن الخلايا وضعف في السعة التخزينية، مما يؤدي إلى زيادة عمل محرك البنزين باستمرار.',
    customerEn:
      'The high-voltage hybrid battery pack has developed a cell block voltage imbalance, requiring diagnostic reconditioning or cell replacement.',
    recommendedActionAr: 'فحص دلتا الجهد لكل بلوك بالكمبيوتر، وموازنة أو استبدال الخلايا التالفة وتنظيف مروحة التبريد.',
    recommendedActionEn: 'Perform high-voltage battery scan, balance module voltages, replace weak cells, service cooling fan.',
    urgencyLevel: 'high',
    categoryAr: 'سيارات الهايبرد والجهد العالي',
    categoryEn: 'Hybrid Vehicle Services',
  },
};

export const aiDiagnosticEngine = {
  /**
   * Natural Language Symptom Analyzer & Problem Routing Assistant (§ 39 & § 40)
   */
  diagnoseSymptom: (textInput: string): SymptomDiagnosisResult => {
    const text = textInput.toLowerCase().trim();

    // 1. Shaking during acceleration (§ 39 in Blueprint)
    if (
      text.includes('shake') ||
      text.includes('vibrat') ||
      text.includes('accelerat') ||
      text.includes('ترج') ||
      text.includes('اهتزاز') ||
      text.includes('دعس') ||
      text.includes('تسارع') ||
      text.includes('تقطيع')
    ) {
      return {
        categoryAr: 'محركات البنزين ونظام نقل الحركة (Engine Diagnostics & Drivetrain)',
        categoryEn: 'Engine Diagnostics & Drivetrain',
        confidence: 93,
        urgency: 'medium',
        explanationAr:
          'بناءً على الشكوى (اهتزاز عند التسارع)، تشير المعطيات الأولية إما إلى فقدان إشعال في المحرك (كالميس فاير الناتج عن البواجي/الكويلات) أو تآكل في عكوس ونظام نقل الحركة (Axle/CV Joint).',
        explanationEn:
          'Shaking under acceleration typically indicates either an engine misfire (faulty spark plug/ignition coil) or drivetrain wear in inner CV axle joints or motor mounts.',
        estimatedCostAr: '120 ₪ - 350 ₪',
        estimatedCostEn: '120 ₪ - 350 ₪',
        clarifyingQuestionsAr: [
          'ما هي سنة صنع ونوع المركبة وطراز المحرك؟',
          'هل تومض لمبة فحص المحرك (Check Engine) أثناء الاهتزاز؟',
          'هل يحدث الاهتزاز عند سرعة محددة (مثلاً بين 60 إلى 80 كم/س)؟',
        ],
        clarifyingQuestionsEn: [
          'What is the vehicle make, model, and year?',
          'Does the Check Engine light flash when the shaking occurs?',
          'Does the vibration occur at a specific speed range (e.g. 60-80 km/h)?',
        ],
        recommendedProviderCategory: 'Engine Diagnostics',
        recommendedProviderId: 'prov-2',
        suggestedParts: [
          { nameAr: 'شمعات احتراق أصلية OEM', nameEn: 'OEM Spark Plugs' },
          { nameAr: 'كويل إشعال أصلي', nameEn: 'Ignition Coil Pack' },
        ],
      };
    }

    // 2. Headlights / Electrical weakness when stopping (§ 40 in Blueprint)
    if (
      text.includes('headlight') ||
      text.includes('light') ||
      text.includes('stop') ||
      text.includes('weak') ||
      text.includes('انوار') ||
      text.includes('اضواء') ||
      text.includes('تضعف') ||
      text.includes('توقف') ||
      text.includes('كهرباء')
    ) {
      return {
        categoryAr: 'كهرباء السيارات ونظام الشحن (Automotive Electrical / Charging System)',
        categoryEn: 'Automotive Electrical & Charging System',
        confidence: 96,
        urgency: 'medium',
        explanationAr:
          'ضعف الإضاءة عند التوقف يدل على انخفاض خرج منظم جهد الدينامو (Alternator Voltage Regulator) عند دوران المحرك في وضع الخمول (Idle RPM) أو ضعف قدرة البطارية على تفريغ التيار.',
        explanationEn:
          'Dimming headlights during stops indicates low alternator charging voltage at idle RPM or excessive internal battery resistance needing regulator test.',
        estimatedCostAr: '80 ₪ - 220 ₪',
        estimatedCostEn: '80 ₪ - 220 ₪',
        clarifyingQuestionsAr: [
          'هل تلاحظ تأخيراً أو صعوبة عند تشغيل السيارة في الصباح الباكر؟',
          'كم مضى من الوقت على استبدال بطارية المركبة؟',
        ],
        clarifyingQuestionsEn: [
          'Do you experience slow engine cranking during cold morning starts?',
          'How old is the current 12V automotive battery?',
        ],
        recommendedProviderCategory: 'Automotive Electrical',
        recommendedProviderId: 'prov-3',
        suggestedParts: [
          { nameAr: 'منظم جهد دينامو أصلي', nameEn: 'Alternator Voltage Regulator' },
          { nameAr: 'بطارية 12V 70Ah معتمدة', nameEn: 'Heavy Duty 12V Battery' },
        ],
      };
    }

    // 3. Brake issues & Squeaking
    if (
      text.includes('brake') ||
      text.includes('squeak') ||
      text.includes('grind') ||
      text.includes('pad') ||
      text.includes('فرامل') ||
      text.includes('بريك') ||
      text.includes('صفير') ||
      text.includes('هوبات')
    ) {
      return {
        categoryAr: 'الفرامل والمساعدين (Brake Systems & Suspension)',
        categoryEn: 'Brake Systems & Suspension',
        confidence: 95,
        urgency: 'high',
        explanationAr:
          'بناءً على الأعراض المدخلة (صوت صفير واهتزاز عند التوقف)، يشير التحليل إلى تآكل في فحمات الفرامل الأمامية أو حاجة الهوبات للخرط بمقدار 0.2 ملم.',
        explanationEn:
          'Squeaking noise and pedal pulsation indicates worn front brake pads reaching acoustic wear indicator or rotor thickness variation requiring skimming.',
        estimatedCostAr: '150 ₪ - 380 ₪',
        estimatedCostEn: '150 ₪ - 380 ₪',
        clarifyingQuestionsAr: [
          'هل تشعر برجة في المقود عند الضغط على الفرامل بسرعات تتجاوز 80 كم/س؟',
          'متى كان آخر موعد لتغيير سائل الفرامل Dot 4؟',
        ],
        clarifyingQuestionsEn: [
          'Do you feel steering shudder at speeds above 80 km/h?',
          'When was the brake fluid last flushed?',
        ],
        recommendedProviderCategory: 'Brake Specialist',
        recommendedProviderId: 'prov-1',
        suggestedParts: [
          { nameAr: 'طقم فحمات فرامل سيراميك وكالة', nameEn: 'OEM Ceramic Front Brake Pads' },
          { nameAr: 'زيت فرامل Dot 4 تخليقي', nameEn: 'Dot 4 Synthetic Brake Fluid' },
        ],
      };
    }

    // 4. Battery / Starter / No Start
    if (
      text.includes('battery') ||
      text.includes('crank') ||
      text.includes('starter') ||
      text.includes('start') ||
      text.includes('بطارية') ||
      text.includes('سلف') ||
      text.includes('ما بتشتغل') ||
      text.includes('تكتكة')
    ) {
      return {
        categoryAr: 'البطاريات والشحن وبادئ الحركة (Battery & Charging Systems)',
        categoryEn: 'Battery & Charging Systems',
        confidence: 94,
        urgency: 'critical',
        explanationAr:
          'صوت التكتكة أو عدم قدرة السلف على التدوير يشير إلى هبوط في جهد البطارية لأقل من 10.5 فولت تحت الحمل، أو تآكل فحمات السلف (Starter Solenoid).',
        explanationEn:
          'Clicking noise and no-crank condition indicates low battery CCA voltage (<10.5V under load) or worn starter motor solenoid contacts.',
        estimatedCostAr: '60 ₪ - 280 ₪',
        estimatedCostEn: '60 ₪ - 280 ₪',
        clarifyingQuestionsAr: [
          'هل تضيء لمبات التابلوه بشكل طبيعي عند فتح السويتش؟',
          'هل تم تجربة تشغيل السيارة عن طريق اشتراك بطارية خارجي؟',
        ],
        clarifyingQuestionsEn: [
          'Do the instrument cluster lights turn on normally with ignition on?',
          'Have you attempted jumpstarting the car with a booster cable?',
        ],
        recommendedProviderCategory: 'Battery & Roadside SOS',
        recommendedProviderId: 'prov-4',
        suggestedParts: [
          { nameAr: 'بطارية AGM متطورة 12V', nameEn: 'Premium AGM 12V Battery' },
        ],
      };
    }

    // 5. AC & Cooling
    if (
      text.includes('ac') ||
      text.includes('air') ||
      text.includes('cool') ||
      text.includes('freon') ||
      text.includes('مكيف') ||
      text.includes('تبريد') ||
      text.includes('فريون') ||
      text.includes('حرارة')
    ) {
      return {
        categoryAr: 'المكيف والتبريد (Cooling & Air Conditioning)',
        categoryEn: 'Cooling & Air Conditioning',
        confidence: 92,
        urgency: 'medium',
        explanationAr:
          'ضعف التبريد يشير إما إلى انخفاض ضغط غاز الفريون الأمريكي نتيجة تسريب مجهري، أو انسداد فلتر المقصورة، أو خلل في كلتش الكمبروسر.',
        explanationEn:
          'Weak cooling indicates low refrigerant pressure from a micro-leak, clogged cabin air filter, or failing compressor magnetic clutch.',
        estimatedCostAr: '90 ₪ - 260 ₪',
        estimatedCostEn: '90 ₪ - 260 ₪',
        clarifyingQuestionsAr: [
          'هل تسمع صوت تكة عند الضغط على زر تشغيل المكيف A/C؟',
          'هل يخرج هواء ساخن من جانب وبارد من الجانب الآخر؟',
        ],
        clarifyingQuestionsEn: [
          'Do you hear a positive click when pressing the A/C button?',
          'Is the air blowing lukewarm on one side and cool on the other?',
        ],
        recommendedProviderCategory: 'Air Conditioning Specialist',
        recommendedProviderId: 'prov-3',
        suggestedParts: [
          { nameAr: 'شحنة غاز فريون R134a أصلي مع زيت', nameEn: 'R134a Pure Freon Gas + PAG Oil' },
          { nameAr: 'فلتر مكيف داخلي كربون نشط', nameEn: 'Activated Carbon Cabin Air Filter' },
        ],
      };
    }

    // 6. Transmission & Gearbox
    if (
      text.includes('gear') ||
      text.includes('transmission') ||
      text.includes('clutch') ||
      text.includes('slip') ||
      text.includes('جير') ||
      text.includes('ناقل الحركة') ||
      text.includes('كلتش') ||
      text.includes('نتعة') ||
      text.includes('تأخير في الغيار')
    ) {
      return {
        categoryAr: 'الجير وناقل الحركة (Transmission & Gearbox)',
        categoryEn: 'Transmission & Gearbox',
        confidence: 91,
        urgency: 'high',
        explanationAr:
          'الشعور بنتعة أو تأخر في نقل السرعات يشير إلى انخفاض لزوجة زيت الجير الأوتوماتيكي، أو اتساخ مخ الجير (Valve Body)، أو تآكل في حزم الكلتشات.',
        explanationEn:
          'Shifting hesitation or shudder indicates degraded ATF transmission fluid, clogged valve body solenoid passages, or friction clutch wear.',
        estimatedCostAr: '220 ₪ - 850 ₪',
        estimatedCostEn: '220 ₪ - 850 ₪',
        clarifyingQuestionsAr: [
          'متى كان آخر موعد لتغيير زيت وفلتر الجير الأصلي؟',
          'هل تحدث النتعة عند التبديل بين الـ P والـ D أو أثناء القيادة؟',
        ],
        clarifyingQuestionsEn: [
          'When was the transmission fluid and filter last serviced?',
          'Does the jerk occur when shifting P to D or while upshifting on the road?',
        ],
        recommendedProviderCategory: 'Transmission Specialist',
        recommendedProviderId: 'prov-2',
        suggestedParts: [
          { nameAr: 'زيت جير أوتوماتيك تخليقي بالكامل', nameEn: 'OEM Full Synthetic ATF Fluid' },
          { nameAr: 'فلتر زيت جير مع كازكيت', nameEn: 'Transmission Filter & Pan Gasket' },
        ],
      };
    }

    // 7. General Fallback with Comprehensive Multi-Point Guidance
    return {
      categoryAr: 'فحص شامل وتشخيص كمبيوتر (Computer Diagnostics & Inspection)',
      categoryEn: 'Diagnostics & Vehicle Inspection',
      confidence: 88,
      urgency: 'medium',
      explanationAr:
        'الأعراض الموصوفة تستدعي إجراء مسح شامل بالكمبيوتر OBD-II لقراءة الحساسات الحية ومطابقتها مع خريطة الشركة الصانعة لتحديد السبب الدقيق.',
      explanationEn:
        'The reported symptoms require an OBD-II computer diagnostic scan to read live telemetry sensor parameters and isolate the mechanical or electrical root cause.',
      estimatedCostAr: '50 ₪ - 150 ₪',
      estimatedCostEn: '50 ₪ - 150 ₪',
      clarifyingQuestionsAr: [
        'هل تظهر أي لمبة تحذيرية في لوحة العدادات (مثل Check Engine أو ABS)؟',
        'هل تلاحظ أي أصوات غريبة (طقطقة، ونين، أو تصفير) من المحرك أو أسفل السيارة؟',
      ],
      clarifyingQuestionsEn: [
        'Are there any dashboard warning lights illuminated (e.g. Check Engine or ABS)?',
        'Do you hear abnormal noises (clicking, whining, or hissing) from the engine bay or chassis?',
      ],
      recommendedProviderCategory: 'General Diagnostics',
      recommendedProviderId: 'prov-1',
      suggestedParts: [
        { nameAr: 'فحص كمبيوتر ولايف داتا شامل', nameEn: 'Full Live OBD-II Diagnostic Scan' },
      ],
    };
  },

  /**
   * OBD-II Diagnostic Code Interpreter (§ 43 in Blueprint)
   */
  lookupObdCode: (codeRaw: string): ObdDiagnosisResult => {
    const code = codeRaw.toUpperCase().trim();
    if (OBD_DATABASE[code]) {
      return OBD_DATABASE[code];
    }

    // Fallback parser for standard OBD codes (P = Powertrain, B = Body, C = Chassis, U = Network)
    const systemLetter = code.charAt(0);
    let systemDescAr = 'منظومة المحرك وناقل الحركة (Powertrain)';
    let systemDescEn = 'Powertrain System (Engine & Transmission)';

    if (systemLetter === 'C') {
      systemDescAr = 'منظومة الشاسيه والفرامل والـ ABS (Chassis)';
      systemDescEn = 'Chassis & Brake Control System (ABS/ESP)';
    } else if (systemLetter === 'B') {
      systemDescAr = 'أنظمة الهيكل والوسائد الهوائية (Body & Airbags)';
      systemDescEn = 'Body & Airbag Restraint System';
    } else if (systemLetter === 'U') {
      systemDescAr = 'شبكة الاتصال وكمبيوترات السيارة (CAN Bus Network)';
      systemDescEn = 'CAN Bus Telemetry & Controller Network';
    }

    return {
      code,
      titleAr: `كود عطل تشخيصي: ${code}`,
      titleEn: `Diagnostic Trouble Code: ${code}`,
      technicalAr: `${code} - رصد خلل إلكتروني في ${systemDescAr}`,
      technicalEn: `${code} - Diagnostic Trouble Code logged in ${systemDescEn}`,
      customerAr: `هذا الكود مسجل في كمبيوتر السيارة ويشير إلى قراءة خارج المعدل الطبيعي في ${systemDescAr}. يوصى بفحص الحساس المعني ومسح الكود بعد المعايرة.`,
      customerEn: `This code is recorded in the vehicle computer, indicating a parameter out of expected range in ${systemDescEn}. A full live-data scan is recommended.`,
      recommendedActionAr: 'إجراء فحص كمبيوتر مفصل واختبار الحساس والأسلاك المرتبطة به.',
      recommendedActionEn: 'Perform live telemetry diagnostic test on associated sensor and wiring harness.',
      urgencyLevel: 'medium',
      categoryAr: systemDescAr,
      categoryEn: systemDescEn,
    };
  },

  /**
   * Workshop Business Assistant "Ask Ahl AI" (§ 46 in Blueprint)
   */
  queryBusinessAnalytics: (queryInput: string): BusinessAnalyticsResult => {
    const q = queryInput.toLowerCase();

    if (q.includes('best') || q.includes('service') || q.includes('افضل') || q.includes('خدمات') || q.includes('اكثر')) {
      return {
        queryAr: 'ما هي أفضل الخدمات وأكثرها طلباً هذا الشهر؟',
        queryEn: 'What are the highest performing services this month?',
        answerAr: 'تحليل أكثر الخدمات طلباً وإيراداً للورشة خلال الـ 30 يوماً الماضية:',
        answerEn: 'Workshop high-demand services breakdown over the past 30 days:',
        insightsAr: [
          'صيانة الفرامل وفحمات السيراميك: 68 طلباً (إيراد 24,500 ₪) — تمثل 34% من إجمالي الإيرادات.',
          'غيار الزيوت التخليقية 10,000 كم: 52 طلباً (إيراد 9,880 ₪) — أعلى معدل تكرار عملاء (62%).',
          'فحص وبرمجة كمبيوتر OBD-II: 38 طلباً (إيراد 3,420 ₪) — أسرع زمن إنجاز (25 دقيقة).',
        ],
        insightsEn: [
          'Brake servicing & ceramic pads: 68 jobs (Revenue 24,500 ₪) — 34% of total turnover.',
          '10,000 KM full synthetic oil packages: 52 jobs (Revenue 9,880 ₪) — 62% customer retention rate.',
          'OBD-II computer diagnostics: 38 jobs (Revenue 3,420 ₪) — fastest turnaround (25 mins).',
        ],
        keyMetrics: [
          { label: 'Top Service', value: 'Brake Overhaul', change: '+28%' },
          { label: 'Avg Ticket Value', value: '380 ₪', change: '+12%' },
        ],
      };
    }

    if (q.includes('inventory') || q.includes('stock') || q.includes('مخزون') || q.includes('قطع') || q.includes('نقص')) {
      return {
        queryAr: 'تنبيهات الأصناف والمخزون المنخفض:',
        queryEn: 'Low stock and inventory replenishment alerts:',
        answerAr: 'الأصناف التي وصلت إلى حد إعادة الطلب الأدنى (Safety Stock Reorder):',
        answerEn: 'Parts reaching minimum threshold reorder point:',
        insightsAr: [
          '⚠️ فحمات فرامل أمامية Toyota Camry 2020: متبقي قطعتين فقط (الحد الأدنى 5).',
          '⚠️ زيت تخليقي 5W-30 لزوجة عالية: متبقي 8 لترات (يوصى بطلب كرتونة 24 علبة).',
          '✅ بطاريات AGM 70Ah: المخزون كافي (12 بطارية جاهزة للتركيب).',
        ],
        insightsEn: [
          '⚠️ Toyota Camry 2020 Front Ceramic Pads: only 2 sets remaining (minimum buffer 5).',
          '⚠️ 5W-30 Full Synthetic Motor Oil: only 8 liters in stock (reorder case recommended).',
          '✅ 70Ah AGM Batteries: Healthy buffer (12 units ready for installation).',
        ],
        keyMetrics: [
          { label: 'Items to Reorder', value: '4 SKUs', change: 'Urgent' },
          { label: 'Stock Value', value: '38,400 ₪', change: 'Stable' },
        ],
      };
    }

    return {
      queryAr: 'تحليل الأداء العام للورشة ومؤشرات الإنتاجية:',
      queryEn: 'Workshop Overall Performance & Productivity Telemetry:',
      answerAr: 'ملخص مؤشرات الأداء الرئيسية (KPIs) ونشاط الفنيين:',
      answerEn: 'Key performance indicators (KPIs) and technician workload telemetry:',
      insightsAr: [
        'متوسط زمن إنجاز أوامر العمل انخفض بنسبة 14% إلى 44 دقيقة بفضل جدولة الحجوزات الذكية.',
        'معدل رضا العملاء (CSAT) سجل 4.9 / 5 بناءً على 84 تقييماً موثقاً هذا الشهر.',
        'أعلى الفنيين إنتاجية: الفني رائد خليل (أنجز 32 أمر عمل بدون أي شكوى رجوع).',
      ],
      insightsEn: [
        'Average job turnaround time decreased by 14% to 44 minutes with smart bay scheduling.',
        'Customer satisfaction (CSAT) reached 4.9 / 5 across 84 verified customer reviews.',
        'Top technician: Tech Raed Khalil completed 32 work orders with 0% comeback rate.',
      ],
      keyMetrics: [
        { label: 'Monthly Revenue', value: '46,800 ₪', change: '+18.5%' },
        { label: 'Completed Jobs', value: '142', change: '+22%' },
      ],
    };
  },
};
