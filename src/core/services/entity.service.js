import axios from "axios";

export const GetAllEntities = async () => {
  return await axios.get(
    "https://rester-82c60dc37022.herokuapp.com/get_entities",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("u_token")}`,
        "Content-Type": "application/json",
      },
    }
  );
};
