import styled from '@emotion/styled';
import { ChracterBox } from './ChracterBox';
import { theme } from '@/styles/theme';
import type { RankingUser } from './types';
import { useTopRankList } from './hooks/useTopRankList';

export const TopRankList = ({ topRankingUsers }: { topRankingUsers: RankingUser[] }) => {
  const { arranged, rankLabels } = useTopRankList(topRankingUsers);

  return (
    <Wrapper>
      {arranged.map((user, idx) => (
        <ChracterBox
          key={`${user.nickname}-${idx}`}
          $rank={rankLabels[idx]}
          name={user.nickname}
          score={user.point}
        />
      ))}
    </Wrapper>
  );
};

export default TopRankList;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing(2)};
  gap: clamp(8px, 2vw, ${theme.spacing(3)});
  margin-top: ${theme.spacing(4)};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
