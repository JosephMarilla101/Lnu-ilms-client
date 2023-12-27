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
import { useGetAllIssuedBooks } from '@/hooks/useBook';
import { useEffect, useState } from 'react';
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
    searchable: 'borrowerId',
    searchableText: 'Borrower ID',
  },
];

type IssuedBooksProps = {
  isReturn: boolean;
};

const IssuedBooks = ({ isReturn }: IssuedBooksProps) => {
  const [selected, setSelected] = useState(searchSelection[0].searchable);
  const [range, setRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({
    startDate: minDate,
    endDate: new Date(),
  });

  const issuedBooks = useGetAllIssuedBooks({
    isReturn,
    startDate: range.startDate,
    endDate: range.endDate,
  });

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
    issuedBooks.refetch();
  }, [range, isReturn]);

  return (
    <div className='container mx-auto py-10 relative'>
      <div className='hidden sm:flex absolute left-[250px] top-[55px]'>
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
        data={issuedBooks.data ?? []}
        loading={issuedBooks.isLoading}
        searchable={selected}
        searchableText={getSearchableText(selected)}
      />
    </div>
  );
};

export default IssuedBooks;
