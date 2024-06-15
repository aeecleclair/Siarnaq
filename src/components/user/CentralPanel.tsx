import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";
import { sellers } from "./sellers";
import { useSearchParams } from "next/navigation";

export const CentralPanel = () => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || sellers?.at(0)?.id || "";

  return firstSellerId === "recap" ? <RecapPanel /> : <ProductPanel />;
};
