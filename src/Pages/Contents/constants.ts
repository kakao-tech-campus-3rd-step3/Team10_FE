export interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
  hashtag: string[];
}

export interface DetailContent {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
  url: string;
  content: string;
}

export interface CategoryContent {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}
// 전체 컨텐츠 데이터
export const allContents: SlideContent[] = [
  {
    id: 1,
    title: '햇살론카드',
    subtitle: '저신용자의 신용카드 발급 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    hashtag: ['자산 지원'],
  },
  {
    id: 2,
    title: '햇살론카드',
    subtitle: '저신용자의 신용카드 발급 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    hashtag: ['자산 지원'],
  },
  {
    id: 3,
    title: '햇살론카드',
    subtitle: '저신용자의 신용카드 발급 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    hashtag: ['자산 지원'],
  },
  {
    id: 4,
    title: '햇살론카드',
    subtitle: '저신용자의 신용카드 발급 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    hashtag: ['자산 지원'],
  },
];

export const detailContents: DetailContent[] = [
  {
    id: 1,
    title: '햇살론카드',
    subtitle: '저신용자의 신용카드 발급 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    url: 'https://www.kinfa.or.kr/financialProduct/hessalLoanCard.do',
    content: `<h3>햇살론카드 상품 정보 요약</h3><h4>1. 상품 개요</h4><p>신용카드 발급이 어려운 저신용자(신용평점 하위 20% 이하) 분들의 금융상품 선택권을 확대하고, 할부·포인트 등 카드 이용 혜택에서 소외되지 않도록 지원하는 신용카드 발급 지원 상품입니다. (금융회사 출연금 재원)</p><h4>2. 지원대상 (신청 자격)</h4><p>다음 세 가지 조건을 모두 충족해야 합니다.</p><ul><li><strong>소득 기준:</strong> 연 가처분소득 600만원 이상</li><li><strong>신용 기준:</strong> 신용평점 하위 20% 이하 (KCB 700점 또는 NICE 749점 이하 - 둘 중 이용자에게 유리한 기준 적용)</li><li><strong>교육 기준:</strong> 서민금융진흥원 금융교육포털에서 '햇살론카드 필수교육' (3과목)을 모두 이수한 자</li></ul><h4>3. 보증 한도 (카드 이용 한도)</h4><ul><li><strong>신규 발급:</strong> 최대 200만원 (보증한도)<ul><li>실제 카드 이용한도는 <strong>보증한도에서 20만원을 차감</strong>하여 부여됩니다. (예: 보증한도 200만원 시 카드 이용한도 180만원)</li></ul></li><li><strong>한도 증액:</strong> 1년 이상 성실 이용 시 최대 300만원까지 한도 증액이 가능합니다. (심사 필요)</li><li><strong>보증 기간:</strong> 최대 5년 (카드 이용기간과 동일)</li></ul><h4>4. 신청 절차</h4><ol><li><strong>보증 신청 (서민금융진흥원):</strong><ul><li>서민금융진흥원(서금원) 앱을 통해 보증 신청</li><li>서금원 금융교육포털에서 '햇살론카드 필수교육' 이수</li><li>보증약정 체결</li></ul></li><li><strong>카드 신청 (카드사):</strong><ul><li>보증약정 체결 후, 7개 협약 카드사 중 1곳을 선택하여 카드 발급 신청</li></ul></li></ol><h4>5. 취급 카드사 (7개)</h4><p>롯데, 현대, 국민, 삼성, 신한, 우리, 하나카드<br><em>(카드사별 연회비 및 할인/적립 혜택이 다르므로 비교 후 선택)</em></p><h4>6. 이용 제한 및 주요 특징</h4><ul><li><strong>이용 불가:</strong><ul><li>카드대출 (현금서비스, 카드론, 리볼빙)</li><li>결제대금 연기 및 분할납부</li><li>일부 업종 (유흥업종, 사행업종, 골프장 등)</li></ul></li><li><strong>주요 제한 사항:</strong><ul><li>1인당 1개 카드(사)만 발급 가능</li><li>할부 기간은 최대 6개월 이내로 제한</li><li>해외 결제 불가 (국내 전용)</li><li>가족카드, 후불하이패스 카드 발급 불가</li></ul></li></ul><h4>7. 한도 증액 조건</h4><ul><li>햇살론카드 1년 이상 이용</li><li>최근 3개월 내 햇살론카드 이용실적 보유</li><li>신청일 기준 연체 이력이 없어야 함 (연체이력에 따라 제한)</li><li><strong>신청 방법:</strong> 서민금융진흥원 앱 또는 서민금융통합지원센터(1397) 예약</li></ul><h4>8. 주요 유의사항</h4><ul><li>이용대금 연체 시 연체정보가 등록되며, 서금원이 대위변제 후 구상권을 행사합니다.</li><li>지원 대상에 해당하더라도 카드사의 발급 심사 결과에 따라 발급이 거절될 수 있습니다.</li><li>카드 해지 후 60일이 경과해야 재신청이 가능합니다.</li><li>이용 중 카드사 변경은 불가능합니다.</li></ul>`,
  },
];

export const categoryContents: CategoryContent[] = [
  {
    id: 1,
    title: '예금・적금',
    subtitle: '맡기기, 모으기',
    icon: '💰',
  },
  {
    id: 2,
    title: '주식',
    subtitle: '소유하기',
    icon: '📈',
  },
  {
    id: 3,
    title: '채권',
    subtitle: '빌려주기',
    icon: '💳',
  },
  {
    id: 4,
    title: '펀드/ETF',
    subtitle: '대신 맡기기',
    icon: '👬',
  },
  {
    id: 5,
    title: '보험',
    subtitle: '대비하기',
    icon: '🦺',
  },
];
