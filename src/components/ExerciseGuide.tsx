import React, { useState, useMemo } from 'react';
import { Search, Filter, Dumbbell, AlertTriangle, CheckCircle2, ChevronRight, X, ArrowUpRight, Scale } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { Exercise, MuscleGroup, EquipmentType } from '../types';
import deadliftImage from '../assets/images/exercise_guide_barbell_1792239632274.jpg';

interface ExerciseGuideProps {
  onAddToWorkout?: (exercise: Exercise) => void;
  onOpenPlateCalculator?: (weight: number) => void;
}

const MUSCLE_GROUPS: (MuscleGroup | 'All')[] = [
  'All',
  'Chest',
  'Back',
  'Quads',
  'Hamstrings & Glutes',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Abs & Core',
  'Calves'
];

const EQUIPMENT_OPTIONS: (EquipmentType | 'All')[] = [
  'All',
  'Barbell',
  'Dumbbell',
  'Cable',
  'Machine',
  'Bodyweight'
];

export const ExerciseGuide: React.FC<ExerciseGuideProps> = ({
  onAddToWorkout,
  onOpenPlateCalculator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'All'>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | 'All'>('All');
  const [activeExerciseModal, setActiveExerciseModal] = useState<Exercise | null>(null);

  // Quick 1RM state within the modal
  const [quickWeight, setQuickWeight] = useState<number>(80);
  const [quickReps, setQuickReps] = useState<number>(8);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      const matchesSearch = 
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMuscle = selectedMuscle === 'All' || ex.category === selectedMuscle;
      const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;

      return matchesSearch && matchesMuscle && matchesEquipment;
    });
  }, [searchQuery, selectedMuscle, selectedEquipment]);

  // Calculate 1RM using Epley formula: Weight * (1 + Reps / 30)
  const estimated1RM = useMemo(() => {
    if (!quickWeight || !quickReps || quickReps < 1) return 0;
    if (quickReps === 1) return quickWeight;
    return Math.round(quickWeight * (1 + quickReps / 30));
  }, [quickWeight, quickReps]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
              Encyclopedia of Movement
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Exercise Technique & Form Guide
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
              Strict form cues, joint angles, setup mechanics, and mistakes to eliminate injury and maximize hyper-targeted tension.
            </p>
          </div>

          <div className="text-sm font-medium text-neutral-400 font-mono-nums shrink-0">
            Showing <span className="text-white font-bold">{filteredExercises.length}</span> of {EXERCISES.length} lifts
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by exercise name, muscle (e.g. Quads, Lats), or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Equipment Dropdown */}
          <div className="sm:w-56 shrink-0">
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value as EquipmentType | 'All')}
              className="w-full py-2.5 px-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-200 focus:outline-none focus:border-amber-500 transition-colors"
            >
              {EQUIPMENT_OPTIONS.map((eq) => (
                <option key={eq} value={eq} className="bg-neutral-900 text-neutral-200">
                  Equipment: {eq}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Muscle Group Segmented Filter Tabs (Zero-Pill compliant: functional buttons with segmented background) */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {MUSCLE_GROUPS.map((mg) => {
            const isSelected = selectedMuscle === mg;
            return (
              <button
                key={mg}
                onClick={() => setSelectedMuscle(mg)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {mg}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercises Card Grid */}
      {filteredExercises.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-neutral-900/40 border border-neutral-800">
          <Dumbbell className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No exercises matched your filters</h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, or clear your selected muscle group or equipment filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMuscle('All');
              setSelectedEquipment('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => setActiveExerciseModal(exercise)}
              className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div>
                {/* Clean unboxed metadata with typographic separators (NO PILLS) */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                  <span className="font-medium text-amber-400">{exercise.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exercise.equipment}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exercise.difficulty}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {exercise.name}
                </h3>

                <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                  {exercise.overview}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Target Muscle:</span>
                    <span className="text-neutral-200 font-medium">{exercise.targetMuscle}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400 font-mono-nums">
                    <span>Target Range:</span>
                    <span className="text-neutral-200 font-medium">{exercise.recommendedSets} × {exercise.recommendedReps}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-medium text-amber-400 group-hover:underline flex items-center gap-1">
                  Read Technique Cues
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs text-neutral-500 font-mono-nums">
                  Rest: {exercise.defaultRestSec}s
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deep Exercise Detail Modal */}
      {activeExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-800 flex items-start justify-between gap-4 bg-neutral-900/95 sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                  <span>{activeExerciseModal.category}</span>
                  <span>·</span>
                  <span>{activeExerciseModal.equipment}</span>
                  <span>·</span>
                  <span>{activeExerciseModal.difficulty}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeExerciseModal.name}
                </h3>
                <div className="text-xs text-neutral-400 mt-1">
                  Primary: <span className="text-white font-medium">{activeExerciseModal.targetMuscle}</span>
                  {activeExerciseModal.secondaryMuscles.length > 0 && (
                    <span> · Secondary: {activeExerciseModal.secondaryMuscles.join(', ')}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveExerciseModal(null)}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
              {/* Optional editorial photo banner for deadlift/compound lifts */}
              {activeExerciseModal.id === 'conventional-deadlift' && (
                <div className="relative rounded-xl overflow-hidden border border-neutral-800 h-48 sm:h-56">
                  <img
                    src={deadliftImage}
                    alt="Deadlift barbell form demonstration"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-amber-400">
                      Form Check: Packed lats, chest proud, bar against shins.
                    </span>
                  </div>
                </div>
              )}

              {/* Overview */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Biomechanical Overview
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  {activeExerciseModal.overview}
                </p>
              </div>

              {/* Step-by-Step Setup & Execution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs">
                      1
                    </span>
                    Setup & Position
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                    {activeExerciseModal.setupSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-500 mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs">
                      2
                    </span>
                    Movement Execution
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                    {activeExerciseModal.executionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-500 mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pro Form Cues Checklist */}
              <div className="p-4 rounded-xl bg-amber-950/10 border border-amber-900/30 space-y-2.5">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Key Coaching Cues
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs text-neutral-200">
                  {activeExerciseModal.proTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Mistakes to Avoid */}
              <div className="p-4 rounded-xl bg-red-950/10 border border-red-900/30 space-y-2.5">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Common Mistakes to Avoid
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {activeExerciseModal.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Quick 1RM & Calculator Widget for this exercise */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    Quick 1RM Estimate for {activeExerciseModal.name}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono-nums">
                    Formula: Epley (W × (1 + R/30))
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Working Weight (kg)</label>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={quickWeight}
                      onChange={(e) => setQuickWeight(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-white font-mono-nums focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Reps Performed (1-15)</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={quickReps}
                      onChange={(e) => setQuickReps(Number(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-white font-mono-nums focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Estimated 1RM</div>
                    <div className="text-lg font-extrabold text-amber-400 font-mono-nums">
                      {estimated1RM} kg
                    </div>
                  </div>
                </div>

                {activeExerciseModal.equipment === 'Barbell' && onOpenPlateCalculator && (
                  <button
                    onClick={() => {
                      onOpenPlateCalculator(quickWeight || 80);
                      setActiveExerciseModal(null);
                    }}
                    className="w-full py-2 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-850 rounded-lg border border-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Visualize Barbell Plate Loading for {quickWeight || 80} kg</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3 sticky bottom-0">
              <span className="text-xs text-neutral-400 font-mono-nums">
                Target: {activeExerciseModal.recommendedSets} × {activeExerciseModal.recommendedReps}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveExerciseModal(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Close
                </button>

                {onAddToWorkout && (
                  <button
                    onClick={() => {
                      onAddToWorkout(activeExerciseModal);
                      setActiveExerciseModal(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors"
                  >
                    Add to Workout Session
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
