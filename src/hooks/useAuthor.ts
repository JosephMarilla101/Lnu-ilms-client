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

export const useGetAuthor = (id?: number): UseQueryResult<Author> => {
  const getAuthor = () => request({ url: `/author/?id=${id}` });
  return useQuery(['author', id], getAuthor, {
    onError: (error: ErrorResponse) => error,
  });
};

const getALLAuthors = () => request({ url: '/author/all' });

export const useGetAllAuthors = (): UseQueryResult<Author[]> =>
  useQuery(['author', 'all'], getALLAuthors, {
    onError: (error: ErrorResponse) => error,
  });

const createAuthor = (data: { name: string }) =>
  request({ url: '/author', method: 'post', data });

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation(createAuthor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['author', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateAuthor = (data: { id: number; name: string; status: boolean }) =>
  request({ url: '/author', method: 'put', data });

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAuthor, {
    onSuccess: (data) => {
      const id = data.id;
      queryClient.invalidateQueries(['author', 'all']);
      queryClient.setQueriesData(['author', id], data);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const deleteAuthor = (data: { id: number }) =>
  request({ url: '/author/soft-delete', method: 'put', data });

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAuthor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['author', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};
