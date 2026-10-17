import React, { useState } from 'react';
import { Flame, Play, ChevronDown, ChevronUp, BookOpen, Clock, Target, Dumbbell, ShieldCheck, Info } from 'lucide-react';
import { WORKOUT_PROGRAMS, HOW_TO_WORKOUT_GUIDE } from '../data/workouts';
import { WorkoutProgram, WorkoutDay, Exercise } from '../types';
import { EXERCISES } from '../data/exercises';

interface WorkoutPlansProps {
  onStartSession: (program: WorkoutProgram, day: WorkoutDay) => void;
  onViewExerciseDetail?: (exercise: Exercise) => void;
}

export const WorkoutPlans: React.FC<WorkoutPlansProps> = ({
  onStartSession,
  onViewExerciseDetail
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('push-pull-legs');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [showEducationalGuide, setShowEducationalGuide] = useState<boolean>(true);
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(0);

  const currentProgram = WORKOUT_PROGRAMS.find((p) => p.id === selectedProgramId) || WORKOUT_PROGRAMS[0];
  const currentDay = currentProgram.days[activeDayIndex] || currentProgram.days[0];

  return (
    <div className="space-y-10">
      {/* Educational Primer Header */}
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              How to Workout · Fundamental Principles
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {HOW_TO_WORKOUT_GUIDE.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              {HOW_TO_WORKOUT_GUIDE.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowEducationalGuide(!showEducationalGuide)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors shrink-0"
          >
            <span>{showEducationalGuide ? 'Collapse Guide' : 'Expand Guide'}</span>
            {showEducationalGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showEducationalGuide && (
          <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3">
            {HOW_TO_WORKOUT_GUIDE.content.map((principle, index) => {
              const isExpanded = expandedPrinciple === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-neutral-950/60 border border-neutral-800/80 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedPrinciple(isExpanded ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-850 transition-colors"
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-mono">
                        0{index + 1}
                      </span>
                      {principle.heading}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-neutral-300 space-y-2 border-t border-neutral-900/50">
                      <p className="leading-relaxed text-neutral-300">
                        {principle.description}
                      </p>
                      <div className="pt-1 space-y-1 text-neutral-400">
                        {principle.takeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Program Selector Tabs */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
          Periodized Training Systems
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Select Your Workout Program
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Choose a split matching your schedule, training age, and recovery capacity.
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORKOUT_PROGRAMS.map((prog) => {
            const isSelected = selectedProgramId === prog.id;
            return (
              <div
                key={prog.id}
                onClick={() => {
                  setSelectedProgramId(prog.id);
                  setActiveDayIndex(0);
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-500 shadow-md shadow-amber-500/5'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                    <span className="font-semibold text-amber-400">{prog.daysPerWeek} Days / Week</span>
                    <span aria-hidden="true">·</span>
                    <span>{prog.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>{prog.durationWeeks} Weeks</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-amber-400/90 font-medium mt-1">
                    {prog.tagline}
                  </p>

                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Goal:</span>
                  <span className="text-white font-medium">{prog.goal}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Program Routine Schedule & Active Day */}
      <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <span>{currentProgram.title}</span>
              <span>·</span>
              <span className="text-amber-400">{currentProgram.days.length} Workout Days</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {currentDay.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Focus: <span className="text-neutral-200 font-medium">{currentDay.focus}</span>
            </p>
          </div>

          {/* Launch Workout Session Button */}
          <button
            onClick={() => onStartSession(currentProgram, currentDay)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-md active:scale-[0.99] shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch This Workout Session</span>
          </button>
        </div>

        {/* Days of week selector tabs (functional buttons) */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {currentProgram.days.map((day, idx) => {
            const isActive = activeDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <span>Day 0{day.dayNumber}</span>
                <span className="opacity-75 font-normal">({day.dayName})</span>
              </button>
            );
          })}
        </div>

        {/* Exercises Table for the selected Day */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Exercise</th>
                <th className="py-3 px-3">Target Muscle</th>
                <th className="py-3 px-3 text-center">Sets</th>
                <th className="py-3 px-3 text-center">Rep Target</th>
                <th className="py-3 px-3 text-center">Target RPE</th>
                <th className="py-3 px-3 text-center">Rest</th>
                <th className="py-3 px-3">Execution Cue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono-nums">
              {currentDay.exercises.map((item, idx) => {
                const fullExercise = EXERCISES.find((e) => e.id === item.exerciseId);
                return (
                  <tr
                    key={item.exerciseId}
                    className="hover:bg-neutral-850/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-neutral-500">{idx + 1}</td>
                    <td className="py-3 px-3 font-medium text-white font-sans">
                      <button
                        onClick={() => fullExercise && onViewExerciseDetail && onViewExerciseDetail(fullExercise)}
                        className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                      >
                        <span>{item.exerciseName}</span>
                        {fullExercise && <Info className="w-3.5 h-3.5 text-neutral-500" />}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-neutral-300 font-sans">{item.targetMuscle}</td>
                    <td className="py-3 px-3 text-center font-bold text-white">{item.sets}</td>
                    <td className="py-3 px-3 text-center text-amber-400 font-semibold">{item.reps}</td>
                    <td className="py-3 px-3 text-center text-neutral-300">{item.rpe}</td>
                    <td className="py-3 px-3 text-center text-neutral-400">{item.restSec}s</td>
                    <td className="py-3 px-3 text-neutral-400 font-sans italic text-[11px]">
                      {item.notes || 'Strict tempo and full range of motion.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick Launch Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Est. Session Time: ~55–65 mins
            </span>
            <span>·</span>
            <span>Total Sets: {currentDay.exercises.reduce((acc, curr) => acc + curr.sets, 0)} sets</span>
          </div>

          <button
            onClick={() => onStartSession(currentProgram, currentDay)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>Open Active Workout Player</span>
          </button>
        </div>
      </div>
    </div>
  );
};
