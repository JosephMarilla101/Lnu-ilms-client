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
  ShieldAlert,
  GanttChartSquare,
  ShieldCheck,
} from 'lucide-react';
import { Student } from '@/hooks/useStudent';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
// import useTableDialog from '@/context/useTableDialog';

const ColumnsFunction = () => {
  // const { setId, setAction } = useTableDialog();

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
              <span className='ml-1'>Blocked</span>
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
                  onClick={() => {
                    console.log(row.original.id);
                  }}
                  className='text-primary'
                >
                  <GanttChartSquare size={20} className='mr-2' />
                  Details
                </DropdownMenuItem>

                <DropdownMenuItem className='text-red-600'>
                  <ShieldAlert size={20} className='mr-2' />
                  Block
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
