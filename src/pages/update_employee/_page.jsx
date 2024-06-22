import React from "react";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";
import {
  GetEmployeeProfile,
  UpdateEmployeeProfile,
} from "../../core/services/employee.service";
import { formToJSON } from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function UpdateEmployee() {
  const fp = React.useRef(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [employeeDetails, setEmployeeDetails] = React.useState({});

  React.useEffect(() => {
    GetEmployeeProfile()
      .then((response) => {
        setEmployeeDetails(response.data.employee);
        console.log("ee: ", response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  let dateOfBirth = moment(employeeDetails.data_of_birth).format("YYYY-MM-DD");

  const handleUpdateEmployee = (e) => {
    let dobValue = document.getElementById("date-of-birth");
    setIsLoading(true);
    e.preventDefault();
    const employeeForm = document.getElementById("employee-form");
    const payload = {
      ...formToJSON(employeeForm),
      date_of_birth: dobValue.value.length === 0 ? dateOfBirth : dobValue.value,
    };

    UpdateEmployeeProfile(payload)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        showToast(res?.data.message, true);
        // companyForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  return (
    <>
      <form id="employee-form" onSubmit={handleUpdateEmployee}>
        <h3 className="mb-3 text-sm">Basic Information</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
            <label className="text-sm label bold">Enter First Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="First Name"
                name="first_name"
                defaultValue={employeeDetails.first_name}
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Last Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Last Name"
                name="last_name"
                defaultValue={employeeDetails.last_name}
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Other Names</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Other Names"
                name="other_names"
                defaultValue={employeeDetails.other_names}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Select Date Of Birth</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder={dateOfBirth}
              ref={fp}
              name="date_of_birth"
              id="date-of-birth"
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
            <label className="text-sm label bold">Enter Address</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Address"
                name="address"
                defaultValue={employeeDetails.address}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Enter Permanent Address
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Permanent Address"
                name="permanent_address"
                defaultValue={employeeDetails.permanent_address}
              />
            </div>
          </div>
          <div className=" field">
            <label className="text-sm label bold">Enter Email</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="email"
                placeholder="Email"
                name="email"
                defaultValue={employeeDetails.email}
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Phone Number</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Phone Number"
                name="phone"
                defaultValue={employeeDetails.phone}
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Nationality</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="nationality"
                name="nationality"
                defaultValue={employeeDetails.nationality}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Tin</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Tin"
                name="tin"
                defaultValue={employeeDetails.tin}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Enter Ghana Card Number
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Ghana Card Number"
                name="ghana_card_id"
                defaultValue={employeeDetails.ghana_card_id}
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
          {isLoading ? <Loader /> : "Update"}
        </button>
      </form>
    </>
  );
}

export default UpdateEmployee;
