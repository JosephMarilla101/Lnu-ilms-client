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
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useGetActiveCategories, Category } from '@/hooks/useCategory';
import { useGetActiveAuthors } from '@/hooks/useAuthor';
import { ChevronDown } from 'lucide-react';
import BookCoverUploader from '@/components/BookCoverUploader';

type AddDialogProps = {
  children: React.ReactNode;
};

type formDataType = {
  author: string | undefined;
  bookCover: string | undefined;
};

const AddDialog: React.FC<AddDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const activeCategories = useGetActiveCategories();
  const activeAuthors = useGetActiveAuthors();
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [formData, setFormData] = useState<formDataType>({
    author: undefined,
    bookCover: undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const selectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, author: value }));
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
    if (activeCategories.isSuccess) {
      setCategoryList(activeCategories.data);
    }
  }, [activeCategories.data, activeCategories.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[550px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new book</DialogTitle>
            <DialogDescription>
              Add new book here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='mb-3 mt-4'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 sm:col-span-4 flex flex-col'>
                {/* <div
                  className='h-[200px]'
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1639690283395-b62444cf9a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div> */}
                <BookCoverUploader
                  className='h-[200px] w-[160px]'
                  value={formData.bookCover}
                  changeHandler={bookCoverChangeHandler}
                />
                <span className='text-center font-bold mt-2'>-- ISBN --</span>
                <span className='break-all text-center'>3938765120947</span>
              </div>

              <div className='col-span-12 sm:col-span-8'>
                <div className='grid grid-cols-12 gap-2 items-center'>
                  <Label
                    htmlFor='author'
                    className='text-sm col-span-3 text-gray-600'
                  >
                    Author:
                  </Label>

                  <div className='col-span-9'>
                    <Select
                      name='author'
                      value={formData.author}
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

                <div className='grid grid-cols-12 gap-2 mt-4 items-center'>
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
                  <div className='col-span-3'></div>
                  <div className='col-span-9 flex flex-row flex-wrap gap-1'>
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

          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
