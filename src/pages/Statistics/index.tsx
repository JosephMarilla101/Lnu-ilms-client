import {
  useTopCategories,
  useUserBorrowCount,
  useUserCountData,
} from '@/hooks/useDashboard';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';

export default function Statistics() {
  const topCategories = useTopCategories();
  const userBorrowCount = useUserBorrowCount();
  const userCountData = useUserCountData();

  return (
    <div className='mx-2 md:mx-4 py-6 '>
      <div className='max-w-[60%] mx-auto mb-8'>
        <BarChart
          title='Top Book Category'
          label='Borrow Count'
          dataset={topCategories.data}
        />
      </div>

      <div className='w-full flex items-center flex-col md:flex-row justify-evenly gap-6'>
        <div className='max-w-[80%]'>
          <PieChart
            title='Weekly User Borrowed Count'
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
      </div>
    </div>
  );
}
