import { IntroPanel } from "./IntroPanel";
import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";
import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import { useSearchParams } from "next/navigation";

export const CentralPanel = () => {
  const { onlineSellers } = useOnlineSellers();
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id || "";

  if (firstSellerId === "intro") {
    return <IntroPanel />;
  }
  if (firstSellerId === "recap") {
    return <RecapPanel />;
  }
  return <ProductPanel />;
};
