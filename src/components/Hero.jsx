import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/seedData';
import { Search, Sparkles, Flame, PlusCircle, ArrowRight, Skull, UserPlus } from 'lucide-react';

export default function Hero() {
  const {
    combinations,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setCurrentTab,
    setIsAddModalOpen,
    isLoggedIn,
    openAuth
  } = useApp();

  const totalCombos = combinations.length;
  const totalVotes = combinations.reduce((acc, c) => acc + (c.ratingCount || 0), 0);
  const cursedCount = combinations.filter(c => c.weirdnessScore >= 4).length;
  const keralaCount = combinations.filter(c => c.isKeralaSpecial).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentTab('search');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-orange-500/10 via-amber-500/10 to-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Playful pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-amber-300 shadow-inner mb-6 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Kerala's Ultimate Food Pairing & Debate Club</span>
          <span className="text-slate-500">|</span>
          <span className="text-rose-400 font-bold">Normal or Cursed? 💀</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          What goes with what?{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent underline decoration-orange-500/30">
            👀
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover food combinations people swore by, fell in love with, or absolutely regret — from nostalgic{' '}
          <span className="text-amber-300 font-semibold">Puttu + Kadala</span> to controversial{' '}
          <span className="text-rose-400 font-semibold">Puttu + Ice Cream</span>.
        </p>

        {/* Search Bar in Hero */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-slate-800/90 border border-slate-700 rounded-2xl sm:rounded-full shadow-2xl shadow-black/50 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 w-full px-3.5 py-1.5">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food e.g. Puttu, Porotta, Beef, Ice Cream..."
              className="w-full bg-transparent text-white text-sm sm:text-base placeholder-slate-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <span>Explore</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCurrentTab('duel')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-sm transition-all shadow-lg shadow-rose-950/30"
          >
            <Skull size={17} className="text-rose-400" />
            <span>Play "Normal or Cursed?" Duel ⚔️</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            <PlusCircle size={17} className="text-amber-400" />
            <span>Submit a Food Combo</span>
          </button>

          {!isLoggedIn && (
            <button
              onClick={() => openAuth('signup')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              <UserPlus size={16} />
              <span>Join the Experiment →</span>
            </button>
          )}
        </div>

        {/* Live Community Counter Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-800/80">
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{totalCombos}+</div>
            <div className="text-xs text-slate-400 mt-0.5">Combos Cataloged</div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-orange-400">{totalVotes.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-0.5">Taste Votes Cast</div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{keralaCount}</div>
            <div className="text-xs text-slate-400 mt-0.5">Kerala Classics 🌴</div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-rose-400">{cursedCount}</div>
            <div className="text-xs text-slate-400 mt-0.5">Cursed Horrors 💀</div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (currentTab !== 'explore') setCurrentTab('explore');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
