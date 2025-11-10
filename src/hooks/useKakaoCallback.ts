import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getKakaoAuthorizationCode,
  getKakaoErrorMessage,
  getKakaoLoginStatus,
  useKakaoAuth,
  useKakaoRegister,
} from '@/Apis/kakao';
import { useTokenCookies } from '@/utils/cookie';
import {
  getSavedNickname,
  clearSavedNickname,
  getErrorNavigationTarget,
  getLoginSuccessDelay,
  getSuccessMessage,
  getErrorMessage,
  getStatusFromError,
  getRedirectDelay,
  isDuplicateNicknameError,
} from '@/utils/kakaoLoginLogic';

type CallbackStatus = 'loading' | 'success' | 'error';

interface UseKakaoCallbackReturn {
  status: CallbackStatus;
  message: string;
  isPending: boolean;
}

export const useKakaoCallback = (): UseKakaoCallbackReturn => {
  const [status, setStatus] = useState<CallbackStatus>('loading');
  const [message, setMessage] = useState<string>('');

  const { loginWithCode, isPending: isLoginPending } = useKakaoAuth();
  const { mutateAsync: registerWithCode, isPending: isRegisterPending } = useKakaoRegister();
  const { setAccessToken } = useTokenCookies();

  const navigate = useNavigate();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProcessing = useRef(false);
  const processedCode = useRef<string | null>(null);

  /**
   * 에러 처리 및 리다이렉션
   */
  const handleError = (errorMessage: string, shouldLog = false, error?: unknown) => {
    if (shouldLog && error) {
      console.error('로그인 실패:', error);
    }

    setStatus('error');
    setMessage(errorMessage);

    const navigationTarget = error ? getErrorNavigationTarget(error) : '/login';
    const delay = getRedirectDelay(navigationTarget);
    timeout.current = setTimeout(() => {
      navigate(navigationTarget);
    }, delay);
  };

  /**
   * 회원가입 처리
   */
  const handleRegistration = async (code: string, nickname: string) => {
    try {
      const result = await registerWithCode({ code, nickname });

      if (result.accessToken) {
        setAccessToken(result.accessToken, 7);
        clearSavedNickname();

        const isRegistration = true;
        setStatus('success');
        setMessage(getSuccessMessage(isRegistration));

        const delay = getLoginSuccessDelay(isRegistration);
        timeout.current = setTimeout(() => {
          navigate('/home');
        }, delay);
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * 일반 로그인 처리
   */
  const handleLoginFlow = async (code: string) => {
    const result = await loginWithCode(code);

    const isRegistration = false;
    setStatus('success');
    setMessage(getSuccessMessage(isRegistration));

    if (result.accessToken) {
      setAccessToken(result.accessToken, 7);
    }

    const delay = getLoginSuccessDelay(isRegistration);
    timeout.current = setTimeout(() => {
      navigate('/home');
    }, delay);
  };

  /**
   * 로그인/회원가입 처리 로직
   */
  const handleLogin = async (authorizationCode: string) => {
    if (isProcessing.current) {
      return;
    }

    const savedNickname = getSavedNickname();
    const isRegistrationFlow = savedNickname !== null;

    try {
      isProcessing.current = true;
      setStatus('loading');
      setMessage('로그인 처리 중...');

      if (savedNickname) {
        await handleRegistration(authorizationCode, savedNickname);
      } else {
        await handleLoginFlow(authorizationCode);
      }

      isProcessing.current = false;
      processedCode.current = null;
    } catch (error) {
      isProcessing.current = false;
      processedCode.current = null;

      const statusType = getStatusFromError(error);
      const errorMessage = getErrorMessage(error);

      // 닉네임 중복 에러인 경우 alert 표시
      if (isDuplicateNicknameError(error)) {
        alert(errorMessage);
      }

      const navigationTarget = isRegistrationFlow
        ? '/character-create'
        : getErrorNavigationTarget(error);
      const delay = getRedirectDelay(navigationTarget);

      setStatus(statusType);
      setMessage(errorMessage);

      timeout.current = setTimeout(() => {
        navigate(navigationTarget);
      }, delay);
    }
  };

  /**
   * 카카오 콜백 URL에서 인증 코드 추출 및 처리
   */
  useEffect(() => {
    const loginStatus = getKakaoLoginStatus();

    if (loginStatus === 'success') {
      const authorizationCode = getKakaoAuthorizationCode();

      if (
        authorizationCode &&
        !isProcessing.current &&
        processedCode.current !== authorizationCode
      ) {
        processedCode.current = authorizationCode;
        window.history.replaceState({}, '', '/auth/kakao/callback');
        handleLogin(authorizationCode);
      }
    } else if (loginStatus === 'error') {
      const errorMessage = getKakaoErrorMessage();
      handleError(`로그인 실패: ${errorMessage || '알 수 없는 오류'}`);
    } else {
      setMessage('카카오 로그인을 처리하고 있습니다...');
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPending = isLoginPending || isRegisterPending;
  const currentStatus = isPending ? 'loading' : status;
  const currentMessage = isPending ? '서버와 통신 중...' : message;

  return {
    status: currentStatus,
    message: currentMessage,
    isPending,
  };
};
