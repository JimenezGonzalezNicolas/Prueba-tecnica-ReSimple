import React from 'react';
import * as XLSX from 'xlsx';
import "./App.css";

const ExcelReader = ({ onDataLoaded }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      onDataLoaded(excelData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col justify-center items-center h-20 rounded-lg my-4 bg-white py-2">
        <p className="flex justify-center items-center h-20">
            <span className="text-green-400 font-bold"> Porfavor ingrese un archivo excel </span>
        </p>
        <div className="flex justify-center items-center h-20 w-3/4">
        <input type="file" onChange={handleFileChange} />
        </div>
      
    </div>
  );
};

export default ExcelReader;
