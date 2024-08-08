import { useToken } from "./useToken";
import { getGroups } from "@/api";
import { useQuery } from "@tanstack/react-query";


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