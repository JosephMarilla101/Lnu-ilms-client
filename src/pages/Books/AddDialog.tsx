import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useGetActiveCategories, Category } from '@/hooks/useCategory';
import { useGetActiveAuthors } from '@/hooks/useAuthor';
import { useCreateBook } from '@/hooks/useBook';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ChevronDown } from 'lucide-react';
import BookCoverUploader from '@/components/BookCoverUploader';
import { Input } from '@/components/ui/input';

type AddDialogProps = {
  children: React.ReactNode;
};

type formDataType = {
  authorId: number | undefined;
  bookCover: string | undefined;
  bookCoverId: string | undefined;
  name: string;
  stock: number;
  categoryIds: number[];
};

const formDataInitialValue = {
  authorId: undefined,
  bookCover: undefined,
  bookCoverId: undefined,
  name: '',
  stock: 1,
  categoryIds: [],
};

const AddDialog: React.FC<AddDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const activeCategories = useGetActiveCategories();
  const activeAuthors = useGetActiveAuthors();
  const imageUploader = useImageUpload();
  const createBook = useCreateBook();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState<formDataType>(formDataInitialValue);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = { ...formData };

    if (formData.bookCover) {
      const response = await imageUploader.mutateAsync(formData.bookCover);

      if (response.status === 200) {
        data = { ...data, bookCover: response.data.secure_url };
        data = { ...data, bookCoverId: response.data.public_id };
      }
    }

    createBook.mutate(data);
  };

  const selectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, authorId: parseInt(value) }));
  };

  const bookCoverChangeHandler = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, bookCover: value }));
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
    if (createBook.isSuccess) {
      // reset states
      setFormData(formDataInitialValue);
      imageUploader.reset();
      createBook.reset();
      setCategoryList([]);
      setOpen(false);
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Book added successfully.',
      });
    }
  }, [createBook, imageUploader, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[580px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new book</DialogTitle>
            <DialogDescription>
              Add new book here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='mb-3 mt-4'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 sm:col-span-4 items-center flex flex-col'>
                <BookCoverUploader
                  className='h-[200px] w-[170px]'
                  value={formData.bookCover}
                  changeHandler={bookCoverChangeHandler}
                />

                {imageUploader.isLoading && (
                  <Progress
                    value={imageUploader.progress}
                    className='mt-2 h-3 bg-gray-300 '
                  />
                )}

                <Input
                  placeholder='Book name'
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  className='mt-3 max-w-[170px]'
                />
              </div>

              <div className='col-span-12 sm:col-span-8'>
                <div className='grid grid-cols-12 gap-2 items-center'>
                  <Label
                    htmlFor='stock'
                    className='text-sm col-span-3 text-gray-600'
                  >
                    Stocks:
                  </Label>

                  <div className='col-span-9'>
                    <Input
                      type='number'
                      value={formData.stock}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (parseInt(e.target.value) >= 0) {
                          setFormData((prev) => ({
                            ...prev,
                            stock: parseInt(e.target.value),
                          }));
                        }
                      }}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-2 items-center'>
                  <Label
                    htmlFor='author'
                    className='text-sm col-span-3 text-gray-600'
                  >
                    Author:
                  </Label>

                  <div className='col-span-9'>
                    <Select
                      name='author'
                      value={formData.authorId?.toString()}
                      onValueChange={selectChange}
                    >
                      <SelectTrigger className='w-full'>
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
                </div>

                <div className='grid grid-cols-12 gap-2 mt-2 items-center'>
                  <Label
                    htmlFor='category'
                    className='text-sm col-span-3 text-gray-600'
                  >
                    Category:
                  </Label>

                  <div className='col-span-9'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className='w-full flex justify-between items-center border rounded-sm px-3 py-[9px] cursor-pointer border-gray-200'>
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
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-4 items-center'>
                  <div className='col-span-12 flex flex-row flex-wrap gap-1'>
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
            </div>
          </div>

          {createBook.isError && (
            <p className='text-center italic text-red-600'>
              {createBook.error?.message}
            </p>
          )}

          <DialogFooter>
            <Button
              type='submit'
              className='w-full sm:w-[160px] mt-2'
              loading={createBook.isLoading || imageUploader.isLoading}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
