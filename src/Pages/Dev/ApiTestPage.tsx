import { useState, useEffect } from 'react';
import { useQueryApi, usePostApi } from '@/Apis';

type Log = {
  label: string;
  ok: boolean;
  status?: number;
  data?: unknown;
  error?: string;
};

export const ApiTestPage = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  const appendLog = (log: Log) => setLogs((prev) => [log, ...prev]);

  // 커스텀 훅을 사용한 GET 요청 (Direct)
  const {
    refetch: refetchDirect,
    isLoading: isLoadingDirect,
    data: directData,
    error: directError,
  } = useQueryApi(['test', 'direct'], '/test', {
    enabled: false, // 수동으로 실행
  });

  // JWT 토큰을 포함한 GET 요청 테스트
  const {
    refetch: refetchWithJWT,
    isLoading: isLoadingWithJWT,
    data: jwtData,
    error: jwtError,
  } = useQueryApi(['test', 'jwt'], '/quiz/topics', {
    enabled: false, // 수동으로 실행
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  });

  // 실제 JWT 토큰을 사용한 테스트 (로컬스토리지에서 가져오기)
  const [jwtToken, setJwtToken] = useState<string>('');

  const {
    refetch: refetchWithRealJWT,
    isLoading: isLoadingWithRealJWT,
    data: realJwtData,
    error: realJwtError,
  } = useQueryApi(['test', 'real-jwt'], '/test', {
    enabled: false,
    headers: jwtToken
      ? {
          Authorization: `Bearer ${jwtToken}`,
        }
      : undefined,
  });

  // Direct GET 결과 처리
  useEffect(() => {
    if (directData) {
      appendLog({
        label: 'Custom Hook GET /quiz/review (기본)',
        ok: true,
        status: 200,
        data: directData,
      });
    }
  }, [directData]);

  useEffect(() => {
    if (directError) {
      appendLog({
        label: 'Custom Hook GET /quiz/review (기본)',
        ok: false,
        error: directError.message,
      });
    }
  }, [directError]);

  // JWT 토큰 GET 결과 처리
  useEffect(() => {
    if (jwtData) {
      appendLog({
        label: 'Custom Hook GET /quiz/topics (JWT 토큰 포함)',
        ok: true,
        status: 200,
        data: {
          ...jwtData,
          _debug_info: {
            headers_sent: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              'Content-Type': 'application/json',
            },
          },
        },
      });
    }
  }, [jwtData]);

  useEffect(() => {
    if (jwtError) {
      appendLog({
        label: 'Custom Hook GET /quiz/topics (JWT 토큰 포함)',
        ok: false,
        error: jwtError.message,
      });
    }
  }, [jwtError]);

  // 실제 JWT 토큰 GET 결과 처리
  useEffect(() => {
    if (realJwtData) {
      appendLog({
        label: 'Custom Hook GET /quiz/topics (실제 JWT 토큰)',
        ok: true,
        status: 200,
        data: {
          ...realJwtData,
          _debug_info: {
            headers_sent: {
              Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'application/json',
            },
          },
        },
      });
    }
  }, [realJwtData, jwtToken]);

  useEffect(() => {
    if (realJwtError) {
      appendLog({
        label: 'Custom Hook GET /quiz/topics (실제 JWT 토큰)',
        ok: false,
        error: realJwtError.message,
      });
    }
  }, [realJwtError]);

  const getDirect = () => {
    refetchDirect();
  };

  const getWithJWT = () => {
    refetchWithJWT();
  };

  const getWithRealJWT = () => {
    refetchWithRealJWT();
  };

  // JWT 토큰 입력 핸들러
  const handleJWTInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJwtToken(e.target.value);
  };

  // 로컬스토리지에서 JWT 토큰 불러오기
  const loadJWTFromStorage = () => {
    const token = localStorage.getItem('jwt_token') || '';
    setJwtToken(token);
  };

  // 커스텀 훅을 사용한 GET 요청 (Proxy)
  const {
    refetch: refetchProxy,
    isLoading: isLoadingProxy,
    data: proxyData,
    error: proxyError,
  } = useQueryApi(['test', 'proxy'], '/test', {
    enabled: false, // 수동으로 실행
  });

  // Proxy GET 결과 처리
  useEffect(() => {
    if (proxyData) {
      appendLog({
        label: 'Custom Hook GET /quiz/topics (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: proxyData,
      });
    }
  }, [proxyData]);

  useEffect(() => {
    if (proxyError) {
      appendLog({
        label: 'Custom Hook GET /quiz/topics (baseURL 자동 적용)',
        ok: false,
        error: proxyError.message,
      });
    }
  }, [proxyError]);

  const getProxy = () => {
    refetchProxy();
  };

  // 커스텀 훅을 사용한 POST 요청 (Direct)
  const postDirectMutation = usePostApi<unknown, { ping: boolean }>('/test');

  // Direct POST 결과 처리
  useEffect(() => {
    if (postDirectMutation.data) {
      appendLog({
        label: 'Custom Hook POST /quiz/topics (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: postDirectMutation.data,
      });
    }
  }, [postDirectMutation.data]);

  useEffect(() => {
    if (postDirectMutation.error) {
      appendLog({
        label: 'Custom Hook POST /quiz/topics (baseURL 자동 적용)',
        ok: false,
        error: postDirectMutation.error.message,
      });
    }
  }, [postDirectMutation.error]);

  const postDirectPreflight = () => {
    postDirectMutation.mutate({ ping: true });
  };

  // 커스텀 훅을 사용한 POST 요청 (Proxy)
  const postProxyMutation = usePostApi<unknown, { ping: boolean }>('/test');

  // Proxy POST 결과 처리
  useEffect(() => {
    if (postProxyMutation.data) {
      appendLog({
        label: 'Custom Hook POST /quiz/topics (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: postProxyMutation.data,
      });
    }
  }, [postProxyMutation.data]);

  useEffect(() => {
    if (postProxyMutation.error) {
      appendLog({
        label: 'Custom Hook POST /quiz/topics (baseURL 자동 적용)',
        ok: false,
        error: postProxyMutation.error.message,
      });
    }
  }, [postProxyMutation.error]);

  const postProxyPreflight = () => {
    postProxyMutation.mutate({ ping: true });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>API 테스트 (Custom Hooks + JWT 토큰 테스트)</h2>

      {/* JWT 토큰 입력 섹션 */}
      <div style={{ marginBottom: 16, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
        <h3>JWT 토큰 설정</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <input
            type="text"
            placeholder="JWT 토큰을 입력하세요 (Bearer 제외)"
            value={jwtToken}
            onChange={handleJWTInput}
            style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
          />
          <button
            onClick={loadJWTFromStorage}
            style={{
              padding: 8,
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: 4,
            }}
          >
            로컬스토리지에서 불러오기
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>
          현재 토큰: {jwtToken ? `${jwtToken.substring(0, 20)}...` : '없음'}
        </div>

        {/* 네트워크 탭 확인 가이드 */}
        <div
          style={{
            marginTop: 12,
            padding: 8,
            backgroundColor: '#f8f9fa',
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          <strong>🔍 네트워크 탭에서 헤더 확인 방법:</strong>
          <ol style={{ margin: 4, paddingLeft: 16 }}>
            <li>F12로 개발자 도구 열기</li>
            <li>Network 탭 클릭</li>
            <li>아래 버튼 중 하나 클릭</li>
            <li>/quiz/topics 요청 찾아서 클릭</li>
            <li>Headers 탭 → Request Headers에서 Authorization 확인</li>
          </ol>
        </div>
      </div>

      {/* API 테스트 버튼들 */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={getDirect} disabled={isLoadingDirect}>
          GET /quiz/topics (기본)
        </button>
        <button onClick={getWithJWT} disabled={isLoadingWithJWT}>
          GET /quiz/topics (테스트 JWT)
        </button>
        <button onClick={getWithRealJWT} disabled={isLoadingWithRealJWT || !jwtToken}>
          GET /quiz/topics (실제 JWT)
        </button>
        <button onClick={getProxy} disabled={isLoadingProxy}>
          GET /quiz/topics (동일)
        </button>
        <button onClick={postDirectPreflight} disabled={postDirectMutation.isPending}>
          POST /quiz/topics
        </button>
        <button onClick={postProxyPreflight} disabled={postProxyMutation.isPending}>
          POST /quiz/topics (동일)
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
        {logs.map((l, idx) => (
          <div key={idx} style={{ padding: 8, border: '1px solid #eee', marginBottom: 8 }}>
            <div>
              <strong>{l.label}</strong>
            </div>
            <div>
              ok: {String(l.ok)}
              {l.status !== undefined ? `, status: ${l.status}` : ''}
            </div>
            {l.data !== undefined && (
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(l.data, null, 2)}
              </pre>
            )}
            {l.error && <div style={{ color: 'crimson' }}>error: {l.error}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTestPage;
