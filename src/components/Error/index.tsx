import { Button } from '@/components/ui/button';
import Image from './Image';
import { FallbackProps } from 'react-error-boundary';

function Error({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Image />

      <p className='text-black'>{error.message}</p>
      <Button
        onClick={resetErrorBoundary}
        variant={'default'}
        className='mt-4 w-[200px]'
      >
        Try Again
      </Button>
    </div>
  );
}

export default Error;
