import { useState, useEffect } from 'react';

/**
 * 실제 모바일 기기 여부를 판별합니다.
 *  - navigator.userAgent 로 iOS / Android OS 검출
 *  - (pointer: coarse) and (hover: none) 로 터치 전용 기기 검출
 * 데스크톱 브라우저에서 창을 줄여도 절대 true가 되지 않습니다.
 */
const detectMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  // 1) User-Agent 기반 — 실제 모바일 OS
  const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);

  // 2) 포인터 미디어 쿼리 — 터치 전용 (마우스 없음)
  //    pointer: coarse  → 손가락 터치
  //    hover: none      → 호버 불가 = 마우스 없음
  const touchOnly =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse) and (hover: none)').matches;

  return mobileUA || touchOnly;
};

export const useIsMobile = () => {
  // 최초 렌더 시 한 번만 판별 (기기 특성은 세션 중 바뀌지 않음)
  const [isMobile] = useState<boolean>(() => detectMobileDevice());
  return isMobile;
};
