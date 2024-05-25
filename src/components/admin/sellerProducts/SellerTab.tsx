import { Tabs } from "@/components/ui/tabs";
import { SellerTabList } from "./SellerTabList";
import { SellerTabContentList } from "./SellerTabContentList";
import { sellers } from "./sellers";
import { useSearchParams } from "next/navigation";

export const SellerTab = () => {
  const searchParams = useSearchParams();
  const firstSellerId = searchParams.get("sellerId") || sellers[0].id;
  return (
    <div className="flex items-center justify-center p-6 min-w-96">
      <Tabs defaultValue={firstSellerId} className="w-full">
        <SellerTabList />
        <SellerTabContentList />
      </Tabs>
    </div>
  );
};
