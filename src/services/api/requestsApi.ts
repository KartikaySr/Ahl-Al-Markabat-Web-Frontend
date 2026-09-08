import { apiRequest } from '../apiClient';

export interface CreateRequestDto {
  categoryId: string;
  vehicleId?: string;
  description: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  isUrgent?: boolean;
  scheduledFor?: string;
}

export const requestsApi = {
  create: async (data: CreateRequestDto) => {
    return apiRequest('/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMyRequests: async () => {
    return apiRequest('/requests/my-requests', { method: 'GET' });
  },

  getOpenRequests: async () => {
    return apiRequest('/requests/open', { method: 'GET' });
  },

  getById: async (id: string) => {
    return apiRequest('/requests/' + id, { method: 'GET' });
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest('/requests/' + id + '/status', {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  assignTechnician: async (id: string, technicianId: string) => {
    return apiRequest('/requests/' + id + '/assign', {
      method: 'PATCH',
      body: JSON.stringify({ technicianId }),
    });
  },

  dispute: async (id: string) => {
    return apiRequest('/requests/' + id + '/dispute', { method: 'PATCH' });
  },
};
