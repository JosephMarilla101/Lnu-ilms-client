import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

export type Category = {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const useGetCategory = (id?: number): UseQueryResult<Category> => {
  const getCategory = () => request({ url: `/category/?id=${id}` });
  return useQuery(['category', id], getCategory, {
    onError: (error: ErrorResponse) => error,
  });
};

const getALLCategories = () => request({ url: '/category/all' });

export const useGetAllCategories = (): UseQueryResult<Category[]> =>
  useQuery(['category', 'all'], getALLCategories, {
    onError: (error: ErrorResponse) => error,
  });

const createCategory = (data: { name: string; status: boolean }) =>
  request({ url: '/category', method: 'post', data });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['category', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateCategory = (data: { id: number; name: string; status: boolean }) =>
  request({ url: '/category', method: 'put', data });

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategory, {
    onSuccess: (data) => {
      const id = data.id;
      queryClient.invalidateQueries(['category', 'all']);
      queryClient.setQueriesData(['category', id], data);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const deleteCategory = (data: { id: number }) =>
  request({ url: '/category/soft-delete', method: 'put', data });

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['category', 'all']);
    },
    onError: (error: ErrorResponse) => error,
  });
};
