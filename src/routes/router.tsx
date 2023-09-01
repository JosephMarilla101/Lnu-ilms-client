import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import BaseLayout from '@/layout/BaseLayout';
import UnAuthLayout from '@/layout/UnAuthLayout';

const Home = lazy(() => import('@/pages/Home'));
const StudentLogin = lazy(() => import('@/pages/Logins/StudentLogin'));
const LibrarianLogin = lazy(() => import('@/pages/Logins/LibrarianLogin'));
const AdminLogin = lazy(() => import('@/pages/Logins/AdminLogin'));
const Signup = lazy(() => import('@/pages/Signup'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Test = lazy(() => import('@/pages/Test'));

const Router = () => {
  return useRoutes([
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

    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'test',
          element: <Test />,
        },
      ],
    },
  ]);
};

export default Router;
