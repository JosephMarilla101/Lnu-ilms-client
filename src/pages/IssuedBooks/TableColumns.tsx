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
  MoreHorizontal,
  BadgeX,
  BadgeCheck,
  Trash2,
  ImageOff,
} from 'lucide-react';
import {
  IssuedBooks,
  useGetBookLateFee,
  useReturnBorrowedBook,
  useDeleteBorrowedBook,
} from '@/hooks/useBook';
import { format, parseISO, differenceInDays, isAfter } from 'date-fns';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
import useTableDialog from '@/context/useTableDialog';

const ColumnsFunction = () => {
  const { setId, setAction } = useTableDialog();
  const returnBook = useReturnBorrowedBook();
  const getBookLateFee = useGetBookLateFee();
  const deleteBorrowedBook = useDeleteBorrowedBook();

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
              <div className='absolute inset-0 flex flex-row items-center justify-center bg-[gainsboro] pointer-events-none'>
                <ImageOff size={15} className='text-primary' />
              </div>
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
        const dateFormat = 'MMM dd yyyy hh:mm a';
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
        if (!row.original.isReturn)
          return (
            <div className='flex flex-row items-center text-red-600'>
              <BadgeX size={20} className='mr-1 ml-1' />
              <span className='ml-1'>Unreturn</span>
            </div>
          );

        const date = parseISO(row.original.returnedDate.toString());
        const dateFormat = 'MMM dd yyyy hh:mm a';
        const formattedDate = format(date, dateFormat);

        return (
          <div className='flex flex-row items-center text-green-600'>
            <BadgeCheck size={28} className='mr-2' />
            <span>{formattedDate}</span>
          </div>
        );
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
                  disabled={row.original.isReturn}
                  onClick={() => {
                    returnBook.mutate({ borrowedBookId: row.original.id });
                  }}
                  className='text-green-600'
                >
                  <BadgeCheck size={20} className='mr-2' />
                  Mark as Returned
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    if (row.original.isReturn) {
                      deleteBorrowedBook.mutate({ issuedId: row.original.id });
                    } else {
                      setAction('delete');
                      setId(row.original.id);
                    }
                  }}
                  className='text-red-600'
                >
                  <Trash2 size={20} className='mr-2' />
                  Delete
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
