import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import BookCoverUploader from '@/components/BookCoverUploader';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetBook, useUpdateBook, useDeleteBook } from '@/hooks/useBook';
import { BookUp2, BookX, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useGetActiveAuthors } from '@/hooks/useAuthor';
import { useGetActiveCategories, Category } from '@/hooks/useCategory';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type formDataType = {
  authorId: number | undefined;
  bookCover: string | undefined;
  bookCoverId: string | undefined;
  name: string;
  copies: number;
  categoryIds: number[];
};

const formDataInitialValue = {
  authorId: undefined,
  bookCover: undefined,
  bookCoverId: undefined,
  name: '',
  copies: 1,
  categoryIds: [],
};

const BookEdit = () => {
  const { id } = useParams();
  const book = useGetBook(parseInt(id ?? ''));
  const activeAuthors = useGetActiveAuthors();
  const activeCategories = useGetActiveCategories();
  const bookUpdate = useUpdateBook();
  const deleteBook = useDeleteBook();
  const imageUploader = useImageUpload();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [formData, setFormData] = useState<formDataType>(formDataInitialValue);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBookUpdate = async () => {
    const bookId = parseInt(id ?? '');

    let data = { ...formData };

    if (formData.bookCover !== book.data?.bookCover) {
      if (formData.bookCover) {
        const response = await imageUploader.mutateAsync(formData.bookCover);

        if (response.status === 200) {
          data = { ...data, bookCover: response.data.secure_url };
          data = { ...data, bookCoverId: response.data.public_id };
        }
      }
    }

    bookUpdate.mutate({ ...data, id: bookId });
  };

  const handleBookDelete = () => {
    const bookId = parseInt(id ?? '');
    deleteBook.mutate({ id: bookId });
  };

  const bookCoverChangeHandler = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, bookCover: value }));
  };

  const selectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, authorId: parseInt(value) }));
  };

  const onCategoryCheckChange = (category: Category) => {
    const updatedList = categoryList.map((list) => {
      if (list.id === category.id) {
        // Replace the category with the specified id
        const updatedCategory = {
          ...list,
          status: !list.status,
        };
        return updatedCategory;
      }
      // Keep other categories unchanged
      return list;
    });

    setCategoryList(updatedList);
  };

  useEffect(() => {
    if (bookUpdate.isSuccess) {
      bookUpdate.reset();
      imageUploader.reset();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Book updated successfully.',
      });
      book.refetch();
    }

    if (bookUpdate.isError) {
      bookUpdate.reset();
      imageUploader.reset();
      toast({
        variant: 'destructive',
        title: 'Errro!',
        description: bookUpdate.error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookUpdate]);

  useEffect(() => {
    if (deleteBook.isSuccess) {
      deleteBook.reset();

      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Book deleted successfully.',
      });

      navigate('/books');
    }

    if (deleteBook.isError) {
      deleteBook.reset();

      toast({
        variant: 'destructive',
        title: 'Errro!',
        description: deleteBook.error.message,
      });
    }
  }, [deleteBook, navigate, toast]);

  useEffect(() => {
    if (book.isSuccess) {
      setFormData((prev) => ({
        ...prev,
        bookCover: book.data.bookCover,
        name: book.data.name,
        copies: book.data.copies,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.isSuccess]);

  const [initialSet, setInitialSet] = useState(true);

  useEffect(() => {
    if (
      activeCategories.isSuccess &&
      book.isSuccess &&
      categoryList.length !== 0 &&
      initialSet
    ) {
      const updatedList = categoryList.map((list) => {
        const isMatch = book.data.category.find((bookCategory) => {
          return list.id === bookCategory.id;
        });

        if (isMatch) {
          // If there's a match, update the status to false
          return { ...list, status: false };
        }

        return list;
      });
      setInitialSet(false);
      setCategoryList(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryList,
    activeCategories.data,
    activeCategories.isSuccess,
    book.isSuccess,
  ]);

  useEffect(() => {
    if (categoryList) {
      const idList = categoryList
        .filter((category) => category.status === false)
        .map((category) => {
          return category.id;
        });

      setFormData((prev) => ({ ...prev, categoryIds: idList }));
    }
  }, [categoryList]);

  useEffect(() => {
    if (activeCategories.isSuccess) {
      setCategoryList(activeCategories.data);
    }
  }, [activeCategories.data, activeCategories.isSuccess]);

  useEffect(() => {
    if (book.isSuccess && activeAuthors.isSuccess) {
      setFormData((prev) => ({ ...prev, authorId: book.data.author.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.isSuccess, activeAuthors.isSuccess]);

  if (book.isLoading)
    return (
      <div className='container mx-auto py-10 h-full flex flex-col items-center justify-center'>
        <BookUp2
          size={80}
          className='text-primary animate-bounce duration-1000'
        />
      </div>
    );

  if (!book.data)
    return (
      <div className='container mx-auto py-10 h-full flex flex-col items-center justify-center text-red-600'>
        <BookX size={80} />
        <h1 className='text-xl font-medium mt-3'>Cannot find Book</h1>
      </div>
    );
  return (
    <div className='container mx-auto py-10'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4 flex justify-center items-center'>
          <div className='flex flex-col w-fit items-center'>
            <BookCoverUploader
              className='h-[260px] w-[180px]'
              heightClass='h-[260px]'
              value={formData.bookCover}
              changeHandler={bookCoverChangeHandler}
            />

            {imageUploader.isLoading && (
              <Progress
                value={imageUploader.progress}
                className='my-2 h-3 bg-gray-300 '
              />
            )}
            <span className='mt-1 font-medium'>ISBN: 123456789</span>
          </div>
        </div>

        <div className='col-span-4'>
          <div>
            <Label htmlFor='bookName' className='text-sm text-gray-500'>
              Book Title:
            </Label>
            <Input
              placeholder='Book Title'
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
              }}
              name='bookName'
              className='mt-1 w-full'
            />
          </div>

          <div className='mt-2'>
            <Label htmlFor='author' className='text-sm text-gray-500'>
              Book Author:
            </Label>
            <Select
              name='author'
              value={formData.authorId?.toString()}
              onValueChange={selectChange}
            >
              <SelectTrigger className='w-full mt-1'>
                <SelectValue placeholder='Select Author' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {activeAuthors.isSuccess &&
                    activeAuthors.data.map((author) => {
                      return (
                        <SelectItem
                          value={author.id.toString()}
                          key={author.id}
                        >
                          {author.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='mt-2'>
            <Label htmlFor='copies' className='text-sm text-gray-500'>
              Copies:
            </Label>
            <Input
              name='copies'
              type='number'
              value={formData.copies}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (parseInt(e.target.value) >= 0) {
                  setFormData((prev) => ({
                    ...prev,
                    copies: parseInt(e.target.value),
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className='col-span-4'>
          <Label htmlFor='categories' className='text-sm text-gray-500'>
            Book Categories:
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='bg-white mt-1 w-full flex justify-between items-center border rounded-sm px-3 py-[9px] cursor-pointer border-gray-200'>
                <span className='text-sm'>Select Categories</span>
                <ChevronDown size={16} className='text-slate-500' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category) => {
                return (
                  <DropdownMenuCheckboxItem
                    checked={!category.status}
                    onCheckedChange={() => {
                      onCategoryCheckChange(category);
                    }}
                    key={category.id}
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='flex flex-row flex-wrap gap-1 mt-4'>
            {categoryList
              .filter((category) => category.status === false)
              .map((category) => {
                return (
                  <Badge
                    variant={'default'}
                    className='px-4 py-2'
                    key={category.id}
                  >
                    {category.name}
                  </Badge>
                );
              })}
          </div>
        </div>
      </div>

      <div className='w-fit flex flex-row gap-x-4 ml-auto mt-4'>
        <Button
          onClick={handleBookDelete}
          loading={deleteBook.isLoading}
          className='w-[180px] bg-red-600 hover:bg-red-600 hover:opacity-90'
        >
          Delete Book
        </Button>
        <Button
          onClick={handleBookUpdate}
          loading={bookUpdate.isLoading}
          className='w-[180px]'
        >
          Update Book
        </Button>
      </div>
    </div>
  );
};

export default BookEdit;
