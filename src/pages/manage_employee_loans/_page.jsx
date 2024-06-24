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

function ManageEmployeeLoans() {
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
    { key: "annual_interest_rate", name: "Annual Interest Rate" },
    { key: "loan_amount", name: "Loan Amount" },
    { key: "loan_provider", name: "Loan Provider" },
    { key: "loan_term", name: "Loan Term" },
    { key: "monthly_interest", name: "Monthly Interest" },
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
      <Modal
        showCloseBtn={true}
        open={createLoan}
        close={closeLoanModal}
        closeOnOverlay
      >
        <div className="p-10 bg-white">
          <form id="employee-loan-form" onSubmit={handleCreateEmployeeSubmit}>
            <h3 className="text-sm mt-9">Income Type</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="field">
                <label className="text-sm label bold">
                  Enter Annual Interest Rate
                </label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="number"
                    placeholder="Annual Interest Rate"
                    name="annual_interest_rate"
                  />
                </div>
              </div>
              <div className="field">
                <label className="text-sm label bold">Enter Income Name</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="Income Name"
                    name="income_name"
                  />
                </div>
              </div>
              <div className="mt- field">
                <label className="text-sm label bold">Enter Loan Amount</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="number"
                    placeholder="Loan Amount"
                    name="loan_amount"
                  />
                </div>
              </div>
              <div className="mt-3 field">
                <label className="text-sm label bold">
                  Enter Loan Provider
                </label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="Loan Provider"
                    name="loan_provider"
                  />
                </div>
              </div>
              <div className="mt-3 field">
                <label className="text-sm label bold">Enter Loan Term</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="number"
                    placeholder="Loan Term"
                    name="loan_term"
                  />
                </div>
              </div>
              <div className="mt-3 field">
                <label className="text-sm label bold">
                  Enter Monthly Interest
                </label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="number"
                    placeholder="Monthly Interest"
                    name="monthly_interest"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-3 field">
                <label className="mb-1 text-sm label bold">
                  Toggle If Compound Interest
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00eeff]"></div>
                </label>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={
                isLoading
                  ? `animate-pulse w-1/2 py-3 mb-3 rounded-full text-white primary mt-9 mobile:w-full`
                  : `w-1/2 py-3 mb-3 rounded-full text-white primary mt-9 mobile:w-full`
              }
            >
              {isLoading ? <Loader /> : " Add Employee Loan"}
            </button>
          </form>
        </div>
      </Modal>

      <button
        onClick={() => setCreateLoan(true)}
        className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
      >
        Create Loan
      </button>
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
