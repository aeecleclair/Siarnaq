import { TextSeparator } from "../custom/TextSeparator";
import { Button } from "../ui/button";
import { CarouselContent, CarouselItem, useCarousel } from "../ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const IntroCarouselItems = () => {
  const { scrollNext, canScrollNext } = useCarousel();
  const [page, setPage] = useState(0);
  const buttonLabels = ["On commence ?", "Valider", "Terminer"];
  const possiblePromos = Array.from({ length: 5 }).map((_, index) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - index);
    return date.getFullYear().toString();
  });

  const [selectedPromo, setSelectedPromo] = useState<string | undefined>(
    undefined,
  );

  const canGoNext = page === 0 || (page === 1 && selectedPromo);
  const content: React.ReactNode[] = [
    <div key="intro" className="flex flex-col gap-2">
      <p>
        Consequat sint incididunt laborum ipsum. Nostrud enim culpa consequat
        laborum eiusmod minim consectetur deserunt sunt proident adipisicing.
        Adipisicing quis magna ea magna sint minim nostrud do ullamco non
        commodo adipisicing. Nisi elit veniam nostrud esse fugiat culpa.
        Excepteur ex minim sint cillum ipsum et ex pariatur nostrud. Laborum
        eiusmod tempor dolor sunt. In aute ad dolor non laborum ea nulla fugiat.
      </p>
      <p>
        Anim consectetur qui excepteur aute exercitation deserunt do nulla
        eiusmod magna tempor qui. Sunt velit commodo enim occaecat incididunt
        non nostrud dolor velit. Consequat non laborum aliquip incididunt eu.
        Ullamco exercitation magna in non nostrud elit cupidatat ad minim
        nostrud. Enim tempor commodo ad magna.
      </p>
    </div>,
    <div key="curriculum" className="h-full gap-4 flex flex-col">
      <span>Pour commencer, veuillez sélectionner votre promo :</span>
      <Select value={selectedPromo} onValueChange={setSelectedPromo}>
        <SelectTrigger className="w-[300px] m-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {possiblePromos.map((promo) => (
              <SelectItem key={promo} value={promo}>
                Promo {promo}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>,
    <div key="login" className="flex flex-col gap-4">
      <span className="m-auto">Vous avez déjà un compte ?</span>
      <Button size="lg" className="w-[220px] m-auto mb-2">
        Se connecter avec MyECL
      </Button>
      <TextSeparator text="Sinon" />
      <Button variant="outline" size="lg" className="w-[220px] m-auto mt-2">
        {"S'inscrire"}
      </Button>
    </div>,
  ];

  function onNextStep() {
    if (canGoNext) {
      setPage(page + 1);
      scrollNext();
    }
  }

  return (
    <>
      <CarouselContent>
        {content.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselContent>
      {page !== 2 && (
        <div className="pb-6 pt-10 flex justify-center">
          <Button
            size="lg"
            className="w-[160px]"
            onClick={onNextStep}
            disabled={!canScrollNext || !canGoNext}
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
          </Button>
        </div>
      )}
    </>
  );
};
