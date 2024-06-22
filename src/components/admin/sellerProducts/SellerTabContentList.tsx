import { AdminPanel } from "../adminPanel/AdminPanel";
import { RecapPanel } from "../adminPanel/RecapPanel/RecapPanel";
import { SellerTabContent } from "./SellerTabContent";
import { SellerComplete, Status } from "@/api";
import { useSearchParams } from "next/navigation";

interface SellerTabContentListProps {
  status: Status;
  setRefetchStatus: (arg0: boolean) => void;
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}

export const SellerTabContentList = ({
  status,
  setRefetchStatus,
  sellers,
  setRefetchSellers,
}: SellerTabContentListProps) => {
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  if (activeSellerId === "cdradmin") {
    return (
      <AdminPanel
        sellers={sellers}
        setRefetchSellers={setRefetchSellers}
        status={status}
        setRefetchStatus={setRefetchStatus}
      />
    );
  }
  if (activeSellerId === "cdrrecap") {
    return <RecapPanel />;
  }
  return sellers.map((seller) => (
    <SellerTabContent
      key={seller.id}
      seller={seller}
      status={status}
      setRefetchSellers={setRefetchSellers}
    />
  ));
};
