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
import { UseMutationResult } from '@tanstack/react-query';

type DeleteDialogProps = {
  deleteBook: UseMutationResult<
    unknown,
    ErrorResponse,
    { id: number },
    unknown
  >;
};

const DeleteDialog = ({ deleteBook }: DeleteDialogProps) => {
  const { id, resetState } = useTableDialog();
  const [open, setOpen] = useState(true);

  const handleDelete = () => {
    if (id) deleteBook.mutate({ id });
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='max-w-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please note that this action is irreversible and will result in the
            deletion of the book.
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
