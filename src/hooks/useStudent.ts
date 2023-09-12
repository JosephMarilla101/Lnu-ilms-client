import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

const studentRegistration = (data: {
  studentId: string;
  email: string;
  fullname: string;
  course: string;
  college: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/student/register', method: 'post', data });

export const useStudentRegistration = () => {
  return useMutation(studentRegistration, {
    onError: (error: ErrorResponse) => error,
  });
};

export type Student = {
  id: number;
  studentId: number;
  email: string;
  fullname: string;
  profilePhoto: string | null;
  profilePhotoId: string | null;
  course: string;
  college: string;
  mobile: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const getALLStudents = () => request({ url: '/student/all' });

export const useGetALLStudents = (): UseQueryResult<Student[]> =>
  useQuery(['student', 'all'], getALLStudents, {
    onError: (error: ErrorResponse) => error,
  });

const suspendStudent = (data: { id: number }) =>
  request({ url: '/student/suspend', method: 'post', data });

export const useSuspendStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(suspendStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['student', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const unsuspendStudent = (data: { id: number }) =>
  request({ url: '/student/unsuspend', method: 'post', data });

export const useUnsuspendStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(unsuspendStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['student', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};
