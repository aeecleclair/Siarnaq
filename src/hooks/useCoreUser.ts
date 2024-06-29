import { useToken } from "./useToken";
import { getUsersUserId } from "@/api";
import { useTokenStore } from "@/stores/token";
import { useQuery } from "@tanstack/react-query";

export const useCoreUser = () => {
  const { isTokenExpired } = useToken();
  const { userId } = useTokenStore();
  const adminCdrId = "c1275229-46b2-4e53-a7c4-305513bb1a2a";
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coreUser", userId ?? ""],
    queryFn: () =>
      getUsersUserId({
        path: { user_id: userId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    user: data?.data,
    isAdmin: data?.data?.groups?.map((group) => group.id).includes(adminCdrId),
    isLoading,
    refetch,
  };
};
