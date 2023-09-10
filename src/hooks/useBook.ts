import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type Book = {
  id: number;
  isbn: number;
  name: string;
  bookCover?: string;
  copies: number;
  author: { id: number; name: string };
  category: { id: number; name: string };
};

export const useGetBook = (id: number): UseQueryResult<Book> => {
  const getBook = () => request({ url: `/book/?id=${id}` });
  return useQuery(['book', id], getBook, {
    onError: (error: ErrorResponse) => error,
  });
};

const createBook = (data: {
  name: string;
  bookCover?: string;
  bookCoverId?: string;
  authorId?: number;
  categoryIds: number[];
  copies: number;
}) => request({ url: '/book', method: 'post', data });

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookList']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const borrowBook = (data: { dueDate: Date | undefined; requestId: number }) =>
  request({ url: '/book/borrow_book', method: 'post', data });

export const useBorrowBook = () => {
  const queryClient = useQueryClient();
  return useMutation(borrowBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'requested', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const cancelRequest = (data: { bookId: number; studentId: number }) =>
  request({ url: '/book/cancel_request', method: 'post', data });

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'requested', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

type LateFee = {
  initialFee: number;
  followingDateFee: number;
};

const getBookLateFee = () => request({ url: '/book/late_fee' });

export const useGetBookLateFee = (): UseQueryResult<LateFee> =>
  useQuery(['book', 'latefee'], getBookLateFee, {
    onError: (error: ErrorResponse) => error,
  });

type ErrorResponse = {
  message?: string;
};

export type RequestedBook = {
  id: number;
  bookId: number;
  bookName: string;
  bookCover?: string;
  copies: number;
  isbn: string;
  studentId: string;
  borrowerId: number;
  isApproved: boolean;
  requestDate: Date;
};

const getALLRequestedBooks = () => request({ url: '/book/requested/all' });

export const useGetALLRequestedBooks = (): UseQueryResult<RequestedBook[]> =>
  useQuery(['books', 'requested', 'all'], getALLRequestedBooks, {
    onError: (error: ErrorResponse) => error,
  });

export type IssuedBooks = {
  id: number;
  isbn: string;
  bookName: string;
  bookCover?: string;
  studentId: string;
  dueDate: string;
  returnedDate: string;
  isReturn: string;
  lateFee: number;
};

const getAllIssuedBooks = () => request({ url: '/book/issued/all' });

export const useGetAllIssuedBooks = (): UseQueryResult<IssuedBooks[]> =>
  useQuery(['books', 'issued', 'all'], getAllIssuedBooks, {
    onError: (error: ErrorResponse) => error,
  });

type InfiniteQueryBookList = [{ id: number }];

const fetchBookList = ({ pageParam = undefined }: { pageParam?: unknown }) =>
  request({ url: `/book/list/?cursor=${pageParam}` });

export const useBookList = (): UseInfiniteQueryResult<
  InfiniteQueryBookList,
  Error
> =>
  useInfiniteQuery({
    queryKey: ['bookList'],
    queryFn: fetchBookList,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      // return the book id as cursor for next page request
      return lastPost?.id;
    },
  });
