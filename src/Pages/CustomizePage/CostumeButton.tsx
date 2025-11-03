import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

type CostumeButtonProps = {
  id: number;
  img: string;
  active: boolean;
  onSelect: (id: number) => void;
};

export const CostumeButton = ({ id, img, active = false, onSelect }: CostumeButtonProps) => {
  return (
    <Container type="button" data-active={active ? 'true' : 'false'} onClick={() => onSelect(id)}>
      <Thumb src={img} alt={`${id}번 이미지`} />
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
