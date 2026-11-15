import { CalculatorExplanation } from '../../types';

export const CONSTRUCTION_ENGINEERING_OTHER_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  'concrete-calculator': {
    introduction:
      'Ordering too little concrete mid-pour forces costly short-load truck fees or cold joints, while over-ordering wastes hundreds of dollars in excess mix. Different shapes—rectangular slabs, continuous footings, and round pier columns—also require distinct geometric volume equations.\n\nThe Concrete Volume & Bags Calculator computes exact concrete volume in both cubic yards (Imperial) and cubic meters (Metric) for slabs, footings, and columns, adds your chosen waste margin, and estimates 60-lb and 80-lb pre-mixed bags plus material cost.',
    howItWorks: {
      summary:
        'The calculator converts shape dimensions into uniform feet or meters, multiplies by quantity and your waste factor percentage, and converts volume into cubic yards, cubic meters, and pre-mixed bag counts.',
      steps: [
        {
          title: '1. Select Pour Shape & System',
          detail: 'Choose Slab, Footing, or Round Column, and pick Imperial (feet/inches) or Metric (meters/centimeters).'
        },
        {
          title: '2. Compute Base Geometric Volume',
          detail: 'Computes L × W × Depth for rectangular slabs/footings or π × r² × Height for cylindrical columns, then multiplies by unit quantity.'
        },
        {
          title: '3. Apply Waste Margin',
          detail: 'Increases base volume by your waste percentage (for example, 10%) to cover uneven subgrades and spillage.'
        },
        {
          title: '4. Convert to Yards, Meters & Bags',
          detail: 'Reports final cubic yards, cubic meters (1 m³ = 1.30795 cu yd), estimated 60-lb bags (~60/cu yd) and 80-lb bags (~45/cu yd), and total cost.'
        }
      ],
      keyAssumptions: [
        'One 80-lb bag yields roughly 0.60 cubic feet (approx. 45 bags per cubic yard).',
        'One 60-lb bag yields roughly 0.45 cubic feet (approx. 60 bags per cubic yard).',
        'Dimensions entered reflect average formed depth across the pour.'
      ]
    },
    formula: {
      title: 'Slab, Footing & Column Concrete Volume Formulas',
      equation: 'Slab (cu yd) = [L × W × (Depth_in / 12)] / 27 | Column = π × r² × H / 27',
      variables: [
        { symbol: 'L, W', name: 'Length & Width', description: 'Rectangular slab or footing span', unit: 'ft or m' },
        { symbol: 'Depth_in', name: 'Pour Thickness', description: 'Slab or footing depth converted to feet (/12)', unit: 'inches or cm' },
        { symbol: 'r, H', name: 'Column Radius & Height', description: 'Half of tube diameter and vertical height', unit: 'ft or m' },
        { symbol: 'Waste %', name: 'Allowance Factor', description: 'Extra volume percentage for irregular excavation and chute waste', unit: '%' }
      ],
      explanation:
        'Since 1 cubic yard equals 27 cubic feet (3 × 3 × 3), dividing cubic feet by 27 yields ready-mix cubic yards; multiplying by (1 + Waste%) provides a safe order quantity.'
    },
    examples: [
      {
        title: 'Patio Concrete Slab with 10% Waste',
        scenario: 'A contractor forms a 20 ft × 15 ft patio slab at 4 inches thick and adds a 10% waste margin.',
        inputs: {
          'Shape': 'Rectangular Slab',
          'Dimensions': '20 ft × 15 ft × 4 in',
          'Waste Factor': '10%'
        },
        steps: [
          'Depth in feet = 4 / 12 = 0.3333 ft',
          'Base cubic feet = 20 × 15 × 0.3333 = 100 cu ft',
          'Base cubic yards = 100 / 27 = 3.704 cu yd',
          'With 10% waste = 3.704 × 1.10 = 4.07 cu yd (3.11 m³)',
          'Pre-mix equivalent ≈ ⌈4.07 × 45⌉ = 184 bags (80-lb)'
        ],
        result: 'Order Volume: 4.07 Cubic Yards (3.11 m³)',
        takeaway: 'Anything over roughly 1.5 to 2 cubic yards is usually cheaper and much faster to order via ready-mix truck than mixing 180+ heavy bags.'
      }
    ],
    understandingResults:
      'Use the "Total Volume (with Waste)" figure when calling ready-mix dispatchers, who typically deliver in 0.25- or 0.5-yard increments. For small post holes under 1 cubic yard, check the 60-lb and 80-lb bag counts to load the right number of bags at the hardware store.',
    useCases: [
      {
        title: 'Patios, Driveways & Shed Pads',
        description: 'Estimate ready-mix truck yardage and total concrete cost before excavation.',
        targetAudience: 'Contractors & Homeowners',
        benefits: ['Eliminates short-load fees', 'Compares ready-mix vs bagged cost', 'Handles Metric and Imperial']
      },
      {
        title: 'Deck Footings & Fence Posts',
        description: 'Switch to Column mode with a post quantity multiplier to buy exact pre-mix bags.',
        targetAudience: 'Deck Builders & DIYers',
        benefits: ['Accurate cylinder math', 'Shows 60-lb vs 80-lb counts', 'Prevents wasted leftover bags']
      }
    ],
    faqs: [
      {
        question: 'How much waste allowance should I add for concrete?',
        answer: 'For well-leveled formwork over compacted gravel, 5% to 10% is standard. For hand-dug trenches or uneven dirt, use 10% to 15%.'
      },
      {
        question: 'How many 80-lb bags are in one cubic yard?',
        answer: 'Approximately 45 bags of 80-lb concrete mix equal 1 cubic yard (27 cubic feet).'
      }
    ],
    importantNotes: [
      'Confirm concrete compressive strength (e.g., 3,000 PSI vs. 4,000 PSI) and air-entrainment requirements for freeze-thaw climates with your supplier.'
    ]
  },

  'flooring-calculator': {
    introduction:
      'Flooring projects fail budgets when installers forget cutoffs around doorways, closets, and angled walls—running short by even half a box can leave you stuck waiting weeks for a matching dye lot. Calculating net room square footage, waste percentage, and full carton quantities upfront keeps installation smooth.\n\nThe Tile & Flooring Area guide explains how to compute room surface area, apply appropriate cut-waste factors for straight versus diagonal layouts, and convert adjusted area into exact boxes of hardwood, vinyl plank, laminate, or ceramic tile.',
    howItWorks: {
      summary:
        'Room length and width are multiplied for net area, scaled by a layout waste factor (typically 10%–15%), and divided by carton coverage before rounding up to whole boxes.',
      steps: [
        {
          title: '1. Measure Net Room Area',
          detail: 'Multiply room length by width for each rectangular section, then sum closets and hallways.'
        },
        {
          title: '2. Apply Layout Waste Allowance',
          detail: 'Multiply net square footage by 1.10 (10% waste) for straight plank/tile layouts or 1.15 (15% waste) for diagonal, herringbone, or irregular rooms.'
        },
        {
          title: '3. Divide by Box Coverage & Round Up',
          detail: 'Divide total adjusted square footage by the coverage listed on each carton and round up to the nearest full box.'
        }
      ],
      keyAssumptions: [
        'Measurements reflect unobstructed floor dimensions from wall to wall.',
        'Boxes are sold as whole unopened cartons rather than partial square feet.'
      ]
    },
    formula: {
      title: 'Flooring Area & Carton Quantity Formula',
      equation: 'Boxes = ⌈ [ (Length × Width) × (1 + Waste%) ] / Coverage per Box ⌉',
      variables: [
        { symbol: 'Length, Width', name: 'Room Dimensions', description: 'Wall-to-wall floor dimensions in feet or meters', unit: 'ft or m' },
        { symbol: 'Waste%', name: 'Cutoff & Breakage Margin', description: 'Extra percentage for cuts and defects (e.g., 10% = 0.10)', unit: 'Decimal' },
        { symbol: 'Coverage', name: 'Carton Yield', description: 'Square feet or meters covered by one full box', unit: 'sq ft / box' }
      ],
      explanation:
        'Rounding up after dividing by box coverage ensures you finish the final row without needing an emergency mid-job store run.'
    },
    examples: [
      {
        title: 'Bedroom Vinyl Plank & Tile Order',
        scenario: 'A 16 ft × 12 ft living space requires 10% waste allowance, and each flooring carton covers 20 sq ft.',
        inputs: {
          'Room Dimensions': '16 ft × 12 ft',
          'Waste Allowance': '10%',
          'Box Coverage': '20 sq ft/box'
        },
        steps: [
          'Net Room Area = 16 × 12 = 192 sq ft',
          'Adjusted Area (with 10% waste) = 192 × 1.10 = 211.2 sq ft',
          'Boxes Needed = ⌈ 211.2 / 20 ⌉ = ⌈ 10.56 ⌉ = 11 boxes (220 sq ft purchased)'
        ],
        result: 'Net Area: 192 sq ft | Order: 11 Boxes (211.2 sq ft incl. waste)',
        takeaway: 'Ordering 11 boxes leaves roughly 1–2 spare planks for future damaged-board replacements from the exact same production batch.'
      }
    ],
    understandingResults:
      'Always save two or three leftover tiles or planks from your order in dry storage. Manufacturing colors and batch grain shift over time, making exact future repairs much easier when you hold matching spares.',
    useCases: [
      {
        title: 'Home Remodel Material Takeoff',
        description: 'Prepare accurate square footage and carton orders for tile, LVP, or hardwood quotes.',
        targetAudience: 'Homeowners & Flooring Installers',
        benefits: ['Covers cut-off waste', 'Rounds to whole cartons', 'Preserves batch consistency']
      }
    ],
    faqs: [
      {
        question: 'When should I use 15% waste instead of 10%?',
        answer: 'Use 15% for diagonal (45-degree) tile, herringbone/chevron patterns, rooms with curved walls, or brittle natural stone.'
      },
      {
        question: 'Should I measure closets and cabinets?',
        answer: 'Include closets if flooring continues inside them; subtract permanent kitchen island or cabinetry footprints if installing around them rather than underneath.'
      }
    ],
    importantNotes: [
      'Check manufacturer warranty terms on moisture barriers, underlayment, and 48–72 hour wood acclimation before installing.'
    ]
  },

  'paint-calculator': {
    introduction:
      'Buying interior paint one gallon too short stalls a weekend project, while buying extra tinted cans often cannot be returned. Calculating wall perimeter, deducting window and door openings, and accounting for multiple coats eliminates expensive guessing.\n\nThe Wall Paint Coverage Calculator determines gross wall square footage from room length, width, and ceiling height, subtracts standard door and window cutouts, multiplies by your chosen number of coats, and converts net paintable area into exact gallon cans.',
    howItWorks: {
      summary:
        'The tool multiplies room perimeter by wall height for gross area, subtracts 20 sq ft per door and 15 sq ft per window, scales by coat count, and divides by 350 sq ft per gallon.',
      steps: [
        {
          title: '1. Calculate Room Wall Perimeter Area',
          detail: 'Computes 2 × (Length + Width) × Height across all four interior walls.'
        },
        {
          title: '2. Deduct Doors & Windows',
          detail: 'Subtracts 20 sq ft per standard door and 15 sq ft per standard window to avoid over-buying paint.'
        },
        {
          title: '3. Multiply by Number of Coats',
          detail: 'Scales net paintable wall area by 1, 2, 3, or 4 coats (2 coats is typical for clean coverage).'
        },
        {
          title: '4. Convert to Gallon Cans',
          detail: 'Divides total square footage by 350 sq ft/gallon and rounds up to the nearest full gallon.'
        }
      ],
      keyAssumptions: [
        'Each door equals ~20 sq ft and each window equals ~15 sq ft.',
        'One gallon covers ~350 square feet on smooth primed drywall.',
        'Ceiling painting is excluded unless calculated separately using Length × Width.'
      ]
    },
    formula: {
      title: 'Paint Coverage & Gallons Formula',
      equation: 'Gallons = ⌈ ( [2(L + W)H - (Doors × 20) - (Windows × 15)] × Coats ) / 350 ⌉',
      variables: [
        { symbol: 'L, W, H', name: 'Room Dimensions', description: 'Room length, width, and wall ceiling height in feet', unit: 'ft' },
        { symbol: 'Coats', name: 'Coat Count', description: 'Number of paint layers applied', unit: 'Count' },
        { symbol: '350', name: 'Coverage Rate', description: 'Typical square feet covered per gallon of interior latex paint', unit: 'sq ft/gal' }
      ],
      explanation:
        'Subtracting window and door areas yields net paintable surface, and dividing total coated area by 350 rounds up to whole retail gallon cans.'
    },
    examples: [
      {
        title: 'Master Bedroom Two-Coat Repaint',
        scenario: 'A 14 ft × 12 ft bedroom with 9 ft walls has 2 doors and 2 windows and needs 2 coats of eggshell paint.',
        inputs: {
          'Room Size': '14 ft × 12 ft × 9 ft ceiling',
          'Openings': '2 doors, 2 windows',
          'Coats': '2 coats'
        },
        steps: [
          'Gross wall area = 2 × (14 + 12) × 9 = 468 sq ft',
          'Subtract openings = (2 × 20) + (2 × 15) = 70 sq ft → Net Area = 398 sq ft',
          'Total 2-coat coverage = 398 × 2 = 796 sq ft',
          'Gallons required = ⌈ 796 / 350 ⌉ = ⌈ 2.27 ⌉ = 3 gallons'
        ],
        result: '3 Gallons Required (Net Area: 398 sq ft | 2 Coats: 796 sq ft)',
        takeaway: 'Two gallons would stop 96 sq ft short on the second coat; buying 3 gallons finishes the job with touch-up paint left over.'
      }
    ],
    understandingResults:
      'If painting bare drywall, dark-to-light color shifts, or textured stucco/brick, coverage drops toward 250–300 sq ft/gallon—factor in an extra primer coat or one additional gallon when changing dramatic colors.',
    useCases: [
      {
        title: 'Room Repaint Shopping List',
        description: 'Know exact gallon counts before ordering custom-tinted paint at the counter.',
        targetAudience: 'Homeowners & Painting Contractors',
        benefits: ['Prevents custom-tint shortages', 'Deducts doors and windows', 'Supports 1–4 coat planning']
      }
    ],
    faqs: [
      {
        question: 'Does a dark color to light color change need more paint?',
        answer: 'Yes. Dramatic shifts often need a dedicated primer coat plus two finish coats to stop underlying tones from bleeding through.'
      },
      {
        question: 'Should I also buy paint for baseboards and trim?',
        answer: 'Doors, casing, and baseboards typically use semi-gloss or satin trim enamel rather than wall paint; 1 quart to 1 gallon usually covers trim for 1–3 standard rooms.'
      }
    ],
    importantNotes: [
      'Always stir multiple gallons of the same custom color together in a 5-gallon bucket ("boxing paint") so slight tint variations blend seamlessly across walls.'
    ]
  },

  'drywall-calculator': {
    introduction:
      'Estimating drywall sheets by eyeballing wall area almost always misses screw counts, joint compound buckets, and cutoffs around corners and outlets. Running out of sheets or drywall screws mid-hang slows framing and taping crews.\n\nThe Drywall Sheet & Mud Calculator converts total square footage (walls and ceilings combined) into 4×8 ft or 4×12 ft gypsum board sheets with your chosen waste factor, plus estimated drywall screw counts and joint compound gallons.',
    howItWorks: {
      summary:
        'The tool adds your waste percentage to the total surface area, divides by sheet area (32 sq ft for 4×8 or 48 sq ft for 4×12), and estimates fasteners and mud proportionally.',
      steps: [
        {
          title: '1. Apply Drywall Cutoff Waste',
          detail: 'Scales total wall and ceiling square footage by your waste percentage (typically 10% to 15%).'
        },
        {
          title: '2. Divide by Selected Sheet Size',
          detail: 'Divides adjusted square footage by 32 sq ft (4×8 ft panels) or 48 sq ft (4×12 ft panels) and rounds up.'
        },
        {
          title: '3. Estimate Screws & Joint Compound',
          detail: 'Estimates roughly 32 screws per sheet and ~0.05 gallons of pre-mixed joint compound per sheet (rounded up).'
        }
      ],
      keyAssumptions: [
        '4×8 sheets cover 32 sq ft; 4×12 sheets cover 48 sq ft.',
        'Estimated ~32 screws per 4×8 sheet on 16-inch on-center framing.',
        'Joint compound estimate covers standard Level 3/4 taping and three-coat finishing.'
      ]
    },
    formula: {
      title: 'Drywall Panel & Supplies Formula',
      equation: 'Sheets = ⌈ [Area × (1 + Waste%)] / Sheet Sq Ft ⌉ | Screws ≈ Sheets × 32',
      variables: [
        { symbol: 'Area', name: 'Wall + Ceiling Area', description: 'Total surface square footage to be drywalled', unit: 'sq ft' },
        { symbol: 'Sheet Sq Ft', name: 'Panel Coverage', description: '32 sq ft (4×8) or 48 sq ft (4×12)', unit: 'sq ft' },
        { symbol: 'Waste%', name: 'Cutoff Margin', description: 'Waste percentage for cutouts and ends (e.g., 10% = 0.10)', unit: 'Decimal' }
      ],
      explanation:
        'Using 4×12 sheets reduces horizontal butt joints on long walls, while 4×8 sheets are much easier for one person to maneuver up stairs or into tight basements.'
    },
    examples: [
      {
        title: 'Basement Room Framing Drywall Order',
        scenario: 'A basement remodel has 800 sq ft of wall and ceiling surface using standard 4×8 ft sheets with 10% waste.',
        inputs: {
          'Total Surface Area': '800 sq ft',
          'Sheet Size': '4×8 ft (32 sq ft)',
          'Waste Factor': '10%'
        },
        steps: [
          'Adjusted Area = 800 × 1.10 = 880 sq ft',
          'Sheets Needed = ⌈ 880 / 32 ⌉ = ⌈ 27.5 ⌉ = 28 sheets',
          'Estimated Screws = 28 × 32 = 896 screws (1 box of 1,000)',
          'Joint Compound = ⌈ 28 × 0.05 ⌉ = 2 gallons'
        ],
        result: '28 Sheets | ~896 Screws | 2 Gallons Joint Compound',
        takeaway: 'Buying one 1,000-count box of 1-1/4" coarse-thread drywall screws and 2 gallons (or a 4.5-gal bucket) of mud covers the room completely.'
      }
    ],
    understandingResults:
      'Use 1/2-inch standard drywall for 16-inch OC walls and consider 5/8-inch Type X or sag-resistant board for ceilings or garage fire walls. Remember to add paper or fiberglass mesh joint tape alongside your mud order.',
    useCases: [
      {
        title: 'Basement & Room Addition Takeoffs',
        description: 'Build a complete gypsum board, fastener, and mud bill of materials in seconds.',
        targetAudience: 'Remodelers & DIY Builders',
        benefits: ['Compares 4×8 vs 4×12 quantities', 'Includes screws and mud', 'Prevents mid-job supply runs']
      }
    ],
    faqs: [
      {
        question: 'How many screws are needed per drywall sheet?',
        answer: 'Standard 16-inch stud spacing requires roughly 32 screws per 4×8 sheet and ~48 screws per 4×12 sheet (about 1 screw every 12" in the field and 8" along edges).'
      },
      {
        question: 'Should I pick 4×8 or 4×12 drywall sheets?',
        answer: 'Choose 4×8 for solo handling, tight hallways, and closets; choose 4×12 on open long walls with two installers to minimize vertical butt seams.'
      }
    ],
    importantNotes: [
      'Use moisture-resistant ("green/purple board") or cement backer board in bathrooms and shower surrounds rather than standard drywall.'
    ]
  },

  'mulch-gravel-calculator': {
    introduction:
      'Garden beds, walkways, and French drains look simple until you stand in front of palletized bags or try converting square footage at 3 inches deep into bulk dump-truck cubic yards. Estimating accurately saves both back-breaking hauling trips and unnecessary delivery surcharges.\n\nThe Mulch, Soil & Gravel Calculator converts landscape bed square footage and desired inch depth into exact cubic feet, bulk cubic yards, estimated gravel weight in short tons, and 2-cubic-foot retail bag counts.',
    howItWorks: {
      summary:
        'The calculator turns bed depth in inches into feet, multiplies by surface area for cubic feet, divides by 27 for cubic yards, and estimates equivalent gravel tonnage and 2-cu-ft bags.',
      steps: [
        {
          title: '1. Convert Depth to Feet',
          detail: 'Divides desired layer thickness in inches by 12 to align units with square feet.'
        },
        {
          title: '2. Compute Cubic Feet & Cubic Yards',
          detail: 'Multiplies area (sq ft) by depth (ft) for cubic feet, then divides by 27 to yield bulk cubic yards.'
        },
        {
          title: '3. Estimate Gravel Weight & Retail Bags',
          detail: 'Multiplies cubic yards by ~1.4 tons/cu yd for crushed gravel weight and divides cubic feet by 2 (rounding up) for standard 2-cu-ft bags.'
        }
      ],
      keyAssumptions: [
        'One cubic yard equals 27 cubic feet.',
        'Crushed stone / pea gravel density averages ~1.4 short tons (~2,800 lbs) per cubic yard.',
        'Retail mulch bags are modeled at standard 2-cubic-foot bag volume.'
      ]
    },
    formula: {
      title: 'Landscape Material Volume & Tonnage Formulas',
      equation: 'Cu Yd = [Area × (Depth_in / 12)] / 27 | Gravel Tons ≈ Cu Yd × 1.4',
      variables: [
        { symbol: 'Area', name: 'Coverage Area', description: 'Total square footage of beds, paths, or patios', unit: 'sq ft' },
        { symbol: 'Depth_in', name: 'Layer Thickness', description: 'Desired coverage depth (e.g., 2–4 inches for mulch)', unit: 'inches' },
        { symbol: 'Bags', name: '2-Cu-Ft Bags', description: '⌈ Cubic Feet / 2 ⌉ retail bags needed', unit: 'Count' }
      ],
      explanation:
        'Bulk yards are always sold by volume for mulch and topsoil, while landscape yards frequently price crushed stone or river rock by the ton (~1.4 tons per cubic yard).'
    },
    examples: [
      {
        title: 'Mulching Front Flower Beds',
        scenario: 'A homeowner covers 360 sq ft of planting beds with 3 inches of hardwood bark mulch.',
        inputs: {
          'Coverage Area': '360 sq ft',
          'Depth': '3 inches'
        },
        steps: [
          'Cubic feet = 360 × (3 / 12) = 360 × 0.25 = 90 cu ft',
          'Bulk Cubic Yards = 90 / 27 = 3.33 cu yd',
          'Equivalent 2-cu-ft Bags = ⌈ 90 / 2 ⌉ = 45 bags',
          'If ordering gravel instead: 3.33 × 1.4 = 4.67 tons'
        ],
        result: '3.33 Cubic Yards (or 45 Bags of 2 cu ft | 4.67 Tons if Gravel)',
        takeaway: 'Above 2 cubic yards (27+ bags), bulk dump-truck or trailer pickup is usually far cheaper and spares handling 45 separate plastic bags.'
      }
    ],
    understandingResults:
      'Use 2 inches of mulch when refreshing existing beds and 3 inches for fresh weed suppression; avoid piling mulch thicker than 4 inches against tree trunks ("mulch volcanoes"). For gravel driveways or paver bases, account for ~10%–15% compaction settling when ordering.',
    useCases: [
      {
        title: 'Bulk Yard vs. Bag Cost Check',
        description: 'Compare retail bagged mulch pricing against local landscape yard bulk cubic-yard pricing.',
        targetAudience: 'Homeowners & Landscapers',
        benefits: ['Instant bag-to-yard translation', 'Converts stone volume to tons', 'Prevents bare spots']
      }
    ],
    faqs: [
      {
        question: 'How many 2-cubic-foot bags equal one cubic yard?',
        answer: 'Since 1 cubic yard is 27 cubic feet, it takes 13.5 bags of 2-cu-ft mulch (or 14 whole bags) to equal one cubic yard.'
      },
      {
        question: 'Why does gravel weight vary by stone type?',
        answer: 'Porous lava rock weighs under 1 ton per cubic yard, while dense crushed granite or limestone averages 1.35 to 1.5 tons per cubic yard.'
      }
    ],
    importantNotes: [
      'When ordering compost or screened topsoil that settles after watering, add ~10% extra volume.'
    ]
  },

  'deck-lumber-calculator': {
    introduction:
      'Outdoor deck planks are sold in standard lengths—commonly 12-foot or 16-foot boards—and nominal "6-inch" decking (2×6 or 5/4×6) actually measures 5.5 inches wide. Forgetting actual milled width leads to buying the wrong number of planks.\n\nThe Decking & Lumber Board Footage Calculator converts overall deck length and width into total square footage, exact linear feet of decking needed for 3.5-inch (2×4), 5.5-inch (2×6), or 7.25-inch (2×8) boards, and estimated 16-ft board counts with a built-in 10% cut-waste buffer.',
    howItWorks: {
      summary:
        'The calculator computes deck surface area, divides by actual board width in feet to derive linear footage, divides by 16-ft stock lengths, and applies a 10% waste multiplier rounded up.',
      steps: [
        {
          title: '1. Calculate Total Deck Surface Area',
          detail: 'Multiplies deck length by deck width in feet.'
        },
        {
          title: '2. Convert Actual Board Width to Feet',
          detail: 'Converts your selected milled board width (3.5", 5.5", or 7.25") into decimal feet by dividing by 12.'
        },
        {
          title: '3. Solve Linear Feet & 16-ft Board Count',
          detail: 'Divides deck sq ft by board width in feet for net linear footage, divides by 16 ft, multiplies by 1.10 (10% waste), and rounds up.'
        }
      ],
      keyAssumptions: [
        'Uses actual milled lumber widths (5.5" for 2×6, 3.5" for 2×4, 7.25" for 2×8).',
        'Includes a 10% end-trim and board-defect allowance inside the 16-ft board count.',
        'Covers top surface decking planks only; joists, beams, posts, and fascia are priced separately.'
      ]
    },
    formula: {
      title: 'Decking Linear Feet & 16-ft Board Formula',
      equation: 'Linear Ft = (L × W) / (Width_in / 12) | 16-ft Boards = ⌈ (Linear Ft / 16) × 1.10 ⌉',
      variables: [
        { symbol: 'L, W', name: 'Deck Length & Width', description: 'Overall deck floor footprint in feet', unit: 'ft' },
        { symbol: 'Width_in', name: 'Actual Board Width', description: 'Actual plank width (3.5", 5.5", or 7.25")', unit: 'inches' },
        { symbol: '1.10', name: 'Waste Multiplier', description: '10% extra allowance for end cuts and crowning defects', unit: 'Factor' }
      ],
      explanation:
        'Dividing square footage by board width in feet gives exact linear footage required; dividing by stock length (16 ft) with a 10% buffer outputs purchasable plank count.'
    },
    examples: [
      {
        title: '16 × 12 ft Backyard Patio Deck',
        scenario: 'A homeowner builds a 16 ft × 12 ft backyard deck using standard 5/4×6 or 2×6 decking boards (5.5 inches actual width).',
        inputs: {
          'Deck Dimensions': '16 ft × 12 ft',
          'Actual Board Width': '5.5 inches (Standard 2×6)',
          'Stock Board Length': '16 ft (incl. 10% waste)'
        },
        steps: [
          'Total Deck Area = 16 × 12 = 192 sq ft',
          'Board width in feet = 5.5 / 12 = 0.4583 ft',
          'Linear feet needed = 192 / 0.4583 = 418.9 linear ft',
          '16-ft boards (with 10% waste) = ⌈ (418.9 / 16) × 1.10 ⌉ = ⌈ 28.80 ⌉ = 29 boards'
        ],
        result: '192 sq ft | 418.9 Linear Feet | 29 Boards (16-ft)',
        takeaway: 'Using 16-ft boards along the 16-ft span avoids unsightly butt joints completely across the main deck floor.'
      }
    ],
    understandingResults:
      'Notice how buying stock lengths that match one dimension of your deck minimizes butt seams and reduces scrap waste. If installing boards diagonally at 45 degrees, add another 5%–10% to your order to cover angled miter trimmings.',
    useCases: [
      {
        title: 'Resurfacing Existing Deck Framing',
        description: 'Price pressure-treated pine, cedar, or composite planks rapidly before picking up lumber.',
        targetAudience: 'Carpenters & Homeowners',
        benefits: ['Uses true 5.5" milled width', 'Built-in 10% waste buffer', 'Compares board width costs']
      }
    ],
    faqs: [
      {
        question: 'Do I need to account for gaps between deck boards?',
        answer: 'Standard 1/8" to 1/4" drainage spacing slightly reduces net board count, which helps offset minor width shrinkage—keeping the 10% buffer safe for defective boards and cuts.'
      },
      {
        question: 'Are hidden fasteners or screws included?',
        answer: 'No. Budget roughly 350 deck screws or hidden fastener clips per 100 sq ft on 16-inch joist spacing.'
      }
    ],
    importantNotes: [
      'Always inspect pressure-treated boards at the lumberyard and discard severely twisted or split planks before delivery.'
    ]
  },

  'ohms-law-calculator': {
    introduction:
      'Every DC circuit—from automotive 12V LED strips and solar battery banks to microcontroller resistors—is governed by the exact relationship between Voltage (V), Current (I), Resistance (R), and Electrical Power (P). Knowing any two of these quantities uniquely determines the remaining two.\n\nThe Ohm’s Law & Electrical Power Calculator automatically detects whichever two valid inputs you supply among Voltage, Current, Resistance, and Power and solves the remaining two variables to three-decimal precision.',
    howItWorks: {
      summary:
        'Using Ohm’s Law (V = I × R) combined with Joule’s Power Law (P = V × I), the calculator routes any pair of known values through the appropriate closed-form algebraic identities.',
      steps: [
        {
          title: '1. Enter Any Two Known Values',
          detail: 'Type positive numbers into any two of the four fields: Voltage (V), Current (A), Resistance (Ω), or Power (W).'
        },
        {
          title: '2. Select Solving Identities',
          detail: 'Applies the matching pair of equations (for example, R = V / I and P = V × I when Voltage and Current are known).'
        },
        {
          title: '3. Solve & Round to Millis',
          detail: 'Outputs Voltage, Current, Resistance, and Power simultaneously in the summary banner with one-click copy.'
        }
      ],
      keyAssumptions: [
        'Applies to linear resistive loads in DC circuits (or purely resistive AC circuits with power factor = 1).',
        'Conductor wire losses and temperature resistance drift are neglected unless included inside R.'
      ]
    },
    formula: {
      title: 'Ohm’s Law & Wattage Power Identities',
      equation: 'V = I × R  |  P = V × I = I² × R = V² / R',
      variables: [
        { symbol: 'V', name: 'Voltage', description: 'Electrical potential difference across load', unit: 'Volts (V)' },
        { symbol: 'I', name: 'Current', description: 'Rate of electrical charge flow', unit: 'Amperes (A)' },
        { symbol: 'R', name: 'Resistance', description: 'Opposition to electrical current flow', unit: 'Ohms (Ω)' },
        { symbol: 'P', name: 'Power', description: 'Rate of electrical energy transfer or heat dissipation', unit: 'Watts (W)' }
      ],
      explanation:
        'Substituting V = IR into P = VI creates twelve direct algebraic formulas covering every two-variable combination on the Ohm’s Law wheel.'
    },
    examples: [
      {
        title: 'Automotive 12V Accessory Load Check',
        scenario: 'A 12V car accessory draws 2.0 Amps of continuous current. Find its effective resistance and power draw.',
        inputs: {
          'Voltage (V)': '12 V',
          'Current (I)': '2 A'
        },
        steps: [
          'Resistance (R) = V / I = 12 V / 2 A = 6 Ω',
          'Power (P) = V × I = 12 V × 2 A = 24 W'
        ],
        result: 'Resistance: 6 Ω | Power: 24 W',
        takeaway: 'Because the load draws 24W (2A), a 3A or 5A inline fuse and minimum 20 AWG wire safely handle the circuit.'
      }
    ],
    understandingResults:
      'Use the calculated Current (Amps) to size circuit breakers, fuses, and copper wire gauges, and use Power (Watts) to pick resistor wattage ratings—always choose resistors rated for at least 2× the calculated wattage to prevent overheating.',
    useCases: [
      {
        title: 'Electronics Prototyping & Resistor Sizing',
        description: 'Solve current-limiting resistor values and power dissipation ratings instantly.',
        targetAudience: 'Electrical Engineers & Makers',
        benefits: ['Solves all 6 input pairs', 'Prevents under-rated resistors', 'Clear unit labels']
      },
      {
        title: '12V/24V Solar & RV Wiring',
        description: 'Convert appliance wattage into battery amp draw to size fuses and inverters.',
        targetAudience: 'Technicians & DIY Solar Builders',
        benefits: ['Fast amp-hour load planning', 'Instant fuse check', 'Zero algebra errors']
      }
    ],
    faqs: [
      {
        question: 'What happens if I enter three or four values instead of two?',
        answer: 'Only two independent parameters define the circuit; entering extra conflicting fields prioritizes the first matching pair in code order, so leave the two unknown boxes blank.'
      },
      {
        question: 'Does Ohm’s Law apply directly to AC motors or transformers?',
        answer: 'No. Inductive AC loads have impedance (Z) and phase-angle power factors (< 1), whereas pure Ohm’s Law assumes purely resistive loads.'
      }
    ],
    importantNotes: [
      'Always clear unknown fields before entering a new pair of known electrical quantities.'
    ]
  },

  'density-calculator': {
    introduction:
      'Whether verifying the purity of a metal bar, sizing a chemical solution tank, or checking whether an object will float in water (1.0 g/cm³), density connects physical mass and spatial volume.\n\nThe Density, Mass & Volume Calculator solves for any one of the three physical quantities—Density (ρ), Mass (m), or Volume (V)—from the other two, reporting standard g/cm³ and kg/m³ values.',
    howItWorks: {
      summary:
        'Using the fundamental density equation ρ = m / V, the calculator rearranges to solve directly for whichever target variable you choose.',
      steps: [
        {
          title: '1. Pick Target Variable',
          detail: 'Select whether you are solving for Density (ρ), Mass (m), or Volume (V).'
        },
        {
          title: '2. Enter Known Measurements',
          detail: 'Provide mass in grams (g) and/or volume in cubic centimeters / milliliters (cm³ or mL), or density in g/cm³.'
        },
        {
          title: '3. Compute Exact Result & SI Unit',
          detail: 'Outputs the solved variable and multiplies g/cm³ by 1,000 to display kg/m³ density alongside.'
        }
      ],
      keyAssumptions: [
        'Material is homogeneous (uniform composition throughout the volume).',
        '1 g/cm³ equals 1,000 kg/m³, and 1 cm³ equals 1 mL.'
      ]
    },
    formula: {
      title: 'Density, Mass & Volume Equations',
      equation: 'ρ = m / V  |  m = ρ × V  |  V = m / ρ',
      variables: [
        { symbol: 'ρ', name: 'Density', description: 'Mass per unit volume', unit: 'g/cm³ or kg/m³' },
        { symbol: 'm', name: 'Mass', description: 'Total matter contained in sample', unit: 'grams (g)' },
        { symbol: 'V', name: 'Volume', description: 'Three-dimensional space occupied', unit: 'cm³ (mL)' }
      ],
      explanation:
        'Because metric volume (cm³) aligns cleanly with grams for water (1.00 g/cm³), converting to standard SI kg/m³ simply multiplies g/cm³ by 1,000.'
    },
    examples: [
      {
        title: 'Identifying an Unknown Metal Block',
        scenario: 'A machined metal block weighs 270 grams and displaces 100 cm³ (100 mL) of water.',
        inputs: {
          'Solve For': 'Density (ρ)',
          'Mass (m)': '270 g',
          'Volume (V)': '100 cm³'
        },
        steps: [
          'ρ = m / V = 270 g / 100 cm³ = 2.70 g/cm³',
          'Convert to SI: 2.70 × 1,000 = 2,700 kg/m³'
        ],
        result: 'Density: 2.70 g/cm³ (2,700 kg/m³)',
        takeaway: 'A density of 2.70 g/cm³ closely matches standard aluminum alloy, distinguishing it immediately from steel (~7.85 g/cm³).'
      }
    ],
    understandingResults:
      'Compare calculated density against freshwater (1.0 g/cm³): solids with density below 1.0 g/cm³ float, while denser materials sink. Use the Mass mode to compute shipping weight for raw metal bar stock from dimensions and catalog density.',
    useCases: [
      {
        title: 'Chemistry & Physics Labs',
        description: 'Determine unknown sample densities via water-displacement volume measurements.',
        targetAudience: 'Students & Lab Technicians',
        benefits: ['Solves all 3 variables', 'Instant kg/m³ conversion', 'Clean decimal output']
      }
    ],
    faqs: [
      {
        question: 'Does temperature affect liquid density?',
        answer: 'Yes. Most liquids expand slightly as they heat up, lowering their density—freshwater peaks in density at ~4°C (1.000 g/cm³).'
      },
      {
        question: 'Is cm³ the same as mL?',
        answer: 'Yes, 1 cubic centimeter (cm³ or cc) equals exactly 1 milliliter (mL).'
      }
    ],
    importantNotes: [
      'Make sure mass is entered in grams and volume in cm³ (mL) for g/cm³ output.'
    ]
  },

  'energy-calculator': {
    introduction:
      'Mechanical physics problems—from dropped objects and roller coasters to vehicle braking impact—rely on tracking how kinetic energy (energy of motion) and gravitational potential energy (energy of height) exchange into total mechanical energy.\n\nThe Kinetic & Potential Energy Calculator computes translational Kinetic Energy (½mv²), Gravitational Potential Energy (mgh), and combined Total Mechanical Energy in Joules (J) from mass, velocity, and height.',
    howItWorks: {
      summary:
        'Using Earth’s standard gravitational acceleration (g = 9.80665 m/s²), the calculator evaluates both motion and elevation energy equations simultaneously.',
      steps: [
        {
          title: '1. Enter Mass, Velocity & Height',
          detail: 'Specify object mass (kg), speed (m/s), and elevation above reference zero (m).'
        },
        {
          title: '2. Compute Kinetic Energy (KE)',
          detail: 'Squares velocity, multiplies by mass, and halves the product (0.5 × m × v²).'
        },
        {
          title: '3. Compute Potential Energy (PE) & Total',
          detail: 'Multiplies mass × 9.80665 × height for Potential Energy and sums KE + PE in Joules.'
        }
      ],
      keyAssumptions: [
        'Assumes standard Earth surface gravity g = 9.80665 m/s².',
        'Speeds are non-relativistic (far below the speed of light).'
      ]
    },
    formula: {
      title: 'Kinetic, Potential & Total Mechanical Energy Equations',
      equation: 'KE = ½ m v²  |  PE = m g h  |  E_total = KE + PE',
      variables: [
        { symbol: 'm', name: 'Mass', description: 'Object mass in kilograms', unit: 'kg' },
        { symbol: 'v', name: 'Velocity', description: 'Object speed in meters per second', unit: 'm/s' },
        { symbol: 'h', name: 'Height', description: 'Vertical height above reference ground level', unit: 'm' },
        { symbol: 'g', name: 'Gravity', description: 'Standard Earth gravitational acceleration (9.80665)', unit: 'm/s²' }
      ],
      explanation:
        'Because velocity is squared inside KE = ½mv², doubling speed quadruples kinetic energy, whereas doubling height only doubles potential energy.'
    },
    examples: [
      {
        title: 'Drone Flight Energy Snapshot',
        scenario: 'A 10 kg cargo drone flies at 6 m/s at an altitude of 5 meters.',
        inputs: {
          'Mass (m)': '10 kg',
          'Velocity (v)': '6 m/s',
          'Height (h)': '5 m'
        },
        steps: [
          'Kinetic Energy (KE) = 0.5 × 10 × 6² = 5 × 36 = 180.00 J',
          'Potential Energy (PE) = 10 × 9.80665 × 5 = 490.33 J',
          'Total Mechanical Energy = 180.00 + 490.33 = 670.33 J'
        ],
        result: 'KE: 180.00 J | PE: 490.33 J | Total: 670.33 J',
        takeaway: 'One Joule equals 1 kg·m²/s² (or 1 Watt-second); 670.33 J is the minimum mechanical energy needed to bring the drone to that speed and altitude.'
      }
    ],
    understandingResults:
      'Observe how KE and PE scale differently: increasing speed changes stopping distance dramatically because KE grows with v². Divide Joules by 1,000 for kilojoules (kJ) or by 3,600 for Watt-hours (Wh).',
    useCases: [
      {
        title: 'Physics Mechanics & Safety Checks',
        description: 'Quantify drop-impact energy, projectile energy conservation, and kinetic energy growth.',
        targetAudience: 'Students & Mechanical Engineers',
        benefits: ['Instant Joule breakdown', 'Uses standard g = 9.80665 m/s²', 'Shows velocity-squared impact']
      }
    ],
    faqs: [
      {
        question: 'Why does doubling velocity quadruple kinetic energy?',
        answer: 'Because velocity appears squared (v²) in KE = ½mv²: (2v)² = 4v², so twice the speed carries four times the kinetic energy.'
      },
      {
        question: 'Can Potential Energy be negative?',
        answer: 'Mathematically yes, if you measure height below your chosen zero-reference datum, though height inputs here represent elevation above ground.'
      }
    ],
    importantNotes: [
      'Convert km/h to m/s by dividing by 3.6 (for example, 36 km/h = 10 m/s).'
    ]
  },

  'pressure-calculator': {
    introduction:
      'Hydraulic presses, tire gauges, structural bearing pads, and atmospheric barometers all measure the same fundamental quantity—force concentrated across a surface area—but express it in conflicting units like Pascals, PSI, Bar, and Atmospheres.\n\nThe Pressure & Force Calculator solves P = F / A from Force in Newtons (N) and Area in square meters (m²), presenting simultaneous results in Pascals (Pa), Kilopascals (kPa), PSI, Bar, and Atmospheres (atm).',
    howItWorks: {
      summary:
        'Divides perpendicular force (Newtons) by contact area (square meters) to yield Pascals (N/m²), then converts that baseline Pascal pressure across four industrial and scientific units.',
      steps: [
        {
          title: '1. Enter Force & Contact Area',
          detail: 'Input applied normal force in Newtons (N) and surface area in square meters (m²).'
        },
        {
          title: '2. Compute Pascals (N/m²)',
          detail: 'Divides Force by Area to calculate pressure in Pascals and Kilopascals (/ 1,000).'
        },
        {
          title: '3. Convert Across Global Units',
          detail: 'Converts Pascals to PSI (× 0.000145038), Bar (/ 100,000), and standard Atmospheres (/ 101,325).'
        }
      ],
      keyAssumptions: [
        'Force acts evenly and perpendicularly across the entered surface area.',
        'One standard atmosphere (1 atm) equals 101,325 Pascals.'
      ]
    },
    formula: {
      title: 'Mechanical Pressure Formula',
      equation: 'P (Pa) = Force (N) / Area (m²)  |  1 bar = 100,000 Pa ≈ 14.5038 PSI',
      variables: [
        { symbol: 'P', name: 'Pressure', description: 'Force per unit contact area', unit: 'Pascals (Pa)' },
        { symbol: 'F', name: 'Applied Force', description: 'Perpendicular load applied', unit: 'Newtons (N)' },
        { symbol: 'A', name: 'Surface Area', description: 'Area over which force is distributed', unit: 'm²' }
      ],
      explanation:
        'Even modest forces generate huge pressure when concentrated onto a tiny area (such as a hydraulic piston or sharp blade), whereas spreading weight across wide area sharply drops ground pressure.'
    },
    examples: [
      {
        title: 'Hydraulic Piston Surface Pressure',
        scenario: 'A 500 N force presses evenly onto a small piston face measuring 0.02 m².',
        inputs: {
          'Applied Force (F)': '500 N',
          'Contact Area (A)': '0.02 m²'
        },
        steps: [
          'Pressure (Pa) = 500 / 0.02 = 25,000 Pa (25.00 kPa)',
          'PSI = 25,000 × 0.000145038 = 3.63 PSI',
          'Bar = 25,000 / 100,000 = 0.250 Bar',
          'Atmospheres = 25,000 / 101,325 = 0.247 atm'
        ],
        result: '25,000 Pa (25 kPa) | 3.63 PSI | 0.250 Bar | 0.247 atm',
        takeaway: 'Notice how shrinking contact area to 0.002 m² would jump pressure tenfold to 250 kPa (36.3 PSI) with the exact same force.'
      }
    ],
    understandingResults:
      'Read Pascals/kPa for SI physics coursework, PSI for North American pneumatics and tires, Bar for European hydraulics, and atm for atmospheric or diving comparisons.',
    useCases: [
      {
        title: 'Hydraulics, Pneumatics & Footing Bearing',
        description: 'Convert Newton-per-square-meter engineering loads straight into shop-gauge PSI or Bar.',
        targetAudience: 'Engineers & Mechanics',
        benefits: ['Multi-unit readout', 'Supports tiny m² piston areas', 'Zero conversion lookup needed']
      }
    ],
    faqs: [
      {
        question: 'How do I convert cm² to m² before entering Area?',
        answer: 'Divide square centimeters by 10,000 (for example, 50 cm² = 0.005 m²).'
      },
      {
        question: 'What is the difference between Bar and Atmospheres (atm)?',
        answer: '1 Bar equals exactly 100,000 Pa, while 1 standard Atmosphere equals 101,325 Pa—about 1.3% higher than 1 Bar.'
      }
    ],
    importantNotes: [
      'Remember that 1 m² = 10,000 cm²—do not divide cm² by 100 when converting area.'
    ]
  },

  'speed-of-sound-calculator': {
    introduction:
      'Sound does not travel at one fixed speed—in dry air, acoustic wave velocity depends directly on air temperature, slowing down significantly in freezing high-altitude air compared to a warm summer runway. As a result, an aircraft’s Mach number changes with altitude and temperature even at constant airspeed.\n\nThe Speed of Sound & Mach Calculator computes acoustic velocity in dry air in m/s, km/h, and mph for any Celsius temperature, and converts an object’s speed (km/h) into its exact Mach number and aerodynamic flight regime.',
    howItWorks: {
      summary:
        'Using the ideal-gas thermodynamic speed-of-sound model anchored at 331.3 m/s at 0°C, the calculator scales speed by the square root of absolute Kelvin ratio and divides vehicle speed by local speed of sound.',
      steps: [
        {
          title: '1. Convert Temperature to Speed of Sound',
          detail: 'Applies c = 331.3 × √(1 + T_c / 273.15) to determine acoustic velocity in meters per second.'
        },
        {
          title: '2. Convert to km/h and mph',
          detail: 'Multiplies m/s by 3.6 for km/h and by 0.621371 for miles per hour.'
        },
        {
          title: '3. Compute Mach Number & Flight Regime',
          detail: 'Divides object speed (km/h) by local speed of sound (km/h) and classifies Subsonic (<0.8), Transonic (0.8–1.2), Supersonic (1.2–5), or Hypersonic (5+).'
        }
      ],
      keyAssumptions: [
        'Models dry air assuming ideal-gas behavior (γ = 1.4, speed at 0°C = 331.3 m/s).',
        'High humidity slightly increases sound speed (by under ~0.5% at typical ambient temperatures).'
      ]
    },
    formula: {
      title: 'Thermodynamic Speed of Sound & Mach Formula',
      equation: 'c (m/s) = 331.3 × √(1 + T_c / 273.15) | Mach = Speed / c',
      variables: [
        { symbol: 'c', name: 'Speed of Sound', description: 'Acoustic velocity in dry air at temperature T_c', unit: 'm/s' },
        { symbol: 'T_c', name: 'Air Temperature', description: 'Ambient air temperature in degrees Celsius', unit: '°C' },
        { symbol: 'Mach', name: 'Mach Number', description: 'Ratio of object speed to local speed of sound', unit: 'Dimensionless' }
      ],
      explanation:
        'Because sound speed scales with the square root of absolute temperature in Kelvin (T_c + 273.15), sound travels faster in warm ground-level air than in -55°C stratospheric cruise air.'
    },
    examples: [
      {
        title: 'Commercial Jet at Room Temperature vs. Cruise Speed',
        scenario: 'Find the speed of sound at 20°C and the Mach number of an aircraft flying at 900 km/h at that temperature.',
        inputs: {
          'Air Temperature': '20°C',
          'Object Speed': '900 km/h'
        },
        steps: [
          'c = 331.3 × √(1 + 20 / 273.15) = 331.3 × √1.07322 = 343.21 m/s',
          'Convert to km/h: 343.21 × 3.6 = 1,235.57 km/h (767.75 mph)',
          'Mach Number = 900 / 1,235.57 = Mach 0.73 (Subsonic)'
        ],
        result: 'Speed of Sound: 343.21 m/s (1,235.6 km/h) | Mach 0.73 (Subsonic)',
        takeaway: 'At high altitude (-50°C), speed of sound drops to ~1,078 km/h, pushing the exact same 900 km/h jet into the transonic Mach 0.83 range.'
      }
    ],
    understandingResults:
      'Review both the acoustic velocity and the Mach classification badge. Aircraft approaching Mach 0.8 enter the Transonic regime where localized airflow over wings first reaches Mach 1, dramatically increasing aerodynamic wave drag.',
    useCases: [
      {
        title: 'Aerodynamics & Aviation Study',
        description: 'Check how cold high-altitude temperatures shift Mach numbers relative to ground-level speed.',
        targetAudience: 'Aviation Enthusiasts & Physics Students',
        benefits: ['Accurate Kelvin temperature scaling', 'Simultaneous m/s, km/h, mph', 'Regime classification']
      }
    ],
    faqs: [
      {
        question: 'Does air pressure change the speed of sound?',
        answer: 'For an ideal gas at constant temperature, air pressure and density cancel each other out, so temperature is the dominant driver of sound speed in air.'
      },
      {
        question: 'What temperature is standard sea level (15°C)?',
        answer: 'At ISA sea-level 15°C, the speed of sound is 340.3 m/s (1,225 km/h or 761 mph).'
      }
    ],
    importantNotes: [
      'Do not enter temperatures below -273.15°C (absolute zero).'
    ]
  },

  'crypto-profit-calculator': {
    introduction:
      'Judging a cryptocurrency trade strictly by percentage price jump overlooks exchange maker/taker fees charged on both entry and exit. On tight swing trades or small altcoin allocations, paying 0.5% to 1.5% on each leg noticeably shrinks real take-home return.\n\nThe Crypto Profit & Loss (PnL) Calculator computes exact tokens acquired after your buy fee, gross exit payout, sell fee deduction, net dollar profit or loss, and exact Return on Investment (ROI %) from entry to exit.',
    howItWorks: {
      summary:
        'The calculator deducts your buy exchange fee from invested capital before calculating coins acquired, multiplies coins by sell price, subtracts your sell exchange fee, and compares net payout against original investment.',
      steps: [
        {
          title: '1. Deduct Buy Fee & Compute Coins Held',
          detail: 'Subtracts (Investment × Buy Fee %) from total capital and divides by Buy Price per coin to find net coins acquired.'
        },
        {
          title: '2. Compute Exit Value & Deduct Sell Fee',
          detail: 'Multiplies coins held by Target/Sell Price and subtracts (Gross Exit × Sell Fee %) to obtain Total Payout.'
        },
        {
          title: '3. Report Net Profit & ROI %',
          detail: 'Subtracts initial Investment Amount from Total Payout to show net PnL, combined exchange fees paid, and percentage ROI.'
        }
      ],
      keyAssumptions: [
        'Buy fee is deducted directly from your starting investment budget.',
        'Capital gains taxes and blockchain network gas/withdrawal fees are excluded unless added to fee percentages.'
      ]
    },
    formula: {
      title: 'Crypto Trade PnL & Fee-Adjusted ROI Formulas',
      equation: 'Coins = [Inv × (1 - f_b)] / P_buy  |  Payout = (Coins × P_sell) × (1 - f_s)',
      variables: [
        { symbol: 'Inv', name: 'Total Investment', description: 'Initial cash committed to the trade', unit: 'Currency ($)' },
        { symbol: 'P_buy, P_sell', name: 'Entry & Exit Prices', description: 'Coin price at purchase and target sale', unit: 'Currency ($)' },
        { symbol: 'f_b, f_s', name: 'Buy & Sell Fee Rates', description: 'Exchange trading fee percentages as decimals', unit: 'Decimal' }
      ],
      explanation:
        'Net Profit equals Payout minus Initial Investment, while ROI% equals (Net Profit / Initial Investment) × 100.'
    },
    examples: [
      {
        title: 'Bitcoin Trade with 0.5% Entry & Exit Fees',
        scenario: 'A trader invests $1,000 into Bitcoin at $60,000, sells at $85,000, and pays a 0.5% exchange fee on both buy and sell orders.',
        inputs: {
          'Total Investment': '$1,000',
          'Buy / Sell Price': '$60,000 → $85,000',
          'Buy / Sell Fee': '0.5% / 0.5%'
        },
        steps: [
          'Buy fee = $1,000 × 0.005 = $5.00 → Net invested = $995.00',
          'Coins acquired = $995 / $60,000 = 0.016583 BTC',
          'Gross exit = 0.01658333 × $85,000 = $1,409.58',
          'Sell fee = $1,409.58 × 0.005 = $7.05 → Net Payout = $1,402.54',
          'Net Profit = $1,402.54 - $1,000 = $402.54 (+40.3% ROI, $12.05 total fees)'
        ],
        result: 'Net Profit: $402.54 (+40.3% ROI) | Exit Payout: $1,402.54',
        takeaway: 'Though Bitcoin rose 41.67% ($60k → $85k), two 0.5% trading fees trimmed net ROI slightly to 40.3%.'
      }
    ],
    understandingResults:
      'Review Exchange Fees Paid alongside Net Profit. Switching from retail "instant buy" interfaces (~1.5%–3% spread/fee) to exchange limit orders (0.1%–0.5%) preserves meaningful profits across frequent trades.',
    useCases: [
      {
        title: 'Target Take-Profit Planning',
        description: 'Test target exit prices in advance to confirm post-fee profit justifies the trade risk.',
        targetAudience: 'Crypto Traders & Investors',
        benefits: ['Includes two-way exchange fees', 'Accurate fractional coin precision', 'Instant ROI check']
      }
    ],
    faqs: [
      {
        question: 'Does this include crypto capital gains taxes?',
        answer: 'No. Realized crypto gains are taxable events in most countries; use our Capital Gains Tax Calculator to estimate taxes on realized net profit.'
      },
      {
        question: 'Can I set fees to 0% to model fee-free pairs?',
        answer: 'Yes. Enter 0 in both Buy Fee and Sell Fee boxes to calculate raw pre-fee PnL.'
      }
    ],
    importantNotes: [
      'Volatility and slippage on thin order books can affect actual fill prices on market orders.'
    ]
  },

  'crypto-dca-calculator': {
    introduction:
      'Timing exact market bottoms in volatile digital assets like Bitcoin or Ethereum is notoriously difficult—buying in one lump sum right before a drawdown leaves investors frustrated. Dollar Cost Averaging (DCA) spreads purchases out over regular monthly intervals regardless of short-term price swings.\n\nThe Crypto Dollar Cost Averaging (DCA) Simulator models steady monthly contributions compounded over your chosen timeframe and assumed annual return rate, comparing Total Capital Invested against Projected Portfolio Value, Net Profit, and Total ROI%.',
    howItWorks: {
      summary:
        'The simulator steps month by month over your chosen number of years, adding each fixed monthly deposit and compounding the running portfolio balance at one-twelfth of your annual growth rate.',
      steps: [
        {
          title: '1. Set Monthly Contribution & Horizon',
          detail: 'Enter your recurring monthly buy amount and total simulation duration in years.'
        },
        {
          title: '2. Choose Assumed Annual Growth Rate',
          detail: 'Set an expected annualized compound return percentage to test conservative or optimistic scenarios.'
        },
        {
          title: '3. Compound Monthly Contributions',
          detail: 'Iterates across every month: updates balance = (balance + deposit) × (1 + annualRate / 12) and compares ending value against total cash deposited.'
        }
      ],
      keyAssumptions: [
        'Models smooth steady monthly compounding rather than volatile historical boom-and-bust cycles.',
        'Recurring deposits occur at the beginning of each monthly interval.',
        'Assumed growth rate is hypothetical—cryptocurrency prices fluctuate sharply and never compound linearly.'
      ]
    },
    formula: {
      title: 'Monthly Compounded DCA Accumulation Formula',
      equation: 'FV = PMT × [ ((1 + r/12)^(12t) - 1) / (r/12) ] × (1 + r/12)',
      variables: [
        { symbol: 'PMT', name: 'Monthly Purchase', description: 'Fixed dollar amount invested every month', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Annual Growth Rate', description: 'Hypothetical annualized return as a decimal', unit: 'Decimal' },
        { symbol: 't', name: 'Duration', description: 'Investment horizon in years', unit: 'Years' }
      ],
      explanation:
        'Because each monthly buy happens at the start of its interval and compounds across the remaining months, earlier buys accumulate over the full horizon while later buys contribute steady dollar averaging.'
    },
    examples: [
      {
        title: '2-Year Monthly Bitcoin Accumulation Plan',
        scenario: 'An investor automates $200/month for 2 years (24 months) under a hypothetical 12% annual growth assumption.',
        inputs: {
          'Monthly Contribution': '$200',
          'Duration': '2 Years (24 months)',
          'Assumed Annual Growth': '12% (1%/month)'
        },
        steps: [
          'Total Capital Invested = $200 × 24 = $4,800',
          'Monthly rate = 0.12 / 12 = 0.01',
          'Future Value = $200 × [((1.01)^24 - 1) / 0.01] × 1.01 = $5,448.64',
          'Projected Profit = $5,448.64 - $4,800 = $648.64 (+13.5% ROI)'
        ],
        result: 'Invested: $4,800 | Projected Portfolio: $5,449 | Gain: $649 (13.5%)',
        takeaway: 'DCA builds position size methodically out of monthly cash flow without requiring a large upfront lump sum.'
      }
    ],
    understandingResults:
      'Compare Total Capital Invested against Estimated Return & Profit. Because crypto returns are highly volatile rather than smooth 12% lines, run both conservative (e.g., 5%–8%) and aggressive scenarios to keep expectations grounded.',
    useCases: [
      {
        title: 'Automated Accumulation Budgeting',
        description: 'See how modest weekly or monthly crypto buys add up over multi-year market cycles.',
        targetAudience: 'Long-Term Crypto Savers',
        benefits: ['Encourages consistent discipline', 'Avoids lump-sum timing anxiety', 'Visualizes total cost basis']
      }
    ],
    faqs: [
      {
        question: 'Does real-world DCA always beat lump-sum investing?',
        answer: 'In steadily rising markets, lump-sum investing often captures more upside earlier. DCA excels at reducing emotional regret and smoothing entry cost during volatile sideways or bear markets.'
      },
      {
        question: 'Can I test 0% growth to check my pure cash cost basis?',
        answer: 'Yes. Setting annual growth to 0% shows exact accumulated cash contributions.'
      }
    ],
    importantNotes: [
      'Recurring exchange purchases can carry spread markups—check fee schedules before automating small buys.'
    ]
  },

  'staking-rewards-calculator': {
    introduction:
      'Proof-of-Stake (PoS) networks like Ethereum, Solana, and Cardano let token holders earn staking yield by delegating tokens to validators. When rewards automatically restake each day, effective annual yield exceeds the headline rate.\n\nThe Crypto Staking APY & Rewards Calculator projects exact ending token balances and total token rewards earned using daily compounding over any number of staking days.',
    howItWorks: {
      summary:
        'Divides your staking APY by 365 to derive the daily yield rate, compounds your staked token principal across the specified number of days, and subtracts initial tokens to isolate pure reward yield.',
      steps: [
        {
          title: '1. Enter Token Stake, APY & Days',
          detail: 'Specify how many tokens you plan to stake, expected annual percentage yield (APY %), and lock or holding duration in days.'
        },
        {
          title: '2. Compound Daily Yield',
          detail: 'Applies daily compounding: Ending Tokens = Staked × (1 + APY / 365)^Days.'
        },
        {
          title: '3. Report Tokens Earned',
          detail: 'Subtracts initial principal to show exact new tokens generated by staking.'
        }
      ],
      keyAssumptions: [
        'Staking rewards auto-compound daily with zero unbonding idle gaps.',
        'Validator commission fees are already reflected inside the APY % you enter.',
        'Calculates yield strictly in token count rather than fiat USD value, which fluctuates with token market price.'
      ]
    },
    formula: {
      title: 'Daily Compounded Staking Yield Formula',
      equation: 'Ending Tokens = Principal × (1 + APY / 365)^Days | Rewards = Ending - Principal',
      variables: [
        { symbol: 'Principal', name: 'Staked Tokens', description: 'Number of tokens initially staked', unit: 'Tokens' },
        { symbol: 'APY', name: 'Annual Percentage Yield', description: 'Annualized staking reward rate as decimal', unit: 'Decimal' },
        { symbol: 'Days', name: 'Staking Duration', description: 'Number of calendar days staked', unit: 'Days' }
      ],
      explanation:
        'Daily compounding raises a nominal 8.0% annual rate to an effective ~8.33% annual token yield if rewards remain staked throughout the year.'
    },
    examples: [
      {
        title: 'One-Year PoS Delegation Yield',
        scenario: 'A holder stakes 100 tokens at an 8% net APY for 365 days with automatic reward compounding.',
        inputs: {
          'Staked Amount': '100 tokens',
          'Annual APY': '8%',
          'Duration': '365 days'
        },
        steps: [
          'Daily rate = 0.08 / 365 = 0.00021918',
          'Ending Balance = 100 × (1 + 0.00021918)^365 = 108.33 tokens',
          'Rewards Earned = 108.33 - 100 = 8.33 tokens'
        ],
        result: 'Ending Balance: 108.33 Tokens | Rewards: +8.33 Tokens',
        takeaway: 'Daily restaking generates 0.33 extra tokens compared to simple non-compounded annual yield (8.00 tokens).'
      }
    ],
    understandingResults:
      'Focus on token accumulation rather than fiat return alone. An 8% token yield still loses fiat value if the underlying coin drops 20% in USD price, whereas holding strong PoS assets compounds your share of network supply over multiple years.',
    useCases: [
      {
        title: 'Validator Yield & Lock-Up Comparison',
        description: 'Project 30-day, 90-day, and 365-day token rewards across different PoS networks.',
        targetAudience: 'PoS Crypto Holders',
        benefits: ['Instant token count growth', 'Models daily auto-compounding', 'No fiat price bias']
      }
    ],
    faqs: [
      {
        question: 'Are staking rewards taxable?',
        answer: 'In many tax jurisdictions including the U.S., newly received staking rewards are taxed as ordinary income at fair market value when you gain dominion and control over them.'
      },
      {
        question: 'What risks exist in PoS staking?',
        answer: 'Consider validator slashing penalties, unbonding lockup periods (often 2–28 days where tokens cannot be sold), and smart-contract risk in liquid staking protocols.'
      }
    ],
    importantNotes: [
      'Subtract any validator commission percentage before entering APY if looking at gross network yield.'
    ]
  },

  'impermanent-loss-calculator': {
    introduction:
      'Providing liquidity to decentralized exchange (DEX) pools like Uniswap or Raydium earns trading fees—but if the two tokens in your pool diverge sharply in price, the Automated Market Maker (AMM) rebalances your deposit away from the rising token and into the lagging one, leaving you with less value than simply holding the pair in your wallet.\n\nThe Impermanent Loss (IL) Calculator computes the exact constant-product AMM divergence percentage from the price changes of Token A and Token B, classifying loss severity from Minimal to Severe.',
    howItWorks: {
      summary:
        'Using the standard 50/50 constant-product (x × y = k) AMM invariant formula, the calculator derives the relative price ratio k between Token A and Token B and solves for percentage value shortfall versus holding.',
      steps: [
        {
          title: '1. Enter Token A & Token B Price Changes',
          detail: 'Input expected or observed percentage price changes for both tokens in the liquidity pair (e.g., +100% and 0%).'
        },
        {
          title: '2. Compute Relative Divergence Ratio (k)',
          detail: 'Calculates k = (1 + pctChangeA / 100) / (1 + pctChangeB / 100).'
        },
        {
          title: '3. Evaluate AMM Impermanent Loss Formula',
          detail: 'Computes IL% = |(2√k) / (1 + k) - 1| × 100 and tags severity as Minimal (<2%), Moderate (2%–10%), or Severe (>10%).'
        }
      ],
      keyAssumptions: [
        'Assumes a classic 50/50 constant-product (Uniswap v2-style) full-range liquidity pool.',
        'Calculations show pure price-divergence loss before adding earned LP swap fees or farming incentives.'
      ]
    },
    formula: {
      title: 'Constant-Product AMM Impermanent Loss Equation',
      equation: 'IL % = | [ (2 × √k) / (1 + k) ] - 1 | × 100, where k = (1 + ΔA) / (1 + ΔB)',
      variables: [
        { symbol: 'ΔA, ΔB', name: 'Token Price Changes', description: 'Fractional price shifts of Token A and Token B', unit: 'Decimal' },
        { symbol: 'k', name: 'Relative Price Ratio', description: 'Change in relative exchange rate between the two pooled assets', unit: 'Ratio' },
        { symbol: 'IL %', name: 'Impermanent Loss', description: 'Percentage shortfall of LP position vs holding 50/50 outside the pool', unit: '%' }
      ],
      explanation:
        'When both tokens move by the same percentage, k = 1 and impermanent loss is 0%. As k moves away from 1 in either direction, IL rises symmetrically.'
    },
    examples: [
      {
        title: 'ETH Doubles Against a Stablecoin (USDC)',
        scenario: 'You supply 50% ETH and 50% USDC. ETH doubles in price (+100%) while USDC remains unchanged (0%).',
        inputs: {
          'Token A (ETH) Change': '+100%',
          'Token B (USDC) Change': '0%'
        },
        steps: [
          'Relative ratio k = (1 + 1.00) / (1 + 0.00) = 2.0',
          'LP vs Hold factor = (2 × √2) / (1 + 2) = 2.8284 / 3 = 0.9428',
          'Impermanent Loss = |0.9428 - 1| × 100 = 5.72%'
        ],
        result: 'Impermanent Loss: 5.72% (Moderate Loss)',
        takeaway: 'Your LP position is worth 5.72% less than simply holding the original ETH and USDC—trading fees earned in the pool must exceed 5.72% to outperform holding.'
      }
    ],
    understandingResults:
      'Notice the symmetry: a 2× rise produces 5.72% IL, a 4× rise produces 20.0% IL, and a 5× rise produces 25.5% IL. The loss is "impermanent" only if prices return to their original ratio before you withdraw; withdrawing locks it in permanently.',
    useCases: [
      {
        title: 'DeFi Yield Farming Risk Check',
        description: 'Verify whether LP trading fees and token emissions outweigh potential divergence loss.',
        targetAudience: 'DeFi Liquidity Providers',
        benefits: ['Quantifies exact LP penalty', 'Tests correlated vs uncorrelated pairs', 'Clear severity thresholds']
      }
    ],
    faqs: [
      {
        question: 'Why does a stablecoin-stablecoin pool have nearly zero IL?',
        answer: 'Because both tokens stay pegged near $1.00, keeping k ≈ 1.0 and impermanent loss close to 0%.'
      },
      {
        question: 'Does concentrated liquidity (like Uniswap v3) change IL?',
        answer: 'Yes—concentrated price ranges amplify both fee yield and impermanent loss whenever prices move toward or outside your selected range.'
      }
    ],
    importantNotes: [
      'A -100% price collapse on one token reduces k toward 0 and drains the healthy paired token out of your LP position.'
    ]
  },

  'unit-converter': {
    introduction:
      'Converting between Imperial and Metric systems—or translating cooking measurements, engineering speeds, temperatures, and binary digital storage—frequently stalls workflows when you have to look up exact conversion factors one by one.\n\nThe All-in-One Unit Converter handles 10 unit categories in one interface: Length & Distance, Weight & Mass, Temperature (°C, °F, K), Area, Volume, Speed, Energy, Digital Data Storage, Time Duration, and Currency Exchange, featuring instant bi-directional updates and one-click unit swap.',
    howItWorks: {
      summary:
        'Each category converts your source input into a high-precision base unit (such as meters, kilograms, or bytes) and then divides by the target unit’s exact conversion factor; Temperature uses direct linear affine formulas.',
      steps: [
        {
          title: '1. Select Unit Category',
          detail: 'Choose from Length, Weight, Temperature, Area, Volume, Speed, Energy, Digital Storage, Time, or Currency.'
        },
        {
          title: '2. Enter Source Value & Units',
          detail: 'Type any number in the "From" box and choose source and target units—or click Swap to reverse direction immediately.'
        },
        {
          title: '3. Base-Unit Normalization',
          detail: 'Multiplies source quantity by its base-unit factor and converts cleanly to the target unit (or applies °C/°F/K shifts for Temperature).'
        }
      ],
      keyAssumptions: [
        'Digital storage uses binary base-1024 units (1 KB = 1,024 Bytes, 1 MB = 1,024 KB).',
        'Currency converter uses built-in static reference rates for fast estimation—verify live spot rates before executing bank transfers.'
      ]
    },
    formula: {
      title: 'Two-Step Base Conversion & Temperature Equations',
      equation: 'Target = (Source × Factor_from) / Factor_to  |  °F = (°C × 9/5) + 32',
      variables: [
        { symbol: 'Source', name: 'Input Quantity', description: 'Original measured value to convert', unit: 'Input Unit' },
        { symbol: 'Factor_from', name: 'Source Base Multiplier', description: 'Ratio converting input unit into category base unit (e.g., 1,609.344 m/mi)', unit: 'Ratio' },
        { symbol: 'Factor_to', name: 'Target Base Multiplier', description: 'Ratio converting category base unit into output unit', unit: 'Ratio' }
      ],
      explanation:
        'Routing conversions through a shared standard base unit allows every unit inside a category to convert cleanly to any other unit without rounding drift.'
    },
    examples: [
      {
        title: 'Distance & Temperature Multi-Unit Check',
        scenario: 'Convert a 10 km race distance into miles, and convert 25°C ambient temperature into Fahrenheit.',
        inputs: {
          'Length Input': '10 Kilometers (km)',
          'Temperature Input': '25 Celsius (°C)'
        },
        steps: [
          'Length to base (meters): 10 km × 1,000 = 10,000 m',
          'Meters to miles: 10,000 / 1,609.344 = 6.2137 miles',
          'Temperature: (25 × 9/5) + 32 = 45 + 32 = 77°F'
        ],
        result: '10 km = 6.2137 Miles | 25°C = 77°F (298.15 K)',
        takeaway: 'Keep base factors exact (1 mile = 1,609.344 meters; 1 inch = 2.54 cm) so multi-step engineering and fitness conversions stay accurate.'
      }
    ],
    understandingResults:
      'Review both the large converted readout and the "All Quick Reference Conversions" grid below it to compare neighboring scales simultaneously (for example, seeing feet, yards, inches, and centimeters together).',
    useCases: [
      {
        title: 'Engineering, Travel & Daily Tasks',
        description: 'Translate Metric blueprints, speed limits, luggage weights, and file sizes without switching apps.',
        targetAudience: 'Engineers, Students & Travelers',
        benefits: ['10 categories in one view', 'Instant swap button', 'Multi-unit reference grid']
      }
    ],
    faqs: [
      {
        question: 'Why does Digital Storage use 1,024 instead of 1,000?',
        answer: 'Operating systems and memory chips traditionally address storage in powers of two (2^10 = 1,024 bytes per kilobyte), whereas drive packaging often uses decimal 1,000.'
      },
      {
        question: 'Are Currency rates updated live every second?',
        answer: 'No. The Currency mode provides built-in reference rates for fast ballpark comparisons—check your bank or payment processor for live market FX quotes.'
      }
    ],
    importantNotes: [
      'For high-precision financial or laboratory specifications, verify whether U.S. Customary or Imperial gallons/fluid ounces are required.'
    ]
  },

  'cooking-converter-calculator': {
    introduction:
      'A cup of fluffy all-purpose flour weighs about 120 grams, while a cup of dense granulated sugar weighs 200 grams—and water weighs 240 grams. Because dry ingredients differ sharply in density, scaling baking recipes strictly by volume causes dry, crumbly results.\n\nThe Cooking & Kitchen Ratio Converter converts volume measurements across cups, tablespoons, teaspoons, fluid ounces, and milliliters, and calculates density-adjusted gram weights for Flour, Sugar, Butter, and Water/Milk.',
    howItWorks: {
      summary:
        'Normalizes your entered quantity into standard U.S. cups (1 cup = 16 tbsp = 48 tsp = 8 fl oz = 236.588 mL), displays every volume equivalent simultaneously, and multiplies cups by ingredient-specific grams-per-cup density.',
      steps: [
        {
          title: '1. Enter Amount & Source Unit',
          detail: 'Type your recipe quantity and choose Cups, Tablespoons, Teaspoons, Fluid Ounces, or Milliliters.'
        },
        {
          title: '2. Select Ingredient Density Profile',
          detail: 'Pick All-Purpose Flour (120g/cup), Granulated Sugar (200g/cup), Butter (227g/cup), or Water / Milk (240g/cup).'
        },
        {
          title: '3. Read Volume & Gram Equivalents',
          detail: 'Displays density-adjusted weight in grams alongside exact equivalents in cups, tbsp, tsp, fl oz, and mL.'
        }
      ],
      keyAssumptions: [
        'Uses U.S. customary cup volume (236.588 mL) and standard culinary densities (Flour 120g, Sugar 200g, Butter 227g, Water/Milk 240g).',
        'Assumes spoon-and-level flour rather than packed scoop measurement.'
      ]
    },
    formula: {
      title: 'Culinary Volume & Density Weight Equations',
      equation: 'Grams = Cups × Density (g/cup) | 1 Cup = 16 Tbsp = 48 Tsp = 8 fl oz = 236.588 mL',
      variables: [
        { symbol: 'Cups', name: 'Normalized Cups', description: 'Source quantity converted to U.S. cup equivalents', unit: 'cups' },
        { symbol: 'Density', name: 'Ingredient Weight Density', description: 'Grams per cup (Flour: 120, Sugar: 200, Butter: 227, Water/Milk: 240)', unit: 'g/cup' },
        { symbol: 'mL', name: 'Milliliters', description: 'Metric fluid volume (Cups × 236.588)', unit: 'mL' }
      ],
      explanation:
        'Converting spoons or cups to grams lets home bakers measure with a digital kitchen scale for repeatable, mess-free baking.'
    },
    examples: [
      {
        title: 'Baking Bread with Digital Scale Precision',
        scenario: 'A recipe calls for 2 cups of All-Purpose Flour. Convert it to grams and tablespoons.',
        inputs: {
          'Amount & Unit': '2 Cups',
          'Ingredient': 'All-Purpose Flour (120 g/cup)'
        },
        steps: [
          'Weight in Grams = 2 × 120 g/cup = 240 grams',
          'Tablespoons = 2 × 16 = 32 tbsp',
          'Teaspoons = 2 × 48 = 96 tsp | Volume = 16 fl oz (473.2 mL)'
        ],
        result: '240 Grams (32 Tbsp | 473.2 mL)',
        takeaway: 'Weighing 240 grams on a scale prevents accidentally packing 300+ grams of flour into measuring cups.'
      }
    ],
    understandingResults:
      'Use the large Gram readout when weighing dry baking ingredients on a kitchen scale, and use the side-by-side volume cards when halving or doubling liquid sauces and dressings without dirtying extra measuring spoons.',
    useCases: [
      {
        title: 'American-to-European Recipe Baking',
        description: 'Translate U.S. cup-based cookie and cake recipes into precise European gram measurements.',
        targetAudience: 'Home Bakers & Chefs',
        benefits: ['Ingredient-specific gram density', 'Full spoon/cup/mL breakdown', 'Improves baking consistency']
      }
    ],
    faqs: [
      {
        question: 'Why does 1 cup of flour weigh 120g while 1 cup of sugar weighs 200g?',
        answer: 'Granulated sugar crystals pack far more densely than aerated wheat flour, holding 67% more mass inside the exact same 1-cup volume.'
      },
      {
        question: 'How many tablespoons are in a quarter cup?',
        answer: 'One quarter of 16 tablespoons equals exactly 4 tablespoons (or 12 teaspoons).'
      }
    ],
    importantNotes: [
      'Brown sugar packed firmly weighs more (~213–220g/cup) than loose granulated white sugar.'
    ]
  },

  'time-card-calculator': {
    introduction:
      'Manually adding up daily clocked hours across a 5-day shift week—and remembering to separate regular hours from 1.5x overtime past 40 hours—easily introduces payroll errors for freelancers, hourly employees, and small shop owners.\n\nThe Work Hours & Time Card Calculator totals Monday through Friday clocked hours, splits weekly hours into Regular (up to 40 hrs) and Overtime (> 40 hrs at 1.5× pay), and outputs Gross Pay, Regular Pay, and Overtime Pay instantly.',
    howItWorks: {
      summary:
        'Sums daily hours across Monday through Friday, caps regular hours at 40, assigns hours above 40 to overtime, and multiplies each bucket by base hourly wage and 1.5× overtime wage.',
      steps: [
        {
          title: '1. Enter Hourly Wage Rate',
          detail: 'Input your regular hourly rate in currency units per hour.'
        },
        {
          title: '2. Log Daily Hours (Mon–Fri)',
          detail: 'Enter net worked hours for each weekday (after subtracting unpaid meal breaks).'
        },
        {
          title: '3. Separate Regular vs. 1.5x Overtime',
          detail: 'Computes Regular Hours = min(40, Total) and Overtime Hours = max(0, Total - 40), applying 1.5× wage to overtime.'
        }
      ],
      keyAssumptions: [
        'Overtime begins strictly after 40 weekly hours at 1.5× regular hourly pay (federal FLSA standard).',
        'Does not model state daily overtime rules (such as >8 hours/day in California) or tax/benefit withholdings.'
      ]
    },
    formula: {
      title: 'Weekly Time Card & 1.5× Overtime Equation',
      equation: 'Gross Pay = (min(40, H) × Rate) + (max(0, H - 40) × Rate × 1.5)',
      variables: [
        { symbol: 'H', name: 'Total Weekly Hours', description: 'Sum of Monday through Friday worked hours', unit: 'Hours' },
        { symbol: 'Rate', name: 'Hourly Pay Rate', description: 'Base straight-time hourly wage', unit: 'Currency ($/hr)' },
        { symbol: '1.5', name: 'Overtime Multiplier', description: 'Time-and-a-half pay multiplier above 40 hours', unit: 'Factor' }
      ],
      explanation:
        'Up to 40 weekly hours are paid at straight rate; every hour beyond 40 earns 50% extra per hour.'
    },
    examples: [
      {
        title: 'Busy Week with 4.5 Overtime Hours',
        scenario: 'An hourly technician earning $24.00/hour clocks 8.5 (Mon), 9.0 (Tue), 8.5 (Wed), 9.5 (Thu), and 9.0 (Fri) hours.',
        inputs: {
          'Base Hourly Rate': '$24.00/hr',
          'Mon–Fri Hours': '8.5, 9.0, 8.5, 9.5, 9.0'
        },
        steps: [
          'Total Hours = 8.5 + 9.0 + 8.5 + 9.5 + 9.0 = 44.5 hours',
          'Regular Pay = 40.0 hrs × $24.00 = $960.00',
          'Overtime Pay = 4.5 hrs × ($24.00 × 1.5 = $36.00/hr) = $162.00',
          'Gross Weekly Pay = $960.00 + $162.00 = $1,122.00'
        ],
        result: 'Gross Pay: $1,122.00 (40.0 Reg hrs + 4.5 OT hrs)',
        takeaway: 'Those 4.5 overtime hours add $162 before taxes—worth 6.75 regular hours of work.'
      }
    ],
    understandingResults:
      'Review the Regular vs. Overtime split to check your paycheck stub accuracy. Remember that Gross Pay excludes payroll taxes (FICA, federal, state) and pre-tax insurance or retirement deductions.',
    useCases: [
      {
        title: 'Employee Paycheck Verification',
        description: 'Verify weekly timesheet totals and overtime premiums against employer payroll slips.',
        targetAudience: 'Hourly Workers & Payroll Managers',
        benefits: ['Automatic 40-hr OT split', 'Clear Mon–Fri grid', 'Instant gross pay preview']
      }
    ],
    faqs: [
      {
        question: 'Should I subtract unpaid lunch breaks before entering daily hours?',
        answer: 'Yes. Enter net paid hours (for example, an 8:00 AM–5:00 PM shift with a 1-hour unpaid lunch equals 8.0 hours).'
      },
      {
        question: 'What if I also worked on Saturday or Sunday?',
        answer: 'You can add weekend hours into one of the weekday boxes if testing total 7-day weekly overtime under the 40-hour rule.'
      }
    ],
    importantNotes: [
      'Jurisdictions such as California enforce daily overtime (>8 hours/day) and double-time (>12 hours/day) not modeled in standard weekly-40 calculations.'
    ]
  },

  'exact-age-calculator': {
    introduction:
      'Knowing you are "30 years old" barely captures the scale of time you have already lived—in days, hours, minutes, and seconds, milestones like your 10,000th day alive or 1-billionth second pass quietly unnoticed.\n\nThe Exact Age in Seconds & Days Calculator measures the millisecond span between your date of birth and the current moment, converting elapsed duration into chronological years (accounting for leap years), total days lived, total hours, total seconds, and estimated lifetime heartbeats.',
    howItWorks: {
      summary:
        'Subtracts your midnight birth timestamp from the current browser clock timestamp and converts elapsed milliseconds into seconds, minutes, hours, days, solar years (365.2425 days/year), and heartbeats (~75 bpm).',
      steps: [
        {
          title: '1. Select Date of Birth',
          detail: 'Choose your birth year, month, and day using the date input.'
        },
        {
          title: '2. Compute Elapsed Milliseconds',
          detail: 'Subtracts birth timestamp from the current clock timestamp in milliseconds.'
        },
        {
          title: '3. Break Down Time Units & Heartbeats',
          detail: 'Divides total elapsed time into days, hours, seconds, solar years (/ 365.2425), and estimated heartbeats (minutes × 75).'
        }
      ],
      keyAssumptions: [
        'Uses average Gregorian solar year length (365.2425 days) to compute decimal years.',
        'Lifetime heartbeat estimate uses a 75 beats-per-minute (bpm) average across active and resting hours.'
      ]
    },
    formula: {
      title: 'Chronological Time & Biological Milestone Equations',
      equation: 'Days = (Now - Birth) / 86,400,000 ms | Heartbeats ≈ Total Minutes × 75',
      variables: [
        { symbol: 'Now - Birth', name: 'Elapsed Milliseconds', description: 'Difference between current timestamp and date of birth', unit: 'ms' },
        { symbol: '365.2425', name: 'Gregorian Year Length', description: 'Average calendar days per year including leap-year rules', unit: 'Days/yr' },
        { symbol: '75 bpm', name: 'Average Heart Rate', description: 'Baseline resting/daily average pulse rate used for estimate', unit: 'beats/min' }
      ],
      explanation:
        'Dividing total days by 365.2425 automatically incorporates leap days over multi-decade spans without manual calendar counting.'
    },
    examples: [
      {
        title: '30-Year Chronological Snapshot',
        scenario: 'Someone born exactly 30 solar years ago checks their exact age breakdown.',
        inputs: {
          'Elapsed Age': '30.00 Years'
        },
        steps: [
          'Total Days ≈ 30 × 365.2425 = 10,957 days',
          'Total Hours ≈ 10,957 × 24 = 262,968 hours',
          'Total Seconds ≈ 262,968 × 3,600 = 946,684,800 seconds',
          'Estimated Heartbeats ≈ (262,968 × 60) × 75 ≈ 1.183 billion beats'
        ],
        result: '30.00 Years | ~10,957 Days | ~946.7M Seconds | ~1.18B Heartbeats',
        takeaway: 'Most people celebrate their 10,000th day alive around age 27.38 and cross 1 billion seconds alive around age 31.69.'
      }
    ],
    understandingResults:
      'Watch for fun non-birthday milestones: 10,000 days (~27.4 years), 1 billion seconds (~31.7 years), and 15,000 days (~41.1 years). Future dates yield zero/blank output until a valid past birth date is entered.',
    useCases: [
      {
        title: 'Milestone Celebrations & Fun Trivia',
        description: 'Check when you or a loved one hits 10,000 days or 1,000,000,000 seconds alive.',
        targetAudience: 'Everyone & Event Planners',
        benefits: ['Accounts for leap years', 'Displays days, hours, seconds', 'Fun physiological perspective']
      }
    ],
    faqs: [
      {
        question: 'Why does the calculator use 365.2425 days per year?',
        answer: 'The Gregorian calendar averages 365.2425 days over every 400-year leap cycle, preventing decimal age drift over a lifetime.'
      },
      {
        question: 'Is the heartbeat count exact?',
        answer: 'No, it is a lighthearted estimate assuming an average rate of 75 beats per minute over a lifetime.'
      }
    ],
    importantNotes: [
      'Birth date calculations run locally relative to your device’s current system clock.'
    ]
  },

  'final-grade-calculator': {
    introduction:
      'Before finals week begins, knowing exactly what score you need on the final exam helps you prioritize study hours across multiple courses—avoiding wasted stress on classes where an A is locked in while focusing effort where a passing grade is on the line.\n\nThe Final Exam Grade Calculator computes the minimum percentage score required on your final exam based on your current course grade, target overall class grade (with 90%/80%/70%/60% quick presets), and the syllabus weight of the final exam.',
    howItWorks: {
      summary:
        'Calculates the weighted contribution already locked in by prior coursework (Current Grade × (1 - Final Weight)), subtracts it from your Target Overall Grade, and divides the gap by the Final Exam Weight.',
      steps: [
        {
          title: '1. Enter Current Grade & Target Overall Grade',
          detail: 'Type your current average before the final and choose your desired overall course grade (or click A, B, C, Pass presets).'
        },
        {
          title: '2. Set Final Exam Weight (%)',
          detail: 'Input how much of the entire course grade comes from the final exam according to your syllabus.'
        },
        {
          title: '3. Solve Required Exam Score & Status',
          detail: 'Computes Required Score = [Target - Current × (1 - Weight)] / Weight and tags whether it is Guaranteed (≤0%), Achievable, Challenging (90–100%), or Extra Credit Needed (>100%).'
        }
      ],
      keyAssumptions: [
        'Your current grade accurately reflects all coursework outside the final exam (whose combined weight equals 100% - Final Weight).',
        'Course grading does not drop lowest quizzes or apply post-exam curve adjustments.'
      ]
    },
    formula: {
      title: 'Weighted Final Exam Score Formula',
      equation: 'Required Score = [ Target - Current × (1 - w) ] / w',
      variables: [
        { symbol: 'Current', name: 'Current Class Grade', description: 'Your weighted percentage average entering the final', unit: '%' },
        { symbol: 'Target', name: 'Desired Overall Grade', description: 'Minimum final course grade you want to achieve', unit: '%' },
        { symbol: 'w', name: 'Final Exam Weight', description: 'Syllabus weight of the final exam expressed as decimal (e.g., 25% = 0.25)', unit: 'Decimal' }
      ],
      explanation:
        'A heavier final exam weight gives the exam greater power to swing your semester average either up or down.'
    },
    examples: [
      {
        title: 'Chasing an A (90%) Entering Finals with an 85%',
        scenario: 'A student currently has an 85% average and wants to finish with a 90% (A). The final exam counts for 25% of the course grade.',
        inputs: {
          'Current Grade': '85%',
          'Desired Grade': '90%',
          'Final Exam Weight': '25% (w = 0.25)'
        },
        steps: [
          'Pre-final coursework weight = 1 - 0.25 = 0.75',
          'Locked-in points = 85 × 0.75 = 63.75%',
          'Remaining points needed = 90 - 63.75 = 26.25%',
          'Required Final Score = 26.25 / 0.25 = 105.0%'
        ],
        result: 'Required Score: 105.0% (Extra Credit Needed)',
        takeaway: 'Without bonus questions, a 90% is out of reach—while an 87% B+ requires (87 - 63.75)/0.25 = 93.0% on the final, and an 80% B requires only 65.0%.'
      }
    ],
    understandingResults:
      'Use the difficulty badge to adjust goals realistically: if you need over 100% for an A, test a B+ or B threshold to see what score secures the next grade tier without endangering other finals.',
    useCases: [
      {
        title: 'Finals Week Study Triage',
        description: 'Allocate study hours strategically across 4–5 classes based on exact grade thresholds.',
        targetAudience: 'High School & College Students',
        benefits: ['Quantifies exact exam targets', 'Identifies already-guaranteed grades', 'Prevents last-minute surprises']
      }
    ],
    faqs: [
      {
        question: 'What does a negative required score (or ≤0%) mean?',
        answer: 'It means your pre-final points already exceed the target threshold—even scoring 0% on the final still leaves you above that overall grade (though most classes require taking the final to pass).'
      },
      {
        question: 'What if my final exam replaces my lowest midterm?',
        answer: 'Recalculate your Current Grade first as if that lowest midterm were removed and add its weight onto Final Weight.'
      }
    ],
    importantNotes: [
      'Check your syllabus for minimum-passing final exam rules—some courses require passing the final independently regardless of semester average.'
    ]
  },

  'gpa-calculator': {
    introduction:
      'Grade Point Average (GPA) weights every letter grade by the number of credit hours carried by that course—a 4-credit science lab moves your GPA twice as much as a 2-credit seminar. Adding current semester grades onto prior transcripts can also be error-prone by hand.\n\nThe GPA & College Grade Calculator computes your Semester GPA, total credits, and academic honors standing on a standard 4.0 scale (with A+ through F plus/minus tiers), and optionally integrates prior cumulative GPA and credits for an updated Cumulative GPA.',
    howItWorks: {
      summary:
        'Multiplies each course’s grade point value (4.0 for A+/A, 3.7 for A-, 3.3 for B+, etc.) by its credit hours to sum total quality points, then divides by total course credits.',
      steps: [
        {
          title: '1. Add Courses, Letter Grades & Credits',
          detail: 'Enter or edit your current semester courses, choose each letter grade from the 4.0 plus/minus scale, and set credit hours.'
        },
        {
          title: '2. Compute Semester Quality Points',
          detail: 'Multiplies each course’s grade points by its credit weight and sums across all courses.'
        },
        {
          title: '3. Divide by Total Semester Credits',
          detail: 'Divides total quality points by total semester credits and displays academic standing (Honors / Good Standing / Warning).'
        },
        {
          title: '4. Optional Cumulative GPA Integration',
          detail: 'Check "Include Prior Cumulative GPA & Credits" to combine past quality points (Prior GPA × Prior Credits) with current semester points.'
        }
      ],
      keyAssumptions: [
        'Uses standard 4.0 plus/minus scale: A+/A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0.',
        'Pass/Fail or audited non-credit courses are excluded from graded credit totals.'
      ]
    },
    formula: {
      title: 'Credit-Weighted Semester & Cumulative GPA Formulas',
      equation: 'GPA = Σ(Grade Points_i × Credits_i) / Σ(Credits_i)',
      variables: [
        { symbol: 'Grade Points_i', name: 'Course Point Value', description: 'Numerical equivalent of course letter grade on 4.0 scale', unit: 'Points' },
        { symbol: 'Credits_i', name: 'Course Credit Hours', description: 'Credit weight assigned to the course', unit: 'Credits' },
        { symbol: 'Cumulative GPA', name: 'Combined GPA', description: '[(Prior GPA × Prior Credits) + Semester Quality Points] / Total Credits', unit: 'GPA' }
      ],
      explanation:
        'High-credit courses carry proportionally greater influence over GPA, and once you have accumulated many prior credits, each new semester shifts cumulative GPA more gradually.'
    },
    examples: [
      {
        title: '14-Credit Engineering Semester',
        scenario: 'A student completes Calculus I (A, 4 cr), CS 101 (A-, 3 cr), Physics (B+, 4 cr), and English (A, 3 cr).',
        inputs: {
          'Calculus I': 'A (4.0) × 4 credits',
          'CS 101': 'A- (3.7) × 3 credits',
          'Physics Mechanics': 'B+ (3.3) × 4 credits',
          'English Composition': 'A (4.0) × 3 credits'
        },
        steps: [
          'Quality points = (4.0×4) + (3.7×3) + (3.3×4) + (4.0×3) = 16.0 + 11.1 + 13.2 + 12.0 = 52.3',
          'Total semester credits = 4 + 3 + 4 + 3 = 14 credits',
          'Semester GPA = 52.3 / 14 = 3.74 (Magna Cum Laude / Honors)'
        ],
        result: 'Semester GPA: 3.74 / 4.00 (14 Credits)',
        takeaway: 'With 30 prior credits at a 3.50 GPA (105.0 pts), cumulative GPA becomes (105.0 + 52.3) / 44 = 3.58.'
      }
    ],
    understandingResults:
      'Monitor both Semester GPA and Cumulative GPA if you are protecting scholarship minimums (often 3.0 or 3.5) or graduate school cutoffs. Adding prior credits reveals realistically how many A’s are needed to raise an established transcript.',
    useCases: [
      {
        title: 'Scholarship & Dean’s List Tracking',
        description: 'Test "what-if" letter grades mid-semester to protect GPA thresholds.',
        targetAudience: 'College & University Students',
        benefits: ['Supports prior cumulative history', 'Instant honors classification', 'Handles variable course credits']
      }
    ],
    faqs: [
      {
        question: 'Does a plus/minus change my GPA compared to flat A/B/C grading?',
        answer: 'Yes. On the standard plus/minus scale shown here, an A- earns 3.7 and a B+ earns 3.3 instead of flat 4.0 or 3.0.'
      },
      {
        question: 'Why does my GPA barely budge in senior year?',
        answer: 'Once you have 90+ completed credits in the denominator, a single 15-credit semester represents less than one-seventh of your cumulative average.'
      }
    ],
    importantNotes: [
      'Confirm your university’s exact grade-point scale—a few schools award 4.33 for A+ or omit plus/minus steps.'
    ]
  },

  'gas-mileage-calculator': {
    introduction:
      'Planning a weekend road trip, comparing daily commute costs, or splitting fuel fairly among carpool passengers gets tricky when gas prices fluctuate and international travelers think in liters per 100 kilometers instead of MPG.\n\nThe Gas Mileage & Trip Cost Calculator computes total fuel required in gallons and liters, total trip fuel cost, cost per mile, metric L/100km efficiency, and split cost per passenger—with a one-click Round Trip toggle.',
    howItWorks: {
      summary:
        'Divides effective trip distance (doubled if Round Trip is checked) by vehicle MPG to find gallons burned, multiplies by gas price per gallon, divides by passenger count, and converts results to metric km, liters, and L/100km.',
      steps: [
        {
          title: '1. Enter Distance, MPG & Fuel Price',
          detail: 'Input one-way trip miles, average vehicle MPG, and price per gallon (plus passenger count).'
        },
        {
          title: '2. Optional Round-Trip Doubling',
          detail: 'Check "Calculate as Round Trip" to double effective mileage for out-and-back journeys.'
        },
        {
          title: '3. Compute Gallons, Cost & Passenger Split',
          detail: 'Solves Gallons = Distance / MPG, Total Cost = Gallons × Gas Price, Cost per Person = Total Cost / Passengers, plus metric L/100km.'
        }
      ],
      keyAssumptions: [
        'Vehicle achieves steady average MPG across highway and city legs of the trip.',
        'Cost per passenger splits fuel evenly among all riders entered.'
      ]
    },
    formula: {
      title: 'Trip Fuel Consumption & Cost Formulas',
      equation: 'Gallons = Distance / MPG  |  Total Cost = Gallons × Price  |  Split = Total Cost / People',
      variables: [
        { symbol: 'Distance', name: 'Effective Miles', description: 'One-way miles (or 2× if Round Trip is enabled)', unit: 'Miles' },
        { symbol: 'MPG', name: 'Fuel Economy', description: 'Vehicle average miles traveled per U.S. gallon', unit: 'mi/gal' },
        { symbol: 'Price', name: 'Fuel Price', description: 'Average pump price per gallon', unit: 'Currency ($/gal)' },
        { symbol: 'People', name: 'Passengers', description: 'Number of people splitting fuel expenses', unit: 'Count' }
      ],
      explanation:
        'To display metric efficiency alongside MPG, distance is converted via 1.60934 km/mi and gallons via 3.78541 L/gal to solve L/100km.'
    },
    examples: [
      {
        title: '3-Person 350-Mile Road Trip',
        scenario: 'Three friends drive 350 miles one-way in a sedan averaging 28 MPG with gas at $3.65/gallon.',
        inputs: {
          'Trip Distance': '350 miles (One Way)',
          'Fuel Economy': '28 MPG',
          'Gas Price': '$3.65/gallon',
          'Passengers': '3 people'
        },
        steps: [
          'Fuel Required = 350 / 28 = 12.50 gallons (47.32 liters)',
          'Total Trip Fuel Cost = 12.50 × $3.65 = $45.63',
          'Cost Per Mile = $45.63 / 350 = $0.130/mile',
          'Cost Per Person = $45.63 / 3 = $15.21 per person',
          'Metric equivalent = 563.3 km at 8.4 L/100km'
        ],
        result: 'Total Cost: $45.63 | Split: $15.21/person | Fuel: 12.50 Gallons',
        takeaway: 'Checking Round Trip doubles distance to 700 miles, total fuel cost to $91.25, and each passenger’s share to $30.42.'
      }
    ],
    understandingResults:
      'Use Cost Per Mile to compare driving against train tickets or flight fares, and keep in mind that high highway speeds above 70 mph or heavy roof cargo reduce real-world MPG by 10%–20%.',
    useCases: [
      {
        title: 'Road Trip & Carpool Expense Splitting',
        description: 'Settle group gas tabs transparently before or right after a trip.',
        targetAudience: 'Drivers & Travelers',
        benefits: ['Instant passenger split', 'Shows both MPG and L/100km', 'Round-trip toggle']
      }
    ],
    faqs: [
      {
        question: 'How do I convert L/100km into MPG before entering?',
        answer: 'Divide 235.215 by L/100km (for example, 8.4 L/100km ≈ 235.215 / 8.4 = 28 MPG).'
      },
      {
        question: 'Does this account for tolls or vehicle wear-and-tear?',
        answer: 'No. This tool isolates direct pump fuel costs; total driving ownership cost (including depreciation and tires) is higher.'
      }
    ],
    importantNotes: [
      'Uses U.S. gallons (3.78541 L), not larger U.K. Imperial gallons (4.546 L).'
    ]
  },

  'time-zone-calculator': {
    introduction:
      'Scheduling a live call across San Francisco, New York, London, Dubai, and Tokyo means juggling negative offsets, positive offsets, half-hour zones like India (UTC+5:30), and overnight date rollovers. Guessing in your head risks inviting teammates to a 3:00 AM meeting.\n\nThe Time Zone Difference & Meeting Planner converts any 24-hour origin time across 8 major global zones (UTC, PST, EST, CET, GST, IST, JST, AEST) simultaneously, highlighting standard business-hour windows (9 AM–5 PM) and next-day / previous-day shifts.',
    howItWorks: {
      summary:
        'Calculates the exact hour and minute offset difference between your origin zone and every world hub, wrapping around the 24-hour clock to flag next-day or previous-day rollovers cleanly.',
      steps: [
        {
          title: '1. Choose Origin Zone & Hour',
          detail: 'Select the base time zone (e.g., EST, PST, UTC, CET) and pick the meeting hour (00:00 to 23:00).'
        },
        {
          title: '2. Compute Offset Deltas',
          detail: 'Subtracts origin UTC offset from each target UTC offset (including India’s +5.5 half-hour offset) and wraps via modulo 24.'
        },
        {
          title: '3. Identify Business Hours & Day Shifts',
          detail: 'Displays formatted local times across all 8 zones and marks "Business Hrs" green badges for cities between 09:00 and 17:00.'
        }
      ],
      keyAssumptions: [
        'Uses fixed standard UTC offsets (EST = UTC-5, PST = UTC-8, CET = UTC+1, GST = UTC+4, IST = UTC+5.5, JST = UTC+9, AEST = UTC+10).',
        'During Daylight Saving / Summer Time (such as EDT UTC-4 or PDT UTC-7), adjust your selected origin time accordingly.'
      ]
    },
    formula: {
      title: 'World Clock Offset & Day-Shift Formula',
      equation: 'Target Hour = (Origin Hour + Target UTC Offset - Origin UTC Offset) mod 24',
      variables: [
        { symbol: 'Origin Hour', name: 'Base Meeting Hour', description: 'Chosen 24-hour clock hour (0–23) in origin zone', unit: 'Hours' },
        { symbol: 'Target Offset', name: 'Target UTC Offset', description: 'Hours ahead or behind Coordinated Universal Time', unit: 'Hours' },
        { symbol: 'Origin Offset', name: 'Base UTC Offset', description: 'Base zone hours ahead or behind UTC', unit: 'Hours' }
      ],
      explanation:
        'If raw sum reaches 24.0 or higher, the target city has crossed midnight into the Next Day; if below 0, it sits in the Previous Day.'
    },
    examples: [
      {
        title: 'Cross-Atlantic & Middle East Call at 10:00 AM EST',
        scenario: 'A team lead in New York (EST, UTC-5) schedules a meeting for 10:00 (10:00 AM). Find local times in PST, UTC, CET, GST, and IST.',
        inputs: {
          'Origin Time': '10:00',
          'Origin Zone': 'EST (UTC-5)'
        },
        steps: [
          'PST (UTC-8): 10 + (-8 - (-5)) = 07:00 (7:00 AM, Same Day)',
          'UTC (UTC+0): 10 + (0 - (-5)) = 15:00 (3:00 PM, Business Hrs)',
          'CET (UTC+1): 10 + (1 - (-5)) = 16:00 (4:00 PM, Business Hrs)',
          'GST Dubai (UTC+4): 10 + (4 - (-5)) = 19:00 (7:00 PM)',
          'IST India (UTC+5.5): 10 + (5.5 - (-5)) = 20:30 (8:30 PM)'
        ],
        result: '10 AM EST = 7 AM PST | 3 PM UTC | 4 PM CET | 8:30 PM IST',
        takeaway: '10:00 AM EST / 3:00 PM UTC is one of the cleanest overlapping windows connecting North America, Europe, and South Asia.'
      }
    ],
    understandingResults:
      'Scan the green "Business Hrs" badges to locate the golden overlap where all required offices fall between 9:00 AM and 5:00 PM—and watch for "+1 Day" or "-1 Day" markers when coordinating between U.S. coasts and Asia-Pacific.',
    useCases: [
      {
        title: 'Remote Team Standups & Client Calls',
        description: 'Pick fair meeting slots across distributed continents in one glance.',
        targetAudience: 'Remote Teams & Project Managers',
        benefits: ['Includes India UTC+5:30', 'Highlights 9–5 overlap', 'Prevents day-shift mistakes']
      }
    ],
    faqs: [
      {
        question: 'Why does India end in :30?',
        answer: 'Indian Standard Time (IST) sits at UTC+5 hours and 30 minutes, creating a half-hour difference relative to hourly global time zones.'
      },
      {
        question: 'Do all regions observe Daylight Saving Time?',
        answer: 'No. Areas like UAE (GST), India (IST), and Japan (JST) stay on fixed year-round UTC offsets, which shifts their clock gap relative to U.S. and European cities by 1 hour twice a year.'
      }
    ],
    importantNotes: [
      'Confirm whether summer Daylight Saving rules are active in each participant’s country before sending final calendar invites.'
    ]
  },

  'net-worth-calculator': {
    introduction:
      'Income shows how much money flows through your hands, whereas net worth measures how much wealth you actually keep. Tracking assets minus liabilities across time gives the clearest scorecard of personal financial progress—whether paying down student loans or growing investment accounts.\n\nThe Personal Net Worth Tracker Calculator organizes your balance sheet into four asset buckets (Cash, Investments, Real Estate, Vehicles/Other) and four liability buckets (Mortgage, Student Loans, Auto Loans, Credit Cards), reporting Total Net Worth, Total Assets, Total Liabilities, and Debt-to-Asset ratio.',
    howItWorks: {
      summary:
        'Sums liquid cash, investment accounts, property value, and personal assets into Total Assets, sums secured and unsecured debts into Total Liabilities, and subtracts Liabilities from Assets.',
      steps: [
        {
          title: '1. Tally All Financial & Physical Assets',
          detail: 'Enter Cash & Checking, Investments (401k/IRA/Brokerage), Real Estate value, and Vehicles/Other valuables.'
        },
        {
          title: '2. Tally Outstanding Debts',
          detail: 'Enter remaining balances for Mortgage, Student Loans, Car Loans, and Credit Cards/Personal Debt.'
        },
        {
          title: '3. Compute Net Worth & Debt-to-Asset Ratio',
          detail: 'Calculates Net Worth = Total Assets - Total Liabilities and Debt-to-Asset % = (Total Liabilities / Total Assets) × 100.'
        }
      ],
      keyAssumptions: [
        'Real estate and vehicles are valued at realistic current market resale value rather than original purchase price.',
        'Liabilities reflect current payoff balances rather than future scheduled interest.'
      ]
    },
    formula: {
      title: 'Personal Balance Sheet Net Worth Formula',
      equation: 'Net Worth = Total Assets - Total Liabilities  |  Debt Ratio = (Liabilities / Assets) × 100',
      variables: [
        { symbol: 'Total Assets', name: 'Gross Assets', description: 'Cash + Investments + Real Estate + Vehicles/Other', unit: 'Currency ($)' },
        { symbol: 'Total Liabilities', name: 'Total Debt', description: 'Mortgage + Student Loans + Car Loans + Credit Cards', unit: 'Currency ($)' },
        { symbol: 'Net Worth', name: 'Personal Equity', description: 'Assets remaining if every debt were settled today', unit: 'Currency ($)' }
      ],
      explanation:
        'Paying down $1,000 of credit card debt increases Net Worth by $1,000 just as adding $1,000 to savings does—both improve the balance sheet equally.'
    },
    examples: [
      {
        title: 'Mid-Career Household Balance Sheet',
        scenario: 'A household holds $18,000 cash, $95,000 in retirement/brokerage accounts, a $320,000 home, and a $22,000 car, while owing $240,000 on the mortgage, $15,000 in student loans, $10,000 on the car, and $2,000 on cards.',
        inputs: {
          'Assets': '$18k Cash + $95k Inv + $320k Home + $22k Car',
          'Liabilities': '$240k Mort + $15k Student + $10k Car + $2k Card'
        },
        steps: [
          'Total Assets = $18,000 + $95,000 + $320,000 + $22,000 = $455,000',
          'Total Liabilities = $240,000 + $15,000 + $10,000 + $2,000 = $267,000',
          'Net Worth = $455,000 - $267,000 = $188,000',
          'Debt-to-Asset Ratio = ($267,000 / $455,000) × 100 = 58.7%'
        ],
        result: 'Net Worth: $188,000 | Assets: $455,000 | Liabilities: $267,000 (58.7% Ratio)',
        takeaway: 'Even though assets look large at $455,000, tracking net worth reveals $188,000 in true household equity—and highlights how paying off the mortgage and car lowers leverage over time.'
      }
    ],
    understandingResults:
      'A negative net worth is common early in adulthood when student loans exceed savings—what matters most is the annual upward trend. Also check liquid net worth (Cash + Taxable Investments minus short-term debt), since home equity cannot pay emergency bills quickly without borrowing or selling.',
    useCases: [
      {
        title: 'Annual Financial Checkup',
        description: 'Snapshot your complete assets and liabilities every quarter or New Year to measure real progress.',
        targetAudience: 'Individuals & Families',
        benefits: ['Unifies cash, investments & debt', 'Tracks Debt-to-Asset leverage', 'Clear wealth milestone']
      }
    ],
    faqs: [
      {
        question: 'Should I include my primary home value in Net Worth?',
        answer: 'Yes—enter your home’s conservative market value under Real Estate and the full remaining loan balance under Mortgage Debt so your net home equity is captured accurately.'
      },
      {
        question: 'Should depreciating items like furniture be counted as assets?',
        answer: 'Usually omit household goods and clothing unless you own appraised collectibles or fine jewelry that could be sold quickly.'
      }
    ],
    importantNotes: [
      'Traditional 401(k)/IRA balances reflect pre-tax value; future withdrawals will incur ordinary income taxes.'
    ]
  },

  'dog-age-calculator': {
    introduction:
      'The old rule of multiplying every dog year by 7 misses two biological facts: dogs mature dramatically faster during their first two years (reaching adulthood around age 2), and giant breeds age far more rapidly after year 2 than small lap dogs.\n\nThe Dog Years to Human Years Calculator uses the American Veterinary Medical Association (AVMA) size-adjusted aging curve—accounting for Small (<20 lbs), Medium (21–50 lbs), Large (51–90 lbs), and Giant (>90 lbs) breed tiers—to calculate equivalent human years and life stage.',
    howItWorks: {
      summary:
        'Assigns 15 human years for the dog’s first year of life and +9 years (total 24) for the second year, then adds +4, +5, +6, or +7 human years per dog year thereafter depending on adult breed size.',
      steps: [
        {
          title: '1. Select Breed Size Tier',
          detail: 'Choose Small (<20 lbs), Medium (21–50 lbs), Large (51–90 lbs), or Giant (>90 lbs).'
        },
        {
          title: '2. Enter Dog’s Chronological Age',
          detail: 'Input your dog’s age in years (supporting fractional puppy/half-year entries).'
        },
        {
          title: '3. Apply Size-Adjusted Aging Curve',
          detail: 'Computes 15 years at age 1, 24 years at age 2, and adds 4/5/6/7 years per year past age 2, tagging Puppy, Young Adult, Mature Adult, or Senior life stage.'
        }
      ],
      keyAssumptions: [
        'Follows the standard AVMA breed-size guideline model: Year 1 = 15 human years, Year 2 = +9 (24 total), Year 3+ = +4 (Small), +5 (Medium), +6 (Large), +7 (Giant).',
        'Individual canine longevity also depends on genetics, weight management, dental health, and veterinary care.'
      ]
    },
    formula: {
      title: 'AVMA Size-Adjusted Dog-to-Human Age Model',
      equation: 'Age ≤ 1: 15×Age | 1 < Age ≤ 2: 15 + 9(Age-1) | Age > 2: 24 + (Age - 2) × Multiplier',
      variables: [
        { symbol: 'Age', name: 'Dog Age', description: 'Chronological age of the dog in years', unit: 'Years' },
        { symbol: 'Multiplier', name: 'Size Aging Rate', description: '4 (Small), 5 (Medium), 6 (Large), or 7 (Giant) human yrs/yr after year 2', unit: 'Years/yr' }
      ],
      explanation:
        'A 10-year-old 12-lb Chihuahua equates to 56 human years (Mature Adult), whereas a 10-year-old 120-lb Great Dane equates to 80 human years (Senior).'
    },
    examples: [
      {
        title: '6-Year-Old Medium Border Collie',
        scenario: 'Calculate the equivalent human age for a 6-year-old Medium dog (35 lbs, 21–50 lbs category).',
        inputs: {
          'Dog Age': '6 years',
          'Breed Size': 'Medium (21–50 lbs, +5 yrs/yr)'
        },
        steps: [
          'First year = 15 human years',
          'Second year = +9 → 24 human years',
          'Remaining 4 years (6 - 2) × 5 = +20 human years',
          'Total Equivalent Age = 24 + 20 = 44 human years'
        ],
        result: '44 Human Years (Adult)',
        takeaway: 'At chronological age 6, a medium dog is roughly equivalent to a healthy 44-year-old adult—only 2 years older chronologically turns the corner past 50 into middle-age screening territory.'
      }
    ],
    understandingResults:
      'Use your dog’s equivalent human age and life stage to guide annual wellness checkups. Once large and giant breeds pass ~50–55 equivalent human years (around age 6–7), many veterinarians recommend semi-annual checkups, joint support, and senior blood panels.',
    useCases: [
      {
        title: 'Veterinary Care & Diet Stage Planning',
        description: 'Determine when to transition between puppy, adult, and senior nutrition and preventative screenings.',
        targetAudience: 'Pet Owners & Veterinary Clinics',
        benefits: ['Replaces inaccurate 7× rule', 'Accounts for giant-breed aging', 'Flags senior care milestone']
      }
    ],
    faqs: [
      {
        question: 'Why do small dogs live so much longer than giant breeds?',
        answer: 'Large and giant breeds undergo rapid cell growth and higher IGF-1 hormone levels early in life, which accelerates biological aging compared to toy and small breeds.'
      },
      {
        question: 'Why is the first dog year worth 15 human years?',
        answer: 'Dogs reach physical and reproductive maturity within their first 12 months—roughly matching human adolescent development around age 15.'
      }
    ],
    importantNotes: [
      'Always consult your veterinarian regarding breed-specific senior transition ages and nutritional adjustments.'
    ]
  }
};
