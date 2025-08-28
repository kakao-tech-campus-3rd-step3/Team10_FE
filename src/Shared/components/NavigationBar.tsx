import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${theme.spacing(4)} 0;
  background-color: #dbc399ff; 
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(1)};
  cursor: pointer; 
`;

const IconPlaceholder = styled.div`
  width: ${theme.spacing(15)}; 
  height: ${theme.spacing(15)};
  background-color: #E0E0E0; 
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${theme.colors.primary};
  font-size: 24px; 
  color: ${theme.colors.primary}; 
`;

const NavText = styled.span`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 14px;
  color: ${theme.colors.text};
`;

const NavigationBar = () => {
  const navItems = [
    { name: '꾸미기', icon: '🌱' },     
    { name: '랭크', icon: '🏆' },
    { name: '학습 기록', icon: '✅' },
    { name: '마이 페이지', icon: '📋' },
  ];

  return (
    <NavWrapper>
      {navItems.map((item) => (
        <NavItem key={item.name}>
          <IconPlaceholder>{item.icon}</IconPlaceholder>
          <NavText>{item.name}</NavText>
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default NavigationBar;