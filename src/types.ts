export type MuscleGroup = 
  | 'Chest' 
  | 'Back' 
  | 'Quads' 
  | 'Hamstrings & Glutes' 
  | 'Shoulders' 
  | 'Biceps' 
  | 'Triceps' 
  | 'Abs & Core' 
  | 'Calves';

export type EquipmentType = 
  | 'Barbell' 
  | 'Dumbbell' 
  | 'Cable' 
  | 'Machine' 
  | 'Bodyweight' 
  | 'Kettlebell';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  targetMuscle: string;
  secondaryMuscles: string[];
  overview: string;
  setupSteps: string[];
  executionSteps: string[];
  proTips: string[];
  commonMistakes: string[];
  recommendedSets: string;
  recommendedReps: string;
  defaultRestSec: number;
}

export interface WorkoutExerciseItem {
  exerciseId: string;
  exerciseName: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  rpe: string;
  restSec: number;
  notes?: string;
}

export interface WorkoutDay {
  dayNumber: number;
  dayName: string;
  title: string;
  focus: string;
  exercises: WorkoutExerciseItem[];
}

export interface WorkoutProgram {
  id: string;
  title: string;
  tagline: string;
  daysPerWeek: number;
  difficulty: DifficultyLevel;
  goal: string;
  durationWeeks: number;
  description: string;
  days: WorkoutDay[];
}

export interface MealItem {
  id: string;
  type: 'Breakfast' | 'Morning Snack' | 'Lunch' | 'Pre-Workout' | 'Post-Workout / Dinner' | 'Bedtime Recovery';
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  ingredients: string[];
  instructions: string;
}

export interface NutritionPlan {
  id: string;
  title: string;
  goal: string;
  calorieTargetDescription: string;
  macroRatio: {
    proteinPct: number;
    carbsPct: number;
    fatsPct: number;
  };
  totalDailyCalories: number;
  totalDailyProtein: number;
  totalDailyCarbs: number;
  totalDailyFats: number;
  summary: string;
  keyGuidelines: string[];
  meals: MealItem[];
}

export interface Supplement {
  name: string;
  tier: 'Tier S' | 'Tier A' | 'Tier B';
  category: string;
  primaryBenefit: string;
  dosage: string;
  bestTiming: string;
  evidenceSummary: string;
}

export interface LoggedSet {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  rpe?: number;
}

export interface LoggedExercise {
  exerciseId: string;
  exerciseName: string;
  sets: LoggedSet[];
}

export interface WorkoutRecord {
  id: string;
  date: string;
  programTitle: string;
  dayTitle: string;
  durationMinutes: number;
  exercises: LoggedExercise[];
  notes?: string;
  totalVolumeKg: number;
}

export interface WeightRecord {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPct?: number;
  waistCm?: number;
  notes?: string;
}
