import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Swords,
  Skull,
  CheckCircle2,
  RefreshCw,
  Share2,
  ThumbsUp,
  Sparkles,
  Award
} from 'lucide-react';

export default function NormalOrCursedDuel({ isStandalone = false }) {
  const {
    combinations,
    currentUser,
    duelVotes,
    voteDuel,
    setSelectedComboId,
    addToast
  } = useApp();

  // Curated list of high-contrast duel candidates
  const candidateIds = [
    'puttu-ice-cream',
    'pazham-pori-beef',
    'biriyani-ketchup',
    'puttu-banana',
    'porotta-nutella',
    'pizza-gulab-jamun',
    'porotta-chai',
    'maggi-curd',
    'kappa-meen-curry',
    'puttu-beef'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);

  // Filter existing combos matching candidates
  const duelList = candidateIds
    .map(id => combinations.find(c => c.id === id))
    .filter(Boolean);

  const combo = duelList[currentIndex % duelList.length] || combinations[0];
  if (!combo) return null;

  const currentVote = duelVotes[currentUser.id]?.[combo.id];
  const hasVoted = Boolean(currentVote);

  const totalDuelVotes = (combo.votesNormal || 0) + (combo.votesCursed || 0);
  const normalPercent = totalDuelVotes > 0
    ? Math.round(((combo.votesNormal || 0) / totalDuelVotes) * 100)
    : 50;
  const cursedPercent = 100 - normalPercent;

  const handleVote = (choice) => {
    voteDuel(combo.id, choice);
    setStreak(prev => prev + 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleShare = () => {
    const verdict = currentVote ? `I voted ${currentVote.toUpperCase()}` : 'Vote now';
    const text = `Normal or Cursed? 💀 "${combo.title}" — ${verdict} on ComboBite! What do you think?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      addToast('Copied to Clipboard!', 'Share this food debate with your friends 🍿', 'info', '📋');
    }
  };

  let consensusText = 'Split decision! The community is divided.';
  let consensusColor = 'text-amber-400';
  if (normalPercent >= 70) {
    consensusText = 'Consensus: Certified Comfort Classic! 🤌';
    consensusColor = 'text-emerald-400';
  } else if (cursedPercent >= 70) {
    consensusText = 'Consensus: Absolutely Cursed. Call the police 💀';
    consensusColor = 'text-rose-400';
  } else if (cursedPercent >= 50) {
    consensusText = 'Consensus: Polarizing & Sus 👀';
    consensusColor = 'text-orange-400';
  }

  return (
    <div className={`relative w-full ${isStandalone ? 'max-w-3xl mx-auto my-8' : 'my-8'}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-2 border-slate-700/80 shadow-2xl shadow-black/60 p-6 sm:p-8">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Duel Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md">
              <Swords size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl text-white tracking-tight">
                  Normal or Cursed? ⚔️
                </h3>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Daily Food Arena
                </span>
              </div>
              <p className="text-xs text-slate-400">
                You decide: Is this soul food or a culinary offense?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Sparkles size={13} />
                <span>Streak: {streak}</span>
              </div>
            )}
            <button
              onClick={handleNext}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Next matchup"
            >
              <RefreshCw size={14} />
              <span className="hidden sm:inline">Next</span>
            </button>
          </div>
        </div>

        {/* Combo Spotlight Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Image */}
          <div className="md:col-span-5 relative group overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-square bg-slate-800 shadow-lg border border-slate-700/60">
            <img
              src={combo.imageUrl}
              alt={combo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                {combo.category}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
              <span className="font-semibold">{combo.ratingAvg} ★ ({combo.ratingCount} reviews)</span>
              <button
                onClick={() => setSelectedComboId(combo.id)}
                className="underline text-amber-400 hover:text-amber-300 font-bold"
              >
                View Recipe & Comments →
              </button>
            </div>
          </div>

          {/* Details & Voting action */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                The Pairing in Question:
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {combo.title}
              </h2>
              <p className="mt-2 text-sm text-slate-300 italic bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                "{combo.description}"
              </p>
            </div>

            {/* Voting Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* NORMAL VOTE */}
              <button
                onClick={() => handleVote('normal')}
                className={`relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all transform active:scale-95 ${
                  currentVote === 'normal'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-500/50'
                    : 'bg-slate-800/80 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/60 text-slate-200 hover:text-emerald-300'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
                  🤌
                </div>
                <div className="font-black text-sm sm:text-base tracking-wide uppercase">
                  Normal
                </div>
                <div className="text-[11px] opacity-75 font-medium">
                  Soul Food / Valid
                </div>
                {currentVote === 'normal' && (
                  <div className="absolute top-2 right-2 text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                )}
              </button>

              {/* CURSED VOTE */}
              <button
                onClick={() => handleVote('cursed')}
                className={`relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all transform active:scale-95 ${
                  currentVote === 'cursed'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-900/40 ring-2 ring-rose-500/50'
                    : 'bg-slate-800/80 hover:bg-rose-950/40 border-slate-700 hover:border-rose-500/60 text-slate-200 hover:text-rose-300'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
                  💀
                </div>
                <div className="font-black text-sm sm:text-base tracking-wide uppercase">
                  Cursed
                </div>
                <div className="text-[11px] opacity-75 font-medium">
                  Abomination / Jail
                </div>
                {currentVote === 'cursed' && (
                  <div className="absolute top-2 right-2 text-rose-400">
                    <CheckCircle2 size={16} />
                  </div>
                )}
              </button>
            </div>

            {/* Results Percentage Bar (Always visible or revealed on vote) */}
            <div className="pt-3 space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-400 flex items-center gap-1">
                  🤌 {normalPercent}% Normal
                </span>
                <span className={`text-[11px] ${consensusColor} font-black uppercase text-center truncate max-w-[180px]`}>
                  {consensusText}
                </span>
                <span className="text-rose-400 flex items-center gap-1">
                  {cursedPercent}% Cursed 💀
                </span>
              </div>

              {/* Two-tone split bar */}
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/60">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-l-full transition-all duration-700"
                  style={{ width: `${normalPercent}%` }}
                />
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-r-full transition-all duration-700"
                  style={{ width: `${cursedPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{totalDuelVotes.toLocaleString()} community votes</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="hover:text-amber-400 flex items-center gap-1 font-semibold transition-colors"
                  >
                    <Share2 size={12} />
                    <span>Share Debate</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="hover:text-white text-orange-400 font-bold flex items-center gap-1"
                  >
                    <span>Next Pairing</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
