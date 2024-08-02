import React from "react";
import "react-data-grid/lib/styles.css";
import { formToJSON } from "axios";
import Select from "react-select";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import Loader from "../../components/loader/_component";
import { MdDelete } from "react-icons/md";
import {
  CreateEmployeePension,
  DeleteEmployeeLoan,
  DeleteEmployeePension,
  GetAllEmployeeLoans,
  GetEmployeePensions,
  SubmitEmployeeLoan,
} from "../../core/services/employee.service";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { showToast } from "../../core/hooks/alert";
import { useParams } from "react-router-dom";
import { useTaxComponent } from "../../core/hooks/tax";
import {
  calculation,
  contributors,
  countries,
  pensionTypes,
} from "../../core/data";

function ManageEmployeePensions() {
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  const { taxComponentQuery } = useTaxComponent();
  localStorage.setItem("employee_id", id);
  const [query, setQuery] = React.useState("");
  const [selectedContributor, setSelectedContributor] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [selectedCalculation, setSelectedCalculation] = React.useState(null);
  const [selectedComponent, setSelectedComponent] = React.useState();
  const [isContentLoading, setContentLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [employeePensions, setEmployeePensions] = React.useState([]);
  const [baseOptions, setBaseOptions] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createLoan, setCreateLoan] = React.useState(false);
  const [isDoneAdding, setIsDoneAdding] = React.useState(false);

  const handleUpdateClick = (id) => {
    window.location.href = "/dashboard/update-employee-pension/" + id;
  };

  const handleNavigateToEmployeeLoan = (id) => {
    window.location.href = "/dashboard/create-employee-loan/" + id;
  };

  const handleNavigateToTerminateEmployee = (id) => {
    window.location.href = "/dashboard/terminate-employee/" + id;
  };

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    setItemToDelete(name);
  };

  const renderActionsRow = (data) => {
    const { pension_id, employee_name } = data.row;
    return (
      <div className="flex items-center mt-4">
        {/* <button title="Delete" onClick={() => handleDeleteClick(id, name)}>
          <MdDelete color="red" size={18} />
        </button> */}
        <button
          className="mb-2 ml-3"
          title="Update"
          onClick={() => handleUpdateClick(pension_id)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="mb-2 ml-3"
          title="Delete"
          onClick={() => handleDelete(pension_id, employee_name)}
        >
          <MdDelete color="red" size={18} />
        </button>
      </div>
    );
  };

  const renderStatutory = (data) => {
    const { statutory_or_not } = data.row;
    return <div> {statutory_or_not ? "Yes" : "No"}</div>;
  };

  const columns = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
    { key: "employee_name", name: "Amount" },
    { key: "amount", name: "Amount" },
    { key: "base", name: "Base" },
    { key: "calculation", name: "Calculation" },
    { key: "pension_name", name: "Pension Name" },
    { key: "rate", name: "Rate" },
    {
      key: "statutory_or_not",
      name: "Statutory Or Not",
      renderCell: renderStatutory,
    },
  ];

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const closeLoanModal = () => {
    setCreateLoan(false);
  };

  const confirmDelete = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteEmployeePension(deleteId)
      .then((response) => {
        setOperationLoading(false);
        showToast(response.data.message, true);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((error) => {
        setOperationLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleEmployeePension = (e) => {
    if (selectedComponent === null || selectedComponent === undefined) {
      showToast("Please select a base", false);
      return;
    }
    if (selectedCalculation === null || selectedCalculation === undefined) {
      showToast("Please select a base", false);
      return;
    }
    if (selectedContributor === null || selectedContributor === undefined) {
      showToast("Please select a base", false);
      return;
    }
    if (selectedType === null || selectedType === undefined) {
      showToast("Please select a base", false);
      return;
    }

    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const pensionForm = document.getElementById("employee-pension-form");
    const payload = {
      ...formToJSON(pensionForm),
      employee_id: id,
      base: selectedComponent.value,
      calculation: selectedCalculation.value,
      contributor: selectedContributor.value,
      type: selectedType.value,
      statutory_or_not: isChecked,
    };
    CreateEmployeePension(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        pensionForm?.reset();
        setCreateLoan(false);
        setIsDoneAdding(true);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  React.useEffect(() => {
    setContentLoading(true);
    GetEmployeePensions(entity_id)
      .then((response) => {
        setContentLoading(false);
        setEmployeePensions(response?.data.pensions);
        console.log("res: ", response);
      })
      .catch((error) => {
        setContentLoading(false);
        console.log(error);
      });
  }, [isDoneAdding]);

  const filteredData = employeePensions?.filter((e) => {
    if (query === "" && e.is_disabled == false) return e;
    else if (
      e?.loan_provider?.toLowerCase().includes(query.toLocaleLowerCase()) &&
      e.is_disabled == false
    )
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleContributorChange = (selectedRangeOption) => {
    setSelectedContributor(selectedRangeOption);
  };

  const handleTypeChange = (selectedRangeOption) => {
    setSelectedType(selectedRangeOption);
  };

  const handleCalculationChnage = (selectedRangeOption) => {
    setSelectedCalculation(selectedRangeOption);
  };

  taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;
  const componentOptionDropdown =
    taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;

  const componentOptions =
    componentOptionDropdown &&
    componentOptionDropdown.map((co, _) => ({
      value: co.id,
      label: co.name,
    }));

  const handleComponentChange = (selectedOptions) => {
    setSelectedComponent(selectedOptions);
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
              Are you sure you want to delete {""}
              <b className="font-bold">{itemToDelete}'s</b> pension?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 mr-2 text-white mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
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
        open={createLoan}
        close={closeLoanModal}
        closeOnOverlay
      >
        <div className="p-10 bg-white">
          <form id="employee-pension-form" onSubmit={handleEmployeePension}>
            <div className="grid grid-cols-3 gap-3">
              <div className="field">
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
              <div className="field">
                <label className="text-sm label bold">Select Base</label>
                <Select
                  className="w-full"
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  options={componentOptions}
                  placeholder="Base"
                />
              </div>

              <div className="w-full mr-2">
                <label className="text-sm label">Select Calculation</label>
                <div className="flex w-full row mobile:w-full">
                  <Select
                    className="w-full"
                    value={selectedCalculation}
                    onChange={handleCalculationChnage}
                    options={calculation}
                    placeholder="Calculation"
                  />
                </div>
              </div>
              <div className="mt-4 w-full mr-2">
                <label className="text-sm label">Select Contributor</label>
                <div className="flex w-full row mobile:w-full">
                  <Select
                    className="w-full"
                    value={selectedContributor}
                    onChange={handleContributorChange}
                    options={contributors}
                    placeholder="Contributor"
                  />
                </div>
              </div>
              <div className="mt-4 field">
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
              <div className="mt-4 field">
                <label className="text-sm label bold">Enter Rate</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="number"
                    placeholder="Rate"
                    name="rate"
                  />
                </div>
              </div>
              <div className="mt-7 flex flex-col field">
                <label className="mb-1 text-sm label bold">
                  Toggle Statutory Or Not
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00eeff]"></div>
                </label>
              </div>
              <div className="mt-4 w-full mr-2">
                <label className="text-sm label">Select Type</label>
                <div className="flex w-full row mobile:w-full">
                  <Select
                    className="w-full"
                    value={selectedType}
                    onChange={handleTypeChange}
                    options={pensionTypes}
                    placeholder="Contributor"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={
                isLoading
                  ? `animate-pulse w-1/3 py-2 mb-3 rounded-full text-white primary mt-9 mobile:w-full`
                  : `w-1/3 py-2 mb-3 rounded-full text-white primary mt-9 mobile:w-full`
              }
            >
              {isLoading ? <Loader /> : " Add Employee Pension"}
            </button>
          </form>
        </div>
      </Modal>

      <button
        onClick={() => setCreateLoan(true)}
        className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
      >
        Create Pension
      </button>
      {isContentLoading ? (
        <>
          <TableLoader />
        </>
      ) : (
        <>
          {!isContentLoading && employeePensions.length === 0 ? (
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
                    rows={employeePensions || []}
                    bottomSummaryRows={summaryRows}
                    rowHeight={50}
                  />
                  <strong className="text-sm">
                    Totals: {employeePensions?.length} records
                  </strong>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default ManageEmployeePensions;
