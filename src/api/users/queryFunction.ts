import { API_BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

type createAdminDto = {
  fullName: string;
  email: string;
  password: string;
  roles: string[];
};

/**
 * This function is used to get user from token saved in local storage.
 * @returns user information
 * @throws error if user is not found
 * @throws error if token is not found
 * @throws error if token is invalid
 */
export const getUserFromToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  const response = await axios.get(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * function to register admin, admin provide details to create his account
 * @param createAdminDto
 * @returns created admin information
 */
export const createAdmin = async (createAdminDto: createAdminDto) => {
  console.log(createAdminDto)
  const response = await axios.post(
    `${API_BASE_URL}/auth/signup`,
    createAdminDto
  );
  return response.data;
};
