import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';
import UnAuthLayout from '@/layout/UnAuthLayout';
import { useAuthenticateUser } from '@/hooks/useAuth';
import AdminRoutes from './AdminRoutes';
import LibrarianRoutes from './LibrarianRoutes';
import StudentRoutes from './StudentRoutes';

const Home = lazy(() => import('@/pages/Home'));
const StudentLogin = lazy(() => import('@/pages/Logins/StudentLogin'));
const LibrarianLogin = lazy(() => import('@/pages/Logins/LibrarianLogin'));
const AdminLogin = lazy(() => import('@/pages/Logins/AdminLogin'));
const RegisterStudent = lazy(() => import('@/pages/RegisterStudent'));
const RegisterGraduate = lazy(() => import('@/pages/RegisterGraduate'));
const RegisterTeacher = lazy(() => import('@/pages/RegisterTeacher'));

const Router = () => {
  const auth = useAuthenticateUser();
  const adminRoutes = AdminRoutes();
  const librarianRoutes = LibrarianRoutes();
  const studentRoutes = StudentRoutes();
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
          path: 'register',
          children: [
            {
              path: 'student',
              element: <RegisterStudent />,
            },
            {
              path: 'graduate',
              element: <RegisterGraduate />,
            },
            {
              path: 'teacher',
              element: <RegisterTeacher />,
            },
          ],
        },
      ],
    },
    auth.data?.role === 'ADMIN' ? adminRoutes : {},
    auth.data?.role === 'LIBRARIAN' ? librarianRoutes : {},
    auth.data?.role === 'STUDENT' ? studentRoutes : {},
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  if (auth.isLoading) return <Spinner />;

  return routes;
};

export default Router;
