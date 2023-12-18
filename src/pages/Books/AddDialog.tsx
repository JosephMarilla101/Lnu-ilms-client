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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type AddDialogProps = {
  children: React.ReactNode;
};

const FormSchema = z.object({
  isbn: z.string().min(1, 'ISBN # is required.'),
  authorId: z
    .number({ required_error: 'Book author is required.' })
    .min(1, 'Book author is required.'),
  name: z.string().min(1, 'Book title is required.'),
  copies: z
    .number({ invalid_type_error: 'Copies must be a valid number.' })
    .min(1, 'Copies must be a valid number.'),
});

type formDataType = {
  isbn: string;
  authorId: number | undefined;
  bookCover: string | undefined;
  bookCoverId: string | undefined;
  name: string;
  copies: number;
  categoryIds: number[];
};

const formDataInitialValue = {
  isbn: '',
  authorId: undefined,
  bookCover: undefined,
  bookCoverId: undefined,
  name: '',
  copies: 1,
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isbn: '',
      authorId: undefined,
      name: '',
      copies: 1,
    },
  });

  const [formData, setFormData] = useState<formDataType>(formDataInitialValue);

  const [hasSubmit, setHasSubmit] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let data2 = {
      ...data,
      bookCover: formData.bookCover,
      bookCoverId: formData.bookCoverId,
      categoryIds: formData.categoryIds,
    };
    if (formData.bookCover) {
      const response = await imageUploader.mutateAsync(formData.bookCover);

      if (response.status === 200) {
        data2 = { ...data2, bookCover: response.data.secure_url };
        data2 = { ...data2, bookCoverId: response.data.public_id };
      }
    }

    createBook.mutate(data2);
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
      setCategoryList(activeCategories.data ?? []);
      setOpen(false);
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Book added successfully.',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBook, imageUploader, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[580px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

                  <FormField
                    control={form.control}
                    name='isbn'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='ISBN #'
                            {...field}
                            className='mt-3 max-w-[170px]'
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-12 sm:col-span-8'>
                  <div className='grid grid-cols-12 gap-2 items-start'>
                    <Label
                      htmlFor='bookName'
                      className='text-sm col-span-3 mt-3 text-gray-600'
                    >
                      Title:
                    </Label>

                    <div className='col-span-9'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Enter Book Title'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-2 items-start'>
                    <Label
                      htmlFor='copies'
                      className='text-sm col-span-3 mt-3 text-gray-600'
                    >
                      Copies:
                    </Label>

                    <div className='col-span-9'>
                      <FormField
                        control={form.control}
                        name='copies'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Book Copies'
                                {...field}
                                type='number'
                                value={field.value || ''}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value, 10))
                                }
                              />
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-2 items-start'>
                    <Label
                      htmlFor='author'
                      className='text-sm col-span-3 mt-3 text-gray-600'
                    >
                      Author:
                    </Label>

                    <div className='col-span-9'>
                      <FormField
                        control={form.control}
                        name='authorId'
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              value={field.value?.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Select Author' />
                                  ) : (
                                    'Select Author'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='max-h-[200px] overflow-y-auto'>
                                <SelectGroup>
                                  {activeAuthors.isSuccess &&
                                    activeAuthors.data.map((author) => {
                                      return (
                                        <SelectItem
                                          value={author.id?.toString()}
                                          key={author.id}
                                        >
                                          {author.name}
                                        </SelectItem>
                                      );
                                    })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-2 items-start'>
                    <Label
                      htmlFor='category'
                      className='text-sm col-span-3 mt-3 text-gray-600'
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
                        <DropdownMenuContent className='w-56 max-h-[200px] overflow-y-auto'>
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

                      {formData.categoryIds.length < 1 && hasSubmit && (
                        <span className='text-sm text-[#ff0000]'>
                          Please select at least 1 book category.
                        </span>
                      )}
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
                onClick={() => setHasSubmit(true)}
                type='submit'
                className='w-full sm:w-[160px] mt-2'
                loading={createBook.isLoading || imageUploader.isLoading}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
