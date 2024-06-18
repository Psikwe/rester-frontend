import React from "react";
import companyIcon from "../../assets/icons/worker.svg";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function EmployeeCard(props) {
  return (
    <div className="block p-6 bg-white rounded-lg bg-gradient-to-l from-blue-100 drop-shadow-2xl text-slate-400 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-4 text-sm">
            Full Name: <span className="text-[#0DCAF0]">{props.fullName}</span>{" "}
          </p>
          <p className="mb-4 text-sm">
            Email: <span className="text-[#0DCAF0]">{props.email}</span>
          </p>
          <p className="mb-4 text-sm">
            Ghana Card Number:{" "}
            <span className="text-[#0DCAF0]">{props.ghanaCardNo}</span>{" "}
          </p>

          {/* <hr className="my-4" />
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
          </div> */}
        </div>
        <div>
          <img className="w-24 h-24" src={companyIcon} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
