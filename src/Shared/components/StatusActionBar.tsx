import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import CalenderIcon from '@/assets/HomeImg/calendar.png';
import { useNavigate } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { UserTier } from '@/Pages/TierPage/types';
import { useCurrentTier } from '@/Pages/TierPage/hooks/useCurrentTier';

export type StatusActionBarProps = {
  calendarIconSrc?: string;
  calendarIconAlt?: string;
  onCalendarClick?: () => void;
  calendarIconSize?: number;
};

export const StatusActionBar = ({
  calendarIconSrc = CalenderIcon,
  calendarIconAlt = '출석 체크 캘린더',
  onCalendarClick,
  calendarIconSize = 48,
}: StatusActionBarProps) => {
  const navigate = useNavigate();
  const { data: userTier } = useQueryApi<UserTier>(['user', 'tier'], '/users/me/tier');

  const currentTier = useCurrentTier(userTier);

  const handleTierClick = () => {
    navigate('/tier');
  };

  const handleCalendarClick = () => {
    if (onCalendarClick) {
      onCalendarClick();
    } else {
      navigate('/attendance');
    }
  };

  return (
    <Wrapper>
      <TierButton type="button" onClick={handleTierClick} aria-label="티어 정보 보기">
        <TierIcon src={currentTier.icon} alt={`${currentTier.label} 티어 아이콘`} />
        <TierLabel>{currentTier.label}</TierLabel>
      </TierButton>
      <CalendarButton type="button" aria-label={calendarIconAlt} onClick={handleCalendarClick}>
        <CalendarIcon src={calendarIconSrc} alt={calendarIconAlt} $size={calendarIconSize} />
      </CalendarButton>
    </Wrapper>
  );
};

export default StatusActionBar;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing(8)};
  margin-top: ${theme.spacing(4)};
`;

const TierButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }
`;

const TierIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const TierLabel = styled.span`
  color: ${theme.colors.text};
`;

const CalendarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const CalendarIcon = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  object-fit: contain;
`;
