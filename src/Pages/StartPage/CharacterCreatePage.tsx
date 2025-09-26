import styled from '@emotion/styled';
import NameInput from './NameInput';
import ConfirmButton from './ConfirmButton';
import CharacterImage from '@/assets/HomeImg/character.png';
import { useState } from 'react';
import { Container } from '@/Shared/components/Container';
import { useNavigate } from 'react-router-dom';

export const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/home');
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsNameValid(isValid);
  };

  const isButtonDisabled = !isNameValid;

  return (
    <CenteredContainer>
      <Title>콩식이 생성하기</Title>
      <CharacterImg src={CharacterImage} alt="콩식이" />
      <NameInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 지어주세요."
        onValidationChange={handleValidationChange}
      />
      <ConfirmButtonContainer>
        <ConfirmButton text="완료" onClick={handleConfirm} disabled={isButtonDisabled} />
      </ConfirmButtonContainer>
    </CenteredContainer>
  );
};

export default CharacterCreatePage;

const CenteredContainer = styled(Container)`
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CharacterImg = styled.img`
  width: 255px;
  height: 255px;
  object-fit: contain;
  margin: 26px 0 28px 0;
`;

const ConfirmButtonContainer = styled.div`
  margin-top: 24px;
`;
