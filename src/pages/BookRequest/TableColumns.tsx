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
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

const ColumnsFunction = () => {
  const cancelRequest = useCancelRequest();
  const { setId, setAction } = useTableDialog();

  useEffect(() => {
    if (cancelRequest.isSuccess) {
      cancelRequest.reset();
    }
  }, [cancelRequest]);

  const columns: ColumnDef<RequestedBook>[] = [
    {
      accessorKey: 'Book Cover',
      header: '',
      cell: ({ row }) => {
        const bookCover = row.original.bookCover;
        return (
          <div className='relative h-[100px] w-[70px]'>
            {!bookCover ? (
              <Skeleton className='w-full h-full rounded-sm bg-slate-200' />
            ) : (
              <img
                className='absolute rounded-sm w-full h-full inset-0 object-cover pointer-events-none'
                loading='lazy'
                src={bookCover}
                alt='Book Cover'
              />
            )}
          </div>
        );
      },
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
      accessorKey: 'copies',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Copies Available' />
      ),
    },
    {
      accessorKey: 'studentId',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Requestor ID' />
      ),
    },
    {
      accessorKey: 'requestDate',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Request Date' />
      ),
      cell: ({ row }) => {
        const date = parseISO(row.getValue('requestDate'));
        const dateFormat = 'MMM dd yyyy hh:mm a';
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
                  disabled={rowData.isApproved}
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
