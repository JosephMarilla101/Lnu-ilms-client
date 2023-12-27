import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import {
  useGetALLRequestedBooks,
  type RequestStatusType,
} from '@/hooks/useBookRequest';
import { useEffect, useState } from 'react';
import useBookRequest from '@/context/useBookRequest';
import ApproveDialog from '@/components/RequestApproveDialog';
import RangeDatePicker from '@/components/RangeDatePicker';
import { minDate } from '@/lib/data';

const searchSelection = [
  {
    searchable: 'isbn',
    searchableText: 'ISBN',
  },
  {
    searchable: 'bookName',
    searchableText: 'Book Name',
  },
  {
    searchable: 'studentId',
    searchableText: 'Requestor ID',
  },
];

type BookRequestProps = {
  status: RequestStatusType | 'CANCELLED';
};

const BookRequest = ({ status }: BookRequestProps) => {
  const [selected, setSelected] = useState(searchSelection[0].searchable);
  const [range, setRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({
    startDate: minDate,
    endDate: new Date(),
  });

  const requestedBooks = useGetALLRequestedBooks({
    status,
    startDate: range.startDate,
    endDate: range.endDate,
  });

  const { action } = useBookRequest();
  const columns = ColumnsFunction();

  const selectChange = (value: string) => {
    setSelected(value);
  };

  function getSearchableText(searchable: string) {
    for (const item of searchSelection) {
      if (item.searchable === searchable) {
        return item.searchableText;
      }
    }
    // Return a default value or handle the case when no match is found.
    return '';
  }

  useEffect(() => {
    requestedBooks.refetch();
  }, [range]);

  return (
    <div className='container mx-auto py-10 relative'>
      <div className='hidden sm:flex absolute left-[250px] top-[55px] text-gray-500'>
        <Select name='status' value={selected} onValueChange={selectChange}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Author status' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {searchSelection.map((value, i) => {
                return (
                  <SelectItem value={value.searchable} key={i}>
                    <div className='flex flex-row'>{value.searchableText}</div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className='ml-4'>
          <RangeDatePicker onRangeChange={setRange} />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={requestedBooks.data ?? []}
        loading={requestedBooks.isLoading}
        searchable={selected}
        searchableText={getSearchableText(selected)}
      />

      {/* Dialogs */}
      {action === 'FORPICKUP' && <ApproveDialog />}
    </div>
  );
};

export default BookRequest;
