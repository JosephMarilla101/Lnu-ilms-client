import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const FormSchema = z.object({
  studentId: z.string().min(4, {
    message: 'Student ID must be at least 4 characters.',
  }),
  fullname: z.string(),
  course: z.string(),
  college: z.string(),
  mobile: z.number(),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

const courseSelection = [
  'BSIT',
  'BSTM',
  'BSED',
  'BPED',
  'BSBio',
  'BSHM',
  'BECED',
  'BAEL',
  'TCP',
  'BACOM',
  'POLCI',
];

const collegeSelection = ['CAS', 'CME', 'COE'];

const SignupForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid grid-cols-12 gap-4'
      >
        <div className='col-span-12 md:col-span-6 space-y-4'>
          <FormField
            control={form.control}
            name='studentId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>StudentId</FormLabel>
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
            name='course'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Course' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseSelection.map((course, i) => {
                      return (
                        <SelectItem value={course} key={i}>
                          {course}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='course'
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select College' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collegeSelection.map((college, i) => {
                      return (
                        <SelectItem value={college} key={i}>
                          {college}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-12 md:col-span-6 space-y-4'>
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

        <div className='col-span-12 mt-4 mb-4 flex flex-col'>
          <Button
            variant={'default'}
            type='submit'
            className='w-full rounded-2xl max-w-[300px] mx-auto block'
          >
            Create Account
          </Button>

          <Button
            onClick={() => {
              navigate('/student-login');
            }}
            variant={'link'}
            className='mt-2'
          >
            Already have an account? Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
