import { apiRequest } from '../apiClient';

export interface CreateOfferDto {
  amount: number;
  estimatedTimeMin?: number;
  description?: string;
}

export const offersApi = {
  create: async (requestId: string, data: CreateOfferDto) => {
    return apiRequest('/offers/request/' + requestId, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  findAllForRequest: async (requestId: string) => {
    return apiRequest('/offers/request/' + requestId, { method: 'GET' });
  },

  updateStatus: async (offerId: string, status: 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN') => {
    return apiRequest('/offers/' + offerId + '/status', {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
