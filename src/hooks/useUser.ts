import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

export type User = {
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

type StudentWithBorrowedBook = User & {
  borrowedBooks: IssuedBook[];
};

const studentRegistration = (data: {
  id: string;
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
  id: string;
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
  id: string;
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

const librarianRegistration = (data: {
  id: string;
  email: string;
  username: string;
  fullname: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/user/register/librarian', method: 'post', data });

export const useLibrarianRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation(librarianRegistration, {
    onSuccess: () => {
      queryClient.invalidateQueries(['librarian', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const getALLStudents = () => request({ url: '/user/all_students' });

export const useGetALLStudents = (): UseQueryResult<User[]> =>
  useQuery(['user', 'all'], getALLStudents, {
    onError: (error: ErrorResponse) => error,
  });

const getALLLibrarians = () => request({ url: '/user/all_librarians' });

export const useGetALLLibrarians = (): UseQueryResult<User[]> =>
  useQuery(['user', 'all'], getALLLibrarians, {
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

const suspendUser = (data: { id: number }) =>
  request({ url: '/user/suspend', method: 'post', data });

export const useSuspendUser = () => {
  const queryClient = useQueryClient();
  return useMutation(suspendUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const unsuspendUser = (data: { id: number }) =>
  request({ url: '/user/unsuspend', method: 'post', data });

export const useUnsuspendUser = () => {
  const queryClient = useQueryClient();
  return useMutation(unsuspendUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', 'all']);
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
