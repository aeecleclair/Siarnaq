import { getCdrUsersMeSellers, getCdrYear } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useYear = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["year"],
    queryFn: getCdrYear,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    year: data?.data,
    isLoading,
    refetch,
  };
};
