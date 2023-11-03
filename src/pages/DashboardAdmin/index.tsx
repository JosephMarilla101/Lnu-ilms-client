// import { Separator } from '@/components/ui/separator';
// import {
// Book,
// BookUp,
// History,
// ScrollText,
// UserSquare,
// Users,
// Users2,
// LucideIcon,
// CalendarX,
// } from 'lucide-react';
import {
  // useTotalBooks,
  // useTotalUnreturnedBooks,
  // useTotalRequestedBooks,
  // useMyTotalRequestedBooks,
  // useTotalAuthors,
  // useTotalCatoegories,
  // useTotalStudents,
  // useTotalLibrarians,
  // useMyTotalBorrowedBooks,
  // useMyTotalUnreturnedBooks,
  useTopCategories,
  useUserBorrowCount,
} from '@/hooks/useDashboard';
// import { useAuthenticateUser } from '@/hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';

const DashboardAdmin = () => {
  // const auth = useAuthenticateUser();
  // const totalBooks = useTotalBooks();
  // const totalUnreturnedBooks = useTotalUnreturnedBooks();
  // const totalRequestedBooks = useTotalRequestedBooks();
  // const myTotalRequestedBooks = useMyTotalRequestedBooks();
  // const totalAuthors = useTotalAuthors();
  // const totalCatoegories = useTotalCatoegories();
  // const totalStudents = useTotalStudents();
  // const totalLibrarians = useTotalLibrarians();
  // const myTotalBorrowedBooks = useMyTotalBorrowedBooks();
  // const myTotalUnreturnedBooks = useMyTotalUnreturnedBooks();
  // const navigate = useNavigate();
  const topCategories = useTopCategories();
  const userBorrowCount = useUserBorrowCount();

  // const Card = ({
  //   icon: Icon,
  //   title,
  //   count,
  //   color,
  //   url,
  // }: {
  //   icon: LucideIcon;
  //   title: string;
  //   count?: number;
  //   color: string;
  //   url: string;
  // }) => {
  //   return (
  //     <div
  //       onClick={() => {
  //         if (url === '/book/issued' || url === '/book/requests') {
  //           if (auth.data?.role === 'STUDENT') return;
  //         }

  //         navigate(`${url}`);
  //       }}
  //       className='w-[180px] h-[200px] px-3 text-center bg-[#FFFFF7] rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer flex flex-col  hover:scale-105 transition duration-300 ease-in-out'
  //     >
  //       <span
  //         className={`text-base font-semibold text-center pt-3 pb-2 ${color}`}
  //       >
  //         {title}
  //       </span>
  //       <Separator />

  //       <div className='h-full flex flex-col items-center justify-center gap-5'>
  //         <Icon size={60} className={color} />

  //         <span className={`text-xl ${color} font-semibold`}>{count}</span>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className='mx-2 md:mx-4 py-6 '>
      {/* <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8'>
          <div className='max-w-[100%] bg-blue-100'>
            <BarChart
              title='Top Borrowed Book Category'
              label='Borrow Count'
              dataset={topCategories.data}
            />
          </div>
        </div>

        <div className='col-span-4'>
          <div className='max-w-[100%] bg-green-100'>
            <PieChart dataset={userBorrowCount.data ?? []} />
          </div>
        </div>
      </div> */}
      <div className='flex items-center md:items-start flex-col md:flex-row gap-6'>
        <div className='max-w-[100%] flex-1'>
          <BarChart
            title='Top Borrowed Book Category'
            label='Borrow Count'
            dataset={topCategories.data}
          />
        </div>

        <div className='max-w-[80%]'>
          <PieChart
            title='User Borrow Count'
            label='Borrow Count'
            dataset={userBorrowCount.data ?? []}
          />
        </div>
      </div>

      {/* <div className='flex flex-row gap-6 gap-x-12 flex-wrap justify-center'>
        <Card
          icon={Book}
          color='text-green-700'
          title='Books Listed'
          count={totalBooks.data}
          url='/books'
        />

        {auth.data?.role === 'STUDENT' ? (
          <Card
            icon={History}
            color='text-red-700'
            title='Unreturned Books'
            count={myTotalUnreturnedBooks.data}
            url='/book/issued'
          />
        ) : (
          <Card
            icon={History}
            color='text-red-700'
            title='Unreturned Books'
            count={totalUnreturnedBooks.data}
            url='/book/issued'
          />
        )}

        {auth.data?.role === 'STUDENT' ? (
          <Card
            icon={BookUp}
            color='text-blue-600'
            title='Pending Requests'
            count={myTotalRequestedBooks.data}
            url='/book/requests'
          />
        ) : (
          <Card
            icon={BookUp}
            color='text-blue-600'
            title='Pending Requests'
            count={totalRequestedBooks.data}
            url='/book/requests'
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
              title='Categories Listed'
              count={totalCatoegories.data}
              url='/categories'
            />

            <Card
              icon={Users}
              color='text-primary'
              title='Students'
              count={totalStudents.data}
              url='/students'
            />
          </>
        )}

        {auth.data?.role === 'STUDENT' && (
          <Card
            icon={CalendarX}
            color='text-secondary'
            title='Borrowed Books'
            count={myTotalBorrowedBooks.data}
            url='/books'
          />
        )}

        {auth.data?.role === 'ADMIN' && (
          <Card
            icon={Users2}
            color='text-secondary'
            title='Librarians'
            count={totalLibrarians.data}
            url='/librarians'
          />
        )}
      </div> */}
    </div>
  );
};

export default DashboardAdmin;
