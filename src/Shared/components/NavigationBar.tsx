import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navigation';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavWrapper>
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.path}
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
  word-break: keep-all;
  white-space: normal;

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
