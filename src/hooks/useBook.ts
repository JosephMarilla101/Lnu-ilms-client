import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type Book = {
  id: number;
  isbn: number;
  name: string;
  isIssued: boolean;
  bookCover?: string;
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
}) => request({ url: '/book', method: 'post', data });

export const useCreateBook = () => {
  return useMutation(createBook, {
    onError: (error: ErrorResponse) => error,
  });
};

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
