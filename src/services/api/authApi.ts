import { apiRequest, setAuthToken } from '../apiClient';

export interface OtpResponse {
  message: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  user: {
    id: string;
    phone: string;
    type: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  };
}

export const authApi = {
  requestOtp: async (phone: string): Promise<OtpResponse> => {
    return apiRequest<OtpResponse>('/auth/otp/request', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  verifyOtp: async (phone: string, code: string): Promise<VerifyOtpResponse> => {
    const res = await apiRequest<VerifyOtpResponse>('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    });
    if (res.accessToken) {
      setAuthToken(res.accessToken);
    }
    return res;
  },

  logout: () => {
    setAuthToken(null);
  },
};
