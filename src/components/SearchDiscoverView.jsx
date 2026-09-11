import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ComboCard from './ComboCard';
import {
  Search,
  Filter,
  ArrowUpDown,
  Flame,
  Star,
  Clock,
  Sparkles,
  SlidersHorizontal,
  X,
  Skull
} from 'lucide-react';

export default function SearchDiscoverView() {
  const {
    combinations,
    foods,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [sortBy, setSortBy] = useState('highest_rated'); // 'highest_rated', 'most_popular', 'newest', 'weirdest', 'most_tried'
  const [weirdnessFilter, setWeirdnessFilter] = useState('all'); // 'all', 'normal', 'interesting', 'cursed'
  const [activeFoodFilter, setActiveFoodFilter] = useState(null);

  // Popular quick chips
  const quickFoodChips = [
    { name: 'Puttu', emoji: '🥥' },
    { name: 'Porotta', emoji: '🫓' },
    { name: 'Pazham Pori', emoji: '🍌' },
    { name: 'Kappa', emoji: '🥔' },
    { name: 'Biriyani', emoji: '🍗' },
    { name: 'Appam', emoji: '🥞' },
    { name: 'Kanji', emoji: '🥣' },
    { name: 'Dosa', emoji: '🥟' },
    { name: 'Maggi', emoji: '🍜' },
    { name: 'Ice Cream', emoji: '🍦' }
  ];

  const filteredCombos = useMemo(() => {
    let list = [...combinations];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.mainFoodName.toLowerCase().includes(q) ||
        c.comboFoodName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Quick active food chip filter
    if (activeFoodFilter) {
      const filterLower = activeFoodFilter.toLowerCase();
      list = list.filter(c =>
        c.mainFoodName.toLowerCase().includes(filterLower) ||
        c.comboFoodName.toLowerCase().includes(filterLower)
      );
    }

    // Weirdness filter
    if (weirdnessFilter === 'normal') {
      list = list.filter(c => c.weirdnessScore <= 2);
    } else if (weirdnessFilter === 'interesting') {
      list = list.filter(c => c.weirdnessScore === 3);
    } else if (weirdnessFilter === 'cursed') {
      list = list.filter(c => c.weirdnessScore >= 4);
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'kerala') {
        list = list.filter(c => c.isKeralaSpecial);
      } else if (selectedCategory === 'cursed') {
        list = list.filter(c => c.weirdnessScore >= 4);
      } else {
        list = list.filter(c => c.category?.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'highest_rated') {
        return b.ratingAvg - a.ratingAvg;
      }
      if (sortBy === 'most_popular' || sortBy === 'most_tried') {
        return b.ratingCount - a.ratingCount;
      }
      if (sortBy === 'weirdest') {
        return b.weirdnessScore - a.weirdnessScore;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return list;
  }, [combinations, searchQuery, activeFoodFilter, weirdnessFilter, selectedCategory, sortBy]);

  const handleChipClick = (chipName) => {
    if (activeFoodFilter === chipName) {
      setActiveFoodFilter(null);
    } else {
      setActiveFoodFilter(chipName);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveFoodFilter(null);
    setWeirdnessFilter('all');
    setSelectedCategory('all');
    setSortBy('highest_rated');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Search Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
              <Search className="text-orange-500" />
              <span>Search & Discover Combos</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Search by main dish (e.g. "Puttu") to see everything people pair with it!
            </p>
          </div>

          {(searchQuery || activeFoodFilter || weirdnessFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-bold p-1 rounded"
            >
              <X size={14} />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Big Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type any food: Puttu, Porotta, Beef, Ice Cream, Ketchup..."
            className="w-full bg-slate-900 border-2 border-slate-700 hover:border-orange-500/50 focus:border-orange-500 rounded-2xl px-12 py-3.5 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none transition-colors shadow-xl"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Food Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          <span className="text-xs text-slate-400 font-bold shrink-0">Quick Filter:</span>
          {quickFoodChips.map((chip) => {
            const isSelected = activeFoodFilter === chip.name;
            return (
              <button
                key={chip.name}
                onClick={() => handleChipClick(chip.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 shadow-md shadow-amber-400/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <span>{chip.emoji}</span>
                <span>{chip.name}</span>
                {isSelected && <X size={12} className="ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* Weirdness Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs text-slate-400 font-bold mr-1">Vibe:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'normal', label: 'Normal 🤌' },
            { id: 'interesting', label: 'Curious 🤨' },
            { id: 'cursed', label: 'Cursed 💀' }
          ].map((w) => (
            <button
              key={w.id}
              onClick={() => setWeirdnessFilter(w.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                weirdnessFilter === w.id
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown size={15} className="text-slate-400" />
          <span className="text-xs text-slate-400 font-bold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
          >
            <option value="highest_rated">⭐ Highest Rated</option>
            <option value="most_popular">🔥 Most Popular</option>
            <option value="most_tried">👍 Most Tried</option>
            <option value="weirdest">💀 Weirdest & Cursed</option>
            <option value="newest">🕒 Newest Added</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Showing {filteredCombos.length} {filteredCombos.length === 1 ? 'combination' : 'combinations'}
          {activeFoodFilter ? ` with "${activeFoodFilter}"` : ''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
        </h2>
      </div>

      {/* Grid of Results */}
      {filteredCombos.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="text-5xl">🥣👀</div>
          <h3 className="text-xl font-bold text-white">No combinations found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Nobody has added this exact pairing yet. Be the culinary pioneer!
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCombos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      )}
    </div>
  );
}
