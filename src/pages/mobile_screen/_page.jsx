import React from "react";
import denial from "../../assets/denied.png";

function MobileScreen() {
  return (
    <>
      <div className="grid place-items-center duration-500 ease-in fixed z-[1] left-0 top-0 w-full h-full overflow-auto">
        <div>
          <img className="" src={denial} />
          <h3 className="px-8 -mt-8 text-red-500">
            Sorry! You cannot view this on mobile. Kindly login with a laptop or
            desktop
          </h3>
        </div>
      </div>
    </>
  );
}

export default MobileScreen;
