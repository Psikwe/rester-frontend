import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import Select from "react-select";
import Loader from "../../components/loader/_component";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import {
  AddPrice,
  DeletePrice,
  GetPricing,
  UpdatePrice,
} from "../../core/services/pricing.service";
import { currencies } from "../../core/data";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

function CreatePrice() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isPricingModalModalOpen, setPricingModalOpen] = React.useState(false);
  const [prices, setPrices] = React.useState([]);
  const [editorContent, setEditorContent] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [updateId, setUpdateId] = React.useState("");
  const [selectedCurrency, setSelectedCurrency] = React.useState(null);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deleteDone, setDeleteDone] = React.useState(false);
  const [updateDone, setUpdateDone] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");

  const handlePriceSubmit = (e) => {
    // setIsLoading(true);
    e.preventDefault();
    if (selectedCurrency.value == null || selectedCurrency.value == "") {
      showToast("Please select a currency", false);
      return;
    }
    const pricingForm = document.getElementById("pricing-form");

    const payload = {
      ...formToJSON(pricingForm),
      currency: selectedCurrency.value,
      features: [editorContent],
    };

    AddPrice(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        pricingForm?.reset();
        setPricingModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  const handleUpdatePriceSubmit = (e) => {
    // setIsLoading(true);
    e.preventDefault();
    if (selectedCurrency.value == null || selectedCurrency.value == "") {
      showToast("Please select a currency", false);
      return;
    }
    const pricingForm = document.getElementById("pricing-form");

    const payload = {
      ...formToJSON(pricingForm),
      currency: selectedCurrency.value,
      features: [editorContent],
    };

    UpdatePrice(updateId, payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        pricingForm?.reset();
        setUpdateDone(true);
        setUpdateModalOpen(false);
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
    setUpdateId(id);
    setUpdateModalOpen(true);
  };

  const renderActionsRow = (data) => {
    const { id, name } = data.row;
    console.log("price_id: ", data.row);
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
    { key: "amount", name: "Amount" },
  ];

  React.useEffect(() => {
    GetPricing()
      .then((response) => {
        setPrices(response?.data.prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateDone, deleteDone]);

  const filteredData = prices?.filter((e) => {
    if (query === "") return e.name;
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

  const closeModal = () => {
    setPricingModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeletePrice(deleteId)
      .then((response) => {
        console.log(response);
        setDeleteDone(true);
        showToast(response.data.message, true);
        setOperationLoading(false);
      })
      .catch((error) => {
        setOperationLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleCurrencyChange = (selectedRangeOption) => {
    setSelectedCurrency(selectedRangeOption);
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
      <Modal
        open={updateModalOpen}
        showCloseBtn={true}
        close={closeUpdateModal}
        closeOnOverlay
      >
        <form
          id="update-pricing-form"
          className="p-8 bg-white"
          onSubmit={handleUpdatePriceSubmit}
        >
          <h3 className="text-sm mt-9">Pricasding</h3>

          <div className="flex justify-between">
            <div className="w-full">
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

            <div className="w-full ml-2 field">
              <label className="text-sm label bold">Enter Amount</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Amount"
                  name="amount"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-3">
            <div className="w-full">
              <label className="text-sm label bold">Select Currency</label>
              <div className="flex w-full mb-8 row mobile:w-full">
                <Select
                  className="w-full"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                  options={currencies}
                  placeholder="Currency"
                />
              </div>
            </div>
            <div className="w-full ml-3">
              <label className="text-sm label bold">
                Enter Billing Frequency
              </label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Billing Frequency"
                  name="billing_frequency"
                />
              </div>
            </div>
          </div>

          <label className="text-sm label bold">Enter features</label>

          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "|",
                // "link",
                // "insertTable",
                "|",
                // "bulletedList",
                "numberedList",
                // "indent",
                // "outdent",
              ],
              plugins: [
                Bold,
                Essentials,
                Heading,
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                MediaEmbed,
                Paragraph,
                Table,
                Undo,
              ],
              placeholder: "Enter content here",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
              console.log({ event, editor, data });
            }}
          />

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading
                ? `animate-pulse w-1/2 py-2 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
                : `w-1/2 py-2 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
            }
          >
            {isLoading ? <Loader /> : " Add Price"}
          </button>
        </form>
      </Modal>
      <Modal
        showCloseBtn={true}
        open={isPricingModalModalOpen}
        close={closeModal}
      >
        <form
          id="pricing-form"
          className="p-8 bg-white"
          onSubmit={handlePriceSubmit}
        >
          <h3 className="text-sm mt-9">Pricing</h3>

          <div className="flex justify-between">
            <div className="w-full">
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

            <div className="w-full ml-2 field">
              <label className="text-sm label bold">Enter Amount</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Amount"
                  name="amount"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-3">
            <div className="w-full">
              <label className="text-sm label bold">Select Currency</label>
              <div className="flex w-full mb-8 row mobile:w-full">
                <Select
                  className="w-full"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                  options={currencies}
                  placeholder="Currency"
                />
              </div>
            </div>
            <div className="w-full ml-3">
              <label className="text-sm label bold">
                Enter Billing Frequency
              </label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Billing Frequency"
                  name="billing_frequency"
                />
              </div>
            </div>
          </div>

          <label className="text-sm label bold">Enter features</label>

          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "|",
                // "link",
                // "insertTable",
                "|",
                // "bulletedList",
                "numberedList",
                // "indent",
                // "outdent",
              ],
              plugins: [
                Bold,
                Essentials,
                Heading,
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                MediaEmbed,
                Paragraph,
                Table,
                Undo,
              ],
              placeholder: "Enter content here",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
              console.log({ event, editor, data });
            }}
          />

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading
                ? `animate-pulse w-1/2 py-2 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
                : `w-1/2 py-2 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
            }
          >
            {isLoading ? <Loader /> : " Add Price"}
          </button>
        </form>
      </Modal>
      <button
        onClick={() => setPricingModalOpen(true)}
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
              rows={prices || []}
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
