import React, { useState } from 'react';

const tableData = [
  ['Timestamp', 'HVAC', 'EV Charger', 'Production1'],
  ['12:00 AM', 'On', 'Off', 'On'],
  ['1:00 PM', 'On', 'Off', 'On'],
  ['2:00 PM', 'On', 'On', 'Off'],
  ['3:00 PM', 'Off ', 'On', 'On'],
  ['4:00 PM', 'Off', 'Off', 'Off'],
];

const Natural = () => {
  const [instructions, setInstructions] = useState('');

  const generateInstructions = () => {
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

    setInstructions(instructions.join('\n'));
  };

  return (
    <div className="flex-grow bg-white shadow-md rounded-md p-4 z-10">
      <button
        onClick={generateInstructions}
        className="px-4 py-2 bg-white-750 text-black rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-200"
      >
        Generate Instructions
      </button>
      {instructions && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Instructions (English):</h3>
          <pre className="bg-gray-200 p-4 rounded-md shadow-md">{instructions}</pre>
        </div>
      )}
    </div>
  );
};

export default Natural;