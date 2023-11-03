import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartDataType } from '@/hooks/useDashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarCharProps = {
  title?: string;
  label?: string;
  dataset?: ChartDataType;
};

export default function BarChart({ title, label, dataset }: BarCharProps) {
  const labels = dataset?.map((dataset) => dataset.name);
  const data = dataset?.map((dataset) => dataset.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: label ?? 'Label',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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

  return <Bar options={options} data={chartData} />;
}
