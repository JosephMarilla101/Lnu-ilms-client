import { useContext } from 'react';
import { BookRequestContext } from '@/components/Providers/BookRequestProvider';

export const useBookRequest = () => {
  const context = useContext(BookRequestContext);

  if (!context) throw new Error('Context must be used within a Provider');
  return { ...context };
};
export default useBookRequest;
