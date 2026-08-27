import { CategoryMeta } from '../../types';

export const CATEGORIES_FR: CategoryMeta[] = [
  {
    id: 'financial',
    name: 'Calculateurs Financiers',
    slug: 'financial',
    description: 'Prêt immobilier, crédits, investissements, intérêts composés, épargne, remboursement de dettes, retraite, TAEG et tableaux d\'amortissement.',
    iconName: 'DollarSign',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Finance & Argent',
    calculatorsCount: 15
  },
  {
    id: 'fitness-health',
    name: 'Santé & Forme Physique',
    slug: 'fitness-health',
    description: 'IMC, taux de masse grasse, métabolisme de base (BMR), calories & TDEE, poids idéal, grossesse, date d\'accouchement, ovulation, hydratation et zones cardiaques.',
    iconName: 'Activity',
    color: 'rose',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'Santé & Corps',
    calculatorsCount: 11
  },
  {
    id: 'math-algebra',
    name: 'Mathématiques & Algèbre',
    slug: 'math-algebra',
    description: 'Pourcentages, fractions, décimales, calculatrice scientifique, ratios, moyennes, probabilités, statistiques, exposants, radicaux et géométrie 2D/3D.',
    iconName: 'Calculator',
    color: 'blue',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'Maths & Sciences',
    calculatorsCount: 11
  },
  {
    id: 'real-estate',
    name: 'Calculateurs Immobiliers',
    slug: 'real-estate',
    description: 'Rendement locatif (ROI), taux de capitalisation (Cap Rate), rentabilité sur fonds propres, multiplicateur de loyer brut et flux de trésorerie locatifs.',
    iconName: 'Building',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Immobilier & Investissement',
    calculatorsCount: 4
  },
  {
    id: 'tax',
    name: 'Calculateurs d\'Impôts & Fiscalité',
    slug: 'tax',
    description: 'Tranches d\'imposition sur le revenu, plus-values, taxe sur la valeur ajoutée, taux effectif d\'imposition, déductions et salaire net.',
    iconName: 'Receipt',
    color: 'teal',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    badgeText: 'Impôts & Déductions',
    calculatorsCount: 3
  },
  {
    id: 'business',
    name: 'Calculateurs d\'Entreprise & Gestion',
    slug: 'business',
    description: 'Seuil de rentabilité (Point mort), marges brute et nette, taux de marque, valeur vie client (LTV) et flux de trésorerie opérationnel.',
    iconName: 'Briefcase',
    color: 'sky',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeText: 'Commerce & Stratégie',
    calculatorsCount: 3
  },
  {
    id: 'construction',
    name: 'Calculateurs de Bâtiment & Travaux',
    slug: 'construction',
    description: 'Volume et sacs de béton, carrelage et revêtements avec marge de chute, plaques de plâtre, couverture de peinture et charpente bois.',
    iconName: 'HardHat',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Bâtiment & Rénovation',
    calculatorsCount: 3
  },
  {
    id: 'engineering',
    name: 'Calculateurs d\'Ingénierie & Physique',
    slug: 'engineering',
    description: 'Loi d\'Ohm (tension, courant, résistance, puissance), flexion de poutre, couple moteur, nombre de Reynolds et formules électriques.',
    iconName: 'Cpu',
    color: 'violet',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    badgeText: 'Circuits & Physique',
    calculatorsCount: 2
  },
  {
    id: 'education',
    name: 'Calculateurs d\'Éducation & Notes',
    slug: 'education',
    description: 'Note requise à l\'examen final, calcul de moyenne générale et GPA, barèmes de notation pondérés et conversions de notes.',
    iconName: 'GraduationCap',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Notes & Scolarité',
    calculatorsCount: 2
  },
  {
    id: 'cryptocurrency',
    name: 'Calculateurs de Cryptomonnaies',
    slug: 'cryptocurrency',
    description: 'Calculateur de gains et pertes crypto, simulateur d\'investissement programmé (DCA), frais de transaction et récompenses de staking.',
    iconName: 'Coins',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Crypto & Web3',
    calculatorsCount: 2
  },
  {
    id: 'conversion',
    name: 'Conversions d\'Unités',
    slug: 'conversion',
    description: 'Convertissez instantanément longueurs, températures, poids, volumes, vitesses, superficies et stockage de données numériques.',
    iconName: 'ArrowLeftRight',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Convertisseurs d\'Unités',
    calculatorsCount: 1
  },
  {
    id: 'date-time',
    name: 'Date & Heure',
    slug: 'date-time',
    description: 'Nombre de jours entre deux dates, calcul d\'âge précis, heures de travail, jours ouvrés et durées temporelles.',
    iconName: 'Calendar',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Date & Heure',
    calculatorsCount: 1
  },
  {
    id: 'construction-other',
    name: 'Outils & Vie Quotidienne',
    slug: 'construction-other',
    description: 'Calculateur de moyenne universitaire, partage des frais d\'essence et de trajet, et utilitaires du quotidien.',
    iconName: 'Layers',
    color: 'purple',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'Utilitaires & Quotidien',
    calculatorsCount: 2
  }
];
