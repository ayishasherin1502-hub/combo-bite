# ComboBite 🍌 — Community Food Combination App

> **What goes with what? Normal or Cursed? 💀**
> Discover, rate, and debate food combinations people love, tolerate, or absolutely regret — from authentic Kerala soul food to certified culinary crimes.

---

## 🚀 Quick Start (Zero Setup Needed!)

You can run ComboBite **instantly** without running any terminal commands or installing dependencies:

1. Double-click **`standalone.html`** in this folder (`C:\Users\mehhr\.gemini\antigravity\scratch\combobite\standalone.html`).
2. It opens directly in Google Chrome, Microsoft Edge, or any modern web browser with the full interactive experience:
   - Live **"Normal or Cursed?"** rapid duel arena with community percentage splits.
   - Interactive 5-star taste ratings + 5 emotional reaction badges.
   - Witty contextual toasts (*"You just judged someone's childhood comfort food 💀"*).
   - Instant search by base food (e.g. *Puttu, Porotta, Beef, Ice Cream*).
   - "Add Combo +" submission modal with live weirdness slider.
   - Gamification with user persona switching and achievement badges.
   - Real-time community comments and LocalStorage persistence.

---

## 💻 Developer Vite + React Setup

For developers wanting a modern module-based React workflow:

```bash
# 1. Navigate to the project directory
cd C:\Users\mehhr\.gemini\antigravity\scratch\combobite

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🌟 Key Features

### 1. Home / Explore
- **Hero Banner**: Quick search, statistics ticker, and quick-filter category pills.
- **Normal or Cursed? ⚔️ Duel Card**: Instant rapid-fire matchup widget.
- **Curated Sections**:
  - 🔥 *Trending Combos*
  - 🌴 *Kerala Comfort Specials* (*Puttu + Kadala, Porotta + Beef, Pazham Pori + Beef, Kappa + Meen Curry, Kanji + Payar + Chammanthi*)
  - 💀 *The Cursed Hall of Infamy* (*Puttu + Ice Cream, Biriyani + Ketchup, Pizza + Gulab Jamun, Maggi + Curd*)
  - 👑 *People's Favorites* (Combos rated 4.8★ and above)
  - 🕒 *Recently Added by Community*

### 2. Search & Discover
- Search any food or ingredient (not restricted to presets).
- Quick Kerala food chips (*Puttu, Porotta, Pazham Pori, Kappa, Biriyani, Appam, Kanji, Dosa, Maggi*).
- Filters: Highest Rated, Most Popular, Weirdest / Cursed, Most Tried, Newest.

### 3. Combination Details Modal
- Full-resolution photo and pairing breakdown.
- Star rating breakdown & community reaction percentages.
- **Interactive Rating Widget**: 1–5 stars + emotional reactions:
  - 🤌 *Would eat again* (Amazing)
  - 👍 *Pretty good* (Good)
  - 😐 *It's okay* (Okay)
  - 🤨 *Weird* (Sus)
  - 💀 *Never again* (Cursed)
- Humorous context-aware feedback toasts.
- Comments stream with liking and instant posting.
- One-click share & clipboard copy.

### 4. "Add Combo +" Wizard
- Main Food & Pairing Food selection with autocomplete or custom input.
- **Weirdness Meter Slider**:
  `1: Normal 🤌` ➔ `2: Mild 👍` ➔ `3: Weird 🤨` ➔ `4: Sus 💀` ➔ `5: Cursed 🚨`
- Photo uploader (supports file uploads and curated presets).
- Story and "Why do you swear by it?" description.
- Automatically saves to community feed and LocalStorage.

### 5. "Normal or Cursed?" Rapid Duel
- High-contrast food matchup presentation.
- One-click **NORMAL 🤌** vs **CURSED 💀** voting.
- Instant community percentage split reveal with streak counter.

### 6. Gamification & User Profiles
- Unlocked badges:
  - 🏆 **Combo Hunter** (Rated 10+ combinations)
  - 🔥 **Food Explorer** (Interacted with 20+ combos)
  - 💀 **Cursed Food Scientist** (Submitted/favored weird combinations)
  - 🤯 **No Fear** (Rated high-weirdness combinations)
- Switch between demo test personas (*Rahul K.*, *Maya Shenoy*, *Appu The Sinner*).
- View saved favorites and submitted combos.

---

## 📁 Project Structure

```
combobite/
├── standalone.html          # Ready-to-run zero-dependency single-file application
├── index.html               # Vite HTML entrypoint
├── package.json             # React, Vite, Tailwind, Lucide dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Custom palette & animations
├── postcss.config.js        # PostCSS configuration
├── README.md                # Project documentation
└── src/
    ├── main.jsx             # React application entry
    ├── App.jsx              # Root component & tab router
    ├── index.css            # Tailwind & animation CSS
    ├── context/
    │   └── AppContext.jsx   # Central state, LocalStorage sync, ratings & toasts
    ├── data/
    │   └── seedData.js      # Authentic Kerala & cursed combinations database
    └── components/
        ├── Navbar.jsx               # Navigation bar & user widget
        ├── Hero.jsx                 # Hero banner & live counters
        ├── NormalOrCursedDuel.jsx   # Interactive "Normal or Cursed?" duel widget
        ├── ComboCard.jsx            # Food pairing card
        ├── ComboDetailModal.jsx     # Detailed combo view, rating & comments
        ├── AddComboModal.jsx        # Submission form with weirdness slider
        ├── SearchDiscoverView.jsx   # Deep search & filtering hub
        ├── CommunityFeedView.jsx    # Social activity stream
        ├── ProfileModal.jsx         # Gamification & profile view
        ├── ExploreView.jsx          # Explore landing layout
        └── ToastContainer.jsx       # Contextual toast notifications
```
# combo-bite
