import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthenticateUser } from '@/hooks/useAuth';
import { format, parseISO } from 'date-fns';
import UpdateDialog from './UpdateDialog';
import ChangePasswordDialog from './ChangePasswordDialog';

const StudentProfile = () => {
  const auth = useAuthenticateUser();

  const formatDate = (date?: Date) => {
    if (!date) return;

    return format(parseISO(date.toString()), 'MMM d, yyyy h:mm a');
  };
  return (
    <div className='container max-w-3xl mx-auto py-5 flex flex-col justify-center items-center'>
      <div className='w-full flex flex-row'>
        <div className='w-fit p-1 bg-secondary rounded-full'>
          <Avatar className='w-[150px] h-[150px]'>
            <AvatarImage
              src={auth.data?.profilePhoto ?? ''}
              alt='Profile Photo'
            />
            <AvatarFallback className='bg-slate-300'>DP</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex flex-col justify-center gap-1 pl-4'>
          <h1 className='font-semibold text-slate-700 text-3xl'>
            {auth.data?.fullname}
          </h1>
          <span>
            {auth.data?.studentId} {`(${auth.data?.course})`}
          </span>

          <div className='flex flex-row gap-2'>
            <UpdateDialog>
              <Button size={'sm'} className='w-[150px]'>
                Edit Profile
              </Button>
            </UpdateDialog>

            <ChangePasswordDialog>
              <Button
                variant={'secondary'}
                size={'sm'}
                className='w-[150px] text-white'
              >
                Change Password
              </Button>
            </ChangePasswordDialog>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-x-4 gap-y-2 w-full mt-6 text-lg font-medium'>
        <h2 className='col-span-12 text-xl mb-3'>Profile Information</h2>

        <div className='col-span-4'>Student #:</div>
        <div className='col-span-8 text-primary'>{auth.data?.studentId}</div>

        <div className='col-span-4'>Full Name:</div>
        <div className='col-span-8 text-primary'>{auth.data?.fullname}</div>

        <div className='col-span-4'>College:</div>
        <div className='col-span-8 text-primary'>{auth.data?.college}</div>

        <div className='col-span-4'>Course:</div>
        <div className='col-span-8 text-primary'>{auth.data?.course}</div>

        <div className='col-span-4'>Email:</div>
        <div className='col-span-8 text-primary'>{auth.data?.email}</div>

        <div className='col-span-4'>Mobile:</div>
        <div className='col-span-8 text-primary'>{auth.data?.mobile}</div>

        <div className='col-span-4'>Reg Date:</div>
        <div className='col-span-8 text-primary'>
          {formatDate(auth.data?.createdAt)}
        </div>

        <div className='col-span-4'>Updation Date:</div>
        <div className='col-span-8 text-primary'>
          {formatDate(auth.data?.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
