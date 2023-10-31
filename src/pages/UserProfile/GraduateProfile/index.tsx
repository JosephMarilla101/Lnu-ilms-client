import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuthenticateUser } from '@/hooks/useAuth';
import { format, parseISO } from 'date-fns';
import UpdateDialog from './UpdateDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import { useToast } from '@/components/ui/use-toast';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useUpdateProfilePhoto } from '@/hooks/useUser';
import { Camera } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const GraduateProfile = () => {
  const auth = useAuthenticateUser();
  const imageUploader = useImageUpload();
  const updateProfilePhoto = useUpdateProfilePhoto();
  const [selectedFile, setSelectedFile] = useState('');
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (res) => {
        setSelectedFile(res.target?.result?.toString() ?? '');
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    } else {
      handleRemoveImage();
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatDate = (date?: Date) => {
    if (!date) return;

    return format(parseISO(date.toString()), 'MMM d, yyyy h:mm a');
  };

  useEffect(() => {
    if (selectedFile) {
      const profileUpdater = async () => {
        const res = await imageUploader.mutateAsync(selectedFile);

        if (res.status === 200) {
          updateProfilePhoto.mutate({
            profilePhoto: res.data.secure_url,
            profilePhotoId: res.data.public_id,
          });
        }
      };

      profileUpdater();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  useEffect(() => {
    if (updateProfilePhoto.isSuccess) {
      updateProfilePhoto.reset();
      imageUploader.reset();

      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Profile Photo updated successfully.',
      });
    }

    if (updateProfilePhoto.isError) {
      updateProfilePhoto.reset();
      imageUploader.reset();

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: updateProfilePhoto.error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfilePhoto]);

  return (
    <div className='container max-w-3xl mx-auto py-5 flex flex-col justify-center items-center'>
      <div className='w-full flex flex-col sm:flex-row items-center text-center sm:text-left'>
        <div className='relative w-fit p-1 bg-secondary rounded-full'>
          <Avatar className='w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]'>
            <AvatarImage
              src={auth.data?.profile?.profilePhoto ?? ''}
              alt='Profile Photo'
            />
            <AvatarFallback className='bg-slate-300'>DP</AvatarFallback>
          </Avatar>

          {imageUploader.isLoading && (
            <Progress
              value={imageUploader.progress}
              className='mt-2 h-3 bg-gray-300 absolute'
            />
          )}

          <div
            onClick={() => {
              if (
                inputRef.current &&
                !imageUploader.isLoading &&
                !updateProfilePhoto.isLoading
              )
                inputRef.current.click();
            }}
            className='absolute top-2 right-2 bg-gray-400 p-2 rounded-full cursor-pointer'
          >
            <Camera className='text-slate-200' size={20} />
          </div>

          <input
            ref={inputRef}
            className='absolute w-full h-full cursor-pointer opacity-0 invisible'
            type='file'
            name='img-uploader'
            id={`img-uploader`}
            multiple={false}
            accept='image/jpeg, image/jpg, image/png'
            onChange={handleFileChange}
          />
        </div>

        <div className='flex flex-col justify-center gap-1 pl-4'>
          <h1 className='font-semibold text-slate-700 text-3xl'>
            {auth.data?.profile?.fullname}
          </h1>
          <span>{auth.data?.profile?.id} (GRADUATE)</span>

          <div className='flex flex-col sm:flex-row items-center gap-2 mt-1'>
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

        <div className='col-span-4'>
          {auth.data?.role === 'TEACHER' ? 'Employee ID' : 'Student ID'}
        </div>
        <div className='col-span-8 text-primary'>{auth.data?.profile?.id}</div>

        <div className='col-span-4'>Full Name:</div>
        <div className='col-span-8 text-primary'>
          {auth.data?.profile?.fullname}
        </div>

        <div className='col-span-4'>Email:</div>
        <div className='col-span-8 text-primary'>{auth.data?.email}</div>

        <div className='col-span-4'>Mobile:</div>
        <div className='col-span-8 text-primary'>
          {auth.data?.profile?.mobile}
        </div>

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

export default GraduateProfile;
