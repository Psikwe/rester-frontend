import React from "react";

function Modal(props) {
  const closeModal = () => {
    props.close(!props.open);
  };
  return (
    <>
      <div
        className={`${
          props.open ? "block" : "hidden"
        } grid place-items-center duration-500 ease-in fixed z-[1] left-0 top-0 w-full h-full overflow-auto bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)]`}
      >
        <div>
          <span
            onClick={() => closeModal()}
            className="z-50 close color-[#aaa] float-right text-right text-3xl text-red-700 no-underline cursor-pointer relative top-0 right-[4%] md:right-[5px]"
          >
            &times;
          </span>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Modal;
