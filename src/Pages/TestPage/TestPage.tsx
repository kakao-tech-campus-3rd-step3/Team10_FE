import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';
import { usePostApi } from '@/Apis/useMutationApi';
import { Q1, Q2, Q3, Q4, Q5, Q6, Q7 } from './constants';
import type { Answer, Step, TestPageProps, DiagnoseReq, DiagnoseRes } from './types';
import { computeTotalScore, isStepValid } from './utils';

export const TestPage = ({ onSubmit }: TestPageProps) => {
  const [answers, setAnswers] = useState<Answer>({ q3: [] });
  const [step, setStep] = useState<Step>(0);
  const navigate = useNavigate();

  const diagnoseMutation = usePostApi<DiagnoseRes, DiagnoseReq>('/propensity/diagnose');

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

  return (
    <Container $scrollable={true}>
      <TestHeader title="" hasPrevPage={true} onBack={handleBack} />
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
          <ConfirmButton key="next" type="button" onClick={nextStep} disabled={isButtonDisabled}>
            다음
          </ConfirmButton>
        ) : (
          <ConfirmButton
            key="submit"
            type="submit"
            onClick={handleSubmit}
            disabled={isButtonDisabled || isSubmitting}
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
        <LocalBackButton type="button" onClick={onBack}>
          <ArrowLeftIcon size={24} />
        </LocalBackButton>
      )}
      <HeaderTitle onClick={onTitleClick}>{title}</HeaderTitle>
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
