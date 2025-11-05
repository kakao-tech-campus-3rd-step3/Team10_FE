import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';
import { usePostApi } from '@/Apis/useMutationApi';
import { useQueryApi } from '@/Apis/useQueryApi';
import { useQueryClient } from '@tanstack/react-query';
import { Q1, Q2, Q3, Q4, Q5, Q6, Q7 } from './constants';
import type {
  Answer,
  Step,
  TestPageProps,
  DiagnoseReq,
  DiagnoseRes,
  PropensityResponse,
} from './types';
import { computeTotalScore, isStepValid } from './utils';

export const TestPage = ({ onSubmit }: TestPageProps) => {
  const [answers, setAnswers] = useState<Answer>({ q3: [] });
  const [step, setStep] = useState<Step>(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const diagnoseMutation = usePostApi<DiagnoseRes, DiagnoseReq>('/propensity/diagnose');
  const {
    data: propensityData,
    error: propensityError,
    isLoading: propensityIsLoading,
  } = useQueryApi<PropensityResponse>(['users', 'me', 'propensity'], '/users/me/propensity');

  const pick = (key: keyof Answer, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleQ3 = (value: string) =>
    setAnswers((prev) => {
      const has = prev.q3.includes(value);
      return { ...prev, q3: has ? prev.q3.filter((v) => v !== value) : [...prev.q3, value] };
    });

  const isLast = step === 3;
  const isButtonDisabled = !isStepValid(step, answers);
  const isSubmitting = diagnoseMutation.isPending;

  const prevStep = () => setStep((s) => (s > 0 ? ((s - 1) as Step) : s));
  const nextStep = () => {
    if (!isButtonDisabled) setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const handleBack = () => {
    if (step > 0) prevStep();
    else navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    onSubmit?.(answers);

    const totalScore = computeTotalScore(answers);
    diagnoseMutation.mutate(
      { totalScore },
      {
        onSuccess: (data) => {
          // 투자성향 관련 쿼리 캐시 무효화
          queryClient.invalidateQueries({ queryKey: ['users', 'me', 'propensity'] });
          navigate('/test/result', {
            state: {
              answers,
              totalScore,
              propensityKoreanName: data.propensityKoreanName,
            },
          });
        },
        onError: () => {
          alert('진단 요청에 실패했습니다.');
        },
      },
    );
  };

  const isTested = propensityData?.isTested;
  const testResult = propensityData?.propensityKoreanName || '';
  let propensityText: string = '';
  if (propensityIsLoading) {
    propensityText = '나의 지난 투자성향을 불러오는 중...';
  } else if (propensityError || !propensityData) {
    propensityText = '나의 지난 투자성향을 불러오는데 실패했습니다.';
  } else if (!isTested) {
    propensityText = '아직 테스트를 진행하지 않았습니다.';
  }

  return (
    <Container $scrollable={true}>
      <TestHeader title="" hasPrevPage={true} onBack={handleBack} />
      <FormCard onSubmit={handleSubmit} role="form" aria-label="투자성향 진단 테스트 폼">
        <CardHead role="group" aria-label="테스트 헤더">
          <Title>투자성향 진단 테스트</Title>
          {isTested ? (
            <InvestmentText aria-label={`나의 지난 투자성향: ${testResult} 투자자`}>
              나의 지난 투자성향은 <Em>{testResult} 투자자</Em> 입니다.
            </InvestmentText>
          ) : (
            <InvestmentText>{propensityText}</InvestmentText>
          )}
        </CardHead>
        <Divider role="separator" />
        {step === 0 && (
          <>
            <Block role="group" aria-label="질문 1: 연령대">
              <Q>1. 당신의 연령대는 어떻게 됩니까?</Q>
              <Options role="list" aria-label="연령대 선택지">
                {Q1.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="radiogroup" aria-label="연령대 선택">
                {Q1.map((t, i) => {
                  const active = answers.q1 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q1', t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                      role="radio"
                      aria-checked={active}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <Block role="group" aria-label="질문 2: 투자 가능 기간">
              <Q>2. 투자하고자 하는 자금의 투자 가능 기간은 얼마나 됩니까?</Q>
              <Options role="list" aria-label="투자 가능 기간 선택지">
                {Q2.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="radiogroup" aria-label="투자 가능 기간 선택">
                {Q2.map((t, i) => {
                  const active = answers.q2 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q2', t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                      role="radio"
                      aria-checked={active}
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
            <Block role="group" aria-label="질문 3: 투자경험 (중복 선택 가능)">
              <Q>3. 다음 중 투자경험과 가장 가까운 것은 어느 것입니까? (중복 가능)</Q>
              <Options role="list" aria-label="투자경험 선택지">
                {Q3.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="group" aria-label="투자경험 선택 (중복 가능)">
                {Q3.map((t, i) => {
                  const active = answers.q3.includes(t);
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => toggleQ3(t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <Block role="group" aria-label="질문 4: 금융상품 투자 지식수준">
              <Q>4. 금융상품 투자에 대한 본인의 지식수준은 어느 정도라고 생각하십니까?</Q>
              <Options role="list" aria-label="지식수준 선택지">
                {Q4.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="radiogroup" aria-label="지식수준 선택">
                {Q4.map((t, i) => {
                  const active = answers.q4 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q4', t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                      role="radio"
                      aria-checked={active}
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
            <Block role="group" aria-label="질문 5: 투자 자금 비중">
              <Q>
                5. 현재 투자하고자 하는 자금은 전체 금융자산(부동산 제외) 중 어느 정도의 비중을
                차지합니까?
              </Q>
              <Options role="list" aria-label="투자 자금 비중 선택지">
                {Q5.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="radiogroup" aria-label="투자 자금 비중 선택">
                {Q5.map((t, i) => {
                  const active = answers.q5 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q5', t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                      role="radio"
                      aria-checked={active}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <Block role="group" aria-label="질문 6: 수입원">
              <Q>6. 다음 중 당신의 수입원을 가장 잘 나타내는 것은 무엇입니까?</Q>
              <Options role="list" aria-label="수입원 선택지">
                {Q6.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="radiogroup" aria-label="수입원 선택">
                {Q6.map((t, i) => {
                  const active = answers.q6 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q6', t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                      role="radio"
                      aria-checked={active}
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
            <Block role="group" aria-label="질문 7: 손실 감수 수준">
              <Q>7. 만약 투자원금에 손실이 발생할 경우 감수할 수 있는 손실 수준은?</Q>
              <Options role="list" aria-label="손실 감수 수준 선택지">
                {Q7.map((t, i) => (
                  <Option key={t} role="listitem">
                    <label>
                      <span className="no">{i + 1}.</span> {t}
                    </label>
                  </Option>
                ))}
              </Options>
              <ChipRow role="radiogroup" aria-label="손실 감수 수준 선택">
                {Q7.map((t, i) => {
                  const active = answers.q7 === t;
                  return (
                    <ChipButton
                      type="button"
                      key={t}
                      data-active={active ? 'true' : 'false'}
                      onClick={() => pick('q7', t)}
                      aria-label={`${i + 1}번 선택지: ${t} ${active ? '선택됨' : ''}`}
                      aria-pressed={active}
                      role="radio"
                      aria-checked={active}
                    >
                      {i + 1}
                    </ChipButton>
                  );
                })}
              </ChipRow>
            </Block>

            <DoneNotice role="status" aria-live="polite">
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
      <ConfirmButtonContainer role="group" aria-label="단계 네비게이션">
        {!isLast ? (
          <ConfirmButton
            key="next"
            type="button"
            onClick={nextStep}
            disabled={isButtonDisabled}
            aria-label="다음 단계로"
          >
            다음
          </ConfirmButton>
        ) : (
          <ConfirmButton
            key="submit"
            type="submit"
            onClick={handleSubmit}
            disabled={isButtonDisabled || isSubmitting}
            aria-label={isSubmitting ? '제출 중' : '테스트 제출하기'}
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </ConfirmButton>
        )}
      </ConfirmButtonContainer>
    </Container>
  );
};
export default TestPage;

const TestHeader = ({
  title,
  hasPrevPage,
  onBack,
}: {
  title: string;
  hasPrevPage: boolean;
  onBack?: () => void;
}) => {
  const navigate = useNavigate();
  const onTitleClick = () => {
    navigate('/home');
  };
  return (
    <HeaderContainer>
      {hasPrevPage && (
        <LocalBackButton type="button" onClick={onBack} aria-label="이전 단계로 이동">
          <ArrowLeftIcon size={24} aria-hidden="true" />
        </LocalBackButton>
      )}
      <HeaderTitle onClick={onTitleClick} role="button" aria-label="홈으로 이동" tabIndex={0}>
        {title}
      </HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: ${theme.spacing(15)};
  padding: ${theme.spacing(5)};
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${theme.colors.background};
  border-bottom-left-radius: ${theme.spacing(5)};
  border-bottom-right-radius: ${theme.spacing(5)};
`;

const HeaderTitle = styled.h1`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const LocalBackButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.text};
`;

const ArrowLeftIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      points="15 18 9 12 15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FormCard = styled.form`
  background-color: ${theme.colors.inactive};
  padding: 0;
  margin: 0 auto;
  width: 90%;
  flex: 0 0 auto;
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
  font-size: 16px;
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
  background-color: ${({ theme, disabled }) => (disabled ? '#cccccc' : theme.colors.secondary)};
  border-radius: 52px;
  border: 2px solid #d3e0b4;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme, disabled }) => (disabled ? '#666666' : theme.colors.background)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 0.9)};
  }
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
