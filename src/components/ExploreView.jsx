import React from 'react';
import { useApp } from '../context/AppContext';
import Hero from './Hero';
import NormalOrCursedDuel from './NormalOrCursedDuel';
import ComboCard from './ComboCard';
import {
  Flame,
  Sparkles,
  Skull,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  Heart
} from 'lucide-react';

export default function ExploreView() {
  const {
    combinations,
    selectedCategory,
    setCurrentTab,
    setIsAddModalOpen
  } = useApp();

  // Filter combinations based on selectedCategory if not 'all'
  let displayCombos = [...combinations];
  if (selectedCategory && selectedCategory !== 'all') {
    if (selectedCategory === 'kerala') {
      displayCombos = displayCombos.filter(c => c.isKeralaSpecial);
    } else if (selectedCategory === 'cursed') {
      displayCombos = displayCombos.filter(c => c.weirdnessScore >= 4);
    } else {
      displayCombos = displayCombos.filter(c => c.category?.toLowerCase() === selectedCategory.toLowerCase());
    }
  }

  // Section slices
  const trendingCombos = combinations.filter(c => c.trending).slice(0, 6);
  const keralaClassics = combinations.filter(c => c.isKeralaSpecial && c.weirdnessScore <= 2).slice(0, 6);
  const cursedCombos = combinations.filter(c => c.weirdnessScore >= 4);
  const highestRated = [...combinations].sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 6);
  const recentlyAdded = [...combinations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 text-left">
        {/* If category is specifically selected, show that category results directly */}
        {selectedCategory !== 'all' ? (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white capitalize">
                  Category: {selectedCategory}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Showing {displayCombos.length} food combinations in this category
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCombos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* Interactive Duel Arena Highlight */}
            <section>
              <NormalOrCursedDuel />
            </section>

            {/* 1. Trending Combos */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Trending Right Now 🔥
                    </h2>
                    <p className="text-xs text-slate-400">
                      Combinations with the highest community engagement this week
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('search')}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
                >
                  <span>See all</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingCombos.map((combo) => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            </section>

            {/* 2. Kerala Specials */}
            <section className="space-y-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-900/40">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xl">
                    🌴
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Kerala Comfort Specials
                    </h2>
                    <p className="text-xs text-slate-400">
                      Puttu + Kadala, Porotta + Beef, Kappa + Meen & more
                    </p>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  God's Own Gastronomy
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {keralaClassics.map((combo) => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            </section>

            {/* 3. The Cursed Hall of Infamy 💀 */}
            <section className="space-y-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-2 border-rose-900/50 shadow-2xl shadow-rose-950/20">
              <div className="flex items-center justify-between border-b border-rose-900/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xl">
                    💀
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        The Cursed Hall of Infamy
                      </h2>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300">
                        Warning ⚠️
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Puttu + Ice Cream, Biriyani + Ketchup, Pizza + Gulab Jamun. Don't knock it till you try it.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('duel')}
                  className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <span>Vote in Duel</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cursedCombos.map((combo) => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            </section>

            {/* 4. People's Favorites / Highest Rated */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Award size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      People's Favorites 👑
                    </h2>
                    <p className="text-xs text-slate-400">
                      Unanimous masterpieces rated above 4.8★ by the community
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {highestRated.map((combo) => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            </section>

            {/* 5. Recently Added by Community */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Recently Added 🕒
                    </h2>
                    <p className="text-xs text-slate-400">
                      Fresh submissions from food explorers
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>Submit Yours +</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyAdded.map((combo) => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
