import { getAxios } from "../utilities";

export const CreateEmployeeForm = async (payload) => {
  return await getAxios().post(
    `https://rester-82c60dc37022.herokuapp.com/create_employee`,
    payload
  );
};

export const GetAllEmployees = async (entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_employees/${entity_id}`
  );
};

export const GetOneEmployee = async (employee_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_employee/${employee_id}`
  );
};

export const DeactivateEmployee = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/deactivate_employee",
    { employee_id: payload }
  );
};

export const SubmitUpdateEmployee = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/update_employee",
    payload
  );
};

export const ActivateEmployee = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/activate_employee",
    { employee_id: payload }
  );
};

export const SubmitEmployeeLoan = async (payload) => {
  return await getAxios().post(
    `https://rester-82c60dc37022.herokuapp.com/create_employee_loan`,
    payload
  );
};
