import {
  deleteCdrUsersUserIdPurchasesProductVariantId,
  postCdrUsersUserIdPurchasesProductVariantId,
} from "@/api";
import { ProductVariantComplete, PurchaseBase } from "@/api/types.gen";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useUserSellerPurchases } from "@/hooks/useUserSellerPurchases";
import { useTokenStore } from "@/stores/token";
import { useTranslation } from "@/translations/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { LoadingButton } from "./LoadingButton";

interface VariantCardProps {
  variant: ProductVariantComplete;
  sellerId: string;
  userId: string;
  showDescription: boolean;
  isSelectable: boolean;
  isAdmin: boolean;
  displayWarning?: boolean;
}

export const VariantCard = ({
  variant,
  sellerId,
  userId,
  showDescription,
  isSelectable,
  isAdmin,
  displayWarning,
}: VariantCardProps) => {
  const { toast } = useToast();
  const { selectTranslation } = useTranslation();
  const { userId: myUserId } = useTokenStore();
  const { purchases, refetch } = useUserSellerPurchases(
    isAdmin ? userId : myUserId,
    sellerId,
  );
  const { refetch: refetchUserPurchases } = useUserPurchases(userId);
  const numberSelectedVariant =
    purchases.find((purchase) => purchase.product_variant_id === variant.id)
      ?.quantity || 0;
  const selected = numberSelectedVariant > 0;
  const [isLoading, setIsLoading] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(numberSelectedVariant);

  useEffect(() => {
    setInputQuantity(numberSelectedVariant);
  }, [numberSelectedVariant]);

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
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setInputQuantity(quantity);
    refetch();
    refetchUserPurchases();
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
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    refetch();
    refetchUserPurchases();
  };

  return (
    <Card
      className={`min-w-40 h-[${showDescription ? "110" : "95"}px] ${selected && "shadow-lg"} ${selected && (displayWarning ? "border-destructive shadow-destructive/30" : "border-black")} ${!variant.enabled && "text-muted-foreground"} ${(isSelectable || (!isSelectable && selected)) && variant.enabled && variant.unique && !isLoading && "cursor-pointer"}`}
      onClick={() => {
        if (isSelectable && variant.enabled && variant.unique && !isLoading) {
          if (selected) {
            cancelPurchase();
          } else {
            purchaseVariant(1);
          }
        }
        if (selected && !isSelectable) {
          cancelPurchase();
        }
      }}
    >
      {isSelectable && variant.enabled && variant.unique && isLoading && (
        <div className="w-full h-0 relative">
          <div
            className={`flex m-auto ${showDescription ? "h-[109px]" : "h-[93px]"} w-full bg-white rounded-md bg-opacity-50`}
          >
            <ReloadIcon className="flex h-6 w-6 animate-spin m-auto" />
          </div>
        </div>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
        <CardTitle
          className={`text-sm font-medium ${!isSelectable && "text-muted-foreground"}`}
        >
          <span>{selectTranslation(variant.name_en, variant.name_fr)}</span>

          {isAdmin && (
            <div className="py-2 flex flex-wrap gap-2">
              {variant.allowed_curriculum?.map((curriculum) => (
                <Badge
                  key={curriculum.id}
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  {curriculum.name}
                </Badge>
              ))}
            </div>
          )}
        </CardTitle>
        {!variant.unique && (
          <div className="flex items-center space-x-2">
            <LoadingButton
              variant="outline"
              className="h-6 px-1"
              disabled={!selected || !variant.enabled || !isSelectable}
              onClick={(e) => {
                if (!isSelectable) {
                  if (selected) {
                    cancelPurchase();
                  }
                  return;
                }
                e.stopPropagation();
                const newQuantity = numberSelectedVariant - 1;
                if (newQuantity === 0) {
                  cancelPurchase();
                  return;
                }
                purchaseVariant(numberSelectedVariant - 1);
              }}
              isLoading={isLoading}
            >
              <HiMinus className="w-4 h-4" />
            </LoadingButton>
            <Input
              type="text"
              className="w-12 text-s flex h-6"
              value={inputQuantity}
              disabled={!variant.enabled || !isSelectable}
              onChange={(e) => {
                setInputQuantity(Number(e.target.value) || 0);
              }}
              onBlur={(e) => {
                if (!isSelectable) return;
                e.stopPropagation();
                const newQuantity = Number(e.target.value) || 0;
                if (newQuantity === 0) {
                  if (inputQuantity != 0) cancelPurchase();
                  return;
                }
                purchaseVariant(newQuantity);
              }}
            />
            <LoadingButton
              variant="outline"
              className="h-6 px-1"
              disabled={!variant.enabled || !isSelectable}
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
        <div
          className={`text-2xl font-bold ${!isSelectable && "text-muted-foreground"}`}
        >
          <span>{variant.price / 100} €</span>
        </div>
        {showDescription && (
          <p className="text-xs text-muted-foreground">
            {selectTranslation(variant.description_en, variant.description_fr)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
