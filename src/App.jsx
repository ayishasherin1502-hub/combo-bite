import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import ExploreView from './components/ExploreView';
import SearchDiscoverView from './components/SearchDiscoverView';
import NormalOrCursedDuel from './components/NormalOrCursedDuel';
import CommunityFeedView from './components/CommunityFeedView';
import AuthView from './components/AuthView';
import OnboardingView from './components/OnboardingView';
import ComboDetailModal from './components/ComboDetailModal';
import AddComboModal from './components/AddComboModal';
import ProfileModal from './components/ProfileModal';
import ToastContainer from './components/ToastContainer';
import { Heart, Sparkles, Skull, RotateCcw } from 'lucide-react';

export default function App() {
  const {
    currentTab,
    setCurrentTab,
    authMode,
    selectedComboId,
    isAddModalOpen,
    isProfileModalOpen,
    resetToDefaults
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentTab === 'explore' && <ExploreView />}
        {currentTab === 'search' && <SearchDiscoverView />}
        {currentTab === 'duel' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="text-center mb-6 space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                The Rapid Duel Arena ⚔️
              </h1>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                One food combination at a time. Cast your vote: Soul food 🤌 or absolute jail 💀?
              </p>
            </div>
            <NormalOrCursedDuel isStandalone={true} />
          </div>
        )}
        {currentTab === 'feed' && <CommunityFeedView />}
        {currentTab === 'auth' && <AuthView initialMode={authMode} />}
        {currentTab === 'onboarding' && <OnboardingView />}
      </main>

      {/* Global Modals */}
      {selectedComboId && <ComboDetailModal />}
      {isAddModalOpen && <AddComboModal />}
      {isProfileModalOpen && <ProfileModal />}
      <ToastContainer />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-10 text-center text-xs text-slate-500 mt-16">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-black text-white">
            <span className="text-lg">🍌</span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              ComboBite
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-medium">Normal or Cursed?</span>
          </div>

          <p className="max-w-md mx-auto text-slate-400 leading-relaxed">
            A community-driven food discovery platform celebrating comfort pairings, regional Kerala staples, and wild late-night gastronomic crimes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 font-medium text-slate-400">
            <button onClick={() => setCurrentTab('explore')} className="hover:text-amber-400 transition-colors">
              Explore Combos
            </button>
            <button onClick={() => setCurrentTab('search')} className="hover:text-amber-400 transition-colors">
              Search Food Database
            </button>
            <button onClick={() => setCurrentTab('duel')} className="hover:text-rose-400 transition-colors">
              Normal vs Cursed Arena ⚔️
            </button>
            <button onClick={() => setCurrentTab('feed')} className="hover:text-amber-400 transition-colors">
              Community Feed
            </button>
            <button onClick={() => setCurrentTab('auth')} className="hover:text-amber-400 transition-colors">
              Food Explorer Sign In
            </button>
            <button onClick={resetToDefaults} className="hover:text-orange-400 transition-colors flex items-center gap-1">
              <RotateCcw size={12} />
              <span>Reset Database</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-600 pt-4 border-t border-slate-800/60">
            Crafted with ❤️ for foodies, chai lovers, and culinary rebels everywhere. Powered by Supabase.
          </div>
        </div>
      </footer>
    </div>
  );
}
