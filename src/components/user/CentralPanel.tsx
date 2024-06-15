import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";
import {
  SellerComplete,
  app__modules__cdr__schemas_cdr__ProductComplete,
  getCdrOnlineSellersSellerIdProducts,
} from "@/api";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const CentralPanel = ({
  onlineSellers,
  setRefetchOnlineSellers,
}: {
  onlineSellers: SellerComplete[];
  setRefetchOnlineSellers: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id || "";

  return firstSellerId === "recap" ? (
    <RecapPanel onlineSellers={onlineSellers} />
  ) : (
    <ProductPanel onlineSellers={onlineSellers} />
  );
};
