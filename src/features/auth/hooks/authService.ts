import apiClient from '@/services/api/apiClient';
import { AUTH_ENDPOINTS } from '@/services/endpoints';
import type { User, ApiResponse } from '@/types';

interface SendOtpPayload {
  phone?: string;
  email?: string;
}

interface VerifyOtpPayload {
  phone?: string;
  email?: string;
  otp: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  sendOtp: (payload: SendOtpPayload): Promise<ApiResponse<{ message: string }>> =>
    apiClient.post(AUTH_ENDPOINTS.SEND_OTP, payload),

  verifyOtp: (payload: VerifyOtpPayload): Promise<ApiResponse<AuthResponse>> =>
    apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, payload),

  logout: (): Promise<ApiResponse<void>> =>
    apiClient.post(AUTH_ENDPOINTS.LOGOUT, {}),
};
