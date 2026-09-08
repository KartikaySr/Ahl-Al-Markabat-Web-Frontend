/**
 * Ahl Al Markabat - Unified Dynamic API Client
 * Auto-detects between NestJS Backend (Port 3000/3001) and Testing Mock Server (Port 5000)
 */

let activeBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
let activePort = '3000';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

let cachedAuthToken: string | null = typeof window !== 'undefined' ? localStorage.getItem('aam_auth_token') : null;

export const setAuthToken = (token: string | null) => {
  cachedAuthToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('aam_auth_token', token);
    } else {
      localStorage.removeItem('aam_auth_token');
    }
  }
};

export const getAuthToken = () => cachedAuthToken;
export const getActivePort = () => activePort;

/**
 * Health check to auto-detect whether NestJS (3001 or 3000) or Testing API Server (5000) is running
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  const portsToTry = ['3001', '3000', '5000'];

  for (const port of portsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const url = port === '5000' 
        ? 'http://localhost:5000/api/health' 
        : 'http://localhost:' + port + '/api/v1/vehicles/catalog';
      
      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (res.status < 500) {
        activeBaseUrl = 'http://localhost:' + port + '/api/v1';
        activePort = port;
        return true;
      }
    } catch {}
  }

  return false;
};

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  const url = activeBaseUrl + cleanEndpoint;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (cachedAuthToken) {
    headers['Authorization'] = 'Bearer ' + cachedAuthToken;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      throw new ApiError(
        errorData.message || 'Request failed with status ' + response.status,
        response.status,
        errorData
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network connection failed', 0);
  }
}

export default {
  request: apiRequest,
  setAuthToken,
  getAuthToken,
  getActivePort,
  checkBackendHealth,
  get API_BASE_URL() {
    return activeBaseUrl;
  },
};
