import styled from '@emotion/styled';

type BackButtonProps = {
  onClick?: () => void;
  size?: number; // 아이콘 크기(px)
  color?: string; // 아이콘 색상(hex/rgb 등). 미지정 시 theme.colors.text
  className?: string;
  ariaLabel?: string; // 접근성 라벨 (기본: "뒤로가기")
};

export default function BackButton({
  onClick,
  size = 24,
  color,
  className,
  ariaLabel = '뒤로가기',
}: BackButtonProps) {
  return (
    <IconButton type="button" onClick={onClick} className={className} aria-label={ariaLabel}>
      <ArrowLeftIcon size={size} color={color} />
    </IconButton>
  );
}

const IconButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

function ArrowLeftIcon({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="15 18 9 12 15 6"
        stroke={color ?? 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
