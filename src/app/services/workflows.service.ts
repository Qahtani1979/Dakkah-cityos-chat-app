import { gateway } from './gateway-client';

export type WorkflowType =
  | 'order-fulfillment'
  | 'ride-booking'
  | 'service-booking'
  | 'identity-verification'
  | 'event-registration'
  | 'copilot-action';

export const WorkflowsService = {
  startWorkflow(data: {
    type: WorkflowType;
    action: string;
    userId: string;
    data: Record<string, any>;
  }) {
    return gateway.post('/workflows/start', data);
  },

  getWorkflowStatus(workflowId: string) {
    return gateway.get(`/workflows/${workflowId}`);
  },

  signalWorkflow(workflowId: string, signalName: string, data?: any) {
    return gateway.post(`/workflows/${workflowId}/signal`, { signalName, data });
  },

  cancelWorkflow(workflowId: string) {
    return gateway.post(`/workflows/${workflowId}/cancel`);
  },

  listWorkflows(params?: Record<string, string>) {
    return gateway.get('/workflows/list', params);
  },
};
