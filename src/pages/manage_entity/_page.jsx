import React from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { FcSearch } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
import { useEntity } from "../../core/hooks/entity";
import TableLoader from "../../components/table_loader/_component";
import Modal from "../../components/modal/_component";
import { DeleteEntity } from "../../core/services/entity.service";
import { showToast } from "../../core/hooks/alert";

function ManageEntity() {
  const [query, setQuery] = React.useState("");
  const { entityQuery } = useEntity();
  const [deleteId, setDeleteId] = React.useState("");
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const { isLoading } = entityQuery;
  const allEntities = entityQuery?.data?.data?.entities;
  const filteredData = allEntities?.filter((e) => {
    if (query == "") return e;
    else if (e?.name?.toLowerCase().includes(query.toLocaleLowerCase()))
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
    window.location.href = "/dashboard/update-entity/" + id;
  };
  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(name);
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
          title="Delete"
          onClick={() => handleDelete(id, name)}
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
    },
    { key: "name", name: "Entity Name" },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setDeleteModalOpen(false);
    setOperationLoading(true);
    DeleteEntity(deleteId)
      .then((res) => {
        console.log(res);
        showToast(res?.data.message, true);
        entityQuery.refetch().then(() => {
          setOperationLoading(false);
        });
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
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
                className="w-full mr-2 text-white mt-9 primary mobile:w-full"
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

      <div className="flex flex-wrap w-full gap-3 px-4 py-3 mb-6 bg-slate-200">
        <div className="relative w-full mb-2">
          <div className="absolute left-0 flex items-center pl-3 pointer-events-none top-5">
            <FcSearch />
          </div>
          <input
            type="text"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            placeholder="Search by Entity Name..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <>
          <TableLoader />
        </>
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
            </>
          )}
        </>
      )}
    </>
  );
}

export default ManageEntity;
