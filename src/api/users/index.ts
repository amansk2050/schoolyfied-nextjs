import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserFromToken, createAdmin } from "./queryFunction";
/**
 * this function is custom hook to get user information from token
 * @returns user information
 * @throws error if user not found
 */
export const useGetUserFromToken = () => {
  const { data, error } = useQuery({
    queryKey: ["getUserFromToken"],
    queryFn: getUserFromToken,
    staleTime: 1000 * 60 * 60 , // 1 hour
    retry: false
  });

  return { data, error };
};

/**
 * this function is custom hook to create admin
 * @returns created admin information
 */
export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      console.log("admin created successfully");
    },
  });
};
