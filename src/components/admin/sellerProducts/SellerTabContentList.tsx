import { SellerComplete } from "@/api";
import { SellerTabContent } from "./SellerTabContent";

export const SellerTabContentList = (props:{sellers:SellerComplete[], setRefetchSellers:(arg0:boolean)=>void}) => {
  return props.sellers.map((seller) => (
    <SellerTabContent key={seller.id} seller={seller} setRefetchSellers={props.setRefetchSellers} />
  ));
};
