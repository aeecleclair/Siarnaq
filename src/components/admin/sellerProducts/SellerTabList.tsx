import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sellers } from "./sellers";

export const SellerTabList = () => {
  return (
    <TabsList className={`"grid w-full grid-cols-${sellers.length}"`}>
      {sellers.map((seller) => (
        <TabsTrigger key={seller.id} value={seller.id} className="w-full">
          {seller.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
