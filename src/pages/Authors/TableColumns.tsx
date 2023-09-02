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
import { MoreHorizontal } from 'lucide-react';
import ColumnHeader from '@/components/DataTable/ColumnHeader';

export type Author = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  author: string;
};

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: 'id',
    header: 'ID #',
  },
  {
    accessorKey: 'author',
    header: ({ column }) => <ColumnHeader column={column} title='Author' />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Status' />,
  },

  {
    accessorKey: 'amount',
    header: ({ column }) => <ColumnHeader column={column} title='Amount' />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className=' font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    size: 150,
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
              View Authored Books
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Author</DropdownMenuItem>
            <DropdownMenuItem>Update Author</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
