import { IntroPanel } from "./IntroPanel";
import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";
import { CdrUser, SellerComplete } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";

interface CentralPanelProps {
  user: CdrUser;
  onlineSellers: SellerComplete[];
}

export const CentralPanel = ({ user, onlineSellers }: CentralPanelProps) => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || user?.curriculum
      ? onlineSellers.at(0)?.id ?? "intro"
      : "intro";

  if (firstSellerId === "intro") {
    return <IntroPanel />;
  }
  if (firstSellerId === "recap") {
    return <RecapPanel />;
  }
  return <ProductPanel />;
};
