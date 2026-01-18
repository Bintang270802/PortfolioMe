// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Ambil konfigurasi dari environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cek apakah konfigurasi valid
const isValidConfig = supabaseUrl && 
                     supabaseAnonKey && 
                     supabaseUrl !== 'your_supabase_project_url_here' && 
                     supabaseAnonKey !== 'your_supabase_anon_key_here' &&
                     supabaseUrl.startsWith('http')

// Buat client hanya jika konfigurasi valid
export const supabase = isValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Export status konfigurasi
export const isSupabaseConfigured = isValidConfig

// Auth functions dengan error handling
export const loginWithGoogle = async () => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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

// Alternative: Email/Password signup (temporary)
export const signUpWithEmail = async (email, password, displayName) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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

// Alternative: Email/Password login
export const loginWithEmail = async (email, password) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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

// Magic Link Login (easiest alternative)
export const loginWithMagicLink = async (email) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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
  
  console.log('Inserting message to Supabase:', messageData); // Debug log
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
    
    console.log('Supabase response:', { data, error }); // Debug log
    
    return { data, error }
  } catch (err) {
    console.error('Insert message catch error:', err); // Debug log
    return { data: null, error: err }
  }
}

export const getMessages = async () => {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase not configured' } }
  }
  
  console.log('Getting messages from Supabase...'); // Debug log
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    
    console.log('Messages response:', { data, error }); // Debug log
    
    return { data, error }
  } catch (err) {
    console.error('Get messages catch error:', err); // Debug log
    return { data: [], error: err }
  }
}

export const subscribeToMessages = (callback) => {
  if (!supabase) {
    console.warn('Supabase not configured - real-time subscriptions disabled')
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
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
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

// Log status
if (!isValidConfig) {
  console.warn('⚠️ Supabase belum dikonfigurasi. Chat room tidak akan berfungsi. Silakan setup Supabase terlebih dahulu.')
}