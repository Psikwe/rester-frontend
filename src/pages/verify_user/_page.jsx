import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserVerification } from "../../core/services/auth.service";

function VerifyUser() {
  const queryParams = new URLSearchParams(location.search);
  const verificationKey = queryParams.get("vk");
  console.log("vk: " + verificationKey);
  React.useEffect(() => {
    UserVerification(verificationKey)
      .then((response) => {
        console.log("veri: ", response);
      })
      .catch((error) => {
        console.log("veriErr: ", error);
      });
  }, []);
  return (
    <>
      <div
        className={` flex justify-center items-center mt-52 loaderContainer center`}
      >
        <div className="loader"></div>
      </div>
      <h3 className="flex justify-center mt-3"> Verifying User</h3>
    </>
  );
}

export default VerifyUser;
