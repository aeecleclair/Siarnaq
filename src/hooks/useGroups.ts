import { getGroups } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useGroups = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    groups: data?.data || [],
    isLoading,
    refetch,
  };
};
