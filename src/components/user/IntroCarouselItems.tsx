import { Button } from "../ui/button";
import { CarouselContent, CarouselItem, useCarousel } from "../ui/carousel";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const IntroCarouselItems = () => {
  const { scrollNext, canScrollNext } = useCarousel();
  const [page, setPage] = useState(0);
  const buttonLabels = ["On commence ?", "Valider", "Terminer"];
  const content: React.ReactNode[] = [
    <div key="intro">
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
    <div key="curriculum">
      <h1 className="text-3xl font-semibold">Présentation</h1>
      <p>
        Nous sommes une association qui a pour but de vous aider à trouver les
        produits que vous cherchez.
      </p>
    </div>,
    <div key="login">
      <h1 className="text-3xl font-semibold">Connexion</h1>
      <p>
        Pour accéder à nos services, vous devez vous connecter avec votre
        compte.
      </p>
    </div>,
  ];

  function onNextStep() {
    scrollNext();
    setPage((prev) => prev + 1);
  }

  return (
    <>
      <CarouselContent>
        {content.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselContent>
      <div className="pb-6 pt-10 flex justify-center">
        <Button
          size="lg"
          className="w-[160px]"
          onClick={onNextStep}
          disabled={!canScrollNext}
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
    </>
  );
};
