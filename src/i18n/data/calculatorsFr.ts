import { CalculatorMeta } from '../../types';

export const CALCULATORS_FR_MAP: Record<string, Partial<CalculatorMeta>> = {
  // Financial
  'mortgage-calculator': {
    name: 'Calculateur de Prêt Immobilier',
    description: 'Estimez vos mensualités de crédit immobilier incluant le capital, les intérêts, les taxes foncières, l\'assurance emprunteur et les charges avec un tableau d\'amortissement interactif.',
    shortDescription: 'Mensualités, intérêts totaux et tableau d\'amortissement complet.',
    tags: ['prêt immobilier', 'crédit', 'immobilier', 'maison', 'amortissement', 'taxe foncière', 'intérêts'],
    formulaSummary: 'Mensualité M = P * [r(1 + r)^n] / [(1 + r)^n - 1], où P est le montant emprunté, r est le taux d\'intérêt mensuel et n le nombre total de mensualités.',
    faqs: [
      {
        question: 'Qu\'est-ce qui est inclus dans une mensualité de crédit immobilier ?',
        answer: 'Une mensualité comprend le remboursement du capital emprunté, les intérêts dus à la banque, ainsi que l\'assurance emprunteur et éventuellement les taxes ou charges associées.'
      },
      {
        question: 'Comment les remboursements anticipés réduisent-ils le coût du crédit ?',
        answer: 'Chaque remboursement anticipé diminue directement le capital restant dû, ce qui réduit les intérêts calculés pour les mois suivants et raccourcit la durée totale du prêt.'
      }
    ]
  },
  'loan-calculator': {
    name: 'Calculateur de Prêt & Crédit',
    description: 'Calculateur universel pour tout prêt à taux fixe avec durée personnalisée, taux d\'intérêt, versements supplémentaires et échéancier de remboursement.',
    shortDescription: 'Calculez les mensualités et les intérêts totaux de tout prêt fixe.',
    tags: ['prêt', 'crédit', 'capital', 'intérêts', 'durée', 'mensualité', 'emprunt'],
    formulaSummary: 'M = (r * PV) / (1 - (1 + r)^(-n))'
  },
  'auto-loan-calculator': {
    name: 'Calculateur de Crédit Auto',
    description: 'Calculez les mensualités d\'un prêt automobile, les intérêts totaux, les taxes, la valeur de reprise et le coût d\'achat global de votre véhicule.',
    shortDescription: 'Estimez les mensualités auto, taxes et frais de concessionnaire.',
    tags: ['voiture', 'véhicule', 'crédit auto', 'financement', 'reprise', 'concessionnaire'],
    formulaSummary: 'Montant financé = (Prix du véhicule - Apport - Reprise) + Taxes + Frais.'
  },
  'personal-loan-calculator': {
    name: 'Calculateur de Prêt Personnel',
    description: 'Calculez les mensualités d\'un prêt personnel sans garantie, les frais de dossier, le coût total de l\'emprunt et comparez les durées (2 à 7 ans).',
    shortDescription: 'Mensualités, frais de dossier et calendrier de remboursement.',
    tags: ['prêt personnel', 'dette', 'emprunt', 'frais de dossier', 'crédit consommation']
  },
  'interest-calculator': {
    name: 'Calculateur d\'Intérêts (Simples & Composés)',
    description: 'Comparez les intérêts simples et les intérêts composés selon différentes fréquences de capitalisation (annuelle, trimestrielle, mensuelle, quotidienne).',
    shortDescription: 'Comparez la croissance des intérêts simples et composés.',
    tags: ['intérêts', 'intérêt simple', 'intérêt composé', 'croissance', 'taux']
  },
  'compound-interest-calculator': {
    name: 'Calculateur d\'Intérêts Composés',
    description: 'Calculez la valeur future de votre épargne ou portefeuille d\'investissement avec versements réguliers et fréquence de capitalisation.',
    shortDescription: 'Projetez la croissance future de vos investissements composés.',
    tags: ['investissement', 'épargne', 'intérêts', 'composés', 'croissance', 'actions', 'retraite'],
    formulaSummary: 'A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]'
  },
  'investment-calculator': {
    name: 'Calculateur d\'Investissement',
    description: 'Prévoyez la croissance de vos actifs avec rendements réels ajustés de l\'inflation, fiscalité sur les plus-values et accumulation mensuelle.',
    shortDescription: 'Projection de patrimoine ajustée de l\'inflation.',
    tags: ['investissement', 'patrimoine', 'rendement réel', 'inflation', 'portefeuille']
  },
  'savings-calculator': {
    name: 'Calculateur d\'Épargne & Objectifs',
    description: 'Déterminez combien vous devez épargner chaque mois pour atteindre votre objectif financier à une date précise.',
    shortDescription: 'Planifiez vos versements pour atteindre vos objectifs d\'épargne.',
    tags: ['épargne', 'objectifs', 'versements', 'intérêts', 'croissance']
  },
  'retirement-calculator': {
    name: 'Calculateur de Retraite',
    description: 'Estimez le capital nécessaire pour votre retraite, votre taux de retrait durable et l\'épargne mensuelle requise.',
    shortDescription: 'Planifiez votre capital retraite et vos retraits futurs.',
    tags: ['retraite', 'pension', 'rentes', 'indépendance financière', 'fire']
  },
  'inflation-calculator': {
    name: 'Calculateur d\'Inflation & Pouvoir d\'Achat',
    description: 'Mesurez l\'impact de l\'inflation sur votre pouvoir d\'achat dans le temps et calculez la valeur équivalente d\'une somme future.',
    shortDescription: 'Analysez l\'érosion du pouvoir d\'achat dans le temps.',
    tags: ['inflation', 'pouvoir d\'achat', 'cpi', 'valeur monétaire']
  },
  'creditCard-calculator': {
    name: 'Calculateur de Remboursement de Carte de Crédit',
    description: 'Calculez le temps nécessaire pour solder le solde de vos cartes de crédit et le montant total des intérêts économisés en augmentant vos mensualités.',
    shortDescription: 'Stratégies et délais pour solder vos dettes de carte.',
    tags: ['carte de crédit', 'dette', 'taux d\'intérêt', 'remboursement']
  },
  'debt-payoff-calculator': {
    name: 'Calculateur de Désendettement (Boule de neige & Avalanche)',
    description: 'Comparez les stratégies de remboursement de dettes : méthode avalanche (taux le plus élevé d\'abord) vs boule de neige (plus petit solde d\'abord).',
    shortDescription: 'Comparez les méthodes Avalanche et Boule de neige.',
    tags: ['dettes', 'désendettement', 'avalanche', 'boule de neige', 'finances']
  },
  'apr-calculator': {
    name: 'Calculateur de TAEG (Taux Annuel Effectif Global)',
    description: 'Convertissez un taux d\'intérêt nominal en TAEG réel en incluant les frais de dossier, l\'assurance et les frais annexes.',
    shortDescription: 'Calculez le véritable coût annuel de votre crédit.',
    tags: ['taeg', 'taux annuel effectif global', 'frais', 'crédit', 'coût réel']
  },
  'amortization-calculator': {
    name: 'Calculateur d\'Amortissement',
    description: 'Générez un tableau d\'amortissement détaillé mois par mois et année par année avec répartition du capital et des intérêts.',
    shortDescription: 'Tableau d\'amortissement complet avec versements supplémentaires.',
    tags: ['amortissement', 'tableau', 'échéancier', 'capital', 'intérêts']
  },
  'roi-calculator': {
    name: 'Calculateur de Retour sur Investissement (ROI)',
    description: 'Calculez le rendement en pourcentage (ROI) et le taux de rendement annualisé de tout investissement ou projet d\'entreprise.',
    shortDescription: 'Mesurez la rentabilité globale et annualisée.',
    tags: ['roi', 'retour sur investissement', 'rentabilité', 'gain', 'performance']
  },
  'salary-calculator': {
    name: 'Calculateur de Salaire Brut en Net',
    description: 'Convertissez facilement votre rémunération entre salaire horaire, journalier, hebdomadaire, mensuel et annuel brut et net.',
    shortDescription: 'Conversion salaire horaire, mensuel et annuel brut/net.',
    tags: ['salaire', 'brut', 'net', 'taux horaire', 'paie', 'rémunération']
  },

  // Health & Fitness
  'bmi-calculator': {
    name: 'Calculateur d\'IMC (Indice de Masse Corporelle)',
    description: 'Calculez votre IMC selon les normes de l\'OMS pour adultes et enfants, avec catégorie de corpulence et plage de poids santé idéale.',
    shortDescription: 'Score IMC, classification OMS et plage de poids santé.',
    tags: ['imc', 'indice de masse corporelle', 'poids', 'taille', 'santé', 'oms']
  },
  'body-fat-calculator': {
    name: 'Calculateur de Taux de Masse Grasse',
    description: 'Estimez votre pourcentage de graisse corporelle à partir des mesures du tour de taille, cou et hanches (méthode US Navy).',
    shortDescription: 'Taux de masse grasse, masse maigre et masse grasse.',
    tags: ['masse grasse', 'composition corporelle', 'masse maigre', 'us navy']
  },
  'calorie-tdee-calculator': {
    name: 'Calculateur de Calories & Dépense Journalière (TDEE)',
    description: 'Calculez vos besoins caloriques quotidiens de maintien (TDEE) et vos objectifs pour perte de graisse ou prise de masse musculaire.',
    shortDescription: 'Calories quotidiennes de maintien, déficit et surplus.',
    tags: ['calories', 'tdee', 'dépense énergétique', 'nutrition', 'perte de poids']
  },
  'bmr-calculator': {
    name: 'Calculateur de Métabolisme de Base (BMR / MB)',
    description: 'Calculez votre métabolisme de base à l\'aide des formules Mifflin-St Jeor, Harris-Benedict et Katch-McArdle.',
    shortDescription: 'Dépense calorique minimale de votre corps au repos.',
    tags: ['bmr', 'métabolisme de base', 'mifflin-st jeor', 'harris-benedict']
  },
  'ideal-weight-calculator': {
    name: 'Calculateur de Poids Idéal',
    description: 'Comparez les formules médicales reconnues (Devine, Robinson, Miller, Hamwi) pour déterminer votre poids de forme optimal.',
    shortDescription: 'Comparaison des formules scientifiques de poids idéal.',
    tags: ['poids idéal', 'poids de forme', 'devine', 'robinson', 'miller']
  },
  'pregnancy-calculator': {
    name: 'Calculateur de Grossesse & Semaines',
    description: 'Suivez le déroulement de votre grossesse semaine par semaine, les dates des trimestres et les étapes de développement de bébé.',
    shortDescription: 'Calendrier de grossesse par semaine et trimestres.',
    tags: ['grossesse', 'semaines', 'trimestres', 'développement', 'maternité']
  },
  'due-date-calculator': {
    name: 'Calculateur de Date Prévue d\'Accouchement',
    description: 'Calculez la date probable d\'accouchement selon la règle de Naegele à partir de la date des dernières règles ou de conception.',
    shortDescription: 'Date d\'accouchement estimée selon vos dernières règles.',
    tags: ['date d\'accouchement', 'terme', 'conception', 'naegele']
  },
  'ovulation-calculator': {
    name: 'Calculateur d\'Ovulation & Période de Fertilité',
    description: 'Estimez vos jours d\'ovulation les plus fertiles et prévoyez vos prochains cycles menstruels.',
    shortDescription: 'Fenêtre de fertilité et date prévisionnelle d\'ovulation.',
    tags: ['ovulation', 'fertilité', 'cycle menstruel', 'conception']
  },
  'water-intake-calculator': {
    name: 'Calculateur d\'Hydratation Quotidienne',
    description: 'Déterminez la quantité d\'eau optimale à boire chaque jour selon votre poids corporel, votre niveau d\'activité et le climat.',
    shortDescription: 'Volume d\'eau recommandé par jour en litres et verres.',
    tags: ['eau', 'hydratation', 'santé', 'litres', 'bien-être']
  },
  'heart-rate-calculator': {
    name: 'Calculateur de Fréquence Cardiaque Cible',
    description: 'Calculez vos 5 zones d\'entraînement cardiaque (Karvonen) pour optimiser l\'endurance fondamentale, le cardio et la combustion des graisses.',
    shortDescription: 'Fréquence cardiaque maximale et zones d\'entraînement.',
    tags: ['fréquence cardiaque', 'cardio', 'karvonen', 'bpm', 'entraînement']
  },

  // Math & Science
  'scientific-calculator': {
    name: 'Calculatrice Scientifique en Ligne',
    description: 'Calculatrice scientifique complète avec fonctions trigonométriques (sin, cos, tan), logarithmes, factorielles, puissances et constantes (π, e).',
    shortDescription: 'Fonctions trigonométriques, logarithmes et constantes.',
    tags: ['calculatrice scientifique', 'trigonométrie', 'logarithmes', 'maths']
  },
  'percentage-calculator': {
    name: 'Calculateur de Pourcentage',
    description: 'Calculez rapidement les pourcentages : augmentation/diminution, remise, TVA, fraction en pourcentage et part d\'un total.',
    shortDescription: 'Augmentation, diminution, remises et ratios en pourcentage.',
    tags: ['pourcentage', 'remise', 'tva', 'fraction', 'variation']
  },
  'fraction-calculator': {
    name: 'Calculateur de Fractions',
    description: 'Additionnez, soustrayez, multipliez et divisez des fractions avec simplification automatique et conversion en nombres décimaux.',
    shortDescription: 'Opérations sur fractions avec simplification automatique.',
    tags: ['fractions', 'maths', 'simplification', 'numérateur', 'dénominateur']
  },
  'decimal-calculator': {
    name: 'Calculateur & Convertisseur de Décimales',
    description: 'Convertissez des nombres décimaux en fractions exactes et pourcentages avec étapes de réduction et d\'arrondi.',
    shortDescription: 'Conversion décimale vers fraction et pourcentage.',
    tags: ['décimales', 'fractions', 'conversion', 'arrondi']
  },
  'ratio-calculator': {
    name: 'Calculateur de Ratio & Proportions',
    description: 'Résolvez des proportions (A:B = C:D), simplifiez des ratios et partagez des quantités selon un ratio donné.',
    shortDescription: 'Résolution de proportions et simplification de ratios.',
    tags: ['ratio', 'proportion', 'règle de trois', 'mise à l\'échelle']
  },
  'average-calculator': {
    name: 'Calculateur de Moyenne, Médiane & Mode',
    description: 'Calculez la moyenne arithmétique, la médiane, le mode, l\'étendue géométrique et la somme totale d\'un jeu de données.',
    shortDescription: 'Moyenne, médiane, mode et étendue statistique.',
    tags: ['moyenne', 'médiane', 'mode', 'statistiques', 'somme']
  },
  'probability-calculator': {
    name: 'Calculateur de Probabilités',
    description: 'Calculez la probabilité d\'événements uniques, d\'unions, d\'intersections et de lancers successifs indépendants.',
    shortDescription: 'Probabilités d\'événements simples et combinés.',
    tags: ['probabilité', 'chances', 'événements', 'statistiques']
  },
  'statistics-calculator': {
    name: 'Calculateur de Statistiques & Écart-Type',
    description: 'Calculez l\'écart-type (échantillon et population), la variance, les quartiles (Q1, Q3) et l\'écart interquartile.',
    shortDescription: 'Écart-type, variance, quartiles et distribution.',
    tags: ['statistiques', 'écart-type', 'variance', 'quartiles']
  },
  'exponent-calculator': {
    name: 'Calculateur d\'Exposants & Puissances',
    description: 'Calculez les puissances de nombres (x^y), les exposants négatifs, fractionnaires et les notations scientifiques.',
    shortDescription: 'Calcul de puissances et notation scientifique.',
    tags: ['exposant', 'puissance', 'racine', 'algèbre']
  },
  'square-root-calculator': {
    name: 'Calculateur de Racine Carrée & n-ième',
    description: 'Calculez la racine carrée, cubique ou n-ième d\'un nombre avec simplification sous forme de radicaux exacts.',
    shortDescription: 'Racines carrées, cubiques et n-ièmes exactes.',
    tags: ['racine carrée', 'radical', 'racine cubique', 'maths']
  },
  'geometry-calculator': {
    name: 'Calculateur de Géométrie 2D & 3D',
    description: 'Calculez les aires, périmètres, volumes et surfaces de cercles, triangles, rectangles, cylindres, cônes et sphères.',
    shortDescription: 'Aires, périmètres, volumes et surfaces 2D/3D.',
    tags: ['géométrie', 'aire', 'volume', 'périmètre', 'cercle', 'triangle']
  },

  // Conversion & Time
  'unit-converter': {
    name: 'Convertisseur Universel d\'Unités',
    description: 'Convertissez instantanément longueurs, températures, poids, volumes, vitesses, superficies et stockage numérique entre systèmes métrique et impérial.',
    shortDescription: 'Conversion multi-catégories instantanée et précise.',
    tags: ['convertisseur', 'unités', 'métrique', 'impérial', 'longueur', 'poids']
  },
  'date-calculator': {
    name: 'Calculateur de Date & Durée',
    description: 'Calculez le nombre exact de jours, semaines, mois et années entre deux dates ou ajoutez/soustrayez des jours à une date.',
    shortDescription: 'Jours entre dates et durées précises.',
    tags: ['date', 'jours', 'durée', 'calendrier', 'temps']
  },

  // Real estate & Tax
  'rental-roi-calculator': {
    name: 'Calculateur de Rendement Locatif (ROI)',
    description: 'Évaluez la rentabilité brute et nette d\'un investissement immobilier locatif, le cash-flow mensuel et le taux de rendement interne.',
    shortDescription: 'Rendement locatif brut/net et cash-flow mensuel.',
    tags: ['immobilier', 'rendement locatif', 'cash-flow', 'investissement']
  },
  'income-tax-calculator': {
    name: 'Calculateur d\'Impôt sur le Revenu',
    description: 'Estimez le montant de votre impôt sur le revenu, votre taux effectif et votre salaire net restant après déductions et tranches d\'imposition.',
    shortDescription: 'Estimation d\'impôt, tranches fiscales et salaire net.',
    tags: ['impôt', 'revenu', 'fiscalité', 'tranches', 'salaire net']
  },

  // Business & Construction
  'break-even-calculator': {
    name: 'Calculateur de Point Mort & Seuil de Rentabilité',
    description: 'Déterminez le chiffre d\'affaires et le volume de ventes nécessaires pour couvrir tous vos coûts fixes et variables.',
    shortDescription: 'Seuil de rentabilité en unités et en chiffre d\'affaires.',
    tags: ['seuil de rentabilité', 'point mort', 'gestion', 'marge', 'coûts']
  },
  'concrete-calculator': {
    name: 'Calculateur de Béton & Volume',
    description: 'Calculez le volume exact de béton en mètres cubes et le nombre de sacs nécessaires pour dalles, fondations, poteaux et escaliers.',
    shortDescription: 'Volume en m³ et sacs de ciment pour vos chantiers.',
    tags: ['béton', 'volume', 'dalle', 'travaux', 'maçonnerie']
  },
  'ohms-law-calculator': {
    name: 'Calculateur de Loi d\'Ohm & Puissance',
    description: 'Calculez la tension (V), le courant (I), la résistance (R) et la puissance électrique (P) dans les circuits à courant continu.',
    shortDescription: 'Tension, intensité, résistance et puissance électrique.',
    tags: ['loi d\'ohm', 'électricité', 'tension', 'puissance', 'résistance']
  },
  'final-grade-calculator': {
    name: 'Calculateur de Note d\'Examen Final',
    description: 'Déterminez la note exacte que vous devez obtenir à votre examen final pour atteindre la moyenne ou la mention souhaitée.',
    shortDescription: 'Note requise à l\'examen pour atteindre votre objectif.',
    tags: ['notes', 'examen', 'moyenne', 'étudiant', 'scolarité']
  },
  'crypto-profit-calculator': {
    name: 'Calculateur de Gains & Pertes Crypto',
    description: 'Calculez vos plus-values ou moins-values sur vos transactions de cryptomonnaies, en déduisant les frais d\'échange et taxes.',
    shortDescription: 'Gains, pertes et rendement en pourcentage crypto.',
    tags: ['crypto', 'bitcoin', 'plus-value', 'rendement', 'frais']
  },
  'gpa-calculator': {
    name: 'Calculateur de Moyenne Scolaire & Universitaire',
    description: 'Calculez votre moyenne pondérée sur 20 ou selon le barème GPA (4.0) en fonction des coefficients et crédits de vos matières.',
    shortDescription: 'Moyenne pondérée et conversion de barèmes scolaires.',
    tags: ['moyenne', 'gpa', 'coefficients', 'université', 'bulletin']
  },
  'gas-mileage-calculator': {
    name: 'Calculateur de Consommation d\'Essence & Frais de Trajet',
    description: 'Calculez la consommation de carburant aux 100 km, le coût total du voyage et partagez facilement les frais entre passagers.',
    shortDescription: 'Consommation au 100km, coût de l\'essence et partage de frais.',
    tags: ['essence', 'carburant', 'trajet', 'consommation', 'covoiturage']
  }
};
