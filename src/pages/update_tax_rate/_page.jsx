import React from "react";
import DataGrid from "react-data-grid";

function UpdateTaxRate() {
  const [employeeLoan, setEmployeeLoan] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(null);

  const renderActionsRow = (data) => {
    const { id, name } = data.row;
    return (
      <div>
        <input
          type="checkbox"
          checked={selectedRowId === id}
          onChange={() => handleCheck(id)}
        />
      </div>
    );
  };

  const columns = [
    {
      key: "update",
      name: "Elect",
      renderCell: renderActionsRow,
      width: "100px",
    },
    { key: "annual_interest_rate", name: "UID" },
    { key: "loan_amount", name: "Type" },
    { key: "loan_provider", name: "Effective From" },
    { key: "loan_term", name: "Effective To" },
    { key: "monthly_interest", name: "Published" },
  ];

  const handleCheck = (id) => {
    setSelectedRowId(id);
  };

  const dummyData = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
    },

    {
      update: "Edit",
      annual_interest_rate: "UID001",
      loan_amount: "Type A",
      loan_provider: "2024-01-01",
      loan_term: "2025-01-01",
      monthly_interest: "Published",
      id: 3,
    },
    {
      update: "Edit",
      annual_interest_rate: "UID002",
      loan_amount: "Type B",
      loan_provider: "2024-02-01",
      loan_term: "2025-02-01",
      monthly_interest: "Unpublished",
      id: 2,
    },
    {
      update: "Edit",
      annual_interest_rate: "UID003",
      loan_amount: "Type C",
      loan_provider: "2024-03-01",
      loan_term: "2025-03-01",
      monthly_interest: "Published",
      id: 1,
    },
  ];
  const [rows, setRows] = React.useState(
    dummyData.map((row) => ({ ...row, isChecked: false }))
  );
  const handleCheckboxChange = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isChecked: !row.isChecked } : row
      )
    );
  };

  const customRenderCell = (row, column) => {
    if (column.key === "select") {
      return column.renderCell(row, handleCheckboxChange);
    }
    return row[column.key];
  };
  return (
    <>
      <DataGrid
        className="text-sm rdg-light grid-container"
        columns={columns}
        rows={dummyData || []}
        rowRenderer={({ row }) => (
          <div className="rdg-row">
            {columns.map((column) => (
              <div
                key={column.key}
                className="rdg-cell"
                style={{ width: column.width }}
              >
                {customRenderCell(row, column)}
              </div>
            ))}
          </div>
        )}
        // bottomSummaryRows={summaryRows}
        // rowHeight={50}
      />
    </>
  );
}

export default UpdateTaxRate;
