import React, { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";

const CustomCell = (props) => {
  const { cell } = props;
  const cellValue = cell?.value || ""; // Use optional chaining to avoid errors

  return <div className="custom-cell">{cellValue}</div>;
};

const generateInitialData = () => {
  const rows = 20; // Rows from A to T (20 rows)
  const columns = 30; // Columns from 1 to 30

  const data = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push({ value: `${String.fromCharCode(65 + i)}${j + 1}` }); // Create cell identifiers like A1, B2, etc.
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
    // Example validation: Ensure all cells have non-empty values
    const isValid = newData.every((row) =>
      row.every((cell) => cell.value.trim() !== "")
    );
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
