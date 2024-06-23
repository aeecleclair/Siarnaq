import { PaymentPart } from "./Payment/PaymentPart";
import { ProductPart } from "./Product/ProductPart";
import { SellerItem } from "./Product/SellerItem";
import { CoreUser } from "@/api";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserPayment } from "@/hooks/useUserPayment";
import { useVariantQuantityStore } from "@/stores/variantQuantityStore";

interface RecapPanelProps {
  user: CoreUser;
}

export const RecapPanel = ({ user }: RecapPanelProps) => {
  const { variantQuantity } = useVariantQuantityStore();
  const { total: totalPaid } = useUserPayment(user.id);
  const sellerIds = Object.keys(variantQuantity) as Array<string>;
  const totalToPay = 100;
  const remainingToPay = totalToPay - (totalPaid ?? 0);

  return (
    <div className="grid gap-12 pt-8">
      <div>
        <CardTitle>
          {user.firstname} {user.name}
        </CardTitle>
      </div>
      <ProductPart user={user} />
      <PaymentPart user={user} />
      <div className="grid gap-6">
        <CardTitle className="flex flex-row w-full">
          <span className="font-bold">Reste à payer</span>
          <span className="ml-auto font-semibold">{remainingToPay} €</span>
        </CardTitle>
      </div>
    </div>
  );
};
