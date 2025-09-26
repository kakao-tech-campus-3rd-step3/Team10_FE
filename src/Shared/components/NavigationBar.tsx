import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.line};
  background-color: ${theme.colors.background};
`;

const NavItem = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: ${theme.spacing(3)} 0;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${(props) => (props.active ? theme.colors.secondary : theme.colors.text)};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.active ? 'block' : 'none')};
    position: absolute;
    bottom: -2px;
    left: 15%;
    width: 70%;
    height: 2px;
    background-color: ${theme.colors.secondary};
  }
`;

export const NavigationBar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: '꾸미기', path: '/character' },
    { name: '랭크', path: '/rank' },
    { name: '홈', path: '/home' },
    { name: '학습 기록', path: '/record' },
    { name: '마이 페이지', path: '/mypage' },
  ];

  return (
    <NavWrapper>
      {navItems.map((item) => (
        <NavItem
          key={item.name}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default NavigationBar;
