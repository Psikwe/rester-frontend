import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import SkeletonLoader from "../../components/skeleton_loading/_component";
import { BsExclamationCircle } from "react-icons/bs";
import Modal from "../../components/modal/_component";
import { clearUserSession } from "../../core/utilities";
import { GetAllEmployees } from "../../core/services/employee.service";
import EmployeeCard from "../../components/employee_card/_component";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";
import TableLoader from "../../components/table_loader/_component";

function ViewEmployees() {
  const entity_id = localStorage.getItem("entity_id");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSkeletonLoading, setSkeletonLoading] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    GetAllEmployees(entity_id)
      .then((response) => {
        console.log("ent: ", response);
        setIsLoading(false);
        setSkeletonLoading(false);
        setEmployees(response?.data.employees);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("comp: ", error);
      });
  }, []);

  const handleLogout = () => {
    clearUserSession();
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

  const renderLinkCell = (props) => {
    const { row } = props;
    const id = row.id; // Adjust this according to your actual row structure

    return (
      <Link to={`/dashboard/manage-employee-loans/${id}`}>
        {props.column.name === "First Name"
          ? row.first_name
          : props.column.name === "Last Name"
          ? row.last_name
          : props.column.name === "Email"
          ? row.email
          : row.ghana_card_id}
      </Link>
    );
  };

  const columns = [
    { key: "first_name", name: "First Name", renderCell: renderLinkCell },
    { key: "last_name", name: "Last Name", renderCell: renderLinkCell },
    { key: "email", name: "Email", renderCell: renderLinkCell },
    { key: "ghana_card_id", name: "Ghana Card", renderCell: renderLinkCell },
  ];

  const summaryRows = React.useMemo(() => {
    return [
      {
        id: "total_0",
        totalCount: 4,
      },
    ];
  }, [filteredData]);
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
        {isLoading ? (
          <>
            <div className="">
              <TableLoader />
            </div>
          </>
        ) : (
          <>
            {!isLoading && employees.length < 1 ? (
              <h3>No Data</h3>
            ) : (
              <>
                <div className="mt-10 slide-in-right">
                  {isSkeletonLoading ? (
                    [1, 2, 3].map((e, i) => <SkeletonLoader key={i} />)
                  ) : (
                    <>
                      <DataGrid
                        className="text-sm rdg-light grid-container"
                        columns={columns}
                        rows={filteredData || []}
                        bottomSummaryRows={summaryRows}
                        rowHeight={50}
                      />
                      {/* {filteredData.map((e, i) => (
                        <a href={`/dashboard/manage-employee-loans/` + e.id}>
                          <div className="slide-in-right" key={i}>
                            <EmployeeCard
                              fullName={e.first_name + " " + e.last_name}
                              email={e.email}
                              ghanaCardNo={e.ghana_card_id}
                            />
                          </div>{" "}
                        </a>
                      ))} */}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ViewEmployees;
