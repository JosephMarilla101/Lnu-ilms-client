import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Books from '@/pages/Books';
import StudentProfile from '@/pages/UserProfile/StudentProfile';

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
      {
        path: 'profile',
        element: <StudentProfile />,
      },
    ],
  };
};

export default StudentRoutes;
