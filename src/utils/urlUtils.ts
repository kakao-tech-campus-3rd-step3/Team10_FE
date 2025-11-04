/**
 * URL을 절대 경로로 변환하는 유틸리티 함수
 * @param u - 변환할 URL 문자열 (선택적)
 * @returns 절대 경로 URL 문자열
 */
const API_URL = import.meta.env.VITE_API_URL ?? '';
const API_ORIGIN = new URL(API_URL).origin;

export const toAbsoluteUrl = (u?: string) => {
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  return `${API_ORIGIN}${u.startsWith('/') ? u : `/${u}`}`;
};
