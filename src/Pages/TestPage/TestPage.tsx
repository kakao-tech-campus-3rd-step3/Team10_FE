import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';

type Answer = {
  q1?: string;
  q2?: string;
  q3: string[];
  q4?: string;
  q5?: string;
  q6?: string;
  q7?: string;
};

type Step = 0 | 1 | 2 | 3;

interface TestPageProps {
  onSubmit?: (answers: Answer) => void;
}

export const TestPage = ({ onSubmit }: TestPageProps) => {
  const [answers, setAnswers] = useState<Answer>({ q3: [] });
  const [step, setStep] = useState<Step>(0);
  const navigate = useNavigate();

  const Q1 = ['19세 이하', '20세~40세', '41세~50세', '51세~60세', '61세 이상'];
  const Q2 = [
    '6개월 이내',
    '6개월 이상~1년 이내',
    '1년 이상~2년 이내',
    '2년 이상~3년 이내',
    '3년 이상',
  ];
  const Q3 = [
    '은행의 예·적금, 국채, 지방채, 보증채, MMF, CMA 등',
    '금융채, 신용도가 높은 회사채, 채권형펀드, 원금보존추구형ELS 등',
    '신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형펀드 등',
    '신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형펀드 등',
    'ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등',
  ];
  const Q4 = [
    '[매우 낮은 수준] 투자의사 결정을 스스로 내려본 경험이 없는 정도',
    '[낮은 수준] 주식과 채권의 차이를 구별할 수 있는 정도',
    '[높은 수준] 투자할 수 있는 대부분의 금융상품의 차이를 구별할 수 있는 정도',
    '[매우 높은 수준] 금융상품을 비롯하여 모든 투자대상 상품의 차이를 이해할 수 있는 정도',
  ];
  const Q5 = ['10% 이내', '10%이상~20% 이내', '20%이상~30% 이내', '30%이상~40% 이내', '40% 이상'];
  const Q6 = [
    '현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상된다.',
    '현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상된다.',
    '현재 일정한 수입이 없으며, 연금이 주수입원이다.',
  ];
  const Q7 = [
    '무슨 일이 있어도 투자원금은 보전되어야 한다.',
    '10% 미만까지는 손실을 감수할 수 있을 것 같다.',
    '20% 미만까지는 손실을 감수할 수 있을 것 같다.',
    '기대수익이 높다면 위험이 높아도 상관하지 않겠다.',
  ];

  const pick = (key: keyof Answer, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleQ3 = (value: string) =>
    setAnswers((prev) => {
      const has = prev.q3.includes(value);
      return { ...prev, q3: has ? prev.q3.filter((v) => v !== value) : [...prev.q3, value] };
    });

  const incMap: Record<Step, Step> = { 0: 1, 1: 2, 2: 3, 3: 3 } as const;
  const nextStep = () => setStep((s) => incMap[s]);

  const isLast = step === 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(answers);
    navigate('/test/result', { state: { answers } });
  };

  return (
    <Container $scrollable={true}>
      <Header title="" hasPrevPage={true} />
      <FormCard onSubmit={handleSubmit}>
        <CardHead>
          <Title>투자성향 진단 테스트</Title>
          <InvestmentText>
            나의 지난 투자성향은 <Em>000 투자자</Em> 입니다.
          </InvestmentText>
        </CardHead>
        <Divider />
        {step === 0 && (
          <>
            <Block>
              <Q>1. 당신의 연령대는 어떻게 됩니까?</Q>
              <Options>
                {Q1.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q1.map((t, i) => {
                  const active = answers.q1 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q1', t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <Block>
              <Q>2. 투자하고자 하는 자금의 투자 가능 기간은 얼마나 됩니까?</Q>
              <Options>
                {Q2.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q2.map((t, i) => {
                  const active = answers.q2 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q2', t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>
          </>
        )}

        {step === 1 && (
          <>
            <Block>
              <Q>3. 다음 중 투자경험과 가장 가까운 것은 어느 것입니까? (중복 가능)</Q>
              <Options>
                {Q3.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q3.map((t, i) => {
                  const active = answers.q3.includes(t);
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => toggleQ3(t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <Block>
              <Q>4. 금융상품 투자에 대한 본인의 지식수준은 어느 정도라고 생각하십니까?</Q>
              <Options>
                {Q4.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q4.map((t, i) => {
                  const active = answers.q4 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q4', t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>
          </>
        )}

        {step === 2 && (
          <>
            <Block>
              <Q>
                5. 현재 투자하고자 하는 자금은 전체 금융자산(부동산 제외) 중 어느 정도의 비중을
                차지합니까?
              </Q>
              <Options>
                {Q5.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q5.map((t, i) => {
                  const active = answers.q5 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q5', t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <Block>
              <Q>6. 다음 중 당신의 수입원을 가장 잘 나타내는 것은 무엇입니까?</Q>
              <Options>
                {Q6.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q6.map((t, i) => {
                  const active = answers.q6 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q6', t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>
          </>
        )}

        {step === 3 && (
          <>
            <Block>
              <Q>7. 만약 투자원금에 손실이 발생할 경우 감수할 수 있는 손실 수준은?</Q>
              <Options>
                {Q7.map((t, i) => (
                  <Option key={t}>
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow>
                {Q7.map((t, i) => {
                  const active = answers.q7 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q7', t)}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <DoneNotice>
              <p>
                투자성향 진단 테스트가 <b className="done">종료</b>되었습니다.
              </p>
              <p>
                변경사항이 없다면 <b className="submit">제출하기</b> 버튼을 눌러주세요.
              </p>
            </DoneNotice>
          </>
        )}
      </FormCard>
      <ConfirmButtonContainer>
        {!isLast ? (
          <ConfirmButton key="next" type="button" onClick={nextStep}>
            다음
          </ConfirmButton>
        ) : (
          <ConfirmButton key="submit" type="submit" onClick={handleSubmit}>
            제출하기
          </ConfirmButton>
        )}
      </ConfirmButtonContainer>
    </Container>
  );
};
export default TestPage;

const FormCard = styled.form`
  background-color: ${theme.colors.inactive};
  padding: 0;
  margin: 0 auto;
  width: 96%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0px;
  border-radius: ${theme.spacing(2)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
`;

const CardHead = styled.div`
  width: 100%;
  padding: ${theme.spacing(2)};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  background-color: ${({ theme }) => theme.colors.inactive};
  padding: ${theme.spacing(2)} 0;
  margin-top: 15px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const InvestmentText = styled.p`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Em = styled.span`
  color: ${theme.colors.secondary};
  font-weight: ${theme.font.bold.fontWeight};
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  border-top: 1px solid ${theme.colors.line};
  margin: 0;
`;

const Block = styled.div`
  & + & {
    margin-top: 50px;
  }
  margin: 20px;
`;

const Q = styled.h3`
  margin: 0 0 8px 0;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

const Options = styled.div`
  display: grid;
  gap: 2px;
  margin: 0 0 10px 10px;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 14px;
  padding: 6px 4px 0;
`;

const ChipButton = styled.button`
  width: 56px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background-color: #fff;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &[data-active='true'] {
    background: #9bd05ad9;
  }
`;

const Option = styled.label`
  display: flex;
  gap: 5px;
  align-items: flex-start;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};

  input {
    margin-top: 4px;
    accent-color: ${({ theme }) => theme.colors.secondary};
  }
  label {
    line-height: 1.3;
  }
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
  padding: 0;
  background-color: ${theme.colors.background};
`;

const ConfirmButton = styled.button`
  width: 155px;
  height: 50px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 52px;
  border: 2px solid #d3e0b4;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const DoneNotice = styled.div`
  margin: 130px 0 100px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  .done {
    color: rgb(190, 27, 27);
  }
  .submit {
    color: #277911;
  }
`;
