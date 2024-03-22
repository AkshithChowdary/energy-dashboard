// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';

// Chart.register(...registerables);

// interface LineChartProps {
//   data: {
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor?: string;
//       borderColor?: string;
//     }[];
//   };
// }



// const LineChart: React.FC<LineChartProps> = ({ data }) => {

//   return (
//     <div className="chart-container">
//       <Line
//         data={data}
//         options={{
//           responsive: true,
//           maintainAspectRatio: true,
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: 'TimeStamp',
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Pavg',
//               },
//               ticks: {          
//                 // forces step size to be 5 units
//                 stepSize: 2 // <----- This prop sets the stepSize
//               },

//             },
            
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default LineChart;

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
      yAxisID?: string; // Add yAxisID property to specify which y-axis the dataset belongs to
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
                
                stepSize: 10 // Set step size for the main y-axis (assuming the other datasets are in the 100s scale)
              },
            },
            y1: { // Define a separate y-axis for the tariff data
              position: 'right', // Position the y-axis on the right side
              title: {
                display: true,
                text: 'Tariff',
              },
              ticks: {
                 // Set the minimum value
                 // Set the maximum value
                stepSize: 0.002 // Set step size for the tariff data
              },
              grid: {
                drawOnChartArea: false // Do not draw gridlines for this y-axis
              }
            }
          },
        }}
      />
    </div>
  );
};

export default LineChart;
