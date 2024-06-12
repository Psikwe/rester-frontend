import React from "react";
import { companies } from "../../core/data";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import CompanyCard from "../../components/card/_component";
import SkeletonLoader from "../../components/skeleton_loading/_component";
import { BsExclamationCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Modal from "../../components/modal/_component";
import { clearUserSession } from "../../core/utilities";

function ViewCompany() {
  const [isSkeletonLoading, setSkeletonLoading] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  const [company, setCompany] = React.useState([
    {
      id: "",
      name: "",
      size: "",
      email: "",
      address: "",
    },
  ]);
  React.useEffect(() => {
    axios
      .get("https://rester-82c60dc37022.herokuapp.com/get_entities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("u_token")}`,
        },
      })
      .then((res) => {
        setSkeletonLoading(false);
        setCompany(res.data.entities);
        localStorage.setItem("entity_id", id);
      })
      .catch((error) => {
        console.log("comp: ", error);
      });
  }, []);

  const navLists = [
    {
      name: "Dashboard",
      link: "/",
    },
    {
      name: "Trips",
      link: "/trips",
    },
  ];
  const handleLogout = () => {
    clearUserSession();
    // window.location.href = "/";
  };
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };
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
              className="w-full py-3 mr-2 text-white mt-9 primary mobile:w-full"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 text-white bg-red-500 mt-9 mobile:w-full"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <nav className="sticky top-0 z-10 flex justify-between p-6 text-gray-500 bg-white shadow-2xl">
        <div className="flex items-center ml-4 text-left">
          <div className="w-full mr-4 text-2xl font-semibold text-black mobile:text-xs">
            <b>R</b>ester
          </div>
        </div>

        {/* ************** Desktop Nav ***************/}
        <div
          onClick={openLogoutModal}
          className="flex items-center cursor-pointer mobile:hidden fade-in"
        >
          <CiLogout size={40} />
        </div>
      </nav>
      <div className="mx-48 mt-10 laptop-lg:mx-20">
        <div className="flex items-center">
          <div className="inline-block  h-14 w-3 bg-[#87bdd5]"></div>
          <h3 className="ml-3 text-gray-500">
            Please select entity you want to operate.
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10 slide-in-right">
          {isSkeletonLoading ? (
            [1, 2, 3].map((e, i) => <SkeletonLoader key={i} />)
          ) : (
            <>
              {company.map((c, i) => (
                <div className="slide-in-right" key={i}>
                  <CompanyCard
                    // passage={c.passage}
                    noOfEmployees={c.size}
                    companyName={c.name}
                    href={`/dashboard/manage-entity/${c.id}`}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewCompany;
