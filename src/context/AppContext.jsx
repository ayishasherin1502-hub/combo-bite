import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COMBINATIONS,
  INITIAL_FOODS,
  INITIAL_COMMENTS,
  INITIAL_USERS,
  BADGE_DEFINITIONS
} from '../data/seedData';
import {
  supabase,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOutUser,
  getUserProfile,
  updateUserProfile,
  isSupabaseConfigured
} from '../lib/supabase';

const AppContext = createContext();

const STORAGE_KEYS = {
  COMBOS: 'combobite_combinations_v2',
  FOODS: 'combobite_foods_v2',
  COMMENTS: 'combobite_comments_v1',
  USERS: 'combobite_users_v1',
  CURRENT_USER_ID: 'combobite_current_user_v1',
  USER_RATINGS: 'combobite_user_ratings_v1',
  DUEL_VOTES: 'combobite_duel_votes_v1',
  IS_LOGGED_IN: 'combobite_is_logged_in_v1',
  AUTH_USER: 'combobite_auth_user_v1'
};

export function AppProvider({ children }) {
  // Load state from LocalStorage or seed data
  const [combinations, setCombinations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMBOS);
      return saved ? JSON.parse(saved) : INITIAL_COMBINATIONS;
    } catch (e) {
      return INITIAL_COMBINATIONS;
    }
  });

  const [foods, setFoods] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOODS);
      return saved ? JSON.parse(saved) : INITIAL_FOODS;
    } catch (e) {
      return INITIAL_FOODS;
    }
  });

  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch (e) {
      return INITIAL_COMMENTS;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  // Authentication State
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      return saved || 'user-1';
    } catch (e) {
      return 'user-1';
    }
  });

  const [userRatings, setUserRatings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_RATINGS);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [duelVotes, setDuelVotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DUEL_VOTES);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Navigation & Modal state
  const [currentTab, setCurrentTab] = useState('explore'); // 'explore', 'search', 'duel', 'feed', 'auth', 'onboarding'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [selectedComboId, setSelectedComboId] = useState(null);
  const [editingComboId, setEditingComboId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const isEditModalOpen = Boolean(editingComboId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = (title, message, type = 'info', emoji = '✨') => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, type, emoji };
    setToasts(prev => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync Supabase Auth Listener
  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (currentSession) {
        setSession(currentSession);
        setIsLoggedIn(true);
        handleSupabaseUserSync(currentSession.user);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        setIsLoggedIn(true);
        handleSupabaseUserSync(newSession.user);
      } else {
        // If logged out from Supabase
        if (session) {
          setIsLoggedIn(false);
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSupabaseUserSync = async (supabaseUser) => {
    if (!supabaseUser) return;
    const email = supabaseUser.email;
    const meta = supabaseUser.user_metadata || {};
    const username = meta.username || meta.name || email.split('@')[0];
    const avatar = meta.avatar_url || '🍌';

    // Check if user profile exists in Supabase
    let profile = null;
    try {
      profile = await getUserProfile(supabaseUser.id);
    } catch (e) {}

    const syncedUser = {
      id: supabaseUser.id,
      name: profile?.full_name || username,
      handle: `@${profile?.username || username.toLowerCase().replace(/\s+/g, '')}`,
      avatar: profile?.avatar_url || avatar,
      role: profile?.role || 'Food Explorer 👀',
      email: email,
      combosAdded: profile?.combos_added || 0,
      combosRated: profile?.combos_rated || 0,
      favorites: profile?.favorites || [],
      badges: profile?.badges || ['food_explorer'],
      onboardingCompleted: profile ? profile.onboarding_completed : true
    };

    // Update in local users array
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === syncedUser.id || u.email === syncedUser.email);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...syncedUser };
        return copy;
      }
      return [syncedUser, ...prev];
    });

    setCurrentUserId(syncedUser.id);

    // If new user and hasn't completed onboarding, take to onboarding
    if (profile && profile.onboarding_completed === false) {
      setCurrentTab('onboarding');
    }
  };

  // Save to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combinations));
    } catch (e) {}
  }, [combinations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
    } catch (e) {}
  }, [foods]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (e) {}
  }, [comments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } catch (e) {}
  }, [currentUserId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, String(isLoggedIn));
    } catch (e) {}
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_RATINGS, JSON.stringify(userRatings));
    } catch (e) {}
  }, [userRatings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DUEL_VOTES, JSON.stringify(duelVotes));
    } catch (e) {}
  }, [duelVotes]);

  // Current User object
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // ================= AUTHENTICATION ACTIONS =================

  /**
   * Log In with Email & Password
   */
  const login = async ({ email, password, rememberMe = true }) => {
    setAuthLoading(true);
    setAuthError(null);

    // 1. Check for demo user accounts first
    const demoUser = users.find(u => (u.email && u.email.toLowerCase() === email.toLowerCase()) || (u.id === 'user-1' && email === 'rahul@combobite.com') || (u.id === 'user-3' && email === 'appu@combobite.com'));

    // Try Supabase auth
    try {
      const { data, error } = await signInWithEmail(email, password);

      if (error) {
        // If Supabase returns invalid login credentials error
        if (demoUser && password === 'Foodie123!') {
          // Allow demo login smoothly
          setCurrentUserId(demoUser.id);
          setIsLoggedIn(true);
          setAuthLoading(false);
          addToast('Welcome back! Let\'s find something deliciously questionable. 🍴', `Logged in as ${demoUser.name}`, 'success', '🍴');
          setCurrentTab('explore');
          return { success: true };
        }

        // Exact error message requested in prompt:
        let msg = 'Hmm… that combo didn’t work. Try again 👀';
        if (error.message.toLowerCase().includes('email')) {
          msg = 'Check your email — something looks off.';
        }
        setAuthError(msg);
        setAuthLoading(false);
        return { success: false, error: msg };
      }

      if (data?.user) {
        setIsLoggedIn(true);
        handleSupabaseUserSync(data.user);
        addToast('Welcome back! Let\'s find something deliciously questionable. 🍴', 'Successfully logged in!', 'success', '🍴');
        setCurrentTab('explore');
        setAuthLoading(false);
        return { success: true };
      }
    } catch (err) {
      if (demoUser && password === 'Foodie123!') {
        setCurrentUserId(demoUser.id);
        setIsLoggedIn(true);
        setAuthLoading(false);
        addToast('Welcome back! Let\'s find something deliciously questionable. 🍴', `Logged in as ${demoUser.name}`, 'success', '🍴');
        setCurrentTab('explore');
        return { success: true };
      }
      setAuthError('Hmm… that combo didn’t work. Try again 👀');
      setAuthLoading(false);
      return { success: false, error: 'Hmm… that combo didn’t work. Try again 👀' };
    }
  };

  /**
   * Sign Up with Username, Email, Password, and Avatar
   */
  const signup = async ({ username, email, password, avatar }) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await signUpWithEmail({
        email,
        password,
        username,
        avatarUrl: avatar
      });

      if (error) {
        setAuthError(error.message || 'Check your email — something looks off.');
        setAuthLoading(false);
        return { success: false, error: error.message };
      }

      // Create new user profile in local state
      const newUserId = data?.user?.id || 'user-' + Date.now();
      const newUser = {
        id: newUserId,
        name: username,
        handle: `@${username.toLowerCase().replace(/\s+/g, '')}`,
        email: email,
        avatar: avatar || '🍌',
        role: 'Food Explorer 👀',
        combosAdded: 0,
        combosRated: 0,
        favorites: [],
        badges: ['food_explorer'],
        onboardingCompleted: false
      };

      setUsers(prev => [newUser, ...prev]);
      setCurrentUserId(newUser.id);
      setIsLoggedIn(true);
      setAuthLoading(false);

      addToast('Profile created! 🎉', 'Welcome to ComboBite! Let\'s calibrate your tastebuds.', 'success', '🚀');
      
      // Automatically redirect new user to Onboarding
      setCurrentTab('onboarding');
      return { success: true };
    } catch (err) {
      setAuthError('Could not sign up right now. Please check your credentials.');
      setAuthLoading(false);
      return { success: false };
    }
  };

  /**
   * Google OAuth Login
   */
  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        // Fallback simulation for local/preview environments without Google redirect configured
        const googleUser = {
          id: 'google-user-' + Date.now().toString().slice(-4),
          name: 'Google Explorer',
          handle: '@google_foodie',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          role: 'Google Food Explorer 🌐',
          combosAdded: 1,
          combosRated: 5,
          favorites: ['puttu-kadala', 'porotta-beef-fry'],
          badges: ['food_explorer'],
          onboardingCompleted: true
        };
        setUsers(prev => [googleUser, ...prev]);
        setCurrentUserId(googleUser.id);
        setIsLoggedIn(true);
        addToast('Welcome back! Let\'s find something deliciously questionable. 🍴', 'Signed in with Google', 'success', '🍴');
        setCurrentTab('explore');
      }
    } catch (err) {
      setAuthError('Google sign in encountered an issue.');
    } finally {
      setAuthLoading(false);
    }
  };

  /**
   * Log Out
   */
  const logout = async () => {
    try {
      await signOutUser();
    } catch (e) {}
    setIsLoggedIn(false);
    setSession(null);
    addToast('Logged out! Come back when hunger strikes 🍌', 'See you next meal!', 'info', '👋');
    setCurrentTab('explore');
  };

  /**
   * Complete Onboarding
   */
  const completeOnboarding = async ({ favoriteFoods, personality }) => {
    const personalityMap = {
      purist: 'Food Purist 🧐',
      adventurer: 'Curious Explorer 🤠',
      mad_scientist: 'Cursed Mad Scientist 💀'
    };

    const updatedRole = personalityMap[personality] || 'Food Explorer 👀';

    // Update in Supabase if user exists
    if (session?.user?.id) {
      try {
        await updateUserProfile(session.user.id, {
          favorite_foods: favoriteFoods,
          personality: updatedRole,
          role: updatedRole,
          onboarding_completed: true
        });
      } catch (e) {}
    }

    // Update local state
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          role: updatedRole,
          favoriteFoods,
          personality,
          onboardingCompleted: true
        };
      }
      return u;
    }));

    addToast('Tastebuds Calibrated! 🤌', 'Your personalized food journey begins now.', 'success', '🎉');
    setCurrentTab('explore');
  };

  // Switch to Auth View
  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setCurrentTab('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check and unlock badges for current user
  const checkBadges = (updatedUser, updatedRatings) => {
    const ratedCount = Object.keys(updatedRatings[updatedUser.id] || {}).length;
    const newBadges = [...(updatedUser.badges || [])];
    let unlockedAny = false;

    if (ratedCount >= 10 && !newBadges.includes('combo_hunter')) {
      newBadges.push('combo_hunter');
      unlockedAny = true;
      addToast('Badge Unlocked!', '🏆 You earned: Combo Hunter (Rated 10 combos)', 'badge', '🏆');
    }

    if (ratedCount >= 20 && !newBadges.includes('food_explorer')) {
      newBadges.push('food_explorer');
      unlockedAny = true;
      addToast('Badge Unlocked!', '🔥 You earned: Food Explorer (Interacted with 20+ combos)', 'badge', '🔥');
    }

    // Check cursed combos rated
    const userRatingsForUser = updatedRatings[updatedUser.id] || {};
    const cursedRatingsCount = Object.entries(userRatingsForUser).filter(([comboId]) => {
      const combo = combinations.find(c => c.id === comboId);
      return combo && combo.weirdnessScore >= 4;
    }).length;

    if (cursedRatingsCount >= 3 && !newBadges.includes('no_fear')) {
      newBadges.push('no_fear');
      unlockedAny = true;
      addToast('Badge Unlocked!', '🤯 You earned: No Fear (Rated 3+ cursed experiments)', 'badge', '🤯');
    }

    if (unlockedAny) {
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? { ...u, badges: newBadges } : u));
    }
  };

  // Toggle favorite combo
  const toggleFavorite = (comboId) => {
    if (!isLoggedIn) {
      addToast('Login Required 👀', 'Log in or sign up to save favorite combos!', 'info', '🔒');
      openAuth('login');
      return;
    }

    const isFav = currentUser.favorites?.includes(comboId);
    const updatedFavorites = isFav
      ? currentUser.favorites.filter(id => id !== comboId)
      : [...(currentUser.favorites || []), comboId];

    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, favorites: updatedFavorites } : u));
    if (!isFav) {
      addToast('Saved to Favorites ❤️', 'Added combo to your saved collection!', 'success', '❤️');
    }
  };

  // Rate a combination
  const submitRating = (comboId, stars, reaction = 'amazing') => {
    const combo = combinations.find(c => c.id === comboId);
    if (!combo) return;

    const userKey = currentUser.id;
    const existingUserRating = userRatings[userKey]?.[comboId];

    let newCount = combo.ratingCount;
    let newTotal = combo.ratingAvg * combo.ratingCount;

    if (existingUserRating) {
      newTotal = newTotal - existingUserRating.stars + stars;
    } else {
      newCount += 1;
      newTotal += stars;
    }

    const newAvg = Number((newTotal / newCount).toFixed(2));

    const updatedReactions = { ...combo.reactions };
    if (existingUserRating && existingUserRating.reaction) {
      updatedReactions[existingUserRating.reaction] = Math.max(0, (updatedReactions[existingUserRating.reaction] || 1) - 1);
    }
    updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;

    setCombinations(prev => prev.map(c => {
      if (c.id === comboId) {
        return {
          ...c,
          ratingAvg: newAvg,
          ratingCount: newCount,
          reactions: updatedReactions
        };
      }
      return c;
    }));

    const updatedUserRatings = {
      ...userRatings,
      [userKey]: {
        ...(userRatings[userKey] || {}),
        [comboId]: { stars, reaction, ratedAt: new Date().toISOString() }
      }
    };
    setUserRatings(updatedUserRatings);

    const updatedUser = {
      ...currentUser,
      combosRated: Object.keys(updatedUserRatings[userKey] || {}).length
    };
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));

    if (combo.weirdnessScore >= 4 && stars >= 4) {
      addToast('Interesting choice... 👀', `You gave ${stars}★ to "${combo.title}". Are you okay?`, 'cursed', '💀');
    } else if (combo.isKeralaSpecial && stars <= 2) {
      addToast('Blasphemy detected! 🚨', `You just judged someone's childhood comfort food (${combo.title}) 💀`, 'cursed', '😭');
    } else if (stars === 5) {
      addToast('A person of refined culture! 🤌', `You rated "${combo.title}" 5/5. Immaculate taste.`, 'success', '🤌');
    } else {
      addToast('Rating saved!', `Your ${stars}★ vote on "${combo.title}" has been recorded.`, 'info', '⭐');
    }

    checkBadges(updatedUser, updatedUserRatings);
  };

  // Vote in "Normal or Cursed?" rapid duel
  const voteDuel = (comboId, choice) => {
    const combo = combinations.find(c => c.id === comboId);
    if (!combo) return;

    const previousVote = duelVotes[currentUser.id]?.[comboId];
    if (previousVote === choice) return;

    let normDelta = 0;
    let cursDelta = 0;

    if (choice === 'normal') {
      normDelta = 1;
      if (previousVote === 'cursed') cursDelta = -1;
    } else {
      cursDelta = 1;
      if (previousVote === 'normal') normDelta = -1;
    }

    setCombinations(prev => prev.map(c => {
      if (c.id === comboId) {
        return {
          ...c,
          votesNormal: Math.max(0, (c.votesNormal || 0) + normDelta),
          votesCursed: Math.max(0, (c.votesCursed || 0) + cursDelta)
        };
      }
      return c;
    }));

    setDuelVotes(prev => ({
      ...prev,
      [currentUser.id]: {
        ...(prev[currentUser.id] || {}),
        [comboId]: choice
      }
    }));

    if (choice === 'cursed') {
      addToast('Voted CURSED 💀', `Added to the hall of shame!`, 'cursed', '💀');
    } else {
      addToast('Voted NORMAL 🤌', `Sanity prevails!`, 'success', '🤌');
    }
  };

  // Add Comment
  const addComment = (comboId, content) => {
    if (!content.trim()) return;

    const newComment = {
      id: 'c_' + Date.now(),
      userName: currentUser.name,
      userAvatar: currentUser.avatar && currentUser.avatar.length <= 2 ? currentUser.avatar : currentUser.name.charAt(0),
      content: content.trim(),
      createdAt: 'Just now',
      likes: 0
    };

    setComments(prev => ({
      ...prev,
      [comboId]: [newComment, ...(prev[comboId] || [])]
    }));

    addToast('Comment Posted 💬', 'Your hot take has been published!', 'info', '💬');
  };

  // Like comment
  const likeComment = (comboId, commentId) => {
    setComments(prev => {
      const comboComments = prev[comboId] || [];
      return {
        ...prev,
        [comboId]: comboComments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c)
      };
    });
  };

  // Add a new Combination
  const addCombination = (comboData) => {
    const id = (comboData.mainFoodName + '-' + comboData.comboFoodName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);

    const newCombo = {
      id,
      title: comboData.title || `${comboData.mainFoodName} + ${comboData.comboFoodName}`,
      mainFoodId: comboData.mainFoodId || 'custom',
      mainFoodName: comboData.mainFoodName,
      comboFoodName: comboData.comboFoodName,
      category: comboData.category || 'Kerala Specials',
      imageUrl: comboData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      description: comboData.description || 'A unique food pairing submitted by the community.',
      whyLike: comboData.whyLike || 'Because adventurous tastebuds know no boundaries!',
      weirdnessScore: Number(comboData.weirdnessScore) || 2,
      ratingAvg: 5.0,
      ratingCount: 1,
      reactions: { amazing: 1, good: 0, okay: 0, weird: 0, cursed: 0 },
      votesNormal: comboData.weirdnessScore <= 2 ? 1 : 0,
      votesCursed: comboData.weirdnessScore > 2 ? 1 : 0,
      isKeralaSpecial: Boolean(comboData.isKeralaSpecial),
      featured: false,
      trending: true,
      createdBy: currentUser.name,
      createdAt: new Date().toISOString(),
      tags: comboData.tags || ['Community Added', 'Fresh']
    };

    setCombinations(prev => [newCombo, ...prev]);

    if (!foods.some(f => f.name.toLowerCase() === comboData.mainFoodName.toLowerCase())) {
      const newFood = {
        id: comboData.mainFoodName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: comboData.mainFoodName,
        category: comboData.category || 'Snacks',
        isKeralaSpecial: comboData.isKeralaSpecial || false,
        image: newCombo.imageUrl,
        description: `Community submitted food: ${comboData.mainFoodName}`
      };
      setFoods(prev => [...prev, newFood]);
    }

    const updatedUser = {
      ...currentUser,
      combosAdded: (currentUser.combosAdded || 0) + 1
    };

    if (newCombo.weirdnessScore >= 4) {
      if (!updatedUser.badges.includes('cursed_scientist')) {
        updatedUser.badges = [...updatedUser.badges, 'cursed_scientist'];
        addToast('Badge Unlocked! 💀', 'Earned: Cursed Food Scientist for submitting a chaotic combo!', 'badge', '💀');
      }
    }

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    addToast('Combo Published! 🎉', `"${newCombo.title}" is now live on the community feed!`, 'success', '🚀');
    return newCombo;
  };

  // Delete a combination
  const deleteCombination = (comboId) => {
    const comboToDelete = combinations.find(c => c.id === comboId);
    const title = comboToDelete ? comboToDelete.title : 'Food Combination';

    setCombinations(prev => prev.filter(c => c.id !== comboId));

    // Remove from user favorites
    setUsers(prev => prev.map(u => ({
      ...u,
      favorites: (u.favorites || []).filter(id => id !== comboId)
    })));

    // Clean up comments
    setComments(prev => {
      const next = { ...prev };
      delete next[comboId];
      return next;
    });

    if (selectedComboId === comboId) {
      setSelectedComboId(null);
    }

    addToast('Combo Removed 🗑️', `"${title}" has been removed.`, 'info', '🗑️');
  };

  // Update an existing combination
  const updateCombination = (comboId, updatedFields) => {
    setCombinations(prev => prev.map(c => {
      if (c.id === comboId) {
        return {
          ...c,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    addToast('Combo Updated! ✏️', `"${updatedFields.title || 'Combination'}" changes saved.`, 'success', '✏️');
  };

  const openEditModal = (comboId) => {
    setEditingComboId(comboId);
  };

  const closeEditModal = () => {
    setEditingComboId(null);
  };

  // Reset to default seed data
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.COMBOS);
    localStorage.removeItem(STORAGE_KEYS.FOODS);
    localStorage.removeItem(STORAGE_KEYS.COMMENTS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.USER_RATINGS);
    localStorage.removeItem(STORAGE_KEYS.DUEL_VOTES);
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    setCombinations(INITIAL_COMBINATIONS);
    setFoods(INITIAL_FOODS);
    setComments(INITIAL_COMMENTS);
    setUsers(INITIAL_USERS);
    setUserRatings({});
    setDuelVotes({});
    setIsLoggedIn(false);
    setCurrentUserId('user-1');
    addToast('Database Reset', 'All combinations and ratings returned to defaults.', 'info', '🔄');
  };

  const selectedCombo = combinations.find(c => c.id === selectedComboId) || null;

  return (
    <AppContext.Provider value={{
      combinations,
      foods,
      comments,
      users,
      currentUser,
      setCurrentUserId,
      currentTab,
      setCurrentTab,
      authMode,
      setAuthMode,
      openAuth,
      selectedComboId,
      setSelectedComboId,
      selectedCombo,
      editingComboId,
      isEditModalOpen,
      openEditModal,
      closeEditModal,
      isAddModalOpen,
      setIsAddModalOpen,
      isProfileModalOpen,
      setIsProfileModalOpen,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      userRatings,
      duelVotes,
      toasts,
      addToast,
      removeToast,
      toggleFavorite,
      submitRating,
      voteDuel,
      addComment,
      likeComment,
      addCombination,
      updateCombination,
      deleteCombination,
      resetToDefaults,
      BADGE_DEFINITIONS,
      // Authentication state & helpers
      isLoggedIn,
      session,
      authLoading,
      authError,
      setAuthError,
      login,
      signup,
      loginWithGoogle,
      logout,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
