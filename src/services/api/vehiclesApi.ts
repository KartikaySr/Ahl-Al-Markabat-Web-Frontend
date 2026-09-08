import { apiRequest } from '../apiClient';

export interface VehicleDto {
  id?: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  fuel?: string;
  vin?: string;
  licensePlate?: string;
  color?: string;
  mileage?: number;
}

export const vehiclesApi = {
  getCatalog: async (): Promise<any> => {
    return apiRequest('/vehicles/catalog', { method: 'GET' });
  },

  findAll: async (): Promise<VehicleDto[]> => {
    return apiRequest<VehicleDto[]>('/vehicles', { method: 'GET' });
  },

  create: async (data: VehicleDto): Promise<VehicleDto> => {
    return apiRequest<VehicleDto>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
