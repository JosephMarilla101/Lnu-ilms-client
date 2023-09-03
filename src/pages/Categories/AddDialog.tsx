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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCheck, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useCreateCategory } from '@/hooks/useCategory';

type AddDialogProps = {
  children: React.ReactNode;
};

const AddDialog: React.FC<AddDialogProps> = ({ children }) => {
  const createCategory = useCreateCategory();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    status: true,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCategory.mutate(formData);
  };

  const selectChange = (value: string) => {
    if (value === 'false') {
      setFormData((prev) => ({ ...prev, status: false }));
    } else {
      setFormData((prev) => ({ ...prev, status: true }));
    }
  };

  useEffect(() => {
    if (createCategory.isSuccess) {
      setOpen(false);
      setFormData({ name: '', status: true });
      createCategory.reset();
    }
  }, [createCategory]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[400px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
            <DialogDescription>
              Add the category here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='my-3'>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Category Name
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

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='status' className='text-right col-span-1'>
                  Category Status
                </Label>

                <div className='col-span-3'>
                  <Select
                    name='status'
                    value={formData.status.toString()}
                    onValueChange={selectChange}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Author status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='true'>
                          <div className='flex flex-row'>
                            <CheckCheck
                              size={20}
                              className='mr-2 text-green-600'
                            />{' '}
                            Active
                          </div>
                        </SelectItem>
                        <SelectItem value='false'>
                          <div className='flex flex-row'>
                            <XCircle size={20} className='mr-2 text-red-600' />{' '}
                            Inactive
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' loading={createCategory.isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
