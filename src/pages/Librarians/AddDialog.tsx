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
import { useLibrarianRegistration } from '@/hooks/useUser';
import { AlertTriangle } from 'lucide-react';

type AddDialogProps = {
  children: React.ReactNode;
};

const AddDialog: React.FC<AddDialogProps> = ({ children }) => {
  const registerLibrarian = useLibrarianRegistration();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    username: '',
    fullname: '',
    mobile: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerLibrarian.mutate(formData);
  };

  useEffect(() => {
    if (registerLibrarian.isSuccess) {
      registerLibrarian.reset();
      setOpen(false);
      setFormData({
        id: '',
        email: '',
        username: '',
        fullname: '',
        mobile: '',
        password: '',
        password_confirmation: '',
      });
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Registered Librarian successfully.',
      });
    }
  }, [registerLibrarian, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Register Librarian</DialogTitle>
            <DialogDescription>
              Add librarian details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='my-3 grid grid-cols-12 gap-x-4 gap-y-2'>
            <div className='col-span-12 md:col-span-6 space-y-1 '>
              <Label htmlFor='employeeId' className='text-right'>
                Employee ID
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    id: e.target.value,
                  }));
                }}
                placeholder='Enter Employee ID'
                value={formData.id}
                name='employeeId'
              />
            </div>

            <div className='col-span-12 md:col-span-6 space-y-1 '>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
                placeholder='Enter Username'
                value={formData.username}
                name='username'
              />
            </div>

            <div className='col-span-12 md:col-span-6 space-y-1 '>
              <Label htmlFor='email' className='text-right'>
                Email Address
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                placeholder='Enter Email Address'
                value={formData.email}
                name='email'
              />
            </div>

            <div className='col-span-12 md:col-span-6 space-y-1 '>
              <Label htmlFor='fullname' className='text-right'>
                Full Name
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }));
                }}
                placeholder='Enter Full Name'
                value={formData.fullname}
                name='fullname'
              />
            </div>

            <div className='col-span-12 md:col-span-6 space-y-1 '>
              <Label htmlFor='mobile' className='text-right'>
                Mobile #
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }));
                }}
                placeholder='Enter Mobile #'
                value={formData.mobile}
                name='mobile'
              />
            </div>

            <div className='hidden md:block col-span-12 md:col-span-6 space-y-1'></div>

            <div className='col-span-12 md:col-span-6 space-y-1 '>
              <Label htmlFor='password' className='text-right'>
                Password
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                placeholder='Enter Password'
                value={formData.password}
                name='password'
                autoComplete='off'
              />
            </div>

            <div className='col-span-12 md:col-span-6 space-y-1'>
              <Label htmlFor='password_confirmation' className='text-right'>
                Confirm Password
              </Label>
              <Input
                required
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password_confirmation: e.target.value,
                  }));
                }}
                placeholder='Confirm Password'
                value={formData.password_confirmation}
                name='password_confirmation'
                autoComplete='off'
              />
            </div>
          </div>

          {registerLibrarian.isError && (
            <p className='mt-4 text-center text-sm text-rose-600 flex justify-center'>
              <AlertTriangle className='mr-2' size={20} />
              <span>{registerLibrarian.error.message}</span>
            </p>
          )}

          <DialogFooter>
            <Button type='submit' loading={registerLibrarian.isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
