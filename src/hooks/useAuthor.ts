import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

type Author = {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const getALLAuthors = () => request({ url: '/author/all' });

export const useGetAllAuthors = (): UseQueryResult<Author[]> =>
  useQuery(['authors', 'all'], getALLAuthors, {
    onError: (error: ErrorResponse) => error,
  });

const createAuthor = (data: { name: string }) =>
  request({ url: '/author', method: 'post', data });

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation(createAuthor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['authors', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};
