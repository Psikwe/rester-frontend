import React from "react";
import { adminDashboardMenus, menus } from "../../core/data";
import { NavLink, Outlet } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import moment from "moment";

type Props = {};

const DashboardLayout = (props: Props) => {
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const groupMenus = (entries) => {
    return Object.values(
      entries.reduce((result, item) => {
        const key = item.group;
        if (!result[key]) {
          result[key] = { group: key, items: [] };
        }
        result[key].items.push(item);
        return result;
      }, {})
    );
  };
  const groupedMenus = groupMenus(
    menus.find((_, k) => k == selectedMenu)?.submenu ?? []
  );
  const d = new Date();
  console.log(d);
  let showDate = moment(d).format("lll");

  const handleLogout = () => {
    alert("not implemented yet");
  };
  return (
    <>
      <div className="flex w-full mb-8 overflow-x-hidden">
        <div className="w-80 px-3 h-[50rem] m-8 border-r-[1px] bg-[#8FC1E3] border-slate-100 rounded-2xl">
          <b>R</b>ester
          <ul className="mt-12">
            {adminDashboardMenus.map((ad, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center mt-9">
                  <span>{ad.icon}</span>
                  <h2 className="font-medium text-[#687864]">{ad.title}</h2>
                </div>

                {ad.subMenu.map((sub, i) => (
                  <NavLink to={sub.url}>
                    <li
                      className="flex items-center mt-3 font-thin hover:text-black"
                      key={i}
                    >
                      {sub.icon}
                      {sub.menu}
                    </li>
                  </NavLink>
                ))}
              </React.Fragment>
            ))}
          </ul>
          <div className="absolute bottom-2 left-3" title="Logout">
            <div className="cursor-pointer">
              {/* <Icons.Logout
                size={30}
                className="w-10 mx-auto -mt-8 text-red-600 cursor-pointer"
              /> */}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#f5f9fe] overflow-auto h-screen">
          <div className="flex justify-between px-40 mt-4">
            <div className="flex items-center justify-between ">
              <MdAdminPanelSettings color="#687864" size={30} />

              <div className="flex items-center justify-between">
                <small className="ml-1 ">Hello Admin</small>
              </div>
            </div>
            <div className="m-auto text-slate-400">{showDate}</div>
            <div
              onClick={handleLogout}
              title="Logout"
              className="flex items-center cursor-pointer"
            >
              <CiLogout color="red" size={30} />
            </div>
          </div>

          <div className="px-40 mt-16">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
