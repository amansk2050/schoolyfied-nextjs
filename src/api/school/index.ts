import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSchool,
  getAllSchoolSections,
  getRegisterdSchoolByUserId,
} from "./queryFunction";

/**
 * this function is custom hook to create a new school
 * @returns created school information
 * @throws error if school already exists
 */
export const useCreateSchool = () =>
  useMutation({
    mutationFn: createSchool,
    onSuccess: () => {
      console.log("school created successfully");
    },
  });

/**
 * this function is custom hook to get all school sections
 * @returns all school sections
 * @throws error if school sections not found
 */
export const useGetAllSchoolSections = () => {
  const { data, error } = useQuery({
    queryKey: ["getAllSchoolSections"],
    queryFn: getAllSchoolSections,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  });

  return { data, error };
};

/**
 * this function is custom hook to get school by user id
 * @returns school information
 * @throws error if no school is there
 * @param id
 */
export const useGetRegisterdSchoolByUserId = (id: string|null) => {
  const { data, error } = useQuery({
    queryKey: ["getRegisterdSchoolByUserId", id],
    queryFn: () => getRegisterdSchoolByUserId(id as string),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  });

  return { data, error };
};
