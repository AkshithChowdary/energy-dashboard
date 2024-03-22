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
import { useTranslation } from 'react-i18next';
import Natural from '@/components/Natural';

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



  const chartData = {
    labels: [
      '00:00', '00:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30',
      '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30',
      '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', ''
    ],
    datasets: [
      {
        label: 'Optimized Power',
        data: [
          376.39928227, 367.27152036, 345.19275855, 374.09632989, 373.00194893, 366.10075846, 334.26652045, 328.34047283, 347.2151395, 400.30152036, 365.21254426, 368.97561569, 267.16740123, 323.9412821, 297.42640123, 315.72592496, 306.61685361, 299.44549647, 288.16373457, 300.14292504, 329.38139735, 384.88171473, 392.02152045, 388.49485378, 405.64480608, 381.7591395, 385.86223854, 419.9566156, 282.65773457, 314.33335361, 311.701544, 300.01082972, 271.92892496, 273.36749638, 260.49263933, 254.82340123, 277.27625829, 276.03535353, 268.19502019, 260.32440115, 346.71209188, 298.2485402, 251.66944885, 275.44387734, 367.14094893, 353.64794902, 373.27304417, 379.38690132
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        yAxisID: 'y' // Assign yAxisID to the main y-axis
      },
      {
        label: 'Forecasted',
        data: [
          229.46359565, 206.91686045, 231.28347173, 234.63270071, 227.73539697, 217.44990396, 248.27374189, 262.66513271, 328.65409742, 335.72700775, 353.65187765, 396.53488699, 380.51853761, 422.08662332, 418.84875601, 394.94946735, 415.44576801, 372.48706608, 363.8179518, 350.62536254, 338.36187567, 326.57185576, 325.45976163, 328.45467664, 354.31415411, 401.98037327, 431.51654907, 438.11302611, 416.80509644, 392.10610212, 500.90626954, 522.60367223, 430.48800402, 288.73045645, 314.80060417, 315.60054859, 298.15785157, 286.12203949, 277.33217025, 313.88005864, 312.5235001, 312.77869278, 325.52327058, 242.23797723, 220.15376696, 264.06711845, 228.35197312, 229.96682389
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        yAxisID: 'y' // Assign yAxisID to the main y-axis
      },
      {
        label: 'Tariff Data',
        data: [
          0.06566, 0.06566, 0.0657, 0.0657, 0.06012, 0.06012, 0.05584, 0.05584, 0.07185, 0.07185, 0.08408, 0.08408, 0.10069, 0.10069, 0.13178, 0.13178, 0.12646, 0.12646, 0.10442, 0.10442, 0.09009, 0.09009, 0.08, 0.08, 0.08641, 0.08641, 0.09003, 0.09003, 0.09654, 0.09654, 0.11918, 0.11918, 0.12733, 0.12733, 0.12647, 0.12647, 0.1308, 0.1308, 0.12602, 0.12602, 0.09171, 0.09171, 0.09307, 0.09307, 0.07718, 0.07718, 0.05717, 0.05717
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        yAxisID: 'y1' // Assign yAxisID to the separate y-axis for tariff data
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
  
    // Generate the instructions
    const instructions = [];
  
    for (let i = 1; i < tableData.length; i++) {
      const [timestamp, hvac, evCharger, production1] = tableData[i];
      const instructionLine = `At ${timestamp}, you should:`;
  
      if (hvac === 'On') {
        instructions.push(`${instructionLine} Turn on the HVAC system.`);
      } else {
        instructions.push(`${instructionLine} Turn off the HVAC system.`);
      }
  
      if (evCharger === 'On') {
        instructions.push(`${instructionLine} Turn on the EV charger.`);
      } else {
        instructions.push(`${instructionLine} Turn off the EV charger.`);
      }
  
      if (production1 === 'On') {
        instructions.push(`${instructionLine} Start Production1.`);
      } else {
        instructions.push(`${instructionLine} Stop Production1.`);
      }
    }
  
    // Add the instructions to the PDF
    doc.setFontSize(12);
    doc.text('Instructions (English):', 15, 20);
    doc.setFontSize(10);
    const instructionsText = instructions.join('\n');
    const instructionsSplit = doc.splitTextToSize(instructionsText, 180);
    const instructionsHeight = doc.getTextDimensions(instructionsSplit).h;
    doc.text(instructionsSplit, 15, 25);
  
    // Add the table to the PDF with a gap after the instructions
    const tableStartY = 25 + instructionsHeight + 10; // Add a gap of 10 units
    (doc as any).autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: tableStartY,
    });
  
    // Add the canvas image to the PDF
    if (canvas && canvas instanceof HTMLCanvasElement) {
      const canvasImageData = canvas.toDataURL('image/jpeg', 1.0);
      const canvasImageHeight = (canvas.height * 180) / canvas.width;
      const canvasImageWidth = 180;
      (doc as any).addImage(
        canvasImageData,
        'JPEG',
        15,
        (doc as any).autoTableEndPosY() + 10,
        canvasImageWidth,
        canvasImageHeight
      );
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
      <nav className="text-5xl font-bold text-white text-center bg-black p-8 shadow-lg z-50 rounded-md w-full relative">
        <a href="https://www.bosonqpsi.com/" className="absolute left-8 top-2 ml-4 mt-2 ">
          <img src="./BQP_Logo.png" alt="Company Logo" className="w-32 h-32 inline-block bg-white rounded-md" />
        </a>
        <span className="ml-4 text-center">QAI-ECO</span> {/* Adjusted the margin here */}
        <p className="text-xl text-center mt-4">
          <span className="block">Powered by <span className="font-bold text-cyan-600">BQPhy®</span></span>
        </p>
      </nav>



        
        <ConnectedCircles/>

        <div className="flex justify-between p-4 bg-white shadow-md rounded-md mt-4 z-40">
          <div className="text-gray-700 font-bold p-4 px-32">Plant ID: 77903d8a-ba6e-4510-b1bb-d96f415f2120</div>
          <div className="text-gray-700 font-bold p-4">Plant Name: ABB SACE BUILDING</div>
        </div>
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="w-full md:w-1/2 min-h-screen p-8">
            <div className="bg-white p-6 rounded-md shadow-md z-30 h-full">
              <div className="h-auto relative">
                <LineChart data={chartData} />
              </div>
              {/* <div className="relative z-10 shadow-md p-4">
                <h1 className="text-3xl font-bold mb-4">Device States</h1> */}
                {/* <DeviceChart deviceStates={deviceStates} /> */}
              {/* </div> */}
              <div className="bg-white shadow-md rounded-lg p-6 relative">
                <h4 className="text-center font-bold text-gray-700 text-lg mb-4">Analytics</h4>
                <table className="w-full border-collapse">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <p className="text-gray-800">Energy Cost Forecasted</p>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <p className="text-red-600 font-semibold">$1540</p>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <p className="text-gray-800">Energy Cost Optimized by BQP</p>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <p className="text-green-600 font-semibold">$1450</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">
                      <p className="text-gray-800">Total Savings</p>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <p className="text-blue-600 font-semibold">$90</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>





          <div className="w-full md:w-1/2 flex flex-col justify-between bg-white min-h-screen p-8 z-20">
            {/* <div className="pd-6"></div>
            <div className="flex justify-end mb-4">
              <button
                className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md"
                onClick={sendActionReport}
              >
                Mail
              </button>
            </div> */}

<div className="flex-grow bg-white shadow-md rounded-md p-4 z-20">

<Natural />
</div>

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