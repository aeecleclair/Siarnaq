import {
  deleteCdrUsersUserIdPurchasesProductVariantId,
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
          const onAddPurchase = async () => {
            const { error } = await postCdrUsersUserIdPurchasesProductVariantId(
              {
                path: {
                  user_id: userId,
                  product_variant_id: variantId,
                },
                body: {
                  quantity: quantity,
                },
              },
            );
            if (error) {
              console.log(error);
              return;
            }
          };
          const onDeletePurchase = async () => {
            const { error } =
              await deleteCdrUsersUserIdPurchasesProductVariantId({
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
          if (quantity === 0) {
            onDeletePurchase();
          } else {
            onAddPurchase();
          }
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
