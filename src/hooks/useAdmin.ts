import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

export type Admin = {
  id: number;
  email: string;
  username: string;
  status: boolean;
  profilePhoto?: string;
  profilePhotoId?: string;
  createdAt: Date;
  updatedAt: Date;
};

const updateProfile = (data: { email: string; username: string }) =>
  request({ url: '/admin', method: 'put', data });

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
}) => request({ url: '/admin/profile_photo', method: 'put', data });

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
}) => request({ url: '/admin/change_password', method: 'put', data });

export const useChangePassword = () =>
  useMutation(changePassword, {
    onError: (error: ErrorResponse) => error,
  });
