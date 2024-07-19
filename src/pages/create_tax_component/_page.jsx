import React from "react";
import {
  AddTaxComponent,
  DeleteTaxComponent,
  UpdateTaxComponent,
} from "../../core/services/tax.service";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";
import DataGrid from "react-data-grid";
import { formToJSON } from "axios";
import Select from "react-select";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { useTaxComponent, useTaxType } from "../../core/hooks/tax";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsExclamationCircleFill } from "react-icons/bs";

function CreateTaxComponent() {
  const { taxTypeQuery } = useTaxType();
  const { taxComponentQuery } = useTaxComponent();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [taxTypeModal, setTaxTypeModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [updateId, setUpdateId] = React.useState("");
  const [updateModal, setUpdateModal] = React.useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [taxTypes, setTaxTypes] = React.useState([]);
  const [selectedComponent, setSelectedComponent] = React.useState();
  const [itemToDelete, setItemToDelete] = React.useState("");

  taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;
  const taxComponents =
    taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;
  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(name);
  };

  const handleUpdateClick = (id) => {
    setUpdateModal(true);
    setUpdateId(id);
  };

  const renderActionsRow = (data) => {
    const { id, name } = data.row;
    return (
      <div className="flex items-center mt-4">
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
          onClick={() => handleDelete(id, name)}
        >
          <MdDelete color="red" size={18} />
        </button>{" "}
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
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
  ];

  const handleTaxComponent = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const componentForm = document.getElementById("tax-component-form");
    const payload = {
      ...formToJSON(componentForm),
    };

    AddTaxComponent(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        componentForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleUpdateTaxComponent = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const updateTaxTypeForm = document.getElementById("update-tax-type-form");

    const payload = {
      ...formToJSON(updateTaxTypeForm),
      tax_component_id: updateId,
    };
    console.log(payload);
    UpdateTaxComponent(payload)
      .then((res) => {
        setIsUpdateLoading(false);
        showToast(res?.data.message, true);
        updateTaxTypeForm?.reset();
        setUpdateModal(false);
        taxComponentQuery.refetch();
      })
      .catch((error) => {
        setIsUpdateLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const closeModal = () => {
    setTaxTypeModal(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleComponentChange = (selectedOptions) => {
    setSelectedComponent(selectedOptions);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteTaxComponent(deleteId)
      .then((response) => {
        showToast(response.data.message, true);
        taxComponentQuery.refetch();
        setOperationLoading(false);
      })
      .catch((error) => {
        setOperationLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  return (
    <>
      <button
        onClick={() => setTaxTypeModal(true)}
        className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
      >
        Create Tax Component
      </button>

      <Modal showCloseBtn={true} open={updateModal} close={closeUpdateModal}>
        <form
          id="update-tax-type-form"
          className="p-8 bg-white"
          onSubmit={handleUpdateTaxComponent}
        >
          <div className="">
            <div className="field w-96">
              <label className="text-sm label bold">Enter Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder=" Name"
                  name="name"
                />
              </div>
            </div>
            <div className="mt-8 field">
              <label className="text-sm label bold">Enter Periodic</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Amount"
                  name="periodic"
                />
              </div>
            </div>
          </div>

          <button
            disabled={isUpdateLoading}
            type="submit"
            className={
              isUpdateLoading
                ? `animate-pulse w-1/2 py-3 mb-3 text-white text-sm primary rounded-full mt-9 mobile:w-full`
                : `w-1/2 py-3 mb-3 text-white primary rounded-full text-sm mt-9 mobile:w-full`
            }
          >
            {isUpdateLoading ? <Loader /> : "Update Tax Component"}
          </button>
        </form>
      </Modal>

      <Modal open={deleteModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to delete{" "}
              <b className="font-bold">{itemToDelete}</b>?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 mr-2 text-white rounded-full mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDeactivate}
                className="w-full py-2 text-white bg-red-500 rounded-full mt-9 mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal showCloseBtn={true} open={taxTypeModal} close={closeModal}>
        <form
          id="tax-component-form"
          className="p-8 bg-white"
          onSubmit={handleTaxComponent}
        >
          <div className="">
            <div className="field w-96">
              <label className="text-sm label bold">Enter Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Name"
                  name="name"
                />
              </div>
            </div>

            <div className="mt-8 field w-96">
              <label className="text-sm label bold">Enter Description</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Description"
                  name="description"
                />
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading
                ? `animate-pulse w-1/2 py-3 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
                : `w-1/2 py-3 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
            }
          >
            {isLoading ? <Loader /> : "Create Component"}
          </button>
        </form>
      </Modal>

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
              rows={taxComponents || []}
              // bottomSummaryRows={summaryRows}
              rowHeight={50}
            />
            <strong className="text-sm">
              {/* Totals: {filteredData?.length} records */}
            </strong>
          </>
        )}
      </>
    </>
  );
}

export default CreateTaxComponent;
