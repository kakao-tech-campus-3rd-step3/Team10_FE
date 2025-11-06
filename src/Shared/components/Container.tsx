import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type ContainerProps = {
  $scrollable?: boolean;
  $hasTopNav?: boolean; // 상단 네비게이션 바가 있는지 여부 (Header + NavigationBar)
  $hasHeader?: boolean; // Header만 있는지 여부 (NavigationBar 없음)
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container = ({
  $scrollable,
  $hasTopNav = true,
  $hasHeader = false,
  children,
  ...props
}: ContainerProps) => {
  return (
    <StyledContainer {...props}>
      {$hasTopNav ? <TopSpacer /> : $hasHeader ? <HeaderSpacer /> : <SafeAreaSpacer />}
      <ScrollableArea $scrollable={$scrollable}>{children}</ScrollableArea>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100dvh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ScrollableArea = styled.div<{ $scrollable?: boolean }>`
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: ${({ $scrollable }) => ($scrollable ? 'auto' : 'hidden')};
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  width: 100%;
  scrollbar-gutter: stable both-edges;

  /* Chrome, Safari, Edge 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  /* Firefox 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  /* NavigationBar와 Header가 이 영역의 너비에 영향받지 않도록 */
  > header,
  > nav {
    width: 100%;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TopSpacer = styled.div`
  width: 100%;
  height: 0;
  background-color: transparent;
  flex-shrink: 0;
  z-index: -100;
`;

const HeaderSpacer = styled.div`
  width: 100%;
  height: 0;
  background-color: transparent;
  flex-shrink: 0;
  z-index: -100;
`;

const SafeAreaSpacer = styled.div`
  width: 100%;
  height: 0;
  background-color: transparent;
  flex-shrink: 0;
  z-index: -100;
`;
