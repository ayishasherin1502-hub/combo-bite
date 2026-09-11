import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  Flame,
  Send,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Skull,
  Trash2,
  Pencil
} from 'lucide-react';

export default function ComboDetailModal() {
  const {
    selectedCombo,
    setSelectedComboId,
    currentUser,
    userRatings,
    submitRating,
    toggleFavorite,
    deleteCombination,
    openEditModal,
    comments,
    addComment,
    likeComment,
    addToast
  } = useApp();

  const [hoverStar, setHoverStar] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState('amazing');
  const [commentText, setCommentText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!selectedCombo) return null;

  const isFavorite = currentUser.favorites?.includes(selectedCombo.id);
  const comboComments = comments[selectedCombo.id] || [];
  const existingRating = userRatings[currentUser.id]?.[selectedCombo.id];

  const reactionsList = [
    { key: 'amazing', label: 'Would eat again', emoji: '🤌', desc: 'Amazing' },
    { key: 'good', label: 'Pretty good', emoji: '👍', desc: 'Good' },
    { key: 'okay', label: "It's okay", emoji: '😐', desc: 'Average' },
    { key: 'weird', label: 'Weird', emoji: '🤨', desc: 'Sus' },
    { key: 'cursed', label: 'Never again', emoji: '💀', desc: 'Cursed' }
  ];

  const handleRatingSubmit = (starsToSubmit) => {
    const finalStars = starsToSubmit || selectedStars || 5;
    submitRating(selectedCombo.id, finalStars, selectedReaction);
  };

  const handleAddCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedCombo.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    const text = `Check out "${selectedCombo.title}" on ComboBite! Rated ${selectedCombo.ratingAvg}★ with ${selectedCombo.ratingCount} reviews. Normal or Cursed?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      addToast('Link Copied! 📋', 'Share with your food group chats!', 'info', '📋');
    }
  };

  // Reactions breakdown total
  const totalReactions = Object.values(selectedCombo.reactions || {}).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        {/* Close Button */}
        <button
          onClick={() => setSelectedComboId(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-800">
          {/* Top Banner Image with Overlay */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-950 overflow-hidden">
            <img
              src={selectedCombo.imageUrl}
              alt={selectedCombo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-500 text-slate-950">
                    {selectedCombo.category}
                  </span>
                  {selectedCombo.isKeralaSpecial && (
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                      🌴 Kerala Soul Food
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md">
                    By {selectedCombo.createdBy}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                  {selectedCombo.title}
                </h1>
              </div>

              {/* Action buttons on banner */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(selectedCombo.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs backdrop-blur-md transition-all ${
                    isFavorite
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-black/60 hover:bg-black/80 text-white border border-white/20'
                  }`}
                >
                  <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                  <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 font-bold text-xs backdrop-blur-md transition-all"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => openEditModal(selectedCombo.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white hover:text-amber-400 border border-white/20 font-bold text-xs backdrop-blur-md transition-all"
                  title="Edit combo details"
                >
                  <Pencil size={15} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (confirmDelete) {
                      deleteCombination(selectedCombo.id);
                    } else {
                      setConfirmDelete(true);
                      setTimeout(() => setConfirmDelete(false), 3500);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-xs backdrop-blur-md transition-all ${
                    confirmDelete
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40'
                      : 'bg-black/60 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-white/20'
                  }`}
                  title={confirmDelete ? 'Click again to confirm delete' : 'Delete combo'}
                >
                  <Trash2 size={15} />
                  <span>{confirmDelete ? 'Confirm Delete?' : 'Delete'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Info Section */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Story & Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">
                    The Culinary Story
                  </h3>
                  <p className="text-base text-slate-200 leading-relaxed">
                    {selectedCombo.description}
                  </p>
                </div>

                {selectedCombo.whyLike && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm italic">
                    <span className="font-bold not-italic block text-xs text-amber-400 uppercase tracking-wide mb-1">
                      Why people swear by it:
                    </span>
                    "{selectedCombo.whyLike}"
                  </div>
                )}

                {/* Pairing breakdown chips */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="text-xs text-slate-400">Base Food:</span>
                    <span className="text-xs font-bold text-amber-300">{selectedCombo.mainFoodName}</span>
                  </div>
                  <span className="text-slate-500 font-black">+</span>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="text-xs text-slate-400">Combo:</span>
                    <span className="text-xs font-bold text-orange-300">{selectedCombo.comboFoodName}</span>
                  </div>
                </div>
              </div>

              {/* Rating Big Box */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center space-y-3">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Community Score
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-amber-400">
                    {selectedCombo.ratingAvg}
                  </span>
                  <div className="text-left">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= Math.round(selectedCombo.ratingAvg) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {selectedCombo.ratingCount} foodies rated
                    </div>
                  </div>
                </div>

                {/* Weirdness pill */}
                <div className="pt-2 border-t border-slate-700">
                  <div className="text-[11px] text-slate-400 mb-1">Cursed Scale</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                    selectedCombo.weirdnessScore >= 4
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : selectedCombo.weirdnessScore === 3
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {selectedCombo.weirdnessScore === 1 ? '🤌 Normal (Soul Food)' :
                     selectedCombo.weirdnessScore === 2 ? '👍 Intriguing' :
                     selectedCombo.weirdnessScore === 3 ? '🤨 Weird / Acquired' :
                     selectedCombo.weirdnessScore === 4 ? '💀 Highly Cursed' : '🚨 Culinary Crime'}
                  </span>
                </div>
              </div>
            </div>

            {/* Reaction Breakdown Bar */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Reaction Breakdown:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {reactionsList.map((r) => {
                  const count = selectedCombo.reactions?.[r.key] || 0;
                  const pct = Math.round((count / totalReactions) * 100);
                  return (
                    <div
                      key={r.key}
                      className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center text-center"
                    >
                      <span className="text-2xl mb-1">{r.emoji}</span>
                      <span className="text-xs font-bold text-slate-200">{r.desc}</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">{count} ({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Rating Section */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-800/50 border-2 border-orange-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-white text-base flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-400" />
                    <span>Rate This Combination</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    {existingRating
                      ? `You previously rated this ${existingRating.stars}★ with ${existingRating.reaction}. Click to change your verdict!`
                      : 'What does your palate say? Be brutally honest.'}
                  </p>
                </div>
                {existingRating && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    ✓ Rated by you
                  </span>
                )}
              </div>

              {/* Star Rating Interactive Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">Taste Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverStar || selectedStars || existingRating?.stars || 0) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverStar(star)}
                        onMouseLeave={() => setHoverStar(0)}
                        onClick={() => {
                          setSelectedStars(star);
                          handleRatingSubmit(star);
                        }}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform"
                      >
                        <Star size={24} fill={isFilled ? 'currentColor' : 'none'} />
                      </button>
                    );
                  })}
                </div>
                <span className="text-sm font-bold text-amber-400">
                  {(hoverStar || selectedStars || existingRating?.stars) ? `${hoverStar || selectedStars || existingRating?.stars}/5` : 'Click to rate'}
                </span>
              </div>

              {/* Reaction Pill Selector */}
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Your Emotional Verdict:</span>
                <div className="flex flex-wrap gap-2">
                  {reactionsList.map((r) => {
                    const isSelected = (selectedReaction === r.key) || (existingRating?.reaction === r.key);
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => {
                          setSelectedReaction(r.key);
                          if (selectedStars || existingRating?.stars) {
                            submitRating(selectedCombo.id, selectedStars || existingRating?.stars || 5, r.key);
                          }
                        }}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 ring-2 ring-orange-400'
                            : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        <span className="text-base">{r.emoji}</span>
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Community Comments & Debates */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-white text-lg flex items-center gap-2">
                  <MessageCircle size={20} className="text-amber-400" />
                  <span>What People Are Saying ({comboComments.length})</span>
                </h4>
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddCommentSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={`Drop your hot take on ${selectedCombo.title}...`}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center gap-1.5 transition-colors"
                >
                  <span>Post</span>
                  <Send size={15} />
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {comboComments.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    No comments yet. Be the first to share your verdict!
                  </div>
                ) : (
                  comboComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-amber-400 shrink-0">
                          {comment.userAvatar || '👤'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-200">
                              {comment.userName}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => likeComment(selectedCombo.id, comment.id)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-orange-400 p-1 rounded transition-colors shrink-0"
                      >
                        <ThumbsUp size={13} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
