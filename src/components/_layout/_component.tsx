import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Icons, Images } from "../../Assets";
import { menus } from "../../core/data";

export const PageLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [activeLink, setActiveLink] = useState("");
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] =
    React.useState<boolean>(false);

  const onMenuClick = (
    e: any,
    selected: number,
    url: string,
    submenu: any[]
  ) => {
    console.log(url, submenu);
    e.preventDefault();
    setSelectedMenu(selected);
  };

  const openDeactivationModal = () => {
    setIsDeactivateModalOpen(true);
  };

  const closeDeactivationModal = () => {
    setIsDeactivateModalOpen(false);
  };

  const groupMenus = (entries: any[]): { group: string; items: any[] }[] => {
    return Object.values(
      entries.reduce((result: any[], item) => {
        const key = item.group;
        if (!result[key]) {
          result[key] = { group: key, items: [] };
        }
        result[key].items.push(item);
        return result;
      }, {})
    );
  };

  const logout = () => {
    // clearUserSession();
  };

  return (
    <>
      <div className="flex w-full mb-8 overflow-x-hidden">
        <div className="w-80 px-3 h-[50rem] m-8 border-r-[1px] bg-[#ffcc00] border-slate-100 rounded-2xl">
          <img className="-ml-16 -mt-7 w-60" src={Images.mtnLogo} />
          <ul className="sub-nav">
            {(
              groupMenus(
                menus.find((_: any, k: any) => k == selectedMenu)!.submenu
              ) ?? []
            ).map(({ group, items }, k) => (
              <React.Fragment key={k}>
                <li className="mt-16 font-bold group-title">{group}</li>
                {items.map((menu, j) => (
                  <li className="" key={j}>
                    <Link
                      to={menu.url}
                      className="flex items-center text-black"
                    >
                      <span className="w-4 ml-8 mr-2 text-black">
                        {menu.icon}
                      </span>
                      <div
                        onClick={() => setActiveLink(menu.url)}
                        className={
                          activeLink === menu.url ? "underline text-white" : ""
                        }
                      >
                        {menu.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}

            <div className="absolute text-gray-400 bottom-2" title="Logout">
              &copy; MTN | All right reserved
            </div>
          </ul>
          <div className="absolute bottom-2 left-3" title="Logout">
            <div className="cursor-pointer" onClick={openDeactivationModal}>
              {/* <Icons.Logout
                size={30}
                className="w-10 mx-auto -mt-8 text-red-600 cursor-pointer"
              /> */}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#f5f9fe] overflow-auto h-screen">
          <div className="flex justify-between px-40 mt-4">
            <div className="flex items-center ">
              <img width={40} src={Icons.profile} />
              <small className="ml-1">Hello Admin</small>
            </div>
            <div title="Logout" className="flex items-center cursor-pointer">
              <img width={40} src={Icons.logout} />
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
