import React, { useState } from 'react';

const FileUploadForm = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
      setFile(null);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg rounded-t-lg p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mr-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!file}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;