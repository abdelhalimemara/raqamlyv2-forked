import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Add a function to check and refresh the session if needed
export const ensureValidSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session && session.expires_at * 1000 < Date.now()) {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Error refreshing session:', error);
      await supabase.auth.signOut();
      throw error;
    }
    return data.session;
  }
  return session;
};