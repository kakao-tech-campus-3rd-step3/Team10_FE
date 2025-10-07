import React, { useEffect, useRef, useState } from 'react';
import {
  getKakaoAuthorizationCode,
  getKakaoErrorMessage,
  getKakaoLoginStatus,
  useKakaoAuth,
  useKakaoRegister,
} from '@/Apis/kakao';
import { useNavigate } from 'react-router-dom';
import { useTokenCookies } from '@/utils/cookie';
import { AxiosError } from 'axios';
export const KakaoCallbackPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');
  const { loginWithCode, isPending } = useKakaoAuth();
  const { mutateAsync: registerWithCode, isPending: isRegisterPending } = useKakaoRegister();
  const navigate = useNavigate();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setAccessToken } = useTokenCookies();
  const isProcessing = useRef(false);
  const processedCode = useRef<string | null>(null);
  const handleError = (errorMessage: string, shouldLog = false, error?: unknown) => {
    if (shouldLog && error) {
      console.error('로그인 실패:', error);
    }

    setStatus('error');
    setMessage(errorMessage);

    timeout.current = setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleLogin = async (authorizationCode: string) => {
    if (isProcessing.current) {
      return;
    }

    try {
      isProcessing.current = true;
      setStatus('loading');
      setMessage('로그인 처리 중...');

      const savedNickname = sessionStorage.getItem('temp_nickname');

      if (savedNickname) {
        // 닉네임이 있으면 바로 회원가입 진행
        const result = await registerWithCode({
          code: authorizationCode,
          nickname: savedNickname,
        });

        if (result.accessToken) {
          setAccessToken(result.accessToken, 7);
          sessionStorage.removeItem('temp_nickname');

          setStatus('success');
          setMessage('회원가입이 완료되었습니다!');

          timeout.current = setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      } else {
        // 닉네임이 없으면 일반 로그인 진행
        const result = await loginWithCode(authorizationCode);
        setStatus('success');
        setMessage('로그인이 완료되었습니다!');

        if (result.accessToken) {
          setAccessToken(result.accessToken, 7);
        }

        timeout.current = setTimeout(() => {
          navigate('/home');
        }, 3000);
      }

      isProcessing.current = false;
      processedCode.current = null;
    } catch (error) {
      isProcessing.current = false;
      processedCode.current = null;

      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        // 기존 사용자가 아닌 경우 캐릭터 생성 페이지로 이동
        setStatus('success');
        setMessage('새로운 계정이 생성되었습니다!');

        timeout.current = setTimeout(() => {
          navigate('/character-create');
        }, 2000);
      } else {
        handleError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

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
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []); //의존성 배열 lint 경고 무시

  const currentStatus = isPending || isRegisterPending ? 'loading' : status;
  const currentMessage = isPending || isRegisterPending ? '서버와 통신 중...' : message;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {currentStatus === 'loading' && (
          <>
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #fee500',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px',
              }}
            />
            <h2 style={{ color: '#333', marginBottom: '10px' }}>로그인 처리 중...</h2>
            <p style={{ color: '#666' }}>{currentMessage}</p>
          </>
        )}

        {currentStatus === 'success' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ color: '#00a86b', marginBottom: '10px' }}>로그인 성공!</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{currentMessage}</p>
            <p style={{ color: '#999', fontSize: '14px' }}>3초 후 메인 페이지로 이동합니다...</p>
          </>
        )}

        {currentStatus === 'error' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
            <h2 style={{ color: '#e74c3c', marginBottom: '10px' }}>로그인 실패</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{currentMessage}</p>
            <p style={{ color: '#999', fontSize: '14px' }}>3초 후 로그인 페이지로 이동합니다...</p>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
