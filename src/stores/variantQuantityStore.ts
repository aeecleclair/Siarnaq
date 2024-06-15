import {
  getCdrOnlineSellersSellerIdProducts,
  patchCdrUsersUserIdPurchasesProductVariantId,
  postCdrUsersUserIdPurchasesProductVariantId,
} from "@/api";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ProductVariant {
  products: Record<string, Record<string, number>>;
  loaded: boolean;
}

interface variantQuantityStore {
  variantQuantity: Record<string, ProductVariant>;
  setVariantQuantity: (
    userId: string,
    sellerId: string,
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
}

export const useVariantQuantityStore = create<variantQuantityStore>()(
  devtools(
    persist(
      (set) => ({
        variantQuantity: {},
        setVariantQuantity: (
          userId: string,
          sellerId: string,
          productId: string,
          variantId: string,
          quantity: number,
        ) => {
          const onPurchase = async () => {
            const { error } =
              await patchCdrUsersUserIdPurchasesProductVariantId({
                path: {
                  user_id: userId,
                  product_variant_id: variantId,
                },
                body: {
                  quantity: quantity,
                },
              });
            if (error) {
              console.log(error);
              return;
            }
          };
          onPurchase();
          set((state) => {
            return {
              variantQuantity: {
                ...state.variantQuantity,
                [sellerId]: {
                  ...state.variantQuantity[sellerId],
                  products: {
                    ...state.variantQuantity[sellerId]?.products,
                    [productId]: {
                      ...state.variantQuantity[sellerId]?.products[productId],
                      [variantId]: quantity,
                    },
                  },
                  loaded: true,
                },
              },
            };
          });
        },
      }),
      {
        name: "cdr-variant-quantity-store",
      },
    ),
  ),
);
