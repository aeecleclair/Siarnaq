import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ExpansionList {
  products: string[];
  loaded: boolean;
}

interface productExpansionStore {
  productExpansion: Record<string, ExpansionList>;
  setExpandedProducts: (sellerId: string, productIds: string[]) => void;
}

export const useProductExpansionStore = create<productExpansionStore>()(
  devtools(
    persist(
      (set) => ({
        productExpansion: {},
        setExpandedProducts: (sellerId: string, productIds: string[]) => {
          set((state) => ({
            productExpansion: {
              ...state.productExpansion,
              [sellerId]: {
                products: productIds,
                loaded: true,
              },
            },
          }));
        },
      }),
      {
        name: "cdr-product-expansion-store",
      },
    ),
  ),
);
