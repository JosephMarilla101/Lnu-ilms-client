import { useBookList } from '@/hooks/useBook';
import BookSkeletonLoader from '@/components/Skeletons/BookSkeletonLoader';
import { Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';

const BookCard = lazy(() => import('@/components/BookCard'));

type BookListProps = {
  className?: string;
};

const BookList: React.FC<BookListProps> = ({ className }) => {
  const bookList = useBookList();

  return (
    <div className={cn('mt-4', className)}>
      {bookList.isLoading ? (
        <div className='flex flex-row gap-3 gap-x-6 flex-wrap justify-items-start'>
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
          <BookSkeletonLoader />
        </div>
      ) : !bookList.data?.pages ? (
        ''
      ) : bookList.data.pages[0].length < 1 ? (
        'No Books Listed'
      ) : (
        <>
          {bookList.data.pages.map((group, i) => {
            return (
              <div
                key={i}
                className='flex flex-row gap-3 gap-x-6 flex-wrap justify-items-start'
              >
                {group.map((book) => {
                  return (
                    <div key={book.id}>
                      <Suspense fallback={<BookSkeletonLoader />}>
                        <BookCard bookId={book.id} />
                      </Suspense>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default BookList;
