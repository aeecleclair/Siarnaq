import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ExpansionList {
  products: Record<string, Record<string, number>>;
  loaded: boolean;
}

interface variantQuantityStore {
  variantQuantity: Record<string, ExpansionList>;
  setVariantQuantity: (
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
          sellerId: string,
          productId: string,
          variantId: string,
          quantity: number,
        ) => {
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
