import { getMemberships } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useMemberships = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userMemberships"],
    queryFn: getMemberships,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    memberships: data?.data || [],
    isLoading,
    refetch,
  };
};
