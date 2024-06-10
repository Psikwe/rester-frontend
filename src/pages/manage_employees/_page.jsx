import React from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { FcSearch } from "react-icons/fc";
import { BsExclamationCircle } from "react-icons/bs";
import { employeeColumns, employeeRows } from "../../core/data";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { VscSearchStop } from "react-icons/vsc";
import Modal from "../../components/modal/_component";
import { DeleteEntity } from "../../core/services/entity.service";
import { useEntity } from "../../core/hooks/entity";
import TableLoader from "../../components/table_loader/_component";

function ManageEmployees() {
  const { entityQuery } = useEntity();
  const [query, setQuery] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const filteredData = employeeRows?.filter((e) => {
    if (query == "") return e;
    else if (e?.title?.toLowerCase().includes(query.toLocaleLowerCase()))
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

  const handleUpdateClick = (id, name) => {
    alert("test update");
  };
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const renderActionsRow = (data) => {
    const { id, name } = data.row;
    return (
      <div className="flex mt-1">
        {/* <button title="Delete" onClick={() => handleDeleteClick(id, name)}>
          <MdDelete color="red" size={18} />
        </button> */}
        <button
          className="ml-2"
          title="Update"
          onClick={() => handleUpdateClick(id, name)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="ml-2"
          title="Deactivate"
          onClick={() => handleDelete(id, name)}
        >
          <CiLock color="green" size={18} />
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
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setDeleteModalOpen(false);
    DeleteEntity(deleteId)
      .then(() => {
        entityQuery.refetch().then(() => {
          setOperationLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal open={deleteModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircle size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to delete {""}
              <b className="font-bold">{itemToDelete}</b>?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-3 mr-2 text-white mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
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
            placeholder="Search by Employee..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {/* <button
        type="submit"
        className="w-1/4 py-2 my-3 text-white primary mobile:w-full"
      >
        View Payroll
      </button> */}
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <VscSearchStop color="#687864" size={40} className="animate-bounce" />
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
              <strong>Totals: {filteredData?.length} records</strong>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ManageEmployees;
