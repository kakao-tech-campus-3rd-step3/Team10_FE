import { RecordList } from './RecordList';
import LearningRecordData from '@/MockData/LearningRecord.json';

export const RecordListSection = ({ isIncorrect }: { isIncorrect: boolean }) => {
  const { data } = LearningRecordData;
  const { Incorrect, Bookmarked } = data;
  return <RecordList data={isIncorrect ? Incorrect : Bookmarked} />;
};

export default RecordListSection;
