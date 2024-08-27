import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import Flatpickr from "react-flatpickr";
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
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import { AddPrice, GetPricing } from "../../core/services/pricing.service";

function TermsAndConditions() {
  const fp = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isPricingModalModalOpen, setPricingModalOpen] = React.useState(false);
  const [prices, setPrices] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");

  const entity_id = localStorage.getItem("entity_id");
  const handleTermsConditionsSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const pricingForm = document.getElementById("pricing-form");
    const payload = {
      ...formToJSON(pricingForm),
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
    { key: "name", name: "Name" },
    { key: "amount", name: "Amount" },
  ];

  React.useEffect(() => {
    GetPricing()
      .then((response) => {
        console.log("pri: ", response?.data.prices);
        setPrices(response?.data.prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = prices?.filter((e) => {
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
    // DeleteIncomeType(deleteId, entity_id)
    //   .then((response) => {
    //     console.log(response);

    //     showToast(response.data.message, true);
    //     setTimeout(() => {
    //       window.location.reload();
    //       setOperationLoading(false);
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     showToast(error.response.data.error, false);
    //   });
  };

  return (
    <>
      <form
        id="terms-and-conditions-form"
        onSubmit={handleTermsConditionsSubmit}
      >
        <h3>Enter Content</h3>
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
              "link",
              "insertTable",
              "mediaEmbed",
              "|",
              "bulletedList",
              "numberedList",
              "indent",
              "outdent",
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
            initialData: "",
            placeholder: "Enter content here",
          }}
        />
        <div className="flex justify-between mt-9">
          <div className="field">
            <label className="text-sm label "> Effective Date</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Effective From"
              ref={fp}
              name="effective_from"
            />
            <button
              type="button"
              className="text-xs"
              onClick={() => {
                if (!fp?.current?.flatpickr) return;
                fp.current.flatpickr.clear();
              }}
            >
              Clear
            </button>
          </div>

          <div className="field">
            <label className="text-sm label "> Expiry Date</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Effective From"
              ref={fp}
              name="effective_from"
            />
            <button
              type="button"
              className="text-xs"
              onClick={() => {
                if (!fp?.current?.flatpickr) return;
                fp.current.flatpickr.clear();
              }}
            >
              Clear
            </button>
          </div>
          <div className="field w-96">
            <label className="text-sm label bold">Enter Version</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Version"
                name="version"
              />
            </div>
          </div>
        </div>

        <button className="w-1/5 py-3 my-8 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full">
          Create Terms and Conditions
        </button>
      </form>

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

      <>
        {isOperationLoading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            <h3 className="mt-24">Added Terms and Conditions</h3>
            <div className="my-8 border-2 border-blue-500 border-dotted">
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
            </div>
          </>
        )}
      </>
    </>
  );
}

export default TermsAndConditions;
