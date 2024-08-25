import { getUsersMe } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useCoreUser = () => {
  const { isTokenExpired } = useToken();
  const adminCdrId = "c1275229-46b2-4e53-a7c4-305513bb1a2a";
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coreUser"],
    queryFn: getUsersMe,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    user: data?.data,
    isAdmin: data?.data?.groups?.map((group) => group.id).includes(adminCdrId),
    isLoading,
    refetch,
  };
};
