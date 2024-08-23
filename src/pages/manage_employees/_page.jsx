import React from "react";
import "react-data-grid/lib/styles.css";
import { BsExclamationCircleFill } from "react-icons/bs";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import Tabs from "../../components/tabs/_component";
import { SiCashapp } from "react-icons/si";
import {
  DeactivateEmployee,
  GetAllEmployees,
} from "../../core/services/employee.service";
import { FcSearch } from "react-icons/fc";
import "react-data-grid/lib/styles.css";
import pension from "../../assets/icons/pension.png";
import DataGrid from "react-data-grid";
import DeactivatedEmployees from "../deactivated_employees/_page";
import { showToast } from "../../core/hooks/alert";
import { useNavigate } from "react-router-dom";

function ManageEmployees() {
  const entity_id = localStorage.getItem("entity_id");
  const [query, setQuery] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [isContentLoading, setContentLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const navigate = useNavigate;
  const handleUpdateClick = (id) => {
    navigate("/dashboard/update-employee/" + id);
  };

  const handleNavigateToEmployeeLoan = (id) => {
    navigate("/dashboard/create-employee-loan/" + id);
  };
  const handleNavigateToEmployeePension = (id) => {
    navigate("/dashboard/create-employee-pensions/" + id);
  };

  const handleNavigateToTerminateEmployee = (id) => {
    navigate("/dashboard/terminate-employee/" + id);
  };

  const handleDelete = (id, first_name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(first_name);
  };

  const renderActionsRow = (data) => {
    const { id, first_name } = data.row;
    setEmployeeId(id);
    return (
      <div className="grid grid-cols-3 mt-1">
        <button
          className="mb-2 ml-3"
          title="Update"
          onClick={() => handleUpdateClick(id)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="mb-2 ml-3"
          title="Deactivate"
          onClick={() => handleDelete(id, first_name)}
        >
          <CiLock color="red" size={18} />
        </button>{" "}
        <button
          className="mb-2 ml-3"
          title="Terminate Employee"
          onClick={() => handleNavigateToTerminateEmployee(id, first_name)}
        >
          <RiIndeterminateCircleLine color="red" size={18} />
        </button>
        <button
          className="mb-2 ml-3"
          title="Create Employee Loan"
          onClick={() => handleNavigateToEmployeeLoan(id, first_name)}
        >
          <SiCashapp color="blue" size={18} />
        </button>
        <button
          className="ml-3 -mt-3"
          title="Create Employee Pension"
          onClick={() => handleNavigateToEmployeePension(id)}
        >
          <img src={pension} className="w-18" />
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
    { key: "first_name", name: "First Name" },
    { key: "last_name", name: "Last Name" },
    { key: "other_names", name: "Other Names" },
    { key: "email", name: "Email" },
    { key: "address", name: "Address" },
    { key: "permanent_address", name: "Permanent Address" },
    { key: "phone", name: "phone" },
    { key: "tin", name: "Tin" },
    { key: "ghana_card_id", name: "Ghana Card Number" },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeactivateEmployee(deleteId)
      .then((response) => {
        console.log(response);
        setOperationLoading(false);
        showToast(response.data.message, true);
        setTimeout(() => {
          window.location.reload();
        }, [2500]);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };

  React.useEffect(() => {
    setContentLoading(true);
    GetAllEmployees(entity_id)
      .then((response) => {
        setContentLoading(false);
        setEmployees(response?.data.employees);
        console.log("res: ", response?.data.error);
      })
      .catch((error) => {
        setError(error.response?.data.error);
      });
  }, []);

  const filteredData = employees?.filter((e) => {
    if (query === "") return e;
    else if (
      e?.first_name?.toLowerCase().includes(query.toLocaleLowerCase()) &&
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

  const content = [
    {
      label: "Active",
      content: (
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
          {!isContentLoading ? (
            <>
              {!isContentLoading && filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
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
                        rows={filteredData || []}
                        bottomSummaryRows={summaryRows}
                        rowHeight={60}
                      />
                      <strong className="text-sm">
                        Totals: {filteredData?.length} records
                      </strong>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>{error}</>
          )}
        </>
      ),
    },
    {
      label: "Deactivated",
      content: (
        <>
          <DeactivatedEmployees />
        </>
      ),
    },
  ];

  const handleNavigateToManageEmployeeLoans = () => {
    navigate("/dashboard/manage-employee-loans/" + employeeId);
  };

  const createEmployee = () => {
    navigate("/dashboard/create-employee");
  };
  return (
    <>
      <div
        onClick={createEmployee}
        className="flex items-center py-3 text-xs text-black underline cursor-pointer w-36"
      >
        <FiPlus size={20} color="black" /> Create Employee
      </div>
      <Modal open={deleteModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to deactivate {""}
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
                onClick={confirmDeactivate}
                className="w-full py-2 text-white bg-red-500 mt-9 mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Tabs tabs={content} />
    </>
  );
}

export default ManageEmployees;
