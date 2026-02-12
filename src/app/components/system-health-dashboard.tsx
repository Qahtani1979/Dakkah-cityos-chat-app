import { useState, useEffect, useCallback } from 'react';
import { gateway } from '../services/gateway-client';
import { CommerceService } from '../services/commerce.service';
import { LogisticsService } from '../services/logistics.service';
import { ERPService } from '../services/erp.service';
import { IdentityService } from '../services/identity.service';
import { ContentService } from '../services/content.service';
import { HealthService } from '../services/health.service';

type TestStatus = 'idle' | 'testing' | 'pass' | 'fail' | 'warn';

interface SystemTest {
  name: string;
  icon: string;
  description: string;
  directUrl?: string;
  gatewayTest: () => Promise<{ ok: boolean; detail: string; latency: number }>;
}

interface TestResult {
  name: string;
  directStatus: TestStatus;
  directLatency?: number;
  directDetail?: string;
  gatewayStatus: TestStatus;
  gatewayLatency?: number;
  gatewayDetail?: string;
}

async function testDirect(url: string | undefined): Promise<{ ok: boolean; latency: number; detail: string; uncertain?: boolean }> {
  if (!url) return { ok: false, latency: 0, detail: 'URL not configured' };
  const start = Date.now();
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const resp = await fetch(url, { method: 'HEAD', signal: ctrl.signal });
    clearTimeout(timer);
    const latency = Date.now() - start;
    return { ok: resp.ok || resp.status < 500, latency, detail: `HTTP ${resp.status} (${latency}ms)` };
  } catch (err: any) {
    const latency = Date.now() - start;
    if (err.name === 'AbortError') return { ok: false, latency, detail: 'Timeout (8s)' };
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      return { ok: false, latency, detail: 'CORS/Network blocked', uncertain: true };
    }
    return { ok: false, latency, detail: err.message };
  }
}

async function testGatewayEndpoint(fn: () => Promise<any>): Promise<{ ok: boolean; detail: string; latency: number }> {
  const start = Date.now();
  try {
    const result = await fn();
    const latency = Date.now() - start;
    if (result.success) {
      return { ok: true, latency, detail: `OK (${latency}ms)` };
    }
    const code = result.error?.code || 'ERROR';
    const msg = result.error?.message || 'Unknown error';
    if (code === 'NETWORK_ERROR') return { ok: false, latency, detail: 'Gateway unreachable' };
    return { ok: false, latency, detail: `${code}: ${msg}` };
  } catch (err: any) {
    return { ok: false, latency: Date.now() - start, detail: err.message };
  }
}

const SYSTEMS: SystemTest[] = [
  {
    name: 'API Gateway',
    icon: '🏗️',
    description: 'Payload CMS master system',
    directUrl: import.meta.env.VITE_PAYLOAD_CMS_URL,
    gatewayTest: () => testGatewayEndpoint(() => HealthService.check()),
  },
  {
    name: 'Commerce',
    icon: '🛒',
    description: 'Medusa — products & orders',
    directUrl: import.meta.env.VITE_MEDUSA_API_URL,
    gatewayTest: () => testGatewayEndpoint(() => CommerceService.getProducts({ limit: '1' })),
  },
  {
    name: 'Logistics',
    icon: '🚛',
    description: 'Fleetbase — fleet & delivery',
    directUrl: import.meta.env.VITE_FLEETBASE_URL,
    gatewayTest: () => testGatewayEndpoint(() => LogisticsService.getFleets()),
  },
  {
    name: 'ERP',
    icon: '📊',
    description: 'ERPNext — finance & inventory',
    directUrl: import.meta.env.VITE_ERPNEXT_URL,
    gatewayTest: () => testGatewayEndpoint(() => ERPService.getInvoices({ limit: '1' })),
  },
  {
    name: 'Identity',
    icon: '🪪',
    description: 'Walt.id — credentials & DID',
    directUrl: import.meta.env.VITE_WALTID_URL,
    gatewayTest: () => testGatewayEndpoint(() => IdentityService.getDIDs()),
  },
  {
    name: 'Content',
    icon: '📝',
    description: 'Payload CMS — pages & collections',
    gatewayTest: () => testGatewayEndpoint(() => ContentService.getPages({ limit: '1' })),
  },
  {
    name: 'Chat App',
    icon: '💬',
    description: 'Messaging system',
    directUrl: import.meta.env.VITE_CHAT_APP_URL,
    gatewayTest: () => Promise.resolve({ ok: false, latency: 0, detail: 'No gateway route' }),
  },
];

function StatusDot({ status }: { status: TestStatus }) {
  const colors: Record<TestStatus, string> = {
    idle: 'bg-zinc-300',
    testing: 'bg-yellow-400 animate-pulse',
    pass: 'bg-emerald-500',
    fail: 'bg-red-500',
    warn: 'bg-amber-500',
  };
  return <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors[status]}`} />;
}

export function SystemHealthDashboard({ onClose }: { onClose: () => void }) {
  const [results, setResults] = useState<TestResult[]>(
    SYSTEMS.map((s) => ({ name: s.name, directStatus: 'idle', gatewayStatus: 'idle' }))
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const gatewayConfigured = !!import.meta.env.VITE_PAYLOAD_CMS_URL && !!import.meta.env.VITE_CITYOS_API_KEY;

  const runAll = useCallback(async () => {
    setIsRunning(true);
    setResults(SYSTEMS.map((s) => ({ name: s.name, directStatus: 'testing', gatewayStatus: 'testing' })));

    const promises = SYSTEMS.map(async (sys, idx) => {
      const directResult = sys.directUrl
        ? await testDirect(sys.directUrl)
        : { ok: false, latency: 0, detail: 'N/A (no direct URL)', uncertain: false };

      let directStatus: TestStatus;
      if (!sys.directUrl) directStatus = 'warn';
      else if (directResult.uncertain) directStatus = 'warn';
      else if (directResult.ok) directStatus = 'pass';
      else directStatus = 'fail';

      setResults((prev) => {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          directStatus,
          directLatency: directResult.latency,
          directDetail: directResult.detail,
        };
        return next;
      });

      if (gatewayConfigured) {
        const gwResult = await sys.gatewayTest();
        setResults((prev) => {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            gatewayStatus: gwResult.ok ? 'pass' : gwResult.detail === 'No gateway route' ? 'warn' : 'fail',
            gatewayLatency: gwResult.latency,
            gatewayDetail: gwResult.detail,
          };
          return next;
        });
      } else {
        setResults((prev) => {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            gatewayStatus: 'warn',
            gatewayDetail: 'Gateway not configured',
          };
          return next;
        });
      }
    });

    await Promise.all(promises);
    setLastChecked(new Date());
    setIsRunning(false);
  }, [gatewayConfigured]);

  useEffect(() => {
    runAll();
  }, [runAll]);

  const directPasses = results.filter((r) => r.directStatus === 'pass').length;
  const gwPasses = results.filter((r) => r.gatewayStatus === 'pass').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">System Connectivity</h2>
              <p className="text-sm text-zinc-500 mt-0.5">
                {isRunning
                  ? 'Testing connections...'
                  : `Direct: ${directPasses}/${SYSTEMS.length} · Gateway: ${gwPasses}/${SYSTEMS.length}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={runAll}
                disabled={isRunning}
                className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition disabled:opacity-50"
              >
                {isRunning ? 'Testing...' : 'Re-test'}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[65vh]">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-5 py-2 text-[11px] font-medium text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
            <span>System</span>
            <span className="w-24 text-center">Direct</span>
            <span className="w-24 text-center">Gateway</span>
          </div>

          {SYSTEMS.map((sys, idx) => {
            const r = results[idx];
            return (
              <div
                key={sys.name}
                className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-center px-5 py-3 border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg">{sys.icon}</span>
                  <div className="min-w-0">
                    <span className="font-medium text-sm text-zinc-900 dark:text-white block">{sys.name}</span>
                    <span className="text-xs text-zinc-500 truncate block">{sys.description}</span>
                  </div>
                </div>
                <div className="w-24 flex items-center justify-center gap-1.5">
                  <StatusDot status={r.directStatus} />
                  <span className="text-[11px] text-zinc-500 truncate" title={r.directDetail}>
                    {r.directStatus === 'testing'
                      ? '...'
                      : r.directLatency
                      ? `${r.directLatency}ms`
                      : r.directDetail === 'N/A (no direct URL)'
                      ? 'N/A'
                      : r.directStatus === 'fail'
                      ? 'Down'
                      : '—'}
                  </span>
                </div>
                <div className="w-24 flex items-center justify-center gap-1.5">
                  <StatusDot status={r.gatewayStatus} />
                  <span className="text-[11px] text-zinc-500 truncate" title={r.gatewayDetail}>
                    {r.gatewayStatus === 'testing'
                      ? '...'
                      : r.gatewayLatency
                      ? `${r.gatewayLatency}ms`
                      : r.gatewayDetail === 'No gateway route'
                      ? 'N/A'
                      : r.gatewayStatus === 'warn'
                      ? 'N/C'
                      : r.gatewayStatus === 'fail'
                      ? 'Err'
                      : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5"><StatusDot status="pass" /> Connected</span>
            <span className="flex items-center gap-1.5"><StatusDot status="fail" /> Error</span>
            <span className="flex items-center gap-1.5"><StatusDot status="warn" /> Uncertain / N/A</span>
          </div>
          <div className="text-xs text-zinc-400 space-y-0.5">
            <p>
              <strong>Gateway:</strong>{' '}
              {gatewayConfigured
                ? `${import.meta.env.VITE_PAYLOAD_CMS_URL}`
                : 'Not configured — set VITE_PAYLOAD_CMS_URL & VITE_CITYOS_API_KEY'}
            </p>
            {lastChecked && <p>Last checked: {lastChecked.toLocaleTimeString()}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
