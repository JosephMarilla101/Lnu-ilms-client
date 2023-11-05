import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartDataType } from '@/hooks/useDashboard';

ChartJS.register(ArcElement, Tooltip, Legend);

type BarCharProps = {
  title?: string;
  label?: string;
  dataset?: ChartDataType;
};

export default function PieChart({ title, label, dataset }: BarCharProps) {
  const labels = dataset?.map((dataset) => dataset.name);
  const data = dataset?.map((dataset) => dataset.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label ?? 'Label',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(128, 0, 128, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(128, 0, 128, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title ?? 'Bar Chart',
      },
    },
  };

  return <Pie options={options} data={chartData} />;
}
