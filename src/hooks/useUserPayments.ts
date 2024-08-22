import { getCdrUsersUserIdPayments } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

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
    total: data?.data?.reduce((acc, payment) => acc + payment.total / 100, 0),
    isLoading,
    refetch,
  };
};
