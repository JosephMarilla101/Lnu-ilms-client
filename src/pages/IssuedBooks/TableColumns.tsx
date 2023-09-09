import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import {
  Check,
  CheckCheck,
  Loader,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { RequestedBook, useCancelRequest } from '@/hooks/useBook';
import { format, parseISO } from 'date-fns';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
import useTableDialog from '@/context/useTableDialog';

const ColumnsFunction = () => {
  const cancelRequest = useCancelRequest();
  const { setId, setAction } = useTableDialog();
  const columns: ColumnDef<RequestedBook>[] = [
    {
      accessorKey: 'bookId',
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
              <Loader size={20} className='mr-2 text-yellow-600' />
              <span>Pending</span>
            </div>
          );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='text-center'>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    cancelRequest.mutate({
                      bookId: rowData.bookId,
                      studentId: rowData.borrowerId,
                    });
                  }}
                >
                  <Trash2 size={15} className='mr-2 text-red-600' />
                  Delete
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setAction('update');
                    setId(rowData.id);
                  }}
                >
                  <Check size={15} className='mr-2 text-green-600' />
                  Approve
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default ColumnsFunction;
