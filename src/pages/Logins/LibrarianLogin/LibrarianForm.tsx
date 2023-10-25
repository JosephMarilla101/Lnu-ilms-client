import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrarianLogin } from '@/hooks/useAuth';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const LibrarianForm = () => {
  const librarianLogin = useLibrarianLogin();
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
    librarianLogin.mutate(data);
  };

  const handlePasswordShown = () => {
    setPasswordShown((prev) => !prev);
  };

  useEffect(() => {
    if (librarianLogin.isSuccess) {
      librarianLogin.reset();
      navigate('/dashboard');
    }
  }, [librarianLogin, librarianLogin.isSuccess, navigate]);

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
              <FormMessage />
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
                  icon={passwordShown ? Eye : EyeOff}
                  iconPosition='end'
                  iconClick={handlePasswordShown}
                  {...field}
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        {/* <div className='flex items-center space-x-2'>
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
        </div> */}

        {librarianLogin.isError && (
          <p className='mt-3 pl-2 text-left text-sm text-rose-600 flex items-center'>
            <AlertTriangle className='mr-2' size={20} />
            {librarianLogin.error.message}
          </p>
        )}

        <Button
          variant={'default'}
          type='submit'
          className='w-full'
          loading={librarianLogin.isLoading}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LibrarianForm;
