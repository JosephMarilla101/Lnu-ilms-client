import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  CheckCheck,
  XCircle,
  Trash2,
  PenSquare,
  Eye,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import ColumnHeader from '@/components/DataTable/ColumnHeader';

type Author = {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: 'id',
    header: 'ID #',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title='Author' />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = row.getValue('status');

      if (status)
        return (
          <div className='flex flex-row'>
            <CheckCheck size={20} className='mr-2 text-green-600' />{' '}
            <span>Active</span>
          </div>
        );
      else
        return (
          <div className='flex flex-row'>
            <XCircle size={20} className='mr-2 text-red-600' />{' '}
            <span>Inactive</span>
          </div>
        );
    },
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Creation Date' />
    ),
    cell: ({ row }) => {
      const date = parseISO(row.getValue('createdAt'));
      const dateFormat = 'EEE MMM d, yyyy';
      const formattedDate = format(date, dateFormat);

      return <div className='font-medium'>{formattedDate}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original;
      return (
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
            <DropdownMenuItem onClick={() => console.log(rowData.id)}>
              <Eye size={15} className='mr-2 text-gray-600' />
              Authored Books
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 size={15} className='mr-2 text-red-600' /> Delete Author
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PenSquare size={15} className='mr-2 text-blue-600' /> Update
              Author
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
