import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddDialog from './AddDialog';
import { useGetAllAuthors } from '@/hooks/useAuthor';
import useTableDialog from '@/context/useTableDialog';
import DeleteDialog from './DeleteDialog';
import UpdateDialog from './UpdateDialog';

export default function Authors() {
  const authors = useGetAllAuthors();
  const columns = ColumnsFunction();
  const { action } = useTableDialog();

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
        searchableText='Author Name'
      />

      {/* Dialogs */}
      {action === 'delete' && <DeleteDialog />}
      {action === 'update' && <UpdateDialog />}
    </div>
  );
}
