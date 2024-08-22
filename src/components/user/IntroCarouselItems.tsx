import { CdrUser, postCdrUsersUserIdCurriculumsCurriculumId } from "@/api";
import { useCurriculums } from "@/hooks/useCurriculums";
import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingButton } from "../custom/LoadingButton";
import { Badge } from "../ui/badge";
import { CarouselContent, CarouselItem, useCarousel } from "../ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

interface IntroCarouselItemsProps {
  user: CdrUser;
  refetch: () => void;
}

export const IntroCarouselItems = ({
  user,
  refetch,
}: IntroCarouselItemsProps) => {
  const { toast } = useToast();
  const t = useTranslations("IntroCarouselItem");
  const { scrollNext } = useCarousel();
  const { curriculums } = useCurriculums();
  const { onlineSellers } = useOnlineSellers();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const buttonLabels = [t("begin"), t("validate")];

  const [selectedCurriculum, setSelectedCurriculum] = useState<
    string | undefined
  >(user.curriculum?.id);

  const canGoNext =
    page === 0 ||
    (page === 1 &&
      selectedCurriculum &&
      selectedCurriculum !== user.curriculum?.id);
  const content: React.ReactNode[] = [
    <div key="intro" className="flex flex-col gap-2">
      <span>{t("description")}</span>
      <span>
        {t("contact")} <a href="mailto://bde@ec-lyon.fr">bde@ec-lyon.fr</a>
      </span>
    </div>,
    <div key="curriculum" className="h-full gap-4 flex flex-col">
      <span>{t("selectCurriculum")}</span>
      <Select value={selectedCurriculum} onValueChange={setSelectedCurriculum}>
        <SelectTrigger className="w-[300px] m-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {curriculums.map((curriculum) => (
              <SelectItem key={curriculum.id} value={curriculum.id}>
                <Badge variant="secondary">{curriculum.name}</Badge>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>,
  ];

  async function setCurriculum() {
    setIsLoading(true);
    if (!selectedCurriculum) {
      setIsLoading(false);
      return;
    }
    const { data, error } = await postCdrUsersUserIdCurriculumsCurriculumId({
      path: {
        user_id: user!.id,
        curriculum_id: selectedCurriculum,
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
    refetch();
    setIsLoading(false);
  }

  async function onNextStep() {
    if (canGoNext) {
      if (page === 1) {
        await setCurriculum();
        const firstSeller =
          onlineSellers.length > 0 ? onlineSellers[0] : undefined;
        if (firstSeller) {
          router.push(`?sellerId=${firstSeller.id}`);
        }
      }
      if (page === 0 && !user.curriculum?.id) {
        setPage(page + 1);
        scrollNext();
      } else {
        const firstSeller =
          onlineSellers.length > 0 ? onlineSellers[0] : undefined;
        if (firstSeller) {
          router.push(`?sellerId=${firstSeller.id}`);
        }
      }
    }
  }

  return (
    <>
      <CarouselContent>
        {content.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselContent>
      <div className="pb-6 pt-10 flex justify-center">
        <LoadingButton
          size="lg"
          className="w-[160px]"
          onClick={onNextStep}
          isLoading={isLoading}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {buttonLabels[page]}
            </motion.div>
          </AnimatePresence>
        </LoadingButton>
      </div>
    </>
  );
};
