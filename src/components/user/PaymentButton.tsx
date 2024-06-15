import { HelloAssoButton } from "../custom/HelloAssoButton";
import { WarningDialog } from "../custom/WarningDialog";
import { Button } from "../ui/button";
import { useState } from "react";

export const PaymentButton = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <WarningDialog
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        isLoading={isLoading}
        title="Payer"
        description={
          <div>
            <div className="my-2 font-semibold">
              Information sur le prestataire de paiement
            </div>
            <p>
              Vous allez être redirigé vers HelloAsso pour procéder au paiement
              de votre inscription. Ce service ne prend aucun frais sur les
              paiements, il se repose uniquement sur les dons. Par défaut,
              HelloAsso vous propose de faire un don. Si vous choississez de le
              faire, seul HelloAsso en bénéficiera.
            </p>
          </div>
        }
        customButton={<HelloAssoButton isLoading={isLoading} />}
      />
      <Button
        className="col-span-4 ml-auto w-[100px]"
        onClick={(_) => {
          setIsOpened(true);
        }}
      >
        Payer
      </Button>
    </>
  );
};
