import { apiRequest } from '../apiClient';

export interface EmergencyRequestDto {
  latitude: number;
  longitude: number;
  type: string;
}

export const emergencyApi = {
  create: async (data: EmergencyRequestDto) => {
    return apiRequest('/emergency-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  accept: async (id: string) => {
    return apiRequest('/emergency-requests/' + id + '/accept', {
      method: 'PATCH',
    });
  },

  getById: async (id: string) => {
    return apiRequest('/emergency-requests/' + id, { method: 'GET' });
  },
};
