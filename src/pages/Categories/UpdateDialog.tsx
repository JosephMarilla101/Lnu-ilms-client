import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { CheckCheck, XCircle } from 'lucide-react';
import { useGetCategory, useUpdateCategory } from '@/hooks/useCategory';
import useTableDialog from '@/context/useTableDialog';

const UpdateDialog = () => {
  const [open, setOpen] = useState(true);
  const { toast } = useToast();
  const { id, resetState } = useTableDialog();
  const getCategory = useGetCategory(id);
  const updateCategory = useUpdateCategory();

  const [formData, setFormData] = useState({
    name: '',
    status: false,
  });

  const selectChange = (value: string) => {
    if (value === 'false') {
      setFormData((prev) => ({ ...prev, status: false }));
    } else {
      setFormData((prev) => ({ ...prev, status: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) updateCategory.mutate({ id, ...formData });
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  useEffect(() => {
    if (getCategory.isSuccess && !getCategory.isError) {
      setFormData({
        name: getCategory.data.name,
        status: getCategory.data.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategory.isError, getCategory.isSuccess]);

  useEffect(() => {
    if (updateCategory.isSuccess) {
      resetState();
      setOpen(false);
      toast({
        title: 'Success!',
        description: 'Author updated successfully',
      });
      updateCategory.reset();
    }
  }, [resetState, toast, updateCategory]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[400px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Author</DialogTitle>
            <DialogDescription>
              Update category name or status here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
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

              <Label htmlFor='status' className='text-right'>
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
          <DialogFooter>
            <Button
              type='submit'
              loading={updateCategory.isLoading}
              className='w-[150px]'
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
