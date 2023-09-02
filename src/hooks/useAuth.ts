import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type AuthenticatedUserRes = {
  id: number;
  role: 'ADMIN' | 'LIBRARIAN' | 'STUDENT';
  email: string;
  username: string;
  password: string;
};

const authenticatedUser = () => request({ url: '/auth' });

export const useAuthenticatedUser =
  (): UseQueryResult<AuthenticatedUserRes> => {
    return useQuery(['auth'], authenticatedUser, {
      onError: () => {
        localStorage.removeItem('token');
      },
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
