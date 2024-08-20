import { PaymentPart } from "../custom/Payment/PaymentPart";
import { ProductPart } from "../custom/Product/ProductPart";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { PaymentButton } from "./PaymentButton";
import { useUser } from "@/hooks/useUser";
import { useUserPayments } from "@/hooks/useUserPayments";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";

export const RecapPanel = () => {
  const t = useTranslations("Recap");

  const { userId } = useTokenStore();
  const { user } = useUser(userId);
  const { purchases, total: totalToPay } = useUserPurchases(userId);
  const { total: totalPaid } = useUserPayments(userId);

  const remainingToPay = (totalToPay || 0) - (totalPaid || 0);

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="space-y-2">
        {user && (
          <div className="flex flex-col gap-8">
            <ProductPart user={user} />
            <PaymentPart user={user} />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-4">
        {remainingToPay >= 0 && (
          <div className="italic">
            {t("remainingToPay")} {remainingToPay} €
          </div>
        )}
        {purchases.length > 0 && remainingToPay > 0 && <PaymentButton />}
      </CardFooter>
    </Card>
  );
};
