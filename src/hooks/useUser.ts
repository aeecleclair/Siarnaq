import { getCdrUsersUserId } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useUser = (userId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", userId ?? ""],
    queryFn: () =>
      getCdrUsersUserId({
        path: { user_id: userId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    user: data?.data,
    isLoading,
    refetch,
  };
};
