import React from "react";
import Select from "react-select";
import { noOfEmployees } from "../../core/data";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import axios from "axios";
import { formToJSON } from "axios";
import { showToast } from "../../core/hooks/alert";
import {
  GetOneEntity,
  UpdateEntityForm,
} from "../../core/services/entity.service";
import { useParams } from "react-router-dom";

function UpdateEntity() {
  const { id } = useParams();
  const [selectedRangeOption, setSelectedRangeOption] = React.useState(null);
  const [populateEntity, setPopulateEnty] = React.useState({
    name: "",
    address: "",
    size: "",
    email: "",
  });
  const handleChange = (selectedRangeOption) => {
    setSelectedRangeOption(selectedRangeOption);
    console.log(selectedRangeOption);
  };

  React.useEffect(() => {
    GetOneEntity(id)
      .then((response) => {
        console.log(response);
        setPopulateEnty(response.data.entity);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const noOfEmployeess = selectedRangeOption && selectedRangeOption.value;
  const handleEntityForm = (e) => {
    e.preventDefault();
    const updateEntityForm = document.getElementById("update-entity-form");
    const payload = {
      ...formToJSON(updateEntityForm),
      size:
        noOfEmployeess === null || noOfEmployees === ""
          ? populateEntity.size
          : noOfEmployeess,
      entity_id: id,
    };
    UpdateEntityForm(payload)
      .then((res) => {
        showToast(res?.data.message, true);
        setTimeout(() => {
          // window.location.href = "/dashboard/view-entity";
        }, 2000);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <div className="flex">
        <form
          id="update-entity-form"
          className="w-full"
          onSubmit={handleEntityForm}
        >
          <div className="grid-cols-2 gap-3">
            <div className="field">
              <label className="text-sm label bold">Enter Entity Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Company Name"
                  name="name"
                  defaultValue={populateEntity ? populateEntity.name : ""}
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="my-6 field">
              <label className="text-sm label bold">Enter Address(GPS)</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Address"
                  name="address"
                  defaultValue={populateEntity ? populateEntity.address : ""}
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
            <label className="text-sm label bold">
              Select number of employees
            </label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                onChange={handleChange}
                options={noOfEmployees}
                name="size"
                placeholder={populateEntity ? populateEntity.size : ""}
              />
            </div>
            <div className="mt-6 field">
              <label className="text-sm label bold">Enter Email</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="email"
                  placeholder="Email"
                  name="email"
                  defaultValue={populateEntity ? populateEntity.email : ""}
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-8 text-white primary mobile:w-full"
          >
            Update Entity
          </button>
        </form>

        <div className="w-full ml-16">
          <PiBuildingOfficeDuotone
            size={400}
            color="#f0eded
"
          />
        </div>
      </div>
    </>
  );
}

export default UpdateEntity;
