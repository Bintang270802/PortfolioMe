// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Ambil konfigurasi dari environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const googleOAuthEnabled = import.meta.env.VITE_GOOGLE_OAUTH_ENABLED === 'true'

// Cek apakah konfigurasi valid
const isValidConfig = supabaseUrl && 
                     supabaseAnonKey && 
                     supabaseUrl !== 'your_supabase_project_url_here' && 
                     supabaseAnonKey !== 'your_supabase_anon_key_here' &&
                     supabaseUrl.startsWith('http')

// Buat client hanya jika konfigurasi valid
export const supabase = isValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null

// Export status konfigurasi
export const isSupabaseConfigured = isValidConfig
export const isGoogleOAuthEnabled = googleOAuthEnabled && isValidConfig

// Auth functions dengan error handling
export const loginWithGoogle = async () => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  if (!googleOAuthEnabled) {
    return { 
      data: null, 
      error: { 
        message: 'Google OAuth is disabled. Please enable it in environment variables or use alternative login methods.',
        code: 'OAUTH_DISABLED'
      } 
    }
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/portofolio/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'openid email profile'
      }
    })
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

// Email/Password signup
export const signUpWithEmail = async (email, password, displayName) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  // Validate inputs
  if (!email || !password || !displayName) {
    return { 
      data: null, 
      error: { message: 'Email, password, and display name are required' } 
    }
  }
  
  if (password.length < 6) {
    return { 
      data: null, 
      error: { message: 'Password must be at least 6 characters long' } 
    }
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
          display_name: displayName
        }
      }
    })
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

// Email/Password login
export const loginWithEmail = async (email, password) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  // Validate inputs
  if (!email || !password) {
    return { 
      data: null, 
      error: { message: 'Email and password are required' } 
    }
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

// Magic Link Login
export const loginWithMagicLink = async (email) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  // Validate email
  if (!email) {
    return { 
      data: null, 
      error: { message: 'Email is required' } 
    }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { 
      data: null, 
      error: { message: 'Please enter a valid email address' } 
    }
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portofolio/`
      }
    })
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const logout = async () => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (err) {
    return { error: err }
  }
}

// Database functions dengan error handling
export const insertMessage = async (messageData) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  // Validate message data
  if (!messageData || !messageData.text || !messageData.user_id) {
    return { 
      data: null, 
      error: { message: 'Invalid message data' } 
    }
  }
  
  // Sanitize message text
  const sanitizedMessage = {
    ...messageData,
    text: messageData.text.trim().substring(0, 1000) // Limit message length
  }
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([sanitizedMessage])
      .select()
    
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const getMessages = async (limit = 50) => {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(limit)
    
    return { data, error }
  } catch (err) {
    return { data: [], error: err }
  }
}

export const subscribeToMessages = (callback) => {
  if (!supabase) {
    return { unsubscribe: () => {} }
  }
  
  try {
    return supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages' 
        }, 
        callback
      )
      .subscribe()
  } catch (err) {
    console.error('Error subscribing to messages:', err)
    return { unsubscribe: () => {} }
  }
}

// User profile functions
export const getUserProfile = async (userId) => {
  if (!supabase || !userId) {
    return { data: null, error: { message: 'Invalid parameters' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const updateUserProfile = async (userId, profileData) => {
  if (!supabase || !userId || !profileData) {
    return { data: null, error: { message: 'Invalid parameters' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
    
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const insertUserProfile = async (profileData) => {
  if (!supabase || !profileData) {
    return { data: null, error: { message: 'Invalid parameters' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
    
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}