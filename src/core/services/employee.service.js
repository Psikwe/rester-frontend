import axios from "axios";
import { getAxios } from "../utilities";

export const GetAllEntities = async () => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_entities"
  );
};

export const CreateEmployeeForm = async (payload) => {
  return await getAxios().post(
    `https://rester-82c60dc37022.herokuapp.com/create_employee`,
    payload
  );
};

export const DeleteEntity = async (entity_id) => {
  return await getAxios().delete(
    `https://rester-82c60dc37022.herokuapp.com/delete_entity/${entity_id}`
  );
};

export const GetOneEntity = async (eneity_id) => {
  return await getAxios().get(
    `https://rester-82c60dc37022.herokuapp.com/get_entity/${eneity_id}`
  );
};

export const UpdateEntityForm = async (payload) => {
  return await getAxios().patch(
    "https://rester-82c60dc37022.herokuapp.com/update_entity",
    payload
  );
};
