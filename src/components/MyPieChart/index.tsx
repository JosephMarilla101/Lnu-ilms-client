import { ReactNode } from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ChartDataType } from '@/hooks/useDashboard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
  const values = data?.map((item) => item.count);

  const sum = values?.reduce((acc, value) => {
    return acc + value;
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: // index,
  {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    // index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent === 0) return null;

    return (
      <text
        x={x}
        y={y}
        fill='white'
        // textAnchor={x > cx ? 'start' : 'end'}
        // dominantBaseline='central'
        textAnchor='middle' // Center the text horizontally
        dominantBaseline='middle' // Center the text vertically
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={cn('h-96 w-full', classname)}>
      {header && (
        <div className='text-center font-semibold text-gray-500'>{header}</div>
      )}

      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          {sum === 0 || !sum ? (
            <>
              <Pie
                dataKey='count'
                isAnimationActive={false}
                data={[{ name: 'No available data', count: 1 }]}
                outerRadius={120}
                fill='gray'
                stroke='gray'
                labelLine={false}
              ></Pie>
              <Legend
                content={() => (
                  <div className='w-[320px] grid grid-cols-12 gap-4 pl-8 mx-auto text-sm'>
                    {data?.map((entry, index) => (
                      <div
                        className='col-span-6 grid grid-cols-12 items-center'
                        key={index}
                      >
                        <div
                          className='rounded-full col-span-2 h-3 w-3'
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <div className='col-span-7'>{entry.name}:</div>
                        <div className='col-span-3'>{entry.count}</div>
                      </div>
                    ))}
                  </div>
                )}
              />
            </>
          ) : (
            <>
              <Pie
                dataKey='count'
                isAnimationActive={true}
                outerRadius={120}
                fill='#8884d8'
                labelLine={false}
                label={renderCustomizedLabel}
                data={data?.map((entry) => ({
                  ...entry,
                  count: entry.count,
                }))}
              >
                {data?.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                content={({ payload }) => (
                  <div className='w-[320px] grid grid-cols-12 gap-4 pl-8 mx-auto text-sm'>
                    {payload?.map((entry, index) => (
                      <div
                        className='col-span-6 grid grid-cols-12 items-center'
                        key={index}
                      >
                        <div
                          className='rounded-full col-span-2 h-3 w-3'
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <div className='col-span-7'>{entry.value}:</div>
                        <div className='col-span-3'>{entry.payload?.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Tooltip />
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
