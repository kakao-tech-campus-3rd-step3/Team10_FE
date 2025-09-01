import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

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
  background-color: #e0e0e0;
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
    { name: '꾸미기', icon: '🌱', path: '/character' },
    { name: '랭크', icon: '🏆', path: '/rank' },
    { name: '학습 기록', icon: '✅', path: '/record' },
    { name: '마이 페이지', icon: '📋', path: '/my' },
  ];
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <NavWrapper>
      {navItems.map((item) => (
        <NavItem key={item.name} onClick={() => handleNavigate(item.path)}>
          <IconPlaceholder>{item.icon}</IconPlaceholder>
          <NavText>{item.name}</NavText>
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default NavigationBar;
