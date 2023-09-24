import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Authors from '@/pages/Authors';
import Categories from '@/pages/Categories';
import Books from '@/pages/Books';
import BookEdit from '@/pages/BookEdit';
import BookRequest from '@/pages/BookRequest';
import IssuedBooks from '@/pages/IssuedBooks';
import Students from '@/pages/Students';
import Librarians from '@/pages/Librarians';
import AdminProfile from '@/pages/AdminProfile';

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
        path: 'librarians',
        element: <Librarians />,
      },
      {
        path: 'profile',
        element: <AdminProfile />,
      },
    ],
  };
};

export default AdminRoutes;
