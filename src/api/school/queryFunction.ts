import { API_BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

type CreateSchoolType = {
  /**
   * Full name of the school
   */
  name: string;

  /**
   * Branch name of the school
   */
  branch_name: string;

  /**
   * Board ID
   */
  board_id: string;

  /**
   * Array of category IDs
   */
  category_id: string[];

  /**
   * Address of the school as a JSON object
   */
  address: string;

  /**
   * Email of the school
   */
  email: string;

  /**
   * Contact numbers of the school
   */
  contact_number: string[];

  /**
   * Indicates if it is a branch of the school
   */
  is_branch?: boolean; // Optional, as it's marked with @ApiPropertyOptional
};

/**
 * This function is used to create a new school.
 * @param createSchoolDto
 * @returns created school information
 */
export const createSchool = async (createSchoolDto: CreateSchoolType) => {
  const response = await axios.post(
    `${API_BASE_URL}/school/create`,
    createSchoolDto
  );
  return response.data;
};

/**
 * function to get all school sections
 * @returns all school sections
 * @throws error if school sections not found
 */

export const getAllSchoolSections = async () => {
  const response = await axios.get(`${API_BASE_URL}/class-category/all`);
  return response.data;
};

/**
 * function to get school by user id
 * @returns school information
 * @throws error if no school is there
 */

export const getRegisterdSchoolByUserId = async (id: string) => {
  console.log("id", id);
  const token = localStorage.getItem("token");
  const params = {
    id,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (!token) {
    throw new Error("Token not found");
  }
  const response = await axios.get(`${API_BASE_URL}/school/id`, {
    params: params,
    headers: headers,
  });

  return response.data;
};
