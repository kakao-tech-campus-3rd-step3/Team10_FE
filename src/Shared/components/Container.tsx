import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import type { ReactNode } from 'react';

type ContainerProps = {
  $scrollable?: boolean;
  children?: ReactNode;
};

export const Container = ({ $scrollable, children, ...props }: ContainerProps) => {
  return (
    <StyledContainer $scrollable={$scrollable} {...props}>
      {children}
      <BottomSpacer />
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ $scrollable?: boolean }>`
  width: 100%;
  max-width: 720px;
  height: 100%;
  min-height: 812px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: ${({ $scrollable }) => ($scrollable ? 'auto' : 'hidden')};
  -webkit-overflow-scrolling: touch;
`;

const BottomSpacer = styled.div`
  width: 100%;
  height: ${theme.spacing(15)};
  flex-shrink: 0;
`;
