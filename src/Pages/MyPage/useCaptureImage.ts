import { type RefObject } from 'react';
import { toPng, toBlob } from 'html-to-image';

/**
 * DOM 요소를 이미지로 캡처하고 다운로드하는 훅
 * @param elementRef 캡처할 DOM 요소의 ref
 * @param filename 다운로드할 파일명 (기본값: 'capture.png')
 * @returns 캡처 및 다운로드를 실행하는 함수, 클립보드 복사 함수
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
        style: {
          margin: '0',
        },
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

  const copyToClipboard = async () => {
    if (!elementRef.current) {
      console.error('캡처할 요소를 찾을 수 없습니다.');
      return;
    }

    try {
      // Blob으로 변환
      const blob = await toBlob(elementRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          margin: '0',
        },
      });

      if (!blob) {
        throw new Error('이미지 변환에 실패했습니다.');
      }

      // 클립보드 API 사용
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        alert('이미지가 클립보드에 복사되었습니다!');
      } else {
        // ClipboardItem을 지원하지 않는 브라우저를 위한 대체 방법
        // (data URL을 사용한 임시 이미지 복사)
        const dataUrl = await toPng(elementRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          style: {
            margin: '0',
          },
        });

        // 임시로 canvas에 그려서 복사
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              navigator.clipboard
                .write([new ClipboardItem({ 'image/png': blob })])
                .then(() => {
                  alert('이미지가 클립보드에 복사되었습니다!');
                })
                .catch(() => {
                  alert('클립보드 복사에 실패했습니다. 브라우저를 확인해주세요.');
                });
            }
          });
        };
        img.src = dataUrl;
      }
    } catch (error) {
      console.error('클립보드 복사 중 오류 발생:', error);
      alert('이미지 복사 중 오류가 발생했습니다.');
    }
  };

  return { captureImage, copyToClipboard };
};
