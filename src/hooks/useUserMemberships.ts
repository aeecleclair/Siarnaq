import { getCdrUsersUserIdMemberships } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useUserMemberships = (userId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userMemberships", userId ?? ""],
    queryFn: () =>
      getCdrUsersUserIdMemberships({
        path: { user_id: userId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    memberships: data?.data || [],
    isLoading,
    refetch,
  };
};
