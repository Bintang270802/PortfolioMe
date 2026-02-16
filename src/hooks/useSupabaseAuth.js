import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabase';

/**
 * Custom hook for managing Supabase authentication
 * @returns {Object} Auth state and methods
 */
export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  return {
    user,
    loading,
    authError,
    setAuthError,
    clearAuthError,
    isAuthenticated: !!user,
  };
};
