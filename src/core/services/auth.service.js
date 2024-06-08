import axios from "axios";

export const UserSignUp = async (data) => {
  return axios.post("https://rester-82c60dc37022.herokuapp.com/signup", data);
};

export const UserLogin = async (data) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/login",
    data
  );
};
