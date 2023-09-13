import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Books from '@/pages/Books';

const StudentRoutes = () => {
  return {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardAdmin />,
      },
      {
        path: 'books',
        element: <Books />,
      },
    ],
  };
};

export default StudentRoutes;
