import React from 'react';
import { useKakaoCallback } from '@/hooks/useKakaoCallback';

export const KakaoCallbackPage: React.FC = () => {
  const { status: currentStatus, message: currentMessage } = useKakaoCallback();

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
