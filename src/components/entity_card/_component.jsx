import React from "react";
import companyIcon from "../../assets/icons/company.svg";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function EntityCard(props) {
  return (
    <div className="block w-1/2 p-6 bg-white rounded-lg drop-shadow-2xl text-slate-400 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-4 text-sm">
            {/* Company Name:{" "} */}
            <span className="text-[#0DCAF0]">{props.companyName}</span>{" "}
          </p>
          <p className="mb-4 text-sm">
            {/* Number of employees:{" "} */}
            <span className="text-[#0DCAF0]">{props.noOfEmployees}</span>
          </p>
          <p className="mb-4 text-sm">
            <span className="text-[#0DCAF0]">{props.email}</span>{" "}
          </p>
          <p className="mb-4 text-sm">
            <span className="text-[#0DCAF0]">{props.address}</span>{" "}
          </p>
          <hr className="my-4" />
          <div className="flex items-center text-sm">
            <button
              className="flex items-center ml-2"
              title="Update"
              onClick={() => props.handleUpdate()}
            >
              <FiEdit color="green" size={18} /> Update
            </button>
            <button
              className="flex items-center ml-2"
              title="Delete"
              onClick={() => props.handleDelete()}
            >
              <MdDelete color="red" size={18} /> Delete
            </button>
            <button
              className="flex items-center ml-2"
              title="Delete"
              onClick={() => props.handleViewTerminatedEmployees()}
            >
              <RiIndeterminateCircleLine color="red" size={18} /> Terminated
              Employees
            </button>
          </div>
        </div>
        <div>
          <img className="w-24 h-24" src={companyIcon} />
        </div>
      </div>
    </div>
  );
}

export default EntityCard;
