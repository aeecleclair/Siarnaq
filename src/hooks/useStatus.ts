import { useToken } from "./useToken";
import { getCdrStatus } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const useStatus = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["status"],
    queryFn: getCdrStatus,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    status: data?.data,
    isLoading,
    refetch,
  };
};