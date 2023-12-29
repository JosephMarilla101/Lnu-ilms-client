import { ReactNode } from 'react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ChartDataType } from '@/hooks/useDashboard';

type MyAreaChartProps = {
  data?: ChartDataType;
  header?: ReactNode;
  classname?: string;
};

export default function MyAreaChart({
  data,
  header,
  classname,
}: MyAreaChartProps) {
  const formatMonth = (month: string) => month.slice(0, 3);

  return (
    <div className={cn('h-96 w-full', classname)}>
      {header && (
        <div className='text-center font-semibold text-gray-500'>{header}</div>
      )}

      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={data}
          syncId='anyId'
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' tickFormatter={formatMonth} />
          <YAxis />
          <Tooltip />
          <Area type='monotoneX' dataKey='count' stroke='#82ca9d' fill='blue' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
