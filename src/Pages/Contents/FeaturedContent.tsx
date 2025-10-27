import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface FeaturedContentProps {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const FeaturedContent = ({
  title,
  subtitle,
  buttonText,
  backgroundColor = '#FF6B6B',
  onClick,
}: FeaturedContentProps) => {
  return (
    <FeaturedContainer $backgroundColor={backgroundColor} onClick={onClick}>
      <FeaturedContentWrapper>
        <FeaturedTitle>{title}</FeaturedTitle>
        <FeaturedSubtitle>{subtitle}</FeaturedSubtitle>
        <FeaturedButton>{buttonText}</FeaturedButton>
      </FeaturedContentWrapper>
    </FeaturedContainer>
  );
};

const FeaturedContainer = styled.div<{ $backgroundColor: string }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.$backgroundColor} 0%,
    ${(props) => props.$backgroundColor}CC 100%
  );
  margin: ${theme.spacing(4)};
  border-radius: ${theme.spacing(3)};
  padding: ${theme.spacing(5)};
  color: white;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturedContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`;

const FeaturedTitle = styled.h1`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 28px;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FeaturedSubtitle = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FeaturedButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.spacing(2)};
  color: white;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  padding: ${theme.spacing(3)} ${theme.spacing(4)};
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  margin-top: ${theme.spacing(2)};

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;
