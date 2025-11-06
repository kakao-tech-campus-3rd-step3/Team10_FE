import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
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
`;

const TopSpacer = styled.div`
  width: 100%;
  height: ${theme.spacing(30)};
  background-color: transparent;
  flex-shrink: 0;
  z-index: -100;
`;

const HeaderSpacer = styled.div`
  width: 100%;
  height: ${theme.spacing(15)};
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
