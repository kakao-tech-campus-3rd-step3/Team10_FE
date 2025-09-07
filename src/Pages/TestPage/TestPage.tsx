import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';

type Answer = {
  q1?: string;
  q2?: string;
  q3: string[];
  q4?: string;
  q5?: string;
  q6?: string;
  q7?: string;
};

interface TestPageProps {
  onSubmit?: (answers: Answer) => void;
}

export const TestPage = ({ onSubmit }: TestPageProps) => {
  const [answers, setAnswers] = useState<Answer>({ q3: [] });
  const navigate = useNavigate();

  const handleRadio =
    (key: 'q1' | 'q2' | 'q4' | 'q5' | 'q6' | 'q7') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleCheck = (value: string) => {
    setAnswers((prev) => {
      const has = prev.q3.includes(value);
      const next = has ? prev.q3.filter((v) => v !== value) : [...prev.q3, value];
      return { ...prev, q3: next };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(answers);
    navigate('/test/result', { state: { answers } });
  };

  return (
    <Container>
      <Header>
        <Title>투자성향 진단 테스트</Title>
      </Header>
      <CardHeader>투자성향 진단 테스트</CardHeader>

      <FormCard onSubmit={handleSubmit}>
        <Block>
          <Q>1. 당신의 연령대는 어떻게 됩니까?</Q>
          <Options>
            {['19세 이하', '20세~40세', '41세~50세', '51세~60세', '61세 이상'].map((v) => (
              <Option key={v}>
                <input
                  type="radio"
                  name="q1"
                  value={v}
                  checked={answers.q1 === v}
                  onChange={handleRadio('q1')}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>

        <Block>
          <Q>2. 투자하고자 하는 자금의 투자 가능 기간은 얼마나 됩니까?</Q>
          <Options>
            {[
              '6개월 이내',
              '6개월 이상~1년 이내',
              '1년 이상~2년 이내',
              '2년 이상~3년 이내',
              '3년 이상',
            ].map((v) => (
              <Option key={v}>
                <input
                  type="radio"
                  name="q2"
                  value={v}
                  checked={answers.q2 === v}
                  onChange={handleRadio('q2')}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>

        <Block>
          <Q>3. 다음 중 투자경험과 가장 가까운 것은 어느 것입니까? (중복 가능)</Q>
          <Options>
            {[
              '은행의 예·적금, 국채, 지방채, 보증채, MMF, CMA 등',
              '금융채, 신용도가 높은 회사채, 채권형펀드, 원금보존추구형ELS 등',
              '신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형펀드 등',
              '신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형펀드 등',
              'ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등',
            ].map((v) => (
              <Option key={v}>
                <input
                  type="checkbox"
                  checked={answers.q3.includes(v)}
                  onChange={() => handleCheck(v)}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>

        <Block>
          <Q>4. 금융상품 투자에 대한 본인의 지식수준은 어느 정도라고 생각하십니까?</Q>
          <Options>
            {[
              '[매우 낮은 수준] 투자의사 결정을 스스로 내려본 경험이 없는 정도',
              '[낮은 수준] 주식과 채권의 차이를 구별할 수 있는 정도',
              '[높은 수준] 투자할 수 있는 대부분의 금융상품의 차이를 구별할 수 있는 정도',
              '[매우 높은 수준] 금융상품을 비롯하여 모든 투자대상 상품의 차이를 이해할 수 있는 정도',
            ].map((v) => (
              <Option key={v}>
                <input
                  type="radio"
                  name="q4"
                  value={v}
                  checked={answers.q4 === v}
                  onChange={handleRadio('q4')}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>

        <Block>
          <Q>
            5. 현재 투자하고자 하는 자금은 전체 금융자산(부동산 제외) 중 어느 정도의 비중을
            차지합니까?
          </Q>
          <Options>
            {[
              '10% 이내',
              '10%이상~20% 이내',
              '20%이상~30% 이내',
              '30%이상~40% 이내',
              '40% 이상',
            ].map((v) => (
              <Option key={v}>
                <input
                  type="radio"
                  name="q5"
                  value={v}
                  checked={answers.q5 === v}
                  onChange={handleRadio('q5')}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>

        <Block>
          <Q>6. 다음 중 당신의 수입원을 가장 잘 나타내는 것은 무엇입니까?</Q>
          <Options>
            {[
              '현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상된다.',
              '현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상된다.',
              '현재 일정한 수입이 없으며, 연금이 주수입원이다.',
            ].map((v) => (
              <Option key={v}>
                <input
                  type="radio"
                  name="q6"
                  value={v}
                  checked={answers.q6 === v}
                  onChange={handleRadio('q6')}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>

        <Block>
          <Q>7. 만약 투자원금에 손실이 발생할 경우 감수할 수 있는 손실 수준은?</Q>
          <Options>
            {[
              '무슨 일이 있어도 투자원금은 보전되어야 한다.',
              '10% 미만까지는 손실을 감수할 수 있을 것 같다.',
              '20% 미만까지는 손실을 감수할 수 있을 것 같다.',
              '기대수익이 높다면 위험이 높아도 상관하지 않겠다.',
            ].map((v) => (
              <Option key={v}>
                <input
                  type="radio"
                  name="q7"
                  value={v}
                  checked={answers.q7 === v}
                  onChange={handleRadio('q7')}
                />
                <label>{v}</label>
              </Option>
            ))}
          </Options>
        </Block>
        <ConfirmButtonContainer>
          <ConfirmButton type="submit">제출하기</ConfirmButton>
        </ConfirmButtonContainer>
      </FormCard>
    </Container>
  );
};
export default TestPage;

const Header = styled.header`
  padding: ${theme.spacing(5)};
  text-align: center;
  background-color: ${theme.colors.background};
  border-bottom-left-radius: ${theme.spacing(5)};
  border-bottom-right-radius: ${theme.spacing(5)};
`;

const Title = styled.h1`
  color: transparent;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;

const CardHeader = styled.div`
  background-color: #dbc399ff;
  padding: ${theme.spacing(7)} 0;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const FormCard = styled.form`
  background-color: ${theme.colors.background};
  padding: 32px 32px 0 32px;
  margin: 0 auto;
  width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Block = styled.div`
  & + & {
    margin-top: 32px;
  }
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
  gap: 6px;
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
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  margin-top: 0px;
  padding: 0;
  background: ${theme.colors.background};
`;

const ConfirmButton = styled.button`
  width: 160px;
  height: 54px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 52px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;
