import { ColumnDef } from '@tanstack/react-table';
import { IssuedBook } from '@/hooks/useUser';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { differenceInDays, format, isAfter, parseISO } from 'date-fns';
import { BadgeX } from 'lucide-react';
import { useGetBookLateFee } from '@/hooks/useBook';

const ColumnsFunction = () => {
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

  const columns: ColumnDef<IssuedBook>[] = [
    {
      header: '#',
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: 'ISBN',
      header: ({ column }) => <ColumnHeader column={column} title='ISBN' />,
      cell: ({ row }) => {
        return <div>{row.original.book.isbn}</div>;
      },
    },
    {
      accessorKey: 'Book Name',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Book Name' />
      ),
      cell: ({ row }) => {
        return <div>{row.original.book.name}</div>;
      },
    },
    {
      accessorKey: 'Issued Date',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Issued Date' />
      ),
      cell: ({ row }) => {
        const date = parseISO(row.original.createdAt.toString());
        const dateFormat = 'MMM dd yyyy hh:mm a';
        const formattedDate = format(date, dateFormat);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: 'Returned Date',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Returned  Date' />
      ),
      cell: ({ row }) => {
        if (!row.original.returnedDate)
          return (
            <div className='flex flex-row items-center text-red-600'>
              <BadgeX size={20} className='mr-1 ml-1' />
              <span className='ml-1'>Unreturn</span>
            </div>
          );
        const date = parseISO(row.original.returnedDate.toString());
        const dateFormat = 'MMM dd yyyy hh:mm a';
        const formattedDate = format(date, dateFormat);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: 'Fine',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Fine (if any)' />
      ),
      cell: ({ row }) => {
        if (getBookLateFee.isLoading || !getBookLateFee.data)
          return <div>Please wait...</div>;

        // calculate the late fee if the book is unreturn
        const dueDate = row.original.dueDate;
        if (!row.original.isReturn) {
          const fee = calculateLateFee(
            parseISO(dueDate),
            getBookLateFee.data?.initialFee,
            getBookLateFee.data?.followingDateFee
          );
          return <div>{`₱ ${fee.toFixed(2)}`}</div>
        }

        return (
        <div>
          {`₱ ${row.original.lateFee.toFixed(2)}`}
            {row.original.lateFee > 0 && (
          <div className='flex flex-row items-center text-green-600'>
            <span className='ml-1'>Paid</span>
            </div>
            )}
        </div>
        )
      },
    },
  ];

  return columns;
};

export default ColumnsFunction;
