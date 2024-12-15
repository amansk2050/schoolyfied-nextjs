import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllBoards } from "./queryFunction";

/**
 * this function is custom hook to get all boards
 * @returns all boards
 * @throws error if boards not found
 */
export const useGetAllBoards = () => {
  const { data, error } = useQuery({
    queryKey: ["getAllBoards"],
    queryFn: getAllBoards,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  });

  return { data, error };
};
