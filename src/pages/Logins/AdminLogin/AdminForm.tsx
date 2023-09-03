import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAdminLogin } from '@/hooks/useAuth';
import { AlertTriangle } from 'lucide-react';

const FormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const AdminForm = () => {
  const adminLogin = useAdminLogin();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    adminLogin.mutate(data);
  };

  useEffect(() => {
    if (adminLogin.isSuccess) {
      adminLogin.reset();
      navigate('/dashboard');
    }
  }, [adminLogin, adminLogin.isSuccess, navigate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='password'
                  type={passwordShown ? 'text' : 'password'}
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='show-password'
            checked={passwordShown}
            onClick={() => {
              setPasswordShown((prev) => !prev);
            }}
          />
          <label
            htmlFor='show-password'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Show password
          </label>
        </div>

        {adminLogin.isError && (
          <p className='mt-3 pl-2 text-left text-sm text-rose-600 flex items-center'>
            <AlertTriangle className='mr-2' size={20} />
            {adminLogin.error.message}
          </p>
        )}

        <Button
          variant={'default'}
          type='submit'
          className='w-full'
          loading={adminLogin.isLoading}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
