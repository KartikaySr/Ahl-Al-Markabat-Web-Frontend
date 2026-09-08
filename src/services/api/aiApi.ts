import { apiRequest } from '../apiClient';

export interface AIInsightDto {
  id?: string;
  serviceRequestId: string;
  classification: string;
  confidenceScore: number;
  suggestedAction: string;
}

export const aiApi = {
  diagnoseProblem: async (serviceRequestId: string, description: string): Promise<AIInsightDto> => {
    return apiRequest<AIInsightDto>('/ai/diagnose', {
      method: 'POST',
      body: JSON.stringify({ serviceRequestId, description }),
    });
  },

  getInsight: async (serviceRequestId: string): Promise<AIInsightDto> => {
    return apiRequest<AIInsightDto>('/ai/insight/' + serviceRequestId, {
      method: 'GET',
    });
  },
};
