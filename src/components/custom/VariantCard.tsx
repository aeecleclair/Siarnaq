import {
  deleteCdrUsersUserIdPurchasesProductVariantId,
  patchCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId,
  postCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId,
  postCdrUsersUserIdPurchasesProductVariantId,
} from "@/api";
import { ProductVariantComplete, PurchaseBase } from "@/api/types.gen";
import { useSellerProductData } from "@/hooks/useSellerProductData";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";
import { LoadingButton } from "./LoadingButton";
import { Answer } from "./customFieldDialog.tsx/CustomFieldInput";
import { CustomFieldsDialog } from "./customFieldDialog.tsx/CustomFieldsDialog";

interface VariantCardProps {
  variant: ProductVariantComplete;
  sellerId: string;
  userId: string;
  showDescription: boolean;
  isSelectable: boolean;
  isAdmin: boolean;
  displayWarning?: boolean;
  productId: string;
}

export const VariantCard = ({
  variant,
  sellerId,
  userId,
  showDescription,
  isSelectable,
  isAdmin,
  displayWarning,
  productId,
}: VariantCardProps) => {
  const { toast } = useToast();
  const { selectTranslation } = useTranslation();
  const { userId: myUserId } = useTokenStore();
  const { purchases, refetch } = useUserSellerPurchases(
    isAdmin ? userId : myUserId,
    sellerId,
  );
  const { refetch: refetchUserPurchases } = useUserPurchases(userId);
  const { data: productFields } = useSellerProductData(sellerId, productId);
  const numberSelectedVariant =
    purchases.find((purchase) => purchase.product_variant_id === variant.id)
      ?.quantity || 0;
  const selected = numberSelectedVariant > 0;
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
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

  const openFieldDialog = () => {
    setIsOpened(true);
  };

  const onCustomFieldValidate = async (answers: Record<string, Answer>) => {
    purchaseVariant(1);
    await Promise.all(
      productFields.map((field) => {
        if (!answers[field.id]) return;
        if (!answers[field.id].isNew) {
          patchCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId({
            body: { value: answers[field.id].value },
            path: {
              seller_id: sellerId,
              product_id: productId,
              user_id: userId,
              field_id: field.id,
            },
          });
        } else {
          postCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId({
            body: { value: answers[field.id].value },
            path: {
              seller_id: sellerId,
              product_id: productId,
              user_id: userId,
              field_id: field.id,
            },
          });
        }
      }),
    );
    setIsOpened(false);
  };

  return (
    <>
      <CustomFieldsDialog
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        isLoading={isLoading}
        productFields={productFields}
        onValidate={onCustomFieldValidate}
        sellerId={sellerId}
        productId={productId}
        userId={userId}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Card
              className={`min-w-40 h-full ${selected && "shadow-lg"} ${selected && (displayWarning ? "border-destructive shadow-destructive/30" : "border-black")} ${!variant.enabled && "text-muted-foreground"} ${(isSelectable || (!isSelectable && selected)) && variant.enabled && variant.unique && !isLoading && "cursor-pointer"}`}
              onClick={() => {
                if (
                  isSelectable &&
                  variant.enabled &&
                  variant.unique &&
                  !isLoading
                ) {
                  if (selected) {
                    cancelPurchase();
                  } else {
                    if (productFields.length === 0 || !isAdmin) {
                      purchaseVariant(1);
                    } else {
                      openFieldDialog();
                    }
                  }
                }
                if (selected && !isSelectable) {
                  cancelPurchase();
                }
              }}
            >
              {isSelectable &&
                variant.enabled &&
                variant.unique &&
                isLoading && (
                  <div className="w-full h-0 relative">
                    <div
                      className={`flex m-auto ${showDescription ? "h-[109px]" : "h-[93px]"} w-full bg-white rounded-md bg-opacity-50`}
                    >
                      <ReloadIcon className="flex h-6 w-6 animate-spin m-auto" />
                    </div>
                  </div>
                )}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1 gap-4">
                <CardTitle
                  className={`text-sm font-medium ${!isSelectable && "text-muted-foreground"}`}
                >
                  <span>
                    {selectTranslation(variant.name_en, variant.name_fr)}
                  </span>
                </CardTitle>
                {!variant.unique && (
                  <div className="flex items-center space-x-2">
                    <LoadingButton
                      variant="outline"
                      className="h-6 px-1"
                      disabled={!selected || !isSelectable}
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
                      disabled={!isSelectable}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputQuantity(Number(e.target.value) || 0);
                      }}
                      onBlur={(e) => {
                        if (!isSelectable) return;
                        e.stopPropagation();
                        const newQuantity = Number(e.target.value) || 0;
                        if (newQuantity === 0) {
                          if (numberSelectedVariant !== 0) cancelPurchase();
                          return;
                        }
                        if (
                          productFields.length === 0 ||
                          inputQuantity === 0 ||
                          !isAdmin
                        ) {
                          purchaseVariant(newQuantity);
                        } else {
                          openFieldDialog();
                        }
                      }}
                    />
                    <LoadingButton
                      variant="outline"
                      className="h-6 px-1"
                      disabled={!isSelectable}
                      onClick={(e) => {
                        if (!isSelectable) return;
                        e.stopPropagation();
                        if (
                          productFields.length === 0 ||
                          numberSelectedVariant !== 0 ||
                          !isAdmin
                        ) {
                          purchaseVariant(numberSelectedVariant + 1);
                        } else {
                          openFieldDialog();
                        }
                      }}
                      isLoading={isLoading}
                    >
                      <HiPlus className="w-4 h-4" />
                    </LoadingButton>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex p-4 pt-0 mr-auto">
                <div
                  className={`text-2xl font-bold ${!isSelectable && "text-muted-foreground"}`}
                >
                  <span>{variant.price / 100} €</span>
                </div>
                {showDescription && (
                  <p className="text-xs text-muted-foreground">
                    {selectTranslation(
                      variant.description_en,
                      variant.description_fr,
                    )}
                  </p>
                )}
              </CardContent>
            </Card>
          </TooltipTrigger>
          {isAdmin && (
            <TooltipContent>
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
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
