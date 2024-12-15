import { API_BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

export const createStudent = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/students/create`, data);
  return response.data;
};
