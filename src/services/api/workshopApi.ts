import { apiRequest } from '../apiClient';

export type WorkshopResourceType = 'BAY' | 'EQUIPMENT' | 'PERSONNEL';

export const workshopApi = {
  addResource: async (businessId: string, name: string, type: WorkshopResourceType) => {
    return apiRequest('/workshop/resources', {
      method: 'POST',
      body: JSON.stringify({ businessId, name, type }),
    });
  },

  getResources: async (businessId: string) => {
    return apiRequest('/workshop/resources/' + businessId, { method: 'GET' });
  },

  bookResource: async (resourceId: string, serviceRequestId: string, startTime: string, endTime: string) => {
    return apiRequest('/workshop/resources/' + resourceId + '/book', {
      method: 'POST',
      body: JSON.stringify({ serviceRequestId, startTime, endTime }),
    });
  },

  createShift: async (businessId: string, memberId: string, startTime: string, endTime: string) => {
    return apiRequest('/workshop/shifts', {
      method: 'POST',
      body: JSON.stringify({ businessId, memberId, startTime, endTime }),
    });
  },

  getShifts: async (businessId: string) => {
    return apiRequest('/workshop/shifts/' + businessId, { method: 'GET' });
  },

  addContact: async (businessId: string, data: { name: string; email?: string; phone?: string; customerId?: string; notes?: string }) => {
    return apiRequest('/workshop/crm', {
      method: 'POST',
      body: JSON.stringify({ businessId, ...data }),
    });
  },

  getContacts: async (businessId: string) => {
    return apiRequest('/workshop/crm/' + businessId, { method: 'GET' });
  },

  createEstimation: async (data: { serviceRequestId: string; partsCost: number; laborCost: number; taxes: number; notes?: string }) => {
    return apiRequest('/workshop/estimations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
