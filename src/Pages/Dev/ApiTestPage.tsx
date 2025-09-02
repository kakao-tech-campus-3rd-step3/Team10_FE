import { useState } from 'react';

type Log = {
  label: string;
  ok: boolean;
  status?: number;
  data?: unknown;
  error?: string;
};

export default function ApiTestPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  const appendLog = (log: Log) => setLogs((prev) => [log, ...prev]);

  const getDirect = async () => {
    try {
      const res = await fetch('https://sadajobe.shop/test', {
        // mode 기본값이 브라우저에선 'cors'라 명시 안 해도 됨(절대 'no-cors' 금지)
        // credentials: "include", // 쿠키 쓸 때만 같이 켜고, 서버도 Allow-Credentials 설정 필요
      });
      const data = await safeJson(res);
      appendLog({
        label: 'Direct GET https://sadajobe.shop/test',
        ok: res.ok,
        status: res.status,
        data,
      });
    } catch (e) {
      appendLog({
        label: 'Direct GET https://sadajobe.shop/test',
        ok: false,
        error: toErr(e),
      });
    }
  };

  const getProxy = async () => {
    try {
      const res = await fetch('/api/test');
      const data = await safeJson(res);
      appendLog({ label: 'Proxy GET /api/test', ok: res.ok, status: res.status, data });
    } catch (e) {
      appendLog({ label: 'Proxy GET /api/test', ok: false, error: toErr(e) });
    }
  };

  const postDirectPreflight = async () => {
    try {
      const res = await fetch('sadajobe.shop/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Test': '1', // 커스텀 헤더 → Preflight 유도
        },
        body: JSON.stringify({ ping: true }),
      });
      const data = await safeJson(res);
      appendLog({
        label: 'Direct POST sadajobe.shop/test (preflight)',
        ok: res.ok,
        status: res.status,
        data,
      });
    } catch (e) {
      appendLog({
        label: 'Direct POST sadajobe.shop/test (preflight)',
        ok: false,
        error: toErr(e),
      });
    }
  };

  const postProxyPreflight = async () => {
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Test': '1',
        },
        body: JSON.stringify({ ping: true }),
      });
      const data = await safeJson(res);
      appendLog({
        label: 'Proxy POST /api/test (preflight)',
        ok: res.ok,
        status: res.status,
        data,
      });
    } catch (e) {
      appendLog({ label: 'Proxy POST /api/test (preflight)', ok: false, error: toErr(e) });
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>API CORS 테스트</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={getDirect}>Direct GET</button>
        <button onClick={getProxy}>Proxy GET</button>
        <button onClick={postDirectPreflight}>Direct POST (preflight)</button>
        <button onClick={postProxyPreflight}>Proxy POST (preflight)</button>
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
}

async function safeJson(res: Response): Promise<unknown> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function toErr(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
