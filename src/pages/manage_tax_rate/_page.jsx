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
import {
  AddTaxType,
  DeleteIncomeTaxRate,
  DeleteTaxType,
  GetTaxTypes,
} from "../../core/services/tax.service";
import { useIncomeTaxRate } from "../../core/hooks/tax";

function ManageTaxRate() {
  const { incomeTaxRatesQuery } = useIncomeTaxRate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isPricingModalModalOpen, setPricingModalOpen] = React.useState(false);
  const [taxTypes, setTaxTypes] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");

  const handleCreateTaxType = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const taxTypeForm = document.getElementById("tax-type-form");
    let appliedOnComponent = document.getElementById(
      "applied_on_component"
    ).value;
    const payload = {
      ...formToJSON(taxTypeForm),
      applied_on_component: appliedOnComponent,
    };

    AddTaxType(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        taxTypeForm?.reset();
        setPricingModalOpen(false);
        incomeTaxRatesQuery.refetch();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleUpdateClick = (id) => {
    window.location.href = "update-tax-rate/" + id;
  };

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(name);
  };

  const renderActionsRow = (data) => {
    const { uid, name } = data.row;
    return (
      <div className="flex items-center mt-4">
        <button
          className="mb-2 ml-3"
          title="Update"
          onClick={() => handleUpdateClick(uid)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="mb-2 ml-3"
          title="Delete"
          onClick={() => handleDelete(uid, name)}
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
    // { key: "uid", name: "UID" },
    { key: "chargeable_income_min", name: "Chargeable Income Min" },
    { key: "chargeable_income_max", name: "Chargeable Income Max" },
    { key: "chargeable_income_max", name: "Chargeable Income Max" },
    { key: "range_rate", name: "Range Rate" },
    { key: "effective_from", name: "Effective From" },
    { key: "effective_to", name: "Effective To" },
    { key: "distributed", name: "Distributed" },
    { key: "order_no", name: "Order Number" },
  ];

  React.useEffect(() => {
    if (
      incomeTaxRatesQuery &&
      incomeTaxRatesQuery.data &&
      incomeTaxRatesQuery.data.data
    ) {
      console.log(incomeTaxRatesQuery.data.data.income_tax_rates);
      setTaxTypes(incomeTaxRatesQuery.data.data.income_tax_rates);
    }
    // GetTaxTypes()
    //   .then((response) => {
    //     console.log("pri: ", response?.data.taxTypes);
    //     setTaxTypes(response?.data.taxTypes);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [incomeTaxRatesQuery.data]);

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

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteIncomeTaxRate(deleteId)
      .then((response) => {
        showToast(response.data.message, true);
        incomeTaxRatesQuery.refetch();
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
              <span className="-mt-6 font-bold text-red-500">
                Once you {itemToDelete} there is no going back! <br /> Please be
                certain.
              </span>
              <br /> Are you sure you want to delete this Tax Rate
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
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Component"
                  id="applied_on_component"
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
            {isLoading ? <Loader /> : " Add Tax Type"}
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
            {taxTypes.length < 1 ? (
              <h3>No Data</h3>
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
        )}
      </>
    </>
  );
}

export default ManageTaxRate;
