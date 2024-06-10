import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { SellerComplete } from "@/api";

export const SellerTabList = (props:{sellers:SellerComplete[]}) => {
  const router = useRouter();

  const handleClick = (sellerId: string) => {
    router.push(`/admin/?sellerId=${sellerId}`);
  };

  return (
    <TabsList className={`"grid w-full grid-cols-${props.sellers.length}"`}>
      {props.sellers.map((seller) => (
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
