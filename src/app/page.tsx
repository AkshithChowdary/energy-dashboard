'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import Chart from 'chart.js/auto'; 
import FooterDown from '@/components/FooterDown';
import LineChart from '@/components/LineChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import ConnectedCircles from '@/components/ConnectedCircles';

// interface DeviceState {
//   deviceId: number;
//   realStates: number[];
//   forecastedStates: number[];
// }

// interface DeviceChartProps {
//   deviceStates: DeviceState[];
// }

// const DeviceChart: React.FC<DeviceChartProps> = ({ deviceStates }) => {
//   const chartRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const parentWidth = chartRef.current.clientWidth;
//       const height = 200;
//       const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//       const width = parentWidth - margin.left - margin.right;

//       const svg = d3
//         .select(chartRef.current)
//         .append('svg')
//         .attr('width', parentWidth)
//         .attr('height', height);

//       const xScale = d3.scaleLinear().domain([0, 24]).range([margin.left, parentWidth - margin.right]);
//       const yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

//       const line = d3.line()
//         .x((d, i) => xScale(i))
//         .y((d) => yScale(d))
//         .curve(d3.curveStep);

//       deviceStates.forEach((device, i) => {
//         const realData = device.realStates.map((state) => state === 1 ? 1 : 0);
//         const forecastedData = device.forecastedStates.map((state) => state === 1 ? 1 : 0);

//         svg.append('path')
//           .datum(realData)
//           .attr('fill', 'none')
//           .attr('stroke', 'red')
//           .attr('stroke-width', 2)
//           .attr('d', line);

//         svg.append('path')
//           .datum(forecastedData)
//           .attr('fill', 'none')
//           .attr('stroke', 'green')
//           .attr('stroke-width', 2)
//           .attr('d', line);
//       });

//       svg.append('g')
//         .attr('transform', `translate(0,${height - margin.bottom})`)
//         .call(d3.axisBottom(xScale).ticks(24).tickFormat((d) => `${d}:00`));

//       svg.append('g')
//         .attr('transform', `translate(${margin.left},0)`)
//         .call(d3.axisLeft(yScale).ticks(2).tickFormat((d) => (d === 1 ? 'On' : 'Off')));
//     }
//   }, [deviceStates]);

//   return (
//     <div ref={chartRef} style={{ width: '100%' }}></div>
//   );
// };


export default function Home() {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);


  const [fileUploaded, setFileUploaded] = useState(false);
  const [optimizationRunning, setOptimizationRunning] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showFullScreenChart, setShowFullScreenChart] = useState(true);

  const handleFileUpload = () => {
    setFileUploaded(true);
    setOptimizationRunning(true);

    // Simulate optimization process with a 5-second timer
    setTimeout(() => {
      setOptimizationRunning(false);
      setEmailSent(true);
    }, 5000);
  };

  const minimizeChart = () => {
    setShowFullScreenChart(false);
  };






  // useEffect(() => {
  //   const canvas = chartCanvasRef.current;
  //   if (canvas) {
  //     renderChartOnCanvas(canvas);
  //   }
  // }, []);

  // const [devices, setDevices] = useState<Device[]>([]);

  // useEffect(() => {
  //   // Fetch device data from an API or use dummy data
  //   const dummyData: Device[] = [
  //     { id: 1, name: 'Device 1', currentStatus: true, suggestedStatus: false },
  //     { id: 2, name: 'Device 2', currentStatus: false, suggestedStatus: true },
  //   ];
  //   setDevices(dummyData);
  // }, []);

  // const data = {
  //   labels: devices.map((device) => device.name),
  //   datasets: [
  //     {
  //       label: 'Current Status',
  //       data: devices.map((device) => (device.currentStatus ? 1 : 0)),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red
  //     },
  //     {
  //       label: 'Suggested Status',
  //       data: devices.map((device) => (device.suggestedStatus ? 1 : 0)),
  //       backgroundColor: 'rgba(75, 192, 192, 0.5)', // Green
  //     },
  //   ],
  // };

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       max: 1,
  //       ticks: {
  //         stepSize: 1,
  //         callback: (value: number) => (value === 1 ? 'On' : 'Off'),
  //       },
  //       stacked: true,
  //       type: 'linear' as const,
  //     },
  //     x: {
  //       stacked: true,
  //     },
  //   },
  // };

  const chartData = {
    labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', ''],
    datasets: [
      {
        label: 'Real time Comsuption',
        data: [10, 0.30, 7, 0.0245, 0.89, 100, 20, 80, 90, 76],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Forecasted',
        data: [20, 40, 40, 50, 60, 70, 67, 68, 87, 54, 56, 45, 34, 23, 87, 2, 2, 2, 4, 5],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'Optimized',
        data: [10, 30, 50, 60, 70, 80, 45, 67, 56, 45, 56, 67, 54, 56, 43, 45, 23, 12, 78, 1, 3, 4, 5],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    ],
  };

  const tableData = [
    ['Timestamp', 'HVAC', 'EV Charger', 'Production1'],
    ['12:00 AM', 'On', 'Off', 'On'],
    ['1:00  PM', 'On', 'Off', 'On'],
    ['2:00  PM', 'On', 'On', 'Off'],
    ['3:00  PM', 'Off ', 'On', 'On'],
    ['4:00  PM', 'Off', 'Off', 'Off'],
    // Add more rows as needed
  ];

  const generatePDF = (canvas: HTMLCanvasElement | null) => {
    const doc = new jsPDF();

    autoTable(doc, { styles: { fontSize: 10 } });

    (doc as any).autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 20,
    });

    if (canvas && canvas instanceof HTMLCanvasElement) {
      const canvasImageData = canvas.toDataURL('image/jpeg', 1.0);
      const canvasImageHeight = (canvas.height * 180) / canvas.width;
      const canvasImageWidth = 180;
      (doc as any).addImage(canvasImageData, 'JPEG', 15, (doc as any).autoTableEndPosY() + 10, canvasImageWidth, canvasImageHeight);
    }

    doc.save('action_table.pdf');
  };

  const renderChartOnCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: false,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  const sendActionReport = async () => {
    // Prompt the user for the email address
    const emailAddress = prompt('Enter your email address:');
    console.log(emailAddress);

    // Prepare the email parameters
    const templateParams = {
      to_email: emailAddress,
      from_name: 'Bqp Energy Cost Optimization Team',
      message: 'Here is the list of actions for the next 24 hours.',
      // Add any additional parameters you need
      attachments: [
        {
          name: 'action_report.pdf',
          content_type: 'application/pdf',
        },
      ],
    };

    // Send the email
    emailjs.send('service_9g9uwbn', 'template_az5iqrb', templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  };



//
// const deviceStates = [
//   { deviceId: 1, realStates: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], forecastedStates: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1] },
//   { deviceId: 2, realStates: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], forecastedStates: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] },
//   { deviceId: 3, realStates: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1], forecastedStates: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1] },
// ];

// const [selectedDate, setSelectedDate] = useState(null);
// const [showDetails, setShowDetails] = useState(false);

// const handleDateChange = (date) => {
//   setSelectedDate(date);
//   setShowDetails(false); // Reset details view when date changes
// };


// const renderDetails = () => {
//   // Render details based on selected date
//   if (!selectedDate) return null; // No selected date, don't render anything

//   // Dummy data for demonstration
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//   const forecastedData = [65, 59, 80, 81, 56, 55, 40];
//   const actualData = [28, 48, 40, 19, 86, 27, 90];

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Forecasted Usage',
//         data: forecastedData,
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//       {
//         label: 'Actual Usage',
//         data: actualData,
//         fill: false,
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//       },
//     ],
//   };

//   return (
//     <div>
//       <Line data={data} />
//     </div>
//   );
// };

const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [showDetails, setShowDetails] = useState(false);

const handleDateChange = (date: Date | null) => {
  setSelectedDate(date);
  setShowDetails(true); // Show details when date changes
};

const renderDetails = () => {
  // Render details based on selected date
  if (!selectedDate) return null; // No selected date, don't render anything

  // Dummy data for demonstration
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const forecastedData = [65, 59, 80, 81, 56, 55, 40];
  const actualData = [28, 48, 40, 19, 86, 27, 90];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Forecasted Usage',
        data: forecastedData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Actual Usage',
        data: actualData,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};


  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <nav className="text-5xl font-bold text-white text-center bg-black p-8 shadow-lg z-50 rounded-md w-full">
          BQP Energy Cost Optimizer
        </nav>
        
        <ConnectedCircles/>

        <div className="flex justify-between p-4 bg-white shadow-md rounded-md mt-4 z-40">
          <div className="text-gray-700 font-bold p-4 px-32">Plant ID: 77903d8a-ba6e-4510-b1bb-d96f415f2120</div>
          <div className="text-gray-700 font-bold p-4">Plant Name: ABB SACE BUILDING</div>
        </div>
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="w-full md:w-1/2 min-h-screen p-8">
            <div className="bg-white p-6 rounded-md shadow-md z-30 h-full">
              <div className="h-96">
                <LineChart data={chartData} />
              </div>
              <div className="relative z-10 shadow-md p-4">
                <h1 className="text-3xl font-bold mb-4">Device States</h1>
                {/* <DeviceChart deviceStates={deviceStates} /> */}
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h4 className="text-center font-bold text-gray-700 text-lg mb-4">Analytics</h4>
                <table className="w-full border-collapse">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <p className="text-gray-800">Energy Cost Forecasted</p>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <p className="text-red-600 font-semibold">$100</p>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <p className="text-gray-800">Energy Cost Optimized by BQP</p>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <p className="text-green-600 font-semibold">$70</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">
                      <p className="text-gray-800">Net difference</p>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <p className="text-blue-600 font-semibold">$30</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between bg-white min-h-screen p-8 z-20">
            <div className="pd-6"></div>
            <div className="flex justify-end mb-4">
              <button
                className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md"
                onClick={sendActionReport}
              >
                Mail
              </button>
            </div>

            {/* <div className="flex-grow bg-white shadow-md rounded-md p-4 z-10">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select Date"
          className="w-full p-2 mb-2 rounded-md shadow-md"
        />
        {showDetails ? renderDetails() : (



                                        <div className="flex-grow bg-white shadow-md rounded-md p-4 z-10">
                                          <div className="w-full flex justify-between bg-gray-200 p-2 rounded-md shadow-md mb-2">
                                            {tableData[0].map((header, index) => (
                                              <div key={index} className="w-1/5 text-center font-bold">
                                                {header}
                                              </div>
                                            ))}
                                          </div>
                                          {tableData.slice(1).map((row, rowIndex) => (
                                            <div key={rowIndex} className="w-full flex justify-between p-2">
                                              {row.map((cell, cellIndex) => (
                                                <div key={cellIndex} className="w-1/5 text-center">
                                                  {cell}
                                                </div>
                                              ))}
                                            </div>
                                          ))}
                                          
                                        </div>




        )}
        </div> */}


<div className="flex-grow bg-white shadow-md rounded-md p-4 z-10">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Select Date"
        className="w-full p-2 mb-2 rounded-md shadow-md"
      />
      <div className="w-full flex justify-between bg-gray-200 p-2 rounded-md shadow-md mb-2">
        {tableData[0].map((header, index) => (
          <div key={index} className="w-1/5 text-center font-bold">
            {header}
          </div>
        ))}
      </div>
      {showDetails ? renderDetails() : (
        <div>
          {tableData.slice(1).map((row, rowIndex) => (
            <div key={rowIndex} className="w-full flex justify-between p-2">
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className="w-1/5 text-center">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
            <div className="flex justify-end mt-4">
              <button
                className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md"
                onClick={() => generatePDF(chartCanvasRef.current)}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterDown />
    </>
  );
}