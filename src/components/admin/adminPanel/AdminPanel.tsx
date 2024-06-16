import { SellerAccordionItem } from "./SellerAccordion.tsx/SellerAccordionItem";
import { SellerComplete } from "@/api";
import { Accordion } from "@/components/ui/accordion";

interface AdminPanelProps {
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}

export const AdminPanel = ({ sellers, setRefetchSellers }: AdminPanelProps) => {
  return (
    <Accordion type="multiple">
      <SellerAccordionItem
        sellers={sellers}
        setRefetchSellers={setRefetchSellers}
      />
    </Accordion>
  );
};
