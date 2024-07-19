import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import Select from "react-select";
import {
  AddTaxType,
  DeleteTaxType,
  UpdateTaxType,
} from "../../core/services/tax.service";
import { useTaxComponent, useTaxType } from "../../core/hooks/tax";

function CreateTaxType() {
  const { taxTypeQuery } = useTaxType();
  const { taxComponentQuery } = useTaxComponent();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isPricingModalModalOpen, setPricingModalOpen] = React.useState(false);
  const [taxTypes, setTaxTypes] = React.useState([]);
  const [components, setComponents] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");
  const [updateId, setUpdateId] = React.useState("");
  const [updateModal, setUpdateModal] = React.useState(false);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState();
  const [itemToDelete, setItemToDelete] = React.useState("");

  taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;
  const componentOptionDropdown =
    taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;

  const componentOptions =
    componentOptionDropdown &&
    componentOptionDropdown.map((co, _) => ({
      value: co.id,
      label: co.name,
    }));
  const handleUpdateTaxType = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const updateTaxTypeForm = document.getElementById("update-tax-type-form");

    const payload = {
      ...formToJSON(updateTaxTypeForm),
      applied_on_component: selectedComponent.value,
      tax_type_id: updateId,
    };
    console.log(payload);
    UpdateTaxType(payload)
      .then((res) => {
        setIsUpdateLoading(false);
        showToast(res?.data.message, true);
        updateTaxTypeForm?.reset();
        setUpdateModal(false);
        taxTypeQuery.refetch();
      })
      .catch((error) => {
        setIsUpdateLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  const handleCreateTaxType = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const taxTypeForm = document.getElementById("tax-type-form");

    const payload = {
      ...formToJSON(taxTypeForm),
      applied_on_component: selectedComponent.value,
    };
    console.log(payload);
    AddTaxType(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        taxTypeForm?.reset();
        setPricingModalOpen(false);
        taxTypeQuery.refetch();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(name);
  };

  const handleUpdateClick = (id) => {
    setUpdateModal(true);
    setUpdateId(id);
  };

  const handleComponentChange = (selectedOptions) => {
    setSelectedComponent(selectedOptions);
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
          title="Deactivate"
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
    { key: "periodic", name: "Name" },
    { key: "applied_on_component", name: "Amount" },
  ];

  React.useEffect(() => {
    if (taxTypeQuery && taxTypeQuery.data && taxTypeQuery.data.data) {
      setTaxTypes(taxTypeQuery.data.data.tax_types);
    }
    // GetTaxTypes()
    //   .then((response) => {
    //     console.log("pri: ", response?.data.taxTypes);
    //     setTaxTypes(response?.data.taxTypes);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [taxTypeQuery]);

  const filteredData = taxTypes?.filter((e) => {
    if (query === "") return e.income_name;
    else if (e?.income_name?.toLowerCase().includes(query.toLocaleLowerCase()))
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

  const closeModal = () => {
    setPricingModalOpen(false);
  };
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteTaxType(deleteId)
      .then((response) => {
        showToast(response.data.message, true);
        taxTypeQuery.refetch();
        setOperationLoading(false);
      })
      .catch((error) => {
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
              Are you sure you want to delete <br />
              {""}
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
      <Modal showCloseBtn={true} open={updateModal} close={closeUpdateModal}>
        <form
          id="update-tax-type-form"
          className="p-8 bg-white"
          onSubmit={handleUpdateTaxType}
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
            <div className="mt-8 field">
              <label className="text-sm label bold">Applied on Component</label>
              <Select
                className="w-full"
                value={selectedComponent}
                onChange={handleComponentChange}
                options={componentOptions}
                placeholder="Select Income Type"
              />
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
            {isLoading ? <Loader /> : "Update Tax Type"}
          </button>
        </form>
      </Modal>
      <Modal
        showCloseBtn={true}
        open={isPricingModalModalOpen}
        close={closeModal}
      >
        <form
          id="tax-type-form"
          className="p-8 bg-white"
          onSubmit={handleCreateTaxType}
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
            <div className="mt-8 field">
              <label className="text-sm label bold">Applied on Component</label>
              <Select
                className="w-full"
                value={selectedComponent}
                onChange={handleComponentChange}
                options={componentOptions}
                placeholder="Select Income Type"
              />
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
            {isLoading ? <Loader /> : " Add Tax Type"}
          </button>
        </form>
      </Modal>
      <button
        onClick={() => setPricingModalOpen(true)}
        className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
      >
        Create Tax Type
      </button>

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
              rows={taxTypes || []}
              bottomSummaryRows={summaryRows}
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

export default CreateTaxType;
