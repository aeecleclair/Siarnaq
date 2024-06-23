import { getCdrUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getCdrUsers,
    retry: 1,
  });

  return {
    users: data?.data,
    isLoading,
    refetch,
  };
};
