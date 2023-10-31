import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import useTableDialog from '@/context/useTableDialog';
import { useDeleteBorrowedBook } from '@/hooks/useBook';

const DeleteDialog = () => {
  const deleteBorrowedBook = useDeleteBorrowedBook();
  const { id, resetState } = useTableDialog();
  const [open, setOpen] = useState(true);

  const handleDelete = () => {
    if (id) deleteBorrowedBook.mutate({ issuedId: id });
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  useEffect(() => {
    if (deleteBorrowedBook.isSuccess) {
      resetState();
      setOpen(false);
      deleteBorrowedBook.reset();
    }
  }, [deleteBorrowedBook, resetState]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='max-w-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This book is currently marked as unreturned. Please note that this
            action is irreversible and will result in the deletion of the issued
            book.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
