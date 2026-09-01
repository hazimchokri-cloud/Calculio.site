import React, { useState, Suspense } from 'react';
import { CalculatorMeta } from '../../types';
import { 
  Share2, 
  Printer, 
  Check,
  ShieldAlert,
  Info,
  ArrowRight
} from 'lucide-react';
import { AdSlot } from '../shared/AdSlot';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { CalculatorExplanationSection } from '../shared/CalculatorExplanationSection';
import { RelatedCalculators } from '../shared/RelatedCalculators';
import { AffiliateOffersSection } from '../shared/AffiliateOffersSection';
import { ShareModal } from '../shared/ShareModal';
import { PrintReportHeader } from '../shared/PrintReportHeader';
import { PrintReportFooter } from '../shared/PrintReportFooter';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import { CalculatorLoadingSkeleton } from '../shared/CalculatorLoadingSkeleton';
import { useLanguage } from '../../i18n/LanguageContext';

// Lazy-loaded Calculator components for optimal performance and small bundle chunks
const MortgageCalculator = React.lazy(() => import('../calculators/MortgageCalculator').then(m => ({ default: m.MortgageCalculator })));
const LoanCalculator = React.lazy(() => import('../calculators/LoanCalculator').then(m => ({ default: m.LoanCalculator })));
const AutoLoanCalculator = React.lazy(() => import('../calculators/AutoLoanCalculator').then(m => ({ default: m.AutoLoanCalculator })));
const PersonalLoanCalculator = React.lazy(() => import('../calculators/PersonalLoanCalculator').then(m => ({ default: m.PersonalLoanCalculator })));
const InterestCalculator = React.lazy(() => import('../calculators/InterestCalculator').then(m => ({ default: m.InterestCalculator })));
const CompoundInterestCalculator = React.lazy(() => import('../calculators/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator })));
const InvestmentCalculator = React.lazy(() => import('../calculators/InvestmentCalculator').then(m => ({ default: m.InvestmentCalculator })));
const SavingsCalculator = React.lazy(() => import('../calculators/SavingsCalculator').then(m => ({ default: m.SavingsCalculator })));
const RetirementCalculator = React.lazy(() => import('../calculators/RetirementCalculator').then(m => ({ default: m.RetirementCalculator })));
const InflationCalculator = React.lazy(() => import('../calculators/InflationCalculator').then(m => ({ default: m.InflationCalculator })));
const CreditCardCalculator = React.lazy(() => import('../calculators/CreditCardCalculator').then(m => ({ default: m.CreditCardCalculator })));
const DebtPayoffCalculator = React.lazy(() => import('../calculators/DebtPayoffCalculator').then(m => ({ default: m.DebtPayoffCalculator })));
const AprCalculator = React.lazy(() => import('../calculators/AprCalculator').then(m => ({ default: m.AprCalculator })));
const AmortizationCalculator = React.lazy(() => import('../calculators/AmortizationCalculator').then(m => ({ default: m.AmortizationCalculator })));
const RoiCalculator = React.lazy(() => import('../calculators/RoiCalculator').then(m => ({ default: m.RoiCalculator })));
const SalaryCalculator = React.lazy(() => import('../calculators/SalaryCalculator').then(m => ({ default: m.SalaryCalculator })));

// Health & Fitness
const BmiCalculator = React.lazy(() => import('../calculators/BmiCalculator').then(m => ({ default: m.BmiCalculator })));
const BodyFatCalculator = React.lazy(() => import('../calculators/BodyFatCalculator').then(m => ({ default: m.BodyFatCalculator })));
const CalorieTdeeCalculator = React.lazy(() => import('../calculators/CalorieTdeeCalculator').then(m => ({ default: m.CalorieTdeeCalculator })));
const BmrCalculator = React.lazy(() => import('../calculators/BmrCalculator').then(m => ({ default: m.BmrCalculator })));
const IdealWeightCalculator = React.lazy(() => import('../calculators/IdealWeightCalculator').then(m => ({ default: m.IdealWeightCalculator })));
const PregnancyCalculator = React.lazy(() => import('../calculators/PregnancyCalculator').then(m => ({ default: m.PregnancyCalculator })));
const DueDateCalculator = React.lazy(() => import('../calculators/DueDateCalculator').then(m => ({ default: m.DueDateCalculator })));
const OvulationCalculator = React.lazy(() => import('../calculators/OvulationCalculator').then(m => ({ default: m.OvulationCalculator })));
const WaterIntakeCalculator = React.lazy(() => import('../calculators/WaterIntakeCalculator').then(m => ({ default: m.WaterIntakeCalculator })));
const HeartRateCalculator = React.lazy(() => import('../calculators/HeartRateCalculator').then(m => ({ default: m.HeartRateCalculator })));

// Math, Unit, Time, Lifestyle
const ScientificCalculator = React.lazy(() => import('../calculators/ScientificCalculator').then(m => ({ default: m.ScientificCalculator })));
const PercentageCalculator = React.lazy(() => import('../calculators/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const FractionCalculator = React.lazy(() => import('../calculators/FractionCalculator').then(m => ({ default: m.FractionCalculator })));
const DecimalCalculator = React.lazy(() => import('../calculators/DecimalCalculator').then(m => ({ default: m.DecimalCalculator })));
const RatioCalculator = React.lazy(() => import('../calculators/RatioCalculator').then(m => ({ default: m.RatioCalculator })));
const AverageCalculator = React.lazy(() => import('../calculators/AverageCalculator').then(m => ({ default: m.AverageCalculator })));
const ProbabilityCalculator = React.lazy(() => import('../calculators/ProbabilityCalculator').then(m => ({ default: m.ProbabilityCalculator })));
const StatisticsCalculator = React.lazy(() => import('../calculators/StatisticsCalculator').then(m => ({ default: m.StatisticsCalculator })));
const ExponentCalculator = React.lazy(() => import('../calculators/ExponentCalculator').then(m => ({ default: m.ExponentCalculator })));
const SquareRootCalculator = React.lazy(() => import('../calculators/SquareRootCalculator').then(m => ({ default: m.SquareRootCalculator })));
const GeometryCalculator = React.lazy(() => import('../calculators/GeometryCalculator').then(m => ({ default: m.GeometryCalculator })));
const UnitConverter = React.lazy(() => import('../calculators/UnitConverter').then(m => ({ default: m.UnitConverter })));
const DateCalculator = React.lazy(() => import('../calculators/DateCalculator').then(m => ({ default: m.DateCalculator })));
const GpaCalculator = React.lazy(() => import('../calculators/GpaCalculator').then(m => ({ default: m.GpaCalculator })));
const GasMileageCalculator = React.lazy(() => import('../calculators/GasMileageCalculator').then(m => ({ default: m.GasMileageCalculator })));

// Expansion Calculators
const ConcreteCalculator = React.lazy(() => import('../calculators/ConcreteCalculator').then(m => ({ default: m.ConcreteCalculator })));
const RentalRoiCalculator = React.lazy(() => import('../calculators/RentalRoiCalculator').then(m => ({ default: m.RentalRoiCalculator })));
const BreakEvenCalculator = React.lazy(() => import('../calculators/BreakEvenCalculator').then(m => ({ default: m.BreakEvenCalculator })));
const FinalGradeCalculator = React.lazy(() => import('../calculators/FinalGradeCalculator').then(m => ({ default: m.FinalGradeCalculator })));
const OhmsLawCalculator = React.lazy(() => import('../calculators/OhmsLawCalculator').then(m => ({ default: m.OhmsLawCalculator })));
const IncomeTaxCalculator = React.lazy(() => import('../calculators/IncomeTaxCalculator').then(m => ({ default: m.IncomeTaxCalculator })));
const CryptoProfitCalculator = React.lazy(() => import('../calculators/CryptoProfitCalculator').then(m => ({ default: m.CryptoProfitCalculator })));
const GenericConfigurableCalculator = React.lazy(() => import('../calculators/GenericConfigurableCalculator').then(m => ({ default: m.GenericConfigurableCalculator })));

const LoanComparisonCalculator = React.lazy(() => import('../calculators/FinancialExpansionCalculators').then(m => ({ default: m.LoanComparisonCalculator })));
const CarLeaseCalculator = React.lazy(() => import('../calculators/FinancialExpansionCalculators').then(m => ({ default: m.CarLeaseCalculator })));
const DownPaymentCalculator = React.lazy(() => import('../calculators/FinancialExpansionCalculators').then(m => ({ default: m.DownPaymentCalculator })));
const EmergencyFundCalculator = React.lazy(() => import('../calculators/FinancialExpansionCalculators').then(m => ({ default: m.EmergencyFundCalculator })));
const CdCalculator = React.lazy(() => import('../calculators/FinancialExpansionCalculators').then(m => ({ default: m.CdCalculator })));
const FourZeroOneKMatchCalculator = React.lazy(() => import('../calculators/FinancialExpansionCalculators').then(m => ({ default: m.FourZeroOneKMatchCalculator })));

const PaceCalculator = React.lazy(() => import('../calculators/HealthExpansionCalculators').then(m => ({ default: m.PaceCalculator })));
const OneRepMaxCalculator = React.lazy(() => import('../calculators/HealthExpansionCalculators').then(m => ({ default: m.OneRepMaxCalculator })));
const WaistToHipCalculator = React.lazy(() => import('../calculators/HealthExpansionCalculators').then(m => ({ default: m.WaistToHipCalculator })));
const SleepCycleCalculator = React.lazy(() => import('../calculators/HealthExpansionCalculators').then(m => ({ default: m.SleepCycleCalculator })));
const AlcoholCalorieCalculator = React.lazy(() => import('../calculators/HealthExpansionCalculators').then(m => ({ default: m.AlcoholCalorieCalculator })));
const LeanBodyMassCalculator = React.lazy(() => import('../calculators/HealthExpansionCalculators').then(m => ({ default: m.LeanBodyMassCalculator })));

const QuadraticSolverCalculator = React.lazy(() => import('../calculators/MathExpansionCalculators').then(m => ({ default: m.QuadraticSolverCalculator })));
const PythagoreanCalculator = React.lazy(() => import('../calculators/MathExpansionCalculators').then(m => ({ default: m.PythagoreanCalculator })));
const LcmGcdCalculator = React.lazy(() => import('../calculators/MathExpansionCalculators').then(m => ({ default: m.LcmGcdCalculator })));
const LogarithmCalculator = React.lazy(() => import('../calculators/MathExpansionCalculators').then(m => ({ default: m.LogarithmCalculator })));
const FactorialPermutationsCalculator = React.lazy(() => import('../calculators/MathExpansionCalculators').then(m => ({ default: m.FactorialPermutationsCalculator })));
const MatrixCalculator = React.lazy(() => import('../calculators/MathExpansionCalculators').then(m => ({ default: m.MatrixCalculator })));

const RentVsBuyCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.RentVsBuyCalculator })));
const RefinanceCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.RefinanceCalculator })));
const CashOnCashCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.CashOnCashCalculator })));
const GrmCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.GrmCalculator })));
const CapitalGainsCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.CapitalGainsCalculator })));
const TipCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.TipCalculator })));
const VatCalculator = React.lazy(() => import('../calculators/RealEstateTaxExpansionCalculators').then(m => ({ default: m.VatCalculator })));

const CacLtvCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.CacLtvCalculator })));
const MarkupMarginCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.MarkupMarginCalculator })));
const InventoryTurnoverCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.InventoryTurnoverCalculator })));
const EbitdaCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.EbitdaCalculator })));
const BurnRateCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.BurnRateCalculator })));
const PaintCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.PaintCalculator })));
const DrywallCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.DrywallCalculator })));
const MulchGravelCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.MulchGravelCalculator })));
const DeckLumberCalculator = React.lazy(() => import('../calculators/BusinessConstructionExpansionCalculators').then(m => ({ default: m.DeckLumberCalculator })));

const DensityCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.DensityCalculator })));
const EnergyCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.EnergyCalculator })));
const PressureCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.PressureCalculator })));
const SpeedOfSoundCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.SpeedOfSoundCalculator })));
const TimeCardCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.TimeCardCalculator })));
const ExactAgeCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.ExactAgeCalculator })));
const TimeZoneCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.TimeZoneCalculator })));
const NetWorthCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.NetWorthCalculator })));
const DogAgeCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.DogAgeCalculator })));
const CookingConverterCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.CookingConverterCalculator })));
const CryptoDcaCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.CryptoDcaCalculator })));
const StakingRewardsCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.StakingRewardsCalculator })));
const ImpermanentLossCalculator = React.lazy(() => import('../calculators/ScienceEverydayExpansionCalculators').then(m => ({ default: m.ImpermanentLossCalculator })));

interface CalculatorDetailProps {
  calculator: CalculatorMeta;
  currencySymbol: string;
  onSelectCalculator: (id: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onGoHome: () => void;
  onSaveCalculation: (summary: string, inputs: any, results: any) => void;
  onGoToDisclaimer?: () => void;
}

export const CalculatorDetailView: React.FC<CalculatorDetailProps> = ({
  calculator,
  currencySymbol,
  onSelectCalculator,
  onSelectCategory,
  onGoHome,
  onSaveCalculation,
  onGoToDisclaimer
}) => {
  const { t, getCalculator, getCategory } = useLanguage();
  const localizedCalc = getCalculator(calculator.id);
  const category = getCategory(calculator.category);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const handlePrint = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const renderCalculatorComponent = () => {
    switch (calculator.id) {
      // --- Financial ---
      case 'mortgage-calculator':
        return <MortgageCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'loan-calculator':
        return <LoanCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'auto-loan-calculator':
        return <AutoLoanCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'personal-loan-calculator':
        return <PersonalLoanCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'interest-calculator':
        return <InterestCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'investment-calculator':
        return <InvestmentCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'savings-calculator':
        return <SavingsCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'retirement-calculator':
        return <RetirementCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'inflation-calculator':
        return <InflationCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'credit-card-calculator':
        return <CreditCardCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'debt-payoff-calculator':
        return <DebtPayoffCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'apr-calculator':
        return <AprCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'amortization-calculator':
        return <AmortizationCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'roi-calculator':
        return <RoiCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
      case 'salary-calculator':
        return <SalaryCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;

      // --- Health & Fitness ---
      case 'bmi-calculator':
        return <BmiCalculator onSaveCalculation={onSaveCalculation} />;
      case 'body-fat-calculator':
        return <BodyFatCalculator onSaveCalculation={onSaveCalculation} />;
      case 'calorie-tdee-calculator':
      case 'macro-calculator':
        return <CalorieTdeeCalculator onSaveCalculation={onSaveCalculation} />;
      case 'bmr-calculator':
        return <BmrCalculator onSaveCalculation={onSaveCalculation} />;
      case 'ideal-weight-calculator':
        return <IdealWeightCalculator onSaveCalculation={onSaveCalculation} />;
      case 'pregnancy-calculator':
        return <PregnancyCalculator onSaveCalculation={onSaveCalculation} />;
      case 'due-date-calculator':
        return <DueDateCalculator onSaveCalculation={onSaveCalculation} />;
      case 'ovulation-calculator':
        return <OvulationCalculator onSaveCalculation={onSaveCalculation} />;
      case 'water-intake-calculator':
        return <WaterIntakeCalculator onSaveCalculation={onSaveCalculation} />;
      case 'heart-rate-calculator':
        return <HeartRateCalculator onSaveCalculation={onSaveCalculation} />;

      // --- Math ---
      case 'scientific-calculator':
      case 'random-number-generator':
        return <ScientificCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'fraction-calculator':
        return <FractionCalculator />;
      case 'decimal-calculator':
        return <DecimalCalculator onSaveCalculation={onSaveCalculation} />;
      case 'ratio-calculator':
        return <RatioCalculator onSaveCalculation={onSaveCalculation} />;
      case 'average-calculator':
        return <AverageCalculator onSaveCalculation={onSaveCalculation} />;
      case 'probability-calculator':
        return <ProbabilityCalculator onSaveCalculation={onSaveCalculation} />;
      case 'statistics-calculator':
      case 'standard-deviation-calculator':
        return <StatisticsCalculator />;
      case 'exponent-calculator':
        return <ExponentCalculator onSaveCalculation={onSaveCalculation} />;
      case 'square-root-calculator':
        return <SquareRootCalculator onSaveCalculation={onSaveCalculation} />;
      case 'geometry-calculator':
        return <GeometryCalculator onSaveCalculation={onSaveCalculation} />;

      // --- Conversion ---
      case 'unit-converter':
      case 'length-converter':
      case 'temperature-converter':
      case 'weight-converter':
        return <UnitConverter />;

      // --- Date & Time ---
      case 'date-calculator':
      case 'age-calculator':
      case 'time-duration-calculator':
        return <DateCalculator />;

      // --- Real Estate ---
      case 'rental-roi-calculator':
      case 'cap-rate-calculator':
        return <RentalRoiCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Tax ---
      case 'income-tax-calculator':
      case 'sales-tax-calculator':
        return <IncomeTaxCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Business ---
      case 'break-even-calculator':
      case 'profit-margin-calculator':
        return <BreakEvenCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Construction ---
      case 'concrete-calculator':
      case 'flooring-calculator':
        return <ConcreteCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Engineering ---
      case 'ohms-law-calculator':
      case 'beam-deflection-calculator':
        return <OhmsLawCalculator onSave={onSaveCalculation} />;

      // --- Education ---
      case 'final-grade-calculator':
      case 'college-gpa-calculator':
        return <FinalGradeCalculator onSave={onSaveCalculation} />;

      // --- Cryptocurrency ---
      case 'crypto-profit-calculator':
      case 'dca-calculator':
        return <CryptoProfitCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Lifestyle & Academic ---
      case 'gpa-calculator':
        return <GpaCalculator />;
      case 'gas-mileage-calculator':
        return <GasMileageCalculator currencySymbol={currencySymbol} />;

      // --- Financial Expansion ---
      case 'loan-comparison-calculator':
        return <LoanComparisonCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'car-lease-calculator':
        return <CarLeaseCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'down-payment-calculator':
        return <DownPaymentCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'emergency-fund-calculator':
        return <EmergencyFundCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'cd-calculator':
        return <CdCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case '401k-match-calculator':
        return <FourZeroOneKMatchCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Health & Fitness Expansion ---
      case 'pace-calculator':
        return <PaceCalculator onSave={onSaveCalculation} />;
      case 'one-rep-max-calculator':
        return <OneRepMaxCalculator onSave={onSaveCalculation} />;
      case 'waist-to-hip-calculator':
        return <WaistToHipCalculator onSave={onSaveCalculation} />;
      case 'sleep-cycle-calculator':
        return <SleepCycleCalculator onSave={onSaveCalculation} />;
      case 'alcohol-calorie-calculator':
        return <AlcoholCalorieCalculator onSave={onSaveCalculation} />;
      case 'lean-body-mass-calculator':
        return <LeanBodyMassCalculator onSave={onSaveCalculation} />;

      // --- Math & Algebra Expansion ---
      case 'quadratic-solver-calculator':
        return <QuadraticSolverCalculator onSave={onSaveCalculation} />;
      case 'pythagorean-calculator':
        return <PythagoreanCalculator onSave={onSaveCalculation} />;
      case 'lcm-gcd-calculator':
        return <LcmGcdCalculator onSave={onSaveCalculation} />;
      case 'logarithm-calculator':
        return <LogarithmCalculator onSave={onSaveCalculation} />;
      case 'factorial-permutations-calculator':
        return <FactorialPermutationsCalculator onSave={onSaveCalculation} />;
      case 'matrix-calculator':
        return <MatrixCalculator onSave={onSaveCalculation} />;

      // --- Real Estate Expansion ---
      case 'rent-vs-buy-calculator':
        return <RentVsBuyCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'refinance-calculator':
        return <RefinanceCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'cash-on-cash-calculator':
        return <CashOnCashCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'grm-calculator':
        return <GrmCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Tax Expansion ---
      case 'capital-gains-tax-calculator':
        return <CapitalGainsCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'tip-calculator':
        return <TipCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'vat-calculator':
        return <VatCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Business Expansion ---
      case 'cac-ltv-calculator':
        return <CacLtvCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'markup-margin-calculator':
        return <MarkupMarginCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'inventory-turnover-calculator':
        return <InventoryTurnoverCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'ebitda-calculator':
        return <EbitdaCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'burn-rate-calculator':
        return <BurnRateCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Construction Expansion ---
      case 'paint-calculator':
        return <PaintCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'drywall-calculator':
        return <DrywallCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'mulch-gravel-calculator':
        return <MulchGravelCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'deck-lumber-calculator':
        return <DeckLumberCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Engineering & Science Expansion ---
      case 'density-calculator':
        return <DensityCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'energy-calculator':
        return <EnergyCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'pressure-calculator':
        return <PressureCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'speed-of-sound-calculator':
        return <SpeedOfSoundCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      // --- Everyday & Time Expansion ---
      case 'time-card-calculator':
        return <TimeCardCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'exact-age-calculator':
        return <ExactAgeCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'time-zone-calculator':
        return <TimeZoneCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'net-worth-calculator':
        return <NetWorthCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'dog-age-calculator':
        return <DogAgeCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'cooking-converter-calculator':
        return <CookingConverterCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'crypto-dca-calculator':
        return <CryptoDcaCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'staking-rewards-calculator':
        return <StakingRewardsCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
      case 'impermanent-loss-calculator':
        return <ImpermanentLossCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;

      default:
        if (calculator.category === 'financial') {
          return <MortgageCalculator currencySymbol={currencySymbol} onSaveCalculation={onSaveCalculation} />;
        }
        if (calculator.category === 'fitness-health') {
          return <BmiCalculator onSaveCalculation={onSaveCalculation} />;
        }
        if (calculator.category === 'conversion') {
          return <UnitConverter />;
        }
        if (calculator.category === 'real-estate') {
          return <RentalRoiCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
        }
        if (calculator.category === 'tax') {
          return <IncomeTaxCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
        }
        if (calculator.category === 'business') {
          return <BreakEvenCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
        }
        if (calculator.category === 'construction') {
          return <ConcreteCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
        }
        if (calculator.category === 'engineering') {
          return <OhmsLawCalculator onSave={onSaveCalculation} />;
        }
        if (calculator.category === 'education') {
          return <FinalGradeCalculator onSave={onSaveCalculation} />;
        }
        if (calculator.category === 'cryptocurrency') {
          return <CryptoProfitCalculator currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
        }
        return <GenericConfigurableCalculator calculator={calculator} currencySymbol={currencySymbol} onSave={onSaveCalculation} />;
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#F8FAFC]">
      {/* Official Printable Report Header (Print only) */}
      <PrintReportHeader
        title={localizedCalc.name}
        category={category.name}
        description={localizedCalc.description}
      />

      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5 no-print">
        <Breadcrumbs
          items={[
            { label: category.name, onClick: () => onSelectCategory(category.id) },
            { label: localizedCalc.name, active: true }
          ]}
          onGoHome={onGoHome}
        />

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            id="calculator-share-button"
            type="button"
            onClick={handleShare}
            aria-label={t('common.share', 'Share')}
            className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] hover:border-[#FDBA74] bg-[#FFFFFF] hover:bg-[#FFF7ED] text-sm font-bold text-[#0F172A] hover:text-[#F97316] flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#64748B]" />
            <span>{t('common.share', 'Share')}</span>
          </button>

          <button
            id="calculator-print-button"
            type="button"
            onClick={handlePrint}
            aria-label={t('common.print', 'Print')}
            className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] hover:border-[#FDBA74] bg-[#FFFFFF] hover:bg-[#FFF7ED] text-sm font-bold text-[#0F172A] hover:text-[#F97316] flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#64748B]" />
            <span>{t('common.print', 'Print')}</span>
          </button>
        </div>
      </div>

      {/* Title & Description Intro */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#0F172A] tracking-tight">
          {localizedCalc.name}
        </h1>

        <p className="text-base sm:text-[17px] text-[#475569] max-w-3xl leading-relaxed">
          {localizedCalc.description}
        </p>
      </div>

      {/* Main Interactive Calculator Container */}
      <section 
        id="calculator-interactive-container"
        aria-label="Calculator Interactive Controls and Results"
        className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-8 border border-[#E2E8F0] shadow-xs"
      >
        <ErrorBoundary key={calculator.id}>
          <Suspense fallback={<CalculatorLoadingSkeleton />}>
            {renderCalculatorComponent()}
          </Suspense>
        </ErrorBoundary>
      </section>

      {/* High-Stakes Categorical Disclaimer Banner */}
      {(calculator.category === 'financial' || 
        calculator.category === 'tax' || 
        calculator.category === 'real-estate' || 
        calculator.category === 'fitness-health' || 
        calculator.category === 'cryptocurrency') && (
        <div 
          id={`category-disclaimer-${calculator.category}`}
          role="note" 
          aria-label="Informational Disclaimer Notice"
          className="p-4 sm:p-5 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] text-[#0F172A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm"
        >
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <p className="text-[#475569] leading-relaxed">
              <strong className="text-[#0F172A]">
                {calculator.category === 'fitness-health' ? 'Health & Medical Estimation Notice: ' :
                 calculator.category === 'tax' ? 'Tax Estimation Notice: ' :
                 calculator.category === 'cryptocurrency' ? 'Digital Asset Notice: ' :
                 'Financial Modeling Notice: '}
              </strong>
              {calculator.category === 'fitness-health' ? 
                'This tool provides generalized estimations based on population formulas and is not a substitute for professional clinical medical diagnosis or healthcare advice.' :
               calculator.category === 'tax' ?
                'Calculations are mathematical estimations and do not constitute statutory tax or legal counsel. Consult a licensed CPA or tax professional.' :
               calculator.category === 'cryptocurrency' ?
                'Crypto market parameters are subject to high volatility and risks. Calculations are hypothetical and not investment advice.' :
                'This calculator is for educational and quantitative modeling purposes only and does not constitute fiduciary financial or investment advice.'}
            </p>
          </div>
          {onGoToDisclaimer && (
            <button
              type="button"
              onClick={onGoToDisclaimer}
              className="shrink-0 text-xs font-bold text-[#F97316] hover:text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Full Disclaimer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Main Two Column Layout: Detailed Explanation Section & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Left Column (8 cols): Comprehensive Explanation Section */}
        <div className="lg:col-span-8 space-y-10">
          <CalculatorExplanationSection 
            calculator={localizedCalc} 
            currencySymbol={currencySymbol} 
          />

          {/* Related Calculators Component (Grid format at bottom of main content) */}
          <div className="pt-6 border-t border-[#E2E8F0]">
            <RelatedCalculators
              currentCalculator={localizedCalc}
              onSelectCalculator={onSelectCalculator}
              limit={6}
              layout="grid"
            />
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Sidebar with Quick Similar Links */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <AdSlot type="sidebar" />

          {/* Compact Sidebar Related Calculators list */}
          <RelatedCalculators
            currentCalculator={localizedCalc}
            onSelectCalculator={onSelectCalculator}
            limit={5}
            layout="sidebar"
          />
        </div>
      </div>

      {/* Official Printable Report Footer (Print only) */}
      <PrintReportFooter category={calculator.category} />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={localizedCalc.name}
        description={localizedCalc.description}
        category={category.name}
      />
    </div>
  );
};
