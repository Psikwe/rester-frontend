import React, { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
import "./PayRoll.css";

const CustomCell = (props) => {
  const { cell } = props;
  const cellValue = cell?.value || ""; // Use optional chaining to avoid errors

  return <div className="custom-cell">{cellValue}</div>;
};

const processData = (fetchedData) => {
  // Assuming fetchedData is a 2D array
  // If not, you will need to transform it accordingly
  return fetchedData.map((row) => row.map((value) => ({ value })));
};

const PayRoll = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_ENDPOINT_URL");
        const result = await response.json();
        const processedData = processData(result);
        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    <div className="spreadsheet-container">
      <h1>React Spreadsheet</h1>
      <Spreadsheet data={data} onChange={handleChange} Cell={CustomCell} />
    </div>
  );
};

export default PayRoll;
