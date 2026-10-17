import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check, X, Plus, Trash2, Clock, Volume2, VolumeX, Award } from 'lucide-react';
import { WorkoutProgram, WorkoutDay, WorkoutRecord, LoggedExercise, LoggedSet } from '../types';
import { playTimerChime, playTickBeep } from '../utils/audio';

interface ActiveWorkoutModalProps {
  program: WorkoutProgram | null;
  day: WorkoutDay | null;
  onClose: () => void;
  onSaveWorkout: (record: WorkoutRecord) => void;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  program,
  day,
  onClose,
  onSaveWorkout
}) => {
  // Session elapsed timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Rest countdown timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [restTimerActive, setRestTimerActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Exercises and sets state
  const [exercises, setExercises] = useState<LoggedExercise[]>(() => {
    if (!day) return [];
    return day.exercises.map((ex) => ({
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseName,
      sets: Array.from({ length: ex.sets }, (_, idx) => ({
        setNumber: idx + 1,
        weight: 60,
        reps: parseInt(ex.reps.split('-')[0]) || 8,
        completed: false,
        rpe: 8
      }))
    }));
  });

  const [workoutNotes, setWorkoutNotes] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [calculatedVolume, setCalculatedVolume] = useState<number>(0);

  // Elapsed time tracker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Rest countdown timer
  useEffect(() => {
    let restInterval: NodeJS.Timeout | null = null;
    if (restTimerActive && restSecondsRemaining > 0) {
      restInterval = setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (soundEnabled) playTimerChime();
            setRestTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (restInterval) clearInterval(restInterval);
    };
  }, [restTimerActive, restSecondsRemaining, soundEnabled]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleSetComplete = (exIdx: number, setIdx: number) => {
    const updated = [...exercises];
    const targetSet = updated[exIdx].sets[setIdx];
    const willBeCompleted = !targetSet.completed;
    targetSet.completed = willBeCompleted;
    setExercises(updated);

    if (willBeCompleted) {
      if (soundEnabled) playTickBeep();
      // Start default 90s rest timer on completing set
      setRestSecondsRemaining(90);
      setRestTimerActive(true);
    }
  };

  const handleUpdateSetWeight = (exIdx: number, setIdx: number, val: number) => {
    const updated = [...exercises];
    updated[exIdx].sets[setIdx].weight = val;
    setExercises(updated);
  };

  const handleUpdateSetReps = (exIdx: number, setIdx: number, val: number) => {
    const updated = [...exercises];
    updated[exIdx].sets[setIdx].reps = val;
    setExercises(updated);
  };

  const handleAddSet = (exIdx: number) => {
    const updated = [...exercises];
    const ex = updated[exIdx];
    const lastSet = ex.sets[ex.sets.length - 1];
    ex.sets.push({
      setNumber: ex.sets.length + 1,
      weight: lastSet ? lastSet.weight : 60,
      reps: lastSet ? lastSet.reps : 8,
      completed: false,
      rpe: 8
    });
    setExercises(updated);
  };

  const handleRemoveSet = (exIdx: number, setIdx: number) => {
    const updated = [...exercises];
    if (updated[exIdx].sets.length <= 1) return;
    updated[exIdx].sets.splice(setIdx, 1);
    // Renumber sets
    updated[exIdx].sets.forEach((s, idx) => {
      s.setNumber = idx + 1;
    });
    setExercises(updated);
  };

  const handleFinishWorkout = () => {
    // Calculate total volume: weight * reps on completed sets
    let totalVol = 0;
    exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          totalVol += (s.weight || 0) * (s.reps || 0);
        }
      });
    });

    setCalculatedVolume(totalVol);
    setShowCelebration(true);

    if (soundEnabled) playTimerChime();

    const record: WorkoutRecord = {
      id: `workout_${Date.now()}`,
      date: new Date().toISOString(),
      programTitle: program?.title || 'Custom Session',
      dayTitle: day?.title || 'Open Workout',
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      exercises,
      notes: workoutNotes,
      totalVolumeKg: totalVol
    };

    onSaveWorkout(record);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-900/95 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <span className="font-semibold">{program?.title || 'Active Workout'}</span>
              <span>·</span>
              <span>{day?.dayName || 'Today'}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {day?.title || 'Live Training Session'}
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Elapsed Stopwatch */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono-nums">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white text-sm">{formatTime(elapsedSeconds)}</span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-neutral-400 hover:text-white ml-1"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title={soundEnabled ? 'Mute sound alerts' : 'Enable sound alerts'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Rest Countdown Bar (if active) */}
        {restSecondsRemaining > 0 && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Rest Interval Countdown:</span>
              <span className="text-base font-bold text-amber-400 font-mono-nums">
                {formatTime(restSecondsRemaining)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setRestSecondsRemaining((prev) => prev + 30)}
                className="px-2 py-1 text-[11px] rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors font-mono-nums"
              >
                +30s
              </button>
              <button
                onClick={() => {
                  setRestSecondsRemaining(0);
                  setRestTimerActive(false);
                }}
                className="px-2 py-1 text-[11px] rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Workout Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {exercises.map((ex, exIdx) => {
            const completedCount = ex.sets.filter((s) => s.completed).length;
            return (
              <div
                key={ex.exerciseId}
                className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-neutral-800 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                      {exIdx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {ex.exerciseName}
                    </h3>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono-nums">
                    {completedCount} of {ex.sets.length} sets completed
                  </span>
                </div>

                {/* Sets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="text-neutral-500 border-b border-neutral-800/80 uppercase text-[10px] tracking-wider font-medium">
                        <th className="py-2 px-2 text-center w-12">Set</th>
                        <th className="py-2 px-3">Weight (kg)</th>
                        <th className="py-2 px-3">Reps</th>
                        <th className="py-2 px-2 text-center w-16">Done</th>
                        <th className="py-2 px-2 text-center w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60 font-mono-nums">
                      {ex.sets.map((set, setIdx) => (
                        <tr
                          key={set.setNumber}
                          className={`transition-colors ${
                            set.completed ? 'bg-amber-500/5' : 'hover:bg-neutral-900/40'
                          }`}
                        >
                          <td className="py-2.5 px-2 text-center font-bold text-neutral-400">
                            {set.setNumber}
                          </td>

                          <td className="py-2.5 px-3">
                            <input
                              type="number"
                              min={0}
                              max={600}
                              step={2.5}
                              value={set.weight}
                              onChange={(e) => handleUpdateSetWeight(exIdx, setIdx, parseFloat(e.target.value) || 0)}
                              className="w-24 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-amber-500 font-mono-nums"
                            />
                          </td>

                          <td className="py-2.5 px-3">
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={set.reps}
                              onChange={(e) => handleUpdateSetReps(exIdx, setIdx, parseInt(e.target.value) || 0)}
                              className="w-20 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-amber-500 font-mono-nums"
                            />
                          </td>

                          <td className="py-2.5 px-2 text-center">
                            <button
                              onClick={() => handleToggleSetComplete(exIdx, setIdx)}
                              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all mx-auto ${
                                set.completed
                                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                                  : 'bg-neutral-900 border border-neutral-700 text-transparent hover:border-amber-500'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </button>
                          </td>

                          <td className="py-2.5 px-2 text-center">
                            <button
                              onClick={() => handleRemoveSet(exIdx, setIdx)}
                              className="text-neutral-600 hover:text-red-400 transition-colors p-1"
                              title="Delete this set"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Set Button */}
                <button
                  onClick={() => handleAddSet(exIdx)}
                  className="mt-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 py-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Set</span>
                </button>
              </div>
            );
          })}

          {/* Session Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Workout Log Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Felt great on bench, hit 85kg for 8 clean reps. Left shoulder felt 100% stable."
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            <span>Duration: <strong className="text-white font-mono-nums">{formatTime(elapsedSeconds)}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleFinishWorkout}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.99] flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Complete & Save Workout</span>
            </button>
          </div>
        </div>

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="absolute inset-0 z-30 bg-neutral-950/95 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">Workout Completed!</h3>
            <p className="text-sm text-neutral-300 mt-2 max-w-sm">
              Solid effort today. Your session has been stored in your workout log.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 max-w-xs w-full">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="text-xs text-neutral-400">Total Volume</div>
                <div className="text-lg font-bold text-amber-400 font-mono-nums mt-0.5">
                  {calculatedVolume.toLocaleString()} kg
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="text-xs text-neutral-400">Duration</div>
                <div className="text-lg font-bold text-white font-mono-nums mt-0.5">
                  {Math.round(elapsedSeconds / 60)} mins
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm hover:bg-amber-400 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
