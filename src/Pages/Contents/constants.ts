export interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
}

// 슬라이드 컨텐츠 데이터
export const slideContents: SlideContent[] = [
  {
    id: 1,
    title: '하루에 필요한 단 한 장의 카드',
    subtitle: '토스뱅크 하나카드 Day',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
  },
  {
    id: 2,
    title: '최고 연 5%(기본 연 1%, 세전) 태아적금',
    subtitle: '곧 태어날 우리 아이를 위한 첫 번째 선물로 토스뱅크 태아적금 어떠세요?',
    buttonText: '자세히 보기',
    backgroundColor: '#45B7D1',
  },
  {
    id: 3,
    title: '새로운 투자 상품 출시',
    subtitle: '안정적인 수익을 원한다면 토스뱅크의 새로운 투자 상품을 확인해보세요',
    buttonText: '자세히 보기',
    backgroundColor: '#96CEB4',
  },
  {
    id: 4,
    title: '금리 인상에 대비하세요',
    subtitle: '변동금리 대출 상품으로 금리 상승 리스크를 관리할 수 있습니다',
    buttonText: '자세히 보기',
    backgroundColor: '#FFEAA7',
  },
];

// 전체 컨텐츠 데이터 (슬라이드에 포함되지 않은 추가 컨텐츠들)
export const allContents: SlideContent[] = [
  {
    id: 5,
    title: '스마트 예금 상품',
    subtitle: 'AI가 최적의 금리를 찾아주는 스마트 예금 상품을 만나보세요',
    buttonText: '자세히 보기',
    backgroundColor: '#A8E6CF',
  },
  {
    id: 6,
    title: '부동산 투자 펀드',
    subtitle: '안정적인 부동산 투자로 안전한 자산 증식을 시작하세요',
    buttonText: '자세히 보기',
    backgroundColor: '#FFB6C1',
  },
  {
    id: 7,
    title: '환율 알림 서비스',
    subtitle: '실시간 환율 변동을 알려주는 스마트 알림 서비스',
    buttonText: '자세히 보기',
    backgroundColor: '#DDA0DD',
  },
  {
    id: 8,
    title: '금융 상담 서비스',
    subtitle: '전문가와 1:1 상담으로 맞춤형 금융 솔루션을 받아보세요',
    buttonText: '자세히 보기',
    backgroundColor: '#98D8C8',
  },
  {
    id: 9,
    title: '세금 절약 상품',
    subtitle: '연말정산과 세금 절약을 도와주는 특별 상품',
    buttonText: '자세히 보기',
    backgroundColor: '#F7DC6F',
  },
  {
    id: 10,
    title: '보험 비교 서비스',
    subtitle: '다양한 보험 상품을 한눈에 비교하고 최적의 선택을 하세요',
    buttonText: '자세히 보기',
    backgroundColor: '#BB8FCE',
  },
];
