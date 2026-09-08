import { apiRequest } from '../apiClient';

export interface CreateBookingDto {
  providerId: string;
  serviceRequestId: string;
  slot: string;
}

export interface CreateJobDto {
  serviceRequestId: string;
  providerId: string;
  technicianId?: string;
  bookingId?: string;
}

export const bookingsJobsApi = {
  createBooking: async (data: CreateBookingDto) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateBookingStatus: async (id: string, status: string) => {
    return apiRequest('/bookings/' + id + '/status', {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  getProviderBookings: async (providerId: string) => {
    return apiRequest('/bookings/provider/' + providerId, { method: 'GET' });
  },

  createJob: async (data: CreateJobDto) => {
    return apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateJobStatus: async (id: string, status: string, metadata?: any) => {
    return apiRequest('/jobs/' + id + '/status', {
      method: 'PATCH',
      body: JSON.stringify({ status, metadata }),
    });
  },

  getJobsByProvider: async (providerId: string) => {
    return apiRequest('/jobs/provider/' + providerId, { method: 'GET' });
  },

  getJobHistory: async (id: string) => {
    return apiRequest('/jobs/' + id + '/history', { method: 'GET' });
  },
};
