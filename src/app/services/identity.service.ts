import { gateway } from './gateway-client';

export const IdentityService = {
  issueCredential(data: {
    type: string;
    subject: Record<string, any>;
    issuer?: string;
  }) {
    return gateway.post('/identity/credentials/issue', data);
  },

  verifyCredential(credential: any) {
    return gateway.post('/identity/credentials/verify', { credential });
  },

  getCredential(id: string) {
    return gateway.get(`/identity/credentials/${id}`);
  },

  createPresentation(credentialIds: string[]) {
    return gateway.post('/identity/presentations', { credentialIds });
  },

  getDIDs() {
    return gateway.get('/identity/dids');
  },
};
