import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type AuthenticateUserRes = {
  id: number;
  role: 'ADMIN' | 'LIBRARIAN' | 'STUDENT' | 'TEACHER' | 'GRADUATE';
  email: string;
  username?: string;
  profile?: Profile;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Profile = {
  id: number;
  fullname?: string;
  profilePhoto?: string;
  profilePhotoId?: string;
  department?: string;
  course?: string;
  college?: string;
  mobile?: string;
  userId: number;
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

const librarianLogin = (data: { username: string; password: string }) =>
  request({ url: '/auth/login/librarian', method: 'post', data });

export const useLibrarianLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(librarianLogin, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const userLogin = (data: { email: string; password: string }) =>
  request({ url: '/auth/login/user', method: 'post', data });

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(userLogin, {
    onSuccess: async (data) => {
      localStorage.setItem('token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
    },
    onError: (error: ErrorResponse) => error,
  });
};
