import { CategoryMeta } from '../../types';

export const CATEGORIES_AR: CategoryMeta[] = [
  {
    id: 'financial',
    name: 'حاسبات مالية وتمويل',
    slug: 'financial',
    description: 'التمويل العقاري، القروض، الاستثمارات، الفائدة المركبة، خطط الادخار، سداد البطاقات، التقاعد، وجداول الإطفاء وسداد الديون.',
    iconName: 'DollarSign',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'المال والتمويل',
    calculatorsCount: 15
  },
  {
    id: 'fitness-health',
    name: 'الصحة واللياقة البدنية',
    slug: 'fitness-health',
    description: 'مؤشر كتلة الجسم، نسبة دهون الجسم، معدل الأيض الأساسي BMR، السعرات الحرارية، الوزن المثالي، الحمل وموعد الولادة، شرب الماء ومعدل ضربات القلب.',
    iconName: 'Activity',
    color: 'rose',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'الصحة والجسم',
    calculatorsCount: 11
  },
  {
    id: 'math-algebra',
    name: 'الرياضيات والجبر',
    slug: 'math-algebra',
    description: 'النسب المئوية، الكسور، الأعداد العشرية، الآلة الحاسبة العلمية، التناسب، المتوسط، الاحتمالات، الإحصاء، الأسس والجذور والهندسة.',
    iconName: 'Calculator',
    color: 'blue',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'الرياضيات والعلوم',
    calculatorsCount: 11
  },
  {
    id: 'real-estate',
    name: 'حاسبات العقارات والاستثمار',
    slug: 'real-estate',
    description: 'العائد على الاستثمار العقاري ROI، معدل الرسملة Cap Rate، العائد على النقد المستثمر، والتدفق النقدي الشهري والسنوي للإيجارات.',
    iconName: 'Building',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'العقارات والاستثمار',
    calculatorsCount: 4
  },
  {
    id: 'tax',
    name: 'حاسبات الضرائب والدخل',
    slug: 'tax',
    description: 'شرائح ضريبة الدخل، ضريبة المبيعات والقيمة المضافة، صافي الراتب المستلم، والاستقطاعات والخصومات القياسية.',
    iconName: 'Receipt',
    color: 'teal',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    badgeText: 'الضرائب والدخل',
    calculatorsCount: 3
  },
  {
    id: 'business',
    name: 'حاسبات الأعمال والتجارة',
    slug: 'business',
    description: 'تحليل نقطة التعادل، هامش الربح الإجمالي والصافي، تسعير المنتجات ونسبة الزيادة، والقيمة الدائمة للعميل LTV.',
    iconName: 'Briefcase',
    color: 'sky',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeText: 'التجارة والأعمال',
    calculatorsCount: 3
  },
  {
    id: 'construction',
    name: 'حاسبات البناء والتشييد',
    slug: 'construction',
    description: 'حجم وأكياس الخرسانة، مساحات البلاط والأرضيات مع نسبة الهدر، ألواح الجبس، وتغطية دهانات الجدران.',
    iconName: 'HardHat',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'البناء والترميم',
    calculatorsCount: 3
  },
  {
    id: 'engineering',
    name: 'حاسبات الهندسة والفيزياء',
    slug: 'engineering',
    description: 'قانون أوم (الجهد، التيار، المقاومة، القدرة بالواط)، عزم الدوران، وتحليلات الدوائر الكهربائية والفيزيائية.',
    iconName: 'Cpu',
    color: 'violet',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    badgeText: 'الدوائر والفيزياء',
    calculatorsCount: 2
  },
  {
    id: 'education',
    name: 'حاسبات التعليم والدرجات',
    slug: 'education',
    description: 'درجة الاختبار النهائي المطلوبة للنجاح أو التفوق، المعدل التراكمي الجامعي والمدرسي GPA، ودرجات الواجبات الموزونة.',
    iconName: 'GraduationCap',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'التعليم والدرجات',
    calculatorsCount: 2
  },
  {
    id: 'cryptocurrency',
    name: 'حاسبات العملات الرقمية',
    slug: 'cryptocurrency',
    description: 'أرباح وخسائر تداول العملات المشفرة، استراتيجية الشراء الدوري DCA، وخصومات رسوم منصات التداول.',
    iconName: 'Coins',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'العملات المشفرة',
    calculatorsCount: 2
  },
  {
    id: 'conversion',
    name: 'محولات الوحدات القياسية',
    slug: 'conversion',
    description: 'تحويل الأطوال، درجات الحرارة، الأوزان، الأحجام، السرعات، المساحات، ووحدات تخزين البيانات الرقمية فورياً.',
    iconName: 'ArrowLeftRight',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'محولات الوحدات',
    calculatorsCount: 1
  },
  {
    id: 'date-time',
    name: 'حاسبات التاريخ والوقت',
    slug: 'date-time',
    description: 'حساب عدد الأيام والأسابيع بين تاريخين، حساب العمر الدقيق، ساعات وأيام العمل الرسمية وفترات الانتظار.',
    iconName: 'Calendar',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'التاريخ والوقت',
    calculatorsCount: 1
  },
  {
    id: 'construction-other',
    name: 'أدوات الحياة اليومية',
    slug: 'construction-other',
    description: 'حساب استهلاك وتكلفة الوقود للرحلات وتقسيم النفقات بين الركاب والمعدل الدراسي.',
    iconName: 'Layers',
    color: 'purple',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'الأدوات اليومية',
    calculatorsCount: 2
  }
];
