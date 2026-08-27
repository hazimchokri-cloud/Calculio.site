import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Scale, 
  ArrowLeft, 
  ArrowRight,
  Calculator,
  ExternalLink,
  Mail,
  Eye,
  Server,
  Cookie,
  UserCheck,
  Database,
  Globe,
  Info
} from 'lucide-react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { AdSlot } from '../shared/AdSlot';
import { useLanguage } from '../../i18n/LanguageContext';

export type LegalTab = 'privacy' | 'terms' | 'disclaimer';

interface LegalViewProps {
  activeTab: LegalTab;
  onChangeTab: (tab: LegalTab) => void;
  onGoHome: () => void;
  onGoToAbout: () => void;
  onGoToContact: () => void;
  onGoToAllCalculators: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  activeTab,
  onChangeTab,
  onGoHome,
  onGoToAbout,
  onGoToContact,
  onGoToAllCalculators
}) => {
  const { t } = useLanguage();

  const getTitle = () => {
    switch (activeTab) {
      case 'privacy':
        return t('footer.privacyPolicy', 'Privacy Policy');
      case 'terms':
        return t('footer.termsOfUse', 'Terms of Use');
      case 'disclaimer':
        return t('footer.disclaimerTitle', 'Disclaimer');
    }
  };

  const breadcrumbs = [
    { label: t('nav.about', 'Legal & Policy'), onClick: onGoToAbout },
    { label: getTitle(), active: true }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} onGoHome={onGoHome} />

        {/* Tab Navigation Pill Bar */}
        <div className="bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-wrap sm:flex-nowrap gap-1.5">
          <button
            type="button"
            onClick={() => onChangeTab('privacy')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{t('footer.privacyPolicy', 'Privacy Policy')}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('terms')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t('footer.termsOfUse', 'Terms of Use')}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('disclaimer')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t('footer.disclaimerTitle', 'Disclaimer')}</span>
          </button>
        </div>

        {/* Content Container */}
        <article className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E2E8F0] shadow-xs space-y-8">
          
          {/* Header */}
          <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FDBA74] text-[#F97316] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Official Document • Last Updated: August 26, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              {getTitle()}
            </h1>
            <p className="text-sm sm:text-base text-[#475569]">
              {activeTab === 'privacy' && 'Learn how Calculio collects, uses, protects, and handles information when you use our calculators, tools, and website.'}
              {activeTab === 'terms' && 'Read the Terms of Use for Calculio, including rules for using our calculators, tools, content, and website.'}
              {activeTab === 'disclaimer' && 'Read the Calculio Disclaimer covering calculator results, informational content, third-party data, and use of our online tools.'}
            </p>
          </div>

          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-8 text-[#475569] text-sm sm:text-base leading-relaxed">
              
              {/* Overview Callout */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center gap-2.5 text-[#0F172A] font-bold">
                  <Globe className="w-5 h-5 text-[#F97316]" />
                  <span>Welcome to Calculio</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Calculio (accessible at{' '}
                  <a href="https://calculio.site" className="text-[#F97316] font-semibold hover:underline">
                    https://calculio.site
                  </a>
                  ) is committed to protecting your privacy and delivering transparent, non-intrusive mathematical, financial, health, and unit conversion tools. This Privacy Policy explains our practices regarding information collection, usage, and security when you use our website, tools, and educational guides.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  1. Information We Collect
                </h2>
                <p>
                  We believe in minimal data collection. We only collect the minimal technical and voluntary information necessary to deliver accurate calculation services and respond to user communications:
                </p>

                <div className="space-y-3 pl-2">
                  <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#F97316]" />
                      A. Voluntary Information Provided by You
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569]">
                      When you submit a message through our Contact Form or write to us directly at{' '}
                      <a href="mailto:contact@calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        contact@calculio.site
                      </a>
                      , you may provide your name, email address, topic, and message content. This information is used exclusively to respond to your specific question, feedback, bug report, or calculator suggestion.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#F97316]" />
                      B. Basic Technical and Log Information
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569]">
                      Like standard web services, our hosting infrastructure may automatically record basic technical data during your visit. This may include your IP address, browser type and version, device type, operating system, referring URL, time of visit, and pages viewed. This data is used solely for website security, diagnostic troubleshooting, traffic integrity, and preventing abuse.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                      <Cookie className="w-4 h-4 text-[#F97316]" />
                      C. Cookies and Local Storage
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569]">
                      We utilize standard browser technologies, specifically HTML5 LocalStorage, to store your personal interface preferences locally on your device (such as your chosen display currency and language selection). This information never leaves your browser and is never sent to our servers.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Calculator Inputs and Privacy */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  2. Calculator Inputs and Client-Side Computation
                </h2>
                <p>
                  All numerical calculations across our mortgage, loan, interest, fitness, scientific, algebra, and conversion tools are processed <strong>locally in your web browser using client-side JavaScript</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] text-xs sm:text-sm text-[#0F172A] space-y-2">
                  <div className="font-bold flex items-center gap-2 text-[#F97316]">
                    <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                    <span>No Personally Identifiable Information in Calculator Fields</span>
                  </div>
                  <p className="text-[#475569]">
                    Our calculators never ask for or require personally identifiable information (such as your full legal name, government ID numbers, bank account numbers, passwords, or credit card details). Users should avoid entering any sensitive personal information into calculator input fields. Numeric values entered are processed in memory and are not logged or stored on our servers.
                  </p>
                </div>
              </section>

              {/* 3. How We Use Information */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  3. How We Use Your Information
                </h2>
                <p>
                  Any information collected is used strictly for legitimate operational purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569]">
                  <li>To operate, maintain, and provide free access to all calculators, unit converters, and educational content.</li>
                  <li>To maintain platform security, diagnose server issues, and prevent automated attacks or abuse.</li>
                  <li>To analyze aggregate, non-identifying traffic patterns to enhance website speed and usability.</li>
                  <li>To respond directly to user inquiries, feedback, and calculator feature requests.</li>
                  <li>To continuously refine our mathematical algorithms, explanations, and guides.</li>
                </ul>
              </section>

              {/* 4. Cookies and Advertising */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  4. Cookies and Advertising Practices
                </h2>
                <p>
                  Cookies are small text files stored on your device by your browser. We use local storage to save your selected currency (e.g., USD, EUR, GBP) and preferred language (English, French, Arabic).
                </p>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <h3 className="text-sm font-bold text-[#0F172A]">Third-Party Advertising & Google AdSense Disclosure</h3>
                  <p className="text-xs sm:text-sm text-[#475569]">
                    If advertising services such as Google AdSense are used on Calculio in the future, third-party advertising providers may use cookies or similar technologies to provide and measure advertisements.
                  </p>
                  <p className="text-xs sm:text-sm text-[#475569]">
                    Third-party vendors, including Google, may use cookies to serve ads based on prior visits to Calculio or other websites across the Internet. You can manage or opt out of personalized advertising by visiting{' '}
                    <a 
                      href="https://www.google.com/settings/ads" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#F97316] underline font-semibold inline-flex items-center gap-1 hover:text-[#EA580C]"
                    >
                      Google Ads Settings <ExternalLink className="w-3 h-3 inline" />
                    </a>{' '}
                    or by visiting{' '}
                    <a 
                      href="https://www.aboutads.info/choices/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#F97316] underline font-semibold inline-flex items-center gap-1 hover:text-[#EA580C]"
                    >
                      aboutads.info <ExternalLink className="w-3 h-3 inline" />
                    </a>.
                  </p>
                </div>
              </section>

              {/* 5. Third-Party Services and APIs */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  5. Third-Party Services and External Links
                </h2>
                <p>
                  To provide accurate tools, Calculio may interact with trusted third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569]">
                  <li>
                    <strong className="text-[#0F172A]">External Conversion APIs:</strong> Certain tools, such as our Currency Converter, may query live or daily benchmark exchange rates from reputable financial APIs. These queries contain only currency pair identifiers and do not transmit any user information.
                  </li>
                  <li>
                    <strong className="text-[#0F172A]">External Links:</strong> Our educational blog posts and guides may contain links to external reference materials, government bureaus, or academic institutions. We are not responsible for the privacy practices, content, or policies of third-party sites.
                  </li>
                </ul>
              </section>

              {/* 6. Data Retention and Security */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  6. Data Retention and Security
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#F97316]" />
                      Data Retention
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569]">
                      We do not retain calculator inputs on any server. Contact inquiries sent to us are retained only for the duration needed to resolve the inquiry and maintain customer support records, after which they are securely deleted.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#F97316]" />
                      Security Measures
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569]">
                      We implement industry-standard HTTPS encryption (SSL/TLS) across Calculio to protect data in transit. By evaluating calculations client-side, we significantly reduce data transmission risks.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Children's Privacy */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  Calculio does not knowingly collect personal information from children under the age of 13 (or under 16 in certain jurisdictions). Our calculation tools and educational content are designed for general public use. If you believe a child has provided us with personal information via email or a contact form, please notify us at{' '}
                  <a href="mailto:contact@calculio.site" className="text-[#F97316] font-semibold hover:underline">
                    contact@calculio.site
                  </a>
                  , and we will promptly delete such information.
                </p>
              </section>

              {/* 8. Your Privacy Rights */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  8. Your Privacy Rights (GDPR, CCPA & Global Laws)
                </h2>
                <p>
                  Depending on your geographic location (including the European Economic Area, United Kingdom, California, and other jurisdictions), you may have specific statutory rights regarding your personal data, including the right to access, rectify, export, or request deletion of any personal data you have provided to us.
                </p>
                <p className="text-[#475569]">
                  Because Calculio does not require user registration or store user accounts, our data footprint is minimal by design. To exercise any data rights or submit an inquiry, please contact us at{' '}
                  <a href="mailto:contact@calculio.site" className="text-[#F97316] font-semibold hover:underline">
                    contact@calculio.site
                  </a>.
                </p>
              </section>

              {/* 9. Changes to This Privacy Policy */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  9. Changes to This Privacy Policy
                </h2>
                <p>
                  We may periodically update this Privacy Policy to reflect improvements to our calculation engines, new features, or changes in legal regulations. When changes are made, the &quot;Last Updated&quot; date at the top of this document will be updated. We encourage you to review this policy periodically.
                </p>
              </section>

              {/* 10. Contact Information */}
              <section className="space-y-4 pt-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  10. Contact Us
                </h2>
                <div className="p-5 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] space-y-3">
                  <p className="text-xs sm:text-sm text-[#0F172A]">
                    If you have questions, concerns, or feedback regarding this Privacy Policy, our data practices, or our calculation engines, please contact our team:
                  </p>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <strong className="text-[#0F172A] min-w-[60px]">Website:</strong>
                      <a href="https://calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        https://calculio.site
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-[#0F172A] min-w-[60px]">Email:</strong>
                      <a href="mailto:contact@calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        contact@calculio.site
                      </a>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={onGoToContact} 
                      className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Contact Form</span>
                    </button>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* TAB 2: TERMS OF USE */}
          {activeTab === 'terms' && (
            <div className="space-y-8 text-[#475569] text-sm sm:text-base leading-relaxed">
              
              {/* Overview Callout */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center gap-2.5 text-[#0F172A] font-bold">
                  <Scale className="w-5 h-5 text-[#F97316]" />
                  <span>Terms of Use Agreement</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Welcome to Calculio (accessible at{' '}
                  <a href="https://calculio.site" className="text-[#F97316] font-semibold hover:underline">
                    https://calculio.site
                  </a>
                  ). These Terms of Use (&quot;Terms&quot;) govern your access to and use of our online calculators, conversion tools, educational articles, and web services. By accessing or using Calculio, you agree to comply with and be bound by these Terms.
                </p>
              </div>

              {/* 1. Introduction & Acceptance */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  1. Introduction and Acceptance of Terms
                </h2>
                <p>
                  These Terms of Use constitute a binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and Calculio (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By browsing, viewing, using our calculators, converting units, reading our educational guides, or submitting messages through our contact channels, you confirm that you have read, understood, and agreed to these Terms. If you do not agree to these Terms, please do not use our website or tools.
                </p>
              </section>

              {/* 2. Use of the Website */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  2. Use of the Website & Permitted Scope
                </h2>
                <p>
                  Calculio provides free, client-side digital calculation tools, unit converters, and educational content for personal, academic, educational, and informational use.
                </p>
                <p>
                  You agree to use Calculio only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the website. You must not misuse the website, attempt to disrupt its technical operations, abuse its calculation tools, or interfere with its security mechanisms.
                </p>
              </section>

              {/* 3. Calculators and Results */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  3. Calculators, Tools, and Calculation Results
                </h2>
                <p>
                  Calculio provides interactive calculators across diverse disciplines—including personal finance, real estate, health and fitness, mathematics, algebra, statistics, science, and unit conversions—for <strong>general informational and educational purposes only</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] text-xs sm:text-sm text-[#0F172A] space-y-2">
                  <div className="font-bold flex items-center gap-2 text-[#F97316]">
                    <AlertTriangle className="w-4 h-4 text-[#F97316] shrink-0" />
                    <span>User Verification Requirement</span>
                  </div>
                  <p className="text-[#475569]">
                    All mathematical computations and estimates are based on standard mathematical formulas and user-supplied inputs. Because actual real-world conditions vary (including tax regulations, lender underwriting rules, municipal laws, and individual health factors), <strong>users are responsible for independently reviewing and verifying results before relying on them</strong>.
                  </p>
                  <p className="text-[#475569]">
                    For financial, medical, legal, tax, engineering, or other high-stakes matters, you should always consult an appropriately licensed and qualified professional before making contractual, monetary, or medical decisions.
                  </p>
                </div>
              </section>

              {/* 4. No Professional Advice */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  4. No Professional Advice
                </h2>
                <p>
                  The content, calculations, estimates, amortization schedules, and educational articles provided on Calculio do not constitute professional financial, medical, legal, tax, accounting, engineering, or healthcare advice.
                </p>
                <p className="text-[#475569]">
                  No fiduciary, advisory, client, doctor-patient, or attorney-client relationship is created through your access to or use of Calculio. You should not treat any calculation or written explanation as a substitute for individualized counsel from a certified professional.
                </p>
              </section>

              {/* 5. Accuracy and Availability */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  5. Accuracy, Completeness, and Availability
                </h2>
                <p>
                  Calculio aims to deliver reliable, high-precision tools and up-to-date educational articles. However, we cannot guarantee that:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                  <li>Every calculator result will always be 100% accurate, complete, or error-free.</li>
                  <li>The website, tools, or servers will be continuously available without interruption, latency, or technical downtime.</li>
                  <li>Defects or formula oversights will be corrected immediately, although we make good-faith efforts to resolve reported issues promptly.</li>
                  <li>Third-party data feeds, exchange rates, or external APIs will always be accurate, available, or up-to-date.</li>
                </ul>
              </section>

              {/* 6. Currency and Third-Party Data */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  6. Currency and Third-Party Data
                </h2>
                <p>
                  Certain utilities, such as our Currency Converter, may utilize currency exchange rates and financial benchmark data obtained from third-party public feeds or external APIs.
                </p>
                <p className="text-[#475569]">
                  Such third-party information is subject to change at any time and may reflect delayed, indicative, or daily benchmark rates rather than real-time trading values. Calculio does not guarantee real-time market data or warranty the continuous accuracy of third-party exchange rates.
                </p>
              </section>

              {/* 7. Intellectual Property */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  7. Intellectual Property
                </h2>
                <p>
                  The original content, branding, name (&quot;Calculio&quot;), logo, user interface design, visual styling, source code, formulas compilation, and educational guides on this website are protected by applicable copyright, trademark, and intellectual property laws.
                </p>
                <p className="text-[#475569]">
                  Universal mathematical theorems, physical constants, and public domain algebraic equations remain in the public domain. However, you may not copy, reproduce, modify, distribute, republish, mirror, or commercially exploit Calculio&apos;s proprietary code, software design, or editorial content without prior written authorization from us, except as permitted by applicable fair use laws.
                </p>
              </section>

              {/* 8. User-Submitted Content */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  8. User-Submitted Content and Feedback
                </h2>
                <p>
                  When you submit messages, feature requests, bug reports, or calculator suggestions through our Contact Form or via email, you warrant that you have the right to provide such information and that it does not infringe third-party rights.
                </p>
                <p className="text-[#475569]">
                  Any feedback, suggestions, or ideas you voluntarily provide regarding Calculio may be used by us to enhance, optimize, or expand our tools and services without any obligation, restriction, or financial compensation to you.
                </p>
              </section>

              {/* 9. Third-Party Links and Services */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  9. Third-Party Links and External Services
                </h2>
                <p>
                  Calculio may contain links to external third-party websites, governmental agencies, educational databases, or research papers. These links are provided solely for reference and informational convenience.
                </p>
                <p className="text-[#475569]">
                  Calculio does not endorse and is not responsible for the content, privacy policies, terms, practices, or availability of any third-party websites or services. Accessing external links is done entirely at your own risk.
                </p>
              </section>

              {/* 10. Privacy */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  10. Privacy Policy
                </h2>
                <p>
                  Your privacy is important to us. Our data handling practices are described in detail in our{' '}
                  <button 
                    onClick={() => onChangeTab('privacy')} 
                    className="text-[#F97316] font-bold underline hover:text-[#EA580C] cursor-pointer inline-flex items-center gap-1"
                  >
                    Privacy Policy
                  </button>
                  . By using Calculio, you acknowledge and agree that your use of the website is also governed by our Privacy Policy.
                </p>
              </section>

              {/* 11. Cookies */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  11. Cookies and Browser Storage
                </h2>
                <p>
                  Calculio uses browser local storage to retain your user interface preferences (such as your chosen currency and display language). If advertising or analytics services are utilized, third parties may place or read cookies on your browser as outlined in our{' '}
                  <button 
                    onClick={() => onChangeTab('privacy')} 
                    className="text-[#F97316] font-semibold underline hover:text-[#EA580C] cursor-pointer"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </section>

              {/* 12. Prohibited Activities */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  12. Prohibited Activities
                </h2>
                <p>
                  When using Calculio, you agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                  <li>Attempting to gain unauthorized access to any portion of the website, server infrastructure, or private systems.</li>
                  <li>Introducing viruses, trojans, worms, malicious scripts, or harmful technological payloads.</li>
                  <li>Using automated scraping, bots, spiders, or crawlers in a manner that degrades website performance, bypasses rate limits, or floods the infrastructure.</li>
                  <li>Circumventing, disabling, or interfering with security features, headers, or authentication controls.</li>
                  <li>Using the calculators or content for fraudulent, deceptive, or unlawful purposes.</li>
                  <li>Interfering with, disrupting, or imposing an unreasonable burden on the website or network connections.</li>
                </ul>
              </section>

              {/* 13. Disclaimer of Warranties */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  13. Disclaimer of Warranties (&quot;As Is&quot; &amp; &quot;As Available&quot;)
                </h2>
                <p>
                  To the fullest extent permitted by applicable law, Calculio, its tools, calculators, content, and services are provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis, without warranties of any kind, whether express, implied, statutory, or otherwise.
                </p>
                <p className="text-[#475569]">
                  We expressly disclaim all implied warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, and quiet enjoyment.
                </p>
              </section>

              {/* 14. Limitation of Liability */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  14. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, Calculio and its operators, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages—including but not limited to financial loss, lost profits, tax penalties, investment losses, data loss, business interruption, or personal health outcomes—arising out of or in connection with your use of, or inability to use, this website or reliance upon any calculation result.
                </p>
                <p className="text-[#475569]">
                  Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities; in such jurisdictions, our liability shall be limited to the greatest extent permitted by applicable law.
                </p>
              </section>

              {/* 15. Changes to the Terms */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  15. Changes to These Terms of Use
                </h2>
                <p>
                  Calculio reserves the right to revise, update, or amend these Terms of Use at any time. When modifications are made, the &quot;Last Updated&quot; date at the top of this page will be updated accordingly.
                </p>
                <p className="text-[#475569]">
                  Your continued use of Calculio after any changes are published constitutes your acceptance of the revised Terms. We encourage users to periodically review this page to stay informed.
                </p>
              </section>

              {/* 16. Termination or Suspension */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  16. Termination and Suspension of Access
                </h2>
                <p>
                  We reserve the right to restrict, suspend, or terminate access to Calculio or any specific calculator or tool, at our sole discretion, without prior notice, in cases of security breaches, automated abuse, violation of these Terms, or technical maintenance.
                </p>
              </section>

              {/* 17. Contact Information */}
              <section className="space-y-4 pt-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  17. Contact Us
                </h2>
                <div className="p-5 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] space-y-3">
                  <p className="text-xs sm:text-sm text-[#0F172A]">
                    If you have questions, inquiries, or feedback regarding these Terms of Use or our tools, please reach out to our team:
                  </p>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <strong className="text-[#0F172A] min-w-[60px]">Website:</strong>
                      <a href="https://calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        https://calculio.site
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-[#0F172A] min-w-[60px]">Email:</strong>
                      <a href="mailto:contact@calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        contact@calculio.site
                      </a>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={onGoToContact} 
                      className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Contact Form</span>
                    </button>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* TAB 3: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-8 text-[#475569] text-sm sm:text-base leading-relaxed">
              
              {/* Overview Callout */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center gap-2.5 text-[#0F172A] font-bold">
                  <AlertTriangle className="w-5 h-5 text-[#F97316]" />
                  <span>General Disclaimer & Educational Disclosure</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Welcome to Calculio (accessible at{' '}
                  <a href="https://calculio.site" className="text-[#F97316] font-semibold hover:underline">
                    https://calculio.site
                  </a>
                  ). This Disclaimer outlines the scope, limitations, and terms governing your use of our online calculators, conversion tools, informational articles, and website resources. By accessing Calculio, you understand and agree to the disclaimers set forth on this page.
                </p>
              </div>

              {/* 1. General Information */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  1. General Information and Purpose
                </h2>
                <p>
                  Calculio provides free online calculators, unit conversion tools, mathematical estimation utilities, and educational guides for <strong>general informational and educational purposes only</strong>.
                </p>
                <p className="text-[#475569]">
                  Our website is designed to help users perform calculations, explore mathematical models, and understand various quantitative concepts. However, the information and calculation tools available on Calculio should not automatically be treated as professional advice or relied upon as a sole basis for critical decisions.
                </p>
              </section>

              {/* 2. Calculator Results & User Verification */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  2. Calculator Results and Independent Verification
                </h2>
                <p>
                  Calculio strives to implement established mathematical algorithms, standard algebraic formulas, and recognized formulas. However, we do not make absolute claims that results are &quot;100% accurate,&quot; &quot;error-free,&quot; or completely suited to every individual circumstance.
                </p>
                <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] text-xs sm:text-sm text-[#0F172A] space-y-2">
                  <div className="font-bold flex items-center gap-2 text-[#F97316]">
                    <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                    <span>Independent Verification Recommended</span>
                  </div>
                  <p className="text-[#475569]">
                    Users are responsible for entering accurate input values and interpreting output results appropriately. Because real-world conditions vary (such as specific underwriting criteria, localized fees, rounding differences, or clinical variations), <strong>users should independently verify calculator results before making important, contractual, or high-stakes decisions</strong>.
                  </p>
                </div>
              </section>

              {/* 3. Financial Calculations */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  3. Financial & Investment Calculations
                </h2>
                <p>
                  Financial tools on Calculio—including Mortgage, Auto Loan, Compound Interest, Investment ROI, 401(k) Retirement, Rental Property, and Debt Payoff calculators—are provided exclusively for illustrative, informational, and educational purposes.
                </p>
                <p className="text-[#475569]">
                  They do not constitute financial, investment, banking, accounting, or professional financial planning advice. Our estimates rely on standard mathematical compounding formulas and user-supplied parameters and do not account for lender fees, private mortgage insurance fluctuations, credit-tier adjustments, or market volatility. Users should consult a qualified financial advisor, certified financial planner (CFP), or certified public accountant (CPA) before making significant financial commitments.
                </p>
              </section>

              {/* 4. Health and Medical Calculations */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  4. Health and Medical Calculations
                </h2>
                <p>
                  Health and fitness calculators—such as Body Mass Index (BMI), Basal Metabolic Rate (BMR), Body Fat Percentage, Total Daily Energy Expenditure (TDEE), Calorie Deficit, Ovulation/Fertility, and Pregnancy Due Date estimators—are provided solely for general informational and fitness tracking purposes.
                </p>
                <p className="text-[#475569]">
                  These tools are <strong>not a substitute for professional medical advice, clinical diagnosis, or medical treatment</strong>. Calculio does not diagnose, treat, cure, or prevent any disease or health condition. Always consult a licensed physician, registered dietitian, or qualified healthcare professional regarding any medical questions, dietary adjustments, or healthcare decisions.
                </p>
              </section>

              {/* 5. Legal and Tax Information */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  5. Legal and Tax Information
                </h2>
                <p>
                  Any tax estimators, salary deductions, legal day counters, or regulatory summaries provided on Calculio are strictly for general informational purposes and do not constitute formal legal or tax advice.
                </p>
                <p className="text-[#475569]">
                  Tax codes, statutory deductions, municipal ordinances, and filing rules change frequently and differ significantly across regions and jurisdictions. You should consult an appropriately qualified tax professional, CPA, or licensed attorney for guidance specific to your personal or business situation.
                </p>
              </section>

              {/* 6. Currency and Conversion Data */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  6. Currency Rates and Conversion Data
                </h2>
                <p>
                  Currency exchange rates, unit conversion benchmarks, and financial reference rates used across our tools may originate from third-party public data providers, public feeds, or external APIs and are subject to continuous market fluctuations.
                </p>
                <p className="text-[#475569]">
                  Calculio does not claim that currency or market data represents real-time, tick-by-tick trading values. Data may be delayed or indicative of daily reference rates. Calculio is not responsible for inaccuracies or delays originating from third-party data sources.
                </p>
              </section>

              {/* 7. Third-Party Websites and Services */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  7. Third-Party Websites, APIs, and External Links
                </h2>
                <p>
                  Calculio may contain hyperlinks to external third-party websites, academic research, regulatory bodies, or external tools.
                </p>
                <p className="text-[#475569]">
                  We do not control, oversee, or endorse external websites and are not responsible for their content, availability, accuracy, or privacy policies. Accessing any third-party links or services is done entirely at your own discretion, and we encourage you to review their specific terms and policies.
                </p>
              </section>

              {/* 8. No Guarantee */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  8. No Guarantee of Continuous Operation or Error-Free Service
                </h2>
                <p>
                  While Calculio makes reasonable and diligent efforts to maintain useful, high-precision tools and reliable web resources, we cannot guarantee that:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                  <li>Every calculation or tool result will always be error-free or complete.</li>
                  <li>All website content, formulas, and guides will always be entirely current or uninterrupted.</li>
                  <li>Third-party data, APIs, or currency feeds will operate without latency or inaccuracies.</li>
                  <li>The website will be available at all times without technical downtime, maintenance outages, or disruptions.</li>
                </ul>
              </section>

              {/* 9. User Responsibility */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  9. User Responsibility
                </h2>
                <p>
                  By accessing and utilizing Calculio, you acknowledge and agree that you are solely responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                  <li>The accuracy, completeness, and validity of the numbers and parameters you input into our calculators.</li>
                  <li>Reviewing, verifying, and evaluating calculation outputs whenever accuracy is consequential.</li>
                  <li>Deciding whether an estimated figure or mathematical model is applicable to your specific individual situation.</li>
                  <li>Seeking qualified professional advice when needed for monetary, medical, tax, or legal matters.</li>
                </ul>
              </section>

              {/* 10. Limitation of Responsibility */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  10. Limitation of Responsibility
                </h2>
                <p>
                  To the fullest extent permitted by applicable law, Calculio and its operators shall not be responsible or liable for any direct, indirect, incidental, consequential, special, or exemplary losses, damages, costs, or expenses (including, without limitation, financial loss, lost profits, investment underperformance, tax penalties, or medical complications) resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                  <li>Your use of, or inability to access, the website or any specific calculator.</li>
                  <li>Your reliance on any calculation, estimate, formula, or educational guide provided on the website.</li>
                  <li>Inaccuracies, errors, omissions, or delays in third-party data or exchange rates.</li>
                </ul>
                <p className="text-[#475569]">
                  Nothing in this Disclaimer is intended to exclude or limit any rights or remedies that cannot legally be excluded under applicable consumer protection legislation.
                </p>
              </section>

              {/* 11. Advertising */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  11. Advertising Disclosures
                </h2>
                <p>
                  Calculio is provided as a free resource to visitors. If advertising networks (such as Google AdSense or similar third-party providers) are introduced on the website in the future, advertisements may be displayed alongside content.
                </p>
                <p className="text-[#475569]">
                  Third-party ad networks may use cookies or device identifiers to serve and measure advertisements in accordance with their respective policies. Full details on privacy controls and advertising preferences are available in our{' '}
                  <button 
                    onClick={() => onChangeTab('privacy')} 
                    className="text-[#F97316] font-semibold underline hover:text-[#EA580C] cursor-pointer"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </section>

              {/* 12. Changes to This Disclaimer */}
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  12. Changes to This Disclaimer
                </h2>
                <p>
                  Calculio may update or revise this Disclaimer from time to time to reflect modifications in our tools, updates to mathematical models, or changes in legal guidelines.
                </p>
                <p className="text-[#475569]">
                  Whenever material modifications are made, the &quot;Last Updated&quot; date at the top of this document will be updated. We invite users to review this page periodically to remain informed about our policies and terms.
                </p>
              </section>

              {/* 13. Contact Information */}
              <section className="space-y-4 pt-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                  13. Contact Information
                </h2>
                <div className="p-5 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] space-y-3">
                  <p className="text-xs sm:text-sm text-[#0F172A]">
                    If you have any questions, feedback, or concerns regarding this Disclaimer or the operation of any calculator on Calculio, please contact us:
                  </p>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <strong className="text-[#0F172A] min-w-[60px]">Website:</strong>
                      <a href="https://calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        https://calculio.site
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-[#0F172A] min-w-[60px]">Email:</strong>
                      <a href="mailto:contact@calculio.site" className="text-[#F97316] font-semibold hover:underline">
                        contact@calculio.site
                      </a>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={onGoToContact} 
                      className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Contact Form</span>
                    </button>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F97316] hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <button
              onClick={onGoToAllCalculators}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Explore All Calculators</span>
            </button>
          </div>
        </article>

        <AdSlot type="footer-banner" />
      </div>
    </main>
  );
};

