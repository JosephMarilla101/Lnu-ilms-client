import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Books from '@/pages/Books';
import StudentProfile from '@/pages/UserProfile/StudentProfile';
import GraduateProfile from '@/pages/UserProfile/GraduateProfile';
import TeacherProfile from '@/pages/UserProfile/TeacherProfile';
import UserBorrowedBooks from '@/pages/UserBorrowedBooks';

type StudentRoutesProps = {
  role?: 'ADMIN' | 'LIBRARIAN' | 'STUDENT' | 'TEACHER' | 'GRADUATE';
};

const StudentRoutes = ({ role }: StudentRoutesProps) => {
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
        path: 'borrowed-history',
        element: <UserBorrowedBooks />,
      },
      {
        path: 'profile',
        element:
          role === 'STUDENT' ? (
            <StudentProfile />
          ) : role === 'GRADUATE' ? (
            <GraduateProfile />
          ) : (
            <TeacherProfile />
          ),
      },
    ],
  };
};

export default StudentRoutes;
