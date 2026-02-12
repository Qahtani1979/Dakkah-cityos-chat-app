import { gateway } from './gateway-client';

export interface SystemStatus {
  status: 'up' | 'down' | 'degraded';
  latency?: number;
}

export interface HealthCheckResponse {
  status: 'operational' | 'degraded' | 'down';
  systems: Record<string, SystemStatus>;
}

export const HealthService = {
  check() {
    return gateway.get<HealthCheckResponse>('/health');
  },
};
