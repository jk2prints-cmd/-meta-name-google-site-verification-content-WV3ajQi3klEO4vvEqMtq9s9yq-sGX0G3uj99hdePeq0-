import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Scale, Clock, Award, Plus, Trash2, Calendar, Check, Disc, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { WorkoutRecord, WeightRecord } from '../types';
import { playTimerChime, playTickBeep } from '../utils/audio';

interface ProgressToolsProps {
  workoutHistory: WorkoutRecord[];
  onOpenQuickWorkout: () => void;
  prefilledBarbellWeight?: number | null;
}

const DEFAULT_WEIGHT_LOGS: WeightRecord[] = [
  { id: 'w1', date: '2026-09-15', weightKg: 82.5, bodyFatPct: 17.5, waistCm: 86 },
  { id: 'w2', date: '2026-09-22', weightKg: 82.0, bodyFatPct: 17.2, waistCm: 85.5 },
  { id: 'w3', date: '2026-09-29', weightKg: 81.4, bodyFatPct: 16.8, waistCm: 85.0 },
  { id: 'w4', date: '2026-10-06', weightKg: 80.9, bodyFatPct: 16.5, waistCm: 84.0 },
  { id: 'w5', date: '2026-10-13', weightKg: 80.2, bodyFatPct: 16.0, waistCm: 83.5 }
];

export const ProgressTools: React.FC<ProgressToolsProps> = ({
  workoutHistory,
  onOpenQuickWorkout,
  prefilledBarbellWeight
}) => {
  const [activeSubTool, setActiveSubTool] = useState<'logger' | 'weight' | '1rm' | 'plates' | 'timer'>(
    prefilledBarbellWeight ? 'plates' : 'logger'
  );

  // Weight Tracking State (stored in localStorage)
  const [weightLogs, setWeightLogs] = useState<WeightRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ironforge_weight_logs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_WEIGHT_LOGS;
  });

  const [newLogWeight, setNewLogWeight] = useState<string>('80.0');
  const [newLogBodyFat, setNewLogBodyFat] = useState<string>('');
  const [newLogWaist, setNewLogWaist] = useState<string>('');
  const [newLogDate, setNewLogDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    try {
      localStorage.setItem('ironforge_weight_logs', JSON.stringify(weightLogs));
    } catch {
      // ignore
    }
  }, [weightLogs]);

  // 1RM Calculator State
  const [oneRmWeight, setOneRmWeight] = useState<number>(100);
  const [oneRmReps, setOneRmReps] = useState<number>(5);

  // Barbell Plate Visualizer State
  const [plateTargetWeight, setPlateTargetWeight] = useState<number>(prefilledBarbellWeight || 100);
  const [barWeight, setBarWeight] = useState<number>(20); // 20kg standard Olympic bar

  // Dedicated Rest Timer State
  const [timerDuration, setTimerDuration] = useState<number>(90);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSound, setTimerSound] = useState<boolean>(true);

  // Synchronize prefilled weight if passed from ExerciseGuide
  useEffect(() => {
    if (prefilledBarbellWeight) {
      setPlateTargetWeight(prefilledBarbellWeight);
      setActiveSubTool('plates');
    }
  }, [prefilledBarbellWeight]);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            if (timerSound) playTimerChime();
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft, timerSound]);

  // 1RM Formulas
  const oneRmCalculations = useMemo(() => {
    const w = oneRmWeight || 0;
    const r = oneRmReps || 1;
    if (w <= 0) return { epley: 0, brzycki: 0, lombardi: 0, average: 0, percentages: [] };

    const epley = Math.round(w * (1 + r / 30));
    const brzycki = Math.round(w * (36 / (37 - r)));
    const lombardi = Math.round(w * Math.pow(r, 0.1));
    const average = Math.round((epley + brzycki + lombardi) / 3);

    const percentages = [
      { pct: 100, reps: '1 rep (Max)', load: average },
      { pct: 95, reps: '2 reps', load: Math.round(average * 0.95) },
      { pct: 90, reps: '3-4 reps', load: Math.round(average * 0.90) },
      { pct: 85, reps: '5-6 reps', load: Math.round(average * 0.85) },
      { pct: 80, reps: '7-8 reps', load: Math.round(average * 0.80) },
      { pct: 75, reps: '9-10 reps', load: Math.round(average * 0.75) },
      { pct: 70, reps: '11-12 reps', load: Math.round(average * 0.70) },
      { pct: 65, reps: '13-15 reps', load: Math.round(average * 0.65) }
    ];

    return { epley, brzycki, lombardi, average, percentages };
  }, [oneRmWeight, oneRmReps]);

  // Plate Calculations
  const plateDistribution = useMemo(() => {
    const netWeight = Math.max(0, plateTargetWeight - barWeight);
    const weightPerSide = netWeight / 2;

    const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
    const plateColors: Record<number, string> = {
      25: 'bg-red-600 text-white border-red-700 h-28 w-6',
      20: 'bg-blue-600 text-white border-blue-700 h-26 w-6',
      15: 'bg-amber-500 text-neutral-950 border-amber-600 h-22 w-5',
      10: 'bg-emerald-600 text-white border-emerald-700 h-18 w-5',
      5: 'bg-neutral-100 text-neutral-900 border-neutral-300 h-14 w-4',
      2.5: 'bg-neutral-900 text-neutral-200 border-neutral-700 h-11 w-3.5',
      1.25: 'bg-neutral-600 text-white border-neutral-500 h-9 w-3'
    };

    let remaining = weightPerSide;
    const platesPerSide: { weight: number; colorClass: string }[] = [];

    for (const plate of availablePlates) {
      while (remaining >= plate - 0.001) {
        platesPerSide.push({
          weight: plate,
          colorClass: plateColors[plate] || 'bg-neutral-700'
        });
        remaining -= plate;
        remaining = Math.round(remaining * 100) / 100;
      }
    }

    const actualTotalWeight = barWeight + platesPerSide.reduce((sum, p) => sum + p.weight, 0) * 2;

    return {
      weightPerSide,
      platesPerSide,
      actualTotalWeight,
      unaccountedWeight: Math.round((plateTargetWeight - actualTotalWeight) * 10) / 10
    };
  }, [plateTargetWeight, barWeight]);

  const handleAddWeightLog = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(newLogWeight);
    if (!w || w <= 0) return;

    const newEntry: WeightRecord = {
      id: `w_${Date.now()}`,
      date: newLogDate || new Date().toISOString().split('T')[0],
      weightKg: w,
      bodyFatPct: newLogBodyFat ? parseFloat(newLogBodyFat) : undefined,
      waistCm: newLogWaist ? parseFloat(newLogWaist) : undefined
    };

    // Keep chronological
    const updated = [...weightLogs, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setWeightLogs(updated);
  };

  const handleDeleteWeightLog = (id: string) => {
    setWeightLogs(weightLogs.filter((l) => l.id !== id));
  };

  const formatTimerDisplay = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Tools Navigation Tabs */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
          Performance Optimization Suite
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Progress Tracking & Gym Utility Tools
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
          Everything you need on the gym floor: live workout logs, body transformation curves, 1RM percentage zones, plate loader math, and interval timers.
        </p>

        {/* Sub-tool navigation buttons */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setActiveSubTool('logger')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeSubTool === 'logger'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Workout History & Logger</span>
          </button>

          <button
            onClick={() => setActiveSubTool('weight')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeSubTool === 'weight'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Body Weight & Measurements</span>
          </button>

          <button
            onClick={() => setActiveSubTool('1rm')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeSubTool === '1rm'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>1-Rep Max Calculator</span>
          </button>

          <button
            onClick={() => setActiveSubTool('plates')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeSubTool === 'plates'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Barbell Plate Visualizer</span>
          </button>

          <button
            onClick={() => setActiveSubTool('timer')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeSubTool === 'timer'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Rest Interval Stopwatch</span>
          </button>
        </div>
      </div>

      {/* SUB-TOOL 1: WORKOUT HISTORY & LOGS */}
      {activeSubTool === 'logger' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Completed Training History</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Saved sessions, total tonnage lifted, and exercise logs.
              </p>
            </div>

            <button
              onClick={onOpenQuickWorkout}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Workout Session</span>
            </button>
          </div>

          {workoutHistory.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800">
              <Award className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-white">No workouts recorded yet</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Launch a workout from the Workout Programs tab, or click "Log New Workout Session" above to record today's sets, reps, and tonnage.
              </p>
              <button
                onClick={onOpenQuickWorkout}
                className="mt-4 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Log First Session
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {workoutHistory.map((workout) => (
                <div
                  key={workout.id}
                  className="p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                    <div>
                      <div className="text-xs text-amber-400 font-semibold">{workout.programTitle}</div>
                      <h4 className="text-base font-bold text-white mt-0.5">{workout.dayTitle}</h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono-nums">
                      <span>{new Date(workout.date).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{workout.durationMinutes} mins</span>
                      <span>·</span>
                      <span className="text-amber-400 font-bold">{workout.totalVolumeKg.toLocaleString()} kg total volume</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {workout.exercises.map((ex, idx) => {
                      const completedSets = ex.sets.filter((s) => s.completed);
                      return (
                        <div key={idx} className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-850">
                          <div className="text-xs font-bold text-white truncate">{ex.exerciseName}</div>
                          <div className="text-[11px] text-neutral-400 mt-1 font-mono-nums">
                            {completedSets.length} sets: {completedSets.map((s) => `${s.weight}kg×${s.reps}`).join(', ')}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {workout.notes && (
                    <div className="text-xs text-neutral-400 italic pt-1">
                      Notes: "{workout.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TOOL 2: BODYWEIGHT & MEASUREMENTS TRACKER */}
      {activeSubTool === 'weight' && (
        <div className="space-y-6">
          {/* Tracker Card with Form & Interactive SVG Chart */}
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Body Weight & Composition Trajectory</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Log your scale weight under consistent morning fasted conditions to track true rate of gain or loss.
                </p>
              </div>

              {weightLogs.length >= 2 && (
                <div className="text-xs font-mono-nums bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 text-neutral-300">
                  Total Change: <span className={weightLogs[weightLogs.length - 1].weightKg <= weightLogs[0].weightKg ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {(weightLogs[weightLogs.length - 1].weightKg - weightLogs[0].weightKg).toFixed(1)} kg
                  </span>
                </div>
              )}
            </div>

            {/* Interactive SVG Progress Chart */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850">
              <div className="text-xs font-medium text-neutral-400 mb-2 flex items-center justify-between">
                <span>Weight Progression Curve (kg)</span>
                <span className="text-[11px] text-neutral-500 font-mono-nums">{weightLogs.length} entries recorded</span>
              </div>

              {weightLogs.length > 1 ? (
                <div className="h-44 w-full relative pt-4">
                  {(() => {
                    const minW = Math.min(...weightLogs.map((l) => l.weightKg)) - 1;
                    const maxW = Math.max(...weightLogs.map((l) => l.weightKg)) + 1;
                    const range = Math.max(1, maxW - minW);

                    const points = weightLogs.map((l, idx) => {
                      const x = (idx / (weightLogs.length - 1)) * 95 + 2.5;
                      const y = 90 - ((l.weightKg - minW) / range) * 75;
                      return { x, y, log: l };
                    });

                    const pathString = points.reduce((acc, curr, idx) => {
                      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
                    }, '');

                    return (
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-36 overflow-visible">
                        {/* Horizontal grid lines */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#27272a" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="0" y1="55" x2="100" y2="55" stroke="#27272a" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="0" y1="90" x2="100" y2="90" stroke="#27272a" strokeWidth="0.5" strokeDasharray="2,2" />

                        {/* Trend path */}
                        <path
                          d={pathString}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Dots */}
                        {points.map((pt, pIdx) => (
                          <g key={pIdx}>
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="2.5"
                              fill="#f59e0b"
                              stroke="#0a0a0b"
                              strokeWidth="1"
                            />
                          </g>
                        ))}
                      </svg>
                    );
                  })()}

                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono-nums mt-2 pt-2 border-t border-neutral-900">
                    <span>{weightLogs[0].date}</span>
                    <span>{weightLogs[weightLogs.length - 1].date}</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-neutral-500">
                  Add at least 2 entries to display the visual trend line.
                </div>
              )}
            </div>

            {/* Quick Add Log Form */}
            <form onSubmit={handleAddWeightLog} className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end pt-2">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Date</label>
                <input
                  type="date"
                  value={newLogDate}
                  onChange={(e) => setNewLogDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono-nums"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Weight (kg)*</label>
                <input
                  type="number"
                  step={0.1}
                  required
                  value={newLogWeight}
                  onChange={(e) => setNewLogWeight(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono-nums"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Body Fat % (opt)</label>
                <input
                  type="number"
                  step={0.1}
                  placeholder="e.g. 15.5"
                  value={newLogBodyFat}
                  onChange={(e) => setNewLogBodyFat(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono-nums"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Waist cm (opt)</label>
                <input
                  type="number"
                  step={0.5}
                  placeholder="e.g. 84.0"
                  value={newLogWaist}
                  onChange={(e) => setNewLogWaist(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono-nums"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Entry</span>
                </button>
              </div>
            </form>

            {/* Weight Records Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-neutral-500 border-b border-neutral-800 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Weight</th>
                    <th className="py-2.5 px-3">Body Fat</th>
                    <th className="py-2.5 px-3">Waist</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 font-mono-nums">
                  {weightLogs.slice().reverse().map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-850/50 transition-colors">
                      <td className="py-2.5 px-3 text-neutral-300">{log.date}</td>
                      <td className="py-2.5 px-3 font-bold text-white">{log.weightKg} kg</td>
                      <td className="py-2.5 px-3 text-neutral-400">{log.bodyFatPct ? `${log.bodyFatPct}%` : '—'}</td>
                      <td className="py-2.5 px-3 text-neutral-400">{log.waistCm ? `${log.waistCm} cm` : '—'}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleDeleteWeightLog(log.id)}
                          className="text-neutral-600 hover:text-red-400 p-1 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL 3: 1-REP MAX (1RM) CALCULATOR */}
      {activeSubTool === '1rm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white">1-Rep Max Calculator</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Estimate your single-rep maximum strength without testing dangerous maximal attempts.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Lifted Weight (kg)
                </label>
                <input
                  type="number"
                  min={1}
                  max={600}
                  step={2.5}
                  value={oneRmWeight}
                  onChange={(e) => setOneRmWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono-nums focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Completed Reps (1 to 15)
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={oneRmReps}
                  onChange={(e) => setOneRmReps(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono-nums focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Big Estimated 1RM Display */}
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-center font-mono-nums">
                <div className="text-xs text-neutral-400 uppercase tracking-wider font-sans">
                  Estimated One-Rep Maximum
                </div>
                <div className="text-4xl font-extrabold text-amber-400 mt-1">
                  {oneRmCalculations.average} <span className="text-lg font-normal text-neutral-400">kg</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-2 font-sans flex items-center justify-center gap-3">
                  <span>Epley: {oneRmCalculations.epley}kg</span>
                  <span>·</span>
                  <span>Brzycki: {oneRmCalculations.brzycki}kg</span>
                  <span>·</span>
                  <span>Lombardi: {oneRmCalculations.lombardi}kg</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setPlateTargetWeight(oneRmCalculations.average);
                  setActiveSubTool('plates');
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Disc className="w-3.5 h-3.5 text-amber-400" />
                <span>Load This 1RM on Barbell Visualizer</span>
              </button>
            </div>
          </div>

          {/* 1RM Training Percentages Table */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800">
            <h4 className="text-base font-bold text-white mb-1">
              Hypertrophy & Strength Training Zones
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Standard training loads calculated relative to your {oneRmCalculations.average} kg 1RM.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono-nums">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Percent of 1RM</th>
                    <th className="py-2.5 px-3">Target Weight</th>
                    <th className="py-2.5 px-3">Rep Range Equivalent</th>
                    <th className="py-2.5 px-3">Primary Training Adaptation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {oneRmCalculations.percentages.map((row) => (
                    <tr key={row.pct} className="hover:bg-neutral-850/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-amber-400">{row.pct}%</td>
                      <td className="py-2.5 px-3 text-white font-bold">{row.load} kg</td>
                      <td className="py-2.5 px-3 text-neutral-300 font-sans">{row.reps}</td>
                      <td className="py-2.5 px-3 text-neutral-400 font-sans text-[11px]">
                        {row.pct >= 90
                          ? 'Neural Max Strength & Peaking'
                          : row.pct >= 80
                          ? 'Myofibrillar Hypertrophy & Strength'
                          : row.pct >= 70
                          ? 'Optimal Volume Hypertrophy'
                          : 'Muscular Endurance & Deload'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL 4: BARBELL PLATE VISUALIZER */}
      {activeSubTool === 'plates' && (
        <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Barbell Plate Loader & Visualizer</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Calculate the exact Olympic color-coded bumper plates required on each side of the bar.
              </p>
            </div>

            {/* Quick Adjustment Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[60, 80, 100, 120, 140, 160].map((quick) => (
                <button
                  key={quick}
                  onClick={() => setPlateTargetWeight(quick)}
                  className={`px-2.5 py-1 text-xs rounded-md font-mono-nums transition-colors ${
                    plateTargetWeight === quick
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  {quick}kg
                </button>
              ))}
            </div>
          </div>

          {/* Barbell Graphic Simulation Container */}
          <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center min-h-[180px] overflow-x-auto">
            <div className="flex items-center justify-center min-w-[500px] w-full">
              {/* Left Bar Sleeve with Plates */}
              <div className="flex items-center justify-end flex-1">
                {/* Left side plates (mirrored) */}
                <div className="flex items-center gap-1 flex-row-reverse">
                  {plateDistribution.platesPerSide.map((plate, idx) => (
                    <div
                      key={`left_${idx}`}
                      className={`rounded-sm flex items-center justify-center border font-mono-nums font-bold text-[9px] shadow-sm select-none ${plate.colorClass}`}
                      title={`${plate.weight}kg plate`}
                    >
                      <span className="rotate-90">{plate.weight}</span>
                    </div>
                  ))}
                </div>

                {/* Left Collar */}
                <div className="w-3 h-8 bg-neutral-500 border border-neutral-400 rounded-sm ml-1" />
              </div>

              {/* Center Bar Shaft */}
              <div className="w-56 h-3 bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-400 rounded-sm relative flex items-center justify-center shadow-inner">
                <span className="text-[9px] font-mono text-neutral-950 font-bold tracking-widest uppercase">
                  {barWeight}kg Bar
                </span>
              </div>

              {/* Right Bar Sleeve with Plates */}
              <div className="flex items-center justify-start flex-1">
                {/* Right Collar */}
                <div className="w-3 h-8 bg-neutral-500 border border-neutral-400 rounded-sm mr-1" />

                {/* Right side plates */}
                <div className="flex items-center gap-1">
                  {plateDistribution.platesPerSide.map((plate, idx) => (
                    <div
                      key={`right_${idx}`}
                      className={`rounded-sm flex items-center justify-center border font-mono-nums font-bold text-[9px] shadow-sm select-none ${plate.colorClass}`}
                      title={`${plate.weight}kg plate`}
                    >
                      <span className="rotate-90">{plate.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-neutral-400 font-mono-nums">
              Total Weight: <strong className="text-white text-sm">{plateDistribution.actualTotalWeight} kg</strong>
              {plateDistribution.platesPerSide.length > 0 && (
                <span className="ml-3 text-amber-400">
                  ({plateDistribution.weightPerSide} kg on each side)
                </span>
              )}
            </div>
          </div>

          {/* Controls: Target Weight & Bar Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Target Weight (kg)
              </label>
              <input
                type="number"
                min={20}
                max={500}
                step={2.5}
                value={plateTargetWeight}
                onChange={(e) => setPlateTargetWeight(parseFloat(e.target.value) || 20)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono-nums focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Barbell Type
              </label>
              <select
                value={barWeight}
                onChange={(e) => setBarWeight(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value={20}>Standard Olympic Bar (20 kg / 45 lb)</option>
                <option value={15}>Women's Olympic Bar (15 kg / 35 lb)</option>
                <option value={10}>Technique / Junior Bar (10 kg)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlateTargetWeight((w) => w + 5)}
                className="flex-1 py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs text-white font-mono-nums transition-colors"
              >
                +5 kg
              </button>
              <button
                onClick={() => setPlateTargetWeight((w) => w + 10)}
                className="flex-1 py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs text-white font-mono-nums transition-colors"
              >
                +10 kg
              </button>
              <button
                onClick={() => setPlateTargetWeight(20)}
                className="px-3 py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs text-neutral-400 hover:text-white transition-colors"
                title="Reset to empty bar"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Plates per side list breakdown */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850">
            <div className="text-xs font-semibold text-neutral-300 mb-2">
              Plate Checklist Per Side:
            </div>
            {plateDistribution.platesPerSide.length === 0 ? (
              <div className="text-xs text-neutral-500">
                Empty bar only. Increase target weight to see plates to load.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {plateDistribution.platesPerSide.map((p, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-white font-mono-nums flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{p.weight} kg plate</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TOOL 5: REST INTERVAL STOPWATCH */}
      {activeSubTool === 'timer' && (
        <div className="max-w-xl mx-auto p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-center space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Rest Physiology Timer
            </span>
            <button
              onClick={() => setTimerSound(!timerSound)}
              className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              title={timerSound ? 'Mute tone' : 'Enable tone'}
            >
              {timerSound ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Big Digital Countdown */}
          <div className="py-6 font-mono-nums">
            <div className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight">
              {formatTimerDisplay(timerSecondsLeft)}
            </div>
            <div className="text-xs text-neutral-400 mt-2 font-sans">
              {isTimerRunning ? 'Rest interval active · ATP resynthesis in progress' : 'Timer paused'}
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[30, 60, 90, 120, 180].map((dur) => (
              <button
                key={dur}
                onClick={() => {
                  setTimerDuration(dur);
                  setTimerSecondsLeft(dur);
                  setIsTimerRunning(false);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono-nums transition-colors ${
                  timerDuration === dur
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-colors flex items-center gap-2"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
            </button>

            <button
              onClick={() => {
                setTimerSecondsLeft(timerDuration);
                setIsTimerRunning(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white text-sm transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
