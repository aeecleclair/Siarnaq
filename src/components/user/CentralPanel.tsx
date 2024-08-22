import { CdrUser, SellerComplete } from "@/api";
import { useSearchParams } from "next/navigation";

import { InfoPanel } from "./InfoPanel";
import { IntroPanel } from "./IntroPanel";
import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";

interface CentralPanelProps {
  user: CdrUser;
  onlineSellers: SellerComplete[];
}

export const CentralPanel = ({ user, onlineSellers }: CentralPanelProps) => {
  const searchParams = useSearchParams();
  const firstSellerId = searchParams.get("sellerId") || "intro";

  if (firstSellerId === "intro") {
    return <IntroPanel />;
  }
  if (firstSellerId === "info") {
    return <InfoPanel />;
  }
  if (firstSellerId === "recap") {
    return <RecapPanel />;
  }
  return <ProductPanel />;
};
