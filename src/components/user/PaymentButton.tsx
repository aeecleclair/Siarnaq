import { HelloAssoButton } from "../custom/HelloAssoButton";
import { WarningDialog } from "../custom/WarningDialog";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { usePaymentUrl } from "@/hooks/usePaymentUrl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaymentButtonProps {
  amount: number;
}

export const PaymentButton = ({ amount }: PaymentButtonProps) => {
  const t = useTranslations("PaymentButton");
  const [isOpened, setIsOpened] = useState(false);
  const { paymentUrl, isLoading, refetch } = usePaymentUrl(amount);
  const router = useRouter();
  if (!isLoading && !!paymentUrl) {
    router.push(paymentUrl.url);
  }
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
        customButton={
          <HelloAssoButton isLoading={isLoading} onClick={() => refetch()} />
        }
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
