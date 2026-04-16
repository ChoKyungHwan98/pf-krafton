import { createClient } from '@supabase/supabase-js';
import { RESUME_DATA, PROJECTS, PORTFOLIO_PROJECTS, GAME_HISTORY } from './src/data.js';

const SUPABASE_URL = 'https://wfxmenunojwolgfnlqcs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeG1lbnVub2p3b2xnZm5scWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjMyNTUsImV4cCI6MjA5MTMzOTI1NX0.YmcAuyziw1kZiWcRTzxSjvOS-N0u14_jJLp2xlz13G0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// NOTE: SKILLS is intentionally excluded — it contains React elements that cannot be JSON serialized.
// Skills data is managed as a static constant in App.tsx.
async function syncAll() {
  const syncItems = [
    { key: 'resume_data', content: RESUME_DATA },
    { key: 'projects_data', content: PROJECTS },
    { key: 'portfolio_projects', content: PORTFOLIO_PROJECTS },
    { key: 'game_history', content: GAME_HISTORY },
    { key: 'hero_content', content: {
      titleLine1: "기획의도를 알고",
      titleLine2: "목차를 쓸줄 아는 기획자",
      description: "법학의 치밀한 논리 구조를 게임 시스템 기획에 접목합니다.\n기획 의도가 흔들리지 않는 튼튼한 뼈대를 설계하여,\n\n어떤 변수에도 대응할 수 있는 견고한 재미를 구축합니다."
    }},
    { key: 'about_content', content: {
      p1: "저는 7년간 법학을 전공하며 **'기획 의도를 먼저 세우고 그것을 관통하는 목차를 작성하는 훈련'**을 반복했습니다. 이 능력은 복잡한 시스템 기획과 밸런싱을 설계할 때 그 진가를 발휘합니다.",
      p2: "저는 단순히 엑셀 수치를 채우는 것을 넘어, 코어 루프와 연계된 경제 시스템의 근본적인 문제(인플레이션 등)를 예측하고 이를 제어하는 기획을 지향합니다. 구조가 탄탄한 문서를 통해 팀원들을 설득하고 프로젝트의 비전을 이끌겠습니다."
    }}
  ];

  console.log("Starting Supabase sync (excluding skills_data)...");
  for (const item of syncItems) {
    const { error } = await supabase
      .from('portfolio_content')
      .upsert({ key: item.key, content: item.content }, { onConflict: 'key' });
    if (error) {
      console.error(`Error syncing ${item.key}:`, error.message);
    } else {
      console.log(`✓ ${item.key}`);
    }
  }
  console.log("Sync complete!");
}

syncAll();
