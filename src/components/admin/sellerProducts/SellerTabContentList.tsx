import { AdminPanel } from "../adminPanel/AdminPanel";
import { RecapPanel } from "../adminPanel/RecapPanel/RecapPanel";
import { SellerTabContent } from "./SellerTabContent";
import { SellerComplete, Status } from "@/api";
import { useSellerProducts } from "@/hooks/useSellerProducts";
import { useUser } from "@/hooks/useUser";
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
  const isSeller = !["cdradmin", "cdrrecap"].includes(activeSellerId ?? "");
  const { products, refetch: refetchProducts } = useSellerProducts(
    isSeller ? activeSellerId : null,
  );
  const userId = searchParams.get("userId");
  const { user, refetch } = useUser(userId);

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
    return user && <RecapPanel user={user} refetch={refetch} />;
  }
  return sellers.map((seller) => (
    <SellerTabContent
      key={seller.id}
      seller={seller}
      status={status}
      products={products}
      refetchProducts={refetchProducts}
    />
  ));
};