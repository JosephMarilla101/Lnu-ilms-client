import { useMutation } from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

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
