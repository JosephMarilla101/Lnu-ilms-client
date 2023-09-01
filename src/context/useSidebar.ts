import { useContext } from 'react';
import { SidebarContext } from '@/components/Providers/SidebarProvider';

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) throw new Error('Context must be used within a Provider');
  return { ...context };
};
export default useSidebar;
