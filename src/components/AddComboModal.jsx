import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Upload,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Flame,
  CheckCircle,
  Skull
} from 'lucide-react';

const PRESET_PHOTOS = [
  { label: 'Steamed Puttu / Rice', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80' },
  { label: 'Malabar Porotta', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { label: 'Banana Fritters', url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fiery Beef / Meat', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sweet Banana / Fruit', url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vanilla Ice Cream', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chocolate Spread', url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80' },
  { label: 'Spicy Noodles', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80' }
];

export default function AddComboModal() {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    foods,
    addCombination,
    setCurrentTab,
    setSelectedComboId
  } = useApp();

  const [mainFoodName, setMainFoodName] = useState('');
  const [comboFoodName, setComboFoodName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [whyLike, setWhyLike] = useState('');
  const [weirdnessScore, setWeirdnessScore] = useState(1);
  const [imageUrl, setImageUrl] = useState(PRESET_PHOTOS[0].url);
  const [isKeralaSpecial, setIsKeralaSpecial] = useState(true);
  const [category, setCategory] = useState('Kerala Specials');

  if (!isAddModalOpen) return null;

  // Auto-generate title if empty
  const generatedTitle = title || (mainFoodName && comboFoodName ? `${mainFoodName} + ${comboFoodName}` : 'New Combination');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mainFoodName.trim() || !comboFoodName.trim()) return;

    const newCombo = addCombination({
      mainFoodName: mainFoodName.trim(),
      comboFoodName: comboFoodName.trim(),
      title: generatedTitle,
      description: description.trim() || `An exciting pairing of ${mainFoodName} and ${comboFoodName}.`,
      whyLike: whyLike.trim(),
      weirdnessScore: Number(weirdnessScore),
      imageUrl: imageUrl || PRESET_PHOTOS[0].url,
      isKeralaSpecial,
      category
    });

    setIsAddModalOpen(false);
    setSelectedComboId(newCombo.id);
  };

  const weirdnessLabels = [
    { score: 1, label: 'Normal 🤌', desc: 'Accepted Soul Food' },
    { score: 2, label: 'Interesting 👍', desc: 'Mild Twist' },
    { score: 3, label: 'Weird 🤨', desc: 'Polarizing Taste' },
    { score: 4, label: 'Sus 💀', desc: 'Questionable Life Choice' },
    { score: 5, label: 'Cursed 🚨', desc: 'Culinary Offense / Jail' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>Submit a New Food Combo</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Normal, unconventional, or utterly cursed — let the community judge.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Main Food and Combo Food Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Main Food */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Main Food *
              </label>
              <input
                type="text"
                list="foods-list"
                required
                value={mainFoodName}
                onChange={(e) => setMainFoodName(e.target.value)}
                placeholder="e.g. Puttu, Porotta, Appam, Kanji"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <datalist id="foods-list">
                {foods.map((f) => (
                  <option key={f.id} value={f.name} />
                ))}
              </datalist>
              <span className="text-[10px] text-slate-500">
                Choose existing or type a new base food.
              </span>
            </div>

            {/* Combination Food */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Pair With *
              </label>
              <input
                type="text"
                required
                value={comboFoodName}
                onChange={(e) => setComboFoodName(e.target.value)}
                placeholder="e.g. Kadala, Beef, Nutella, Ice Cream"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <span className="text-[10px] text-slate-500">
                The side dish, topping, or wild experiment.
              </span>
            </div>
          </div>

          {/* Title / Combo Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Combination Name (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={generatedTitle}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Category & Kerala Special Flag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Kerala Specials">🌴 Kerala Specials</option>
                <option value="Breakfast">🥞 Breakfast</option>
                <option value="Meat">🥩 Meat & Poultry</option>
                <option value="Seafood">🐟 Seafood</option>
                <option value="Rice & Grains">🍚 Rice & Grains</option>
                <option value="Snacks">🍟 Snacks & Tea</option>
                <option value="Desserts">🍰 Desserts & Sweet</option>
                <option value="Cursed Combos">💀 Cursed Combos</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="kerala-special"
                checked={isKeralaSpecial}
                onChange={(e) => setIsKeralaSpecial(e.target.checked)}
                className="w-4 h-4 rounded text-orange-500 bg-slate-800 border-slate-700 focus:ring-orange-500"
              />
              <label htmlFor="kerala-special" className="text-xs font-bold text-slate-300 cursor-pointer">
                Authentic Kerala Food Combo 🌴
              </label>
            </div>
          </div>

          {/* Weirdness Slider: Normal to Cursed */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                How Weird Is It? (Cursed Meter)
              </label>
              <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                weirdnessScore >= 4
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : weirdnessScore === 3
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {weirdnessLabels[weirdnessScore - 1].label} — {weirdnessLabels[weirdnessScore - 1].desc}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={weirdnessScore}
              onChange={(e) => setWeirdnessScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />

            <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1">
              <span>1: Normal 🤌</span>
              <span>2: Mild 👍</span>
              <span>3: Weird 🤨</span>
              <span>4: Sus 💀</span>
              <span>5: Pure Chaos 🚨</span>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Short Description / What is it?
            </label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Steamed rice cake crushed with ripe robusta banana and a spoonful of sugar."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Why do you swear by it? (Personal hot take)
            </label>
            <textarea
              rows="2"
              value={whyLike}
              onChange={(e) => setWhyLike(e.target.value)}
              placeholder="e.g. The contrast between sweet and spicy is addictive once you get past the initial shock."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Photo Options: File Upload or Preset Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Combination Photo
            </label>

            {/* Custom image URL or Upload */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shrink-0">
                <Upload size={14} />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preset Photo chips */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                Or pick a curated food preset:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {PRESET_PHOTOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      imageUrl === preset.url
                        ? 'bg-orange-500 text-slate-950 font-bold ring-2 ring-orange-400'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="relative aspect-[16/9] max-h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white backdrop-blur-md">
                  Preview Image
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 rounded-full text-slate-300 hover:text-white font-bold text-xs sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!mainFoodName.trim() || !comboFoodName.trim()}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Publish Combination 🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
