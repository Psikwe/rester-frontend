import React from "react";
import "react-data-grid/lib/styles.css";
import { formToJSON } from "axios";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import Loader from "../../components/loader/_component";
import { MdDelete } from "react-icons/md";
import {
  DeleteEmployeeLoan,
  GetAllEmployeeLoans,
  SubmitEmployeeLoan,
} from "../../core/services/employee.service";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { showToast } from "../../core/hooks/alert";
import { useParams } from "react-router-dom";

function ViewTaxRate() {
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  localStorage.setItem("employee_id", id);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [employeeLoan, setEmployeeLoan] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createLoan, setCreateLoan] = React.useState(false);

  const handleUpdateClick = (id) => {
    window.location.href = "/dashboard/update-employee-loan/" + id;
  };

  const handleNavigateToEmployeeLoan = (id) => {
    window.location.href = "/dashboard/create-employee-loan/" + id;
  };

  const handleNavigateToTerminateEmployee = (id) => {
    window.location.href = "/dashboard/terminate-employee/" + id;
  };

  const handleDelete = (id, loan_provider) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(loan_provider);
  };

  const renderActionsRow = (data) => {
    const { id, loan_provider } = data.row;
    return (
      <div className="flex items-center mt-4">
        {/* <button title="Delete" onClick={() => handleDeleteClick(id, name)}>
          <MdDelete color="red" size={18} />
        </button> */}
        <button
          className="mb-2 ml-3"
          title="Update"
          onClick={() => handleUpdateClick(id)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="mb-2 ml-3"
          title="Delete"
          onClick={() => handleDelete(id, loan_provider)}
        >
          <MdDelete color="red" size={18} />
        </button>
      </div>
    );
  };

  const columns = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
    { key: "annual_interest_rate", name: "UUID" },
    { key: "loan_amount", name: "Type" },
    { key: "loan_provider", name: "Effective From" },
    { key: "loan_term", name: "Effective To" },
    { key: "monthly_interest", name: "Published" },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const closeLoanModal = () => {
    setCreateLoan(false);
  };

  const confirmDelete = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteEmployeeLoan(deleteId, entity_id, id)
      .then((response) => {
        setOperationLoading(false);
        showToast(response.data.message, true);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((error) => {
        setOperationLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  React.useEffect(() => {
    GetAllEmployeeLoans(id, entity_id)
      .then((response) => {
        console.log("sss: ", response);
        setEmployeeLoan(response?.data.employee_loans);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = employeeLoan?.filter((e) => {
    if (query === "" && e.is_disabled == false) return e;
    else if (
      e?.loan_provider?.toLowerCase().includes(query.toLocaleLowerCase()) &&
      e.is_disabled == false
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCreateEmployeeSubmit = (e) => {
    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const loanForm = document.getElementById("employee-loan-form");
    const payload = {
      ...formToJSON(loanForm),
      employee_id: id,
      entity_id: entity_id,
      is_compounding_interest: isChecked,
    };
    SubmitEmployeeLoan(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        loanForm?.reset();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  return (
    // <>

    //   {employeeLoan.length === 0 ? (
    //     <div className="flex flex-col items-center justify-center">
    //       {/* <VscSearchStop
    //             color="#687864"
    //             size={40}
    //             className="animate-bounce"
    //           /> */}
    //       <h3 className="text-slate-400">No match</h3>
    //     </div>
    //   ) : (
    //     <>
    //       {isOperationLoading ? (
    //         <>
    //           <TableLoader />
    //         </>
    //       ) : (
    //         <>
    //           <DataGrid
    //             className="text-sm rdg-light grid-container"
    //             columns={columns}
    //             rows={employeeLoan || []}
    //             bottomSummaryRows={summaryRows}
    //             rowHeight={50}
    //           />
    //           <strong className="text-sm">
    //             Totals: {employeeLoan?.length} records
    //           </strong>
    //         </>
    //       )}
    //     </>
    //   )}
    // </>

    <>
      <DataGrid
        className="text-sm rdg-light grid-container"
        columns={columns}
        rows={employeeLoan || []}
        bottomSummaryRows={summaryRows}
        rowHeight={50}
      />
    </>
  );
}

export default ViewTaxRate;
