import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type RankButtonProps = {
  $isActive: boolean;
  buttonText?: string;
  onClick?: () => void;
};

export const RankButton = ({ $isActive, buttonText, onClick }: RankButtonProps) => {
  return (
    <Button $isActive={$isActive} onClick={onClick}>
      <ButtonText $isActive={$isActive}>{buttonText}</ButtonText>
    </Button>
  );
};
const Button = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.secondary : theme.colors.inactive};
  width: ${({ $isActive }) => ($isActive ? '240px' : '180px')};
  height: ${({ $isActive }) => ($isActive ? '70px' : '58px')};
  flex-shrink: 0;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ $isActive }) => ($isActive ? '1' : '0')};
`;
const ButtonText = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#B1B1B1')};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: ${({ $isActive }) => ($isActive ? '32px' : '18px')};
`;
