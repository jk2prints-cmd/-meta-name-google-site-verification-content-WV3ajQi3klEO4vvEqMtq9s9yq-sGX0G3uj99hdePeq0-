import React, { useState, useMemo } from 'react';
import { Apple, Flame, Utensils, Droplets, CheckCircle, Info, ChevronRight, Calculator, Sparkles } from 'lucide-react';
import { NUTRITION_PLANS, SUPPLEMENTS_GUIDE } from '../data/nutrition';
import { NutritionPlan } from '../types';
import mealHeroImage from '../assets/images/fitness_nutrition_meal_1792239631910.jpg';

export const NutritionPlans: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('lean-hypertrophy');
  const [selectedMealIndex, setSelectedMealIndex] = useState<number>(0);

  // TDEE & Macro Calculator State
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(26);
  const [weightKg, setWeightKg] = useState<number>(78);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [activityFactor, setActivityFactor] = useState<number>(1.55); // Moderate (3-5 days gym)
  const [fitnessGoal, setFitnessGoal] = useState<'cut' | 'maintain' | 'bulk'>('bulk');

  const currentPlan = NUTRITION_PLANS.find((p) => p.id === selectedPlanId) || NUTRITION_PLANS[0];

  // Mifflin-St Jeor Formula
  // BMR Male = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
  // BMR Female = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
  const calculatedMetrics = useMemo(() => {
    const bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    const tdee = Math.round(bmr * activityFactor);

    let targetCalories = tdee;
    if (fitnessGoal === 'cut') {
      targetCalories = Math.round(tdee - 500);
    } else if (fitnessGoal === 'bulk') {
      targetCalories = Math.round(tdee + 350);
    }

    // Protein: 2.2g per kg for cut/bulk
    const targetProteinGrams = Math.round(weightKg * 2.2);
    const proteinCalories = targetProteinGrams * 4;

    // Fats: 25% of target calories
    const fatCalories = targetCalories * 0.25;
    const targetFatGrams = Math.round(fatCalories / 9);

    // Remaining calories for Carbohydrates
    const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
    const targetCarbGrams = Math.round(carbCalories / 4);

    // Water target in Liters: weight * 0.04 + 0.5L for training
    const targetWaterLiters = (weightKg * 0.04 + 0.5).toFixed(1);

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      targetProteinGrams,
      targetFatGrams,
      targetCarbGrams,
      targetWaterLiters
    };
  }, [gender, age, weightKg, heightCm, activityFactor, fitnessGoal]);

  return (
    <div className="space-y-10">
      {/* Nutrition Blueprint Hero & Goal Switcher */}
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Biochemical Fueling
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Evidence-Based Nutrition & Meal Plans
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every physique transformation is governed by energy balance and macronutrient partitioning. Select your primary physical adaptation goal below to load a clinically designed daily meal schedule with exact gram measurements.
            </p>

            {/* Segmented Goal Tabs (Buttons with segmented style) */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {NUTRITION_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      setSelectedMealIndex(0);
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-neutral-950 shadow-sm'
                        : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {plan.title.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[4/3] group shadow-xl">
              <img
                src={mealHeroImage}
                alt="Nutritious athlete meal prep bowl with grilled chicken, sweet potato, and greens"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-semibold text-amber-400">Whole Food Anabolic Density</span>
                <span className="text-sm font-bold text-white mt-0.5">High Micronutrient & Leucine Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Nutrition Plan Overview & Macro Distribution */}
      <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="text-xs text-amber-400 font-semibold mb-1">
              Active Protocol: {currentPlan.calorieTargetDescription}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {currentPlan.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              {currentPlan.summary}
            </p>
          </div>

          {/* Daily Macro Summary Badges */}
          <div className="flex items-center gap-3 shrink-0 font-mono-nums">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center min-w-[70px]">
              <div className="text-[10px] text-neutral-400 uppercase">Calories</div>
              <div className="text-base font-extrabold text-white mt-0.5">{currentPlan.totalDailyCalories}</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center min-w-[70px]">
              <div className="text-[10px] text-amber-400 uppercase">Protein</div>
              <div className="text-base font-extrabold text-amber-400 mt-0.5">{currentPlan.totalDailyProtein}g</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center min-w-[70px]">
              <div className="text-[10px] text-sky-400 uppercase">Carbs</div>
              <div className="text-base font-extrabold text-sky-400 mt-0.5">{currentPlan.totalDailyCarbs}g</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center min-w-[70px]">
              <div className="text-[10px] text-rose-400 uppercase">Fats</div>
              <div className="text-base font-extrabold text-rose-400 mt-0.5">{currentPlan.totalDailyFats}g</div>
            </div>
          </div>
        </div>

        {/* Key Guidelines */}
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-2">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            Core Dietary Principles for this Phase
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            {currentPlan.keyGuidelines.map((g, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Meal-by-Meal Daily Schedule */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Daily Meal Schedule & Nutrient Timing
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPlan.meals.map((meal, mIdx) => (
              <div
                key={meal.id}
                className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                    <span className="font-semibold text-amber-400">{meal.type}</span>
                    <span className="font-mono-nums font-bold text-white">{meal.calories} kcal</span>
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {meal.name}
                  </h4>

                  {/* Clean unboxed macros */}
                  <div className="mt-2 flex items-center gap-2 text-[11px] font-mono-nums text-neutral-400">
                    <span className="text-amber-400 font-medium">P: {meal.proteinGrams}g</span>
                    <span>·</span>
                    <span className="text-sky-400 font-medium">C: {meal.carbsGrams}g</span>
                    <span>·</span>
                    <span className="text-rose-400 font-medium">F: {meal.fatGrams}g</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-900 space-y-1.5 text-xs">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">
                      Key Ingredients:
                    </div>
                    <ul className="space-y-1 text-neutral-300">
                      {meal.ingredients.map((ing, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-neutral-500 mt-0.5">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-900 text-[11px] text-neutral-400 leading-relaxed italic">
                  "{meal.instructions}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive TDEE & Custom Macro Calculator */}
      <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
          <Calculator className="w-4 h-4" />
          Individual Biometric Engine
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Interactive TDEE & Custom Macro Calculator
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
          Powered by the Mifflin-St Jeor equation to calculate your exact Basal Metabolic Rate and tailored protein, carb, and fat requirements.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Biological Sex</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    gender === 'male'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    gender === 'female'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Age (Years)</label>
              <input
                type="number"
                min={15}
                max={90}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 20)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white font-mono-nums focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Body Weight (kg)</label>
              <input
                type="number"
                min={30}
                max={200}
                step={0.5}
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 60)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white font-mono-nums focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Height (cm)</label>
              <input
                type="number"
                min={100}
                max={240}
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value) || 170)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white font-mono-nums focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Weekly Activity Level</label>
              <select
                value={activityFactor}
                onChange={(e) => setActivityFactor(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value={1.2}>Sedentary (desk job, minimal lifting)</option>
                <option value={1.375}>Lightly Active (lifting 1-3 days/week)</option>
                <option value={1.55}>Moderately Active (lifting 3-5 days/week)</option>
                <option value={1.725}>Very Active (hard training 6-7 days/week)</option>
                <option value={1.9}>Extremely Active (twice daily sessions / physical labor)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Primary Fitness Goal</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFitnessGoal('cut')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    fitnessGoal === 'cut'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  Fat Shred (-500)
                </button>
                <button
                  type="button"
                  onClick={() => setFitnessGoal('maintain')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    fitnessGoal === 'maintain'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  Maintenance
                </button>
                <button
                  type="button"
                  onClick={() => setFitnessGoal('bulk')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    fitnessGoal === 'bulk'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  Lean Bulk (+350)
                </button>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-5 flex flex-col justify-between font-mono-nums">
            <div>
              <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-850 pb-2">
                <span>Basal Metabolic Rate (BMR):</span>
                <span className="text-white font-bold">{calculatedMetrics.bmr} kcal/day</span>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-850 py-2">
                <span>Total Daily Expenditure (TDEE):</span>
                <span className="text-white font-bold">{calculatedMetrics.tdee} kcal/day</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-sans">
                Target Daily Calorie Intake
              </div>
              <div className="text-3xl font-extrabold text-amber-400 mt-1">
                {calculatedMetrics.targetCalories} <span className="text-sm font-normal text-neutral-400">kcal</span>
              </div>
              <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                {fitnessGoal === 'cut' ? 'Calorie Deficit for Fat Loss' : fitnessGoal === 'bulk' ? 'Calorie Surplus for Muscle Accretion' : 'Energy Balance'}
              </div>
            </div>

            {/* Target Macro Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="text-[10px] text-amber-400 uppercase font-sans">Protein</div>
                <div className="text-lg font-bold text-white mt-0.5">{calculatedMetrics.targetProteinGrams}g</div>
                <div className="text-[10px] text-neutral-500 font-sans">4 kcal/g</div>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="text-[10px] text-sky-400 uppercase font-sans">Carbs</div>
                <div className="text-lg font-bold text-white mt-0.5">{calculatedMetrics.targetCarbGrams}g</div>
                <div className="text-[10px] text-neutral-500 font-sans">4 kcal/g</div>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="text-[10px] text-rose-400 uppercase font-sans">Fats</div>
                <div className="text-lg font-bold text-white mt-0.5">{calculatedMetrics.targetFatGrams}g</div>
                <div className="text-[10px] text-neutral-500 font-sans">9 kcal/g</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-400 font-sans pt-1">
              <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Recommended Daily Hydration: <strong className="text-white font-mono-nums">{calculatedMetrics.targetWaterLiters} Liters</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence-Based Supplement Guide */}
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8 space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
            Clinical Science Tier List
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Evidence-Based Supplement Encyclopedia
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Only 5% of sports supplements have rigorous peer-reviewed human trials. Here are the clinically proven compounds categorized by scientific tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPLEMENTS_GUIDE.map((sup, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[11px] font-bold rounded ${
                    sup.tier === 'Tier S'
                      ? 'bg-amber-500 text-neutral-950'
                      : sup.tier === 'Tier A'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    {sup.tier}
                  </span>
                  <span className="text-xs text-neutral-400">{sup.category}</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-white">
                {sup.name}
              </h4>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {sup.primaryBenefit}
              </p>

              <div className="pt-3 border-t border-neutral-900/80 space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 font-medium shrink-0">Dosage:</span>
                  <span className="text-neutral-200 font-mono-nums">{sup.dosage}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 font-medium shrink-0">Timing:</span>
                  <span className="text-neutral-300">{sup.bestTiming}</span>
                </div>
                <div className="flex items-start gap-2 pt-1 text-[11px] text-neutral-400 italic">
                  <span className="text-amber-500 font-bold shrink-0">Clinical Evidence:</span>
                  <span>{sup.evidenceSummary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
