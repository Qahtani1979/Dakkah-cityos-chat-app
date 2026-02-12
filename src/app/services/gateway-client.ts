const GATEWAY_BASE_URL = import.meta.env.VITE_PAYLOAD_CMS_URL || '';

interface GatewayResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    source: string;
    timestamp: string;
    requestId: string;
  };
}

interface RequestOptions {
  method?: string;
  body?: any;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

class GatewayClient {
  private baseUrl: string;
  private apiKey: string;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = `${GATEWAY_BASE_URL}/api/gateway`;
    this.apiKey = import.meta.env.VITE_CITYOS_API_KEY || '';
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private getHeaders(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...extra,
    };

    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    }

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  getAuthHeaders(): Record<string, string> {
    return this.getHeaders();
  }

  async request<T = any>(path: string, options: RequestOptions = {}): Promise<GatewayResponse<T>> {
    const { method = 'GET', body, params, headers } = options;

    try {
      const response = await fetch(this.buildUrl(path, params), {
        method,
        headers: this.getHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
      });

      const json = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: json.error || {
            code: `HTTP_${response.status}`,
            message: response.statusText,
          },
        };
      }

      if (json.success !== undefined) {
        return json as GatewayResponse<T>;
      }

      return { success: true, data: json, meta: json.meta };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error.message || 'Failed to connect to gateway',
        },
      };
    }
  }

  get<T = any>(path: string, params?: Record<string, string>) {
    return this.request<T>(path, { params });
  }

  post<T = any>(path: string, body?: any) {
    return this.request<T>(path, { method: 'POST', body });
  }

  put<T = any>(path: string, body?: any) {
    return this.request<T>(path, { method: 'PUT', body });
  }

  delete<T = any>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const gateway = new GatewayClient();
export type { GatewayResponse };
