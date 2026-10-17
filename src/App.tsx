import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ExerciseGuide } from './components/ExerciseGuide';
import { WorkoutPlans } from './components/WorkoutPlans';
import { NutritionPlans } from './components/NutritionPlans';
import { ProgressTools } from './components/ProgressTools';
import { AIFitnessCoach } from './components/AIFitnessCoach';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { Footer } from './components/Footer';
import { WorkoutProgram, WorkoutDay, WorkoutRecord, Exercise } from './types';
import { WORKOUT_PROGRAMS } from './data/workouts';
import { EXERCISES } from './data/exercises';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('exercises');
  
  // Workout History State persisted in localStorage
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ironforge_workout_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Pre-populate with one exemplary workout so the history and volume look alive
    return [
      {
        id: 'w_demo_1',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        programTitle: 'Push / Pull / Legs (PPL)',
        dayTitle: 'Push Day A (Chest & Delts Focus)',
        durationMinutes: 58,
        totalVolumeKg: 6420,
        notes: 'Pristine form on bench press, hit 80kg for 4 clean sets of 8 reps.',
        exercises: [
          {
            exerciseId: 'barbell-bench-press',
            exerciseName: 'Barbell Flat Bench Press',
            sets: [
              { setNumber: 1, weight: 80, reps: 8, completed: true },
              { setNumber: 2, weight: 80, reps: 8, completed: true },
              { setNumber: 3, weight: 80, reps: 8, completed: true },
              { setNumber: 4, weight: 80, reps: 8, completed: true }
            ]
          },
          {
            exerciseId: 'incline-dumbbell-press',
            exerciseName: 'Incline Dumbbell Press',
            sets: [
              { setNumber: 1, weight: 28, reps: 10, completed: true },
              { setNumber: 2, weight: 28, reps: 10, completed: true },
              { setNumber: 3, weight: 28, reps: 9, completed: true }
            ]
          },
          {
            exerciseId: 'dumbbell-lateral-raise',
            exerciseName: 'Dumbbell Lateral Raise',
            sets: [
              { setNumber: 1, weight: 12, reps: 15, completed: true },
              { setNumber: 2, weight: 12, reps: 15, completed: true },
              { setNumber: 3, weight: 12, reps: 14, completed: true }
            ]
          }
        ]
      }
    ];
  });

  // Active Live Workout Modal State
  const [activeSessionOpen, setActiveSessionOpen] = useState<boolean>(false);
  const [activeProgram, setActiveProgram] = useState<WorkoutProgram | null>(null);
  const [activeDay, setActiveDay] = useState<WorkoutDay | null>(null);

  // Barbell weight jump state
  const [prefilledBarbellWeight, setPrefilledBarbellWeight] = useState<number | null>(null);

  // Sync workout history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ironforge_workout_history', JSON.stringify(workoutHistory));
    } catch {
      // ignore
    }
  }, [workoutHistory]);

  const handleStartSession = (program: WorkoutProgram, day: WorkoutDay) => {
    setActiveProgram(program);
    setActiveDay(day);
    setActiveSessionOpen(true);
  };

  const handleOpenQuickSession = () => {
    const defaultProgram = WORKOUT_PROGRAMS[0];
    const defaultDay = defaultProgram.days[0];
    setActiveProgram(defaultProgram);
    setActiveDay(defaultDay);
    setActiveSessionOpen(true);
  };

  const handleSaveWorkout = (record: WorkoutRecord) => {
    const updated = [record, ...workoutHistory];
    setWorkoutHistory(updated);
  };

  const handleOpenPlateCalculator = (weight: number) => {
    setPrefilledBarbellWeight(weight);
    setActiveTab('tools');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleAddExerciseToWorkout = (exercise: Exercise) => {
    // If a session isn't running, start default session
    if (!activeSessionOpen) {
      handleOpenQuickSession();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Bar Header adhering strictly to 3-zone contract */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickSession={handleOpenQuickSession}
        hasActiveSession={activeSessionOpen}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {/* Dynamic Hero only shows at top of page */}
        <HeroBanner
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {activeTab === 'exercises' && (
            <ExerciseGuide
              onAddToWorkout={handleAddExerciseToWorkout}
              onOpenPlateCalculator={handleOpenPlateCalculator}
            />
          )}

          {activeTab === 'workouts' && (
            <WorkoutPlans
              onStartSession={handleStartSession}
              onViewExerciseDetail={(ex) => {
                setActiveTab('exercises');
              }}
            />
          )}

          {activeTab === 'nutrition' && (
            <NutritionPlans />
          )}

          {activeTab === 'tools' && (
            <ProgressTools
              workoutHistory={workoutHistory}
              onOpenQuickWorkout={handleOpenQuickSession}
              prefilledBarbellWeight={prefilledBarbellWeight}
            />
          )}

          {activeTab === 'coach' && (
            <AIFitnessCoach
              onLoadCustomPlan={() => {
                setActiveTab('tools');
              }}
            />
          )}
        </div>
      </main>

      {/* Active Workout Session Modal Player */}
      {activeSessionOpen && (
        <ActiveWorkoutModal
          program={activeProgram}
          day={activeDay}
          onClose={() => setActiveSessionOpen(false)}
          onSaveWorkout={handleSaveWorkout}
        />
      )}

      {/* Clean Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
