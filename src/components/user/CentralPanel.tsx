import { useSearchParams } from "next/navigation";
import { ProductPanel } from "./ProductPanel";
import { sellers } from "./sellers";
import { RecapPanel } from "./RecapPanel";

export const CentralPanel = () => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || sellers?.at(0)?.id || "";

  return firstSellerId === "recap" ? (
    <RecapPanel />
  ) : (
    <ProductPanel />
  );
};
