import React from "react";
import DOMPurify from "dompurify";
import arrow from "../../assets/tree.svg";

function PricingCard(props) {
  return (
    <>
      <div
        className={`${props.bgColor} h-[20rem] bg-gradient-to-l from-green-200 border-2 w-80 border-[#baffcc] p-8 rounded-lg mr-3 bg-white`}
      >
        <h3 className="py-3 text-4xl">{props.header}</h3>
        <h3 className="pt-3 text-2xl">GHS {props.price}</h3>
        <div
          className="my-8 font-thin"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.description),
          }}
        ></div>
        {/* <ul className="mt-5">
          <span className="flex items-center mb-2">
            <span>
              <img className="w-5 mr-3" src={arrow} />
            </span>
          </span>
        </ul> */}
        {/* <button className="w-40 py-1 text-white bg-black rounded-full mt-9 mobile:w-full">
          {props.btnName}
        </button> */}
        <div className="text-gray-300">{props.selected}</div>
      </div>
    </>
  );
}

export default PricingCard;
