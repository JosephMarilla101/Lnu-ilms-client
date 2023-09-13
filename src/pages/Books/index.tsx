import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddDialog from './AddDialog';
import RequestDialog from './RequestDialog';
import BookList from './BookList';
import { useAuthenticateUser } from '@/hooks/useAuth';
import useTableDialog from '@/context/useTableDialog';
import { lazy } from 'react';

const BookRequest = lazy(() => import('./BookRequest'));

export default function Books() {
  const auth = useAuthenticateUser();
  const { action } = useTableDialog();

  return (
    <div className='container mx-auto py-10'>
      {(auth.data?.role === 'ADMIN' || auth.data?.role === 'LIBRARIAN') && (
        <div className='flex justify-end mb-8'>
          <AddDialog>
            <Button variant={'default'} className='ml-auto w-[160px]'>
              <Plus className='mr-2' /> Add Book
            </Button>
          </AddDialog>
        </div>
      )}

      {auth.data?.role === 'STUDENT' && <BookRequest />}

      <div className='flex flex-row gap-3 gap-x-6 flex-wrap justify-items-start'>
        <BookList />
      </div>

      {/* Dialogs */}
      {action === 'update' && <RequestDialog />}
    </div>
  );
}
