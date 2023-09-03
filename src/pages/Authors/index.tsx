import { columns } from './TableColumns';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddDialog from './AddDialog';
import { useGetAllAuthors } from '@/hooks/useAuthor';

export default function DemoPage() {
  const authors = useGetAllAuthors();

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-end mb-2'>
        <AddDialog>
          <Button variant={'default'} className='ml-auto w-[160px]'>
            <Plus className='mr-2' /> Add Author
          </Button>
        </AddDialog>
      </div>
      <DataTable
        columns={columns}
        data={authors.data ?? []}
        loading={authors.isLoading}
        searchable='name'
      />
    </div>
  );
}
