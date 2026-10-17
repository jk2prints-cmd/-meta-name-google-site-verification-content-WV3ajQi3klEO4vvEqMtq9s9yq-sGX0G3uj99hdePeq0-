import React from 'react';
import { BookOpen, Flame, Calculator, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import heroImage from '../assets/images/gym_hero_athletes_1792239631790.jpg';

interface HeroBannerProps {
  onSelectTab: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Value Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>Scientific Strength & Hypertrophy Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Everything for the Gym. <br />
              <span className="text-amber-500">Every Exercise, Program & Fuel.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Master exact biomechanical form on compound and isolation lifts, follow proven progressive overload splits, calculate tailored macronutrient diets, and track your PRs with zero friction.
            </p>

            {/* Quick Feature Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('exercises')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-semibold text-sm hover:bg-amber-400 transition-colors shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Exercise Guide</span>
              </button>

              <button
                onClick={() => onSelectTab('workouts')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium text-sm hover:bg-neutral-800 transition-colors"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>How to Workout</span>
              </button>

              <button
                onClick={() => onSelectTab('nutrition')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium text-sm hover:bg-neutral-800 transition-colors"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Meal & Macro Plans</span>
              </button>

              <button
                onClick={() => onSelectTab('tools')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium text-sm hover:bg-neutral-800 transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Progress Trackers</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src={heroImage}
                alt="Athletes lifting heavy barbells in a modern training facility"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex flex-col justify-end p-6">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Uncompromising Standards
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  Compound Lifts & Biomechanical Precision
                </div>
                <div className="text-xs text-neutral-300 mt-1 flex items-center gap-1.5">
                  <span>Tested setup cues</span>
                  <span>·</span>
                  <span>Scapular stabilization</span>
                  <span>·</span>
                  <span>No ego lifting</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Metric Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-neutral-850 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="text-3xl font-extrabold text-white font-mono-nums tracking-tight">28+</div>
            <div className="text-xs font-medium text-neutral-400 mt-1">Guided Exercises</div>
            <div className="text-xs text-neutral-500 mt-0.5">Setup, cues & mistakes</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="text-3xl font-extrabold text-white font-mono-nums tracking-tight">5</div>
            <div className="text-xs font-medium text-neutral-400 mt-1">Periodized Splits</div>
            <div className="text-xs text-neutral-500 mt-0.5">PPL, Upper/Lower & Full Body</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="text-3xl font-extrabold text-white font-mono-nums tracking-tight">4</div>
            <div className="text-xs font-medium text-neutral-400 mt-1">Nutrition Blueprints</div>
            <div className="text-xs text-neutral-500 mt-0.5">Bulking, cutting & recomp</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="text-3xl font-extrabold text-white font-mono-nums tracking-tight">5</div>
            <div className="text-xs font-medium text-neutral-400 mt-1">Interactive Trackers</div>
            <div className="text-xs text-neutral-500 mt-0.5">1RM, Plates, Rest & Logs</div>
          </div>
        </div>
      </div>
    </section>
  );
};
