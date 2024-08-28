import React from "react";
import PricingCard from "../../components/pricing_card/_component";
import { GetPricing } from "../../core/services/pricing.service";
import SkeletonLoader from "../../components/skeleton_loading/_component";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  const [prices, setPrices] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    GetPricing()
      .then((response) => {
        setIsLoading(false);
        console.log("rr: ", response?.data.prices);
        setPrices(response?.data.prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="laptop-lg:px-32 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16">
        <div className="flex flex-col justify-center text-center">
          <h3 className="text-4xl font-medium tracking-widest">
            Transparent Pricing to Empower Your Team and Operations
          </h3>
          <p className="w-1/2 m-auto mt-4 text-lg font-thin">
            Signup for a plan that best suits your needs and budget. Start and
            Grow with
            <span className="mx-1 animate-pulse font-medium text-[#22c55e]">
              Rester
            </span>
            Today.
          </p>
        </div>
        <div className="flex items-center justify-center m-auto mt-32 mb-12 mobile:gap-7 mobile:flex-col">
          {isLoading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : (
            <>
              {prices &&
                prices.map((price, i) => (
                  <PricingCard
                    key={i}
                    // bgColor={price.bgColor}
                    header={price.name}
                    price={price.amount}
                    btnName="Pay"
                    description={price.features}
                    // features={price.features}
                  />
                ))}
            </>
          )}
        </div>
        <div className="flex justify-center">
          <h3>
            <span
              className="cursor-pointer  animate-pulse font-medium text-[#22c55e]"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>{" "}
            to get started
          </h3>
        </div>
      </div>
    </>
  );
}

export default Pricing;
