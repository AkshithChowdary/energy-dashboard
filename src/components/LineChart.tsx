import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
}



const LineChart: React.FC<LineChartProps> = ({ data }) => {

  return (
    <div className="chart-container">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'TimeStamp',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Pavg',
              },
              ticks: {          
                // forces step size to be 5 units
                stepSize: 2 // <----- This prop sets the stepSize
              },

            },
            
          },
        }}
      />
    </div>
  );
};

export default LineChart;