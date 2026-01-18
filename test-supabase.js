// Test Supabase Connection
// Jalankan dengan: node test-supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nymzggmyfjdjrguuuhec.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bXpnZ215ZmpkanJndXV1aGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5OTQ5MDgsImV4cCI6MjA4MzU3MDkwOH0.IQ-53zTbsWRHQNH83YsyK5ppdolPNsPAsxQQ5ZkP5PE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('messages')
      .select('count', { count: 'exact' })
    
    if (error) {
      console.error('❌ Connection error:', error)
      return
    }
    
    console.log('✅ Connection successful!')
    console.log('📊 Messages count:', data)
    
    // Test 2: Check table structure
    const { data: tableData, error: tableError } = await supabase
      .from('messages')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.error('❌ Table structure error:', tableError)
    } else {
      console.log('✅ Table structure OK')
      console.log('📋 Sample data:', tableData)
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

testConnection()