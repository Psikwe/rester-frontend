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
import { useEmployees } from "../../core/hooks/employees";
import SkeletonLoader from "../../components/skeleton_loading/_component";

function ManageEntity() {
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  localStorage.setItem("entity_id", id);
  const { employeesQuery } = useEmployees(entity_id);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [contentLoading, setContentLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [noOfEmployees, setNoOfEmployees] = React.useState(0);
  const [populateEntity, setPopulateEntity] = React.useState({
    name: "",
    address: "",
    size: "",
    email: "",
  });

  React.useEffect(() => {
    setContentLoading(true);
    GetOneEntity(id)
      .then((response) => {
        setPopulateEntity(response.data.entity);
        setContentLoading(false);
        localStorage.setItem("entity_name", response.data.entity.name);
      })
      .catch((error) => {
        console.log(error);
        setContentLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (employeesQuery && employeesQuery.data && employeesQuery.data.data) {
      setNoOfEmployees(employeesQuery.data.data.employees.length);
    }
  }, [employeesQuery]);

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
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-2 text-white bg-red-500 rounded-full mt-9 mobile:w-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {contentLoading ? (
        <>
          <SkeletonLoader />
        </>
      ) : (
        <>
          {populateEntity.name == "" ? (
            <h3 className="text-gray-300">Entity Deleted</h3>
          ) : (
            <EntityCard
              companyName={populateEntity.name}
              noOfEmployees={noOfEmployees}
              email={populateEntity.email}
              address={populateEntity.address}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleViewTerminatedEmployees={handleViewTerminatedEmployees}
            />
          )}
        </>
      )}
    </>
  );
}

export default ManageEntity;
