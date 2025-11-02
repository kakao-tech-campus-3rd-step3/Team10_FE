import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import CoinIcon from '@/assets/CustomizeImg/coin.png';

type CostumeButtonProps = {
  id: number;
  img: string;
  price: number;
  active: boolean;
  onSelect: (id: number) => void;
};

export const CostumeButton = ({ id, img, price, active = false, onSelect }: CostumeButtonProps) => {
  return (
    <Container type="button" data-active={active ? 'true' : 'false'} onClick={() => onSelect(id)}>
      <Thumb src={img} alt={`${id}번 이미지`} />
      <PriceRow>
        <CoinImgSmall src={CoinIcon} alt="코인" />
        <PriceText>{price}</PriceText>
      </PriceRow>
    </Container>
  );
};

export default CostumeButton;

const Container = styled.button`
  background-color: #ffffff;
  border-radius: ${theme.spacing(2)};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  &[data-active='true'] {
    border: 1px solid #277911;
    box-shadow:
      3px 6px 4px #277911,
      3px 6px 4px rgba(0, 0, 0, 0.5);
  }
`;

const Thumb = styled.img`
  width: 84px;
  height: 84px;
  object-fit: contain;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const CoinImgSmall = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const PriceText = styled.span`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 14px;
  color: ${theme.colors.text};
`;
