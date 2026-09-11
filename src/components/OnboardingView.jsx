import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Check, Heart, Compass, Flame, Skull, Shield } from 'lucide-react';

const ONBOARDING_FOOD_OPTIONS = [
  { id: 'puttu', name: 'Puttu', emoji: '🥥', category: 'Kerala' },
  { id: 'porotta', name: 'Malabar Porotta', emoji: '🫓', category: 'Kerala' },
  { id: 'beef', name: 'Kerala Beef Roast', emoji: '🥩', category: 'Meat' },
  { id: 'pazham_pori', name: 'Pazham Pori', emoji: '🍌', category: 'Kerala' },
  { id: 'biriyani', name: 'Thalassery Biriyani', emoji: '🍲', category: 'Rice' },
  { id: 'chai', name: 'Meter Chai', emoji: '☕', category: 'Drinks' },
  { id: 'icecream', name: 'Vanilla Ice Cream', emoji: '🍦', category: 'Sweet' },
  { id: 'pizza', name: 'Pepperoni Pizza', emoji: '🍕', category: 'Comfort' },
  { id: 'maggi', name: 'Masala Maggi', emoji: '🍜', category: 'Snacks' },
  { id: 'kappa', name: 'Kappa (Tapioca)', emoji: '🥔', category: 'Kerala' },
  { id: 'dosa', name: 'Ghee Roast Dosa', emoji: '🥞', category: 'Breakfast' },
  { id: 'nutella', name: 'Nutella Spread', emoji: '🍫', category: 'Sweet' }
];

const PERSONALITIES = [
  {
    id: 'purist',
    title: 'Food Purist 🧐',
    tagline: 'Traditional & Refined',
    description: 'Respect heritage and culinary balance. Some combinations belong in culinary jail.'
  },
  {
    id: 'adventurer',
    title: 'Curious Explorer 🤠',
    tagline: 'Open-Minded Foodie',
    description: 'Willing to try anything once. Sweet + savory contrast makes life exciting.'
  },
  {
    id: 'mad_scientist',
    title: 'Cursed Mad Scientist 💀',
    tagline: 'Pure Gastronomic Chaos',
    description: 'Ketchup on Biriyani? Ice cream on Puttu? Rules exist only to be broken.'
  }
];

export default function OnboardingView() {
  const { currentUser, completeOnboarding } = useApp();
  const [selectedFoods, setSelectedFoods] = useState(['porotta', 'beef', 'pazham_pori']);
  const [selectedPersonality, setSelectedPersonality] = useState('adventurer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFood = (id) => {
    if (selectedFoods.includes(id)) {
      setSelectedFoods(selectedFoods.filter((f) => f !== id));
    } else {
      setSelectedFoods([...selectedFoods, id]);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    await completeOnboarding({
      favoriteFoods: selectedFoods,
      personality: selectedPersonality
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-500/10 via-amber-500/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-2xl z-10 text-left">
        {/* Step Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-amber-300 shadow-xl backdrop-blur-md">
            <span>🎉 Account Created!</span>
            <span className="text-slate-500">•</span>
            <span>Welcome, {currentUser?.name || 'Explorer'}!</span>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Calibrate your tastebuds 👅
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Tell us what you love so we can feed you the most delightful (or chaotic) food pairings.
            </p>
          </div>

          {/* Section 1: Favorite Food Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Heart size={16} className="text-rose-400" />
                <span>Select your favorite food staples (Pick at least 2)</span>
              </label>
              <span className="text-xs text-amber-400 font-bold font-mono">
                {selectedFoods.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ONBOARDING_FOOD_OPTIONS.map((item) => {
                const isSelected = selectedFoods.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFood(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-500 ring-1 ring-orange-500/50 text-white'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl select-none">{item.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Explorer Personality */}
          <div className="space-y-3 pt-2">
            <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Compass size={16} className="text-amber-400" />
              <span>What's your culinary philosophy?</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PERSONALITIES.map((p) => {
                const isSelected = selectedPersonality === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPersonality(p.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/40 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white">{p.title}</div>
                      <div className="text-[10px] text-amber-400 font-semibold mt-0.5">{p.tagline}</div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      {isSelected ? '✓ Selected' : 'Choose this'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              You can always adjust your preferences in your profile later.
            </div>

            <button
              type="button"
              onClick={handleFinish}
              disabled={selectedFoods.length < 2 || isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Saving your tastebuds...' : 'Start Exploring ComboBite →'}</span>
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

