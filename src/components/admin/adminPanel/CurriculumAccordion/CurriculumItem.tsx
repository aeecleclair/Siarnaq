import { CurriculumComplete, deleteCdrCurriculumsCurriculumId } from "@/api";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { useCurriculums } from "@/hooks/useCurriculums";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";

interface CurriculumItemProps {
  curriculum: CurriculumComplete;
}

export const CurriculumItem = ({ curriculum }: CurriculumItemProps) => {
  const { toast } = useToast();
  const { refetch: refetchCurriculums } = useCurriculums();
  const [isLoading, setIsLoading] = useState(false);
  async function deleteCurriculum(curriculumId: string) {
    setIsLoading(true);
    const { data, error } = await deleteCdrCurriculumsCurriculumId({
      path: {
        curriculum_id: curriculumId,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    refetchCurriculums();
    setIsLoading(false);
  }
  return (
    <div key={curriculum.id} className="flex flex-row items-center">
      <LoadingButton
        size="icon"
        variant="destructive"
        className="h-8"
        isLoading={isLoading}
        onClick={() => deleteCurriculum(curriculum.id)}
      >
        <HiTrash className="w-5 h-5" />
      </LoadingButton>
      <span className="ml-4">{curriculum.name}</span>
    </div>
  );
};
