import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type AuthenticateUserRes = {
  id: number;
  role: 'ADMIN' | 'LIBRARIAN' | 'STUDENT';
  email: string;
  username: string;
  password: string;
};

const authenticateUser = () => request({ url: '/auth' });

export const useAuthenticateUser = (): UseQueryResult<AuthenticateUserRes> => {
  return useQuery(['auth'], authenticateUser, {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const adminLogin = (data: { username: string; password: string }) =>
  request({ url: '/auth/login/admin', method: 'post', data });

export const useAdminLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(adminLogin, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
    },
    onError: (error: ErrorResponse) => error,
  });
};
