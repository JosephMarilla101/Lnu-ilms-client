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
  BadgeCheck,
  BadgeX,
  Loader,
  MoreHorizontal,
  ImageOff,
  Ban,
  PackageCheck,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  RequestedBook,
  useChangeRequestStatus,
  useCancelRequest,
  useReleaseBook,
} from '@/hooks/useBookRequest';
import { format, parseISO } from 'date-fns';
import ColumnHeader from '@/components/DataTable/ColumnHeader';
import { Button } from '@/components/ui/button';
import useBookRequest from '@/context/useBookRequest';
import { useEffect } from 'react';

const ColumnsFunction = () => {
  const changeRequestStatus = useChangeRequestStatus();
  const cancelRequest = useCancelRequest();
  const releaseBook = useReleaseBook();
  const { setId, setBookId, setUserId, setAction } = useBookRequest();
  const { toast } = useToast();

  useEffect(() => {
    if (changeRequestStatus.isSuccess) {
      changeRequestStatus.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Request status change.',
      });
    }

    if (changeRequestStatus.isError) {
      changeRequestStatus.reset();

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: changeRequestStatus.error.message,
      });
    }
  }, [
    changeRequestStatus.isSuccess,
    changeRequestStatus.isError,
    changeRequestStatus,
    toast,
  ]);

  useEffect(() => {
    if (cancelRequest.isSuccess) {
      cancelRequest.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Request status change.',
      });
    }

    if (cancelRequest.isError) {
      cancelRequest.reset();

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: cancelRequest.error.message,
      });
    }
  }, [cancelRequest.isSuccess, cancelRequest.isError, cancelRequest, toast]);

  const columns: ColumnDef<RequestedBook>[] = [
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
        <ColumnHeader column={column} title='Book Name' />
      ),
      cell: ({ row }) => {
        return <div>{row.original.bookName}</div>;
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
      accessorKey: 'status',
      header: ({ column }) => <ColumnHeader column={column} title='Status' />,
      cell: ({ row }) => {
        const status = row.original.status;

        if (row.original.isCancelled && status !== 'DISAPPROVED') {
          return (
            <div className='flex flex-row items-center'>
              <BadgeX size={19} className='mr-1 text-orange-600' />
              <span>CANCELLED</span>
            </div>
          );
        }

        return (
          <div className='flex flex-row items-center'>
            {status === 'PENDING' ? (
              <>
                <Loader size={20} className='mr-1 text-yellow-700' />
                <span>PENDING</span>
              </>
            ) : status === 'FORPICKUP' ? (
              <>
                <PackageCheck size={20} className='mr-1 text-blue-600' />
                <span>FOR PICKUP</span>
              </>
            ) : status === 'DISAPPROVED' ? (
              <>
                <BadgeX size={20} className='mr-1 text-red-600' />
                <span>DISAPPROVED</span>
              </>
            ) : (
              <>
                <BadgeCheck size={20} className='mr-1 text-green-600' />
                <span>RELEASED</span>
              </>
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rowData = row.original;

        if (
          rowData.status === 'RELEASED' ||
          rowData.status === 'DISAPPROVED' ||
          rowData.isCancelled
        )
          return null;
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='text-center'>
                  <Button
                    variant='ghost'
                    className='h-8 w-8 p-0'
                    disabled={true}
                  >
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Show only if status is PENDING */}
                {rowData.status === 'PENDING' && !rowData.isCancelled && (
                  <DropdownMenuItem
                    onClick={() => {
                      setAction('FORPICKUP');
                      setId(rowData.id);
                      setBookId(rowData.bookId);
                      setUserId(rowData.borrowerId);
                    }}
                    className='text-green-600
                  '
                  >
                    <PackageCheck size={20} className='mr-2' />
                    APPROVE (READY 4 PICKUP)
                  </DropdownMenuItem>
                )}

                {/* Show only if status is FORPICKUP */}
                {rowData.status === 'FORPICKUP' && !rowData.isCancelled && (
                  <DropdownMenuItem
                    onClick={() => {
                      releaseBook.mutate({
                        id: rowData.id,
                        bookId: rowData.bookId,
                        userId: rowData.borrowerId,
                      });
                    }}
                    className='text-green-600'
                  >
                    <BadgeCheck size={20} className='mr-2' />
                    MARK AS RELEASED
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => {
                    changeRequestStatus.mutate({
                      id: rowData.id,
                      bookId: rowData.bookId,
                      userId: rowData.borrowerId,
                      status: 'DISAPPROVED',
                    });
                  }}
                  className='text-red-600'
                >
                  <BadgeX size={20} className='mr-2' />
                  DISAPPROVE REQUEST
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    cancelRequest.mutate({ requestId: rowData.id });
                  }}
                  className='text-orange-600'
                >
                  <Ban size={19} className='mr-2' />
                  CANCEL REQUEST
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
