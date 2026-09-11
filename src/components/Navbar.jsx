import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Search,
  Swords,
  Flame,
  PlusCircle,
  User,
  Menu,
  X,
  Sparkles,
  Award,
  LogOut,
  LogIn,
  UserPlus,
  Database,
  ChevronDown
} from 'lucide-react';
import SupabaseConfigModal from './SupabaseConfigModal';

export default function Navbar() {
  const {
    currentTab,
    setCurrentTab,
    setIsAddModalOpen,
    setIsProfileModalOpen,
    currentUser,
    isLoggedIn,
    logout,
    openAuth
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'search', label: 'Search Foods', icon: Search },
    { id: 'duel', label: 'Normal vs Cursed ⚔️', icon: Swords, highlight: true },
    { id: 'feed', label: 'Live Feed', icon: Flame }
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('explore')}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-orange-500/25 transform group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  🍌
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                      ComboBite
                    </span>
                    <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      Kerala & Beyond
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                    What goes with what? Normal or Cursed? 💀
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Nav links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-full border border-slate-700/60">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'} />
                    <span>{item.label}</span>
                    {item.highlight && !isActive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Add Combo + User Auth / Profile */}
            <div className="flex items-center gap-2.5 sm:gap-3">

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <PlusCircle size={17} className="stroke-[2.5]" />
                <span>Add Combo <span className="hidden sm:inline">+</span></span>
              </button>

              {/* Logged Out: Show Log In & Sign Up Buttons */}
              {!isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuth('login')}
                    className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-200 hover:text-white border border-slate-700 transition-colors"
                  >
                    <LogIn size={15} className="text-amber-400" />
                    <span>Log In</span>
                  </button>

                  <button
                    onClick={() => openAuth('signup')}
                    className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/40 text-xs sm:text-sm font-bold transition-all"
                  >
                    <UserPlus size={15} />
                    <span>Sign Up</span>
                  </button>
                </div>
              ) : (
                /* Logged In: User Profile Pill with Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                    title="User Account"
                  >
                    {currentUser.avatar && currentUser.avatar.length <= 2 ? (
                      <span className="text-lg w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-slate-700 ring-2 ring-orange-500/60">
                        {currentUser.avatar}
                      </span>
                    ) : (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-orange-500/60"
                      />
                    )}

                    <div className="hidden lg:block text-left pr-1">
                      <div className="text-xs font-bold text-slate-200 group-hover:text-white flex items-center gap-1">
                        <span>{currentUser.name}</span>
                        {currentUser.badges?.length > 0 && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded">
                            {currentUser.badges.length} 🏆
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{currentUser.handle}</div>
                    </div>

                    <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn text-left space-y-1">
                      <div className="p-2 border-b border-slate-800/80 mb-1">
                        <div className="font-bold text-xs text-white truncate">{currentUser.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{currentUser.email || currentUser.handle}</div>
                        <div className="text-[10px] text-amber-400 font-medium mt-0.5">{currentUser.role}</div>
                      </div>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <User size={15} className="text-amber-400" />
                        <span>View Profile & Badges</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setDbModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Database size={15} className="text-emerald-400" />
                        <span>Supabase Real DB</span>
                      </button>

                      <div className="border-t border-slate-800/80 my-1"></div>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut size={15} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-2 animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full">
                      Hot 🔥
                    </span>
                  )}
                </button>
              );
            })}

            {/* Mobile Auth Actions */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              {!isLoggedIn ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('login');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 text-xs font-bold text-white flex items-center justify-center gap-2"
                  >
                    <LogIn size={15} />
                    <span>Log In</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('signup');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-orange-500 text-xs font-bold text-slate-950 flex items-center justify-center gap-2"
                  >
                    <UserPlus size={15} />
                    <span>Sign Up</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2"
                  >
                    <User size={15} className="text-amber-400" />
                    <span>My Profile & Achievements</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-rose-500/15 text-xs font-semibold text-rose-300 flex items-center gap-2"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Supabase Status Modal */}
      <SupabaseConfigModal
        isOpen={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
      />
    </>
  );
}
