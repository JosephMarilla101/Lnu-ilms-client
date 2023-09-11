import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
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
