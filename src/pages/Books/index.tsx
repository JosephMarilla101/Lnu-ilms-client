import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddDialog from './AddDialog';
import BookList from './BookList';

export default function Books() {
  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-end mb-2'>
        <AddDialog>
          <Button variant={'default'} className='ml-auto w-[160px]'>
            <Plus className='mr-2' /> Add Book
          </Button>
        </AddDialog>
      </div>

      <div className='mt-8 flex flex-row gap-3 gap-x-6 flex-wrap justify-items-start'>
        <BookList />
      </div>
    </div>
  );
}
