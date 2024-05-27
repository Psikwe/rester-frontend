import { toast } from "react-toastify";

export const showToast = (message, success) => {
  if (success === true)
    toast.success(message, {
      position: "bottom-center",
      autoClose: 3000,
    });
  else if (success === false) {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
    });
  }
};
