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
import { useGetAllGraduates } from '@/hooks/useUser';
import { useState } from 'react';
import useTableDialog from '@/context/useTableDialog';
import ApproveDialog from './ApproveDialog';
import DeleteDialog from './DeleteDialog';

const searchSelection = [
  {
    searchable: 'studentId',
    searchableText: 'Student ID',
  },
  {
    searchable: 'fullname',
    searchableText: 'Full Name',
  },
  {
    searchable: 'email',
    searchableText: 'Email',
  },
];

const IssuedBooks = () => {
  const [selected, setSelected] = useState(searchSelection[0].searchable);
  const graduates = useGetAllGraduates();
  const { action } = useTableDialog();
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
  return (
    <div className='container mx-auto py-10 relative'>
      <div className='hidden sm:block max-w-[200px] absolute left-[250px] top-[55px]'>
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
      </div>
      <DataTable
        columns={columns}
        data={graduates.data ?? []}
        loading={graduates.isLoading}
        searchable={selected}
        searchableText={getSearchableText(selected)}
      />

      {/* Dialogs */}
      {action === 'update' && <ApproveDialog />}
      {action === 'delete' && <DeleteDialog />}
    </div>
  );
};

export default IssuedBooks;
