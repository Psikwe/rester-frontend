import React from "react";
import { pricingPackages } from "../../core/data";
import PricingCard from "../../components/pricing_card/_component";
import {
  AddSubscription,
  CheckPaymentStatus,
  GetBillingHistory,
  GetPricing,
} from "../../core/services/pricing.service";
import logo from "../../assets/rester.png";

import SkeletonLoader from "../../components/skeleton_loading/_component";
import { CiLogout } from "react-icons/ci";
import Loader from "../../components/loader/_component";
import { showToast } from "../../core/hooks/alert";

function CreateSubscription() {
  const entity_id = localStorage.getItem("entity_id");
  const [prices, setPrices] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isButtonLoading, setButtonIsLoading] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState("");
  const [priceId, setPriceId] = React.useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    GetPricing()
      .then((response) => {
        setIsLoading(false);
        console.log(response?.data.prices);
        setPrices(response?.data.prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const selectSubscription = (id) => {
    setPriceId(id);
  };

  React.useEffect(() => {
    GetBillingHistory(entity_id)
      .then((response) => {
        console.log("re: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubscription = () => {
    console.log("p: ", priceId);
    let phoneNumberField = document.getElementById("phone-number").value;
    let numString = phoneNumberField.toString();
    console.log("p: ", phoneNumberField);
    if (!phoneNumberField) {
      showToast("Please enter a number", false);
      return;
    }
    if (phoneNumberField && phoneNumberField.length !== 10) {
      showToast("Number must be 10 digits", false);
      return;
    }
    if (priceId == 0) {
      showToast("Please select a plan", false);
      return;
    }

    const payload = {
      entity_id: entity_id,
      phone_number: phoneNumberField,
      price_id: priceId,
    };

    AddSubscription(payload)
      .then((response) => {
        console.log(response);
        setTransactionId(response?.data.transaction_id);
        showToast(response?.data.message, true);
        console.log("id: " + response?.data.transaction_id);

        if (response?.data.transaction_id) {
          sessionStorage.setItem(
            "transaction_id",
            response?.data.transaction_id
          );
          checkPaymentStatus(response?.data.transaction_id);
        }
      })
      .catch((error) => {
        console.log(error);
        showToast(error.response.data.error, false);
      });
  };

  const checkPaymentStatus = (transaction_id) => {
    CheckPaymentStatus(transaction_id)
      .then((response) => {
        console.log(response);
        window.location.href = "/dashboard/manage-entity/" + entity_id;
      })
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <>
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
      <div className="laptop-lg:px-32 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16">
        <div className="flex flex-col justify-center text-center">
          <h3 className="text-4xl font-medium tracking-widest">
            Choose the plan that’s right for you
          </h3>
          <p className="w-1/2 m-auto mt-4 text-lg font-thin">
            Start and Grow with
            <span className="mx-1 animate-pulse font-medium text-[#22c55e]">
              Rester
            </span>
            Today.
          </p>
        </div>
        <div className="relative flex items-center justify-center m-auto mt-32 mb-8">
          <div>
            <label className="text-sm label bold">
              Enter number for payment
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-[30rem] pl-10 p-2.5"
                type="number"
                id="phone-number"
                placeholder="number"
                name="phone_number"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center m-auto mb-12 mobile:gap-7 mobile:flex-col">
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
                  <div
                    onClick={() => selectSubscription(price.id)}
                    className="cursor-pointer"
                    key={i}
                  >
                    <PricingCard
                      key={i}
                      // bgColor={price.bgColor}
                      header={price.name}
                      price={price.amount}
                      btnName="Pay"
                      selected={priceId === price.id ? "selected" : ""}
                      // description={price.description}
                      // features={price.features}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
        <button
          disabled={isLoading}
          onClick={handleSubscription}
          type="submit"
          className={
            isLoading
              ? `animate-pulse w-1/5 rounded-full m-auto py-2 text-white mt-3 primary mobile:w-full flex justify-center`
              : `w-1/5 m-auto py-2 rounded-full text-white mt-3 primary mobile:w-full flex justify-center`
          }
        >
          {isButtonLoading ? <Loader /> : "Subscribe"}
        </button>
      </div>
    </>
  );
}

export default CreateSubscription;
