import { ToggleSeller } from "./ToggleSeller";
import { SellerComplete } from "@/api";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGroups } from "@/hooks/useGroups";

interface SellerAccordionItemProps {
  sellers: SellerComplete[];
}

export const SellerAccordionItem = ({ sellers }: SellerAccordionItemProps) => {
  const { groups } = useGroups();

  return (
    <AccordionItem value="association">
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">Association</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        {groups.map((group) => (
          <ToggleSeller key={group.id} group={group} sellers={sellers} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
