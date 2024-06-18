import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import SkeletonLoader from "../../components/skeleton_loading/_component";
import { BsExclamationCircle } from "react-icons/bs";
import Modal from "../../components/modal/_component";
import { clearUserSession } from "../../core/utilities";
import { GetAllEmployees } from "../../core/services/employee.service";
import EmployeeCard from "../../components/employee_card/_component";
import { NavLink } from "react-router-dom";

function ViewEmployees() {
  const entity_id = localStorage.getItem("entity_id");
  const [isSkeletonLoading, setSkeletonLoading] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  React.useEffect(() => {
    GetAllEmployees(entity_id)
      .then((response) => {
        console.log("ent: ", response);
        setSkeletonLoading(false);
        setEmployees(response?.data.employees);
      })
      .catch((error) => {
        console.log("comp: ", error);
      });
  }, []);

  const handleLogout = () => {
    clearUserSession();
    // window.location.href = "/";
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const filteredData = employees?.filter((e) => {
    if (query === "" && e.is_disabled == false) {
      return e;
    } else if (
      e?.first_name?.toLowerCase().includes(query.toLocaleLowerCase()) &&
      e.is_disabled == false
    )
      return e;
  });
  return (
    <>
      <Modal open={isLogoutModalOpen} close={closeLogoutModal}>
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <BsExclamationCircle size={70} color="red" />
          </div>

          <p>Are you sure you want to logout?</p>
          <div className="flex">
            <button
              onClick={closeLogoutModal}
              className="w-full py-2 mr-2 text-white mt-9 primary mobile:w-full"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 text-white bg-red-500 mt-9 mobile:w-full"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <div className="mt-10 laptop-lg:mx-20">
        <div className="flex items-center w-1/2 bg-[#d4f2ff]">
          <div className="inline-block  h-24 w-1 bg-[#6ccef5]"></div>
          <h3 className="flex items-center ml-3 text-gray-500">
            <FaCircleInfo size={25} className="mr-2" />
            Please select employee you want to manage loan.
          </h3>
        </div>
        <div className="flex flex-wrap w-full gap-3 px-4 py-3 my-6 bg-slate-200">
          <div className="relative w-full mb-2">
            <div className="absolute left-0 flex items-center pl-3 pointer-events-none top-5">
              <FcSearch />
            </div>
            <input
              type="text"
              className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Search by Employee First Name..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-10 slide-in-right">
          {isSkeletonLoading ? (
            [1, 2, 3].map((e, i) => <SkeletonLoader key={i} />)
          ) : (
            <>
              {filteredData.map((e, i) => (
                <a href={`/dashboard/manage-employee-loans/` + e.id}>
                  <div className="slide-in-right" key={i}>
                    <EmployeeCard
                      fullName={e.first_name + " " + e.last_name}
                      email={e.email}
                      ghanaCardNo={e.ghana_card_id}
                    />
                  </div>{" "}
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewEmployees;
