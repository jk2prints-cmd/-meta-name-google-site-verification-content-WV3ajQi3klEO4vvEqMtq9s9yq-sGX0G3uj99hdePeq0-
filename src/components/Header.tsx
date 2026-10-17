import React from 'react';
import { Dumbbell, Play, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenQuickSession: () => void;
  hasActiveSession?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickSession,
  hasActiveSession
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'exercises', label: 'Exercise Guide' },
    { id: 'workouts', label: 'Workout Programs' },
    { id: 'nutrition', label: 'Nutrition Plans' },
    { id: 'tools', label: 'Tracking Tools' },
    { id: 'coach', label: 'AI Coach' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark Element */}
          <div 
            onClick={() => onSelectTab('exercises')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
              IRONFORGE
            </span>
          </div>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive 
                      ? 'text-amber-400 font-semibold' 
                      : 'text-neutral-400 hover:text-neutral-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuickSession}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm ${
                hasActiveSession
                  ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 animate-pulse'
                  : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{hasActiveSession ? 'Resume Workout' : 'Start Workout'}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-neutral-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
