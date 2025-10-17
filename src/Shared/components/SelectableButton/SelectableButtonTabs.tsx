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
  width: 90%;
  max-width: 90%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  top: -20px;
  align-items: center;
  button + button {
    margin-left: -40px;
  }
  flex-wrap: nowrap;
  overflow: visible;
`;
