import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wfxmenunojwolgfnlqcs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeG1lbnVub2p3b2xnZm5scWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjMyNTUsImV4cCI6MjA5MTMzOTI1NX0.YmcAuyziw1kZiWcRTzxSjvOS-N0u14_jJLp2xlz13G0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const aboutContent = {
  p1: "법학이 '-에서 0으로 되돌리는 일'이었다면,<br/>게임은 누군가의 하루를 <strong>'0에서 +가 되는 경험'</strong>으로 만드는 일입니다.<br/>탄탄한 시스템의 논리적 뼈대 위에서,<br/>유저의 마음에 즐거움이라는 <strong>감성을 채워넣는 것</strong> —<br/>그것이 제가 생각하는 게임 기획의 본질입니다.",
  p2: "저는 누군가의 하루를 움직이는,<br/>그 <strong>+를 설계하는 기획자</strong>가 되겠습니다."
};

async function update() {
  const { error } = await supabase
    .from('portfolio_content')
    .upsert({ key: 'about_content', content: aboutContent }, { onConflict: 'key' });

  if (error) {
    console.error('❌ 실패:', error.message);
  } else {
    console.log('✅ about_content Supabase 동기화 완료!');
    console.log('p1:', aboutContent.p1.slice(0, 40) + '...');
    console.log('p2:', aboutContent.p2);
  }
}
update();
