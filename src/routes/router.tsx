import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';
import UnAuthLayout from '@/layout/UnAuthLayout';
import { useAuthenticatedUser } from '@/hooks/useAuth';
import AdminRoutes from './AdminRoutes';

const Home = lazy(() => import('@/pages/Home'));
const StudentLogin = lazy(() => import('@/pages/Logins/StudentLogin'));
const LibrarianLogin = lazy(() => import('@/pages/Logins/LibrarianLogin'));
const AdminLogin = lazy(() => import('@/pages/Logins/AdminLogin'));
const Signup = lazy(() => import('@/pages/Signup'));

const Router = () => {
  const auth = useAuthenticatedUser();
  const adminRoutes = AdminRoutes();
  const routes = useRoutes([
    {
      path: '/',
      element: <UnAuthLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'student-login',
          element: <StudentLogin />,
        },
        {
          path: 'librarian-login',
          element: <LibrarianLogin />,
        },
        {
          path: 'admin-login',
          element: <AdminLogin />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
      ],
    },
    auth.data?.role === 'ADMIN' ? adminRoutes : {},
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  if (auth.isLoading) return <Spinner />;

  return routes;
};

export default Router;
