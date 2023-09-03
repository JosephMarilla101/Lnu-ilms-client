import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useCreateAuthor } from '@/hooks/useAuthor';

type AddDialogProps = {
  children: React.ReactNode;
};

const AddDialog: React.FC<AddDialogProps> = ({ children }) => {
  const createAuthor = useCreateAuthor();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createAuthor.mutate(formData);
  };

  useEffect(() => {
    if (createAuthor.isSuccess) {
      setOpen(false);
      createAuthor.reset();
    }
  }, [createAuthor]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[400px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new Author</DialogTitle>
            <DialogDescription>
              Add the author name here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Author name
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                }}
                value={formData.name}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
