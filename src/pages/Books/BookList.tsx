import { useBookList } from '@/hooks/useBook';
import { useGetActiveCategories } from '@/hooks/useCategory';
import BookSkeletonLoader from '@/components/Skeletons/BookSkeletonLoader';
import { Suspense, lazy, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BookCard = lazy(() => import('@/components/BookCard'));

type BookListProps = {
  className?: string;
};

const BookList: React.FC<BookListProps> = ({ className }) => {
  const [filter, setFilter] = useState('');
  const [categoryFiler, setCategoryFilter] = useState('');
  const bookList = useBookList(filter, categoryFiler);
  const activeCategories = useGetActiveCategories();

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
  }, [filter, categoryFiler]);

  return (
    <div className={cn('mt-4', className)}>
      <div className='flex flex-row gap-4'>
        <Input
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder='Search Books'
          className='mb-6 max-w-xs'
        />

        <Select
          value={categoryFiler}
          onValueChange={(value) => {
            setCategoryFilter(value);
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value=''>None</SelectItem>
              {activeCategories.data &&
                activeCategories.data.map((category) => {
                  return (
                    <SelectItem value={category.name} key={category.id}>
                      {category.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
                className='flex flex-row gap-3 gap-x-6 flex-wrap justify-center md:justify-start'
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
