import { useToken } from "./useToken";
import { getCdrCurriculums } from "@/api";
import { useQuery } from "@tanstack/react-query";

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
