import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSW 브라우저 워커 인스턴스
 *
 * @example
 * main.tsx에서 사용
 * import { worker } from './mocks/browser';
 *
 * if (process.env.NODE_ENV === 'development') {
 *   worker.start().then(() => {
 *     console.log('MSW가 활성화되었습니다.');
 *   });
 * }
 *
 * @see {@link https://mswjs.io/docs/api/setup-worker} MSW setupWorker 문서
 * @see {@link ./handlers} API 핸들러 정의
 */
export const worker = setupWorker(...handlers);
