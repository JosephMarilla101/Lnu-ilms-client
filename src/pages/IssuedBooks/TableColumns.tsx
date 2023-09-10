import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Check, MoreHorizontal, Undo2 } from 'lucide-react';
import { IssuedBooks, useGetBookLateFee } from '@/hooks/useBook';
import { format, parseISO, isValid, differenceInDays, isAfter } from 'date-fns';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
import useTableDialog from '@/context/useTableDialog';
import { Skeleton } from '@/components/ui/skeleton';

const ColumnsFunction = () => {
  const { setId, setAction } = useTableDialog();
  const getBookLateFee = useGetBookLateFee();

  const calculateLateFee = (
    dueDate: Date,
    initialFee: number,
    feePerDay: number
  ): number => {
    const currentDateAndTime = new Date();

    const daysLate = differenceInDays(currentDateAndTime, dueDate);

    let lateFee = 0;
    if (isAfter(currentDateAndTime, dueDate)) lateFee = lateFee + initialFee;

    // add the followingDateFee if late for more than 1 day
    if (daysLate >= 1) {
      for (let i = daysLate; i >= 1; i--) {
        lateFee = lateFee + feePerDay;
      }
    }

    return lateFee;
  };

  const columns: ColumnDef<IssuedBooks>[] = [
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
        <ColumnHeader column={column} title='Book Title' />
      ),
    },
    {
      accessorKey: 'studentId',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Student ID' />
      ),
      cell: ({ row }) => {
        const studentId = row.getValue('studentId') as string;

        return <div>{studentId}</div>;
      },
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => <ColumnHeader column={column} title='Due Date' />,
      cell: ({ row }) => {
        const date = parseISO(row.getValue('dueDate'));
        const dateFormat = 'EEE MMM dd, yyyy';
        const formattedDate = format(date, dateFormat);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: 'returnedDate',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Return Date' />
      ),
      cell: ({ row }) => {
        const date = parseISO(row.getValue('returnedDate'));

        if (!isValid(date))
          return (
            <div className='flex flex-row'>
              <Undo2 size={20} className='mr-2 text-red-400' />{' '}
              <span>Unreturn</span>
            </div>
          );

        const dateFormat = 'EEE MMM dd, yyyy';
        const formattedDate = format(date, dateFormat);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: 'lateFee',
      header: ({ column }) => <ColumnHeader column={column} title='Late Fee' />,
      cell: ({ row }) => {
        const lateFee = row.original.lateFee;
        const dueDate = row.original.dueDate;

        if (getBookLateFee.isLoading || !getBookLateFee.data)
          return <div>Please wait...</div>;

        // calculate the late fee if the book is unreturn
        if (!row.original.isReturn) {
          const fee = calculateLateFee(
            parseISO(dueDate),
            getBookLateFee.data?.initialFee,
            getBookLateFee.data?.followingDateFee
          );
          return <div>{`₱ ${fee.toFixed(2)}`}</div>;
        }

        return <div>{`₱ ${lateFee.toFixed(2)}`}</div>;
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
                    setAction('update');
                    setId(rowData.id);
                  }}
                >
                  <Check size={15} className='mr-2 text-green-600' />
                  Mark as return
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
