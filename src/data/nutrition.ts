import { NutritionPlan, Supplement } from '../types';

export const NUTRITION_PLANS: NutritionPlan[] = [
  {
    id: 'lean-hypertrophy',
    title: 'Lean Hypertrophy (Clean Bulk)',
    goal: 'Maximize Muscle Growth with Minimal Fat Accrual',
    calorieTargetDescription: 'Slight Surplus (+250 to +350 kcal above TDEE)',
    macroRatio: {
      proteinPct: 25,
      carbsPct: 50,
      fatsPct: 25
    },
    totalDailyCalories: 2850,
    totalDailyProtein: 185,
    totalDailyCarbs: 350,
    totalDailyFats: 75,
    summary: 'Fuel heavy progressive lifting sessions and provide ample glycogen for muscle protein synthesis without accumulating unnecessary adipose tissue.',
    keyGuidelines: [
      'Consume 1.8g to 2.2g of protein per kilogram of bodyweight distributed across 4 to 5 meals.',
      'Prioritize complex low-glycemic carbohydrates (rolled oats, jasmine rice, sweet potatoes) around workout windows.',
      'Target a steady scale gain of 0.25% to 0.5% of body weight per week to ensure lean mass accretion.'
    ],
    meals: [
      {
        id: 'bulk-breakfast',
        type: 'Breakfast',
        name: 'Anabolic Cinnamon Oatmeal & Eggs',
        calories: 680,
        proteinGrams: 46,
        carbsGrams: 78,
        fatGrams: 18,
        ingredients: [
          '80g Rolled Oats cooked with unsweetened almond milk',
          '1 scoop (30g) Whey Isolate Vanilla',
          '1 medium Banana (sliced)',
          '15g Chia Seeds & Ceylon cinnamon',
          '3 Large Whole Eggs (scrambled with pink salt)'
        ],
        instructions: 'Cook oats with almond milk. Let cool for 1 minute before stirring in whey isolate (to avoid clumping). Top with sliced banana and chia seeds. Serve alongside scrambled eggs.'
      },
      {
        id: 'bulk-lunch',
        type: 'Lunch',
        name: 'Herb Grilled Chicken, Sweet Potato & Avocado Bowl',
        calories: 740,
        proteinGrams: 52,
        carbsGrams: 82,
        fatGrams: 20,
        ingredients: [
          '200g Lean Chicken Breast (marinated with rosemary, garlic, paprika)',
          '250g Roasted Sweet Potato cubes',
          '80g Cooked Quinoa',
          '60g Fresh Avocado slices',
          '100g Steamed Broccoli florets with lemon juice'
        ],
        instructions: 'Grill chicken breast until internal temperature reaches 74°C (165°F). Roast sweet potatoes at 200°C for 25 minutes. Assemble bowl with quinoa, vegetables, avocado, and chicken.'
      },
      {
        id: 'bulk-preworkout',
        type: 'Pre-Workout',
        name: 'Performance Fuel: Rice Cakes & Honey Almond Butter',
        calories: 380,
        proteinGrams: 14,
        carbsGrams: 58,
        fatGrams: 10,
        ingredients: [
          '4 Plain Brown Rice Cakes',
          '20g Natural Almond Butter',
          '15g Raw Organic Honey',
          '1 Pinch of Pink Himalayan Salt'
        ],
        instructions: 'Spread almond butter over rice cakes, drizzle with raw honey, and dust with pink salt for sodium balance and intra-muscular pumps. Consume 60-75 mins pre-workout.'
      },
      {
        id: 'bulk-dinner',
        type: 'Post-Workout / Dinner',
        name: 'Wild Salmon, Jasmine Rice & Asparagus Platter',
        calories: 720,
        proteinGrams: 48,
        carbsGrams: 80,
        fatGrams: 22,
        ingredients: [
          '200g Wild-Caught Salmon Fillet (pan-seared with olive oil)',
          '220g Steamed Jasmine White Rice (rapid glycogen replenishment)',
          '150g Grilled Asparagus spears',
          '1 tbsp Extra Virgin Olive Oil & Lemon wedges'
        ],
        instructions: 'Sear salmon skin-side down in a hot skillet for 4 mins, flip for 3 mins. Serve over fluffy jasmine rice with charred asparagus spears and fresh lemon.'
      },
      {
        id: 'bulk-night',
        type: 'Bedtime Recovery',
        name: 'Slow-Release Micellar Casein & Greek Yogurt Parfait',
        calories: 330,
        proteinGrams: 35,
        carbsGrams: 22,
        fatGrams: 8,
        ingredients: [
          '150g Plain 0% Greek Yogurt',
          '20g Micellar Casein Protein (Chocolate)',
          '50g Wild Blueberries',
          '10g Crushed Walnuts'
        ],
        instructions: 'Whisk casein into Greek yogurt until thick mousse texture forms. Fold in blueberries and walnuts for sustained overnight amino acid delivery and brain-protective fats.'
      }
    ]
  },
  {
    id: 'fat-shred-cut',
    title: 'Aggressive Fat Shred (Cutting)',
    goal: 'Drop Adipose Tissue While Sparing 100% Lean Muscle',
    calorieTargetDescription: 'Controlled Deficit (-450 to -550 kcal below TDEE)',
    macroRatio: {
      proteinPct: 40,
      carbsPct: 35,
      fatsPct: 25
    },
    totalDailyCalories: 2050,
    totalDailyProtein: 200,
    totalDailyCarbs: 175,
    totalDailyFats: 50,
    summary: 'High satiety, elevated protein sparing, and fiber-loaded nutrition engineered to strip fat while preserving hard-earned muscular tissue and training strength.',
    keyGuidelines: [
      'Elevate protein to 2.2g - 2.4g per kg to protect muscle tissue during an energy deficit.',
      'Time 70% of daily carbohydrates in the peri-workout window (pre and post-workout).',
      'Consume at least 35g to 45g of dietary fiber daily from green leafy vegetables to optimize gut fullness and blunt ghrelin (hunger hormone).'
    ],
    meals: [
      {
        id: 'cut-breakfast',
        type: 'Breakfast',
        name: 'Egg White Scramble & Berry Spinach Oats',
        calories: 460,
        proteinGrams: 48,
        carbsGrams: 44,
        fatGrams: 8,
        ingredients: [
          '200g Liquid Egg Whites + 1 Whole Egg',
          '50g Rolled Oats cooked in water',
          '80g Fresh Blackberries & Raspberries',
          '100g Baby Spinach (wilted in pan with garlic powder)'
        ],
        instructions: 'Scramble eggs with spinach until fluffy. Cook oats separately and stir in berries for antioxidant polyphenols.'
      },
      {
        id: 'cut-lunch',
        type: 'Lunch',
        name: 'Sesame Grilled Turkey Tenderloin & Giant Rainbow Salad',
        calories: 520,
        proteinGrams: 54,
        carbsGrams: 38,
        fatGrams: 14,
        ingredients: [
          '220g Lean Turkey Breast tenderloin strips',
          '150g Roasted Butternut Squash cubes',
          '4 cups Mixed Greens (Arugula, Romaine, Cucumber, Radish)',
          '1 tbsp Apple Cider Vinegar & 1 tsp Toasted Sesame Oil dressing'
        ],
        instructions: 'Sear seasoned turkey tenderloins in non-stick pan. Toss voluminous salad with apple cider vinegar and drizzle with sesame oil for micronutrient bioavailability.'
      },
      {
        id: 'cut-preworkout',
        type: 'Pre-Workout',
        name: 'Black Coffee & Whey Crisp Rice Cake',
        calories: 190,
        proteinGrams: 26,
        carbsGrams: 18,
        fatGrams: 2,
        ingredients: [
          '1 scoop (30g) Pure Whey Isolate',
          '2 Light Brown Rice Cakes',
          '1 Cup Fresh Black Espresso or Americano'
        ],
        instructions: 'Shake whey isolate with ice cold water. Enjoy with crispy rice cakes and black coffee 45 minutes before lifting for zero-crash adrenaline stimulation.'
      },
      {
        id: 'cut-dinner',
        type: 'Post-Workout / Dinner',
        name: 'Lemon Herb White Fish & Cauliflower Mash',
        calories: 490,
        proteinGrams: 52,
        carbsGrams: 42,
        fatGrams: 12,
        ingredients: [
          '240g Fresh Cod or Halibut fillet',
          '200g Steamed & Mashed Cauliflower with roasted garlic',
          '120g Boiled Red Baby Potatoes',
          '150g Steamed Green Beans'
        ],
        instructions: 'Bake fish with herbs and lemon slices at 190°C for 14 minutes. Puree steamed cauliflower with garlic and black pepper for a rich, low-calorie mashed potato texture.'
      },
      {
        id: 'cut-night',
        type: 'Bedtime Recovery',
        name: 'High-Protein Zero Sugar Greek Yogurt Fluff',
        calories: 190,
        proteinGrams: 28,
        carbsGrams: 10,
        fatGrams: 2,
        ingredients: [
          '175g Fat-Free Greek Yogurt',
          '15g Casein protein powder',
          '1/2 tsp Pure Vanilla extract & Stevia drops'
        ],
        instructions: 'Whip ingredients with a fork or hand frother until thick and fluffy. Curbs late-night cravings while providing slow-digesting glutamine and amino acids.'
      }
    ]
  },
  {
    id: 'body-recomposition',
    title: 'Body Recomposition (Lean Muscle + Fat Loss)',
    goal: 'Build Muscle & Shed Fat Simultaneously at Maintenance',
    calorieTargetDescription: 'Isocaloric Maintenance (Zero Net Deficit)',
    macroRatio: {
      proteinPct: 30,
      carbsPct: 45,
      fatsPct: 25
    },
    totalDailyCalories: 2450,
    totalDailyProtein: 190,
    totalDailyCarbs: 275,
    totalDailyFats: 65,
    summary: 'The science of nutrient timing: slightly higher carbs and calories on training days to power strength adaptations, and lower carbohydrates on rest days to encourage fat oxidation.',
    keyGuidelines: [
      'Calorie Cycling: Eat +150 kcal above maintenance on heavy lifting days; eat -150 kcal below maintenance on rest days.',
      'Keep protein consistently high every day (2.0g/kg) regardless of training status.',
      'Focus intensely on pushing progressive overload in the gym to send the biological adaptation signal to partition nutrients into muscle tissue.'
    ],
    meals: [
      {
        id: 'recomp-breakfast',
        type: 'Breakfast',
        name: 'Avocado Toast with Poached Eggs & Smoked Salmon',
        calories: 560,
        proteinGrams: 42,
        carbsGrams: 46,
        fatGrams: 22,
        ingredients: [
          '2 Slices Sourdough Bread (toasted)',
          '2 Large Free-Range Eggs (poached)',
          '60g Wild Smoked Salmon',
          '50g Mashed Avocado with chili flakes and lime juice'
        ],
        instructions: 'Spread mashed avocado over toasted sourdough, layer smoked salmon, and top with warm poached eggs and sea salt.'
      },
      {
        id: 'recomp-lunch',
        type: 'Lunch',
        name: 'Bison or Extra-Lean Beef Quinoa Skillet',
        calories: 640,
        proteinGrams: 48,
        carbsGrams: 64,
        fatGrams: 18,
        ingredients: [
          '180g 95/5 Lean Ground Beef or Grass-Fed Bison',
          '75g Dry-weight Quinoa (cooked)',
          '1 Bell Pepper & Red Onion (diced and sautéed)',
          '30g Fresh Salsa & chopped cilantro'
        ],
        instructions: 'Brown lean meat in a skillet with cumin, garlic, and sea salt. Stir in warm quinoa and sautéed peppers. Top with fresh salsa.'
      },
      {
        id: 'recomp-preworkout',
        type: 'Pre-Workout',
        name: 'Crisp Apple, Greek Yogurt & Whey Dip',
        calories: 310,
        proteinGrams: 30,
        carbsGrams: 40,
        fatGrams: 3,
        ingredients: [
          '1 Large Honeycrisp Apple (sliced)',
          '120g 0% Greek Yogurt mixed with 20g Vanilla Whey',
          'Ground Cinnamon'
        ],
        instructions: 'Mix whey with yogurt into a smooth dipping sauce. Dip crisp apple slices for fast glucose and sustained aminos.'
      },
      {
        id: 'recomp-dinner',
        type: 'Post-Workout / Dinner',
        name: 'Grilled Herb Chicken & Roasted Rosemary Potatoes',
        calories: 670,
        proteinGrams: 50,
        carbsGrams: 75,
        fatGrams: 16,
        ingredients: [
          '200g Chicken Breast (marinated with oregano and thyme)',
          '250g Red Potatoes (roasted with rosemary and 1 tsp olive oil)',
          '150g Zucchini & yellow squash ribbons'
        ],
        instructions: 'Roast potatoes until golden and crispy. Grill chicken to juicy perfection. Sauté squash ribbons with a spray of olive oil.'
      },
      {
        id: 'recomp-night',
        type: 'Bedtime Recovery',
        name: 'Cottage Cheese & Honey Walnut Bowl',
        calories: 270,
        proteinGrams: 28,
        carbsGrams: 14,
        fatGrams: 10,
        ingredients: [
          '200g Low-fat Cultured Cottage Cheese',
          '10g Raw Honey',
          '15g Crushed Walnuts'
        ],
        instructions: 'Combine cottage cheese with raw honey and walnuts for overnight slow-digesting casein aminos and healthy fats.'
      }
    ]
  }
];

export const SUPPLEMENTS_GUIDE: Supplement[] = [
  {
    name: 'Creatine Monohydrate (Creapure®)',
    tier: 'Tier S',
    category: 'Intracellular Strength & Power',
    primaryBenefit: 'Boosts phosphocreatine stores in muscle cells, increasing high-intensity power output, 1RM strength by 5-15%, and cellular hydration.',
    dosage: '3g to 5g daily (no loading phase strictly necessary; saturation occurs in 3 weeks).',
    bestTiming: 'Take anytime daily with water or carbohydrates for consistent saturation.',
    evidenceSummary: 'The most researched sports supplement in human history with over 500 peer-reviewed clinical trials demonstrating safety and efficacy.'
  },
  {
    name: 'Whey Protein Isolate / Micellar Casein',
    tier: 'Tier S',
    category: 'Muscle Protein Synthesis (MPS)',
    primaryBenefit: 'Provides an optimal branched-chain amino acid (BCAA) profile rich in leucine (≥2.7g per serving) to trigger the mTOR pathway for muscle repair.',
    dosage: '25g to 40g per serving to hit the leucine threshold.',
    bestTiming: 'Post-workout or between meals when whole-food protein is unavailable.',
    evidenceSummary: 'Meta-analyses confirm that total daily protein intake of 1.6 - 2.2 g/kg maximizes muscle growth in resistance-trained individuals.'
  },
  {
    name: 'Essential Electrolytes (Na+, K+, Mg2+)',
    tier: 'Tier A',
    category: 'Neuromuscular Function & Hydration',
    primaryBenefit: 'Prevents intra-workout cramping, sustains plasma blood volume, enables full sarcoplasmic pump, and supports forceful actin-myosin contraction.',
    dosage: '500-1000mg Sodium, 200-400mg Potassium, 100-200mg Magnesium Malate.',
    bestTiming: 'Dissolved in your water bottle consumed intra-workout.',
    evidenceSummary: 'Even a 2% dehydration level reduces 1RM strength and causes significant reductions in total work capacity.'
  },
  {
    name: 'Vitamin D3 + K2 (MK-7)',
    tier: 'Tier A',
    category: 'Endocrine & Bone Density Optimization',
    primaryBenefit: 'Regulates natural testosterone production, immune defense, and directs calcium into bone matrix rather than arterial walls.',
    dosage: '2,000 to 5,000 IU Vitamin D3 + 100mcg K2 daily.',
    bestTiming: 'Morning with a meal containing dietary fats for optimal absorption.',
    evidenceSummary: 'Over 60% of athletes in northern latitudes test deficient in serum 25(OH)D, leading to compromised muscle force generation.'
  },
  {
    name: 'Omega-3 Fatty Acids (High EPA / DHA)',
    tier: 'Tier B',
    category: 'Joint Health & Systemic Recovery',
    primaryBenefit: 'Reduces delayed onset muscle soreness (DOMS), dampens inflammatory cytokines, and optimizes cell membrane fluidity for nutrient delivery.',
    dosage: '1,500mg to 2,000mg combined EPA + DHA daily.',
    bestTiming: 'With lunch or dinner.',
    evidenceSummary: 'Improves muscle protein synthesis response in older adults and preserves tendon elasticity in heavy lifters.'
  },
  {
    name: 'Caffeine Anhydrous / Pre-Workout',
    tier: 'Tier B',
    category: 'Central Nervous System Stimulant',
    primaryBenefit: 'Blocks adenosine receptors, reduces rating of perceived exertion (RPE), increases pain tolerance, and improves power output by 3-5%.',
    dosage: '3mg to 6mg per kg of bodyweight (typically 150mg - 300mg).',
    bestTiming: '30 to 45 minutes prior to intense lifting. Avoid within 7 hours of sleep.',
    evidenceSummary: 'Acute ergogenic aid documented in hundreds of sports science trials for both endurance and anaerobic capacity.'
  }
];
