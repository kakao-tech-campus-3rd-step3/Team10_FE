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

  // Direct GET 결과 처리
  useEffect(() => {
    if (directData) {
      appendLog({
        label: 'Custom Hook GET /test (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: directData,
      });
    }
  }, [directData]);

  useEffect(() => {
    if (directError) {
      appendLog({
        label: 'Custom Hook GET /test (baseURL 자동 적용)',
        ok: false,
        error: directError.message,
      });
    }
  }, [directError]);

  const getDirect = () => {
    refetchDirect();
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
        label: 'Custom Hook GET /test (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: proxyData,
      });
    }
  }, [proxyData]);

  useEffect(() => {
    if (proxyError) {
      appendLog({
        label: 'Custom Hook GET /test (baseURL 자동 적용)',
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
        label: 'Custom Hook POST /test (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: postDirectMutation.data,
      });
    }
  }, [postDirectMutation.data]);

  useEffect(() => {
    if (postDirectMutation.error) {
      appendLog({
        label: 'Custom Hook POST /test (baseURL 자동 적용)',
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
        label: 'Custom Hook POST /test (baseURL 자동 적용)',
        ok: true,
        status: 200,
        data: postProxyMutation.data,
      });
    }
  }, [postProxyMutation.data]);

  useEffect(() => {
    if (postProxyMutation.error) {
      appendLog({
        label: 'Custom Hook POST /test (baseURL 자동 적용)',
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
      <h2>API 테스트 (Custom Hooks + baseURL 자동 적용)</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={getDirect} disabled={isLoadingDirect}>
          GET /test
        </button>
        <button onClick={getProxy} disabled={isLoadingProxy}>
          GET /test (동일)
        </button>
        <button onClick={postDirectPreflight} disabled={postDirectMutation.isPending}>
          POST /test
        </button>
        <button onClick={postProxyPreflight} disabled={postProxyMutation.isPending}>
          POST /test (동일)
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
