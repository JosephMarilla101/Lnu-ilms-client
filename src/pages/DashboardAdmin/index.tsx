import { Separator } from '@/components/ui/separator';
import {
  Book,
  BookUp,
  History,
  ScrollText,
  UserSquare,
  LucideIcon,
  CalendarX,
} from 'lucide-react';
import {
  useTotalBooks,
  useTotalUnreturnedBooks,
  useTotalRequestedBooks,
  useMyTotalRequestedBooks,
  useTotalAuthors,
  useTotalCatoegories,
  useMyTotalBorrowedBooks,
  useMyTotalUnreturnedBooks,
} from '@/hooks/useDashboard';
import { useAuthenticateUser } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const auth = useAuthenticateUser();
  const totalBooks = useTotalBooks();
  const totalUnreturnedBooks = useTotalUnreturnedBooks();
  const totalRequestedBooks = useTotalRequestedBooks();
  const myTotalRequestedBooks = useMyTotalRequestedBooks();
  const totalAuthors = useTotalAuthors();
  const totalCatoegories = useTotalCatoegories();
  const myTotalBorrowedBooks = useMyTotalBorrowedBooks();
  const myTotalUnreturnedBooks = useMyTotalUnreturnedBooks();
  const navigate = useNavigate();

  const Card = ({
    icon: Icon,
    title,
    count,
    color,
    url,
  }: {
    icon: LucideIcon;
    title: string;
    count?: number;
    color: string;
    url: string;
  }) => {
    return (
      <div
        onClick={() => {
          if (url === '/book/issued' || url === '/book/requests') {
            if (auth.data?.role === 'STUDENT') return;
          }

          navigate(`${url}`);
        }}
        className='w-[180px] h-[200px] px-3 text-center bg-[#FFFFF7] rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer flex flex-col  hover:scale-105 transition duration-300 ease-in-out'
      >
        <span
          className={`text-base font-semibold text-center pt-3 pb-2 ${color}`}
        >
          {title}
        </span>
        <Separator />

        <div className='h-full flex flex-col items-center justify-center gap-5'>
          <Icon size={60} className={color} />

          <span className={`text-xl ${color} font-semibold`}>{count}</span>
        </div>
      </div>
    );
  };

  return (
    <div className='mx-2 md:mx-4 py-6 '>
      <div className='flex flex-row gap-6 gap-x-12 flex-wrap justify-center'>
        <Card
          icon={Book}
          color='text-green-700'
          title='Books Listed'
          count={totalBooks.data}
          url='/books'
        />

        {auth.data?.role === 'STUDENT' ||
        auth.data?.role === 'GRADUATE' ||
        auth.data?.role === 'TEACHER' ? (
          <Card
            icon={History}
            color='text-red-700'
            title='Unreturned Books'
            count={myTotalUnreturnedBooks.data}
            url='/books'
          />
        ) : (
          <Card
            icon={History}
            color='text-red-700'
            title='Unreturned Books'
            count={totalUnreturnedBooks.data}
            url='/issued-books/unreturn'
          />
        )}

        {auth.data?.role === 'STUDENT' ||
        auth.data?.role === 'GRADUATE' ||
        auth.data?.role === 'TEACHER' ? (
          <Card
            icon={BookUp}
            color='text-blue-600'
            title='Pending Requests'
            count={myTotalRequestedBooks.data}
            url='/books'
          />
        ) : (
          <Card
            icon={BookUp}
            color='text-blue-600'
            title='Book Requests'
            count={totalRequestedBooks.data}
            url='/book-request/pending'
          />
        )}
        {(auth.data?.role === 'ADMIN' || auth.data?.role === 'LIBRARIAN') && (
          <>
            <Card
              icon={UserSquare}
              color='text-yellow-700'
              title='Authors Listed'
              count={totalAuthors.data}
              url='/authors'
            />

            <Card
              icon={ScrollText}
              color='text-emerald-600'
              title='Book Categories'
              count={totalCatoegories.data}
              url='/categories'
            />
          </>
        )}

        {(auth.data?.role === 'STUDENT' ||
          auth.data?.role === 'GRADUATE' ||
          auth.data?.role === 'TEACHER') && (
          <Card
            icon={CalendarX}
            color='text-secondary'
            title='Borrowing History'
            count={myTotalBorrowedBooks.data}
            url='/borrowed-history'
          />
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
