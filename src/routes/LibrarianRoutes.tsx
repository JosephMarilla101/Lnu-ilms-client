import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Authors from '@/pages/Authors';
import Categories from '@/pages/Categories';
import Books from '@/pages/Books';
import BookEdit from '@/pages/BookEdit';
import BookRequest from '@/pages/BookRequest';
import IssuedBooks from '@/pages/IssuedBooks';
import Students from '@/pages/Students';
import Graduates from '@/pages/Graduates';
import Teachers from '@/pages/Teachers';
import LibrarianProfile from '@/pages/UserProfile/LibrarianProfile';
import StudentHistory from '@/pages/StudentHistory';
import GraduateHistory from '@/pages/GraduateHistory';
import TeacherHistory from '@/pages/TeacherHistory';
import Statistics from '@/pages/Statistics';

const LibrarianRoutes = () => {
  return {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardAdmin />,
      },
      {
        path: 'statistics',
        element: <Statistics />,
      },
      {
        path: 'authors',
        element: <Authors />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'book/:id',
        element: <BookEdit />,
      },
      {
        path: 'book-request/pending',
        element: <BookRequest status='PENDING' />,
      },
      {
        path: 'book-request/for-pickup',
        element: <BookRequest status='FORPICKUP' />,
      },
      {
        path: 'book-request/released',
        element: <BookRequest status='RELEASED' />,
      },
      {
        path: 'book-request/cancelled',
        element: <BookRequest status='CANCELLED' />,
      },
      {
        path: 'book-request/disapproved',
        element: <BookRequest status='DISAPPROVED' />,
      },
      {
        path: 'book/issued',
        element: <IssuedBooks />,
      },
      {
        path: 'students',
        element: <Students />,
      },
      {
        path: 'graduates',
        element: <Graduates />,
      },
      {
        path: 'teachers',
        element: <Teachers />,
      },
      {
        path: 'student/history/:id',
        element: <StudentHistory />,
      },
      {
        path: 'graduate/history/:id',
        element: <GraduateHistory />,
      },
      {
        path: 'teacher/history/:id',
        element: <TeacherHistory />,
      },
      {
        path: 'profile',
        element: <LibrarianProfile />,
      },
    ],
  };
};

export default LibrarianRoutes;
