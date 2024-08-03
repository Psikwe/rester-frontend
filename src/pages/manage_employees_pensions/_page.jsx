import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import SkeletonLoader from "../../components/skeleton_loading/_component";
import {
  BsExclamationCircle,
  BsFillExclamationCircleFill,
} from "react-icons/bs";
import Modal from "../../components/modal/_component";
import { clearUserSession } from "../../core/utilities";
import {
  DeleteEmployeePension,
  GetAllEmployees,
  GetEmployeePensions,
} from "../../core/services/employee.service";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";
import TableLoader from "../../components/table_loader/_component";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { showToast } from "../../core/hooks/alert";

function ManageEmployeesPensions() {
  const entity_id = localStorage.getItem("entity_id");
  const [isLoading, setIsLoading] = React.useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isContentLoading, setContentLoading] = React.useState(false);
  const [employeePensions, setEmployeePensions] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [isSkeletonLoading, setSkeletonLoading] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [employees, setEmployees] = React.useState();
  const [deleteId, setDeleteId] = React.useState("");
  const [isDoneAdding, setIsDoneAdding] = React.useState(false);

  React.useEffect(() => {
    setContentLoading(true);
    GetEmployeePensions(entity_id)
      .then((response) => {
        setContentLoading(false);
        setEmployeePensions(response?.data.pensions);
        console.log("res: ", response);
      })
      .catch((error) => {
        setContentLoading(false);
        console.log(error);
      });
  }, [isDoneAdding]);

  const handleLogout = () => {
    clearUserSession();
    // window.location.href = "/";
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const filteredData = employeePensions?.filter((e) => {
    if (query === "") {
      return e;
    } else if (
      e?.employee_name?.toLowerCase().includes(query.toLocaleLowerCase())
    )
      return e;
  });

  const renderLinkCell = (props) => {
    const { row } = props;
    const id = row.id; // Adjust this according to your actual row structure

    return (
      <Link to={`/dashboard/manage-employee-pensions/${id}`}>
        {props.column.name === "First Name"
          ? row.first_name
          : props.column.name === "Last Name"
          ? row.last_name
          : props.column.name === "Email"
          ? row.email
          : row.ghana_card_id}
      </Link>
    );
  };

  const handleUpdateClick = (id) => {
    window.location.href = "/dashboard/update-employee-pension/" + id;
  };

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(name);
  };

  const renderActionsRow = (data) => {
    const { pension_id, employee_name } = data.row;
    return (
      <div className="flex items-center mt-4">
        {/* <button title="Delete" onClick={() => handleDeleteClick(id, name)}>
          <MdDelete color="red" size={18} />
        </button> */}
        <button
          className="mb-2 ml-3"
          title="Update"
          onClick={() => handleUpdateClick(pension_id)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="mb-2 ml-3"
          title="Delete"
          onClick={() => handleDelete(pension_id, employee_name)}
        >
          <MdDelete color="red" size={18} />
        </button>
      </div>
    );
  };

  const renderStatutory = (data) => {
    const { statutory_or_not } = data.row;
    return <div> {statutory_or_not ? "Yes" : "No"}</div>;
  };

  const columns = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
    { key: "employee_name", name: "Employee Name" },
    { key: "amount", name: "Amount" },
    { key: "base", name: "Base" },
    { key: "calculation", name: "Calculation" },
    { key: "pension_name", name: "Pension Name" },
    { key: "rate", name: "Rate" },
    {
      key: "statutory_or_not",
      name: "Statutory Or Not",
      renderCell: renderStatutory,
    },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteEmployeePension(deleteId)
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
            <BsFillExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to delete {""}
              <b className="font-bold">{itemToDelete}'s</b> pension?
            </h3>
            <div className="flex justify-center mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-1/3 rounded-full py-2 mr-2 text-white mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="w-1/3 rounded-full py-2 text-white bg-red-500 mt-9 mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={isLogoutModalOpen} close={closeLogoutModal}>
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <BsExclamationCircle size={70} color="red" />
          </div>

          <p>Are you sure you want to logout?</p>
          <div className="flex">
            <button
              onClick={closeLogoutModal}
              className="w-full py-2 mr-2 text-white mt-9 primary mobile:w-full"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 text-white bg-red-500 mt-9 mobile:w-full"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <div className="mt-10 laptop-lg:mx-20">
        {/* <div className="flex items-center w-1/2 bg-[#d4f2ff]">
          <div className="inline-block  h-24 w-1 bg-[#6ccef5]"></div>
          <h3 className="flex items-center ml-3 text-gray-500">
            <FaCircleInfo size={25} className="mr-2" />
            Please click on employee you want to manage pension.
          </h3>
        </div> */}
        <div className="flex flex-wrap w-full gap-3 px-4 py-3 my-6 bg-slate-200">
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
        {isContentLoading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            {!isContentLoading && employeePensions.length === 0 ? (
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
                      rows={filteredData || []}
                      bottomSummaryRows={summaryRows}
                      rowHeight={50}
                    />
                    <strong className="text-sm">
                      Totals: {filteredData?.length} records
                    </strong>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ManageEmployeesPensions;
