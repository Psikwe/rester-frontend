import React from "react";
import { pricingPackages } from "../../core/data";
import PricingCard from "../../components/pricing_card/_component";

function Pricing() {
  return (
    <>
      <div className="laptop-lg:px-32 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16">
        <div className="flex flex-col justify-center text-center">
          <h3 className="text-4xl font-medium tracking-widest">
            Transparent Pricing to Empower Your Team and Operations
          </h3>
          <p className="w-1/2 m-auto mt-4 text-lg font-thin">
            Choose the plan that best suits your needs and budget. Start and
            Grow with
            <span className="mx-1 animate-pulse font-medium text-[#22c55e]">
              Rester
            </span>
            Today.
          </p>
        </div>
        <div className="flex mt-32">
          {pricingPackages.map((pp, i) => (
            <PricingCard
              bgColor={pp.bgColor}
              header={pp.title}
              price={pp.price}
              description={pp.description}
              features={pp.features}
              btnName={pp.btnName}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Pricing;
