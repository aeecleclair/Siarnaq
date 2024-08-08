import { CurriculumAccordionItem } from "./CurriculumAccordion/CurriculumAccordionItem";
import { SellerAccordionItem } from "./SellerAccordion.tsx/SellerAccordionItem";
import { StatusAccordionItem } from "./StatusPanel/StatusPanel";
import { SellerComplete, Status } from "@/api";
import { Accordion } from "@/components/ui/accordion";

interface AdminPanelProps {
  status: Status;
  sellers: SellerComplete[];
}

export const AdminPanel = ({
  sellers,
  status,
}: AdminPanelProps) => {
  return (
    <Accordion type="multiple">
      <SellerAccordionItem
        sellers={sellers}
      />
      <CurriculumAccordionItem />
      <StatusAccordionItem
        status={status}
      />
    </Accordion>
  );
};
