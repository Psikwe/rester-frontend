import axios from "axios";
import { ILogin, ISignup } from "../interface";

export const UserSignUp = async (data) => {
  return axios.post("http://localhost:5000/api/user/signup", data);
};

export const UserLogin = async (data) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/login",
    data
  );
};
