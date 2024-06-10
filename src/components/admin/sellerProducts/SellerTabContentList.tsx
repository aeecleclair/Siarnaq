import { SellerTabContent } from "./SellerTabContent";
import { SellerComplete } from "@/api";

export const SellerTabContentList = (props: {
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}) => {
  return props.sellers.map((seller) => (
    <SellerTabContent
      key={seller.id}
      seller={seller}
      setRefetchSellers={props.setRefetchSellers}
    />
  ));
};
