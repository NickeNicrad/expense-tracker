import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({title, datasets=[], labels=[]}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: title ? true : false,
                text: title,
            },
        },
    };

    const data = {
        labels,
        datasets
        // datasets: [
        //     {
        //         label: 'RWF',
        //         data: [12, 19, 3, 5, 2, 3],
        //         borderColor: 'rgb(255, 99, 132)',
        //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //         borderWidth: 1
        //     },
        // ],
    };

    return <Line options={options} data={data} />;
}