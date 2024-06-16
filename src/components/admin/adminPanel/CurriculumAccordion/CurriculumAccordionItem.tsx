import { AddCurriculumButton } from "./AddCurriculumButton";
import { CurriculumComplete, getCdrCurriculums } from "@/api";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { CurriculumItem } from "./CurriculumItem";

export const CurriculumAccordionItem = () => {
  const [curriculum, setCurriculum] = useState<CurriculumComplete[]>([]);
  const [refetchCurriculum, setRefetchCurriculum] = useState<boolean>(true);

  const onGetCurriculum = async () => {
    const { data, error } = await getCdrCurriculums({});
    if (error) {
      console.log(error);
      return;
    }
    setCurriculum(data!);
  };

  useEffect(() => {
    if (refetchCurriculum) {
      onGetCurriculum();
      setRefetchCurriculum(false);
    }
  }, [refetchCurriculum]);
  return (
    <AccordionItem value="curriculum">
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">Cursus</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <AddCurriculumButton setRefetchCurriculum={setRefetchCurriculum} />
        {curriculum.map((curriculum) => (
          <CurriculumItem
            key={curriculum.id}
            curriculum={curriculum}
            setRefetchCurriculum={setRefetchCurriculum}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
