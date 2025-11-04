import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import { SelectableButtonTabs } from '@/Shared/components/SelectableButton/SelectableButtonTabs';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { useState } from 'react';
import { RecordListSection } from './RecordListSection';
import CharacterMain from '@/assets/HomeImg/character.webp';

export const LearningRecordPage = () => {
  const [isIncorrect, setIsIncorrect] = useState<boolean>(true);
  return (
    <Container $scrollable={true}>
      <Header title="학습 기록" hasPrevPage={true} />
      <NavigationBar />
      <LearningRecordPageContainer>
        <SelectableButtonTabs
          isActive={isIncorrect}
          onSelect={setIsIncorrect}
          firstButtonText="오답노트"
          secondButtonText="북마크"
        />
        <RecordListSection isIncorrect={isIncorrect} />
      </LearningRecordPageContainer>
      <CharacterSectionWrapper>
        <Character src={CharacterMain} alt="캐릭터" />
      </CharacterSectionWrapper>
    </Container>
  );
};

export default LearningRecordPage;

const LearningRecordPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing(8)} ${theme.spacing(3)};
  padding-top: ${theme.spacing(12)};
  position: relative;
  background-color: #ffffff;
  border-radius: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(6)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
`;

const CharacterSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing(3)};
`;

const Character = styled.img`
  width: 145px;
  height: auto;
  object-fit: contain;
`;
