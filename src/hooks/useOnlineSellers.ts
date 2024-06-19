import { getCdrOnlineSellers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useOnlineSellers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["onlineSellers"],
    queryFn: getCdrOnlineSellers,
  });

  return { onlineSellers: data?.data || [], refetch };
};
