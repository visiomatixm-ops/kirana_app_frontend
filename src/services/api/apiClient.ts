import { env } from '@/app/config/env';
import { STORAGE_KEYS } from '@/constants';
import type { ApiResponse, ApiError } from '@/types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch {
      return null;
    }
  }

  private buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extra,
    };
    const token = this.getAuthToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers: extraHeaders, signal } = config;
    const url = `${this.baseUrl}${endpoint}`;

    let response: Response;

    try {
      response = await fetch(url, {
        method,
        headers: this.buildHeaders(extraHeaders),
        body: body ? JSON.stringify(body) : undefined,
        signal,
      });
    } catch {
      const error: ApiError = {
        message: 'Cannot reach the backend server. Please make sure the backend is running.',
        statusCode: 0,
      };
      throw error;
    }

    const responseText = await response.text();
    let json: Record<string, any> = {};

    try {
      json = responseText ? JSON.parse(responseText) : {};
    } catch {
      json = {
        message: responseText || 'Invalid response',
      };
    }

    if (!response.ok) {
      const error: ApiError = {
        message: json.message ?? 'Something went wrong',
        statusCode: response.status,
        errors: json.errors,
      };
      throw error;
    }

    return json as ApiResponse<T>;
  }

  get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  put<T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  patch<T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(env.apiBaseUrl);
export default apiClient;
