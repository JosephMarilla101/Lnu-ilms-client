import Image from './Image';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { UndoDot } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <Image />

      <div className='flex flex-col md:flex-row space-y-3 md:space-y-0  md:space-x-3'>
        <Button
          onClick={() => navigate('/')}
          size={'lg'}
          variant={'default'}
          className='w-[160px]'
        >
          Home
        </Button>
        <Button
          onClick={() => navigate(-1)}
          size={'lg'}
          variant={'outline'}
          className='w-[160px]'
        >
          <UndoDot size={20} className='text-primary mr-2' />
          <span className='text-primary'>Go Back</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
