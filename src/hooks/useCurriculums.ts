import { getCdrCurriculums } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const useCurriculums = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["curriculums"],
    queryFn: getCdrCurriculums,
    retry: 1,
  });

  return {
    curriculums: data?.data,
    isLoading,
    refetch,
  };
};