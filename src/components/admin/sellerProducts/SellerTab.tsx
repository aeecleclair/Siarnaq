import { Tabs } from "@/components/ui/tabs";
import { SellerTabList } from "./SellerTabList";
import { SellerTabContentList } from "./SellerTabContentList";
import { sellers } from "./sellers";

export const SellerTab = () => {
  const firstSeller = sellers[0];
  return (
    <div className="flex items-center justify-center p-6 min-w-96">
      <Tabs defaultValue={firstSeller.id} className="w-full">
        <SellerTabList />
        <SellerTabContentList />
      </Tabs>
    </div>
  );
};
