import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navigation';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavWrapper role="navigation" aria-label="메인 네비게이션">
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.path}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
          $isLongText={item.name === '마이 페이지'}
          role="button"
          aria-label={`${item.name} 페이지로 이동`}
          aria-current={location.pathname === item.path ? 'page' : undefined}
        >
          {item.name}
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default NavigationBar;

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: ${theme.spacing(15)};
  max-width: 720px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid ${theme.colors.line};
  background-color: ${theme.colors.background};
  z-index: 1000;
`;

const NavItem = styled.div<{ active?: boolean; $isLongText?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  min-height: 100%;
  line-height: 1.3;

  ${(props) =>
    props.$isLongText &&
    `
    @media (max-width: 400px) {
      font-size: 15px;
    }
    @media (max-width: 360px) {
      font-size: 14px;
    }
  `}

  &::after {
    content: '';
    display: ${(props) => (props.active ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 15%;
    width: 70%;
    height: 2px;
    background-color: ${theme.colors.secondary};
  }
`;
