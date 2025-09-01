import styled from '@emotion/styled';
import { RankButton } from './RankButton';

export const RankTabs = ({
  isActive,
  onSelect,
}: {
  isActive: boolean;
  onSelect: (active: boolean) => void;
}) => {
  return (
    <Wrapper>
      <RankButton $isActive={isActive} buttonText="점수 랭킹" onClick={() => onSelect(true)} />
      <RankButton $isActive={!isActive} buttonText="성실 랭킹" onClick={() => onSelect(false)} />
    </Wrapper>
  );
};

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
