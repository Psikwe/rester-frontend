import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import Flatpickr from "react-flatpickr";
import Loader from "../../components/loader/_component";
import {
  SubmitEmployeeLoan,
  SubmitTerminateEmployee,
} from "../../core/services/employee.service";
import { useParams } from "react-router-dom";

function TerminateEmployee() {
  const { id } = useParams();
  const fp = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreateEmployeeSubmit = (e) => {
    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const terminateEmploymentForm = document.getElementById(
      "terminate-employee-form"
    );
    const payload = {
      ...formToJSON(terminateEmploymentForm),
      employee_id: id,
      entity_id: entity_id,
    };
    SubmitTerminateEmployee(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        terminateEmploymentForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <form id="terminate-employee-form" onSubmit={handleCreateEmployeeSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Select Date Of Termination
            </label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Date of Termination"
              ref={fp}
              name="date_of_termination"
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
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Enter Reason For Termination
            </label>
            <div className="control">
              <textarea
                rows={5}
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Reason"
                name="reason_for_termination"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={
            isLoading
              ? `animate-pulse w-full py-3 mb-3 text-white bg-red-600 mt-9 mobile:w-full`
              : `w-full py-3 mb-3 text-white bg-red-600 mt-9 mobile:w-full`
          }
        >
          {isLoading ? <Loader /> : "Terminate Employee"}
        </button>
      </form>
    </>
  );
}

export default TerminateEmployee;
