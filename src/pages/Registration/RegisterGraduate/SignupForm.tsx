import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useGraduateRegistration } from '@/hooks/useUser';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

const FormSchema = z.object({
  id: z
    .string()
    .min(4, {
      message: 'Student ID must be at least 4 characters.',
    })
    .max(8, { message: 'Student ID must not exceed 8 characters.' }),
  fullname: z.string().min(1, 'Full Name is required.'),
  mobile: z.string().min(1, 'Mobile number is required.'),
  email: z.string().email().min(1, 'Email is required.'),
  password: z.string().min(6).min(1, 'Password is required.'),
  password_confirmation: z
    .string()
    .min(6)
    .min(1, 'Password confirmation is required.'),
});

const SignupForm = () => {
  const register = useGraduateRegistration();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
      fullname: '',
      mobile: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    register.mutate(data);
  };

  useEffect(() => {
    if (register.isSuccess) {
      register.reset();
      form.reset();
      alert('Registered Successfully');
    }
  }, [register, register.isSuccess, navigate, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid grid-cols-12 gap-4'
      >
        <div className='col-span-12 md:col-span-6 space-y-4'>
          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Student ID' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Full Name' {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='mobile'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Mobile Number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-12 md:col-span-6 space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Email' {...field} />
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
                    placeholder='Enter Password'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password_confirmation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirm Password'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-12 mt-4 mb-4 flex flex-col justify-center items-center'>
          {register.isError && (
            <p className='pl-2 text-sm text-rose-600 flex items-center mb-3'>
              <AlertTriangle className='mr-2' size={20} />
              {register.error.message}
            </p>
          )}
          <Button
            variant={'default'}
            type='submit'
            className='w-full rounded-2xl max-w-[300px]'
            loading={register.isLoading}
          >
            Create Account
          </Button>

          <Button
            onClick={() => {
              navigate('/login/user');
            }}
            type='button'
            variant={'link'}
            className='mt-2 md:mt-0'
          >
            Already have an account? Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
