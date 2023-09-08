import { ColumnDef } from '@tanstack/react-table';
import { CheckCheck, XCircle } from 'lucide-react';
import { RequestedBook } from '@/hooks/useBook';
import { format, parseISO } from 'date-fns';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
// import useTableDialog from '@/context/useTableDialog';

const ColumnsFunction = () => {
  // const { setId, setAction } = useTableDialog();
  const columns: ColumnDef<RequestedBook>[] = [
    {
      accessorKey: 'id',
      header: 'ID #',
    },
    {
      accessorKey: 'studentId',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Student ID' />
      ),
    },
    {
      accessorKey: 'isbn',
      header: ({ column }) => <ColumnHeader column={column} title='ISBN' />,
      cell: ({ row }) => {
        const isbn = row.getValue('isbn') as number;

        return <div>{isbn}</div>;
      },
    },
    {
      accessorKey: 'bookName',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Book Name' />
      ),
      cell: ({ row }) => {
        const bookName = row.getValue('bookName') as string;

        return <div>{bookName}</div>;
      },
    },
    {
      accessorKey: 'requestDate',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Request Date' />
      ),
      cell: ({ row }) => {
        const date = parseISO(row.getValue('requestDate'));
        const dateFormat = 'EEE MMM dd, yyyy';
        const formattedDate = format(date, dateFormat);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: 'isApproved',
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ row }) => {
        const status = row.getValue('isApproved');

        if (status)
          return (
            <div className='flex flex-row'>
              <CheckCheck size={20} className='mr-2 text-green-600' />{' '}
              <span>Approved</span>
            </div>
          );
        else
          return (
            <div className='flex flex-row'>
              <XCircle size={20} className='mr-2 text-red-600' />{' '}
              <span>Pending</span>
            </div>
          );
      },
    },
  ];

  return columns;
};

export default ColumnsFunction;
