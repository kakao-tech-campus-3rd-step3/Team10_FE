import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import type { ReactNode } from 'react';

type ContainerProps = {
  $scrollable?: boolean;
  $hasBottomNav?: boolean; // 하단 네비게이션 바가 있는지 여부
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container = ({
  $scrollable,
  $hasBottomNav = true,
  children,
  ...props
}: ContainerProps) => {
  return (
    <StyledContainer {...props}>
      <ScrollableArea $scrollable={$scrollable}>{children}</ScrollableArea>
      {$hasBottomNav && <BottomSpacer />}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100vh;
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

const BottomSpacer = styled.div`
  width: 100%;
  height: ${theme.spacing(15)};
  background-color: transparent;
  flex-shrink: 0;
  z-index: -100;
`;
