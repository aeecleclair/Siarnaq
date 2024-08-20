import { SellerComplete, Status } from "@/api";
import { useSellerProducts } from "@/hooks/useSellerProducts";
import { useUser } from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";

import { AdminPanel } from "../adminPanel/AdminPanel";
import { RecapPanel } from "../adminPanel/RecapPanel/RecapPanel";
import { SellerTabContent } from "./SellerTabContent";

interface SellerTabContentListProps {
  status: Status;
  sellers: SellerComplete[];
  isAdmin?: boolean;
}

export const SellerTabContentList = ({
  status,
  sellers,
  isAdmin,
}: SellerTabContentListProps) => {
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  const isSeller = !["cdradmin", "cdrrecap"].includes(activeSellerId ?? "");
  const { products, refetch: refetchProducts } = useSellerProducts(
    isSeller ? activeSellerId : null,
  );
  const userId = searchParams.get("userId");
  const { user, refetch } = useUser(userId);

  if (activeSellerId === "cdradmin" && isAdmin) {
    return <AdminPanel sellers={sellers} status={status} />;
  }
  if (activeSellerId === "cdrrecap" && isAdmin) {
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
