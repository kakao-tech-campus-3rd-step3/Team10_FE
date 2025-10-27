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
  hashtag: string[];
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
    title: '미소드림적금',
    subtitle: '서민의 경제적 자립기반 마련 등을 위해 자산형성을 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#FF6B6B',
    hashtag: ['자산 형성'],
  },
  {
    id: 3,
    title: '개인채무조정',
    subtitle: '채무 상환이 어려운 분들의 경제적 재기 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#32CD32',
    hashtag: ['채무 조정'],
  },
  {
    id: 4,
    title: '소액생계대비대출',
    subtitle: '생계를 위한 소액대출 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    hashtag: ['자금 지원'],
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
    hashtag: ['자산 형성'],
  },
  {
    id: 2,
    title: '미소드림적금',
    subtitle: '서민의 경제적 자립기반 마련 등을 위해 자산형성을 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#FF6B6B',
    url: 'https://www.kinfa.or.kr/financialProduct/smileDreamSavings.do',
    content: `<h3>미소드림적금 상품 정보 요약</h3><h4>1. 상품 개요</h4><p>미소금융 또는 채무조정을 성실하게 상환하고 있는 저소득층(차상위계층 이하)의 자산 형성을 돕기 위한 상품입니다.</p><p>은행 적금 만기 시 <strong>은행에서 지급하는 이자</strong>와 <strong>동일한 금액</strong>을 <strong>서민금융진흥원에서 추가로 지원(이자매칭)</strong>하여 경제적 자립을 지원합니다.</p><h4>2. 지원대상 (가입 대상)</h4><p>다음 ① 또는 ②에 해당하면서, <strong>차상위계층 이하</strong>인 경우 신청 가능합니다.</p><ul><li><strong>① 미소금융 성실상환자:</strong><ul><li>미소금융 대출을 이용 중이며 신청일 현재 연체 없이 정상이용 중인 자.</li><li><em>단, 근로장려금 수급대상자, 취약계층 자립자금 대상자(한부모가족, 장애인 등)는 차상위계층이 아니어도 신청 가능.</em></li></ul></li><li><strong>② 채무조정 성실상환자:</strong><ul><li>신용회복위원회 또는 국민행복기금의 채무조정을 확정받고 6개월 경과 및 6회차 이상 성실하게 상환 중인 자.</li></ul></li><li><strong>※ 제외 대상:</strong> 상담일 현재 대출금이 거치 중이거나 완제한 자, 기존 미소드림적금 가입자 등.</li></ul><h4>3. 상품 내용</h4><ul><li><strong>상품 종류:</strong> 자유적립식 적금</li><li><strong>가입 금액:</strong> 월 1만원 ~ 최대 20만원까지 자유롭게 저축</li><li><strong>가입 기간:</strong> 1년, 2년, 3년, 4년, 5년 중 선택</li><li><strong>취급 은행:</strong> 우리, 신한, 국민, KEB하나, 기업은행 (5개 은행)</li><li><strong>적금 금리:</strong> 가입 기간별 은행 기본금리 + 만기 시 우대금리 1.0%p 적용 (예: 3~5년 만기 시 연 5.0%)<br><em>(금리는 기준금리 변동에 따라 변경될 수 있습니다.)</em></li></ul><h4>4. 핵심 지원 내용 (서민금융진흥원 이자 지원)</h4><ul><li><strong>지원 방식:</strong> 적금 만기 시, 은행에서 수령한 <strong>만기 이자(세전)에 상당하는 금액</strong>을 서민금융진흥원에서 <strong>별도로 추가 지급</strong>합니다.</li><li><strong>지원 한도:</strong><ul><li><strong>기간 한도:</strong> 최대 <strong>3년</strong>까지만 이자 지원금이 지급됩니다. (즉, 4년이나 5년 만기 상품에 가입해도 지원금은 3년치 이자에 대해서만 지급)</li><li><strong>금액 한도:</strong> 최대 <strong>50만원</strong> 미만까지 지원됩니다.</li></ul></li></ul><h4>5. 신청 절차</h4><ol><li><strong>상품참여신청 (미소금융지점/통합지원센터):</strong><ul><li>(미소금융 상환자) 미소금융지점에서 신청서 작성.</li><li>(채무조정 상환자) 채무조정기관에서 '상환내역 확인서'를 받아 미소금융지점에 방문하여 신청.</li><li><em>(신분증 및 지원대상 확인 서류 필요)</em></li></ul></li><li><strong>추천서 발급:</strong> 요건 심사 후 '미소드림적금 참여 추천서' 발급.</li><li><strong>적금통장 개설 (은행 방문):</strong> 추천서에 기재된 은행 지점을 방문하여 적금 통장 개설.</li><li><strong>약정 체결 (미소금융지점):</strong> 통장 개설 후 다시 지점을 방문하여 지원금 지급에 관한 약정 체결.<br><em>(서금원 앱을 통한 비대면 신청도 가능)</em></li><li><strong>지원금 청구 (만기 시):</strong> 적금 만기 해지 후, 이자 확인서(영수증)를 첨부하여 미소금융지점에 지원금 청구.</li><li><strong>지원금 지급 (서민금융진흥원):</strong> 요청한 계좌로 이자 지원금 송금.</li></ol>`,
    hashtag: ['자산 형성'],
  },
  {
    id: 3,
    title: '개인채무조정',
    subtitle: '채무 상환이 어려운 분들의 경제적 재기 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#32CD32',
    url: 'https://ccrs.or.kr/debt/system/description/info.do',
    content: `<h3>신용회복위원회 채무조정 제도 비교 요약</h3><p>신용회복위원회는 연체 상태와 기간에 따라 크게 3가지 채무조정 제도를 운영합니다.</p><h4>1. 신속채무조정 (연체 전 또는 30일 이하)</h4><ul><li><strong>대상:</strong> 아직 연체는 아니지만 연체가 예상되거나, 연체 기간이 30일 이하인 채무자.</li><li><strong>핵심 내용:</strong><ul><li><strong>상환 유예:</strong> 원금 상환을 최대 1년간 미룰 수 있습니다. (유예 기간 중 이자만 납부)</li><li><strong>이자율 인하:</strong> 약정 이자율을 인하해 줍니다.</li><li><strong>상환 기간 연장:</strong> 최장 10년 이내로 상환 기간을 연장할 수 있습니다.</li></ul></li><li><strong>목적:</strong> 단기 연체로 인한 신용 문제 발생을 사전에 방지하는 것이 주 목적입니다.</li></ul><h4>2. 사전채무조정 (프리워크아웃)</h4><ul><li><strong>대상:</strong> 연체 기간이 <strong>30일을 초과</strong>하고 <strong>90일 미만</strong>인 단기 연체 채무자.</li><li><strong>핵심 내용:</strong><ul><li><strong>연체이자 감면:</strong> 발생한 연체이자는 전액 감면됩니다.</li><li><strong>이자율 인하:</strong> 약정 이자율의 30~70% 수준으로 이자율을 낮춰줍니다.</li><li><strong>상환 기간 연장:</strong> 최장 10년(무담보 채무 기준) 이내로 상환 기간을 연장합니다.</li></ul></li><li><strong>목적:</strong> 채무가 3개월 이상 장기 연체(개인워크아웃 대상)로 넘어가지 않도록 막는 제도입니다.</li></ul><h4>3. 개인워크아웃 (연체 90일 이상)</h4><ul><li><strong>대상:</strong> 연체 기간이 <strong>90일(3개월) 이상</strong>인 장기 연체 채무자.</li><li><strong>`,
    hashtag: ['채무 조정'],
  },
  {
    id: 4,
    title: '소액생계대비대출',
    subtitle: '생계를 위한 소액대출 지원',
    buttonText: '자세히 보기',
    backgroundColor: '#4ECDC4',
    url: 'https://www.kinfa.or.kr/financialProduct/smallLivingLoan.do',
    content: `<h3>불법사금융예방대출 (舊 소액생계비대출) 정보 요약</h3><h4>1. 상품 개요</h4><p>대부업조차 이용이 어려워 불법사금융 이용이 불가피한 분들의 재기를 지원하는 정책서민금융상품입니다.</p><ul><li>중도상환수수료 면제</li><li>만기일시상환 방식</li></ul><h4>2. 지원 대상</h4><p>다음 조건을 <strong>모두</strong> 충족하는 분:</p><ul><li><strong>신용평점:</strong> 하위 20%</li><li><strong>연소득:</strong> 3,500만원 이하</li></ul><h4>3. 지원 내용</h4><ul><li><strong>대출 한도:</strong> 1인당 <strong>최대 100만원</strong><ul><li>기존 금융권 연체자의 경우 최초 50만원, 추가 대출로 50만원 가능.</li><li>단, 의료·주거·교육비 등 특정 용도를 증빙하면 연체자도 최대 100만원까지 한도 부여.</li></ul></li><li><strong>대출 금리:</strong> <strong>연 15.9%</strong> (단일금리)</li><li><strong>금리 우대 (성실상환 시):</strong><ul><li>6개월마다 3.0%p씩 금리 인하</li><li>최저 <strong>연 9.9%</strong>까지 인하 가능</li><li>(별도) 서금원 금융교육 이수 시 0.5%p 우대금리 적용</li></ul></li><li><strong>상환 방법:</strong> 1년 만기일시상환 (중도상환 수수료 없음)<ul><li>성실상환 시 최대 5년 이내로 만기 연장 가능</li></ul></li></ul><h4>4. 신청 방법 및 필요 서류</h4><ul><li><strong>신청처:</strong> 전국 46개 <strong>서민금융통합지원센터</strong> (방문 상담 및 신청)</li><li><strong>예약:</strong> 서민금융콜센터(국번없이 1397) 또는 사이트 배너를 통해 <strong>방문 예약 필수</strong></li><li><strong>필요 서류:</strong><ul><li>본인확인용 신분증</li><li>대출금 수령용 본인 명의 예금통장 사본</li></ul></li></ul>`,
    hashtag: ['자금 지원'],
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
