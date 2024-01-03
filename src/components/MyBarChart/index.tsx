import { ReactNode } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ChartDataType } from '@/hooks/useDashboard';

type MyBarChartProps = {
  data?: ChartDataType;
  header?: ReactNode;
  classname?: string;
  barColor?: string;
};

export default function MyBarChart({
  data,
  header,
  classname,
  barColor = '#D6A73D',
}: MyBarChartProps) {
  return (
    <div className={cn('h-96 w-full', classname)}>
      {header && (
        <div className='text-center font-semibold text-gray-500'>{header}</div>
      )}

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={30}
            dataKey='count'
            fill={barColor}
            activeBar={<Rectangle fill={barColor} stroke={barColor} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
