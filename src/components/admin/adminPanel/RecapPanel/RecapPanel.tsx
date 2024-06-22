import { payements } from "../payements";
import { PaymentItem } from "./PaymentItem";
import { SellerItem } from "./SellerItem";
import { CoreUser } from "@/api";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useVariantQuantityStore } from "@/stores/variantQuantityStore";

interface RecapPanelProps {
  user: CoreUser;
}

export const RecapPanel = ({ user }: RecapPanelProps) => {
  const { variantQuantity } = useVariantQuantityStore();
  const sellerIds = Object.keys(variantQuantity) as Array<string>;
  const totalToPay = 100;
  const totalPaid = payements.reduce((acc, payment) => acc + payment.total, 0);
  const remainingToPay = totalToPay - totalPaid;

  return (
    <div className="grid gap-12 pt-8">
      <div>
        <CardTitle>
          {user.firstname} {user.name}
        </CardTitle>
      </div>
      <div className="grid gap-6">
        <div>
          <CardTitle>Récapitulatif</CardTitle>
        </div>
        <div className="space-y-2">
          {sellerIds.length > 0 ? (
            <>
              {sellerIds.map((id) => (
                <SellerItem key={id} id={id} />
              ))}
              <Separator className="my-2" />
              <div className="flex flex-row w-full">
                <span className="font-bold w-1/6">Total</span>
                <span className="ml-auto font-semibold">{totalToPay} €</span>
              </div>
            </>
          ) : (
            <div>Aucun produit</div>
          )}
        </div>
      </div>
      <div className="grid gap-6">
        <div>
          <CardTitle>Paiements</CardTitle>
        </div>
        <div className="space-y-2">
          {payements.length > 0 ? (
            <>
              {payements.map((payment) => (
                <PaymentItem key={payment.id} payment={payment} />
              ))}
              <Separator className="my-2" />
              <div className="flex flex-row w-full">
                <span className="font-bold w-1/6">Total</span>
                <span className="ml-auto font-semibold">{totalPaid} €</span>
              </div>
            </>
          ) : (
            <div>Aucun produit</div>
          )}
        </div>
      </div>
      <div className="grid gap-6">
        <CardTitle className="flex flex-row w-full">
          <span className="font-bold">Reste à payer</span>
          <span className="ml-auto font-semibold">{remainingToPay} €</span>
        </CardTitle>
      </div>
    </div>
  );
};
