import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Filter from 'badwords-ko';

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export const NameInput = ({ value, onChange, placeholder, onValidationChange }: NameInputProps) => {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const filter = new Filter();

    if (value.trim() === '') {
      setIsValid(false);
      onValidationChange?.(false);
      return;
    }

    const hasBadWords = filter.isProfane(value);
    const isValidName = !hasBadWords;
    setIsValid(isValidName);
    onValidationChange?.(isValidName);
  }, [value, onValidationChange]);

  return (
    <InputContainer>
      <Container
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        $isValid={isValid}
      />
      <ErrorMessageContainer>
        {!isValid && <ErrorMessage>유효하지 않은 이름입니다</ErrorMessage>}
      </ErrorMessageContainer>
    </InputContainer>
  );
};

export default NameInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.input<{ $isValid: boolean }>`
  width: 272px;
  height: 50px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ $isValid, theme }) => ($isValid ? theme.colors.secondary : '#ff4444')};
  border-radius: 50px;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 53px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
  &:focus {
    outline: none;
    border: 2px solid ${({ $isValid, theme }) => ($isValid ? theme.colors.secondary : '#ff4444')};
  }
`;

const ErrorMessageContainer = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 12px;
  text-align: center;
`;
