import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Award,
  Star,
  PlusCircle,
  Heart,
  CheckCircle2,
  Users,
  RotateCcw,
  Sparkles,
  Lock,
  LogOut,
  LogIn
} from 'lucide-react';

export default function ProfileModal() {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    currentUser,
    users,
    setCurrentUserId,
    combinations,
    setSelectedComboId,
    BADGE_DEFINITIONS,
    resetToDefaults,
    isLoggedIn,
    logout,
    openAuth
  } = useApp();

  if (!isProfileModalOpen) return null;

  // Find user's favorite combos
  const favoriteCombos = combinations.filter(c => currentUser.favorites?.includes(c.id));

  // Find user's created combos
  const userCombos = combinations.filter(c => c.createdBy?.toLowerCase() === currentUser.name?.toLowerCase());

  const userBadges = currentUser.badges || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Award className="text-amber-400" />
            <h2 className="text-xl font-black text-white">User Profile & Badges</h2>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  logout();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition-colors"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 space-y-6 flex-1 divide-y divide-slate-800">
          {/* User Profile Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6">
            {currentUser.avatar && currentUser.avatar.length <= 2 ? (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-800 border-2 border-orange-500/50 shadow-xl flex items-center justify-center text-4xl select-none">
                {currentUser.avatar}
              </div>
            ) : (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-orange-500/50 shadow-xl"
              />
            )}

            <div className="text-center sm:text-left space-y-1 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-black text-white">
                  {currentUser.name}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentUser.email || currentUser.handle}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <div className="text-lg font-black text-amber-400">{currentUser.combosAdded || 0}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Combos Added</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <div className="text-lg font-black text-orange-400">{currentUser.combosRated || 0}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Combos Rated</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <div className="text-lg font-black text-rose-400">{favoriteCombos.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Favorites ❤️</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gamification Achievements & Badges */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                <span>Unlocked Achievements & Badges</span>
              </h4>
              <span className="text-xs text-amber-400 font-bold">
                {userBadges.length} / {Object.keys(BADGE_DEFINITIONS).length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(BADGE_DEFINITIONS).map((badge) => {
                const isUnlocked = userBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-amber-500/10 border-amber-500/30 text-white'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="text-3xl shrink-0 select-none">
                      {badge.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-200">
                          {badge.name}
                        </span>
                        {isUnlocked ? (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                            Earned ✓
                          </span>
                        ) : (
                          <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Lock size={10} /> Locked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snack">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved Favorites List */}
          <div className="pt-6 space-y-3">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Heart size={16} className="text-rose-500" />
              <span>Saved Favorite Combos ({favoriteCombos.length})</span>
            </h4>

            {favoriteCombos.length === 0 ? (
              <p className="text-xs text-slate-500">No favorite combos saved yet. Click the heart icon on any card!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {favoriteCombos.map((combo) => (
                  <div
                    key={combo.id}
                    onClick={() => {
                      setIsProfileModalOpen(false);
                      setSelectedComboId(combo.id);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <img src={combo.imageUrl} alt={combo.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-white truncate">{combo.title}</div>
                      <div className="text-[10px] text-amber-400 font-semibold">{combo.ratingAvg} ★ ({combo.ratingCount})</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Persona Switcher / Demo */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users size={14} />
                <span>Switch Demo Persona:</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {users.slice(0, 3).map((u) => {
                const isSelected = u.id === currentUser.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => setCurrentUserId(u.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-500 ring-1 ring-orange-400 text-white'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {u.avatar && u.avatar.length <= 2 ? (
                      <span className="text-xl w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800">
                        {u.avatar}
                      </span>
                    ) : (
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">{u.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{u.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset / Clean Data Button */}
          <div className="pt-6 flex justify-between items-center text-xs text-slate-500">
            <span>Want a clean slate?</span>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1 text-slate-400 hover:text-orange-400 transition-colors"
            >
              <RotateCcw size={13} />
              <span>Reset to default seed data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
