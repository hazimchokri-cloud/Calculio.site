import React from 'react';
import { 
  Calculator, 
  DollarSign, 
  Activity, 
  ArrowLeftRight, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  Lock, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Sliders, 
  Sparkles,
  MousePointerClick,
  FileText,
  Clock,
  Compass
} from 'lucide-react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { AdSlot } from '../shared/AdSlot';
import { useLanguage } from '../../i18n/LanguageContext';
import { CATEGORIES } from '../../data/categories';

interface AboutViewProps {
  onGoHome: () => void;
  onGoToBlog: () => void;
  onGoToContact: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onGoHome,
  onGoToBlog,
  onGoToContact,
  onSelectCategory
}) => {
  const { t, calculators } = useLanguage();

  const breadcrumbs = [
    { label: t('about.title', 'About Us'), active: true }
  ];

  // Key featured categories to highlight in What We Offer
  const featuredOfferCategories = [
    {
      id: 'financial',
      name: t('categories.financial', 'Financial Calculators'),
      description: t('categories.financialDesc', 'Mortgages, auto loans, investments, compound interest, retirement planning, savings goals, and loan amortization.'),
      icon: DollarSign,
      iconColor: 'text-[#F97316]',
      badgeBg: 'bg-[#FFF7ED] text-[#9A3412] border-[#FDBA74]',
      toolsCount: calculators.filter(c => c.category === 'financial').length || 15
    },
    {
      id: 'fitness-health',
      name: t('categories.fitnessHealth', 'Health & Fitness Calculators'),
      description: t('categories.fitnessHealthDesc', 'BMI (Body Mass Index), body fat percentage, BMR metabolism, daily calorie expenditure (TDEE), and ideal body weight.'),
      icon: Activity,
      iconColor: 'text-[#F97316]',
      badgeBg: 'bg-[#FFF7ED] text-[#9A3412] border-[#FDBA74]',
      toolsCount: calculators.filter(c => c.category === 'fitness-health').length || 11
    },
    {
      id: 'math-algebra',
      name: t('categories.mathAlgebra', 'Math & Algebra Calculators'),
      description: t('categories.mathAlgebraDesc', 'Percentages, fractions, decimals, scientific math, ratios, averages, exponents, probability, and 2D/3D geometry.'),
      icon: Calculator,
      iconColor: 'text-[#0EA5E9]',
      badgeBg: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
      toolsCount: calculators.filter(c => c.category === 'math-algebra').length || 11
    },
    {
      id: 'conversion',
      name: t('categories.conversion', 'Conversions & Units'),
      description: t('categories.conversionDesc', 'Convert length, weight, temperature, volume, digital data storage, speed, and area measurements with instant precision.'),
      icon: ArrowLeftRight,
      iconColor: 'text-[#F97316]',
      badgeBg: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]',
      toolsCount: calculators.filter(c => c.category === 'conversion').length || 10
    },
    {
      id: 'date-time',
      name: t('categories.dateTime', 'Date & Time Tools'),
      description: t('categories.dateTimeDesc', 'Calculate days between dates, exact age breakdown in years/months/days, business working days, and time duration.'),
      icon: Calendar,
      iconColor: 'text-[#0D9488]',
      badgeBg: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
      toolsCount: calculators.filter(c => c.category === 'date-time').length || 7
    },
    {
      id: 'business',
      name: t('categories.business', 'Business & Real Estate'),
      description: t('categories.businessDesc', 'Break-even analysis, profit margins, rental property ROI, capitalization rate, markup pricing, and cash flow calculations.'),
      icon: Briefcase,
      iconColor: 'text-[#7C3AED]',
      badgeBg: 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]',
      toolsCount: calculators.filter(c => c.category === 'business' || c.category === 'real-estate').length || 12
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} onGoHome={onGoHome} />

        {/* 1. HERO SECTION */}
        <section 
          id="about-hero" 
          aria-labelledby="about-hero-title"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E2E8F0] shadow-xs relative overflow-hidden space-y-6"
        >
          <div className="relative space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] text-[#9A3412] text-xs sm:text-sm font-bold border border-[#FDBA74]">
              <Calculator className="w-4 h-4 text-[#F97316]" />
              <span>{t('about.badge', 'Simple, Accurate & Free Tools')}</span>
            </div>

            <h1 
              id="about-hero-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] leading-tight"
            >
              {t('about.title', 'About Calculio')}
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              {t('about.heroSubtitle', 'Calculio is an intuitive online platform providing free, fast, and reliable calculation tools designed for everyday finance, health, math, and conversions.')}
            </p>
          </div>

          {/* Quick summary strip */}
          <div className="relative pt-4 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-0.5">
              <span className="text-xs text-[#64748B] font-medium block">{t('about.metricTools', 'Tool Selection')}</span>
              <span className="text-base sm:text-lg font-bold text-[#0F172A]">{calculators.length} Calculators</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#64748B] font-medium block">{t('about.metricCost', 'Cost to Use')}</span>
              <span className="text-base sm:text-lg font-bold text-[#F97316]">100% Free</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#64748B] font-medium block">{t('about.metricAccess', 'Account Required')}</span>
              <span className="text-base sm:text-lg font-bold text-[#0F172A]">No Sign-Up</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#64748B] font-medium block">{t('about.metricPlatform', 'Platform')}</span>
              <span className="text-base sm:text-lg font-bold text-[#0F172A]">Web & Mobile</span>
            </div>
          </div>
        </section>

        {/* Top Ad Slot */}
        <AdSlot type="header-banner" />

        {/* 2. WHO WE ARE */}
        <section 
          id="about-who-we-are" 
          aria-labelledby="who-we-are-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <Compass className="w-4 h-4" />
              <span>{t('about.whoWeAreBadge', 'Who We Are')}</span>
            </div>
            <h2 
              id="who-we-are-heading"
              className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            >
              {t('about.whoWeAreTitle', 'Built to Simplify Everyday Calculations')}
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#475569] leading-relaxed">
            <p>
              {t('about.whoWeAreP1', 'Calculio is an open calculation resource designed to take the friction and confusion out of everyday math. Whether you are calculating monthly mortgage payments, figuring out compound interest on savings, checking your daily calorie requirements, or converting unit measurements, our tools provide clear, instant answers without unnecessary complexity.')}
            </p>
            <p>
              {t('about.whoWeAreP2', 'We created Calculio because many online calculators today are difficult to use, hidden behind paywalls, cluttered with intrusive popups, or provide numbers without explaining what they mean. Calculio solves this by focusing on clean interfaces, transparent mathematical formulas, and helpful contextual summaries.')}
            </p>
            <p>
              {t('about.whoWeAreP3', 'Our tools are built to help everyday consumers, students, homeowners, and professionals make informed calculations quickly and effortlessly on any device.')}
            </p>
          </div>
        </section>

        {/* 3. OUR MISSION */}
        <section 
          id="about-mission" 
          aria-labelledby="mission-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-8"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('about.missionBadge', 'Our Mission')}</span>
            </div>
            <h2 
              id="mission-heading"
              className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            >
              {t('about.missionTitle', 'What We Strive to Deliver')}
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              {t('about.missionSubtitle', 'Our goal is to make practical mathematical computation accessible, clear, and convenient for everyone.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.missionPillar1Title', 'Simple and Accessible Tools')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.missionPillar1Desc', 'Calculators should be straightforward. We prioritize clean forms, intuitive input controls, and responsive designs that function seamlessly on smartphones, tablets, and desktop computers.')}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.missionPillar2Title', 'Clear and Understandable Results')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.missionPillar2Desc', 'A calculation is only helpful if you understand the outcome. We provide readable breakdowns, visual metrics, and plain-language summaries so results are easy to interpret.')}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.missionPillar3Title', 'Useful Calculators for Everyday Needs')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.missionPillar3Desc', 'From tracking home loan budgets and retirement milestones to monitoring fitness progress and solving classroom math, we focus on tools people genuinely use.')}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.missionPillar4Title', 'A Clean and Easy-to-Use Experience')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.missionPillar4Desc', 'We avoid unnecessary distractions, mandatory registrations, and cluttered layouts. You get instant access to calculation engines that compute values in real-time as you type.')}
              </p>
            </div>
          </div>
        </section>

        {/* 4. WHAT WE OFFER */}
        <section 
          id="about-what-we-offer" 
          aria-labelledby="what-we-offer-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
                <Layers className="w-4 h-4" />
                <span>{t('about.whatWeOfferBadge', 'What We Offer')}</span>
              </div>
              <h2 
                id="what-we-offer-heading"
                className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
              >
                {t('about.whatWeOfferTitle', 'Our Main Calculator Categories')}
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                {t('about.whatWeOfferSubtitle', 'Explore our comprehensive selection of purpose-built calculation engines.')}
              </p>
            </div>

            <button
              id="about-view-all-cats-btn"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F97316] hover:text-[#EA580C] transition-colors cursor-pointer shrink-0"
            >
              <span>{t('about.viewAllCategories', 'Explore All Categories')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredOfferCategories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={cat.id}
                  id={`about-category-card-${cat.id}`}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#FDBA74] hover:bg-[#FFF7ED] hover:shadow-xs transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                        <IconComponent className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${cat.badgeBg}`}>
                        {cat.toolsCount} {t('common.tools', 'tools')}
                      </span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-sm font-bold text-[#F97316] group-hover:text-[#EA580C] cursor-pointer w-full text-left"
                  >
                    <span>{t('about.openCategory', 'Open Category')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. WHY CHOOSE CALCULIO */}
        <section 
          id="about-why-choose" 
          aria-labelledby="why-choose-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-8"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('about.whyChooseBadge', 'Why Choose Calculio')}</span>
            </div>
            <h2 
              id="why-choose-heading"
              className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            >
              {t('about.whyChooseTitle', 'Practical Reasons to Use Calculio')}
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              {t('about.whyChooseSubtitle', 'We prioritize user convenience, clarity, and dependable design in every calculation tool.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Easy to Use */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
                {t('about.feature1Title', 'Easy to Use')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.feature1Desc', 'Clean interfaces with clear labels and immediate input reactivity. No complex setup or confusion.')}
              </p>
            </div>

            {/* Card 2: Clear Results */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
                {t('about.feature2Title', 'Clear Results')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.feature2Desc', 'Computed values are paired with useful summaries, breakdown tables, and practical explanations.')}
              </p>
            </div>

            {/* Card 3: Useful Everyday Tools */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
                {t('about.feature3Title', 'Useful Everyday Tools')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.feature3Desc', 'A diverse directory tailored for real-life decisions in personal finance, health, schooling, and projects.')}
              </p>
            </div>

            {/* Card 4: Free Access */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] text-[#F97316] border border-[#E2E8F0] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0F172A]">
                {t('about.feature4Title', 'Free Access')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.feature4Desc', 'All calculation tools are freely available without subscription plans, credits, or registration gates.')}
              </p>
            </div>
          </div>
        </section>

        {/* 6. HOW IT WORKS */}
        <section 
          id="about-how-it-works" 
          aria-labelledby="how-it-works-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-8"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <Clock className="w-4 h-4" />
              <span>{t('about.howItWorksBadge', 'How It Works')}</span>
            </div>
            <h2 
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            >
              {t('about.howItWorksTitle', 'Calculate in Three Simple Steps')}
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              {t('about.howItWorksSubtitle', 'Getting answers on Calculio is quick, direct, and straightforward.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#F97316] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  1
                </div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Step 1</span>
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.step1Title', 'Choose a Calculator')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.step1Desc', 'Browse our categorized directory or use the instant search bar to find the exact tool you need.')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#F97316] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  2
                </div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Step 2</span>
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.step2Title', 'Enter Your Values')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.step2Desc', 'Fill in your numbers with simple, clearly labeled inputs and adjust parameters to fit your scenario.')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#F97316] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  3
                </div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Step 3</span>
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {t('about.step3Title', 'Get Your Result')}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t('about.step3Desc', 'View your result instantly alongside clear breakdowns, formula explanations, and practical takeaways.')}
              </p>
            </div>
          </div>
        </section>

        {/* 7. OUR APPROACH TO ACCURACY */}
        <section 
          id="about-accuracy" 
          aria-labelledby="accuracy-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-5"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('about.accuracyBadge', 'Our Approach to Accuracy')}</span>
            </div>
            <h2 
              id="accuracy-heading"
              className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            >
              {t('about.accuracyTitle', 'Formulas, Assumptions & Context')}
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#475569] leading-relaxed">
            <p>
              {t('about.accuracyP1', 'Our calculators are built using standard, widely accepted mathematical formulas, established financial amortization models, and recognized health metrics (such as WHO and NIH BMI standards). Whenever applicable, we display the exact algebraic equation and variable definitions so you can verify how numbers are computed.')}
            </p>
            <p>
              {t('about.accuracyP2', 'It is important to remember that real-world calculations often depend on specific individual circumstances, lender policies, localized tax laws, or medical factors. Calculators provide structured estimates and educational insights based on the assumptions and values you input.')}
            </p>
            <p className="text-sm text-[#475569] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              <strong className="text-[#0F172A]">{t('about.notePrefix', 'Important Note:')}</strong> {t('about.accuracyNote', 'Calculio tools and articles are designed for informational and educational purposes. For binding financial agreements, tax filings, legal contracts, or medical guidance, we always recommend consulting qualified professionals.')}
            </p>
          </div>
        </section>

        {/* 8. PRIVACY */}
        <section 
          id="about-privacy" 
          aria-labelledby="privacy-heading"
          className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xs space-y-5"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <Lock className="w-4 h-4" />
              <span>{t('about.privacyBadge', 'Privacy & Data')}</span>
            </div>
            <h2 
              id="privacy-heading"
              className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            >
              {t('about.privacyTitle', 'How Your Data and Inputs are Handled')}
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#475569] leading-relaxed">
            <p>
              {t('about.privacyP1', 'We believe your numbers should remain your own. Calculations performed on Calculio execute locally in your web browser. When you enter financial numbers, loan amounts, or health metrics, those values are computed directly on your device.')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm sm:text-base">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#F97316]" />
                  <span>{t('about.privacyClientSideTitle', 'Local Browser Execution')}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {t('about.privacyClientSideDesc', 'Calculations are computed on your device. We do not store or track the numerical values you enter into calculators on remote servers.')}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm sm:text-base">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#F97316]" />
                  <span>{t('about.privacySavedHistoryTitle', 'Optional Saved History')}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {t('about.privacySavedHistoryDesc', 'If you choose to bookmark or save a calculation, that data is stored strictly in your browser local storage. You can view or clear it at any time.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. CALL TO ACTION (CTA) */}
        <section 
          id="about-cta" 
          aria-labelledby="about-cta-title"
          className="p-8 sm:p-12 rounded-3xl bg-[#F97316] text-white shadow-xs space-y-6 relative overflow-hidden text-center sm:text-left border border-[#EA580C]"
        >
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 
                id="about-cta-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight"
              >
                {t('about.readyToCalculate', 'Ready to Calculate?')}
              </h2>
              <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
                {t('about.readyToCalculateSubtitle', 'Explore our calculators and find the right tool for your needs.')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
              <button
                id="about-cta-explore-btn"
                onClick={onGoHome}
                className="px-6 py-3 bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#9A3412] text-sm sm:text-base font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>{t('about.exploreCalculatorsBtn', 'Explore Calculators')}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>

              <button
                id="about-cta-blog-btn"
                onClick={onGoToBlog}
                className="px-5 py-3 bg-[#EA580C] hover:bg-[#9A3412] text-white text-sm sm:text-base font-bold rounded-xl transition-all border border-orange-400/30 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>{t('about.browseGuidesBtn', 'Browse Guides')}</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};
