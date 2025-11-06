import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type RankButtonProps = {
  $isActive: boolean;
  buttonText?: string;
  onClick?: () => void;
};

export const SelectableButton = ({
  $isActive,
  buttonText,
  onClick,
  role,
  ariaSelected,
  ariaLabel,
}: RankButtonProps & { role?: string; ariaSelected?: boolean; ariaLabel?: string }) => {
  return (
    <Button
      $isActive={$isActive}
      onClick={onClick}
      type="button"
      role={role}
      aria-selected={ariaSelected}
      aria-label={ariaLabel}
    >
      <ButtonText $isActive={$isActive}>{buttonText}</ButtonText>
    </Button>
  );
};

export default SelectableButton;

const Button = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.secondary : theme.colors.inactive};
  width: min(295px, calc((100% + 40px) / 2));
  min-width: max-content;
  height: 48px;
  flex: 0 1 auto;
  border-radius: ${theme.spacing(2)};
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ $isActive }) => ($isActive ? '1' : '0')};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

const ButtonText = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : theme.colors.secondary)};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 18px;
  white-space: nowrap;
`;
