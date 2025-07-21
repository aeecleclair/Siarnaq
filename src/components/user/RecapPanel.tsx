import { useOnlineSellers } from "@/hooks/useOnlineSellers";
import { useUser } from "@/hooks/useUser";
import { useUserPayments } from "@/hooks/useUserPayments";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";

import { PageIndicator } from "../custom/PageIndicator";
import { PaymentPart } from "../custom/Payment/PaymentPart";
import { ProductPart } from "../custom/Product/ProductPart";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PaymentButton } from "./PaymentButton";

export const RecapPanel = () => {
  const t = useTranslations("recap");

  const { userId } = useTokenStore();
  const { user } = useUser(userId);
  const { purchases, total: totalToPay } = useUserPurchases(userId);
  const { total: totalPaid } = useUserPayments(userId);

  const { onlineSellers } = useOnlineSellers();

  const remainingToPay = (totalToPay || 0) - (totalPaid || 0);

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="space-y-2">
        {user && (
          <div className="flex flex-col gap-8">
            <ProductPart user={user} />
            <PaymentPart user={user} />

            <div className="flex items-center justify-around">
              {remainingToPay >= 0 && (
                <div className="italic">
                  {t("remainingToPay")} {remainingToPay.toFixed(2)} €
                </div>
              )}
              {purchases.length > 0 && remainingToPay > 0 && <PaymentButton />}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-4 ">
        <PageIndicator currentSellerId="recap" onlineSellers={onlineSellers} />
      </CardFooter>
    </Card>
  );
};
