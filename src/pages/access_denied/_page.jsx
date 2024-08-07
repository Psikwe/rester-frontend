import React from "react";
import denial from "../../assets/access_denied.png";
import { clearUserSession } from "../../core/utilities";
import { IoArrowBackCircle } from "react-icons/io5";

function AccessDenied() {
  const goback = () => {
    clearUserSession();
  };
  return (
    <>
      <div className="grid place-items-center duration-500 ease-in fixed z-[1] left-0 top-0 w-full h-full overflow-auto">
        <div>
          <img className="" src={denial} />
          <div
            onClick={goback}
            title="Go back"
            className="flex items-center justify-center mb-6 cursor-pointer"
          >
            <IoArrowBackCircle size={40} />
            Go back to login
          </div>
        </div>
      </div>
    </>
  );
}

export default AccessDenied;
