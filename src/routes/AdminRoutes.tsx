import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Authors from '@/pages/Authors';
import Categories from '@/pages/Categories';

const AdminRoutes = () => {
  return {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardAdmin />,
      },
      {
        path: 'authors',
        element: <Authors />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
    ],
  };
};

export default AdminRoutes;
