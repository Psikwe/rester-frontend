import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import axios, { formToJSON } from "axios";
import { CiLogout } from "react-icons/ci";
import Select from "react-select";
import CompanyCard from "../../components/card/_component";
import { IoMdAdd } from "react-icons/io";
import SkeletonLoader from "../../components/skeleton_loading/_component";
import { BsExclamationCircle } from "react-icons/bs";
import Modal from "../../components/modal/_component";
import { clearUserSession } from "../../core/utilities";
import { CreateEntityForm } from "../../core/services/entity.service";
import { noOfEmployees } from "../../core/data";
import logo from "../../assets/rester.png";
import Loader from "../../components/loader/_component";
import { showToast } from "../../core/hooks/alert";

function ViewCompany() {
  const [isSkeletonLoading, setSkeletonLoading] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [createEntityModal, setCreateEntityModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRangeOption, setSelectedRangeOption] = React.useState(null);

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
  const closeEntityModal = () => {
    setCreateEntityModal(false);
  };

  const handleChange = (selectedRangeOption) => {
    setSelectedRangeOption(selectedRangeOption);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const companyForm = document.getElementById("company-form");
    const payload = {
      ...formToJSON(companyForm),
      size: selectedRangeOption.value,
    };
    console.log(payload);
    CreateEntityForm(payload)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        showToast(res?.data.message, true);
        companyForm?.reset();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
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
      <Modal
        showCloseBtn={true}
        open={createEntityModal}
        close={closeEntityModal}
      >
        <div className="w-full bg-white p-14">
          <form
            id="company-form"
            className="w-full"
            onSubmit={handleCompanySubmit}
          >
            <div className="grid-cols-2 gap-3">
              <div className="field w-96">
                <label className="text-sm label bold">Enter Entity Name</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="Company Name"
                    name="name"
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
                  value={selectedRangeOption}
                  onChange={handleChange}
                  options={noOfEmployees}
                  placeholder="Number of employees"
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
                  />
                </div>
                {/* <p className="help">This is a help text</p> */}
              </div>
            </div>

            <button
              type="submit"
              className="w-full  py-3 mt-8 text-white bg-[#0DCAF0] mobile:w-full"
            >
              {isLoading ? <Loader /> : " Add Company"}
            </button>
          </form>
        </div>
      </Modal>
      <nav className="sticky top-0 z-10 flex justify-between h-20 p-6 text-gray-500 bg-white shadow-2xl">
        <div className="flex items-center ml-4 text-left">
          <div className="w-full mr-4 text-2xl font-semibold text-black mobile:text-xs">
            <img className="w-24" src={logo} />
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
        <div className="flex items-center w-1/3 bg-[#d4f2ff]">
          <div className="inline-block  h-24 w-1 bg-[#6ccef5]"></div>
          <h3 className="flex items-center ml-3 text-gray-500">
            <FaCircleInfo size={25} className="mr-2" />
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
          <div
            onClick={() => setCreateEntityModal(true)}
            className="flex items-center cursor-pointer"
          >
            <IoMdAdd size={30} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCompany;
