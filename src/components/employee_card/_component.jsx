import React from "react";
import companyIcon from "../../assets/icons/worker.svg";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function EmployeeCard(props) {
  return (
    <div className="block p-6 bg-white rounded-lg bg-gradient-to-l drop-shadow-2xl text-slate-400 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-4 text-sm">
            <span className="text-[#0DCAF0]">{props.fullName}</span>{" "}
          </p>
          <p className="mb-4 text-sm">
            <span className="text-[#0DCAF0]">{props.email}</span>
          </p>
          <p className="mb-4 text-sm">
            {" "}
            <span className="text-[#0DCAF0]">{props.ghanaCardNo}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
