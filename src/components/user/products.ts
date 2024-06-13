import { app__modules__cdr__schemas_cdr__ProductComplete } from "@/api";

export const products: app__modules__cdr__schemas_cdr__ProductComplete[] = [
  {
    name_fr: "Produit 1",
    name_en: "Product 1",
    description_fr: "Description du produit 1",
    description_en: "Product 1 description",
    available_online: true,
    id: "1",
    seller_id: "1",
    variants: [
      {
        id: "1",
        price: 10,
        product_id: "1",
        name_fr: "Variante 1",
        name_en: "Variant 1",
        description_en:
          "Anim adipisicing nulla ut dolor ex ullamco non mollit occaecat ut. Aliquip aliquip commodo qui in. Magna cupidatat enim officia exercitation sint proident eiusmod ad ullamco ullamco ea esse ea. Culpa proident dolor amet nostrud ullamco exercitation do laboris.",
        enabled: false,
        unique: true,
      },
      {
        id: "2",
        price: 20,
        product_id: "1",
        name_en: "Variant 2",
        name_fr: "Variante 2",
        enabled: true,
        unique: true,
      },
      {
        id: "3",
        price: 30,
        product_id: "1",
        name_en: "Variant 3",
        name_fr: "Variante 3",
        enabled: true,
        unique: true,
      },
    ],
  },
  {
    name_fr: "Produit 2",
    name_en: "Product 2",
    description_fr: "Description du produit 2",
    description_en: "Product 2 description",
    available_online: true,
    id: "2",
    seller_id: "1",
    variants: [
      {
        id: "1",
        price: 10,
        product_id: "1",
        name_fr: "Variante 1",
        name_en: "Variant 1",
        enabled: false,
        unique: false,
      },
      {
        id: "2",
        price: 20,
        product_id: "1",
        name_en: "Variant 2",
        name_fr: "Variante 2",
        enabled: true,
        unique: false,
      },
    ],
  },
];
