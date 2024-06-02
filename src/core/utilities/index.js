export const cacheUserSession = (token) => {
  localStorage.setItem("u_token", token);
  //   localStorage.setItem("u_expiry", expiry);
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
  window.location.reload();
};
