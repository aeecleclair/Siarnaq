import { AdminPanel } from "./AdminPanel";
import { SellerTabContent } from "./SellerTabContent";
import { SellerComplete } from "@/api";
import { useSearchParams } from "next/navigation";

export const SellerTabContentList = (props: {
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  if (activeSellerId === "cdradmin") {
    return <AdminPanel />;
  }
  return props.sellers.map((seller) => (
    <SellerTabContent
      key={seller.id}
      seller={seller}
      setRefetchSellers={props.setRefetchSellers}
    />
  ));
};
