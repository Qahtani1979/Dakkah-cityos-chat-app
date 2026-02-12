import { gateway } from './gateway-client';

export const ContentService = {
  getPages(params?: Record<string, string>) {
    return gateway.get('/content/pages', params);
  },

  getPage(slug: string) {
    return gateway.get(`/content/pages/${slug}`);
  },

  getCollection(collection: string, params?: Record<string, string>) {
    return gateway.get(`/content/collections/${collection}`, params);
  },

  search(query: string, collections?: string[]) {
    return gateway.post('/content/search', { query, collections });
  },
};
