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
  category: { id: number; name: string }[];
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

const updateBook = (data: {
  id: number;
  name: string;
  bookCover?: string;
  bookCoverId?: string;
  authorId?: number;
  categoryIds: number[];
  copies: number;
}) => request({ url: '/book', method: 'put', data });

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookList']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const deleteBook = (data: { id: number }) =>
  request({ url: '/book', method: 'delete', data });

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBook, {
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

const returnBorrowedBook = (data: { borrowedBookId: number }) =>
  request({ url: '/book/borrowed/return', method: 'put', data });

export const useReturnBorrowedBook = () => {
  const queryClient = useQueryClient();
  return useMutation(returnBorrowedBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'issued', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const cancelRequest = (data: { bookId: number; studentId: number }) =>
  request({ url: '/book/cancel_request', method: 'delete', data });

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'requested', 'all']);
      queryClient.invalidateQueries(['book', 'requested']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const deleteBorrowedBook = (data: { issuedId: number }) =>
  request({ url: '/book/issued_book', method: 'delete', data });

export const useDeleteBorrowedBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBorrowedBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'issued', 'all']);
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
  returnedDate: Date;
  isReturn: boolean;
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

const requestBook = (data: { bookId: number }) =>
  request({ url: '/book/request', method: 'post', data });

export const useRequestBook = () => {
  const queryClient = useQueryClient();
  return useMutation(requestBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['book', 'requested']);
    },
    onError: (error: ErrorResponse) => error,
  });
};
type BookRequestResponse = {
  book: Book;
  isApproved: boolean;
  requestDate: Date;
  updatedAt: Date;
};

const getRequestedBook = () => request({ url: '/book/requested' });

export const useGetRequestedBook = (): UseQueryResult<BookRequestResponse> =>
  useQuery(['book', 'requested'], getRequestedBook);

type UnreturnedBook = {
  book: Book;
  isReturn: true;
  dueDate: Date;
};

const getUnreturnedBook = () => request({ url: '/book/unreturned' });

export const useGetUnreturnedBook = (): UseQueryResult<UnreturnedBook> =>
  useQuery(['book', 'unreturned'], getUnreturnedBook);
