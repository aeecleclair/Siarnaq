import { useToken } from "./useToken";
import { getUsersUserId } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return getUsersUserId({
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
