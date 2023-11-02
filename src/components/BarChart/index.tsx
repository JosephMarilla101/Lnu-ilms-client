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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const colorArray = [
//   'rgba(75, 192, 192, 0.5)',
//   'rgba(255, 99, 132, 0.5)',
//   'rgba(255, 206, 86, 0.5)',
//   'rgba(153, 102, 255, 0.5)',
//   'rgba(255, 159, 64, 0.5)',
//   'rgba(54, 162, 235, 0.5)',
//   'rgba(201, 203, 207, 0.5)',
//   'rgba(255, 140, 0, 0.5)',
//   'rgba(75, 192, 192, 0.5)',
//   'rgba(255, 99, 132, 0.5)',
// ];

type BarCharProps = {
  title?: string;
};

export default function BarChart({ title }: BarCharProps) {
  const topCategories = [
    { category: 'Category A', count: 18 },
    { category: 'Category B', count: 17 },
    { category: 'Category C', count: 14 },
    { category: 'Category D', count: 12 },
    { category: 'Category E', count: 10 },
    { category: 'Category F', count: 9 },
    { category: 'Category G', count: 7 },
    { category: 'Category H', count: 4 },
    { category: 'Category I', count: 3 },
    { category: 'Category J', count: 2 },
  ];

  // Extract the labels and data for the chart
  const labels = topCategories.map((category) => category.category);
  const data = topCategories.map((category) => category.count);

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Dataset 1',
  //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       },
  //       {
  //         label: 'Dataset 2',
  //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       },
  //     ],
  //   };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Borrow count',
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
