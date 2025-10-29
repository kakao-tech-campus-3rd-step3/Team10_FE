import styled from '@emotion/styled';
import onBookmark from '@/assets/BookMarkImg/on.webp';
import offBookmark from '@/assets/BookMarkImg/off.webp';
import { usePostApi } from '@/Apis/useMutationApi';
import { useState } from 'react';

interface BookmarkIconProps {
  quizId: number;
  isBookmarked: boolean;
  onBookmarkChange?: (quizId: number, newBookmarkState: boolean) => void;
}

export const BookmarkIcon = ({ quizId, isBookmarked, onBookmarkChange }: BookmarkIconProps) => {
  const [localBookmarkState, setLocalBookmarkState] = useState(isBookmarked);

  const bookmarkMutation = usePostApi<void, { quizId: number; isBookmarked: boolean }>(
    `/quiz/bookmark/${quizId}`,
  );

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 퀴즈 아이템 클릭 이벤트 방지

    const newBookmarkState = !localBookmarkState;

    try {
      setLocalBookmarkState(newBookmarkState);

      await bookmarkMutation.mutateAsync({
        quizId,
        isBookmarked: newBookmarkState,
      });

      onBookmarkChange?.(quizId, newBookmarkState);
    } catch {
      setLocalBookmarkState(isBookmarked);
    }
  };

  return (
    <BookmarkBadge onClick={handleClick}>
      <BookmarkImage
        src={localBookmarkState ? onBookmark : offBookmark}
        alt={localBookmarkState ? 'on bookmark' : 'off bookmark'}
      />
    </BookmarkBadge>
  );
};

const BookmarkBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const BookmarkImage = styled.img`
  width: 60px;
  height: 60px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
`;
