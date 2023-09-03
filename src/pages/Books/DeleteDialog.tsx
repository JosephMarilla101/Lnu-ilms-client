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
import { useDeleteCategory } from '@/hooks/useCategory';

const DeleteDialog = () => {
  const deleteCategory = useDeleteCategory();
  const { id, resetState } = useTableDialog();
  const [open, setOpen] = useState(true);

  const handleDelete = () => {
    if (id) deleteCategory.mutate({ id });
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  useEffect(() => {
    if (deleteCategory.isSuccess) {
      resetState();
      setOpen(false);
      deleteCategory.reset();
    }
  }, [deleteCategory, resetState]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='max-w-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. It will delete the category, but any
            books associated with the category will remain unaffected.
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
