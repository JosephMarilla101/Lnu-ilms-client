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
import { Info, MoreHorizontal, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  Student,
  useSuspendStudent,
  useUnsuspendStudent,
} from '@/hooks/useStudent';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import useTableDialog from '@/context/useTableDialog';

const ColumnsFunction = () => {
  // const { setId, setAction } = useTableDialog();
  const suspendStudent = useSuspendStudent();
  const unsuspendStudent = useUnsuspendStudent();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (suspendStudent.isSuccess) {
      suspendStudent.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Student suspended successfully.',
      });
    }
  }, [suspendStudent, suspendStudent.isSuccess, toast]);

  useEffect(() => {
    if (unsuspendStudent.isSuccess) {
      unsuspendStudent.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Student unsuspended successfully.',
      });
    }
  }, [unsuspendStudent, unsuspendStudent.isSuccess, toast]);

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: 'studentId',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Student ID' />
      ),
    },
    {
      accessorKey: 'fullname',
      header: ({ column }) => (
        <ColumnHeader column={column} title='Full Name' />
      ),
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
      accessorKey: 'college',
      header: ({ column }) => <ColumnHeader column={column} title='College' />,
    },
    {
      accessorKey: 'course',
      header: ({ column }) => <ColumnHeader column={column} title='Course' />,
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
                <DropdownMenuItem
                  onClick={() =>
                    navigate(`/student/history/${row.original.id}`)
                  }
                  className='text-primary'
                >
                  <ShieldAlert size={20} className='mr-2' />
                  View Details
                </DropdownMenuItem>

                {row.original.status ? (
                  <DropdownMenuItem
                    onClick={() => {
                      suspendStudent.mutate({ id: row.original.id });
                    }}
                    className='text-red-600'
                  >
                    <Info size={20} className='mr-2' />
                    Suspend
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => {
                      unsuspendStudent.mutate({ id: row.original.id });
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
