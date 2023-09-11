import { Separator } from '@/components/ui/separator';
import {
  Book,
  BookUp,
  History,
  ScrollText,
  UserSquare,
  Users,
  Users2,
  LucideIcon,
} from 'lucide-react';
import {
  useTotalBooks,
  useTotalUnreturnedBooks,
  useTotalRequestedBooks,
  useTotalAuthors,
  useTotalCatoegories,
  useTotalStudents,
  useTotalLibrarians,
} from '@/hooks/useDashboard';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const totalBooks = useTotalBooks();
  const totalUnreturnedBooks = useTotalUnreturnedBooks();
  const totalRequestedBooks = useTotalRequestedBooks();
  const totalAuthors = useTotalAuthors();
  const totalCatoegories = useTotalCatoegories();
  const totalStudents = useTotalStudents();
  const totalLibrarians = useTotalLibrarians();
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
        onClick={() => navigate(`${url}`)}
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
    <div className='container mx-auto py-10 flex flex-row gap-6 gap-x-12 flex-wrap justify-center'>
      <Card
        icon={Book}
        color='text-green-700'
        title='Books Listed'
        count={totalBooks.data}
        url='/books'
      />

      <Card
        icon={History}
        color='text-red-700'
        title='Unreturned Books'
        count={totalUnreturnedBooks.data}
        url='/book/issued'
      />

      <Card
        icon={BookUp}
        color='text-blue-600'
        title='Book Requests'
        count={totalRequestedBooks.data}
        url='/book/requests'
      />

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

      <Card
        icon={Users2}
        color='text-secondary'
        title='Librarians'
        count={totalLibrarians.data}
        url='/librarians'
      />
    </div>
  );
};

export default DashboardAdmin;
