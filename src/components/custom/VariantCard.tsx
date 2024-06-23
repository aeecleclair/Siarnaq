import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LoadingButton } from "./LoadingButton";
import {
  deleteCdrUsersUserIdPurchasesProductVariantId,
  postCdrUsersUserIdPurchasesProductVariantId,
} from "@/api";
import { ProductVariantComplete, PurchaseBase } from "@/api/types.gen";
import { useUserSellerPurchases } from "@/hooks/useUserSellerPurchases";
import { useTokenStore } from "@/stores/token";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

interface VariantCardProps {
  variant: ProductVariantComplete;
  sellerId: string;
  showDescription: boolean;
  isSelectable: boolean;
  isAdmin: boolean;
}

export const VariantCard = ({
  variant,
  sellerId,
  showDescription,
  isSelectable,
  isAdmin,
}: VariantCardProps) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { userId: myUserId } = useTokenStore();
  const { purchases, refetch } = useUserSellerPurchases(
    isAdmin ? userId ?? "" : myUserId ?? "",
    sellerId,
  );
  const numberSelectedVariant =
    purchases?.find((purchase) => purchase.product_variant_id === variant.id)
      ?.quantity || 0;
  const selected = numberSelectedVariant > 0;
  const [isLoading, setIsLoading] = useState(false);

  const purchaseVariant = async (quantity: number) => {
    setIsLoading(true);
    const body: PurchaseBase = {
      quantity: quantity,
    };
    const { data, error } = await postCdrUsersUserIdPurchasesProductVariantId({
      path: {
        user_id: userId ?? "",
        product_variant_id: variant.id,
      },
      body: body,
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    refetch();
  };

  const cancelPurchase = async () => {
    setIsLoading(true);
    const { data, error } = await deleteCdrUsersUserIdPurchasesProductVariantId(
      {
        path: {
          user_id: userId ?? "",
          product_variant_id: variant.id,
        },
      },
    );
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    refetch();
  };

  return (
    <Card
      className={`min-w-40 h-[95px] ${selected && "border-black shadow-lg"} ${!variant.enabled && "text-muted-foreground"} ${isSelectable && variant.enabled && variant.unique && !isLoading && "cursor-pointer"}`}
      onClick={() => {
        if (isSelectable && variant.enabled && variant.unique && !isLoading) {
          if (selected) {
            cancelPurchase();
          } else {
            purchaseVariant(1);
          }
        }
      }}
    >
      {isSelectable && variant.enabled && variant.unique && isLoading && (
        <div className="w-full h-0 relative">
          <div className="flex m-auto h-[94px] w-full bg-white rounded-md bg-opacity-50">
            <ReloadIcon className="flex h-6 w-6 animate-spin m-auto" />
          </div>
        </div>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
        <CardTitle className="text-sm font-medium">
          <span>{variant.name_en}</span>
        </CardTitle>
        {!variant.unique && (
          <div className="flex items-center space-x-2">
            <LoadingButton
              variant="outline"
              className="h-6 px-1"
              disabled={!selected || !variant.enabled}
              onClick={(e) => {
                if (!isSelectable) return;
                e.stopPropagation();
                purchaseVariant(numberSelectedVariant - 1);
              }}
              isLoading={isLoading}
            >
              <HiMinus className="w-4 h-4" />
            </LoadingButton>
            <span className="text-xs text-muted-foreground w-3 justify-center flex">
              {numberSelectedVariant}
            </span>
            <LoadingButton
              variant="outline"
              className="h-6 px-1"
              disabled={!variant.enabled}
              onClick={(e) => {
                if (!isSelectable) return;
                e.stopPropagation();
                purchaseVariant(numberSelectedVariant + 1);
              }}
              isLoading={isLoading}
            >
              <HiPlus className="w-4 h-4" />
            </LoadingButton>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">
          <span>{variant.price} €</span>
        </div>
        {showDescription && (
          <p className="text-xs text-muted-foreground">
            {variant.description_en}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
