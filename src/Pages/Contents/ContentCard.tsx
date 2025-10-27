import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface ContentCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const ContentCard = ({
  title,
  subtitle,
  buttonText,
  backgroundColor = '#4ECDC4',
  onClick,
}: ContentCardProps) => {
  return (
    <CardContainer $backgroundColor={backgroundColor} onClick={onClick}>
      <CardTextContent>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardTextContent>
      <CardButton>{buttonText}</CardButton>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ $backgroundColor: string }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.$backgroundColor} 0%,
    ${(props) => props.$backgroundColor}CC 100%
  );
  border-radius: ${theme.spacing(3)};
  padding: ${theme.spacing(4)} ${theme.spacing(5)};
  color: white;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`;

const CardTitle = styled.h3`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 20px;
  margin: 0;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
  opacity: 0.9;
`;

const CardButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.spacing(1)};
  color: white;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 14px;
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;
