import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import {
  CreateIncomeTypeForm,
  DeleteIncomeType,
  GetIncomeTypes,
} from "../../core/services/income.service";
import Loader from "../../components/loader/_component";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { FcSearch } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";

function CreateIncomeType() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isCreateIncomeTypeModalOpen, setIsCreateIncomeTypeModalOpen] =
    React.useState(false);
  const [incomeTypes, setIncomeTypes] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");

  const entity_id = localStorage.getItem("entity_id");
  const handleCreateEmployeeSubmit = (e) => {
    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const incomeForm = document.getElementById("income-type-form");
    const payload = {
      ...formToJSON(incomeForm),
      entity_id: entity_id,
    };
    CreateIncomeTypeForm(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        incomeForm?.reset();
        setIsCreateIncomeTypeModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };

  const handleDelete = (id, income_name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(income_name);
  };

  const renderActionsRow = (data) => {
    const { id, income_name } = data.row;
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
          onClick={() => handleDelete(id, income_name)}
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
    { key: "income_name", name: "Income Name" },
    { key: "income_description", name: "Income Description" },
    { key: "tax_class1", name: "Cat 1" },
    { key: "tax_class2", name: "Cat 2" },
  ];

  React.useEffect(() => {
    GetIncomeTypes(entity_id)
      .then((response) => {
        setIncomeTypes(response?.data.income_types);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = incomeTypes?.filter((e) => {
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
    setIsCreateIncomeTypeModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteIncomeType(deleteId, entity_id)
      .then((response) => {
        console.log(response);

        showToast(response.data.message, true);
        setTimeout(() => {
          window.location.reload();
          setOperationLoading(false);
        }, 2000);
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
      <Modal
        showCloseBtn={true}
        open={isCreateIncomeTypeModalOpen}
        close={closeModal}
      >
        <form
          id="income-type-form"
          className="p-8 bg-white"
          onSubmit={handleCreateEmployeeSubmit}
        >
          <h3 className="text-sm mt-9">Income Type</h3>
          <div className="grid grid-cols-3 gap-3">
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

            <div className="field">
              <label className="text-sm label bold">
                Enter Income Description
              </label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Income Description"
                  name="income_description"
                />
              </div>
            </div>
            <div className="field">
              <label className="text-sm label bold">Enter Tax 1</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Tax 1"
                  name="tax_class1"
                />
              </div>
            </div>
            <div className="mt-3 field">
              <label className="text-sm label bold">Enter Tax 2</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Tax 2"
                  name="tax_class2"
                />
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading
                ? `animate-pulse w-full py-3 mb-3 text-white bg-[#0DCAF0] mt-9 mobile:w-full`
                : `w-full py-3 mb-3 text-white bg-[#0DCAF0] mt-9 mobile:w-full`
            }
          >
            {isLoading ? <Loader /> : " Add Employee Income Type"}
          </button>
        </form>
      </Modal>
      <button
        onClick={() => setIsCreateIncomeTypeModalOpen(true)}
        className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
      >
        Create Income Type
      </button>
      <div className="flex flex-wrap w-full gap-3 px-4 py-3 mb-6 bg-slate-200">
        <div className="relative w-full mb-2">
          <div className="absolute left-0 flex items-center pl-3 pointer-events-none top-5">
            <FcSearch />
          </div>
          <input
            type="text"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            placeholder="Search by Income Type..."
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
  );
}

export default CreateIncomeType;
