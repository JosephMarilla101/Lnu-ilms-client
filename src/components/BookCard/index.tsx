import { cn } from '@/lib/utils';
import { useGetBook } from '@/hooks/useBook';
import BookSkeletonLoader from '@/components/Skeletons/BookSkeletonLoader';

type BookCardProps = {
  className?: string;
  bookId: number;
};

const BookCard: React.FC<BookCardProps> = ({ className, bookId }) => {
  const book = useGetBook(bookId);

  if (book.isLoading) return <BookSkeletonLoader />;

  return (
    <div className='w-[170px] overflow-hidden'>
      <div className={cn('relative h-[220px]', className)}>
        <div
          className='cursor-pointer w-full h-full rounded-sm'
          style={{
            backgroundImage: `url(${book.data?.bookCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        <div className='absolute top-0 right-0'>
          <div
            className={`${
              book.data?.isIssued ? 'bg-green-500' : 'bg-red-500'
            } text-white w-40 transform text-center rotate-45 absolute top-3 -right-14`}
          >
            <span className='text-xs transform rotate-45'>
              {book.data?.isIssued ? 'Issued' : 'Unissued'}
            </span>
          </div>
        </div>

        <div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent flex items-end text-white'>
          <span className='text-center text-sm w-full mb-2 truncate'>
            {book.data?.author.name}
          </span>
        </div>
      </div>
      <span className='text-center text-sm mx-1 font-semibold text-primary block mt-2 break-all leading-4'>
        {book.data?.name}
      </span>
    </div>
  );
};

export default BookCard;
