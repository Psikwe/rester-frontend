import React, { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";

const CustomCell = ({ cell, getValue, row, column, ...props }) => {
  const cellValue = cell?.value || "";

  // Render the header cell as <th> for the first row
  if (row === 0) {
    return (
      <th {...props} className="custom-cell header-cell">
        {cellValue}
      </th>
    );
  }

  // Render other cells as <td>
  return (
    <td {...props} className="custom-cell">
      {cellValue}
    </td>
  );
};

const generateInitialData = () => {
  const rows = 20; // Rows from A to T (20 rows)
  const columns = 30; // Columns from 1 to 30

  const data = [];

  // Define specific column headers
  const headers = [
    { value: "Serial No." },
    { value: "TIN" },
    // Add more column names as needed, or fill the rest with empty values
  ];

  // Fill the rest of the headers with empty strings if necessary
  while (headers.length < columns) {
    headers.push({ value: "" });
  }
  data.push(headers);

  // Generate the rest of the data
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push({ value: `${String.fromCharCode(65 + i)}${j + 1}` }); // Cell identifiers like A1, B2, etc.
    }
    data.push(row);
  }

  return data;
};

const PayRoll = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setData(generateInitialData());
    }, 1000);
  }, []);

  const handleChange = (newData) => {
    // Validate all rows except the header
    const isValid = newData
      .slice(1)
      .every((row) => row.every((cell) => cell.value.trim() !== ""));

    if (isValid) {
      setData(newData);
    } else {
      alert("All cells must have non-empty values");
    }
  };

  return (
    <div className="overflow-y-hidden">
      <Spreadsheet data={data} onChange={handleChange} Cell={CustomCell} />
    </div>
  );
};

export default PayRoll;
