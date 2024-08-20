import { getCdrCurriculums } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useCurriculums = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["curriculums"],
    queryFn: getCdrCurriculums,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    curriculums: data?.data || [],
    isLoading,
    refetch,
  };
};
