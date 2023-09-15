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
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useChangePassword } from '@/hooks/useLibrarian';

type ChangePasswordDialogProps = {
  children: React.ReactNode;
};

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  const changePassword = useChangePassword();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changePassword.mutate(formData);
  };

  useEffect(() => {
    if (changePassword.isSuccess) {
      changePassword.reset();

      setOpen(false);
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Password change successfully.',
      });
    }

    if (changePassword.isError) {
      changePassword.reset();

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: changePassword.error.message,
      });
    }
  }, [toast, changePassword]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-sm'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change Account Password</DialogTitle>
            <DialogDescription>
              Change your account password here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='my-3 mt-5 grid grid-cols-12 gap-2'>
            <div className='col-span-12'>
              <Label
                htmlFor='current_password'
                className='text-sm col-span-3 text-gray-700'
              >
                Current Password:
              </Label>

              <Input
                placeholder='Enter Current Password'
                name='current_password'
                autoComplete='off'
                value={formData.current_password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    current_password: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>

            <div className='col-span-12'>
              <Label
                htmlFor='new_password'
                className='text-sm col-span-3 text-gray-700'
              >
                New Password:
              </Label>

              <Input
                placeholder='Enter New Password'
                name='new_password'
                autoComplete='off'
                value={formData.new_password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    new_password: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>

            <div className='col-span-12'>
              <Label
                htmlFor='password_confirmation'
                className='text-sm col-span-3 text-gray-700'
              >
                Confirm Password:
              </Label>

              <Input
                placeholder='Confirm Password'
                name='password_confirmation'
                autoComplete='off'
                value={formData.password_confirmation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    password_confirmation: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' loading={changePassword.isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
