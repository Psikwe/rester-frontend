import axios from "axios";
import { getAxios } from "../utilities";

export const UserSignUp = async (data) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/signup",
    data
  );
};

export const UserLogin = async (data) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/login",
    data
  );
};

export const UserForgotPassword = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/forgot_password",
    payload
  );
};

export const UserResetPassword = async (payload) => {
  return await getAxios().post(
    "https://rester-82c60dc37022.herokuapp.com/reset_password",
    payload
  );
};
