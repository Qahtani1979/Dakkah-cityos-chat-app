import { gateway } from './gateway-client';

export const StorageService = {
  async upload(file: File, path?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (path) formData.append('path', path);

    const baseUrl = import.meta.env.VITE_PAYLOAD_CMS_URL || '';
    const authHeaders = gateway.getAuthHeaders();
    delete authHeaders['Content-Type'];

    const response = await fetch(`${baseUrl}/api/gateway/storage/upload`, {
      method: 'POST',
      headers: authHeaders,
      body: formData,
    });

    return response.json();
  },

  getFileUrl(key: string) {
    return gateway.get(`/storage/files/${key}`);
  },

  deleteFile(key: string) {
    return gateway.delete(`/storage/files/${key}`);
  },
};
