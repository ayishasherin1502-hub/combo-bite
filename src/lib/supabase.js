import { createClient } from '@supabase/supabase-js';

// Read from Vite environment or localStorage override
const getSupabaseConfig = () => {
  const url =
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
    (typeof window !== 'undefined' ? localStorage.getItem('combobite_supabase_url') : null) ||
    'https://ehlrormpcmbboxmattcs.supabase.co';

  const key =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    (typeof window !== 'undefined' ? localStorage.getItem('combobite_supabase_key') : null) ||
    'sb_publishable_YuYJYu72fgz4hvafVlJZbw_3aU9V01n';

  return { url, key };
};

const { url: supabaseUrl, key: supabaseAnonKey } = getSupabaseConfig();

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-ref'));
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

/**
 * Sign in with email & password
 */
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

/**
 * Sign up with email, password & metadata
 */
export async function signUpWithEmail({ email, password, username, avatarUrl }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username || email.split('@')[0],
        avatar_url: avatarUrl || '🍌',
        name: username || email.split('@')[0]
      }
    }
  });

  // If user signed up and session is immediate, create/update profile
  if (data?.user) {
    try {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username: username || email.split('@')[0],
        full_name: username || email.split('@')[0],
        avatar_url: avatarUrl || '🍌',
        role: 'Food Explorer 👀',
        onboarding_completed: false,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    } catch (e) {
      console.warn('Profiles upsert warning:', e);
    }
  }

  return { data, error };
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  return { data, error };
}

/**
 * Sign out
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Fetch profile data for a user
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Could not fetch Supabase profile (table might need migration):', err.message);
    return null;
  }
}

/**
 * Update user profile in Supabase
 */
export async function updateUserProfile(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select()
      .maybeSingle();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

