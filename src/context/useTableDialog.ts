import { useContext } from 'react';
import { TableDialogContext } from '@/components/Providers/TableDialogProvider';

export const useTableDialog = () => {
  const context = useContext(TableDialogContext);

  if (!context) throw new Error('Context must be used within a Provider');
  return { ...context };
};
export default useTableDialog;
