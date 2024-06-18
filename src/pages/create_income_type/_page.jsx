import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import {
  CreateIncomeTypeForm,
  GetIncomeTypes,
} from "../../core/services/income.service";
import Loader from "../../components/loader/_component";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { FcSearch } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { CiLock } from "react-icons/ci";

function CreateIncomeType() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isCreateIncomeTypeModalOpen, setIsCreateIncomeTypeModalOpen] =
    React.useState(false);
  const [incomeTypes, setIncomeTypes] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);

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

  const renderActionsRow = (data) => {
    const { id, first_name } = data.row;
    return (
      <div className="flex items-center mt-1">
        {/* <button title="Delete" onClick={() => handleDeleteClick(id, name)}>
          <MdDelete color="red" size={18} />
        </button> */}
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
    { key: "tax_class1", name: "Tax Class 1" },
    { key: "tax_class2", name: "Tax Class 2" },
  ];

  React.useEffect(() => {
    GetIncomeTypes(entity_id)
      .then((response) => {
        console.log("it: ", response);
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

  return (
    <>
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
