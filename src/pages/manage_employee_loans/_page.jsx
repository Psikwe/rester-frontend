import React from "react";
import "react-data-grid/lib/styles.css";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { MdDelete } from "react-icons/md";
import {
  DeactivateEmployee,
  DeleteEmployeeLoan,
  GetAllEmployeeLoans,
} from "../../core/services/employee.service";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { showToast } from "../../core/hooks/alert";
import { useParams } from "react-router-dom";

function ManageEmployeeLoans() {
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  localStorage.setItem("employee_id", id);
  const [query, setQuery] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [employeeLoan, setEmployeeLoan] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

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
    { key: "annual_interest_rate", name: "Annual Interest Rate" },
    { key: "loan_amount", name: "Loan Amount" },
    { key: "loan_provider", name: "Loan Provider" },
    { key: "loan_term", name: "Loan Term" },
    { key: "monthly_interest", name: "Monthly Interest" },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
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

  return (
    <>
      <Modal open={deleteModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to delete this {""}
              <b className="font-bold">{itemToDelete}</b>?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 mr-2 text-white mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-2 text-white bg-red-500 mt-9 mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* <div className="flex flex-wrap w-full gap-3 px-4 py-3 mb-6 bg-slate-200">
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
      </div> */}

      {employeeLoan.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          {/* <VscSearchStop
                color="#687864"
                size={40}
                className="animate-bounce"
              /> */}
          <h3 className="text-slate-400">No match</h3>
        </div>
      ) : (
        <>
          {isOperationLoading ? (
            <>
              <TableLoader />
            </>
          ) : (
            <>
              <DataGrid
                className="text-sm rdg-light grid-container"
                columns={columns}
                rows={employeeLoan || []}
                bottomSummaryRows={summaryRows}
                rowHeight={50}
              />
              <strong className="text-sm">
                Totals: {employeeLoan?.length} records
              </strong>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ManageEmployeeLoans;
