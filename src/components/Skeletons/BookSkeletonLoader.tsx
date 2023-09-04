import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type BookSkeletonLoaderProps = {
  className?: string;
};

const BookSkeletonLoader: React.FC<BookSkeletonLoaderProps> = ({
  className,
}) => {
  return (
    <div className='w-[170px]'>
      <div className={cn('relative h-[220px]', className)}>
        <Skeleton className='w-full h-full rounded-sm bg-slate-200' />
      </div>

      <Skeleton className='w-[120px] h-[20px] rounded-sm bg-slate-200 mt-2 mx-auto' />
    </div>
  );
};

export default BookSkeletonLoader;
