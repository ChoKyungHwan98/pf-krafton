import { createClient } from '@supabase/supabase-js';
import { RESUME_DATA } from './src/data.js';

const SUPABASE_URL = 'https://wfxmenunojwolgfnlqcs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeG1lbnVub2p3b2xnZm5scWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjMyNTUsImV4cCI6MjA5MTMzOTI1NX0.YmcAuyziw1kZiWcRTzxSjvOS-N0u14_jJLp2xlz13G0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function sync() {
  console.log("Upserting RESUME_DATA to Supabase...");
  const { data, error } = await supabase
    .from('portfolio_content')
    .upsert({ key: 'resume_data', content: RESUME_DATA }, { onConflict: 'key' });
    
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success! Data synced.");
  }
}

sync();
