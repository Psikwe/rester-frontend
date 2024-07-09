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

function CreatePrice() {
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
    // setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const incomeForm = document.getElementById("income-type-form");
    const payload = {
      ...formToJSON(incomeForm),
      entity_id: entity_id,
    };

    alert("not implemented");
    // CreateIncomeTypeForm(payload)
    //   .then((res) => {
    //     setIsLoading(false);
    //     showToast(res?.data.message, true);
    //     incomeForm?.reset();
    //     setIsCreateIncomeTypeModalOpen(false);
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     showToast(error.response.data.error, false);
    //   });
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
    { key: "", name: "Name" },
    { key: "", name: "Amount" },
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
          <h3 className="text-sm mt-9">Pricing</h3>
          <div className="">
            <div className="field w-96">
              <label className="text-sm label bold">Enter Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder=" Name"
                  name="income_name"
                />
              </div>
            </div>

            <div className="field mt-8">
              <label className="text-sm label bold">Enter Amount</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Amount"
                  name="income_description"
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
            {isLoading ? <Loader /> : " Add Price"}
          </button>
        </form>
      </Modal>
      <button
        onClick={() => setIsCreateIncomeTypeModalOpen(true)}
        className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
      >
        Create Price
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
              rows={filteredData || []}
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

export default CreatePrice;
