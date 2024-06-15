import React from "react";
import "react-data-grid/lib/styles.css";
import { BsExclamationCircleFill } from "react-icons/bs";
import TableLoader from "../../components/table_loader/_component";
import { CiUnlock } from "react-icons/ci";
import Modal from "../../components/modal/_component";
import { useEntity } from "../../core/hooks/entity";
import {
  ActivateEmployee,
  DeactivateEmployee,
  GetAllEmployees,
} from "../../core/services/employee.service";
import { FcSearch } from "react-icons/fc";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { showToast } from "../../core/hooks/alert";

function DeactivatedEmployees() {
  const entity_id = localStorage.getItem("entity_id");
  const [query, setQuery] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToActivate, setItemToActivate] = React.useState("");
  const [activationModalOpen, setActivationModalOpen] = React.useState(false);

  const handleActivation = (id, first_name) => {
    setDeleteId(id);
    setActivationModalOpen(true);
    setItemToActivate(first_name);
  };
  const renderActionsRow = (data) => {
    const { id, first_name } = data.row;
    return (
      <div className="flex mt-1">
        <button
          className="ml-2"
          title="Deactivate"
          onClick={() => handleActivation(id, first_name)}
        >
          <CiUnlock color="green" size={18} />
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
    { key: "address", name: "Address" },
    { key: "permanent_address", name: "Permanent Address" },
    { key: "phone", name: "phone" },
    { key: "tin", name: "Tin" },
    { key: "ghana_card_id", name: "Ghana Card Number" },
  ];

  const closeDeleteModal = () => {
    setActivationModalOpen(false);
  };

  const confirmActivation = () => {
    setOperationLoading(true);
    setActivationModalOpen(false);
    ActivateEmployee(deleteId)
      .then((response) => {
        console.log(response);
        setOperationLoading(false);
        showToast(response.data.message, true);
        setTimeout(() => {
          window.location.reload();
        }, [2500]);
      })
      .catch((error) => {
        console.log(error);
        showToast(error.response.data.error, false);
      });
  };

  React.useEffect(() => {
    GetAllEmployees(entity_id)
      .then((response) => {
        console.log("ent: ", response);
        setEmployees(response?.data.employees);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = employees?.filter((e) => {
    if (query === "" && e.is_disabled == true) return e;
    else if (
      e?.first_name?.toLowerCase().includes(query.toLocaleLowerCase()) &&
      e.is_disabled == true
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
      <Modal open={activationModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to activate {""}
              <b className="font-bold">{itemToActivate}</b>?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-3 mr-2 text-white mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmActivation}
                className="w-full py-3 text-white bg-red-500 mt-9 mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
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

      {filteredData.length === 0 ? (
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
              />
              <strong className="text-sm">
                Totals: {filteredData?.length} records
              </strong>
            </>
          )}
        </>
      )}
    </>
  );
}

export default DeactivatedEmployees;
