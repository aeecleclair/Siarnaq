import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCurriculums } from "@/hooks/useCurriculums";

import { AddCurriculumButton } from "./AddCurriculumButton";
import { CurriculumItem } from "./CurriculumItem";

export const CurriculumAccordionItem = () => {
  const { curriculums } = useCurriculums();

  return (
    <AccordionItem value="curriculum">
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">Cursus</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <AddCurriculumButton />
        {curriculums.map((curriculum) => (
          <CurriculumItem key={curriculum.id} curriculum={curriculum} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
