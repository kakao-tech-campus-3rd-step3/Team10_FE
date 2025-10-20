/**
 * 네비게이션 관련 상수들
 */

export interface NavItem {
  name: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: '꾸미기', path: '/character' },
  { name: '랭크', path: '/rank' },
  { name: '홈', path: '/home' },
  { name: '학습 기록', path: '/record' },
  { name: '마이 페이지', path: '/mypage' },
] as const;
