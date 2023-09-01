import { useMutation } from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

const adminLogin = (data: { username: string; password: string }) =>
  request({ url: '/auth/login/admin', method: 'post', data });

export const useAdminLogin = () => {
  return useMutation(adminLogin, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
    onError: (error: ErrorResponse) => error,
  });
};
