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
  studentId?: number;
  email: string;
  fullname?: string;
  profilePhoto?: string | null;
  course?: string;
  college?: string;
  mobile?: string;
  username: string;
  password: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
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

const studentLogin = (data: { email: string; password: string }) =>
  request({ url: '/auth/login/student', method: 'post', data });

export const useStudentLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(studentLogin, {
    onSuccess: async (data) => {
      localStorage.setItem('token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
    },
    onError: (error: ErrorResponse) => error,
  });
};
