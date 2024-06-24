import { useToken } from "./useToken";
import { getCdrUsersUserId } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const useUser = (userId: string) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return getCdrUsersUserId({
        path: { user_id: userId },
      });
    },
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    user: data?.data,
    isLoading,
    refetch,
  };
};