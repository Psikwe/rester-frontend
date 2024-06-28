import axios from "axios";
import moment from "moment";

export const cacheUserSession = (token, expiry) => {
  localStorage.setItem("u_token", token);
  localStorage.setItem("u_token_expiry", expiry);
};

export const cacheUserRole = (role) => {
  localStorage.setItem("u_role", role);
};

export const getUserSession = () => {
  try {
    var token = localStorage.getItem("u_token");
    if (token === "" || token === null) return undefined;
    return token;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const clearUserSession = () => {
  localStorage.removeItem("u_token");
  localStorage.removeItem("u_role");
  localStorage.removeItem("entity_id");
  localStorage.removeItem("entity_name");
  localStorage.removeItem("u_token_expiry");
  window.location.reload();
};

export const getAxios = (URL) => {
  const instance = axios.create({ URL });
  let token = localStorage.getItem("u_token");
  let currentDate = new Date();
  let formattedCurrentDate = moment(currentDate).format("lll");
  let expiry = localStorage.getItem("u_token_expiry");

  if (token != null && token !== "") {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  if (expiry > formattedCurrentDate) {
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
