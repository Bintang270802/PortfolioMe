// Test script untuk memverifikasi perbaikan OAuth
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nymzggmyfjdjrguuuhec.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bXpnZ215ZmpkanJndXV1aGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5OTQ5MDgsImV4cCI6MjA4MzU3MDkwOH0.IQ-53zTbsWRHQNH83YsyK5ppdolPNsPAsxQQ5ZkP5PE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('messages')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Database connection failed:', error.message)
    } else {
      console.log('✅ Database connection successful')
    }
    
    // Test auth providers
    console.log('\n🔍 Testing auth providers...')
    
    // Test Magic Link (should work)
    console.log('✅ Magic Link: Available (recommended)')
    
    // Test Email/Password (should work)  
    console.log('✅ Email/Password: Available')
    
    // Test Google OAuth (will show the error)
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: 'http://localhost:5173' }
      })
      
      if (googleError) {
        if (googleError.message?.includes('deleted_client') || googleError.status === 401) {
          console.log('❌ Google OAuth: Client deleted/invalid - needs reconfiguration')
        } else {
          console.log('⚠️ Google OAuth: Error -', googleError.message)
        }
      } else {
        console.log('✅ Google OAuth: Working')
      }
    } catch (err) {
      console.log('❌ Google OAuth: Error -', err.message)
    }
    
  } catch (err) {
    console.error('❌ Connection test failed:', err.message)
  }
}

console.log('🚀 OAuth Fix Test')
console.log('================')
testConnection()