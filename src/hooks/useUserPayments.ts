import { useToken } from "./useToken";
import { getCdrUsersUserIdPayments } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUserPayments = (userId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userPayment", userId ?? ""],
    queryFn: () =>
      getCdrUsersUserIdPayments({
        path: { user_id: userId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    payments: data?.data || [],
    total: data?.data?.reduce((acc, payment) => acc + payment.total, 0),
    isLoading,
    refetch,
  };
};
