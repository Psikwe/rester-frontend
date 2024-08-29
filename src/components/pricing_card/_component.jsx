import React from "react";

function PricingCard(props) {
  return (
    <div
      className={`${props.bgColor} h-[22rem] bg-gradient-to-l from-green-200 border-2 w-80 border-[#baffcc] p-8 rounded-lg mr-3 bg-white`}
    >
      <h3 className="py-3 text-4xl">{props.header}</h3>
      <h3 className="pt-3 text-2xl">GHS {props.price}</h3>
      <div className="my-8">
        <ul className="list-disc">
          {props.description[0]
            .split("\n")
            .map((item) => item.trim())
            .map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      </div>
      <div className="text-gray-300">{props.selected}</div>
    </div>
  );
}

export default PricingCard;
