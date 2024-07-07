import axios from "axios";
import { getAxios } from "../utilities";

export const UserSignUp = async (data) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/signup",
    data
  );
};

export const UserLogin = async (data) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/login",
    data
  );
};

export const UserIncomeCalculator = async (data) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/calculate/income_tax",
    data
  );
};

export const UserGrossIncomeCalculator = async (data) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/calculate/gross_income",
    data
  );
};

export const UserForgotPassword = async (payload) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/forgot_password",
    payload
  );
};

export const UserResetPassword = async (payload) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/reset_password",
    payload
  );
};
export const UserVerification = async (payload) => {
  return await axios.post(
    "https://rester-82c60dc37022.herokuapp.com/verify_user",
    payload
  );
};
