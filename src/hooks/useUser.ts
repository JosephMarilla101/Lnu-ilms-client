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
}) => request({ url: '/user/register/student', method: 'post', data });

export const useStudentRegistration = () => {
  return useMutation(studentRegistration, {
    onError: (error: ErrorResponse) => error,
  });
};

const graduateRegistration = (data: {
  studentId: string;
  email: string;
  fullname: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/user/register/graduate', method: 'post', data });

export const useGraduateRegistration = () => {
  return useMutation(graduateRegistration, {
    onError: (error: ErrorResponse) => error,
  });
};

const teacherRegistration = (data: {
  employeeId: string;
  email: string;
  fullname: string;
  department: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/user/register/teacher', method: 'post', data });

export const useTeacherRegistration = () => {
  return useMutation(teacherRegistration, {
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

type Book = {
  id: number;
  isbn: string;
  name: string;
  bookCover?: string;
  copies: number;
  author: { id: number; name: string };
  category: { id: number; name: string }[];
};

export type IssuedBook = {
  id: number;
  isbn: string;
  bookName: string;
  bookCover?: string;
  studentId: string;
  dueDate: string;
  returnedDate: Date;
  isReturn: boolean;
  lateFee: number;
  createdAt: Date;
  updatedAt: Date;
  book: Book;
};

type StudentWithBorrowedBook = Student & {
  borrowedBooks: IssuedBook[];
};

const getALLStudents = () => request({ url: '/user/all' });

export const useGetALLStudents = (): UseQueryResult<Student[]> =>
  useQuery(['student', 'all'], getALLStudents, {
    onError: (error: ErrorResponse) => error,
  });

export const useGetStudentBorrowedBooks = (
  id?: string
): UseQueryResult<StudentWithBorrowedBook> => {
  const getStudentBorrowedBooks = () =>
    request({ url: `/user/borrowed_books/${id}` });

  return useQuery(['student', 'borrowed', 'books'], getStudentBorrowedBooks, {
    onError: (error: ErrorResponse) => error,
  });
};

const suspendStudent = (data: { id: number }) =>
  request({ url: '/user/suspend', method: 'post', data });

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
  request({ url: '/user/unsuspend', method: 'post', data });

export const useUnsuspendStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(unsuspendStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['student', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateProfile = (data: {
  email: string;
  username?: string;
  fullname?: string;
  course?: string;
  college?: string;
  department?: string;
  mobile?: string;
}) => request({ url: '/user', method: 'put', data });

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
}) => request({ url: '/user/profile_photo', method: 'put', data });

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
}) => request({ url: '/user/change_password', method: 'put', data });

export const useChangePassword = () =>
  useMutation(changePassword, {
    onError: (error: ErrorResponse) => error,
  });
