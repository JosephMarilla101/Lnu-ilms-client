// import {
//   useTopCategories,
//   useUserBorrowCount,
//   useUserCountData,
// } from '@/hooks/useDashboard';
// import BarChart from '@/components/BarChart';
// import PieChart from '@/components/PieChart';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MyAreaChart from '@/components/MyAreaChart';
import MyBarChart from '@/components/MyBarChart';
// import RangeDatePicker from '@/components/RangeDatePicker';
import { useBorrowedBookByMonth, useTopCategories } from '@/hooks/useDashboard';
import { generateYearStrings } from '@/lib/utils';
import { useState } from 'react';

export default function Statistics() {
  const borrowedBookByMonth = useBorrowedBookByMonth();
  const topCategories = useTopCategories();
  // const userBorrowCount = useUserBorrowCount();
  // const userCountData = useUserCountData();
  const [chartFilters, setChartFilters] = useState({
    categoryYear: new Date().getFullYear().toString(),
    requestYear: new Date().getFullYear().toString(),
  });

  const years = generateYearStrings();

  const AreaChartHeader = (): React.ReactNode => {
    return (
      <h2 className='relative mb-2'>
        Book Request Count{' '}
        <div className='absolute -top-3 right-2'>
          <Select
            value={chartFilters.requestYear}
            onValueChange={(value) => {
              setChartFilters((prev) => ({ ...prev, requestYear: value }));
            }}
          >
            <SelectTrigger className='mt-1'>
              <SelectValue placeholder='Select Author' />
            </SelectTrigger>
            <SelectContent className='max-h-[200px]'>
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem value={year} key={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </h2>
    );
  };

  const BarChartHeader = (): React.ReactNode => {
    return (
      <h2 className='relative mb-2'>
        Top Book Category
        <div className='absolute -top-3 right-2'>
          <Select
            value={chartFilters.categoryYear}
            onValueChange={(value) => {
              setChartFilters((prev) => ({ ...prev, categoryYear: value }));
            }}
          >
            <SelectTrigger className='mt-1'>
              <SelectValue placeholder='Select Author' />
            </SelectTrigger>
            <SelectContent className='max-h-[200px]'>
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem value={year} key={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </h2>
    );
  };

  return (
    <div className='mx-2 md:mx-4 py-6 '>
      {/* <div className='absolute z-10'>
        <RangeDatePicker />
      </div> */}
      <div className='w-full flex'>
        <MyAreaChart
          classname='h-60 w-[60%]'
          data={borrowedBookByMonth.data}
          header={<AreaChartHeader />}
        />
        <MyBarChart
          classname='h-60 w-[40%]'
          data={topCategories.data}
          header={<BarChartHeader />}
        />
      </div>

      {/* <div className='max-w-[60%] mx-auto mb-8'>
        <BarChart
          title='Top Book Category'
          label='Borrow Count'
          dataset={topCategories.data}
        />
      </div>

      <div className='w-full flex items-center flex-col md:flex-row justify-evenly gap-6'>
        <div className='max-w-[80%]'>
          <PieChart
            title='User Borrow Count'
            label='total'
            dataset={userBorrowCount.data ?? []}
          />
        </div>

        <div className='max-w-[80%]'>
          <PieChart
            title='User Count'
            label='total'
            dataset={userCountData.data ?? []}
          />
        </div>
      </div> */}
    </div>
  );
}
