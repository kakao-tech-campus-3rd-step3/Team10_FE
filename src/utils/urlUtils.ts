/**
 * URL을 절대 경로로 변환하는 유틸리티 함수
 * @param u - 변환할 URL 문자열 (선택적)
 * @returns 절대 경로 URL 문자열
 */
export const toAbsoluteUrl = (u?: string) => {
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  return `${base}${u.startsWith('/') ? u : `/${u}`}`;
};
