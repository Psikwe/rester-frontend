import axios from "axios";
import moment from "moment";

export const cacheUserSession = (token, expiry) => {
  localStorage.setItem("u_token", token);
  localStorage.setItem("u_token_expiry", expiry.toString());
};

export const cacheUserRole = (role) => {
  localStorage.setItem("u_role", role);
};

export const clearUserSession = () => {
  // localStorage.removeItem("u_token");
  // localStorage.removeItem("u_role");
  // localStorage.removeItem("entity_id");
  // localStorage.removeItem("entity_name");
  // localStorage.removeItem("u_token_expiry");
  localStorage.clear();
  window.location.reload();
};

const removeStoredItems = () => {
  localStorage.removeItem("u_token");
  localStorage.removeItem("u_role");
  localStorage.removeItem("entity_id");
  localStorage.removeItem("entity_name");
  localStorage.removeItem("u_token_expiry");
};

export const getUserSession = () => {
  try {
    var token = localStorage.getItem("u_token");
    let currentDate = new Date();
    let currentTimestamp = moment(currentDate).valueOf();

    let expiry = localStorage.getItem("u_token_expiry");
    if (expiry) {
      let expiryTimestamp = parseInt(expiry, 10);

      // console.log(expiryTimestamp, currentTimestamp);
      // if (expiryTimestamp === currentTimestamp) console.log("equals");
      // if (expiryTimestamp > currentTimestamp) console.log("greater");
      // if (expiryTimestamp < currentTimestamp) console.log("lesser");

      if (expiryTimestamp < currentTimestamp) clearUserSession();
    }

    if (token === "" || token === null) {
      removeStoredItems();
      return undefined;
    }

    return token;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
export const getAxios = (URL) => {
  const instance = axios.create({ URL });
  let token = localStorage.getItem("u_token");
  let currentDate = new Date();
  let currentTimestamp = moment(currentDate).valueOf();
  let expiry = localStorage.getItem("u_token_expiry");
  let expiryTimestamp = parseInt(expiry, 10);
  if (token != null && token !== "") {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  if (expiryTimestamp < currentTimestamp) {
    clearUserSession();
  }
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.data == 401) {
        clearUserSession();
        // window.location.reload();
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        clearUserSession();
        // window.location.reload();
      }
      if (error?.response?.status === 429) {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
