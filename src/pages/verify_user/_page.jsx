import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserVerification } from "../../core/services/auth.service";
import Modal from "../../components/modal/_component";
import verify from "../../assets/verify.svg";

function VerifyUser() {
  const queryParams = new URLSearchParams(location.search);
  const [verifyDone, setVerifyDone] = React.useState(false);
  const verificationKey = queryParams.get("vk");
  console.log("vk: " + verificationKey);
  const payload = {
    verification_key: verificationKey,
  };
  React.useEffect(() => {
    UserVerification(payload)
      .then((response) => {
        setVerifyDone(true);
      })
      .catch((error) => {
        console.log("veriErr: ", error);
      });
  }, []);

  const closeModal = () => {
    setVerifyDone(false);
  };
  const handleLogin = () => {
    window.location.href = "/login";
  };
  return (
    <>
      <div
        className={` flex justify-center items-center mt-52 loaderContainer center`}
      >
        <div className="loader"></div>
      </div>
      <h3 className="flex justify-center mt-3"> Verifying User</h3>

      <Modal open={verifyDone} close={closeModal}>
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <img
              width={90}
              className="text-green-500"
              color="green"
              src={verify}
            />
          </div>

          <p>Verification Done Successfully. Please login</p>
          <div className="flex">
            <button
              onClick={handleLogin}
              className="w-full py-2 text-white bg-[#2062fe] rounded-full mt-9 mobile:w-full"
            >
              Login
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default VerifyUser;
