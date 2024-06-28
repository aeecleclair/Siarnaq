import { SellerTabContentList } from "./SellerTabContentList";
import { SellerTabList } from "./SellerTabList";
import { SellerComplete, Status, getCdrSellers } from "@/api";
import { Tabs } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SellerTabProps {
  status: Status;
  setRefetchStatus: (arg0: boolean) => void;
}

export const SellerTab = ({ status, setRefetchStatus }: SellerTabProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sellers, setSellers] = useState<SellerComplete[]>([]);
  const firstSellerId =
    searchParams.get("sellerId") || sellers.at(0)?.id || "cdradmin";
  const [refetchSellers, setRefetchSellers] = useState<boolean>(true);

  useEffect(() => {
    if (!searchParams.get("sellerId") && sellers.length > 0 && firstSellerId) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("sellerId", firstSellerId);
      const query = current.toString();
      router.replace(`admin?${query}`);
    }
  }, [firstSellerId, router, searchParams, sellers]);

  const onGetCdrSellers = async () => {
    const { data, error } = await getCdrSellers({});
    if (error) {
      console.log(error);
      return;
    }
    setSellers(data!);
  };

  useEffect(() => {
    if (refetchSellers) {
      setRefetchSellers((_) => {
        onGetCdrSellers();
        return false;
      });
    }
  }, [refetchSellers]);

  return (
    <div
      className="flex items-center justify-center p-6 min-w-96"
      onLoad={onGetCdrSellers}
    >
      {firstSellerId && (
        <Tabs defaultValue={firstSellerId} className="w-full">
          <SellerTabList status={status} sellers={sellers} />
          <SellerTabContentList
            status={status}
            setRefetchStatus={setRefetchStatus}
            sellers={sellers}
            setRefetchSellers={setRefetchSellers}
          />
        </Tabs>
      )}
    </div>
  );
};
