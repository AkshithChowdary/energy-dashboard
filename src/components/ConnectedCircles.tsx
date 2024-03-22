// import React, { useState } from 'react';
// import { FaCircle, FaCheckCircle } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import styled from 'styled-components';
// import 'react-toastify/dist/ReactToastify.css';

// const ConnectorLine = styled.div`
//   height: 5px;
//   background-color: #cbd5e0;
//   width: 10rem;
//   margin: 0 1rem;
// `;

// const ConnectedCircles = () => {
//   const [inputState, setInputState] = useState('idle');
//   const [optimizationState, setOptimizationState] = useState('idle');
//   const [emailState, setEmailState] = useState('idle');

//   const handleStartOptimizing = () => {
//     setInputState('fetching');
//     toast('Fetching data from ABB', { autoClose: 3000 });
//     setTimeout(() => {
//       setInputState('done');
//       setOptimizationState('running');
//       toast('Running optimization process', { autoClose: 3000 });
//       setTimeout(() => {
//         setOptimizationState('done');
//         setEmailState('sending');
//         toast('Sending email notification', { autoClose: 3000 });
//         setTimeout(() => {
//           setEmailState('done');
//         }, 3000);
//       }, 3000);
//     }, 3000);
//   };

//   return (
//     <div className="flex flex-col items-center my-8">
//       <div className="flex items-center py-4">
//         <div className="relative">
//           {inputState === 'idle' && <FaCircle className="text-gray-400 text-4xl" />}
//           {inputState === 'fetching' && <FaCircle className="text-orange-500 text-4xl animate-pulse" />}
//           {inputState === 'done' && <FaCheckCircle className="text-green-500 text-4xl" />}
//           <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg text-bold">Initialization</span>
//         </div>
//         <ConnectorLine />
//         <div className="relative">
//           {optimizationState === 'idle' && <FaCircle className="text-gray-400 text-4xl" />}
//           {optimizationState === 'running' && <FaCircle className="text-yellow-500 text-4xl animate-pulse" />}
//           {optimizationState === 'done' && <FaCheckCircle className="text-green-500 text-4xl" />}
//           <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg text-bold">Prediction</span>
//         </div>
//         <ConnectorLine />
//         <div className="relative">
//           {emailState === 'idle' && <FaCircle className="text-gray-400 text-4xl" />}
//           {emailState === 'sending' && <FaCircle className="text-orange-500 text-4xl animate-pulse" />}
//           {emailState === 'done' && <FaCheckCircle className="text-green-500 text-4xl" />}
//           <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg text-bold">Recommandation</span>
//         </div>
//       </div>
//       <button
//         onClick={handleStartOptimizing}
//         className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Start Optimizing
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ConnectedCircles;

import React, { useState } from 'react';
import { FaCircle, FaCheckCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const ConnectorLine = styled.div`
  height: 5px;
  background-color: #cbd5e0;
  width: 10rem;
  margin: 0 1rem;
`;

const ConnectedCircles = () => {
  const [inputState, setInputState] = useState('idle');
  const [optimizationState, setOptimizationState] = useState('idle');
  const [emailState, setEmailState] = useState('idle');

  const handleStartOptimizing = () => {
    setInputState('fetching');
    toast('Fetching data from ABB', { autoClose: 3000 });
    setTimeout(() => {
      setInputState('done');
      setOptimizationState('running');
      toast('Running optimization process', { autoClose: 3000 });
      setTimeout(() => {
        setOptimizationState('done');
        setEmailState('sending');
        toast('Sending email notification', { autoClose: 3000 });
        setTimeout(() => {
          setEmailState('done');
          // Show toast message when optimization is done
          toast.success('Yay! you saved your money today.', {
            position: "bottom-center"
          });
        }, 3000);
      }, 3000);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div className="flex items-center py-4">
        <div className="relative">
          {inputState === 'idle' && <FaCircle className="text-gray-400 text-4xl" />}
          {inputState === 'fetching' && <FaCircle className="text-orange-500 text-4xl animate-pulse" />}
          {inputState === 'done' && <FaCheckCircle className="text-green-500 text-4xl" />}
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg text-bold">Initialization</span>
        </div>
        <ConnectorLine />
        <div className="relative">
          {optimizationState === 'idle' && <FaCircle className="text-gray-400 text-4xl" />}
          {optimizationState === 'running' && <FaCircle className="text-yellow-500 text-4xl animate-pulse" />}
          {optimizationState === 'done' && <FaCheckCircle className="text-green-500 text-4xl" />}
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg text-bold">Prediction</span>
        </div>
        <ConnectorLine />
        <div className="relative">
          {emailState === 'idle' && <FaCircle className="text-gray-400 text-4xl" />}
          {emailState === 'sending' && <FaCircle className="text-orange-500 text-4xl animate-pulse" />}
          {emailState === 'done' && <FaCheckCircle className="text-green-500 text-4xl" />}
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg text-bold">Recommendation</span>
        </div>
      </div>
      <button
        onClick={handleStartOptimizing}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Start Optimizing
      </button>
      <ToastContainer />
    </div>
  );
};

export default ConnectedCircles;
