import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Heart,
  MessageCircle,
  Sparkles,
  Flame,
  Skull,
  TrendingUp,
  Share2
} from 'lucide-react';

export default function ComboCard({ combo }) {
  const {
    currentUser,
    toggleFavorite,
    setSelectedComboId,
    comments
  } = useApp();

  const isFavorite = currentUser.favorites?.includes(combo.id);
  const comboComments = comments[combo.id] || [];
  const isCursed = combo.weirdnessScore >= 4;
  const isWeird = combo.weirdnessScore === 3;

  // Reaction pill text based on ratings and weirdness
  let reactionLabel = '🤌 Classic Soul Food';
  let reactionBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

  if (combo.weirdnessScore === 5) {
    reactionLabel = '💀 Absolutely Cursed';
    reactionBadgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse-subtle';
  } else if (combo.weirdnessScore === 4) {
    reactionLabel = '🤨 Highly Sus & Weird';
    reactionBadgeClass = 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
  } else if (combo.weirdnessScore === 3) {
    reactionLabel = '🤔 Bold / Acquired Taste';
    reactionBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  } else if (combo.ratingAvg >= 4.8) {
    reactionLabel = '👑 Hall of Fame (GOAT)';
    reactionBadgeClass = 'bg-amber-400/20 text-amber-300 border-amber-400/40';
  }

  return (
    <div
      onClick={() => setSelectedComboId(combo.id)}
      className="group relative flex flex-col rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 cursor-pointer overflow-hidden text-left"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
        <img
          src={combo.imageUrl}
          alt={combo.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(combo.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
              : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
          }`}
          aria-label="Save to favorites"
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {combo.isKeralaSpecial && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1">
              <span>🌴</span>
              <span>Kerala</span>
            </span>
          )}
          {combo.trending && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-orange-950/90 text-orange-300 border border-orange-500/40 backdrop-blur-md flex items-center gap-1">
              <Flame size={12} className="text-orange-400" />
              <span>Trending</span>
            </span>
          )}
        </div>

        {/* Ingredients Pills at Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-xs font-bold text-amber-300 border border-amber-500/30">
            {combo.mainFoodName}
          </span>
          <span className="text-xs font-black text-slate-300">+</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            {combo.comboFoodName}
          </span>
        </div>
      </div>

      {/* Body Information */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {combo.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            "{combo.description}"
          </p>
        </div>

        {/* Reaction badge */}
        <div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${reactionBadgeClass}`}>
            {reactionLabel}
          </span>
        </div>

        {/* Weirdness Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-400 uppercase tracking-wider">Cursed Scale</span>
            <span className={isCursed ? 'text-rose-400' : isWeird ? 'text-amber-400' : 'text-emerald-400'}>
              {combo.weirdnessScore === 1 ? '1/5 Normal 🤌' :
               combo.weirdnessScore === 2 ? '2/5 Intriguing 👍' :
               combo.weirdnessScore === 3 ? '3/5 Weird 🤨' :
               combo.weirdnessScore === 4 ? '4/5 Cursed 💀' : '5/5 Pure Chaos 🚨'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`h-full flex-1 rounded-sm ${
                  lvl <= combo.weirdnessScore
                    ? combo.weirdnessScore >= 4
                      ? 'bg-rose-500'
                      : combo.weirdnessScore === 3
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer: Rating & Comments count */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              <Star size={15} fill="currentColor" />
            </div>
            <span className="font-extrabold text-sm text-white">{combo.ratingAvg}</span>
            <span className="text-xs text-slate-500">({combo.ratingCount})</span>
          </div>

          {/* Discussion & Creator */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{comboComments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
