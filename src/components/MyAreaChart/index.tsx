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
  yAxisText?: string;
  xAxisText?: string;
};

export default function MyAreaChart({
  data,
  header,
  classname,
  yAxisText,
  xAxisText,
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
            top: 5,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            label={{ value: xAxisText, dy: 25 }}
            tickFormatter={formatMonth}
          />
          <YAxis label={{ value: yAxisText, angle: -90 }} />
          <Tooltip />
          <Area type='monotoneX' dataKey='count' stroke='blue' fill='blue' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
