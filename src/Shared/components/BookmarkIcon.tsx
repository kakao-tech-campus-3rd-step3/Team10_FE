import styled from '@emotion/styled';
import onBookmark from '@/assets/BookMarkImg/on.webp';
import offBookmark from '@/assets/BookMarkImg/off.webp';
import { usePostApi } from '@/Apis/useMutationApi';
import { useState, useEffect } from 'react';

interface BookmarkIconProps {
  quizId: number;
  isBookMarked: boolean;
  onBookmarkChange?: (quizId: number, newBookmarkState: boolean) => void;
  size?: number;
}

export const BookmarkIcon = ({
  quizId,
  isBookMarked,
  onBookmarkChange,
  size = 60,
}: BookmarkIconProps) => {
  const [localBookmarkState, setLocalBookmarkState] = useState(isBookMarked);

  useEffect(() => {
    setLocalBookmarkState(isBookMarked);
  }, [isBookMarked]);

  const bookmarkMutation = usePostApi<void, { quizId: number; isBookMarked: boolean }>(
    `/quiz/bookmark/${quizId}`,
  );

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const newBookmarkState = !localBookmarkState;

    try {
      setLocalBookmarkState(newBookmarkState);

      await bookmarkMutation.mutateAsync({
        quizId,
        isBookMarked: newBookmarkState,
      });

      onBookmarkChange?.(quizId, newBookmarkState);
    } catch {
      setLocalBookmarkState(isBookMarked);
    }
  };

  return (
    <BookmarkBadge onClick={handleClick} $size={size}>
      <BookmarkImage
        src={localBookmarkState ? onBookmark : offBookmark}
        alt={localBookmarkState ? 'on bookmark' : 'off bookmark'}
        $size={size}
      />
    </BookmarkBadge>
  );
};

const BookmarkBadge = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const BookmarkImage = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
`;
