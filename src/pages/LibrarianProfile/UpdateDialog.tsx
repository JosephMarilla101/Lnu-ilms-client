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
import { useUpdateProfile } from '@/hooks/useLibrarian';
import { useAuthenticateUser } from '@/hooks/useAuth';

type UpdateDialogProps = {
  children: React.ReactNode;
};

const UpdateDialog: React.FC<UpdateDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const updateProfile = useUpdateProfile();
  const auth = useAuthenticateUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullname: auth.data?.fullname ?? '',
    email: auth.data?.email ?? '',
    mobile: auth.data?.mobile ?? '',
    username: auth.data?.username ?? '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile.mutate(formData);
  };

  useEffect(() => {
    if (updateProfile.isSuccess) {
      updateProfile.reset();

      setOpen(false);
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Profile updated successfully.',
      });
    }

    if (updateProfile.isError) {
      updateProfile.reset();

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: updateProfile.error.message,
      });
    }
  }, [toast, updateProfile]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=''>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Update your profile information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='my-3 mt-5 grid grid-cols-12 gap-2'>
            <div className='col-span-6'>
              <Label
                htmlFor='fulllname'
                className='text-sm col-span-3 text-gray-700'
              >
                Full Name:
              </Label>

              <Input
                placeholder='Enter Full Name'
                name='fulllname'
                value={formData.fullname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>

            <div className='col-span-6'>
              <Label
                htmlFor='username'
                className='text-sm col-span-3 text-gray-700'
              >
                Username:
              </Label>

              <Input
                placeholder='Enter Username'
                name='username'
                value={formData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>

            <div className='col-span-6'>
              <Label
                htmlFor='email'
                className='text-sm col-span-3 text-gray-700'
              >
                Email:
              </Label>

              <Input
                placeholder='Enter Email Address'
                name='email'
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>

            <div className='col-span-6'>
              <Label
                htmlFor='mobile'
                className='text-sm col-span-3 text-gray-700'
              >
                Mobile #:
              </Label>

              <Input
                placeholder='Enter Mobile #'
                name='mobile'
                value={formData.mobile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }));
                }}
                className='mt-1'
              />
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' loading={updateProfile.isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
