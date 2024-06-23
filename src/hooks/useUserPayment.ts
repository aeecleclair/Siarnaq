import { getCdrUsersUserIdPayments, PaymentComplete } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUserPayment = (userId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userPayment", userId],
    queryFn: () => {
      return getCdrUsersUserIdPayments({
        path: { user_id: userId },
      });
    },
  });

  return {
    payments: data?.data as PaymentComplete[] | undefined,
    total: data?.data?.reduce((acc, payment) => acc + payment.total, 0),
    isLoading,
    refetch,
  };
};
