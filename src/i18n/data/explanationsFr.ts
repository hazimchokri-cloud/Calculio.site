import { CalculatorExplanation } from '../../types';

export const EXPLANATIONS_FR_MAP: Record<string, Partial<CalculatorExplanation>> = {
  'mortgage-calculator': {
    howItWorks: {
      summary: 'Le calculateur de prêt immobilier détermine vos échéances périodiques en prenant en compte le capital emprunté, le taux d\'intérêt annuel, la durée du prêt et les coûts annexes comme la taxe foncière, l\'assurance emprunteur et les charges de copropriété.',
      steps: [
        {
          title: '1. Détermination du capital net emprunté',
          detail: 'Calcule le montant effectivement financé (Prix d\'achat moins l\'apport personnel).'
        },
        {
          title: '2. Calcul de l\'amortissement périodique',
          detail: 'Convertit le taux d\'intérêt nominal annuel en taux mensuel et détermine la mensualité de base (Capital & Intérêts) via les formules standard d\'annuités.'
        },
        {
          title: '3. Agrégation des frais annexes',
          detail: 'Ajoute la taxe foncière mensuelle, l\'assurance habitation et l\'assurance emprunteur.'
        },
        {
          title: '4. Établissement du tableau d\'amortissement',
          detail: 'Construit le tableau complet traçant la réduction du capital restant dû, la part des intérêts et le coût global de l\'emprunt.'
        }
      ],
      keyAssumptions: [
        'Taux d\'intérêt fixe pendant toute la durée du crédit.',
        'Capitalisation mensuelle des intérêts sur le capital restant dû.',
        'Paiements effectués à intervalles réguliers et constants.'
      ]
    },
    formula: {
      title: 'Formule de Mensualité de Prêt à Taux Fixe (Capital & Intérêts)',
      equation: 'M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
      variables: [
        { symbol: 'M', name: 'Mensualité constante', description: 'Paiement mensuel de base comprenant capital et intérêts', unit: 'Devise (€/$)' },
        { symbol: 'P', name: 'Capital emprunté', description: 'Montant total emprunté après déduction de l\'apport', unit: 'Devise (€/$)' },
        { symbol: 'r', name: 'Taux d\'intérêt mensuel', description: 'Taux d\'intérêt annuel divisé par 12 (ex. 3,5% / 12 = 0,002917)', unit: 'Décimal' },
        { symbol: 'n', name: 'Nombre total de mensualités', description: 'Durée en années multipliée par 12 (ex. 25 ans × 12 = 300)', unit: 'Mois' }
      ],
      explanation: 'Cette formule calcule la rente fixe nécessaire pour amortir un capital emprunté sur n périodes à un taux d\'intérêt constant r.'
    },
    useCases: [
      {
        title: 'Évaluation de la Capacité d\'Emprunt',
        description: 'Déterminer le prix d\'achat maximal envisageable et la mensualité correspondante avant de solliciter un accord de principe auprès d\'une banque.',
        targetAudience: 'Futurs Acquéreurs & Primo-accédants',
        benefits: ['Éviter le surendettement', 'Tester différents montants d\'apport', 'Anticiper le coût de l\'assurance']
      },
      {
        title: 'Optimisation & Rachat de Crédit',
        description: 'Comparer les conditions d\'un prêt en cours avec les taux actuels du marché pour évaluer les gains potentiels d\'une renégociation.',
        targetAudience: 'Propriétaires Actuels',
        benefits: ['Mesurer l\'économie mensuelle', 'Raccourcir la durée de remboursement', 'Réduire le coût total des intérêts']
      }
    ],
    faqs: [
      {
        question: 'Comment choisir entre un prêt sur 15, 20 ou 25 ans ?',
        answer: 'Un prêt plus court (15 ans) implique des mensualités plus élevées mais permet de réduire considérablement le coût total des intérêts payés. Un prêt plus long (25 ans) allège l\'effort financier mensuel mais augmente la somme globale d\'intérêts versés à la banque.'
      },
      {
        question: 'Quel est l\'intérêt d\'effectuer des remboursements anticipés ?',
        answer: 'Chaque euro remboursé par anticipation vient directement réduire le capital restant dû, ce qui diminue instantanément la part d\'intérêts prélevée lors de chaque mensualité future.'
      }
    ]
  },
  'bmi-calculator': {
    howItWorks: {
      summary: 'L\'Indice de Masse Corporelle (IMC) est un indicateur validé par l\'OMS permettant d\'évaluer la corpulence d\'une personne en fonction de sa taille et de son poids.',
      steps: [
        {
          title: '1. Conversion de la taille en mètres',
          detail: 'Exemple : 175 cm devient 1,75 m.'
        },
        {
          title: '2. Calcul du carré de la taille',
          detail: '1,75 × 1,75 = 3,0625 m².'
        },
        {
          title: '3. Division du poids par la surface',
          detail: 'Poids (kg) divisé par la taille au carré pour obtenir le score IMC.'
        }
      ]
    },
    formula: {
      title: 'Formule Officielle de l\'Indice de Masse Corporelle',
      equation: 'IMC = Poids (kg) / [Taille (m)]²',
      variables: [
        { symbol: 'IMC', name: 'Indice de Masse Corporelle', description: 'Score de corpulence', unit: 'kg/m²' },
        { symbol: 'Poids', name: 'Masse corporelle', description: 'Poids de l\'individu', unit: 'kg' },
        { symbol: 'Taille', name: 'Stature', description: 'Taille en position debout', unit: 'm' }
      ],
      explanation: 'L\'IMC évalue si le poids d\'un individu est proportionné à sa taille selon les seuils de référence internationaux.'
    }
  }
};
