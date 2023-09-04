import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddDialog from './AddDialog';

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
    </div>
  );
}
