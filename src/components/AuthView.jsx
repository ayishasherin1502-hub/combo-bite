import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  HelpCircle,
  X
} from 'lucide-react';

const FOOD_AVATARS = [
  { id: 'banana', emoji: '🍌', label: 'Banana Rebel' },
  { id: 'curry', emoji: '🍛', label: 'Curry Connoisseur' },
  { id: 'beef', emoji: '🥩', label: 'Meat Maestro' },
  { id: 'icecream', emoji: '🍦', label: 'Chaos Scooper' },
  { id: 'pizza', emoji: '🍕', label: 'Slice Fiend' },
  { id: 'skull', emoji: '💀', label: 'Cursed Scientist' },
  { id: 'avocado', emoji: '🥑', label: 'Avo Dreamer' },
  { id: 'ramen', emoji: '🍜', label: 'Noodle Slurper' }
];

export default function AuthView({ initialMode = 'login' }) {
  const {
    login,
    signup,
    loginWithGoogle,
    authLoading,
    authError,
    setAuthError,
    setCurrentTab
  } = useApp();

  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '🍌'
  });

  const [formErrors, setFormErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (authError) {
      setAuthError(null);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      errors.email = 'Check your email — something looks off.';
    }
    if (!formData.password) {
      errors.password = 'Password is required!';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await login({
      email: formData.email.trim(),
      password: formData.password,
      rememberMe
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.username.trim() || formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      errors.email = 'Check your email — something looks off.';
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password needs at least 6 characters to keep your food secrets safe 🔒';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Those passwords don’t match! Double check your recipe 🧂';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await signup({
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      avatar: formData.avatar
    });
  };

  // Demo auto-fill helper for quick testing
  const autofillDemo = (email, password) => {
    setFormData((prev) => ({
      ...prev,
      email,
      password
    }));
    setFormErrors({});
    if (authError) setAuthError(null);
  };

  // Password strength check
  const getPasswordStrength = (pass) => {
    if (!pass) return { text: '', color: 'bg-slate-700', width: 'w-0' };
    if (pass.length < 6) return { text: 'Mild 🌱', color: 'bg-amber-500', width: 'w-1/3' };
    if (pass.length < 10) return { text: 'Zesty 🌶️', color: 'bg-orange-500', width: 'w-2/3' };
    return { text: 'Fiery & Cursed 🔥', color: 'bg-rose-500', width: 'w-full' };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Ambience & Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-orange-500/15 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Food Icons */}
      <div className="hidden lg:block pointer-events-none select-none">
        <span className="absolute top-20 left-[12%] text-4xl animate-float opacity-75">🍌</span>
        <span className="absolute top-48 left-[7%] text-3xl animate-float [animation-delay:1s] opacity-65">🍚</span>
        <span className="absolute bottom-28 left-[10%] text-5xl animate-float [animation-delay:2s] opacity-75">🍛</span>
        <span className="absolute top-24 right-[12%] text-4xl animate-float [animation-delay:1.5s] opacity-75">🥩</span>
        <span className="absolute top-52 right-[7%] text-4xl animate-float [animation-delay:0.5s] opacity-65">🍦</span>
        <span className="absolute bottom-32 right-[11%] text-5xl animate-float [animation-delay:2.5s] opacity-75">💀</span>
        <span className="absolute bottom-12 left-[28%] text-3xl animate-float [animation-delay:3s] opacity-40">🥑</span>
        <span className="absolute top-12 right-[32%] text-3xl animate-float [animation-delay:1.8s] opacity-50">🧀</span>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-lg z-10">
        {/* Playful Top Quote Pill */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-amber-300 shadow-xl backdrop-blur-md">
            <span>✨</span>
            <span>
              {mode === 'login'
                ? '“We don’t judge your food choices. Much.”'
                : '“Normal, weird, or completely cursed — you’re welcome here.”'}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-orange-500/5 relative text-left transition-all">
          {/* Decorative Corner Accent */}
          <div className="absolute -top-3 -right-3 bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-lg transform rotate-6 select-none">
            {mode === 'login' ? 'MEMBERS ONLY 🍴' : 'JOIN EXPERIMENT 🚀'}
          </div>

          {/* Heading */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-orange-500/30 text-3xl mb-1 shadow-inner">
              {mode === 'login' ? '👀' : '🧪'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {mode === 'login' ? 'Welcome back, food explorer 👀' : 'Join the food experiment 🚀'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-sm mx-auto">
              {mode === 'login'
                ? 'Your next questionable food combination is waiting.'
                : 'Normal, weird, or completely cursed — you’re welcome here.'}
            </p>
          </div>

          {/* Global Auth Error Alert */}
          {authError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
              <div className="flex-1 font-medium">{authError}</div>
              <button
                onClick={() => setAuthError(null)}
                className="text-rose-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={authLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-lg shadow-black/20 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {/* Authentic Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{authLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative px-4 text-[11px] font-black uppercase tracking-wider text-slate-500 bg-slate-900">
              OR
            </span>
          </div>

          {/* Form */}
          {mode === 'login' ? (
            /* ================= LOGIN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="explorer@combobite.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/60 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formErrors.email
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <span>⚠️</span>
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-3 bg-slate-950/60 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formErrors.password
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <span>⚠️</span>
                    <span>{formErrors.password}</span>
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500/30 focus:ring-offset-slate-900"
                  />
                  <span className="text-xs text-slate-400 font-medium">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {authLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Cooking up your session... 🍳</span>
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Demo Accounts Pill for Quick Evaluation */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Quick Demo Fill:</span>
                  <span className="text-[10px] text-amber-400/80">Click to autofill</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => autofillDemo('rahul@combobite.com', 'Foodie123!')}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <div className="font-bold text-[11px] text-slate-200 truncate">Rahul (Purist)</div>
                    <div className="text-[10px] text-slate-500 truncate">rahul@combobite.com</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => autofillDemo('appu@combobite.com', 'Foodie123!')}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <div className="font-bold text-[11px] text-slate-200 truncate">Appu (Cursed 💀)</div>
                    <div className="text-[10px] text-slate-500 truncate">appu@combobite.com</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ================= SIGN UP FORM ================= */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Explorer Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="e.g. BiriyaniBoss"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/60 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formErrors.username
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                  />
                </div>
                {formErrors.username && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <span>⚠️</span>
                    <span>{formErrors.username}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="newexplorer@combobite.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/60 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formErrors.email
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <span>⚠️</span>
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="At least 6 characters"
                    className={`w-full pl-10 pr-10 py-3 bg-slate-950/60 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formErrors.password
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Flavor strength:</span>
                      <span className="font-bold text-slate-300">{strength.text}</span>
                    </div>
                  </div>
                )}

                {formErrors.password && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <span>⚠️</span>
                    <span>{formErrors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat password"
                    className={`w-full pl-10 pr-10 py-3 bg-slate-950/60 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formErrors.confirmPassword
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <span>⚠️</span>
                    <span>{formErrors.confirmPassword}</span>
                  </p>
                )}
              </div>

              {/* Profile Avatar (Optional) */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-slate-300">
                  Choose your food avatar (optional)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {FOOD_AVATARS.map((av) => {
                    const isSelected = formData.avatar === av.emoji;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, avatar: av.emoji }))}
                        className={`p-2 rounded-xl text-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-orange-500/20 border-2 border-orange-500 scale-110 shadow-lg shadow-orange-500/30'
                            : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 opacity-70 hover:opacity-100'
                        }`}
                        title={av.label}
                      >
                        {av.emoji}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              >
                {authLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Preparing your lab coat... 🧪</span>
                  </>
                ) : (
                  <>
                    <span>Join the food experiment →</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Toggle Login / Sign Up */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            {mode === 'login' ? (
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setFormErrors({});
                  if (authError) setAuthError(null);
                }}
                className="text-xs text-slate-400 hover:text-amber-400 font-semibold transition-colors inline-flex items-center gap-1 group"
              >
                <span>New here?</span>
                <span className="text-amber-400 group-hover:underline">Create an account →</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setFormErrors({});
                  if (authError) setAuthError(null);
                }}
                className="text-xs text-slate-400 hover:text-amber-400 font-semibold transition-colors inline-flex items-center gap-1 group"
              >
                <span>Already an explorer?</span>
                <span className="text-amber-400 group-hover:underline">Log In →</span>
              </button>
            )}
          </div>
        </div>

        {/* Back to Explore link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentTab('explore')}
            className="text-xs text-slate-500 hover:text-slate-300 font-medium transition-colors"
          >
            ← Or continue browsing as guest
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔑</span>
                <h3 className="text-lg font-black text-white">Reset Password</h3>
              </div>
              <button
                onClick={() => {
                  setForgotModalOpen(false);
                  setResetSubmitted(false);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {!resetSubmitted ? (
              <>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lost your keys to the food vault? Enter your email and we'll send you recovery instructions.
                </p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your-email@combobite.com"
                  className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (validateEmail(resetEmail)) {
                      setResetSubmitted(true);
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm"
                >
                  Send Recovery Link 🚀
                </button>
              </>
            ) : (
              <div className="py-4 text-center space-y-2 animate-fadeIn">
                <div className="text-3xl">📬</div>
                <h4 className="font-bold text-white text-sm">Check your inbox!</h4>
                <p className="text-xs text-slate-400">
                  If an account exists for <span className="text-amber-400 font-mono">{resetEmail}</span>, recovery instructions have been fired over.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(false);
                    setResetSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
