import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  Librarian,
  useSuspendLibrarian,
  useUnsuspendLibrarian,
} from '@/hooks/useLibrarian';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const ColumnsFunction = () => {
  const suspendLibrarian = useSuspendLibrarian();
  const unsuspendLibrarian = useUnsuspendLibrarian();
  const { toast } = useToast();

  useEffect(() => {
    if (suspendLibrarian.isSuccess) {
      suspendLibrarian.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Librarian suspended successfully.',
      });
    }
  }, [suspendLibrarian, suspendLibrarian.isSuccess, toast]);

  useEffect(() => {
    if (unsuspendLibrarian.isSuccess) {
      unsuspendLibrarian.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Librarian unsuspended successfully.',
      });
    }
  }, [unsuspendLibrarian, unsuspendLibrarian.isSuccess, toast]);

  const columns: ColumnDef<Librarian>[] = [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Employee ID' />
      ),
    },
    {
      accessorKey: 'fullname',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Full Name' />
      ),
    },
    {
      accessorKey: 'username',
      header: ({ column }) => <ColumnHeader column={column} title='Username' />,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <ColumnHeader column={column} title='Email' />,
    },
    {
      accessorKey: 'mobile',
      header: ({ column }) => <ColumnHeader column={column} title='Mobile #' />,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ row }) => {
        if (row.original.status) {
          return (
            <div className='flex flex-row items-center text-green-600'>
              <ShieldCheck size={20} />
              <span className='ml-1'>Active</span>
            </div>
          );
        } else {
          return (
            <div className='flex flex-row items-center text-red-600'>
              <ShieldAlert size={20} />
              <span className='ml-1'>Suspended</span>
            </div>
          );
        }
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

                {row.original.status ? (
                  <DropdownMenuItem
                    onClick={() => {
                      suspendLibrarian.mutate({ id: row.original.id });
                    }}
                    className='text-red-600'
                  >
                    <ShieldAlert size={20} className='mr-2' />
                    Suspend
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => {
                      unsuspendLibrarian.mutate({ id: row.original.id });
                    }}
                    className='text-green-600'
                  >
                    <ShieldCheck size={20} className='mr-2' />
                    Unsuspend
                  </DropdownMenuItem>
                )}
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
