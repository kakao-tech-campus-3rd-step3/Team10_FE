import styled from '@emotion/styled';

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const NameInput = ({ value, onChange, placeholder }: NameInputProps) => {
  return <Container type="text" value={value} onChange={onChange} placeholder={placeholder} />;
};

export default NameInput;

const Container = styled.input`
  width: 272px;
  height: 54px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
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
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;
