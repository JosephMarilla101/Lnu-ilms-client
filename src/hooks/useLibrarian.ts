import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

const librarianRegistration = (data: {
  employeeId: string;
  email: string;
  username: string;
  fullname: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/librarian/register', method: 'post', data });

export const useLibrarianRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation(librarianRegistration, {
    onSuccess: () => {
      queryClient.invalidateQueries(['librarian', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

export type Librarian = {
  id: number;
  employeeId: string;
  email: string;
  username: string;
  fullname: string;
  mobile: string;
  status: boolean;
  profilePhoto?: string;
  profilePhotoId?: string;
  createdAt: Date;
  updatedAt: Date;
};

const getALLLibrarians = () => request({ url: '/librarian/all' });

export const useGetALLLibrarians = (): UseQueryResult<Librarian[]> =>
  useQuery(['librarian', 'all'], getALLLibrarians, {
    onError: (error: ErrorResponse) => error,
  });

const suspendLibrarian = (data: { id: number }) =>
  request({ url: '/librarian/suspend', method: 'post', data });

export const useSuspendLibrarian = () => {
  const queryClient = useQueryClient();
  return useMutation(suspendLibrarian, {
    onSuccess: () => {
      queryClient.invalidateQueries(['librarian', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const unsuspendLibrarian = (data: { id: number }) =>
  request({ url: '/librarian/unsuspend', method: 'post', data });

export const useUnsuspendLibrarian = () => {
  const queryClient = useQueryClient();
  return useMutation(unsuspendLibrarian, {
    onSuccess: () => {
      queryClient.invalidateQueries(['librarian', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateProfile = (data: {
  email: string;
  fullname: string;
  mobile: string;
  username: string;
}) => request({ url: '/librarian', method: 'put', data });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: async (data) => {
      queryClient.setQueriesData(['auth'], data);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateProfilePhoto = (data: {
  profilePhoto: string;
  profilePhotoId: string;
}) => request({ url: '/librarian/profile_photo', method: 'put', data });

export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProfilePhoto, {
    onSuccess: async (data) => {
      queryClient.setQueriesData(['auth'], data);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const changePassword = (data: {
  current_password: string;
  new_password: string;
  password_confirmation: string;
}) => request({ url: '/librarian/change_password', method: 'put', data });

export const useChangePassword = () =>
  useMutation(changePassword, {
    onError: (error: ErrorResponse) => error,
  });
