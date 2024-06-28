import { CurriculumAccordionItem } from "./CurriculumAccordion/CurriculumAccordionItem";
import { SellerAccordionItem } from "./SellerAccordion.tsx/SellerAccordionItem";
import { StatusAccordionItem } from "./StatusPanel/StatusPanel";
import { SellerComplete, Status } from "@/api";
import { Accordion } from "@/components/ui/accordion";

interface AdminPanelProps {
  status: Status;
  setRefetchStatus: (arg0: boolean) => void;
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}

export const AdminPanel = ({
  sellers,
  setRefetchSellers,
  status,
  setRefetchStatus,
}: AdminPanelProps) => {
  return (
    <Accordion type="multiple">
      <SellerAccordionItem
        sellers={sellers}
        setRefetchSellers={setRefetchSellers}
      />
      <CurriculumAccordionItem />
      <StatusAccordionItem
        status={status}
        setRefetchStatus={setRefetchStatus}
      />
    </Accordion>
  );
};
