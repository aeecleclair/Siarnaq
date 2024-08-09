import { getCdrPayAmount } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const usePaymentUrl = (amount: number | null) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["paymentUrl", amount],
    queryFn: () =>
      getCdrPayAmount({
        path: {
          amount: amount!,
        },
      }),
    retry: 3,
    enabled: false,
  });

  return {
    paymentUrl: data?.data,
    isLoading,
    refetch,
  };
};
