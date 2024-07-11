import { PaymentPart } from "../custom/Payment/PaymentPart";
import { ProductPart } from "../custom/Product/ProductPart";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { PaymentButton } from "./PaymentButton";
import { useUser } from "@/hooks/useUser";
import { useTokenStore } from "@/stores/token";

export const RecapPanel = () => {
  const { userId } = useTokenStore();
  const { user } = useUser(userId);

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
        <PaymentButton />
      </CardFooter>
    </Card>
  );
};
