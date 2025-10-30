import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
type RecordListData = {
  questionId: number;
  questionSubject: string;
  questionText: string;
};
export const RecordList = ({ data }: { data: RecordListData[] }) => {
  return (
    <Container>
      {data.map((item) => (
        <QuestionContainer key={item.questionId}>
          <QuestionSubject>{item.questionSubject}</QuestionSubject>
          <QuestionText>{item.questionText}</QuestionText>
        </QuestionContainer>
      ))}
    </Container>
  );
};

export default RecordList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 98%;
  height: 100%;
  background-color: #ffffff;
  padding: ${theme.spacing(4)};
  position: relative;
  border: 1px solid #c1c1c1;
  border-radius: ${theme.spacing(4)};
  margin: ${theme.spacing(2)} ${theme.spacing(2)};
`;
const QuestionSubject = styled.span`
  width: 20%;
  font-size: 16px;
  font-weight: ${theme.font.bold.fontWeight};
  color: #000000;
`;
const QuestionText = styled.span`
  width: 80%;
  font-size: 16px;
  font-weight: ${theme.font.regular.fontWeight};
  color: #000000;
`;
