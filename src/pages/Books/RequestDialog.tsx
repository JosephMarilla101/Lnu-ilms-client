import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import useTableDialog from '@/context/useTableDialog';
import { useGetBook, useRequestBook } from '@/hooks/useBook';

const RequestDialog = () => {
  const [open, setOpen] = useState(true);

  const { resetState, id } = useTableDialog();
  const requestBook = useRequestBook();
  const book = useGetBook(id ?? 0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookId = id ?? 0;

    requestBook.mutate({ bookId });
  };

  useEffect(() => {
    if (requestBook.isSuccess) {
      setOpen(false);
      requestBook.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Book borrow request sent.',
      });
    }

    if (requestBook.isError) {
      requestBook.reset();

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: requestBook.error.message,
      });
    }
  }, [requestBook.isSuccess, requestBook.isError, requestBook, toast]);

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[450px]'>
        <form onSubmit={handleSubmit}>
          <div className='my-6'>
            <div className='flex flex-row gap-x-3 '>
              <div className='relative h-[220px] w-[150px]'>
                <img
                  src={book.data?.bookCover}
                  alt='Book Cover'
                  className='absolute rounded-sm w-full h-full inset-0 object-cover'
                />
              </div>

              <div className='flex-1 mt-1'>
                <h1 className='text-primary text-lg font-semibold italic leading-6 break-normal'>
                  {book.data?.name}
                </h1>

                <h2 className='mt-2 text-secondary text-lg font-semibold italic leading-4 break-normal'>{`(${book.data?.author.name})`}</h2>

                <span className='mt-6 block text-gray-700 italic'>
                  ISBN: {book.data?.isbn}
                </span>
                <span className='block text-gray-700 italic'>
                  Copies Available: {book.data?.copies}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              loading={requestBook.isLoading}
              className='w-[150px]'
            >
              Request Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDialog;
