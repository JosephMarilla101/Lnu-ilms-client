import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Authors from '@/pages/Authors';
import Categories from '@/pages/Categories';
import Books from '@/pages/Books';
import BookEdit from '@/pages/BookEdit';
import BookRequest from '@/pages/BookRequest';
import IssuedBooks from '@/pages/IssuedBooks';
import Students from '@/pages/Students';
import LibrarianProfile from '@/pages/LibrarianProfile';
import StudentHistory from '@/pages/StudentHistory';

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
        path: 'book/requests',
        element: <BookRequest />,
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
        path: 'student/history/:id',
        element: <StudentHistory />,
      },
      {
        path: 'profile',
        element: <LibrarianProfile />,
      },
    ],
  };
};

export default LibrarianRoutes;
