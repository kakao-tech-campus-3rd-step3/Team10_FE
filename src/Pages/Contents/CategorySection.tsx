import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { categoryContents } from './constants';

export const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/contents/category/${categoryId}`);
  };

  return (
    <CategorySectionStyled>
      <Line />
      <CategoryTitle>꼭 알아야 할 금융 상품</CategoryTitle>
      <CategoryGrid>
        {categoryContents.map((content) => (
          <CategoryCard key={content.id} onClick={() => handleCategoryClick(content.id)}>
            <CategoryIcon>{content.icon}</CategoryIcon>
            <CategoryName>{content.title}</CategoryName>
            <CategoryDescription>{content.subtitle}</CategoryDescription>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </CategorySectionStyled>
  );
};

const CategorySectionStyled = styled.section`
  margin-top: ${theme.spacing(2)};
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
`;

const CategoryTitle = styled.h2`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(3)} 0;
  text-align: center;
  margin-bottom: ${theme.spacing(6)};
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing(3)};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CategoryCard = styled.div`
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

const CategoryIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing(2)};
`;

const CategoryName = styled.h3`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(1)} 0;
`;

const CategoryDescription = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 12px;
  color: #666666;
  margin: 0;
  line-height: 1.4;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e9ecef;
  margin: ${theme.spacing(4)} 0;
`;
