import {
  AppModulesCdrSchemasCdrProductComplete,
  SellerComplete,
} from "@/api/hyperionSchemas";

export const sellers: SellerComplete[] = [
  {
    name: "Eclair",
    group_id: "1",
    order: 1,
    id: "1",
  },
  {
    name: "BDE",
    group_id: "2",
    order: 2,
    id: "2",
  },
  {
    name: "AE",
    group_id: "2",
    order: 2,
    id: "3",
  },
  {
    name: "USE",
    group_id: "2",
    order: 2,
    id: "4",
  },
  {
    name: "SDeC",
    group_id: "2",
    order: 2,
    id: "5",
  },
];

export const products: AppModulesCdrSchemasCdrProductComplete[] = [
  {
    name_fr: "Adhésion AE",
    name_en: "AE membership",
    description_fr: "Adhésion à l'association des élèves",
    description_en: "Membership to the students association",
    available_online: true,
    id: "1",
    seller_id: "1",
    variants: [
      {
        name_fr: "1 an",
        name_en: "1 year",
        description_fr: "Adhésion à l'association des élèves pour 1 an",
        description_en: "Membership to the students association for 1 year",
        price: 10,
        enabled: true,
        unique: false,
        id: "1",
        product_id: "1",
      },
      {
        name_fr: "Tout le cursus",
        name_en: "Full curriculum",
        description_fr:
          "Adhésion à l'association des élèves pour tout le cursus",
        description_en:
          "Membership to the students association for the full curriculum",
        price: 50,
        enabled: false,
        unique: true,
        id: "2",
        product_id: "1",
      },
    ],
    product_constraints: [],
    document_constraints: [],
  },
  {
    name_fr: "Adhésion USE",
    name_en: "USE membership",
    description_fr: "Adhésion à l'association sportive",
    description_en: "Membership to the sport association",
    available_online: true,
    id: "2",
    seller_id: "1",
    variants: [
      {
        name_fr: "1 an",
        name_en: "1 year",
        description_fr: "Adhésion à l'association sportive pour 1 an",
        description_en: "Membership to the sport association for 1 year",
        price: 10,
        enabled: false,
        unique: true,
        id: "3",
        product_id: "2",
      },
      {
        name_fr: "Tout le cursus",
        name_en: "Full curriculum",
        description_fr: "Adhésion à l'association sportive pour tout le cursus",
        description_en:
          "Membership to the sport association for the full curriculum",
        price: 50,
        enabled: true,
        unique: true,
        id: "4",
        product_id: "2",
      },
      {
        name_fr: "1 an",
        name_en: "1 year",
        description_fr: "Adhésion à l'association sportive pour 1 an",
        description_en: "Membership to the sport association for 1 year",
        price: 10,
        enabled: false,
        unique: false,
        id: "5",
        product_id: "2",
      },
      {
        name_fr: "Tout le cursus",
        name_en: "Full curriculum",
        description_fr: "Adhésion à l'association sportive pour tout le cursus",
        description_en:
          "Membership to the sport association for the full curriculum",
        price: 50,
        enabled: false,
        unique: false,
        id: "6",
        product_id: "2",
      },
    ],
    product_constraints: [],
    document_constraints: [],
  },
];
