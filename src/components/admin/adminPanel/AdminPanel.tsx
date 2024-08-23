import { SellerComplete, Status } from "@/api";
import { Accordion } from "@/components/ui/accordion";

import { CurriculumAccordionItem } from "./CurriculumAccordion/CurriculumAccordionItem";
import { SellerAccordionItem } from "./SellerAccordion.tsx/SellerAccordionItem";
import { StatusAccordionItem } from "./StatusPanel/StatusPanel";

interface AdminPanelProps {
  status: Status;
  sellers: SellerComplete[];
}

export const AdminPanel = ({ sellers, status }: AdminPanelProps) => {
  return (
    <Accordion type="multiple" defaultValue={["status"]}>
      <SellerAccordionItem sellers={sellers} />
      <CurriculumAccordionItem />
      <StatusAccordionItem status={status} />
    </Accordion>
  );
};
