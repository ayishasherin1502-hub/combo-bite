import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Save,
  Upload,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Flame,
  CheckCircle,
  Skull,
  RotateCcw
} from 'lucide-react';

const PRESET_PHOTOS = [
  { label: 'Steamed Puttu & Kadala', url: 'https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Puttu_and_Kadala_Curry.jpg&w=1000&q=80' },
  { label: 'Malabar Porotta & Beef', url: 'https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Parotta_Beef-a_local_restaurant-Kerala.jpg&w=1000&q=80' },
  { label: 'Pazham Pori & Beef', url: 'https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Pazham_pori_with_beef_roast.jpg&w=1000&q=80' },
  { label: 'Kappa & Meen Curry', url: 'https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/KAPPA_AND_MEEN_CURRY.jpg&w=1000&q=80' },
  { label: 'Thalassery Biriyani', url: 'https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Kerala_Chicken_biryani.jpg&w=1000&q=80' },
  { label: 'Cheese Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Vanilla Ice Cream', url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Spicy Maggi Noodles', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=1000&q=80' }
];

const CATEGORIES_LIST = [
  'Kerala Specials',
  'Breakfast',
  'Meat & Poultry',
  'Seafood',
  'Rice & Grains',
  'Snacks & Tea',
  'Desserts & Sweet',
  'Cursed Combos'
];

export default function EditComboModal() {
  const {
    isEditModalOpen,
    closeEditModal,
    editingComboId,
    combinations,
    updateCombination
  } = useApp();

  const comboToEdit = combinations.find(c => c.id === editingComboId);

  const [mainFoodName, setMainFoodName] = useState('');
  const [comboFoodName, setComboFoodName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [whyLike, setWhyLike] = useState('');
  const [weirdnessScore, setWeirdnessScore] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [isKeralaSpecial, setIsKeralaSpecial] = useState(false);
  const [category, setCategory] = useState('Kerala Specials');

  useEffect(() => {
    if (comboToEdit) {
      setMainFoodName(comboToEdit.mainFoodName || '');
      setComboFoodName(comboToEdit.comboFoodName || '');
      setTitle(comboToEdit.title || '');
      setDescription(comboToEdit.description || '');
      setWhyLike(comboToEdit.whyLike || '');
      setWeirdnessScore(comboToEdit.weirdnessScore || 1);
      setImageUrl(comboToEdit.imageUrl || '');
      setIsKeralaSpecial(Boolean(comboToEdit.isKeralaSpecial));
      setCategory(comboToEdit.category || 'Kerala Specials');
    }
  }, [comboToEdit]);

  if (!isEditModalOpen || !comboToEdit) return null;

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

  const handleSave = (e) => {
    e.preventDefault();
    if (!mainFoodName.trim() || !comboFoodName.trim()) return;

    const finalTitle = title.trim() || `${mainFoodName.trim()} + ${comboFoodName.trim()}`;

    updateCombination(editingComboId, {
      title: finalTitle,
      mainFoodName: mainFoodName.trim(),
      comboFoodName: comboFoodName.trim(),
      description: description.trim(),
      whyLike: whyLike.trim(),
      weirdnessScore: Number(weirdnessScore),
      imageUrl: imageUrl.trim() || PRESET_PHOTOS[0].url,
      isKeralaSpecial,
      category
    });

    closeEditModal();
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
              <span className="text-2xl">✏️</span>
              <span>Edit Food Combination</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Modify ingredients, story, category, and flavor ratings.
            </p>
          </div>
          <button
            onClick={closeEditModal}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Pair Inputs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. The Combination Pair *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Base Food:</span>
                <input
                  type="text"
                  required
                  value={mainFoodName}
                  onChange={(e) => setMainFoodName(e.target.value)}
                  placeholder="e.g. Malabar Porotta"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Paired With:</span>
                <input
                  type="text"
                  required
                  value={comboFoodName}
                  onChange={(e) => setComboFoodName(e.target.value)}
                  placeholder="e.g. Beef Fry"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Combo Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${mainFoodName || 'Base'} + ${comboFoodName || 'Combo'}`}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Selection & Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Dish Photo URL or Upload
              </label>
              <label className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer">
                <Upload size={13} />
                <span>Upload Custom Image</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Direct URL Input */}
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... image link"
              className="w-full px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />

            {/* Photo Preset Chips */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5">Quick Presets:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageUrl(photo.url)}
                    className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      imageUrl === photo.url
                        ? 'bg-orange-500/20 border-orange-500 text-white'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <img src={photo.url} alt={photo.label} className="w-7 h-7 rounded-lg object-cover shrink-0" />
                    <span className="text-[10px] font-bold truncate">{photo.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            {imageUrl && (
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300">
                  Live Preview
                </div>
              </div>
            )}
          </div>

          {/* Description / Story */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              3. The Culinary Story / Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe how this combo is eaten and how it tastes..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Why Like / Hot Take */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              4. Why people swear by it (Hot Take)
            </label>
            <input
              type="text"
              value={whyLike}
              onChange={(e) => setWhyLike(e.target.value)}
              placeholder="e.g. Sweet and spicy contrast hits like lightning."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Weirdness / Cursed Scale */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                5. Weirdness Level (Normal or Cursed? 💀)
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {weirdnessLabels.map((item) => {
                const isSelected = weirdnessScore === item.score;
                return (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => setWeirdnessScore(item.score)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? item.score >= 4
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-400'
                          : item.score === 3
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-400'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kerala Special Toggle */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <input
              type="checkbox"
              id="editIsKeralaSpecial"
              checked={isKeralaSpecial}
              onChange={(e) => setIsKeralaSpecial(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500/30"
            />
            <label htmlFor="editIsKeralaSpecial" className="text-xs font-semibold text-slate-300 cursor-pointer select-none">
              🌴 Regional Kerala Specialty / Staple
            </label>
          </div>

          {/* Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-900 py-3 -mb-6 -mx-6 px-6">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

