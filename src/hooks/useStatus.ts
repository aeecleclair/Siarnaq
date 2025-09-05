import { getCdrStatus } from "@/api";

import { useQuery } from "@tanstack/react-query";

export const useStatus = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["status"],
    queryFn: getCdrStatus,
    retry: 3,
    enabled: true,
  });

  return {
    status: data?.data,
    isLoading,
    refetch,
  };
};
