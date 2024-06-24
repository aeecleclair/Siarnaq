import { useToken } from "./useToken";
import { getCdrUsersUserIdPayments, PaymentComplete } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUserPayment = (userId: string) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userPayment", userId],
    queryFn: () => {
      return getCdrUsersUserIdPayments({
        path: { user_id: userId },
      });
    },
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    payments: data?.data as PaymentComplete[] | undefined,
    total: data?.data?.reduce((acc, payment) => acc + payment.total, 0),
    isLoading,
    refetch,
  };
};
