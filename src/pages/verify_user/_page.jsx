import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserVerification } from "../../core/services/auth.service";
import Modal from "../../components/modal/_component";
import Loader from "../../components/loader/_component";

function VerifyUser() {
  //   const location = useLocation();
  //   const { vk } = useParams();

  //   React.useEffect(() => {
  //     UserVerification(vk)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, [location]);
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
