import { ToggleSeller } from "./ToggleSeller";
import { CoreGroupSimple, SellerComplete, getGroups } from "@/api";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";

interface SellerAccordionItemProps {
  sellers: SellerComplete[];
  setRefetchSellers: (arg0: boolean) => void;
}

export const SellerAccordionItem = ({
  sellers,
  setRefetchSellers,
}: SellerAccordionItemProps) => {
  const [groups, setGroups] = useState<CoreGroupSimple[]>([]);
  const [refetchGroups, setRefetchGroups] = useState<boolean>(true);

  const onGetGroups = async () => {
    const { data, error } = await getGroups({});
    if (error) {
      console.log(error);
      return;
    }
    setGroups(data!);
  };

  useEffect(() => {
    if (refetchGroups) {
      onGetGroups();
      setRefetchGroups(false);
    }
  }, [refetchGroups]);
  return (
    <AccordionItem value="association">
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">Association</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        {groups.map((group) => (
          <ToggleSeller
            key={group.id}
            group={group}
            sellers={sellers}
            setRefetchGroups={setRefetchGroups}
            setRefetchSellers={setRefetchSellers}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
