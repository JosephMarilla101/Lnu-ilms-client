import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '@/lib/axios-interceptor';

export type RequestStatusType =
  | 'PENDING'
  | 'DISAPPROVED'
  | 'FORPICKUP'
  | 'RELEASED';

export type RequestedBook = {
  id: number;
  bookId: number;
  bookName: string;
  bookCover?: string;
  copies: number;
  isbn: string;
  studentId: string;
  borrowerId: number;
  status: RequestStatusType;
  isCancelled: boolean;
  requestDate: Date;
};

export const useGetALLRequestedBooks = ({
  status,
  startDate,
  endDate,
}: {
  status: RequestStatusType | 'CANCELLED';
  startDate?: Date;
  endDate?: Date;
}): UseQueryResult<RequestedBook[]> => {
  const getALLRequestedBooks = () =>
    request({
      url: `/request/all?status=${status}&startDate=${startDate}&endDate=${endDate}`,
    });
  return useQuery(['books', 'requested', status], getALLRequestedBooks, {
    onError: (error: ErrorResponse) => error,
  });
};

const changeRequestStatus = (data: {
  id: number;
  bookId: number;
  userId: number;
  status: RequestStatusType;
  dueDate?: Date;
}) => request({ url: '/book/change_request_status', method: 'put', data });

export const useChangeRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(changeRequestStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'requested', 'all']);
      queryClient.invalidateQueries(['books', 'requested']);
      queryClient.invalidateQueries(['book', 'requested']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const cancelRequest = (data: { requestId: number }) =>
  request({ url: '/book/cancel_request', method: 'put', data });

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'requested', 'all']);
      queryClient.invalidateQueries(['books', 'requested']);
      queryClient.invalidateQueries(['book', 'requested']);
    },
    onError: (error: ErrorResponse) => error,
  });
};

const releaseBook = (data: { id: number; bookId: number; userId: number }) =>
  request({ url: '/book/release_book', method: 'post', data });

export const useReleaseBook = () => {
  const queryClient = useQueryClient();
  return useMutation(releaseBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'requested', 'all']);
      queryClient.invalidateQueries(['books', 'requested']);
      queryClient.invalidateQueries(['book', 'requested']);
    },
    onError: (error: ErrorResponse) => error,
  });
};
