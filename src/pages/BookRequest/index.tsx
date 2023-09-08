import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import { useGetALLRequestedBooks } from '@/hooks/useBook';

const BookRequest = () => {
  const requestedBooks = useGetALLRequestedBooks();
  const columns = ColumnsFunction();
  return (
    <div className='container mx-auto py-10'>
      <DataTable
        columns={columns}
        data={requestedBooks.data ?? []}
        loading={requestedBooks.isLoading}
        searchable='bookName'
        searchableText='Book Name'
      />
    </div>
  );
};

export default BookRequest;
