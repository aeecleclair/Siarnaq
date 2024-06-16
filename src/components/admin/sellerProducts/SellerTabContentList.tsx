import { AdminPanel } from "../adminPanel/AdminPanel";
import { SellerTabContent } from "./SellerTabContent";
import { SellerComplete } from "@/api";
import { useSearchParams } from "next/navigation";

interface SellerTabContentListProps {
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}

export const SellerTabContentList = ({
  sellers,
  setRefetchSellers,
}: SellerTabContentListProps) => {
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  if (activeSellerId === "cdradmin") {
    return <AdminPanel sellers={sellers}
      setRefetchSellers={setRefetchSellers} />;
  }
  return sellers.map((seller) => (
    <SellerTabContent
      key={seller.id}
      seller={seller}
      setRefetchSellers={setRefetchSellers}
    />
  ));
};
