import React from "react";
import companyIcon from "../../assets/icons/company.png";
import { IoEyeSharp } from "react-icons/io5";

function CompanyCard(props) {
  return (
    <div className="block p-6 bg-white rounded-lg drop-shadow-2xl text-slate-400 ">
      <img className="w-24 h-24" src={companyIcon} />
      <p className="mb-4 text-base">Company Name: {props.companyName}</p>
      <p className="mb-4 text-base">
        Number of employees: {props.noOfEmployees}
      </p>
      <a href={props.href}>
        <button
          type="button"
          className="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          <span className="mr-1">
            <IoEyeSharp />
          </span>
          View Details
        </button>
      </a>
    </div>
  );
}

export default CompanyCard;
