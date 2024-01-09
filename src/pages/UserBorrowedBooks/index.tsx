import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import { useGetStudentBorrowedBooks } from '@/hooks/useUser';
import { useAuthenticateUser } from '@/hooks/useAuth';

export default function StudentHistory() {
  const auth = useAuthenticateUser();
  const borrowedBooks = useGetStudentBorrowedBooks(auth.data?.id.toString());

  const columns = ColumnsFunction();

  const renderUserDescription = () => {
    if (auth.data?.role === 'TEACHER')
      return `(${borrowedBooks.data?.profile?.department})`;
    else if (auth.data?.role === 'STUDENT')
      return `${borrowedBooks.data?.profile?.course}(${borrowedBooks.data?.profile?.college})`;
    else return '(GRAUDATE)';
  };

  if (borrowedBooks.isError) return null;

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-primary text-2xl font-medium text-center'>
        {borrowedBooks.data?.profile?.fullname}
      </h1>
      <span className='block text-center text-secondary mb-4'>
        #{borrowedBooks.data?.profile?.id} {renderUserDescription()}
      </span>

      <h2 className='hidden md:block -mb-14 text-primary text-lg'>
        #{borrowedBooks.data?.profile?.id} BORROWED BOOK HISTORY
      </h2>

      <DataTable
        columns={columns}
        data={borrowedBooks.data?.borrowedBooks ?? []}
        loading={borrowedBooks.isLoading}
      />
    </div>
  );
}
