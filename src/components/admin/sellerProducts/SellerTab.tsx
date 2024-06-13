import { SellerTabContentList } from "./SellerTabContentList";
import { SellerTabList } from "./SellerTabList";
import { SellerComplete, getCdrSellers } from "@/api";
import { Tabs } from "@/components/ui/tabs";
import { useToken } from "@/hooks/useToken";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SellerTab = () => {
  const searchParams = useSearchParams();
  const { getToken } = useToken();

  const [sellers, setSellers] = useState<SellerComplete[]>([]);
  const firstSellerId = searchParams.get("sellerId") || sellers?.at(0)?.id;
  const [refetchSellers, setRefetchSellers] = useState<boolean>(true);

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
      getToken().then(()=>onGetCdrSellers());
      setRefetchSellers(false);
    }
  }, [refetchSellers]);

  return (
    <div
      className="flex items-center justify-center p-6 min-w-96"
      onLoad={onGetCdrSellers}
    >
      <Tabs defaultValue={firstSellerId} className="w-full">
        <SellerTabList sellers={sellers} />
        <SellerTabContentList
          sellers={sellers}
          setRefetchSellers={setRefetchSellers}
        />
      </Tabs>
    </div>
  );
};
