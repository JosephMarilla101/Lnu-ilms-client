import { lazy } from 'react';
import BaseLayout from '@/layout/BaseLayout';

const Dashboard = lazy(() => import('@/pages/Dashboard'));

const AdminRoutes = () => {
  return {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  };
};

export default AdminRoutes;
