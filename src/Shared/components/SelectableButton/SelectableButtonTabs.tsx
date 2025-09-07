import styled from '@emotion/styled';
import { SelectableButton } from './SelectableButton';

export const SelectableButtonTabs = ({
  isActive,
  onSelect,
  firstButtonText,
  secondButtonText,
}: {
  isActive: boolean;
  onSelect: (active: boolean) => void;
  firstButtonText: string;
  secondButtonText: string;
}) => {
  return (
    <Wrapper>
      <SelectableButton
        $isActive={isActive}
        buttonText={firstButtonText}
        onClick={() => onSelect(true)}
      />
      <SelectableButton
        $isActive={!isActive}
        buttonText={secondButtonText}
        onClick={() => onSelect(false)}
      />
    </Wrapper>
  );
};

export default SelectableButtonTabs;

const Wrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: -20px;
  align-items: center;

  button + button {
    margin-left: min(0px, calc(100% - 420px));
  }
`;
