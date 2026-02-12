import { gateway } from './gateway-client';

export const CommsService = {
  sendEmail(data: {
    to: string;
    subject: string;
    body: string;
    html?: string;
  }) {
    return gateway.post('/comms/email', data);
  },

  sendTemplatedEmail(data: {
    to: string;
    templateId: string;
    dynamicData: Record<string, any>;
  }) {
    return gateway.post('/comms/email/template', data);
  },
};
