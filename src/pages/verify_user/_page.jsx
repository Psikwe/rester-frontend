import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserVerification } from "../../core/services/auth.service";

function VerifyUser() {
  const location = useLocation();
  const { vk } = useParams();

  React.useEffect(() => {
    UserVerification(vk)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);
  return <div>Verifying your account</div>;
}

export default VerifyUser;
