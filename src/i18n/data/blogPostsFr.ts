import { BlogPost } from '../../types';

export const BLOG_POSTS_FR_MAP: Record<string, Partial<BlogPost>> = {
  'how-mortgage-calculations-work': {
    title: 'Comprendre le Calcul d\'un Prêt Immobilier : Formules, Mathématiques et Secrets d\'Amortissement',
    excerpt: 'Démystifiez la formule de mensualité d\'un prêt immobilier à taux fixe. Découvrez comment s\'articulent le capital et les intérêts sur 20 ou 30 ans, et comment les remboursements anticipés font économiser des dizaines de milliers d\'euros.',
    categoryLabel: 'Planification Financière',
    metaDescription: 'Guide complet expliquant le fonctionnement du calcul des mensualités de prêt immobilier, la formule d\'amortissement et l\'impact des remboursements anticipés.',
    tags: ['Prêt Immobilier', 'Amortissement', 'Taux d\'Intérêt', 'Crédit Habitat', 'Finances Personnelles'],
    keyTakeaways: [
      'La mensualité constante est issue d\'une formule d\'annuité qui équilibre les proportions variables de capital et d\'intérêts chaque mois.',
      'Au cours des premières années d\'un prêt sur 25 ou 30 ans, jusqu\'à 70-80% de votre mensualité correspond aux intérêts plutôt qu\'au remboursement du capital.',
      'Un versement supplémentaire régulier vers le capital peut réduire la durée du crédit de 3 à 6 ans et vous faire économiser des dizaines de milliers d\'euros d\'intérêts.',
      'Prendre en compte l\'assurance emprunteur et la taxe foncière dès le départ évite les mauvaises surprises budgétaires.'
    ],
    faqs: [
      {
        question: 'Pourquoi rembourse-t-on si peu de capital au cours des premières années ?',
        answer: 'Parce que les intérêts sont calculés chaque mois sur le capital restant dû. Lorsque ce capital est au plus haut (au début du prêt), la charge d\'intérêts mensuelle absorbe la majeure partie de votre mensualité fixe. À mesure que le capital diminue, les intérêts baissent, permettant de rembourser davantage de capital.'
      },
      {
        question: 'Comment un remboursement anticipé réduit-il la durée totale du prêt ?',
        answer: 'Lorsque vous effectuez un versement supplémentaire affecté au capital, le solde restant dû diminue immédiatement. Les intérêts futurs sont alors calculés sur un montant plus faible, ce qui accélère le remboursement du capital lors de chaque échéance suivante.'
      },
      {
        question: 'Quelle est la différence entre le taux nominal et le TAEG ?',
        answer: 'Le taux nominal représente le coût brut de l\'emprunt. Le Taux Annuel Effectif Global (TAEG) inclut le taux nominal ainsi que tous les frais obligatoires (frais de dossier, assurance emprunteur, garanties), reflétant ainsi le coût total réel du crédit.'
      }
    ],
    sections: [
      {
        id: 'the-fundamental-equation',
        title: '1. La Formule Fondamentale de la Mensualité Immobilière',
        content: [
          'Lorsque vous souscrivez un prêt immobilier à taux fixe, l\'établissement bancaire fixe une mensualité constante qui reste identique du premier au dernier mois.',
          'Derrière ce montant constant se cache la formule universelle d\'amortissement d\'annuité ordinaire. La mensualité exacte M dépend de trois paramètres : le capital emprunté (P), le taux d\'intérêt périodique mensuel (r) et le nombre total de mensualités (n).'
        ],
        formula: {
          equation: 'M = P · [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
          description: 'Formule d\'Amortissement à Taux Fixe et Échéance Constante',
          variables: [
            { symbol: 'M', meaning: 'Mensualité constante (Capital & Intérêts)' },
            { symbol: 'P', meaning: 'Capital initial emprunté (ex. 300 000 €)' },
            { symbol: 'r', meaning: 'Taux d\'intérêt mensuel (Taux annuel divisé par 12, ex. 0,035 / 12 = 0,002917)' },
            { symbol: 'n', meaning: 'Nombre total de mois de remboursement (ex. 25 ans × 12 = 300)' }
          ]
        },
        callout: {
          type: 'example',
          title: 'Exemple de Calcul Pratique',
          text: 'Pour un emprunt de 300 000 € à 3,5% sur 25 ans (300 mois) : r = 0,035/12 = 0,0029167. En appliquant la formule, on obtient une mensualité de base de 1 501,87 € par mois.'
        }
      }
    ]
  },
  'understanding-bmi-and-body-composition': {
    title: 'Comprendre l\'IMC et la Composition Corporelle : Au-delà du Poids sur la Balance',
    excerpt: 'Pourquoi l\'IMC est un outil de dépistage efficace mais incomplet. Apprenez à combiner l\'Indice de Masse Corporelle avec le taux de masse grasse, le tour de taille et la masse musculaire.',
    categoryLabel: 'Santé & Physiologie',
    metaDescription: 'Guide complet sur l\'Indice de Masse Corporelle (IMC), les méthodes de calcul de la masse grasse et l\'interprétation des biomarqueurs de santé.',
    tags: ['IMC', 'Masse Grasse', 'Santé', 'Composition Corporelle', 'Physiologie'],
    keyTakeaways: [
      'L\'IMC est un indicateur de santé publique éprouvé mais ne distingue pas la masse musculaire de la masse adipeuse.',
      'Le tour de taille et le ratio taille-hanches fournissent des informations cruciales sur la graisse viscérale abdominale.',
      'Combiner l\'IMC avec une estimation du taux de masse grasse permet une évaluation beaucoup plus précise de la santé métabolique.'
    ],
    faqs: [
      {
        question: 'Pourquoi l\'IMC peut-il classer les sportifs en surpoids ?',
        answer: 'Le tissu musculaire étant plus dense et plus lourd que le tissu adipeux pour un même volume, une personne très musclée aura un poids élevé par rapport à sa taille sans pour autant présenter d\'excès de graisse corporelle.'
      }
    ],
    sections: [
      {
        id: 'bmi-equation',
        title: '1. La Formule Standard de l\'IMC de Quetelet',
        content: [
          'Conçu au XIXe siècle par Adolphe Quetelet, l\'Indice de Masse Corporelle est défini comme le poids en kilogrammes divisé par le carré de la taille en mètres.',
          'L\'Organisation Mondiale de la Santé (OMS) établit les seuils de référence suivants : moins de 18,5 (maigreur), de 18,5 à 24,9 (corpulence normale), de 25 à 29,9 (surpoids), et 30 ou plus (obésité).'
        ],
        formula: {
          equation: 'IMC = Poids (kg) / [Taille (m)]²',
          description: 'Formule Officielle de l\'Indice de Masse Corporelle (OMS)'
        }
      }
    ]
  },
  'compound-interest-explained': {
    title: 'La Puissance des Intérêts Composés : Mathématiques de la Richesse Exponentielle',
    excerpt: 'Comment fonctionne la capitalisation exponentielle des intérêts dans le temps. Découvrez pourquoi commencer à investir tôt est le levier le plus puissant pour construire son patrimoine.',
    categoryLabel: 'Investissement & Épargne',
    metaDescription: 'Découvrez la formule des intérêts composés, la règle de 72 et des simulations chiffrées de croissance patrimoniale à long terme.',
    tags: ['Intérêts Composés', 'Épargne', 'Investissement', 'Richesse', 'Bourse'],
    keyTakeaways: [
      'Les intérêts composés génèrent des intérêts sur les intérêts précédemment acquis, produisant une courbe de croissance géométrique.',
      'Le temps d\'exposition sur le marché est le facteur le plus déterminant pour maximiser les gains composés.',
      'La Règle de 72 permet d\'estimer en quelques secondes le nombre d\'années nécessaires pour doubler un capital (72 / taux de rendement annuel).'
    ],
    faqs: [
      {
        question: 'Qu\'est-ce que la règle de 72 ?',
        answer: 'Il s\'agit d\'une approximation mathématique simple : divisez 72 par votre taux de rendement annuel pour connaître le nombre d\'années nécessaires pour doubler votre investissement. Par exemple, à 8% par an, votre capital double en 72 / 8 = 9 ans.'
      }
    ],
    sections: [
      {
        id: 'compound-math',
        title: '1. La Formule Fondamentale des Intérêts Composés',
        content: [
          'Contrairement à l\'intérêt simple où seul le capital de départ produit un rendement, l\'intérêt composé réinvestit systématiquement les gains pour accroître la base de calcul des périodes suivantes.'
        ],
        formula: {
          equation: 'A = P · (1 + r/n)^(n·t) + PMT · [((1 + r/n)^(n·t) - 1) / (r/n)]',
          description: 'Formule de Valeur Future avec Versements Périodiques Réguliers'
        }
      }
    ]
  },
  'scientific-math-essentials': {
    title: 'Guide des Fonctions Trigonométriques & Notations Scientifiques',
    excerpt: 'Maîtrisez les fonctions trigonométriques indispensables, les logarithmes naturels et décimaux, ainsi que les opérations algébriques avancées.',
    categoryLabel: 'Mathématiques & Sciences',
    metaDescription: 'Guide pratique et pédagogique sur les calculs scientifiques : trigonométrie, logarithmes, factorielles et calculs d\'ingénierie.',
    tags: ['Mathématiques', 'Trigonométrie', 'Sciences', 'Calculatrice', 'Algèbre'],
    keyTakeaways: [
      'Le cercle trigonométrique relie les angles en radians et degrés aux rapports de longueurs (sinus, cosinus, tangente).',
      'Les logarithmes transforment les multiplications complexes en additions simples, facilitant l\'analyse des phénomènes à échelle exponentielle.'
    ],
    faqs: [
      {
        question: 'Quelle est la différence entre radians et degrés ?',
        answer: 'Un cercle complet compte 360 degrés ou 2π radians. Les radians représentent la longueur de l\'arc parcouru sur un cercle unitaire et constituent l\'unité standard en mathématiques et physique.'
      }
    ],
    sections: [
      {
        id: 'trig-foundations',
        title: '1. Les Fondations Trigonométriques',
        content: [
          'Dans un triangle rectangle, le sinus est le rapport du côté opposé sur l\'hypoténuse, le cosinus est le côté adjacent sur l\'hypoténuse, et la tangente est le côté opposé sur le côté adjacent.'
        ]
      }
    ]
  }
};
