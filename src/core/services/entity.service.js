import { getAxios } from "../utilities";
import axios from "axios";

export const GetAllEntities = async () => {
  return await getAxios().get(
    "https://rester-82c60dc37022.herokuapp.com/get_entities"
  );
};

export const CreateEntityForm = async (payload) => {
  return await getAxios().post(
    `https://rester-82c60dc37022.herokuapp.com/create_entity`,
    payload
  );
};

export const SetupOrganizationForm = async (payload) => {
  return await axios.post(
    `https://rester-82c60dc37022.herokuapp.com/setup_organization`,
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
