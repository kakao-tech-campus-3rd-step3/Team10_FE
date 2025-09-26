import styled from '@emotion/styled';

type ContainerProps = {
  $scrollable?: boolean;
};

export const Container = styled.div<ContainerProps>`
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
