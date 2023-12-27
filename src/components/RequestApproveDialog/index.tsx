import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { AlertTriangle, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import useBookRequest from '@/context/useBookRequest';
import { useChangeRequestStatus } from '@/hooks/useBookRequest';

const ApproveDialog = () => {
  const [date, setDate] = useState<Date>();
  const changeRequestStatus = useChangeRequestStatus();
  const [open, setOpen] = useState(true);
  const { resetState, bookId, userId, id } = useBookRequest();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set dueDate to selected date and 11:59 pm
    const newDate = date
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59)
      : undefined;

    changeRequestStatus.mutate({
      id: id ?? 0,
      bookId: bookId ?? 0,
      userId: userId ?? 0,
      status: 'FORPICKUP',
      dueDate: newDate,
    });

    // borrowBook.mutate({ dueDate: newDate, requestId: id ?? 0 });
  };

  useEffect(() => {
    if (changeRequestStatus.isSuccess) {
      setOpen(false);
      changeRequestStatus.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Book request approved.',
      });
    }
  }, [changeRequestStatus, toast]);

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[320px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Approve Book Request</DialogTitle>
            <DialogDescription>
              Add book return due date. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='my-6'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {changeRequestStatus.isError && (
              <p className='mt-3 pl-2 text-left text-sm text-rose-600 flex items-center'>
                <AlertTriangle className='mr-2' size={20} />
                {changeRequestStatus.error.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type='submit'
              loading={changeRequestStatus.isLoading}
              className='w-[140px]'
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
