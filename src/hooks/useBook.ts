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

export type RequestedBook = {
  id: number;
  bookName: string;
  isbn: string;
  studentId: string;
  isApproved: boolean;
  requestDate: Date;
};

const getALLRequestedBooks = () => request({ url: '/book/requested/all' });

export const useGetALLRequestedBooks = (): UseQueryResult<RequestedBook[]> =>
  useQuery(['books', 'requested', 'all'], getALLRequestedBooks, {
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
