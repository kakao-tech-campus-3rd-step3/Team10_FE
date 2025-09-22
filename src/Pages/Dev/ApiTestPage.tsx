import { useState, useEffect } from 'react';
import { useQueryApi } from '@/Apis';

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

  // GET /test 요청
  const {
    refetch: refetchTest,
    isLoading: isLoadingTest,
    data: testData,
    error: testError,
  } = useQueryApi(['test'], '/test', {
    enabled: false, // 수동으로 실행
  });

  // GET /test 결과 처리
  useEffect(() => {
    if (testData) {
      appendLog({
        label: 'GET /test',
        ok: true,
        status: 200,
        data: testData,
      });
    }
  }, [testData]);

  useEffect(() => {
    if (testError) {
      appendLog({
        label: 'GET /test',
        ok: false,
        error: testError.message,
      });
    }
  }, [testError]);

  const getTest = () => {
    refetchTest();
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>API 테스트</h2>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={getTest} disabled={isLoadingTest}>
          GET /test
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
