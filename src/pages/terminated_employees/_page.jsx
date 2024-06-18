import React from "react";
import DataGrid from "react-data-grid";
import { FcSearch } from "react-icons/fc";
import moment from "moment";
import { GetTerminatedEmployees } from "../../core/services/employee.service";
import { useParams } from "react-router-dom";

function TerminatedEmployees() {
  const { id } = useParams();
  const [terminatedEmployees, setTerminatedEmployees] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    GetTerminatedEmployees(id)
      .then((response) => {
        console.log(response);
        setTerminatedEmployees(response?.data.employment_terminations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderDate = (data) => {
    const { date_of_termination } = data;
    return moment(date_of_termination).format("lll");
  };

  const renderActionsRow = () => {};

  const columns = [
    // {
    //   key: "update",
    //   name: "Actions",
    //   renderCell: renderActionsRow,
    //   width: "100px",
    // },
    { key: "employee_name", name: "Employee Name" },
    {
      key: "date_of_termination",
      name: "Date Terminated",
      renderCell: renderDate,
    },
    { key: "reason_for_termination", name: "Reason" },
  ];

  const filteredData = terminatedEmployees?.filter((e) => {
    if (query === "") return e;
    else if (
      e?.employee_name?.toLowerCase().includes(query.toLocaleLowerCase())
    )
      return e;
  });

  const summaryRows = React.useMemo(() => {
    return [
      {
        id: "total_0",
        totalCount: 4,
      },
    ];
  }, [filteredData]);

  return (
    <>
      <div className="flex flex-wrap w-full gap-3 px-4 py-3 mb-6 bg-slate-200">
        <div className="relative w-full mb-2">
          <div className="absolute left-0 flex items-center pl-3 pointer-events-none top-5">
            <FcSearch />
          </div>
          <input
            type="text"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            placeholder="Search by Employee First Name..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <DataGrid
        className="text-sm rdg-light grid-container"
        columns={columns}
        rows={filteredData || []}
        bottomSummaryRows={summaryRows}
        rowHeight={50}
      />
      <strong className="text-sm">
        Totals: {filteredData?.length} records
      </strong>
    </>
  );
}

export default TerminatedEmployees;
