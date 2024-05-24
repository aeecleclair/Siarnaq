import { SellerTabContent } from "./SellerTabContent";
import { sellers } from "./sellers";

export const SellerTabContentList = () => {
  return sellers.map((seller) => (
    <SellerTabContent key={seller.id} seller={seller} />
  ));
};
