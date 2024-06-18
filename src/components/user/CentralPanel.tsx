import { IntroPanel } from "./IntroPanel";
import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";
import { SellerComplete } from "@/api";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export const CentralPanel = ({
  onlineSellers,
}: {
  onlineSellers: SellerComplete[];
  setRefetchOnlineSellers: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id || "";

  if (firstSellerId === "intro") {
    return <IntroPanel />;
  }
  if (firstSellerId === "recap") {
    return <RecapPanel onlineSellers={onlineSellers} />;
  }
  return <ProductPanel onlineSellers={onlineSellers} />;
};
