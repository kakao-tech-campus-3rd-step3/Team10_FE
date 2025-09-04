import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';

export const LearningRecordPage = () => {
  return (
    <Container>
      <Header title="학습 기록" />
      <NavigationBar />
      <StatusActionBar />
    </Container>
  );
};
