import { type RefObject } from 'react';
import { toPng } from 'html-to-image';

/**
 * DOM 요소를 이미지로 캡처하고 다운로드하는 훅
 * @param elementRef 캡처할 DOM 요소의 ref
 * @param filename 다운로드할 파일명 (기본값: 'capture.png')
 * @returns 캡처 및 다운로드를 실행하는 함수
 */
export const useCaptureImage = (
  elementRef: RefObject<HTMLElement>,
  filename: string = 'capture.png',
) => {
  const captureImage = async () => {
    if (!elementRef.current) {
      console.error('캡처할 요소를 찾을 수 없습니다.');
      return;
    }

    try {
      const dataUrl = await toPng(elementRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('이미지 캡처 중 오류 발생:', error);
      alert('이미지 저장 중 오류가 발생했습니다.');
    }
  };

  return captureImage;
};
