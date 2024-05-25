import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sellers } from "./sellers";
import { useRouter } from "next/navigation";

export const SellerTabList = () => {
  const router = useRouter();

  const handleClick = (sellerId: string) => {
    router.push(`/admin/?sellerId=${sellerId}`);
  };

  return (
    <TabsList className={`"grid w-full grid-cols-${sellers.length}"`}>
      {sellers.map((seller) => (
        <TabsTrigger
          key={seller.id}
          value={seller.id}
          className="w-full min-w-18"
          onClick={() => handleClick(seller.id)}
        >
          {seller.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
