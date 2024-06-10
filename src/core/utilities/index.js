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
  window.location.reload();
};
