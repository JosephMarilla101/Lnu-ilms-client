import { useBookList } from '@/hooks/useBook';
import BookSkeletonLoader from '@/components/Skeletons/BookSkeletonLoader';
import { Suspense, lazy, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';

const BookCard = lazy(() => import('@/components/BookCard'));

type BookListProps = {
  className?: string;
};

const BookList: React.FC<BookListProps> = ({ className }) => {
  const [filter, setFilter] = useState('');
  const bookList = useBookList(filter);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      bookList.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    bookList.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className={cn('mt-4', className)}>
      <Input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        placeholder='Search Books...'
        className='mb-6 max-w-xs'
      />

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

          <div ref={ref}></div>
        </>
      )}
    </div>
  );
};

export default BookList;
