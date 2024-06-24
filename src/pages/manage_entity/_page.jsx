import React from "react";
import "react-data-grid/lib/styles.css";
import { FcSearch } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
import EntityCard from "../../components/entity_card/_component";
import { useEntity } from "../../core/hooks/entity";
import Modal from "../../components/modal/_component";
import { DeleteEntity, GetOneEntity } from "../../core/services/entity.service";
import { showToast } from "../../core/hooks/alert";
import { useParams } from "react-router-dom";

function ManageEntity() {
  const { id } = useParams();
  localStorage.setItem("entity_id", id);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [populateEntity, setPopulateEntity] = React.useState({
    name: "",
    address: "",
    size: "",
    email: "",
  });

  React.useEffect(() => {
    GetOneEntity(id)
      .then((response) => {
        console.log(response);
        setPopulateEntity(response.data.entity);
        localStorage.setItem("entity_name", response.data.entity.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id, name) => {
    setDeleteModalOpen(true);
  };

  const handleUpdate = () => {
    window.location.href = "/dashboard/update-entity/" + id;
  };

  const handleViewTerminatedEmployees = () => {
    window.location.href = "/dashboard/terminated-employees/" + id;
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

  const renderEntityNameRow = () => {
    return <span>{populateEntity.name}</span>;
  };
  const renderAddressRow = () => {
    return <span>{populateEntity.address}</span>;
  };
  const renderNumberofEmployeesRow = () => {
    return <span>{populateEntity.size}</span>;
  };
  const renderEmailRow = () => {
    return <span>{populateEntity.email}</span>;
  };

  const columns = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
    },
    { key: "name", name: "Entity Name", renderCell: renderEntityNameRow },
    { key: "address", name: "Address", renderCell: renderAddressRow },
    {
      key: "employees",
      name: "Number of Employees",
      renderCell: renderNumberofEmployeesRow,
    },
    { key: "email", name: "Email", renderCell: renderEmailRow },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setDeleteModalOpen(false);
    setOperationLoading(true);
    DeleteEntity(id)
      .then((res) => {
        console.log(res);
        showToast(res?.data.message, true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
            <h3 className="mt-3 text-sm">
              <span className="-mt-6 font-bold text-red-500">
                Once you delete an entity, there is no going back! <br /> Please
                be certain.
              </span>
              <br />{" "}
              <span className="mt-8">Are you sure you want to delete</span> {""}
              <span className="font-bold">{populateEntity.name}</span>?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full mr-2 text-white rounded-full mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-2 text-white bg-red-500 rounded-full mt-9 mobile:w-full"
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
            placeholder="Search by Entity Name..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div> */}
      {/* {isLoading ? (
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
      )} */}
      {populateEntity.name == "" ? (
        <h3 className="text-gray-300">Entity Deleted</h3>
      ) : (
        <EntityCard
          companyName={populateEntity.name}
          noOfEmployees={populateEntity.size}
          email={populateEntity.email}
          address={populateEntity.address}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleViewTerminatedEmployees={handleViewTerminatedEmployees}
        />
      )}
    </>
  );
}

export default ManageEntity;
