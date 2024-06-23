import { getCdrProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getCdrProducts,
    retry: 1,
  });

  return {
    products: data?.data,
    isLoading,
    refetch,
  };
};
