import axios from "axios";

export const cacheUserSession = (token) => {
  localStorage.setItem("u_token", token);
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
  window.location.reload();
};

export const getAxios = (URL) => {
  const instance = axios.create({ URL });
  let token = localStorage.getItem("u_token");
  if (token != null && token !== "") {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.data == 401) {
        clearUserSession();
        window.location.reload();
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        clearUserSession();
        window.location.reload();
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
