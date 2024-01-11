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
import MyPieChart from '@/components/MyPieChart';
import RangeDatePicker from '@/components/RangeDatePicker';
import {
  useBorrowedBookByMonth,
  useTopCategories,
  useUserBorrowCount,
  useUserCountData,
} from '@/hooks/useDashboard';
import { generateYearStrings } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { minDate } from '@/lib/data';

export default function Statistics() {
  const [chartFilters, setChartFilters] = useState({
    categoryYear: new Date().getFullYear().toString(),
    requestYear: new Date().getFullYear().toString(),
  });
  const [range, setRange] = useState<{
    startDate?: Date;
    endDate?: Date;
    key?: string;
  }>({
    startDate: minDate,
    endDate: new Date(),
    key: 'selection',
  });

  const borrowedBookByMonth = useBorrowedBookByMonth(chartFilters.requestYear);
  const topCategories = useTopCategories(chartFilters.categoryYear);

  const userBorrowCount = useUserBorrowCount({
    startDate: range.startDate,
    endDate: range.endDate,
  });
  const userCountData = useUserCountData();

  const years = generateYearStrings();

  useEffect(() => {
    borrowedBookByMonth.refetch();
  }, [chartFilters.requestYear]);

  useEffect(() => {
    topCategories.refetch();
  }, [chartFilters.categoryYear]);

  useEffect(() => {
    userBorrowCount.refetch();
  }, [range]);

  const AreaChartHeader = (): React.ReactNode => {
    return (
      <h2 className='relative mb-2 left-2'>
        Book Request
        <div className='absolute -top-3 right-2'>
          <Select
            value={chartFilters.requestYear}
            onValueChange={(value) => {
              setChartFilters((prev) => ({ ...prev, requestYear: value }));
            }}
          >
            <SelectTrigger className='mt-1'>
              <SelectValue placeholder='Select Year' />
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
        Book Borrowed by Category
        <div className='absolute -top-2 right-2'>
          <Select
            value={chartFilters.categoryYear}
            onValueChange={(value) => {
              setChartFilters((prev) => ({ ...prev, categoryYear: value }));
            }}
          >
            <SelectTrigger className='mt-1'>
              <SelectValue placeholder='Select Year' />
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

  const UserBorrowCountHeader = (): React.ReactNode => {
    return (
      <h2 className='relative mb-2 pr-16'>
        Users Borrowed Books
        <div className='absolute -top-3 right-[260px]'></div>
      </h2>
    );
  };

  const PieChartHeader = (): React.ReactNode => {
    return <h2 className='relative mb-2 top-10'>Total User Count</h2>;
  };

  return (
    <div className='mx-2 md:mx-4 py-6 '>
      <div className='w-full flex flex-col md:flex-row justify-center items-center'>
        <MyAreaChart
          classname='h-64 w-[95%] md:w-[60%]'
          data={borrowedBookByMonth.data}
          header={<AreaChartHeader />}
          yAxisText='Request count'
          xAxisText={`Book Request for the year of ${chartFilters.requestYear}`}
        />
  
        <MyPieChart
          classname='h-60 w-[95%] md:w-[40%] mt-[70px] md:mt-0'
          data={borrowedBookByMonth.data}
          legenClass='mt-4'
          header={"Book Request"}
        />
      </div>

      <div className='w-full flex flex-col md:flex-row mt-32'>
        <MyBarChart
          classname='h-60 w-[95%] md:w-[60%] mt-10 md:mt-0'
          data={topCategories.data}
          header={<BarChartHeader />}
          yAxisText={`Borrow count`}
          xAxisText={`Book Categories`}
        />

        <MyPieChart
          classname='h-60 w-[95%] md:w-[40%] mt-[70px] md:mt-0'
          data={topCategories.data}
          legenClass='mt-4'
          header={"Book Borrowed by Category"}
        />
      </div>

      <div className='w-full flex flex-col md:flex-row'>
        <div className='h-60 w-[95%] md:w-[60%] relative'>
          <div className='absolute z-10 right-2 top-[85px]'>
            <RangeDatePicker onRangeChange={setRange} />
          </div>
          <MyBarChart
            classname='h-full w-full mt-24'
            data={userBorrowCount.data}
            header={<UserBorrowCountHeader />}
            yAxisText={`Borrow Count`}
            xAxisText={`User Type`}
          />
        </div>

        <MyPieChart
          classname='h-60 w-[95%] md:w-[40%] mt-[130px] md:mt-24'
          data={userBorrowCount.data}
          legenClass='mt-4'
          header={"Users Borrowed Books"}
        />
      </div>

      <div className='flex justify-center items-center'>
        <MyPieChart
          classname='h-80 w-[95%] md:w-[40%] mt-[130px] md:mt-16'
          data={userCountData.data}
          header={<PieChartHeader />}
        />
      </div>
    </div>
  );
}
