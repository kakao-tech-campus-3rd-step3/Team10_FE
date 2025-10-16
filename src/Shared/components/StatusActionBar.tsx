import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import CalenderIcon from '@/assets/HomeImg/calendar.png';
import TierIcon from '@/assets/HomeImg/tier.png';
import { useNavigate } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';

interface TierInfoResponse {
  userRatingPoint: number;
  userTier: string;
}

export type StatusActionBarProps = {
  leftIcon?: ReactNode;
  rightIconSrc?: string;
  rightIconAlt?: string;
  onRightClick?: () => void;
  rightIconSizePx?: number;
};

export const StatusActionBar = ({
  rightIconSrc = CalenderIcon,
  rightIconAlt = '캘린더',
  rightIconSizePx = 48,
}: StatusActionBarProps) => {
  const navigate = useNavigate();

  const handleLabelClick = () => {
    navigate('/tier');
  };
  const { data: TierInfoData } = useQueryApi<TierInfoResponse>(['userTier'], '/users/me/tier');
  return (
    <Wrapper>
      <Label onClick={handleLabelClick}>
        <LeftIcon src={TierIcon} alt="티어 아이콘" />
        {TierInfoData?.userTier}
      </Label>
      <RightButton type="button" aria-label={rightIconAlt}>
        <RightIcon src={rightIconSrc} alt={rightIconAlt} $size={rightIconSizePx} />
      </RightButton>
    </Wrapper>
  );
};

export default StatusActionBar;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing(5)};
  margin-top: ${theme.spacing(4)};
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
`;

const LeftIcon = styled.img`
  width: 48px;
`;

const RightButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const RightIcon = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
`;
