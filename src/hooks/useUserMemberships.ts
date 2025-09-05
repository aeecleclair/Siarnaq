import { useToken } from "./useToken";

import { getMembershipsUsersUserId } from "@/api";

import { useQuery } from "@tanstack/react-query";

export const useUserMemberships = (userId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userMemberships", userId ?? ""],
    queryFn: () =>
      getMembershipsUsersUserId({
        path: { user_id: userId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    userMemberships: data?.data || [],
    isLoading,
    refetch,
  };
};
