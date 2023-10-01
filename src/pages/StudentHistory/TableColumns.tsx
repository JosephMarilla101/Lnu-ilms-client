import { ColumnDef } from '@tanstack/react-table';
import { IssuedBook } from '@/hooks/useStudent';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { format, parseISO } from 'date-fns';

const ColumnsFunction = () => {
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
        return <div>{`₱ ${row.original.lateFee.toFixed(2)}`}</div>;
      },
    },
  ];

  return columns;
};

export default ColumnsFunction;
