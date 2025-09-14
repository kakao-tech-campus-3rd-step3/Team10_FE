import React, { useEffect, useState } from 'react';
import {
  getKakaoAuthorizationCode,
  getKakaoErrorMessage,
  getKakaoLoginStatus,
  useKakaoAuth,
} from '@/Apis/kakao';

export const KakaoCallbackPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');
  const { loginWithCode, isPending } = useKakaoAuth();

  useEffect(() => {
    const loginStatus = getKakaoLoginStatus();

    if (loginStatus === 'success') {
      // 성공 시 authorization code 추출
      const authorizationCode = getKakaoAuthorizationCode();

      console.log('🎉 카카오 로그인 성공!');
      console.log('📝 Authorization Code:', authorizationCode);
      console.log('🔗 전체 URL:', window.location.href);

      // 백엔드로 POST 요청 보내기
      if (authorizationCode) {
        console.log('📤 백엔드로 POST 요청 전송 중...');
        loginWithCode(authorizationCode);
      }
    } else if (loginStatus === 'error') {
      // 에러 시 에러 메시지 추출
      const errorMessage = getKakaoErrorMessage();

      console.log('❌ 카카오 로그인 실패!');
      console.log('🚨 Error Message:', errorMessage);
      console.log('🔗 전체 URL:', window.location.href);

      setStatus('error');
      setMessage(`로그인 실패: ${errorMessage || '알 수 없는 오류'}`);

      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } else {
      // 대기 중
      console.log('⏳ 카카오 로그인 대기 중...');
      setMessage('카카오 로그인을 처리하고 있습니다...');
    }
  }, []);

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
        {status === 'loading' && (
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
            <p style={{ color: '#666' }}>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ color: '#00a86b', marginBottom: '10px' }}>로그인 성공!</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{message}</p>
            <p style={{ color: '#999', fontSize: '14px' }}>3초 후 메인 페이지로 이동합니다...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
            <h2 style={{ color: '#e74c3c', marginBottom: '10px' }}>로그인 실패</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{message}</p>
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
