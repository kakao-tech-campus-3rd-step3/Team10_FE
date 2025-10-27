import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const ContentsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  min-height: 100vh;
`;

export const MoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${theme.spacing(3)} ${theme.spacing(4)};
  background-color: rgb(255, 255, 255);
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  background-color: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: ${theme.spacing(3)};
  padding: ${theme.spacing(3)} ${theme.spacing(4)};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ButtonIcon = styled.span<{ $isExpanded: boolean }>`
  font-size: 12px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const AllContentsSection = styled.section`
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AllContentsTitle = styled.h2`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(3)} 0;
  text-align: center;
`;

export const AllContentsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(3)};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CategorySection = styled.section`
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
`;

export const CategoryTitle = styled.h2`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(3)} 0;
  text-align: center;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing(3)};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CategoryCard = styled.div`
  background-color: #ffffff;
  border-radius: ${theme.spacing(2)};
  padding: ${theme.spacing(3)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CategoryIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing(2)};
`;

export const CategoryName = styled.h3`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(1)} 0;
`;

export const CategoryDescription = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 12px;
  color: #666666;
  margin: 0;
  line-height: 1.4;
`;
