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

export const SubmitTerminateEmployee = async (payload) => {
  return await getAxios().post(
    `https://rester-82c60dc37022.herokuapp.com/create_employment_termination`,
    payload
  );
};

export const GetTerminatedEmployees = async (entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_employment_terminations/${entity_id}`
  );
};

export const GetAllEmployeeLoans = async (employee_id, entity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_employee_loans/${employee_id}?entity_id=${entity_id}`
  );
};

export const DeleteEmployeeLoan = async (
  employee_loan_id,
  entity_id,
  employee_id
) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_employee_loan/${employee_loan_id}?entity_id=${entity_id}&employee_id=${employee_id}`
  );
};

export const GetOneEmployeeLoan = async (
  employee_loan_id,
  entity_id,
  employee_id
) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_employee_loan/${employee_loan_id}?entity_id=${entity_id}&employee_id=${employee_id}`
  );
};

export const UpdateEmployeeLoanForm = async (payload) => {
  return await getAxios().patch(
    `https://rester-82c60dc37022.herokuapp.com/update_employee_loan`,
    payload
  );
};
