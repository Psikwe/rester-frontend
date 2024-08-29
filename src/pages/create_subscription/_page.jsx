import React from "react";
import secureImg from "../../assets/security.png";
import momoImg from "../../assets/momo.png";
import {
  AddSubscription,
  CheckPaymentStatus,
  GetPricing,
} from "../../core/services/pricing.service";
import logo from "../../assets/rester.png";
import { CiLogout } from "react-icons/ci";
import Loader from "../../components/loader/_component";
import { showToast } from "../../core/hooks/alert";
import Modal from "../../components/modal/_component";
import { BsExclamationCircle } from "react-icons/bs";
import { clearUserSession } from "../../core/utilities";
import { FaCircleInfo } from "react-icons/fa6";
import loading from "../../assets/gifs/loading.gif";
import success from "../../assets/gifs/successs.gif";
import { useNavigate } from "react-router-dom";
import PricingCard from "../../components/pricing_card/_component";
import SkeletonLoader from "../../components/skeleton_loading/_component";

function CreateSubscription() {
  const navigate = useNavigate();
  const entity_id = localStorage.getItem("entity_id");
  const [prices, setPrices] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isButtonLoading, setButtonIsLoading] = React.useState(false);
  const [selectedPrice, setSelectedPrice] = React.useState("");
  const [selectedPriceId, setSelectedPriceId] = React.useState("");
  const [priceId, setPriceId] = React.useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [paymentConfirmationModal, setPaymentConfirmationModal] =
    React.useState(false);
  const [paymentFailedModal, setPaymentFailedModal] = React.useState(false);
  const [paymentLoadingModal, setPaymentLoadingModal] = React.useState(false);

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
        showToast(error.response.data.error, false);
      });
  }, []);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // React.useEffect(() => {
  //   GetBillingHistory(entity_id)
  //     .then((response) => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleSubscription = () => {
    let phoneNumberField = document.getElementById("phone-number").value;
    let numString = phoneNumberField.toString();
    console.log("p: ", phoneNumberField);
    if (!phoneNumberField) {
      showToast("Please enter a number", false);
      return;
    }
    if (!selectedPriceId) {
      showToast("Please select a plan", false);
      return;
    }
    if (phoneNumberField && phoneNumberField.length !== 10) {
      showToast("Number must be 10 digits", false);
      return;
    }
    // if (priceId == 0) {
    //   showToast("Please select a plan", false);
    //   return;
    // }

    const payload = {
      entity_id: entity_id,
      phone_number: phoneNumberField,
      price_id: selectedPriceId,
    };
    setPaymentLoadingModal(true);
    AddSubscription(payload)
      .then((response) => {
        // showToast(response?.data.message, true);
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
        setPaymentLoadingModal(false);
        setPaymentConfirmationModal(true);
        setTimeout(() => {
          setPaymentConfirmationModal(false);
          navigate("/dashboard/manage-entity/" + entity_id);
        }, 3000);
      })
      .catch((error) => {
        setPaymentFailedModal(true);
        console.log(error);
      });
  };

  const handleLogout = () => {
    clearUserSession();
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };
  const closePaymentConfirmationModal = () => {
    setPaymentConfirmationModal(false);
  };
  const closePaymentFailedModal = () => {
    setPaymentFailedModal(false);
  };

  const selectSubscription = (id, amount) => {
    setSelectedPriceId(id);
    setSelectedPrice(amount);
  };

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
              className="w-full py-2 mr-2 text-white rounded-full mt-9 primary mobile:w-full"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 text-white bg-red-500 rounded-full mt-9 mobile:w-full"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={paymentLoadingModal}>
        <div className="w-[30rem] bg-white p-14">
          <div className="flex justify-center mb-2">
            <img className="w-48 h-48" src={loading} />
          </div>
          <p className="flex justify-center">
            Waiting for payment on your device
          </p>
        </div>
      </Modal>
      <Modal
        open={paymentConfirmationModal}
        close={closePaymentConfirmationModal}
      >
        <div className="w-full text-center bg-white p-14">
          <p>Payment made successfully.</p>
          <div className="flex justify-center mb-2">
            <img src={success} />
          </div>

          <p className="text-lg text-green-400 animate-pulse">
            Hang tight while we take you to the dashboard!
          </p>
        </div>
      </Modal>
      <Modal open={paymentFailedModal} close={closePaymentFailedModal}>
        <div className="w-[30rem] text-center bg-white p-14">
          <p className="text-2xl text-red-600">Payment failed</p>
          <div className="flex justify-center mb-2">
            <BsExclamationCircle size={120} color="red" />
          </div>

          <p
            className="text-lg text-green-400 cursor-pointer animate-pulse"
            onClick={closePaymentFailedModal}
          >
            Retry
          </p>
        </div>
      </Modal>

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
      <div
        onClick={() => navigate("/dashboard/manage-entity/" + entity_id)}
        className="flex justify-end mt-3 mr-10 font-semibold text-green-900 underline uppercase cursor-pointer"
      >
        Go on free plan
      </div>

      <div className="laptop-lg:px-32 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16">
        <div className="flex flex-col justify-center">
          <div className="text-center ">
            <h3 className="text-4xl font-medium tracking-widest text-center">
              Make payment and get started!
            </h3>
            <p className="w-1/2 m-auto mt-4 text-lg font-thin">
              Start and Grow with
              <span className="mx-1 animate-pulse font-medium text-[#22c55e]">
                Rester
              </span>
              Today.
            </p>
            <small className="mt-8">Please select a plan to make payment</small>
          </div>

          <div className="flex items-center justify-center m-auto mt-8 mobile:gap-7 mobile:flex-col">
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
                      onClick={() => selectSubscription(price.id, price.amount)}
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
                        description={price.features}
                        // features={price.features}
                      />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="p-16 bg-slate-100 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <h3>
                  <span className="text-2xl">R</span>ester
                </h3>
                <small>Selected price:</small>
                <div className="flex items-center ">
                  <div className="mr-1 text-3xl font-medium">
                    {selectedPrice ? `GHS ${selectedPrice}` : "SELECT A PLAN"}
                  </div>
                  <div className="text-xs text-green-500 underline uppercase">
                    monthly
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          <div className="m-auto mt-32 mb-8 ">
            <div className="flex items-center p-1 border-2 rounded-lg border-slate-100">
              <img className="w-10 mr-2" src={momoImg} />
              <span className="text-sm text-slate-500">MTN MOMO PAYMENT</span>
            </div>
            <div className="flex my-4 items-center w-full bg-[#d4f2ff]">
              <div className="inline-block  h-24 w-1 bg-[#6ccef5]"></div>
              <h3 className="flex items-center ml-3 text-gray-500">
                <FaCircleInfo size={25} className="mr-2" />
                Please ensure that the number entered below <br /> is where
                payment will be deducted
              </h3>
            </div>
            <div className="mt-8">
              <label className="text-sm label bold">
                Enter number for payment
              </label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-[30rem] pl-10 p-2.5"
                  type="number"
                  id="phone-number"
                  autoFocus={true}
                  placeholder="number"
                  name="phone_number"
                />
              </div>
            </div>

            <div className="flex items-center py-2 mt-3 rounded-full px-9 bg-slate-100">
              <div className="flex items-center mt-3">
                <img className="mr-1" src={secureImg} />
                <h5 className="text-xs">
                  Secure <br /> checkout
                </h5>
              </div>
              <button
                disabled={isLoading}
                onClick={handleSubscription}
                type="submit"
                className={
                  isLoading
                    ? `cursor-pointer w-1/2 rounded-full m-auto py-2 text-white mt-3 primary mobile:w-full flex justify-center`
                    : `w-1/2 m-auto cursor-pointer py-2 rounded-full text-white mt-3 primary mobile:w-full flex justify-center`
                }
              >
                {isButtonLoading ? <Loader /> : "Complete Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSubscription;
