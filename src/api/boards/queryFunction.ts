import { API_BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

/**
 * function to get all boards
 * @returns all boards
 * @throws error if boards not found
 */

export const getAllBoards = async () => {
  const response = await axios.get(`${API_BASE_URL}/boards/all`);
  return response.data;
};


