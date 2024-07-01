import { useTranslations } from "next-intl";
import { HelloAssoButton } from "../custom/HelloAssoButton";
import { WarningDialog } from "../custom/WarningDialog";
import { Button } from "../ui/button";
import { useState } from "react";

export const PaymentButton = () => {
  const t = useTranslations("PaymentButton");
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
            <div className="my-2 font-semibold">{t("title")}</div>
            <p>{t("description")}</p>
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
        {t("pay")}
      </Button>
    </>
  );
};
