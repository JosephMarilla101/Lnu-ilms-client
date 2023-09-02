import { useEffect, useState } from 'react';
import { Author, columns } from './TableColumns';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function DemoPage() {
  const [data, setData] = useState<Author[]>([]);

  function getData() {
    setData([
      {
        id: '1',
        amount: 100,
        status: 'pending',
        author: 'J.K Rowling',
      },
      {
        id: '2',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '3',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '4',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '5',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '6',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '7',
        amount: 20,
        status: 'pending',
        author: 'Jake Rosales',
      },
      {
        id: '8',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '9',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '10',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '11',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '12',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '13',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '14',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
      {
        id: '15',
        amount: 100,
        status: 'pending',
        author: 'Joseph Marilla',
      },
    ]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-end'>
        <Button variant={'default'} className='ml-auto w-[160px]'>
          <Plus className='mr-2' /> Add Author
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchable='author' />
    </div>
  );
}
