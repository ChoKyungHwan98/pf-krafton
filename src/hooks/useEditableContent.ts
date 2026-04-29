import { useState, useRef, useEffect, useCallback } from 'react';

const SUPABASE_TIMEOUT_MS = 3000;

/**
 * 편집 가능한 콘텐츠를 관리하는 훅.
 *
 * 현재 상태: Supabase 연동이 비활성화되어 있으며,
 * 로컬 initialData를 직접 사용합니다.
 * Supabase 연동을 재활성화하려면 아래 주석을 해제하세요.
 */
export const useEditableContent = <T>(initialData: T, key: string): [T, (d: T) => void, boolean] => {
  const [data, setData] = useState<T>(initialData);
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Supabase 비활성화 — 로컬 데이터를 즉시 사용
    setLoaded(true);
  }, [key]);

  const updateData = useCallback((newData: T) => {
    setData(newData);
    // Supabase 저장 비활성화 (fetch와 일관성 유지)
    // if (debounceRef.current) clearTimeout(debounceRef.current);
    // debounceRef.current = setTimeout(() => saveToSupabase(newData), 500);
  }, []);

  return [data, updateData, loaded];
};
