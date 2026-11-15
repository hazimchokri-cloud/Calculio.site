import { CalculatorExplanation } from '../../types';

export const HEALTH_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  'body-fat-calculator': {
    introduction:
      'While Body Mass Index (BMI) estimates weight relative to height, it cannot tell the difference between lean muscle and adipose tissue. A strength athlete and an inactive adult of identical height and weight share the same BMI despite having dramatically different body compositions.\n\nThe Body Fat Percentage Calculator uses the U.S. Navy circumference method to estimate your body fat percentage, total fat mass, and lean body mass from simple tape-measure dimensions. It is useful for tracking fat loss without relying solely on scale weight, especially when combining resistance training with dietary changes.',
    howItWorks: {
      summary:
        'The calculator applies the U.S. Navy logarithmic body composition equations using your neck, waist, and (for women) hip circumferences alongside standing height, then splits your total weight into fat mass and lean mass.',
      steps: [
        {
          title: '1. Select Biological Sex & Units',
          detail: 'Choose Imperial (inches and pounds) or Metric (centimeters and kilograms) and select Male or Female, as fat distribution landmarks differ between sexes.'
        },
        {
          title: '2. Measure Circumferences & Height',
          detail: 'Enter standing height, body weight, neck circumference below the larynx, waist circumference (at the navel for men, narrowest point for women), and widest hip circumference (for women).'
        },
        {
          title: '3. Apply Navy Logarithmic Equations',
          detail: 'The calculator normalizes measurements to inches and evaluates the U.S. Navy base-10 logarithm regression formula for your sex.'
        },
        {
          title: '4. Compute Fat Mass & Lean Mass',
          detail: 'Body fat percentage is multiplied by total weight to separate fat mass from lean body mass (muscle, bone, organs, and water).'
        }
      ],
      keyAssumptions: [
        'Tape measurements are taken level to the floor against relaxed skin without compressing tissue.',
        'Waist circumference exceeds neck circumference (men) and waist plus hip exceeds neck (women).',
        'Estimated body fat percentage is clamped to a physiological bounds range of 2% to 60%.'
      ]
    },
    formula: {
      title: 'U.S. Navy Body Fat Circumference Equations',
      equation: 'Men: BF% = 86.010×log₁₀(W - N) - 70.041×log₁₀(H) + 36.76 | Women: BF% = 163.205×log₁₀(W + Hip - N) - 97.684×log₁₀(H) - 78.387',
      variables: [
        { symbol: 'W', name: 'Waist Circumference', description: 'Measured horizontally at navel (men) or narrowest waist (women)', unit: 'Inches' },
        { symbol: 'N', name: 'Neck Circumference', description: 'Measured just below the larynx sloping slightly downward', unit: 'Inches' },
        { symbol: 'Hip', name: 'Hip Circumference', description: 'Widest circumference around hips and glutes (women only)', unit: 'Inches' },
        { symbol: 'H', name: 'Height', description: 'Standing height measured without shoes', unit: 'Inches' }
      ],
      explanation:
        'Developed by Hodgdon and Beckett for the U.S. Naval Health Research Center, these logarithmic regression formulas estimate body density and body fat percentage typically within 3%–4% of hydrostatic weighing.'
    },
    examples: [
      {
        title: 'Adult Male Body Composition Estimate',
        scenario: 'A man stands 70 inches tall, weighs 175 lbs, and measures a 34-inch waist and 15-inch neck.',
        inputs: {
          'Height': '70 in',
          'Weight': '175 lbs',
          'Waist': '34 in',
          'Neck': '15 in'
        },
        steps: [
          'Waist minus Neck = 34 - 15 = 19 in',
          'log₁₀(19) = 1.2788 and log₁₀(70) = 1.8451',
          'BF% = (86.010 × 1.2788) - (70.041 × 1.8451) + 36.76 = 17.5%',
          'Fat Mass = 175 × 0.1751 = 30.6 lbs; Lean Mass = 175 - 30.6 = 144.4 lbs'
        ],
        result: 'Body Fat: 17.5% (30.6 lbs Fat / 144.4 lbs Lean)',
        takeaway: 'Monitoring waist-to-neck change alongside body weight reveals fat loss even when muscle gain keeps scale weight steady.'
      }
    ],
    understandingResults:
      'Compare your percentage against American Council on Exercise (ACE) fitness brackets: for men, Essential Fat is 2%–5%, Athletes 6%–13%, Fitness 14%–17%, Average 18%–24%, and Obese 25%+; for women, Essential Fat is 10%–13%, Athletes 14%–20%, Fitness 21%–24%, Average 25%–31%, and Obese 32%+. Measure under consistent conditions—morning, fasted, and relaxed—to track genuine trends over 4-week intervals.',
    useCases: [
      {
        title: 'Body Recomposition Tracking',
        description: 'Confirm whether scale stability reflects simultaneous fat loss and lean muscle retention.',
        targetAudience: 'Strength Athletes & Gym-Goers',
        benefits: ['Separates fat mass from lean mass', 'Zero equipment beyond a tape measure', 'Tracks waist reduction objectively']
      },
      {
        title: 'Military & Readiness Screening',
        description: 'Pre-check U.S. military body composition circumference standards before physical readiness tests.',
        targetAudience: 'Service Members & Candidates',
        benefits: ['Uses official Navy equations', 'Supports imperial and metric inputs', 'Instant lean mass readout']
      }
    ],
    faqs: [
      {
        question: 'How accurate is the U.S. Navy body fat method?',
        answer: 'For most adults, the Navy method falls within 3% to 4% of DEXA or hydrostatic weighing when measurements are taken consistently on relaxed skin.'
      },
      {
        question: 'Why does the female formula include hip circumference?',
        answer: 'Women naturally carry a higher proportion of subcutaneous fat around the hips and pelvis, so including hip circumference improves estimation accuracy.'
      },
      {
        question: 'Should I suck in my stomach while measuring my waist?',
        answer: 'No. Breathe normally and measure after a gentle exhale with the tape flat against the skin without indenting it.'
      }
    ],
    importantNotes: [
      'Take each circumference measurement three times and use the average to minimize tape placement error.',
      'For clinical diagnosis of obesity or metabolic risk, consult a healthcare professional or request a DEXA scan.'
    ]
  },

  'bmr-calculator': {
    introduction:
      'Even if you stayed completely motionless in bed for 24 hours, your body would burn significant energy powering your brain, heart, lungs, liver, kidneys, and cellular repair. That baseline energy requirement is your Basal Metabolic Rate (BMR).\n\nThe BMR Calculator computes your resting daily calorie burn across three respected physiological equations—Mifflin-St Jeor, Revised Harris-Benedict, and Katch-McArdle—while scaling your BMR into daily maintenance calories across five activity tiers.',
    howItWorks: {
      summary:
        'The calculator converts height and weight to metric units if needed, evaluates Mifflin-St Jeor and Revised Harris-Benedict from weight, height, age, and sex, optionally evaluates Katch-McArdle using body fat percentage, and multiplies Mifflin-St Jeor BMR by standard activity factors.',
      steps: [
        {
          title: '1. Enter Biometrics & Optional Body Fat',
          detail: 'Provide age, biological sex, height, and weight. Add your estimated body fat percentage if you want to compare lean-mass-based Katch-McArdle.'
        },
        {
          title: '2. Compute Mifflin-St Jeor & Harris-Benedict',
          detail: 'The tool calculates your baseline resting calorie burn using both modern Mifflin-St Jeor (1990) and Revised Harris-Benedict (1984) equations.'
        },
        {
          title: '3. Evaluate Katch-McArdle (LBM Method)',
          detail: 'Using body fat %, Lean Body Mass is derived as Weight × (1 - BodyFat%) to estimate resting burn independently of age or sex.'
        },
        {
          title: '4. View Activity-Scaled Maintenance Calories',
          detail: 'Review daily calorie estimates from Sedentary (1.2×) through Extra Active (1.9×) based on your primary BMR.'
        }
      ],
      keyAssumptions: [
        'Represents energy burn in a fasted, thermoneutral, fully resting wakeful state.',
        'Mifflin-St Jeor is treated as the default clinical benchmark for general adults.',
        'Thyroid conditions, severe caloric restriction, and extreme muscle mass can shift true BMR.'
      ]
    },
    formula: {
      title: 'Mifflin-St Jeor, Revised Harris-Benedict & Katch-McArdle',
      equation: 'Mifflin-St Jeor: BMR = 10W + 6.25H - 5A + s  (s = +5 men, -161 women) | Katch-McArdle: BMR = 370 + 21.6 × LBM',
      variables: [
        { symbol: 'W', name: 'Body Weight', description: 'Total body weight converted to kilograms', unit: 'kg' },
        { symbol: 'H', name: 'Height', description: 'Standing height converted to centimeters', unit: 'cm' },
        { symbol: 'A', name: 'Age', description: 'Chronological age in years', unit: 'Years' },
        { symbol: 'LBM', name: 'Lean Body Mass', description: 'Weight × (1 - Body Fat % / 100)', unit: 'kg' }
      ],
      explanation:
        'Mifflin-St Jeor improves upon the older 1919 Harris-Benedict equation for modern populations, while Katch-McArdle is often preferred by lean athletes because skeletal muscle tissue is more metabolically active than adipose tissue.'
    },
    examples: [
      {
        title: '32-Year-Old Active Male BMR',
        scenario: 'A 32-year-old man weighs 80 kg, stands 180 cm tall, and exercises moderately 3–5 days per week.',
        inputs: {
          'Weight': '80 kg',
          'Height': '180 cm',
          'Age': '32 years',
          'Activity Multiplier': '1.55 (Moderate)'
        },
        steps: [
          'Mifflin-St Jeor: BMR = (10 × 80) + (6.25 × 180) - (5 × 32) + 5',
          'BMR = 800 + 1,125 - 160 + 5 = 1,770 kcal/day',
          'Moderate Maintenance (TDEE) = 1,770 × 1.55 = 2,744 kcal/day'
        ],
        result: 'Resting BMR: 1,770 kcal/day | Moderate Maintenance: 2,744 kcal/day',
        takeaway: 'Never set a weight-loss calorie intake below your BMR for extended periods without medical guidance; use TDEE minus 300–500 kcal instead.'
      }
    ],
    understandingResults:
      'Your BMR is your physiological floor—the energy needed strictly for vital organ function—not your weight-loss calorie target. To estimate how much you actually burn in a normal day, look at the activity-multiplied figures (from 1.2× sedentary up to 1.9× extra active). If you know your body fat percentage and carry above-average muscle mass, pay closer attention to the Katch-McArdle reading.',
    useCases: [
      {
        title: 'Setting a Safe Calorie Floor',
        description: 'Avoid overly aggressive crash diets by anchoring minimum nutrition above resting metabolic needs.',
        targetAudience: 'Nutrition Coaches & Dieters',
        benefits: ['Preserves lean muscle mass', 'Compares three validated equations', 'Maps directly to activity tiers']
      },
      {
        title: 'Athletic Fueling Baseline',
        description: 'Cross-check Katch-McArdle BMR against Mifflin-St Jeor when lean mass is higher than average.',
        targetAudience: 'Athletes & Bodybuilders',
        benefits: ['Accounts for lean body mass', 'Avoids underfueling high-muscle frames', 'Guides recovery nutrition']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between BMR and RMR?',
        answer: 'BMR is measured under strict clinical fasting and resting conditions, whereas Resting Metabolic Rate (RMR) is measured under slightly less restrictive conditions and is typically 5%–10% higher.'
      },
      {
        question: 'Which BMR formula should I trust most?',
        answer: 'For most adults, Mifflin-St Jeor has the highest clinical validation. If you have an accurate body fat percentage measurement and high muscle mass, Katch-McArdle is also very useful.'
      },
      {
        question: 'Why does BMR decrease as we age?',
        answer: 'Both natural declines in lean muscle mass and slight reductions in organ metabolic rate lower resting energy expenditure by roughly 1%–2% per decade after age 20.'
      }
    ],
    importantNotes: [
      'BMR does not include movement, digestion (thermic effect of food), or structured workouts.',
      'Individual metabolism can vary by ±5%–10% around formula predictions.'
    ]
  },

  'ideal-weight-calculator': {
    introduction:
      'Because healthy bodies vary widely in bone density, frame width, and muscle development, no single target weight applies to everyone of a given height. Clinicians historically developed several height-and-sex equations to estimate dosing weights and reference body weights.\n\nThe Ideal Weight Calculator evaluates four widely cited clinical formulas—Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964)—alongside the World Health Organization healthy BMI weight corridor (18.5 to 24.9 kg/m²). It helps you understand a realistic target weight span rather than chasing an arbitrary number.',
    howItWorks: {
      summary:
        'The calculator converts your height into total inches above 5 feet (60 inches), runs all four medical ideal body weight (IBW) equations for your biological sex, averages them into a consensus figure, and computes the weight range matching a 18.5–24.9 BMI.',
      steps: [
        {
          title: '1. Enter Height & Biological Sex',
          detail: 'Input height in feet/inches or centimeters and select Male or Female.'
        },
        {
          title: '2. Determine Inches Over 5 Feet',
          detail: 'All four clinical formulas use 60 inches (5 ft) as the base anchor and add a fixed weight increment for every additional inch.'
        },
        {
          title: '3. Compute All Four IBW Equations',
          detail: 'The tool calculates Devine, Robinson, Miller, and Hamwi estimates simultaneously and computes their mean as the consensus target.'
        },
        {
          title: '4. Cross-Check Against Healthy BMI Range',
          detail: 'Your height in meters squared is multiplied by 18.5 and 24.9 to show the full WHO healthy weight range.'
        }
      ],
      keyAssumptions: [
        'Designed for adult heights roughly 5 ft (152 cm) and taller; shorter heights use adjusted linear scaling.',
        'Formulas assume average bone frame and typical non-athlete muscle mass.',
        'Intended as a statistical reference, not a strict diagnostic requirement.'
      ]
    },
    formula: {
      title: 'Clinical Ideal Body Weight Equations (Height in inches over 5 ft)',
      equation: 'Devine: 50 + 2.3×Δin (M) / 45.5 + 2.3×Δin (F) | Robinson: 52 + 1.9×Δin (M) / 49 + 1.7×Δin (F)',
      variables: [
        { symbol: 'Δin', name: 'Inches Over 5 Feet', description: 'Total standing height in inches minus 60 inches', unit: 'Inches' },
        { symbol: 'Miller', name: 'Miller (1983)', description: '56.2 + 1.41×Δin (Men) | 53.1 + 1.36×Δin (Women)', unit: 'kg' },
        { symbol: 'Hamwi', name: 'Hamwi (1964)', description: '48.0 + 2.7×Δin (Men) | 45.5 + 2.2×Δin (Women)', unit: 'kg' },
        { symbol: 'BMI Range', name: 'Healthy Weight Corridor', description: '18.5 × H(m)² to 24.9 × H(m)²', unit: 'kg' }
      ],
      explanation:
        'Originally created for pharmacokinetic drug dosing and nutritional assessment, these equations often differ by several kilograms because each cohort had different average builds. Averaging all four provides a balanced midpoint inside the healthy BMI band.'
    },
    examples: [
      {
        title: '5 ft 10 in Adult Male Reference Weight',
        scenario: 'Calculate consensus ideal weight and healthy BMI range for a 5 ft 10 in (70 inches / 177.8 cm) male.',
        inputs: {
          'Height': '5 ft 10 in (70 in)',
          'Inches Over 5 ft (Δin)': '10 inches',
          'Sex': 'Male'
        },
        steps: [
          'Devine = 50.0 + (2.3 × 10) = 73.0 kg',
          'Robinson = 52.0 + (1.9 × 10) = 71.0 kg',
          'Miller = 56.2 + (1.41 × 10) = 70.3 kg; Hamwi = 48.0 + (2.7 × 10) = 75.0 kg',
          'Consensus Mean = (73.0 + 71.0 + 70.3 + 75.0) / 4 = 72.3 kg (159.4 lbs)'
        ],
        result: 'Consensus Target: 72.3 kg (159.4 lbs) | Healthy BMI Span: 129–173 lbs',
        takeaway: 'Notice that the consensus weight sits comfortably inside the broader 129–173 lb healthy BMI window, allowing flexibility for frame size and muscle.'
      }
    ],
    understandingResults:
      'Treat the consensus number as a statistical midpoint rather than a pass/fail score. Muscular individuals or people with broader bone frames naturally sit near the upper edge of the Healthy BMI Range, whereas smaller-framed individuals sit comfortably toward the lower half. Always pair weight goals with waist circumference and strength metrics.',
    useCases: [
      {
        title: 'Realistic Goal Setting',
        description: 'Establish a sensible long-term weight milestone backed by established medical reference ranges.',
        targetAudience: 'Adults Planning Weight Management',
        benefits: ['Eliminates unrealistic weight targets', 'Shows both single midpoint and healthy corridor', 'Supports lbs and kg output']
      },
      {
        title: 'Clinical & Nutritional Comparison',
        description: 'Compare how different standard equations (Devine vs. Hamwi vs. Miller) vary for a patient height.',
        targetAudience: 'Dietitians & Students',
        benefits: ['Displays all four equations side by side', 'Instant unit conversion', 'Includes WHO BMI span']
      }
    ],
    faqs: [
      {
        question: 'Why do the four formulas give slightly different weights?',
        answer: 'Each formula was derived in a different decade from different study populations and statistical fits, leading to variations of roughly 2 to 5 kg for the same height.'
      },
      {
        question: 'What if I am very muscular and weigh more than my ideal weight?',
        answer: 'Standard IBW formulas do not measure body fat percentage. Athletes with significant lean muscle should prioritize body fat % and waist measurements instead.'
      }
    ],
    importantNotes: [
      'Not intended for children, adolescents, or pregnant women.',
      'Health markers such as blood pressure, lipids, and waist circumference matter more than hitting an exact scale number.'
    ]
  },

  'pregnancy-calculator': {
    introduction:
      'Pregnancy is clinically measured from the first day of your Last Menstrual Period (LMP) rather than the date of conception, which adds roughly two weeks before ovulation even occurs. Adjusting for menstrual cycles longer or shorter than 28 days makes gestational dating noticeably more accurate.\n\nThe Pregnancy Calculator uses your LMP and typical cycle length to estimate your due date (EDD), probable conception date, current gestational age in weeks and days, active trimester, and progress percentage.',
    howItWorks: {
      summary:
        'The calculator applies modified Naegele’s Rule by adding 280 days plus any cycle-length deviation from 28 days to your Last Menstrual Period, then compares that timeline to today’s date to compute gestational age and trimester.',
      steps: [
        {
          title: '1. Enter First Day of Last Period (LMP)',
          detail: 'Select the date your most recent menstrual period began.'
        },
        {
          title: '2. Adjust for Average Cycle Length',
          detail: 'Enter your typical cycle duration (21 to 40 days); the calculator shifts ovulation and due date by (Cycle Length − 28) days.'
        },
        {
          title: '3. Compute Conception & Due Date (EDD)',
          detail: 'Conception is estimated at Day 14 plus the cycle offset, while total pregnancy duration is 280 days plus the cycle offset from LMP.'
        },
        {
          title: '4. Determine Current Week, Trimester & Progress',
          detail: 'Elapsed days since adjusted LMP yield your gestational age (weeks + days), countdown to delivery, and Trimester 1, 2, or 3 status.'
        }
      ],
      keyAssumptions: [
        'Luteal phase is assumed to last approximately 14 days following ovulation.',
        'A full-term pregnancy spans 40 weeks (280 days) from a 28-day cycle LMP.',
        'First-trimester ultrasound crown-rump length (CRL) may later refine clinical dating.'
      ]
    },
    formula: {
      title: 'Cycle-Adjusted Naegele Pregnancy Timeline',
      equation: 'EDD = LMP + 280 + (CycleLength - 28) days | Gestational Age = Today - [LMP + (CycleLength - 28)]',
      variables: [
        { symbol: 'LMP', name: 'Last Menstrual Period', description: 'First day of the last menstrual bleeding', unit: 'Date' },
        { symbol: 'CycleLength', name: 'Menstrual Cycle Length', description: 'Average days from Day 1 of one period to the next', unit: 'Days' },
        { symbol: 'EDD', name: 'Estimated Due Date', description: 'Projected 40-week delivery milestone', unit: 'Date' }
      ],
      explanation:
        'Because ovulation shifts later in longer cycles and earlier in shorter cycles, adjusting LMP by (CycleLength − 28) days keeps the post-ovulation gestation consistently at 266 days (38 weeks).'
    },
    examples: [
      {
        title: 'Cycle-Adjusted Due Date (32-Day Cycle)',
        scenario: 'LMP started on January 1 (non-leap year) with a regular 32-day menstrual cycle.',
        inputs: {
          'LMP Date': 'January 1',
          'Average Cycle': '32 days'
        },
        steps: [
          'Cycle adjustment = 32 - 28 = +4 days',
          'Estimated Conception Date = Jan 1 + 14 + 4 = January 19',
          'Estimated Due Date = Jan 1 + 280 + 4 = October 12',
          'On April 1 (90 days after Jan 1), adjusted gestational days = 90 - 4 = 86 days (12 weeks, 2 days)'
        ],
        result: 'Due Date: October 12 | Gestational Age on Apr 1: 12w 2d (Trimester 1)',
        takeaway: 'Accounting for a 32-day cycle prevents prematurely labeling a pregnancy overdue by four days.'
      }
    ],
    understandingResults:
      'Trimester 1 spans Weeks 1–12, Trimester 2 spans Weeks 13–26, and Trimester 3 runs from Week 27 through Week 40+. Only about 4%–5% of babies arrive on the exact Estimated Due Date, while most spontaneous deliveries happen between 37 and 42 weeks. Share this calculation with your OB/GYN or midwife alongside early ultrasound measurements.',
    useCases: [
      {
        title: 'Prenatal Appointment Prep',
        description: 'Know your exact gestational week and trimester ahead of prenatal screenings and glucose tests.',
        targetAudience: 'Expectant Parents',
        benefits: ['Accounts for non-28-day cycles', 'Tracks trimester transitions', 'Estimates countdown days']
      },
      {
        title: 'Maternity Leave Planning',
        description: 'Forecast approximate delivery windows to coordinate parental leave and family schedules.',
        targetAudience: 'Working Parents',
        benefits: ['Clear milestone timeline', 'Instant percent progress', 'No manual calendar counting']
      }
    ],
    faqs: [
      {
        question: 'Why does gestational age start two weeks before conception?',
        answer: 'Clinicians historically anchor pregnancy to LMP because the first day of a period is usually known accurately, whereas the exact hour of ovulation and fertilization is rarely observed.'
      },
      {
        question: 'When might my doctor change my due date?',
        answer: 'If a first-trimester ultrasound differs from LMP dating by more than 5 to 7 days, clinicians typically update the official due date based on the ultrasound measurement.'
      }
    ],
    importantNotes: [
      'Always confirm your official estimated due date with a licensed obstetric clinician.',
      'Normal full-term delivery spans 37 to 41+ weeks.'
    ]
  },

  'due-date-calculator': {
    introduction:
      'Depending on how far along you are or how you conceived, you may have more reliable information than just your last period—such as a known conception date, an early ultrasound scan, or an IVF embryo transfer date.\n\nThe Due Date Calculator supports all four clinical dating methods (Last Menstrual Period, Conception Date, Ultrasound Dating, and Day-3/Day-5 IVF Transfer) so you can estimate your baby’s Estimated Due Date (EDD), current gestational week, and countdown.',
    howItWorks: {
      summary:
        'Each dating mode converts your chosen milestone into an equivalent 280-day gestational anchor date and computes the remaining countdown and current gestational age in weeks and days.',
      steps: [
        {
          title: '1. Select Your Dating Method',
          detail: 'Choose LMP, Conception Date, Ultrasound Scan, or IVF Transfer depending on the clinical data you have.'
        },
        {
          title: '2. Enter Reference Date & Method Details',
          detail: 'Provide cycle length (for LMP), gestational age measured at scan (for Ultrasound), or Day 3 vs. Day 5 embryo age (for IVF).'
        },
        {
          title: '3. Project the 40-Week Anchor',
          detail: 'The tool adds 280 days (adjusted for cycle) from LMP, 266 days from conception, (280 − scan age) days from ultrasound, or 263/261 days from IVF transfer.'
        },
        {
          title: '4. Read Current Progress & Trimester',
          detail: 'View your Estimated Due Date, remaining days until delivery, and current gestational week and trimester.'
        }
      ],
      keyAssumptions: [
        'Standard human gestation averages 266 days from fertilization (38 weeks) or 280 days from a 28-day LMP (40 weeks).',
        'IVF Day-3 transfers subtract 3 days from 266 (+263 days); Day-5 blastocyst transfers subtract 5 days (+261 days).',
        'Ultrasound dating uses the gestational weeks and days recorded on your scan report.'
      ]
    },
    formula: {
      title: 'Multi-Method Estimated Due Date (EDD) Equations',
      equation: 'LMP: +280 + (Cycle-28)d | Conception: +266d | Ultrasound: Scan + (280 - ScanDays)d | IVF: +263d (D3) / +261d (D5)',
      variables: [
        { symbol: 'EDD', name: 'Estimated Due Date', description: 'Projected 40w 0d birth date', unit: 'Date' },
        { symbol: 'ScanDays', name: 'Ultrasound Gestational Days', description: '(ScanWeeks × 7) + ScanExtraDays', unit: 'Days' },
        { symbol: 'D3 / D5', name: 'IVF Embryo Age', description: 'Embryo culture days prior to uterine transfer', unit: 'Days' }
      ],
      explanation:
        'All four methods align to the same 280-day clinical clock: IVF and conception methods bypass cycle variability, while ultrasound dating directly measures fetal size.'
    },
    examples: [
      {
        title: 'Day-5 IVF Blastocyst Transfer',
        scenario: 'An IVF patient undergoes a Day-5 blastocyst transfer on April 1 (non-leap year).',
        inputs: {
          'Dating Method': 'IVF Transfer',
          'Transfer Date': 'April 1',
          'Embryo Type': 'Day 5 Blastocyst'
        },
        steps: [
          'Days from fertilization to full term = 266 days',
          'Subtract 5 days already cultured prior to transfer: 266 - 5 = 261 days',
          'April 1 + 261 days = December 18'
        ],
        result: 'Estimated Due Date: December 18',
        takeaway: 'IVF transfer dates offer the highest calendar precision because embryo age is known down to the exact day.'
      }
    ],
    understandingResults:
      'Your Estimated Due Date marks 40 weeks and 0 days of gestation. Compare your due date across methods—if you underwent an IVF transfer or early 8–10 week ultrasound, clinicians usually treat those dates as more precise than LMP alone.',
    useCases: [
      {
        title: 'IVF & Fertility Treatment Dating',
        description: 'Compute exact Day-3 or Day-5 embryo transfer due dates without relying on LMP.',
        targetAudience: 'IVF Parents & Clinics',
        benefits: ['Exact 263-day and 261-day offsets', 'Eliminates cycle-length guesswork', 'Shows active gestational week']
      },
      {
        title: 'Ultrasound Cross-Checking',
        description: 'Translate a sonographer’s gestational age readout (e.g., 10w 3d) directly into a calendar EDD.',
        targetAudience: 'Expectant Parents',
        benefits: ['Fast verification after scans', 'Tracks remaining days', 'Identifies trimester automatically']
      }
    ],
    faqs: [
      {
        question: 'Which due date method is the most accurate?',
        answer: 'IVF transfer dating is mathematically exact, followed closely by first-trimester ultrasound measurements (within ~3–5 days).'
      },
      {
        question: 'What if my ultrasound due date differs slightly from my LMP due date?',
        answer: 'Differences of a few days are common because ovulation timing varies. Your clinician will advise which date is used in your chart.'
      }
    ],
    importantNotes: [
      'Due dates are statistical anchors; healthy spontaneous births commonly occur from 37 to 42 weeks.',
      'Consult your OB/GYN before making any clinical scheduling decisions.'
    ]
  },

  'ovulation-calculator': {
    introduction:
      'Fertility peaks during a narrow window each menstrual cycle—roughly the five days leading up to ovulation (when sperm can survive in cervical mucus) plus ovulation day itself, when the released egg remains viable for 12–24 hours.\n\nThe Ovulation & Fertility Calculator estimates your next ovulation date, six-day fertile window, pregnancy test day, and a three-cycle forward calendar based on your Last Menstrual Period (LMP), cycle length, and luteal phase duration.',
    howItWorks: {
      summary:
        'Using the physiological rule that the post-ovulation luteal phase stays relatively constant for each woman (typically 12–16 days, defaulting to 14), the calculator subtracts luteal length from total cycle length to pinpoint the ovulation offset from LMP.',
      steps: [
        {
          title: '1. Enter LMP, Cycle Length & Luteal Phase',
          detail: 'Input the first day of your last period, average cycle length (21–40 days), and luteal phase length (10–16 days, default 14).'
        },
        {
          title: '2. Calculate Ovulation Day Offset',
          detail: 'Ovulation day is determined by subtracting your luteal phase from your cycle length (with a minimum offset of 7 days).'
        },
        {
          title: '3. Map the 6-Day Fertile Window',
          detail: 'The tool identifies the five days immediately before ovulation plus ovulation day itself as your highest-probability fertile window.'
        },
        {
          title: '4. Project 3 Upcoming Cycles',
          detail: 'View your expected next period start date, recommended home pregnancy test day, and a three-cycle forecast table.'
        }
      ],
      keyAssumptions: [
        'Menstrual cycles are relatively regular around your entered average length.',
        'Standard luteal phase defaults to 14 days unless adjusted based on basal body temperature (BBT) or OPK history.',
        'This tool is for conception timing, not contraception.'
      ]
    },
    formula: {
      title: 'Luteal-Adjusted Ovulation & Fertile Window',
      equation: 'Ovulation Day = LMP + max(7, CycleLength - LutealPhase) | Fertile Window = [Ovulation - 5d, Ovulation]',
      variables: [
        { symbol: 'LMP', name: 'Last Menstrual Period', description: 'Cycle Day 1 (first day of full menstrual flow)', unit: 'Date' },
        { symbol: 'CycleLength', name: 'Cycle Length', description: 'Average number of days from period to period', unit: 'Days' },
        { symbol: 'LutealPhase', name: 'Luteal Phase', description: 'Days from ovulation to the start of the next period', unit: 'Days' }
      ],
      explanation:
        'Counting backward from the next expected period by the luteal phase length is far more reliable than assuming everyone ovulates on Cycle Day 14, especially for shorter or longer cycles.'
    },
    examples: [
      {
        title: '30-Day Cycle Fertility Timing',
        scenario: 'Last period began on May 1 with a regular 30-day cycle and standard 14-day luteal phase.',
        inputs: {
          'LMP Date': 'May 1',
          'Cycle Length': '30 days',
          'Luteal Phase': '14 days'
        },
        steps: [
          'Ovulation Offset = max(7, 30 - 14) = 16 days after May 1',
          'Estimated Ovulation Date = May 1 + 16 days = May 17',
          'Fertile Window (5 days prior to ovulation day) = May 12 to May 17',
          'Next Expected Period = May 1 + 30 days = May 31'
        ],
        result: 'Ovulation: May 17 | Fertile Window: May 12 – May 17',
        takeaway: 'In a 30-day cycle, peak fertility falls on Cycle Days 12–17 rather than the textbook Days 9–14.'
      }
    ],
    understandingResults:
      'Conception probability is highest during the 2–3 days immediately preceding and including your predicted ovulation day. Because stress, illness, or travel can shift ovulation earlier or later in any given cycle, combine calendar estimates with ovulation predictor kits (LH strips) or cervical mucus tracking for maximum precision.',
    useCases: [
      {
        title: 'Conception Planning',
        description: 'Identify the highest-probability days across the next three months when trying to conceive.',
        targetAudience: 'Couples Trying to Conceive',
        benefits: ['Custom luteal phase input', '3-cycle forward calendar', 'Pregnancy test timing guidance']
      },
      {
        title: 'Cycle Pattern Awareness',
        description: 'Understand how 25-day or 34-day cycles shift ovulation timing relative to Day 1.',
        targetAudience: 'Women Tracking Cycle Health',
        benefits: ['Avoids generic Day-14 assumptions', 'Forecasts upcoming periods', 'Supports irregular cycle adjustments']
      }
    ],
    faqs: [
      {
        question: 'Can this calculator be used as birth control?',
        answer: 'No. Ovulation can shift unexpectedly from cycle to cycle, making calendar predictions unsuitable as a standalone method of contraception.'
      },
      {
        question: 'When is the best time to take a pregnancy test?',
        answer: 'Waiting until the day of your missed next period (around 14 days after ovulation) provides the highest accuracy for home urine hCG tests.'
      }
    ],
    importantNotes: [
      'Natural variation of ±2 days in ovulation timing is normal even in healthy regular cycles.',
      'Consult a healthcare provider or fertility specialist if cycles are consistently under 21 or over 35 days.'
    ]
  },

  'water-intake-calculator': {
    introduction:
      'Proper hydration supports blood volume, thermoregulation, joint lubrication, cognitive focus, and athletic endurance—yet the old "eight glasses a day" rule ignores wide differences in body size, workout duration, climate, and physiological demand.\n\nThe Water Intake Calculator estimates your personalized daily fluid requirement in fluid ounces, liters, milliliters, and 8-oz glasses by combining your baseline body weight needs with adjustments for exercise minutes, ambient temperature, and pregnancy or breastfeeding.',
    howItWorks: {
      summary:
        'The calculator starts with a body-weight baseline of 0.55 fluid ounces per pound, adds 12 oz per 30 minutes of daily exercise, adds climate fluid allowances for hot environments, and includes maternal hydration needs if selected.',
      steps: [
        {
          title: '1. Enter Body Weight & Unit',
          detail: 'Input your weight in pounds or kilograms (kilograms are automatically converted at 2.20462 lbs/kg).'
        },
        {
          title: '2. Add Daily Exercise Minutes',
          detail: 'Specify average daily workout time to account for sweat loss at 12 fl oz per 30 minutes of activity.'
        },
        {
          title: '3. Select Climate & Life Stage',
          detail: 'Indicate moderate, hot, or very hot/humid weather and select pregnancy (+10 oz) or breastfeeding (+24 oz) if applicable.'
        },
        {
          title: '4. View Fluid Equivalents',
          detail: 'Review total daily hydration in fluid ounces, milliliters, liters, and 8-oz glasses, broken down by base vs. add-ons.'
        }
      ],
      keyAssumptions: [
        'Total fluid recommendation includes drinking water plus fluids from beverages and water-rich foods (~20% typical dietary moisture).',
        'Uses a baseline of 0.55 fl oz per pound of body weight for moderate adults.',
        'Heavy sweating in endurance sports may require additional sodium and electrolyte replacement.'
      ]
    },
    formula: {
      title: 'Personalized Daily Hydration Formula',
      equation: 'Total (fl oz) = (Weight_lbs × 0.55) + (Exercise_min / 30 × 12) + Climate_Add + Condition_Add',
      variables: [
        { symbol: 'Weight_lbs', name: 'Body Weight', description: 'User weight in pounds (or kg × 2.20462)', unit: 'lbs' },
        { symbol: 'Exercise_min', name: 'Daily Activity', description: 'Average minutes of exercise per day (+12 oz per 30 min)', unit: 'Minutes' },
        { symbol: 'Climate_Add', name: 'Heat Allowance', description: '0 oz (Moderate), +16 oz (Hot), +24 oz (Very Hot)', unit: 'fl oz' },
        { symbol: 'Condition_Add', name: 'Maternal Adjustment', description: '0 oz (None), +10 oz (Pregnant), +24 oz (Breastfeeding)', unit: 'fl oz' }
      ],
      explanation:
        'Once total fluid ounces are summed, multiplying by 29.5735 yields milliliters (÷ 1,000 for liters) and dividing by 8 gives standard 8-oz cup servings.'
    },
    examples: [
      {
        title: 'Active Adult in Moderate Climate',
        scenario: 'A 160-lb adult exercises 45 minutes daily in a moderate climate.',
        inputs: {
          'Weight': '160 lbs',
          'Exercise': '45 min/day',
          'Climate': 'Moderate',
          'Condition': 'None'
        },
        steps: [
          'Base hydration = 160 × 0.55 = 88.0 fl oz',
          'Exercise adjustment = (45 / 30) × 12 = 18.0 fl oz',
          'Total daily fluids = 88 + 18 + 0 + 0 = 106 fl oz',
          'Metric & Glass conversions: 106 × 29.5735 = 3,135 mL (3.13 L) ≈ 13 glasses (8 oz)'
        ],
        result: '106 fl oz/day (3.13 Liters / ~13 Glasses)',
        takeaway: 'About 20% of daily water comes from food, so roughly 85 oz (~2.5 L) of pure beverages covers the target.'
      }
    ],
    understandingResults:
      'Spread your target steadily from morning through early evening rather than chugging large amounts late at night. Pale, straw-colored urine is a reliable practical sign of good hydration; completely clear urine can mean you are over-drinking relative to electrolytes. Individuals with kidney, heart, or fluid-restriction conditions should follow physician targets.',
    useCases: [
      {
        title: 'Workout & Heat Hydration Planning',
        description: 'Adjust fluid targets upward on intense training days or hot summer afternoons.',
        targetAudience: 'Runners, Cyclists & Outdoor Workers',
        benefits: ['Accounts for sweat loss', 'Outputs liters and bottle counts', 'Supports hot climate adjustment']
      },
      {
        title: 'Daily Wellness Habit Building',
        description: 'Translate an abstract liter goal into simple 8-oz glasses or reusable bottle refills.',
        targetAudience: 'General Wellness Users',
        benefits: ['Easy bottle planning', 'Instant oz/L conversion', 'Includes pregnancy/nursing allowances']
      }
    ],
    faqs: [
      {
        question: 'Do coffee, tea, and food count toward daily water intake?',
        answer: 'Yes. Plain water is ideal, but herbal teas, moderate coffee, milk, and water-rich fruits and vegetables all contribute to total daily fluid intake.'
      },
      {
        question: 'Can you drink too much water?',
        answer: 'Yes. Drinking excessive plain water very rapidly without electrolytes can dilute blood sodium (hyponatremia), particularly during long endurance events.'
      }
    ],
    importantNotes: [
      'Consult a physician if you have chronic kidney disease, heart failure, or take diuretics.',
      'Replaces general heuristics with weight- and activity-adjusted targets.'
    ]
  },

  'macro-calculator': {
    introduction:
      'Two diets with identical daily calories can produce very different body-composition outcomes depending on how those calories are divided among protein, carbohydrates, and fats. Protein preserves lean muscle and increases satiety, carbohydrates fuel high-intensity workouts, and dietary fats support hormone synthesis and vitamin absorption.\n\nThe Macro Calculator combines the Mifflin-St Jeor TDEE engine with goal-based calorie adjustments and macro percentage splits to compute your exact daily gram targets for Protein, Carbohydrates, and Fat.',
    howItWorks: {
      summary:
        'The calculator computes your maintenance calories (BMR × Activity Multiplier), applies your selected goal adjustment (Weight Loss, Lean Bulk, or Maintenance), and divides target calories across Protein (4 kcal/g), Carbs (4 kcal/g), and Fat (9 kcal/g).',
      steps: [
        {
          title: '1. Enter Personal Metrics & Activity Level',
          detail: 'Input age, sex, height, weight, and weekly activity tier so the engine can establish your TDEE maintenance baseline.'
        },
        {
          title: '2. Choose Fitness Goal',
          detail: 'Select fat loss (caloric deficit), maintenance, or muscle gain (caloric surplus) to set daily target calories.'
        },
        {
          title: '3. Select or Customize Macro Split',
          detail: 'Apply your preferred Protein, Carbohydrate, and Fat calorie percentages totaling 100%.'
        },
        {
          title: '4. Convert Calories to Daily Grams',
          detail: 'Protein and Carb calories are divided by 4 kcal/g, and Fat calories are divided by 9 kcal/g to produce food-label targets.'
        }
      ],
      keyAssumptions: [
        'Uses Atwater energy factors: 4 kcal/g protein, 4 kcal/g carbohydrate, 9 kcal/g fat.',
        'Macro ratios represent daily energy shares before alcohol or fiber adjustments.',
        'Targets should be tracked over multi-week averages rather than stressing over a single gram.'
      ]
    },
    formula: {
      title: 'Calorie-to-Macronutrient Gram Conversion',
      equation: 'Protein (g) = (TargetKcal × P%) / 4 | Carbs (g) = (TargetKcal × C%) / 4 | Fat (g) = (TargetKcal × F%) / 9',
      variables: [
        { symbol: 'TargetKcal', name: 'Daily Goal Calories', description: 'TDEE adjusted for fat loss deficit or muscle surplus', unit: 'kcal/day' },
        { symbol: 'P%, C%, F%', name: 'Macro Ratios', description: 'Percentage of daily calories allocated to each nutrient', unit: 'Percent' },
        { symbol: '4 / 4 / 9', name: 'Caloric Density', description: 'Calories per gram (4 for Protein/Carbs, 9 for Fat)', unit: 'kcal/g' }
      ],
      explanation:
        'Because fat contains more than twice as many calories per gram (9 kcal) as protein or carbohydrates (4 kcal), an equal calorie split yields far fewer grams of fat on a food scale.'
    },
    examples: [
      {
        title: 'Balanced Recomposition Macro Targets',
        scenario: 'A user targeting 2,000 kcal/day selects a 30% Protein / 40% Carbs / 30% Fat macro distribution.',
        inputs: {
          'Target Calories': '2,000 kcal',
          'Protein Split': '30%',
          'Carbs Split': '40%',
          'Fat Split': '30%'
        },
        steps: [
          'Protein = (2,000 × 0.30) / 4 = 600 / 4 = 150 g/day',
          'Carbohydrates = (2,000 × 0.40) / 4 = 800 / 4 = 200 g/day',
          'Dietary Fat = (2,000 × 0.30) / 9 = 600 / 9 = 66.7 g/day'
        ],
        result: '150g Protein | 200g Carbs | 67g Fat',
        takeaway: 'Hitting your calorie total and protein gram target within ±5% daily drives the vast majority of body composition results.'
      }
    ],
    understandingResults:
      'Prioritize hitting your Protein target first during a fat-loss phase to protect muscle mass and curb hunger, then distribute remaining calories between Carbs and Fats based on workout energy and food preferences. Avoid dropping dietary fat chronically below 20% of calories to support hormonal health.',
    useCases: [
      {
        title: 'Flexible Dieting & Meal Prep',
        description: 'Convert broad calorie targets into concrete daily protein, carb, and fat gram budgets.',
        targetAudience: 'Fitness Enthusiasts & Bodybuilders',
        benefits: ['Food-label ready gram outputs', 'Supports cutting and bulking', 'Instant macro rebalancing']
      },
      {
        title: 'Athletic Performance Fueling',
        description: 'Increase carbohydrate shares for endurance sports while keeping protein adequate for recovery.',
        targetAudience: 'Runners, Cyclists & CrossFitters',
        benefits: ['Separates fuel carbs from repair protein', 'Aligns with TDEE workload', 'Prevents energy crashes']
      }
    ],
    faqs: [
      {
        question: 'How much protein do I need per pound of body weight?',
        answer: 'Active individuals aiming to build or preserve muscle typically target 0.7 to 1.0 grams of protein per pound of body weight (1.6 to 2.2 g/kg).'
      },
      {
        question: 'Do I have to hit my macro grams exactly to the single gram every day?',
        answer: 'No. Staying within ±5% to 10% of your daily protein and total calorie targets over a weekly average produces reliable results.'
      }
    ],
    importantNotes: [
      'Include dietary fiber (25–38 g/day) within your carbohydrate allowance for digestive and metabolic health.',
      'Consult a registered dietitian for therapeutic diets (renal, diabetes, or ketogenic medical protocols).'
    ]
  },

  'heart-rate-calculator': {
    introduction:
      'Training by feel alone often leads athletes to run their easy days too fast and their hard intervals too slow. Heart rate zone training anchors exercise intensity to cardiovascular strain rather than pace, automatically adjusting for heat, hills, and fatigue.\n\nThe Target Heart Rate Calculator estimates your Maximum Heart Rate (MHR) using both the modern Tanaka formula (208 − 0.7 × Age) and classic Fox formula (220 − Age), then computes five precise aerobic and anaerobic training zones using the Karvonen Heart Rate Reserve (HRR) method.',
    howItWorks: {
      summary:
        'By incorporating your Resting Heart Rate (RHR) via the Karvonen equation, the calculator measures your usable Heart Rate Reserve (Max HR − RHR) rather than using crude percentages of Max HR alone, tailoring zones to your current fitness level.',
      steps: [
        {
          title: '1. Enter Age & Resting Heart Rate',
          detail: 'Input your age in years and your morning Resting Heart Rate (measured before getting out of bed; typical adults range 55–80 bpm).'
        },
        {
          title: '2. Estimate Maximum Heart Rate (MHR)',
          detail: 'The tool calculates MHR primarily with the validated Tanaka equation (208 − 0.7 × Age) and displays Fox (220 − Age) for comparison.'
        },
        {
          title: '3. Compute Heart Rate Reserve (HRR)',
          detail: 'Resting Heart Rate is subtracted from Maximum Heart Rate to determine your active cardiovascular working range.'
        },
        {
          title: '4. Generate Training Zones 1–5',
          detail: 'Each zone (50%–60%, 60%–70%, 70%–80%, 80%–90%, 90%–100% of HRR) is added back to RHR to produce exact target BPM bands.'
        }
      ],
      keyAssumptions: [
        'Tanaka equation provides a general population estimate (individual Max HR can vary ±10–12 bpm).',
        'Beta-blockers or cardiovascular medications lower heart rate and alter zone accuracy.',
        'Resting Heart Rate is measured calmly at rest, ideally upon waking.'
      ]
    },
    formula: {
      title: 'Tanaka Max HR & Karvonen Target Heart Rate Formula',
      equation: 'MHR = 208 - (0.7 × Age) | Target HR = [ (MHR - RHR) × Intensity% ] + RHR',
      variables: [
        { symbol: 'MHR', name: 'Maximum Heart Rate', description: 'Estimated peak beats per minute under maximal exertion', unit: 'bpm' },
        { symbol: 'RHR', name: 'Resting Heart Rate', description: 'Morning pulse at complete rest', unit: 'bpm' },
        { symbol: 'HRR', name: 'Heart Rate Reserve', description: 'MHR minus RHR (usable aerobic working range)', unit: 'bpm' },
        { symbol: 'Intensity%', name: 'Zone Intensity Factor', description: '0.50 to 1.00 depending on Training Zones 1–5', unit: 'Decimal' }
      ],
      explanation:
        'Unlike simple % of Max HR, the Karvonen method rewards improved cardiovascular fitness: as your resting heart rate drops, your Heart Rate Reserve widens and training zones adjust accordingly.'
    },
    examples: [
      {
        title: 'Zone 2 Aerobic Base Calculation (35-Year-Old)',
        scenario: 'A 35-year-old runner has a morning Resting Heart Rate of 60 bpm and wants to find their Zone 2 (60%–70% HRR) fat-burning/aerobic range.',
        inputs: {
          'Age': '35 years',
          'Resting Heart Rate': '60 bpm',
          'Target Zone': 'Zone 2 (60%–70%)'
        },
        steps: [
          'Tanaka Max HR = 208 - (0.7 × 35) = 208 - 24.5 = 183.5 ≈ 184 bpm',
          'Heart Rate Reserve (HRR) = 184 - 60 = 124 bpm',
          'Zone 2 Lower Bound = 60 + (124 × 0.60) = 60 + 74.4 ≈ 134 bpm',
          'Zone 2 Upper Bound = 60 + (124 × 0.70) = 60 + 86.8 ≈ 147 bpm'
        ],
        result: 'Max HR: 184 bpm | Zone 2 Range: 134 – 147 bpm',
        takeaway: 'Keeping easy endurance runs between 134 and 147 bpm builds mitochondrial and capillary density without overtraining.'
      }
    ],
    understandingResults:
      'Use Zone 1 (50%–60%) for active recovery, Zone 2 (60%–70%) for conversational endurance base building (often ~80% of weekly volume), Zone 3 (70%–80%) for tempo efforts, Zone 4 (80%–90%) for lactate threshold intervals, and Zone 5 (90%–100%) for short VO₂ max bursts.',
    useCases: [
      {
        title: 'Zone 2 Endurance Training',
        description: 'Dial in true aerobic base heart rate boundaries for marathon, cycling, or triathlon blocks.',
        targetAudience: 'Runners & Cyclists',
        benefits: ['Personalized via resting heart rate', 'Prevents junk-mile overtraining', 'Uses Tanaka + Karvonen precision']
      },
      {
        title: 'HIIT & Threshold Conditioning',
        description: 'Identify Zone 4 and Zone 5 target peaks for structured interval workouts.',
        targetAudience: 'Fitness Coaches & Athletes',
        benefits: ['Clear 5-zone breakdown', 'Compares Tanaka vs. Fox formulas', 'Guides recovery intervals']
      }
    ],
    faqs: [
      {
        question: 'Why does this calculator prefer Tanaka (208 − 0.7×Age) over 220 − Age?',
        answer: 'Large meta-analyses show that 220 − Age overestimates Max HR in younger adults and underestimates it in older adults, whereas Tanaka tracks measured Max HR more closely across ages.'
      },
      {
        question: 'What if I know my actual field-tested Max HR?',
        answer: 'You can compare your wearable peak during an all-out uphill or 5K finish sprint with the Tanaka reading; individual genetics can vary by ±10 bpm.'
      }
    ],
    importantNotes: [
      'Consult a physician before performing Zone 4–5 maximal exertion workouts if you have cardiovascular risk factors.',
      'Medications such as beta-blockers artificially lower heart rate; use Rate of Perceived Exertion (RPE) alongside HR.'
    ]
  },

  'pace-calculator': {
    introduction:
      'Whether you are preparing for your first 5K or targeting a Boston-qualifying marathon, translating a finish-time goal into an exact per-mile or per-kilometer split is essential for smart race execution.\n\nThe Running Pace & Race Time Calculator takes your workout distance and elapsed time (hours, minutes, seconds) and computes your average pace, hourly speed, and projected finish times across 5K, 10K, Half Marathon, and Marathon distances.',
    howItWorks: {
      summary:
        'The calculator converts your hours, minutes, and seconds into total seconds, divides by distance to obtain pace per unit, computes hourly speed, and scales your kilometer pace across official race distances.',
      steps: [
        {
          title: '1. Enter Distance & Choose Units',
          detail: 'Input your run or walk distance and select Kilometers (km) or Miles (mi).'
        },
        {
          title: '2. Input Elapsed Time',
          detail: 'Specify total hours, minutes, and seconds completed or targeted.'
        },
        {
          title: '3. Compute Pace & Speed',
          detail: 'Total seconds are divided by distance for min:sec per km/mile, and distance is divided by hours for speed.'
        },
        {
          title: '4. Review Race Distance Projections',
          detail: 'Your pace is automatically converted to sec/km (1 mi = 1.60934 km) and multiplied by 5, 10, 21.0975, and 42.195 km.'
        }
      ],
      keyAssumptions: [
        'Splits represent an even, steady pace across the full distance without fade or stoppage.',
        'Half Marathon = 21.0975 km (13.1094 mi); Full Marathon = 42.195 km (26.2188 mi).',
        'Equivalence assumes adequate endurance conditioning for longer race distances.'
      ]
    },
    formula: {
      title: 'Pace, Speed & Race Finish Projection',
      equation: 'Pace (sec/unit) = Total Seconds / Distance | Speed = Distance / (Total Seconds / 3,600)',
      variables: [
        { symbol: 'Total Seconds', name: 'Elapsed Duration', description: '(Hours × 3,600) + (Minutes × 60) + Seconds', unit: 'Seconds' },
        { symbol: 'Distance', name: 'Route Distance', description: 'Run distance in km or miles', unit: 'km or mi' },
        { symbol: 'Pace', name: 'Split Pace', description: 'Formatted as MM:SS per kilometer or mile', unit: 'min/unit' }
      ],
      explanation:
        'Once pace per kilometer is known, multiplying by official race distances projects finish times under identical pacing.'
    },
    examples: [
      {
        title: '5K Run Pace & 10K Split Projection',
        scenario: 'A runner finishes a 5 km race in 28 minutes and 30 seconds.',
        inputs: {
          'Distance': '5 km',
          'Time': '0h 28m 30s'
        },
        steps: [
          'Total Seconds = (28 × 60) + 30 = 1,710 seconds',
          'Pace per km = 1,710 / 5 = 342 seconds = 5:42 / km',
          'Speed = 5 / (1,710 / 3,600) = 5 / 0.475 = 10.53 km/h',
          'Projected 10K at same pace = 342 × 10 = 3,420 s = 57m 00s'
        ],
        result: 'Average Pace: 5:42 / km (10.53 km/h) | Projected 10K: 57m 00s',
        takeaway: 'Setting a GPS watch alert around 5:42/km prevents going out too fast in the first kilometer.'
      }
    ],
    understandingResults:
      'Use your pace split to program treadmill speeds (km/h or mph) or GPS watch pacing bands. Remember that linear race projections assume you have built endurance for the longer distance—a 5K pace usually slows slightly over a Half or Full Marathon due to physiological fatigue.',
    useCases: [
      {
        title: 'Race Day Pacing Strategy',
        description: 'Determine exact km or mile split targets before stepping onto a 5K, 10K, or marathon starting line.',
        targetAudience: 'Road & Trail Runners',
        benefits: ['Instant split math', 'Treadmill speed conversion', 'Official 21.1K and 42.2K projections']
      },
      {
        title: 'Fitness Progress Checks',
        description: 'Compare whether a consistent weekly route is getting faster week over week.',
        targetAudience: 'Walkers & Beginner Runners',
        benefits: ['Supports km and miles', 'No mental time math', 'Clear speed metric']
      }
    ],
    faqs: [
      {
        question: 'Can I sustain my 5K pace for a full marathon?',
        answer: 'Rarely. Longer races rely more heavily on aerobic endurance, so marathon pace is typically 20%–35% slower per mile than an all-out 5K.'
      },
      {
        question: 'How do I convert pace to treadmill speed?',
        answer: 'Read the "Speed" line directly below your average pace (e.g., 5:42/km = 10.53 km/h) and set your treadmill belt to that speed.'
      }
    ],
    importantNotes: [
      'Elevation gain, wind, and course turns will affect real-world race times even at steady effort.',
      'Marathon and Half Marathon distances follow World Athletics road measurements.'
    ]
  },

  'one-rep-max-calculator': {
    introduction:
      'Testing a true one-repetition maximum (1RM) under a heavy barbell carries technical and injury risk, especially without experienced spotters. Submaximal rep-to-failure sets let lifters estimate peak strength far more safely.\n\nThe One-Rep Max (1RM) Calculator averages the Brzycki and Epley strength equations from any submaximal lift (1 to 15 reps) and prints a full training-percentage table from 95% down to 70% for programming strength, hypertrophy, and power blocks.',
    howItWorks: {
      summary:
        'Using the weight lifted and completed repetitions (capped at 15 reps for Brzycki accuracy), the calculator evaluates both the Brzycki and Epley 1RM equations, averages them into a rounded consensus 1RM, and computes six training load zones.',
      steps: [
        {
          title: '1. Enter Working Weight & Unit',
          detail: 'Input the weight successfully lifted in pounds (lbs) or kilograms (kg).'
        },
        {
          title: '2. Select Completed Repetitions (1–15)',
          detail: 'Use the slider to set how many clean repetitions you completed with good form.'
        },
        {
          title: '3. Evaluate Brzycki & Epley Equations',
          detail: 'Both formulas estimate your theoretical 1-rep maximum; the calculator averages both for balanced accuracy.'
        },
        {
          title: '4. Read Training Load Percentages',
          detail: 'View exact recommended bar weights from 95% (1–2 reps) down to 70% (11–12 reps).'
        }
      ],
      keyAssumptions: [
        'Best accuracy occurs between 2 and 10 clean repetitions.',
        'Assumes repetitions were taken close to technical failure without bouncing or spotted assistance.',
        'Brzycki denominator caps at 15 repetitions to avoid steep extrapolation error.'
      ]
    },
    formula: {
      title: 'Brzycki & Epley 1RM Consensus Equations',
      equation: 'Brzycki: W / (1.0278 - 0.0278 × Reps) | Epley: W × (1 + 0.0333 × Reps)',
      variables: [
        { symbol: 'W', name: 'Weight Lifted', description: 'Total barbell or machine load lifted cleanly', unit: 'lbs or kg' },
        { symbol: 'Reps', name: 'Repetitions', description: 'Clean repetitions completed (1 to 15)', unit: 'Count' },
        { symbol: '1RM', name: 'Consensus Maximum', description: 'Average of Brzycki and Epley predictions rounded to nearest unit', unit: 'lbs or kg' }
      ],
      explanation:
        'Brzycki tends to predict slightly more conservatively on low reps, while Epley scales linearly; averaging both yields a dependable working maximum for compound lifts like squat, bench press, and deadlift.'
    },
    examples: [
      {
        title: 'Bench Press 6-Rep Set Estimation',
        scenario: 'A lifter completes 6 clean reps on bench press with 185 lbs.',
        inputs: {
          'Weight Lifted': '185 lbs',
          'Repetitions': '6 reps'
        },
        steps: [
          'Brzycki = 185 / (1.0278 - 0.0278 × 6) = 185 / 0.861 = 214.9 ≈ 215 lbs',
          'Epley = 185 × (1 + 0.0333 × 6) = 185 × 1.1998 = 222.0 ≈ 222 lbs',
          'Consensus Average 1RM = (214.9 + 222.0) / 2 = 218.4 ≈ 218 lbs',
          '80% Working Set (7–8 reps) = 218 × 0.80 = 174 lbs'
        ],
        result: 'Estimated 1RM: 218 lbs (Brzycki: 215 | Epley: 222)',
        takeaway: 'Use 80%–85% (174–185 lbs) for strength-focused sets of 5–8 reps without risking a max-out failure.'
      }
    ],
    understandingResults:
      'Use the Training Percentages table to structure progressive overload: 90%–95% builds maximal neural strength (1–4 reps), 80%–85% develops foundational strength-hypertrophy (5–8 reps), and 70%–75% supports muscle hypertrophy and volume accumulation (9–12 reps). Remember that high-rep sets above 10 reps become increasingly sensitive to muscular endurance.',
    useCases: [
      {
        title: 'Percentage-Based Strength Programs',
        description: 'Calculate exact working weights for 5/3/1, Wendler, or linear periodization blocks.',
        targetAudience: 'Powerlifters & Athletes',
        benefits: ['Prints 70%–95% weights immediately', 'Avoids dangerous max attempts', 'Works in lbs and kg']
      },
      {
        title: 'Training Progress Benchmarking',
        description: 'Verify whether adding 1–2 reps at a submaximal weight raised your estimated max strength.',
        targetAudience: 'Gym Members',
        benefits: ['Quantifies rep PRs', 'Consensus dual-formula accuracy', 'Fast slider exploration']
      }
    ],
    faqs: [
      {
        question: 'Which rep range gives the most accurate 1RM estimate?',
        answer: 'Sets of 3 to 8 repetitions provide the highest predictive accuracy; sets above 12 reps reflect endurance more than maximal strength.'
      },
      {
        question: 'Should I use a lifter’s true 1RM or a 90% training max?',
        answer: 'Many strength programs recommend basing weekly percentages on 90% of your estimated 1RM to keep bar speed crisp and avoid burnout.'
      }
    ],
    importantNotes: [
      'Always warm up progressively and use safety pins or spotters when lifting above 85% of 1RM.',
      'Only count repetitions performed through full, strict range of motion.'
    ]
  },

  'waist-to-hip-calculator': {
    introduction:
      'Where your body stores adipose tissue matters significantly for cardiometabolic health. Excess visceral fat carried around the abdomen ("apple" shape) is far more strongly linked to insulin resistance and cardiovascular risk than subcutaneous fat stored around the hips and thighs ("pear" shape).\n\nThe Waist-to-Hip Ratio (WHR) Calculator divides your waist circumference by your hip circumference and evaluates your body-fat distribution profile and risk classification against World Health Organization (WHO) sex-specific thresholds.',
    howItWorks: {
      summary:
        'The calculator divides waist circumference by hip circumference using any consistent length unit (inches or centimeters) and classifies Low, Moderate, or High cardiometabolic risk by biological sex.',
      steps: [
        {
          title: '1. Measure Waist & Hip Circumferences',
          detail: 'Measure your natural waist (narrowest torso point above the belly button) and hips (widest circumference around the buttocks) in identical units.'
        },
        {
          title: '2. Select Biological Sex',
          detail: 'Choose Female or Male so the tool applies WHO sex-specific cutoffs.'
        },
        {
          title: '3. Calculate WHR Ratio',
          detail: 'Waist circumference is divided by hip circumference to two decimal places.'
        },
        {
          title: '4. Read Risk Bracket & Shape Profile',
          detail: 'Inspect whether your ratio falls into Low Risk (Pear/Balanced), Moderate Risk (Balanced), or High Risk (Apple / Abdominal Weight).'
        }
      ],
      keyAssumptions: [
        'Waist and hip measurements are entered in the exact same unit (both inches or both centimeters).',
        'Measurements are taken standing upright after a relaxed exhalation.',
        'Evaluated using WHO adult sex-specific abdominal obesity cutoffs.'
      ]
    },
    formula: {
      title: 'Waist-to-Hip Ratio (WHR) Formula',
      equation: 'WHR = Waist Circumference / Hip Circumference',
      variables: [
        { symbol: 'Waist', name: 'Waist Circumference', description: 'Narrowest circumference between lowest rib and iliac crest', unit: 'in or cm' },
        { symbol: 'Hip', name: 'Hip Circumference', description: 'Widest circumference across hips and glutes', unit: 'in or cm' },
        { symbol: 'WHR', name: 'Waist-to-Hip Ratio', description: 'Dimensionless ratio of central vs. lower-body girth', unit: 'Ratio' }
      ],
      explanation:
        'Because WHR is a pure ratio, inches and centimeters yield the identical score as long as both inputs share the same unit. Risk cutoffs: Women <0.80 Low, 0.80–0.85 Moderate, >0.85 High; Men <0.90 Low, 0.90–0.95 Moderate, >0.95 High.'
    },
    examples: [
      {
        title: 'Adult Female Low-Risk WHR Assessment',
        scenario: 'A woman measures a 30-inch waist and a 40-inch hip circumference.',
        inputs: {
          'Waist': '30 in',
          'Hip': '40 in',
          'Sex': 'Female'
        },
        steps: [
          'Divide waist by hip: 30 / 40 = 0.75',
          'Compare against female WHO thresholds (<0.80 = Low Risk)',
          'Shape profile: Pear / Balanced'
        ],
        result: 'WHR: 0.75 (Low Risk)',
        takeaway: 'A ratio below 0.80 for women (or below 0.90 for men) indicates minimal central abdominal fat accumulation.'
      }
    ],
    understandingResults:
      'Lower WHR values indicate less central visceral fat around abdominal organs. Note that someone can have a "normal" BMI yet carry elevated metabolic risk if their WHR exceeds 0.85 (women) or 0.95 (men). Conversely, heavy strength training that builds glute and hip muscle lowers WHR naturally.',
    useCases: [
      {
        title: 'Cardiometabolic Risk Screening',
        description: 'Complement BMI with a measure that specifically detects central abdominal fat.',
        targetAudience: 'Preventive Health Users',
        benefits: ['Unit-agnostic math', 'WHO threshold interpretation', 'Fast progress tracking']
      },
      {
        title: 'Fat-Loss Distribution Monitoring',
        description: 'Track whether inches are coming off the midsection relative to the lower body.',
        targetAudience: 'Fitness & Diet Clients',
        benefits: ['Detects visceral fat reduction', 'Simple 2-number input', 'Objective ratio score']
      }
    ],
    faqs: [
      {
        question: 'Does it matter if I enter inches or centimeters?',
        answer: 'No, as long as both waist and hip are entered in the same unit, the ratio cancels out units identically.'
      },
      {
        question: 'Why does WHR sometimes spot risk that BMI misses?',
        answer: 'BMI treats all weight equally, whereas WHR specifically flags abdominal fat accumulation linked to diabetes and cardiovascular risk.'
      }
    ],
    importantNotes: [
      'WHR does not replace comprehensive blood panels, blood pressure checks, or physician evaluations.',
      'Always keep the measuring tape parallel to the floor and snug without compressing skin.'
    ]
  },

  'sleep-cycle-calculator': {
    introduction:
      'Have you ever slept eight hours yet woken up exhausted and disoriented? That sluggish feeling—called sleep inertia—often strikes when an alarm interrupts you during deep slow-wave sleep rather than at the natural boundary between sleep cycles.\n\nThe Sleep Cycle & Wake-Up Calculator works backward from your required wake-up time using 90-minute human sleep cycles plus a 15-minute average sleep-onset latency, showing four ideal bedtimes (3, 4, 5, and 6 cycles) so you wake between cycles feeling alert.',
    howItWorks: {
      summary:
        'The calculator converts your chosen 12-hour wake-up time into minutes, subtracts multiples of 90 minutes (3 to 6 sleep cycles) plus 15 minutes for falling asleep, and converts each result back into clock time.',
      steps: [
        {
          title: '1. Choose Required Wake-Up Time',
          detail: 'Select the hour, minute (in 15-minute increments), and AM/PM when your alarm must ring.'
        },
        {
          title: '2. Subtract Sleep-Onset Latency (15 min)',
          detail: 'Accounts for the average 15 minutes it takes a rested adult to transition from getting into bed to Stage 1 sleep.'
        },
        {
          title: '3. Step Back in 90-Minute Cycles',
          detail: 'Calculates bedtimes corresponding to 6 cycles (9.0 hrs), 5 cycles (7.5 hrs), 4 cycles (6.0 hrs), and 3 cycles (4.5 hrs).'
        },
        {
          title: '4. Pick a Highlighted Optimal Window',
          detail: 'Focus on the highlighted 5-cycle (7.5 hr) or 6-cycle (9.0 hr) bedtime options to meet adult sleep needs.'
        }
      ],
      keyAssumptions: [
        'Average adult sleep cycle duration is approximately 90 minutes (normal individual cycles range 80–110 minutes).',
        'Includes a fixed 15-minute allowance to fall asleep after lights out.',
        'Most healthy adults require 5 to 6 full cycles (7.5 to 9 hours) per night.'
      ]
    },
    formula: {
      title: 'Sleep Cycle Backward Clock Formula',
      equation: 'Bedtime = Wake Time - [ (Cycles × 90 minutes) + 15 minutes ]',
      variables: [
        { symbol: 'Wake Time', name: 'Target Alarm Time', description: 'Desired morning or shift wake time', unit: 'HH:MM' },
        { symbol: 'Cycles', name: 'Sleep Cycle Count', description: 'Recommended 5 or 6 (also displays 4 and 3 cycles)', unit: 'Count' },
        { symbol: '90 min', name: 'Cycle Duration', description: 'Standard NREM + REM architectural loop length', unit: 'Minutes' },
        { symbol: '15 min', name: 'Sleep Latency', description: 'Average time required to fall asleep', unit: 'Minutes' }
      ],
      explanation:
        'Because human sleep cycles through light sleep, deep sleep, and REM roughly every 90 minutes, targeting multiples of 90 minutes minimizes abrupt alarms during deep slow-wave sleep.'
    },
    examples: [
      {
        title: '7:00 AM Workday Wake-Up Schedule',
        scenario: 'You need to wake up at 7:00 AM and want either 5 or 6 complete sleep cycles.',
        inputs: {
          'Wake Time': '7:00 AM',
          'Fall-Asleep Allowance': '15 minutes'
        },
        steps: [
          '5 cycles (7.5 hrs sleep): (5 × 90) + 15 = 465 minutes (7h 45m) before 7:00 AM → 11:15 PM',
          '6 cycles (9.0 hrs sleep): (6 × 90) + 15 = 555 minutes (9h 15m) before 7:00 AM → 9:45 PM',
          '4 cycles fallback (6.0 hrs sleep): (4 × 90) + 15 = 375 minutes (6h 15m) → 12:45 AM'
        ],
        result: 'Recommended Bedtimes: 9:45 PM (6 cycles) or 11:15 PM (5 cycles)',
        takeaway: 'Going to sleep at 11:15 PM instead of 11:45 PM aligns your 7:00 AM alarm with the light transition at the end of cycle 5.'
      }
    ],
    understandingResults:
      'Prioritize the highlighted 5-cycle (7.5 hours) and 6-cycle (9.0 hours) bedtimes whenever possible; 4-cycle and 3-cycle options are shown only for occasional short nights or travel turnarounds. Keep your wake time consistent across weekends to stabilize your circadian rhythm.',
    useCases: [
      {
        title: 'Workday & School Morning Alarms',
        description: 'Pick an exact lights-out time that prevents waking up mid-deep-sleep.',
        targetAudience: 'Professionals & Students',
        benefits: ['Reduces morning grogginess', 'Accounts for falling asleep time', 'Highlights 7.5–9 hr sweet spots']
      },
      {
        title: 'Shift Work & Travel Recovery',
        description: 'Plan short 4-cycle or 3-cycle sleep blocks around early flights or rotating shifts.',
        targetAudience: 'Shift Workers & Travelers',
        benefits: ['Supports AM and PM wake times', 'Prevents 24-hour wrap mistakes', 'Simple visual cards']
      }
    ],
    faqs: [
      {
        question: 'Is every person’s sleep cycle exactly 90 minutes?',
        answer: 'No, 90 minutes is the average across adults; individual cycles can vary from roughly 80 to 110 minutes depending on age, stress, and sleep debt.'
      },
      {
        question: 'Why does the calculator add 15 minutes?',
        answer: 'Most rested adults take 10 to 20 minutes to fall asleep after turning off the lights, so adding 15 minutes aligns Cycle 1 accurately.'
      }
    ],
    importantNotes: [
      'Chronically sleeping fewer than 5 cycles (7 hours) impairs reaction time, mood, and metabolic recovery.',
      'Avoid bright screens and caffeine 1–6 hours before your target bedtime so you fall asleep within 15 minutes.'
    ]
  },

  'alcohol-calorie-calculator': {
    introduction:
      'Alcoholic beverages carry dense energy—pure ethanol yields 7 calories per gram, nearly as much as fat—yet standard nutrition labels are often absent from beer cans, wine bottles, and restaurant cocktails. Even moderate social drinking can quietly add hundreds of calories and stall fat-loss progress.\n\nThe Alcohol Calories & Units Calculator tallies your total calories and standard alcohol units across beers, wine glasses, and mixed cocktails, and translates the total caloric load into equivalent minutes of brisk walking or miles of running.',
    howItWorks: {
      summary:
        'The calculator multiplies your entered drink counts by standard beverage averages (150 kcal / 1.5 units per 12-oz beer, 125 kcal / 2.1 units per 5-oz wine, 220 kcal / 2.0 units per cocktail) and converts total calories into walking minutes and running miles.',
      steps: [
        {
          title: '1. Enter Drinks by Beverage Type',
          detail: 'Input the number of standard 12-oz beers (5% ABV), 5-oz glasses of wine (12% ABV), and cocktails/mixed spirits.'
        },
        {
          title: '2. Sum Total Calories & Alcohol Units',
          detail: 'The tool totals energy from ethanol and mixers alongside standardized alcohol unit counts.'
        },
        {
          title: '3. Convert to Exercise Equivalents',
          detail: 'Total calories are divided by 5 kcal/min for brisk walking and by 100 kcal/mile for running at 6 mph.'
        }
      ],
      keyAssumptions: [
        'Assumes typical averages: 12-oz regular beer = 150 kcal (1.5 units), 5-oz wine = 125 kcal (2.1 units), cocktail = 220 kcal (2.0 units).',
        'Craft IPAs, heavy stouts, and sugary frozen cocktails can exceed these baseline estimates.',
        'Exercise burn approximations assume ~5 kcal/min brisk walking and ~100 kcal/mile running.'
      ]
    },
    formula: {
      title: 'Beverage Calories, Units & Activity Burn',
      equation: 'Total Calories = (Beers × 150) + (Wine × 125) + (Cocktails × 220) | Walk Min = Calories / 5',
      variables: [
        { symbol: 'Beers', name: 'Standard Beers (12 oz, 5%)', description: '150 kcal and 1.5 alcohol units per serving', unit: 'Drinks' },
        { symbol: 'Wine', name: 'Wine Glasses (5 oz, 12%)', description: '125 kcal and 2.1 alcohol units per serving', unit: 'Drinks' },
        { symbol: 'Cocktails', name: 'Mixed Drinks', description: '220 kcal and 2.0 alcohol units per serving (spirit + mixer)', unit: 'Drinks' },
        { symbol: 'Run Miles', name: 'Running Equivalent', description: 'Total Calories / 100 kcal per mile at ~6 mph', unit: 'Miles' }
      ],
      explanation:
        'Summing beverage calories shows how quickly liquid calories accumulate, while standard units help gauge weekly moderation thresholds.'
    },
    examples: [
      {
        title: 'Weekend Dinner Drinks Audit',
        scenario: 'Someone has two 12-oz regular beers and one 5-oz glass of wine over dinner.',
        inputs: {
          'Beers (12 oz)': '2',
          'Wine (5 oz)': '1',
          'Cocktails': '0'
        },
        steps: [
          'Beer calories = 2 × 150 = 300 kcal; Wine calories = 1 × 125 = 125 kcal → Total = 425 kcal',
          'Alcohol units = (2 × 1.5) + (1 × 2.1) = 3.0 + 2.1 = 5.1 units',
          'Brisk walking equivalent = 425 / 5 = 85 minutes',
          'Running equivalent = 425 / 100 = 4.3 miles'
        ],
        result: '425 kcal | 5.1 Units (85 min walking or 4.3 mi run)',
        takeaway: 'Three moderate drinks add the caloric equivalent of an extra meal and require over an hour of walking to offset.'
      }
    ],
    understandingResults:
      'Remember that your liver prioritizes metabolizing ethanol before dietary fats and carbs, which temporarily pauses fat oxidation even beyond the drink’s raw calorie count. Swapping sugary cocktail mixers for soda water or alternating alcoholic drinks with sparkling water cuts both calories and weekly alcohol units.',
    useCases: [
      {
        title: 'Calorie-Deficit Budgeting',
        description: 'Plan social evenings without accidentally erasing a week-long nutrition deficit.',
        targetAudience: 'Dieters & Fitness Enthusiasts',
        benefits: ['Quantifies hidden liquid calories', 'Motivates smarter drink swaps', 'Shows realistic exercise trade-offs']
      },
      {
        title: 'Weekly Unit Awareness',
        description: 'Track standard alcohol units accumulated over a weekend or week.',
        targetAudience: 'Health-Conscious Adults',
        benefits: ['Instant unit tally', 'Separates beer, wine, and spirits', 'Simple 3-field interface']
      }
    ],
    faqs: [
      {
        question: 'Why does alcohol have so many calories if it has no carbs or fat?',
        answer: 'Pure alcohol (ethanol) provides 7 calories per gram—higher than protein and carbs (4 kcal/g) and just below pure fat (9 kcal/g)—before any mixers or residual sugars.'
      },
      {
        question: 'Are craft IPAs higher than 150 calories?',
        answer: 'Yes. High-ABV craft IPAs (6.5%–8.5%) or pint pours (16 oz) frequently contain 220 to 320 calories per glass.'
      }
    ],
    importantNotes: [
      'Do not attempt to "earn" heavy drinking with extreme compensatory exercise.',
      'Consult public health guidelines on low-risk alcohol consumption and never drive after drinking.'
    ]
  },

  'lean-body-mass-calculator': {
    introduction:
      'Lean Body Mass (LBM) equals your total body weight minus all stored body fat—encompassing skeletal muscle, bone mineral mass, organs, blood, and bodily water. Knowing your LBM helps athletes set accurate protein targets, clinicians dose certain medications safely, and dieters verify that weight loss is coming from fat rather than hard-earned muscle.\n\nThe Lean Body Mass (LBM) Calculator averages two established clinical equations—Boer (1984) and James (1976)—using only your weight, height, and biological sex, then derives your estimated fat mass and implied body fat percentage.',
    howItWorks: {
      summary:
        'The calculator evaluates both the Boer and James lean-mass regression formulas in kilograms and centimeters, averages them into a consensus Lean Body Mass (displayed in kg and lbs), and subtracts LBM from total body weight to estimate fat mass.',
      steps: [
        {
          title: '1. Enter Weight (kg) & Height (cm)',
          detail: 'Provide your total body weight in kilograms and standing height in centimeters.'
        },
        {
          title: '2. Select Biological Sex',
          detail: 'Choose Male or Female so sex-specific regression coefficients from Boer and James are applied.'
        },
        {
          title: '3. Evaluate Boer & James Equations',
          detail: 'Both formulas estimate lean tissue mass from height and weight; the tool computes their mathematical mean.'
        },
        {
          title: '4. Derive Fat Mass & Implied Body Fat %',
          detail: 'Subtracting LBM from total weight reveals estimated fat mass in kg and implied body fat percentage.'
        }
      ],
      keyAssumptions: [
        'Inputs are in kilograms (kg) and centimeters (cm).',
        'Averaging Boer and James assumes typical adult proportions rather than extreme bodybuilding muscularity.',
        'At extreme heights or very high adiposity, direct body-fat methods (DEXA or Navy circumference) provide tighter precision.'
      ]
    },
    formula: {
      title: 'Boer & James Lean Body Mass Consensus Formulas',
      equation: 'Boer (M): 0.407W + 0.267H - 19.2 | Boer (F): 0.252W + 0.473H - 48.3 | LBM = (Boer + James) / 2',
      variables: [
        { symbol: 'W', name: 'Total Body Weight', description: 'Body mass in kilograms', unit: 'kg' },
        { symbol: 'H', name: 'Standing Height', description: 'Height in centimeters', unit: 'cm' },
        { symbol: 'James', name: 'James Equation', description: '1.1W - 128(W/H)² (M) | 1.07W - 148(W/H)² (F)', unit: 'kg' },
        { symbol: 'Fat Mass', name: 'Implied Fat Mass', description: 'Total Weight minus consensus LBM', unit: 'kg' }
      ],
      explanation:
        'Because the James formula uses a squared (W/H)² term that can dip at very high weights while Boer stays linear, averaging both equations yields a stable clinical estimate for typical adults.'
    },
    examples: [
      {
        title: '75 kg Adult Male Lean Mass Breakdown',
        scenario: 'A man weighs 75 kg and stands 178 cm tall.',
        inputs: {
          'Body Weight': '75 kg',
          'Height': '178 cm',
          'Sex': 'Male'
        },
        steps: [
          'Boer LBM = (0.407 × 75) + (0.267 × 178) - 19.2 = 30.53 + 47.53 - 19.2 = 58.85 kg',
          'James LBM = (1.1 × 75) - 128 × (75 / 178)² = 82.5 - 22.72 = 59.78 kg',
          'Consensus LBM = (58.85 + 59.78) / 2 = 59.3 kg (130.8 lbs)',
          'Estimated Fat Mass = 75 - 59.3 = 15.7 kg (20.9% implied body fat)'
        ],
        result: 'Lean Body Mass: 59.3 kg (130.8 lbs) | Implied Body Fat: 20.9%',
        takeaway: 'Knowing your LBM (~59 kg) lets you anchor daily protein intake (~1.8–2.2 g per kg of lean mass) precisely.'
      }
    ],
    understandingResults:
      'Use your Lean Body Mass figure as a benchmark for nutritional protein targets (for example, 1.8–2.4 g of protein per kg of LBM during fat loss) and Katch-McArdle resting energy estimates. Remember that LBM includes bone, organs, and water as well as skeletal muscle—transient hydration changes can nudge LBM slightly day to day.',
    useCases: [
      {
        title: 'Protein & Nutrition Anchoring',
        description: 'Base daily protein intake on lean tissue mass rather than overestimating needs on higher body weights.',
        targetAudience: 'Strength Athletes & Dietitians',
        benefits: ['Dual-equation clinical average', 'Outputs kg and lbs', 'Instant fat mass breakdown']
      },
      {
        title: 'Katch-McArdle Metabolic Input',
        description: 'Estimate implied body fat % and LBM when no tape measure or calipers are handy.',
        targetAudience: 'Fitness Trackers',
        benefits: ['Requires only height and weight', 'Estimates implied body fat %', 'No specialized gear needed']
      }
    ],
    faqs: [
      {
        question: 'Is Lean Body Mass the same as skeletal muscle mass?',
        answer: 'No. Skeletal muscle makes up roughly half of Lean Body Mass; the rest consists of bones, organs, connective tissue, skin, and body water.'
      },
      {
        question: 'Why does the James formula subtract a (W/H)² term?',
        answer: 'Beyond a certain weight for a given height, additional mass is statistically more likely to be adipose tissue rather than lean organ or bone mass.'
      }
    ],
    importantNotes: [
      'Anthropometric formulas cannot detect high muscularity in competitive bodybuilders; use body-circumference or DEXA tools for athletic precision.',
      'Verify medical dosing weights strictly through qualified clinical protocols.'
    ]
  }
};
