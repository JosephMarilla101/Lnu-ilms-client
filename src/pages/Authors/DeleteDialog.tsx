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
import { useDeleteAuthor } from '@/hooks/useAuthor';

const DeleteDialog = () => {
  const deleteAuthor = useDeleteAuthor();
  const { id, resetState } = useTableDialog();
  const [open, setOpen] = useState(true);

  const handleDelete = () => {
    if (id) deleteAuthor.mutate({ id });
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  useEffect(() => {
    if (deleteAuthor.isSuccess) {
      resetState();
      setOpen(false);
      deleteAuthor.reset();
    }
  }, [deleteAuthor, resetState]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='max-w-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. It will delete the author, but any
            books associated with the author will remain unaffected.
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
