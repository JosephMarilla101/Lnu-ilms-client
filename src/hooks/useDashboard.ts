import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

export type ResponseType = number;

export type ChartDataType = {
  name: string;
  count: number;
}[];

export const useBorrowedBookByMonth = (
  year: string
): UseQueryResult<ChartDataType> => {
  const borrowedBookByMonth = () =>
    request({ url: `/dashboard/borrowed_book_by_month?year=${year}` });

  return useQuery(['borrowed_book_by_month'], borrowedBookByMonth, {
    onError: (error: ErrorResponse) => error,
  });
};

export const useTopCategories = (
  year: string
): UseQueryResult<ChartDataType> => {
  const topCategories = () =>
    request({ url: `/dashboard/top_categories?year=${year}` });
  return useQuery(['top_categories'], topCategories, {
    onError: (error: ErrorResponse) => error,
  });
};

export const useUserBorrowCount = ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}): UseQueryResult<ChartDataType> => {
  const userBorrowCount = () =>
    request({
      url: `/dashboard/user_borrow_count?startDate=${startDate}&endDate=${endDate}`,
    });
  return useQuery(['user_borrow_count'], userBorrowCount, {
    onError: (error: ErrorResponse) => error,
  });
};

const userCountData = () => request({ url: '/dashboard/user_count_data' });

export const useUserCountData = (): UseQueryResult<ChartDataType> =>
  useQuery(['user_count_data'], userCountData, {
    onError: (error: ErrorResponse) => error,
  });

const totalBooks = () => request({ url: '/dashboard/total_books' });

export const useTotalBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_books'], totalBooks, {
    onError: (error: ErrorResponse) => error,
  });

const totalRequestedBooks = () =>
  request({ url: '/dashboard/total_requested_books' });

export const useTotalRequestedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_requested_books'], totalRequestedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const myTotalRequestedBooks = () =>
  request({ url: '/dashboard/my_total_requested_books' });

export const useMyTotalRequestedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['my_total_requested_books'], myTotalRequestedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const totalBorrowedBooks = () =>
  request({ url: '/dashboard/total_borrowed_books' });

export const useTotalBorrowedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_borrowed_books'], totalBorrowedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const myTotalBorrowedBooks = () =>
  request({ url: '/dashboard/my_total_borrowed_books' });

export const useMyTotalBorrowedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['my_total_borrowed_books'], myTotalBorrowedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const totalAuthors = () => request({ url: '/dashboard/total_authors' });

export const useTotalAuthors = (): UseQueryResult<ResponseType> =>
  useQuery(['total_authors'], totalAuthors, {
    onError: (error: ErrorResponse) => error,
  });

const totalCatoegories = () => request({ url: '/dashboard/total_catoegories' });

export const useTotalCatoegories = (): UseQueryResult<ResponseType> =>
  useQuery(['total_catoegories'], totalCatoegories, {
    onError: (error: ErrorResponse) => error,
  });

const totalStudents = () => request({ url: '/dashboard/total_students' });

export const useTotalStudents = (): UseQueryResult<ResponseType> =>
  useQuery(['total_students'], totalStudents, {
    onError: (error: ErrorResponse) => error,
  });

const totalGraduates = () => request({ url: '/dashboard/total_graduates' });

export const useTotalGraduates = (): UseQueryResult<ResponseType> =>
  useQuery(['total_graduates'], totalGraduates, {
    onError: (error: ErrorResponse) => error,
  });

const totalTeachers = () => request({ url: '/dashboard/total_teachers' });

export const useTotalTeachers = (): UseQueryResult<ResponseType> =>
  useQuery(['total_teachers'], totalTeachers, {
    onError: (error: ErrorResponse) => error,
  });

const totalLibrarians = () => request({ url: '/dashboard/total_librarians' });

export const useTotalLibrarians = (): UseQueryResult<ResponseType> =>
  useQuery(['total_librarians'], totalLibrarians, {
    onError: (error: ErrorResponse) => error,
  });

const totalUnreturnedBooks = () =>
  request({ url: '/dashboard/total_unreturned_books' });

export const useTotalUnreturnedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_unreturned_books'], totalUnreturnedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const myTotalUnreturnedBooks = () =>
  request({ url: '/dashboard/my_total_unreturned_books' });

export const useMyTotalUnreturnedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['my_total_unreturned_books'], myTotalUnreturnedBooks, {
    onError: (error: ErrorResponse) => error,
  });
