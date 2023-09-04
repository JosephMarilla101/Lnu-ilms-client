import { useBookList } from '@/hooks/useBook';
import BookSkeletonLoader from '@/components/Skeletons/BookSkeletonLoader';
import { Suspense, lazy, useEffect } from 'react';
import { cn } from '@/lib/utils';

const BookCard = lazy(() => import('@/components/BookCard'));

type BookListProps = {
  className?: string;
};

const BookList: React.FC<BookListProps> = ({ className }) => {
  const bookList = useBookList();

  useEffect(() => {
    if (bookList.isSuccess) {
      console.log(bookList.data.pages[0][0].id);
    }
  }, [bookList.data?.pages, bookList.isSuccess]);

  return (
    <div className={cn('mt-4', className)}>
      {bookList.isLoading ? (
        'Loading'
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
