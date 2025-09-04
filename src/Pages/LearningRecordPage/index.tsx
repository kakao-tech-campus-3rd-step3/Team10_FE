import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import { SelectableButtonTabs } from '@/Shared/components/SelectableButton/SelectableButtonTabs';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { useState } from 'react';
import { RecordListSection } from './RecordListSection';

export const LearningRecordPage = () => {
  const [isIncorrect, setIsIncorrect] = useState<boolean>(true);
  return (
    <Container>
      <Header title="학습 기록" hasPrevPage={true} />
      <NavigationBar />
      <StatusActionBar />
      <LearningRecordPageContainer>
        <SelectableButtonTabs
          isActive={isIncorrect}
          onSelect={setIsIncorrect}
          firstButtonText="오답노트"
          secondButtonText="북마크"
        />
        <RecordListSection isIncorrect={isIncorrect} />
      </LearningRecordPageContainer>
    </Container>
  );
};
const LearningRecordPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing(8)} ${theme.spacing(3)};
  padding-top: ${theme.spacing(12)};
  position: relative;
  background-color: #ffffff;
  border-radius: ${theme.spacing(5)};
  padding-bottom: ${theme.spacing(6)};
`;
