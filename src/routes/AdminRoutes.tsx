import BaseLayout from '@/layout/BaseLayout';
import DashboardAdmin from '@/pages/DashboardAdmin';
import Authors from '@/pages/Authors';
import Categories from '@/pages/Categories';
import Books from '@/pages/Books';
import BookRequest from '@/pages/BookRequest';
import IssuedBooks from '@/pages/IssuedBooks';

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
        path: 'book/requests',
        element: <BookRequest />,
      },
      {
        path: 'book/issued',
        element: <IssuedBooks />,
      },
    ],
  };
};

export default AdminRoutes;
