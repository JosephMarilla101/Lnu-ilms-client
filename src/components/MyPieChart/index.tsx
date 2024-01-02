import { ReactNode } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { ChartDataType } from '@/hooks/useDashboard';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

type MyBarChartProps = {
  data?: ChartDataType;
  header?: ReactNode;
  classname?: string;
};

export default function MyBarChart({
  data,
  header,
  classname,
}: MyBarChartProps) {
  return (
    <div className={cn('h-96 w-full', classname)}>
      {header && (
        <div className='text-center font-semibold text-gray-500'>{header}</div>
      )}

      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey='value'
            isAnimationActive={false}
            data={data01}
            // cx='50%'
            // cy='50%'
            outerRadius={120}
            fill='#8884d8'
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
