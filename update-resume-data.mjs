/**
 * update-resume-data.mjs
 * resume_data에 birthDate 추가
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wfxmenunojwolgfnlqcs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeG1lbnVub2p3b2xnZm5scWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjMyNTUsImV4cCI6MjA5MTMzOTI1NX0.YmcAuyziw1kZiWcRTzxSjvOS-N0u14_jJLp2xlz13G0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function update() {
  // 현재 데이터 가져오기
  const { data, error: fetchError } = await supabase
    .from('portfolio_content')
    .select('content')
    .eq('key', 'resume_data')
    .single();

  if (fetchError) {
    console.error('❌ 현재 데이터 불러오기 실패:', fetchError.message);
    return;
  }

  const currentContent = data.content;
  currentContent.birthDate = "1998.06.24"; // 생년월일 추가

  // 업데이트
  const { error: updateError } = await supabase
    .from('portfolio_content')
    .update({ content: currentContent })
    .eq('key', 'resume_data');

  if (updateError) {
    console.error('❌ 실패:', updateError.message);
  } else {
    console.log('✅ resume_data에 birthDate 추가 완료!');
  }
}

update();
