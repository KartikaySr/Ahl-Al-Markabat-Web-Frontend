import { apiRequest } from '../apiClient';

export type ConditionState = 'GOOD' | 'ATTENTION' | 'CRITICAL';

export const inspectionsApi = {
  listTemplates: async () => {
    return apiRequest('/inspections/templates', { method: 'GET' });
  },

  createInspection: async (serviceRequestId: string, templateId: string) => {
    return apiRequest('/inspections', {
      method: 'POST',
      body: JSON.stringify({ serviceRequestId, templateId }),
    });
  },

  addItem: async (inspectionId: string, item: { componentName: string; condition: ConditionState; notes?: string; photoUrl?: string }) => {
    return apiRequest('/inspections/' + inspectionId + '/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  submitInspection: async (inspectionId: string, score: number) => {
    return apiRequest('/inspections/' + inspectionId + '/submit', {
      method: 'PATCH',
      body: JSON.stringify({ score }),
    });
  },

  getInspection: async (id: string) => {
    return apiRequest('/inspections/' + id, { method: 'GET' });
  },
};
