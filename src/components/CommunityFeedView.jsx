import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  PlusCircle,
  Clock,
  Skull,
  UserCheck
} from 'lucide-react';

export default function CommunityFeedView() {
  const {
    combinations,
    currentUser,
    toggleFavorite,
    setSelectedComboId,
    comments,
    setIsAddModalOpen
  } = useApp();

  const [feedFilter, setFeedFilter] = useState('all'); // 'all', 'cursed', 'kerala'

  // Sort by recent submissions
  let feedItems = [...combinations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (feedFilter === 'cursed') {
    feedItems = feedItems.filter(c => c.weirdnessScore >= 4);
  } else if (feedFilter === 'kerala') {
    feedItems = feedItems.filter(c => c.isKeralaSpecial);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-left">
      {/* Feed Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Flame className="text-orange-500" />
            <span>Community Food Feed</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time culinary experiments, nostalgic comfort foods, and chaotic hot takes.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md shadow-orange-500/20"
        >
          <PlusCircle size={15} />
          <span>Post Combo</span>
        </button>
      </div>

      {/* Feed Filter Pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFeedFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            feedFilter === 'all'
              ? 'bg-orange-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setFeedFilter('kerala')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            feedFilter === 'kerala'
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          🌴 Kerala Specials
        </button>
        <button
          onClick={() => setFeedFilter('cursed')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            feedFilter === 'cursed'
              ? 'bg-rose-500 text-white'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          💀 Cursed Experiments
        </button>
      </div>

      {/* Feed Cards Stream */}
      <div className="space-y-6">
        {feedItems.map((combo) => {
          const isFav = currentUser.favorites?.includes(combo.id);
          const comboComments = comments[combo.id] || [];
          const isCursed = combo.weirdnessScore >= 4;

          return (
            <article
              key={combo.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition-all"
            >
              {/* Post Header / Creator info */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-base font-bold text-slate-950">
                    {combo.createdBy ? combo.createdBy.charAt(0) : '👤'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">
                        {combo.createdBy}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        just shared a combo 👀
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{combo.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        <span>Recently</span>
                      </span>
                    </div>
                  </div>
                </div>

                {isCursed && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <Skull size={13} />
                    <span>Cursed</span>
                  </span>
                )}
              </div>

              {/* Main Media Image */}
              <div
                onClick={() => setSelectedComboId(combo.id)}
                className="relative aspect-[16/9] w-full bg-slate-950 cursor-pointer group overflow-hidden"
              >
                <img
                  src={combo.imageUrl}
                  alt={combo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                      {combo.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-1 italic">
                      "{combo.description}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-t border-slate-800">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Like / Favorite */}
                  <button
                    onClick={() => toggleFavorite(combo.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      isFav
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                    <span>{isFav ? 'Liked' : 'Like'}</span>
                  </button>

                  {/* Rate */}
                  <button
                    onClick={() => setSelectedComboId(combo.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  >
                    <Star size={16} className="text-amber-400" />
                    <span>Rate ({combo.ratingAvg}★)</span>
                  </button>

                  {/* Comment */}
                  <button
                    onClick={() => setSelectedComboId(combo.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Comments ({comboComments.length})</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedComboId(combo.id)}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 underline"
                >
                  View Details →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
