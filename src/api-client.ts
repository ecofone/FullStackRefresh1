import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchContests = async () => {
  const result = await axios.get(`${API_SERVER_URL}/contest`);
  return result.data.contests;
};
