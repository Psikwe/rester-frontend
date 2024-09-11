import axios from "axios";

export const GetFrontendConfig = async () =>
  await axios.get("/frontend-config.json");
