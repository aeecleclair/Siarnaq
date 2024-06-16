import { CurriculumComplete, deleteCdrCurriculumsCurriculumId } from "@/api";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";

interface CurriculumItemProps {
  curriculum: CurriculumComplete;
  setRefetchCurriculum: (arg0: boolean) => void;
}

export const CurriculumItem = ({
  curriculum,
  setRefetchCurriculum,
}: CurriculumItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  async function deleteCurriculum(curriculumId: string) {
    setIsLoading(true);
    const { data, error } = await deleteCdrCurriculumsCurriculumId({
      path: {
        curriculum_id: curriculumId,
      },
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setRefetchCurriculum(true);
    setIsLoading(false);
  }
  return (
    <div key={curriculum.id} className="flex flex-row justify-between">
      <span>{curriculum.name}</span>
      <LoadingButton
        size="icon"
        variant="destructive"
        className="h-8"
        isLoading={isLoading}
        onClick={() => deleteCurriculum(curriculum.id)}
      >
        <HiTrash className="w-5 h-5" />
      </LoadingButton>
    </div>
  );
};
