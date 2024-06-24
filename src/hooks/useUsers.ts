import { useToken } from "./useToken";
import { getCdrUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getCdrUsers,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    users: data?.data,
    isLoading,
    refetch,
  };
};
