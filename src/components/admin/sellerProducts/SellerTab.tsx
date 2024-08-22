import { SellerComplete, Status, getCdrSellers } from "@/api";
import { Tabs } from "@/components/ui/tabs";
import { useCoreUser } from "@/hooks/useCoreUser";
import { useSellers } from "@/hooks/useSellers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { SellerTabContentList } from "./SellerTabContentList";
import { SellerTabList } from "./SellerTabList";

interface SellerTabProps {
  status: Status;
}

export const SellerTab = ({ status }: SellerTabProps) => {
  const { isAdmin } = useCoreUser();
  const { sellers } = useSellers();
  const searchParams = useSearchParams();
  const router = useRouter();

  const firstSellerId =
    searchParams.get("sellerId") ||
    sellers.at(0)?.id ||
    (isAdmin ? "cdradmin" : "");

  useEffect(() => {
    if (!searchParams.get("sellerId") && sellers.length > 0 && firstSellerId) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("sellerId", firstSellerId);
      const query = current.toString();
      router.replace(`admin?${query}`);
    }
  }, [firstSellerId, router, searchParams, sellers]);

  return (
    <div className="flex items-center justify-center p-6 min-w-96">
      {firstSellerId && (
        <Tabs defaultValue={firstSellerId} className="w-full">
          <SellerTabList status={status} sellers={sellers} isAdmin={isAdmin} />
          <SellerTabContentList
            status={status}
            sellers={sellers}
            isAdmin={isAdmin}
          />
        </Tabs>
      )}
    </div>
  );
};
