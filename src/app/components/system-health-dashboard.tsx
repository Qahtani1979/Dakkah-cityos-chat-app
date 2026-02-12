import { useState, useEffect, useCallback } from 'react';

interface SystemInfo {
  name: string;
  url: string;
  description: string;
  icon: string;
}

interface SystemCheckResult {
  name: string;
  status: 'checking' | 'up' | 'down' | 'unknown';
  latency?: number;
  error?: string;
}

const SYSTEMS: SystemInfo[] = [
  {
    name: 'Payload CMS',
    url: import.meta.env.VITE_PAYLOAD_CMS_URL,
    description: 'Master system & API Gateway',
    icon: '🏗️',
  },
  {
    name: 'Medusa Commerce',
    url: import.meta.env.VITE_MEDUSA_API_URL,
    description: 'Products, orders, stores',
    icon: '🛒',
  },
  {
    name: 'Fleetbase',
    url: import.meta.env.VITE_FLEETBASE_URL,
    description: 'Logistics & fleet management',
    icon: '🚛',
  },
  {
    name: 'ERPNext',
    url: import.meta.env.VITE_ERPNEXT_URL,
    description: 'Finance, HR, inventory',
    icon: '📊',
  },
  {
    name: 'Walt.id',
    url: import.meta.env.VITE_WALTID_URL,
    description: 'Digital identity & credentials',
    icon: '🪪',
  },
  {
    name: 'Chat App',
    url: import.meta.env.VITE_CHAT_APP_URL,
    description: 'Messaging system',
    icon: '💬',
  },
];

async function checkSystem(url: string): Promise<{ up: boolean; latency: number; error?: string }> {
  if (!url) return { up: false, latency: 0, error: 'URL not configured' };

  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const latency = Date.now() - start;
    return { up: true, latency };
  } catch (err: any) {
    const latency = Date.now() - start;
    if (err.name === 'AbortError') {
      return { up: false, latency, error: 'Timeout (8s)' };
    }
    return { up: latency < 5000, latency, error: err.message };
  }
}

export function SystemHealthDashboard({ onClose }: { onClose: () => void }) {
  const [results, setResults] = useState<SystemCheckResult[]>(
    SYSTEMS.map((s) => ({ name: s.name, status: 'checking' }))
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const runChecks = useCallback(async () => {
    setResults(SYSTEMS.map((s) => ({ name: s.name, status: 'checking' })));

    const promises = SYSTEMS.map(async (sys, idx) => {
      const result = await checkSystem(sys.url);
      setResults((prev) => {
        const next = [...prev];
        next[idx] = {
          name: sys.name,
          status: result.up ? 'up' : result.error === 'URL not configured' ? 'unknown' : 'down',
          latency: result.latency,
          error: result.error,
        };
        return next;
      });
    });

    await Promise.all(promises);
    setLastChecked(new Date());
  }, []);

  useEffect(() => {
    runChecks();
  }, [runChecks]);

  const upCount = results.filter((r) => r.status === 'up').length;
  const downCount = results.filter((r) => r.status === 'down').length;
  const checkingCount = results.filter((r) => r.status === 'checking').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">System Health</h2>
              <p className="text-sm text-zinc-500 mt-0.5">
                {checkingCount > 0
                  ? 'Checking systems...'
                  : `${upCount} up · ${downCount} down`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={runChecks}
                className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                Refresh
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

        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
          {SYSTEMS.map((sys, idx) => {
            const result = results[idx];
            return (
              <div
                key={sys.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50"
              >
                <span className="text-xl">{sys.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-zinc-900 dark:text-white">
                      {sys.name}
                    </span>
                    {result.latency && result.status === 'up' && (
                      <span className="text-xs text-zinc-400">{result.latency}ms</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{sys.description}</p>
                  {result.error && result.status === 'down' && (
                    <p className="text-xs text-red-400 mt-0.5">{result.error}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {result.status === 'checking' && (
                    <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                  )}
                  {result.status === 'up' && (
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  )}
                  {result.status === 'down' && (
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                  )}
                  {result.status === 'unknown' && (
                    <div className="w-3 h-3 rounded-full bg-zinc-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
          <div className="text-xs text-zinc-400 space-y-1">
            <p>
              All API calls route through <strong>Payload CMS</strong> gateway.
            </p>
            {lastChecked && (
              <p>Last checked: {lastChecked.toLocaleTimeString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
