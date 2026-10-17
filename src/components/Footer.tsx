import React from 'react';
import { Dumbbell } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              IRONFORGE
            </span>
            <span className="text-neutral-500 text-xs">· Strength & Hypertrophy Platform</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <button onClick={() => onSelectTab('exercises')} className="hover:text-white transition-colors">
              Exercises
            </button>
            <button onClick={() => onSelectTab('workouts')} className="hover:text-white transition-colors">
              Programs
            </button>
            <button onClick={() => onSelectTab('nutrition')} className="hover:text-white transition-colors">
              Nutrition Plans
            </button>
            <button onClick={() => onSelectTab('tools')} className="hover:text-white transition-colors">
              Trackers
            </button>
            <button onClick={() => onSelectTab('coach')} className="hover:text-white transition-colors">
              AI Coach
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>
            Dedicated to progressive overload, proper biomechanics, and evidence-based nutrition.
          </p>
          <p className="font-mono-nums">
            Built with pure precision · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
