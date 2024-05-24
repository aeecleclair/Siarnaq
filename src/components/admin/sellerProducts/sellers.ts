import { SellerComplete } from "@/api/hyperionSchemas";

export const sellers: SellerComplete[] = [
  {
    name: "Eclair",
    group_id: "1",
    order: 1,
    id: "1",
    products: [
      {
        name: "Vanilla Eclair",
        description: "A delicious vanilla eclair",
        available_online: true,
        unique: false,
        id: "1",
        seller_id: "1",
      },
      {
        name: "Chocolate Eclair",
        description: "A delicious chocolate eclair",
        available_online: true,
        unique: false,
        id: "2",
        seller_id: "1",
      },
    ],
  },
  {
    name: "BDE",
    group_id: "2",
    order: 2,
    id: "2",
    products: [
      {
        name: "Lemonade",
        description: "A delicious lemonade",
        available_online: false,
        unique: true,
        id: "1",
        seller_id: "2",
      },
      {
        name: "Fruit Punch",
        description: "A delicious fruit punch",
        available_online: true,
        unique: false,
        id: "2",
        seller_id: "2",
      },
    ],
  },
    {
        name: "AE",
        group_id: "2",
        order: 2,
        id: "3",
        products: [
        {
            name: "Tacos",
            description: "A delicious taco",
            available_online: false,
            unique: true,
            id: "1",
            seller_id: "3",
        },
        {
            name: "Doritos",
            description: "A delicious dorito",
            available_online: true,
            unique: false,
            id: "2",
            seller_id: "3",
        },
        ],
    },
    {
        name: "USE",
        group_id: "2",
        order: 2,
        id: "4",
        products: [
        {
            name: "Hot Dog",
            description: "A delicious hot dog",
            available_online: false,
            unique: true,
            id: "1",
            seller_id: "4",
        },
        {
            name: "Soda",
            description: "A delicious soda",
            available_online: true,
            unique: false,
            id: "2",
            seller_id: "4",
        },
        ],
    },
    {
        name: "SDeC",
        group_id: "2",
        order: 2,
        id: "5",
        products: [
        {
            name: "Lemonade",
            description: "A delicious lemonade",
            available_online: false,
            unique: true,
            id: "1",
            seller_id: "5",
        },
        {
            name: "Fruit Punch",
            description: "A delicious fruit punch",
            available_online: true,
            unique: false,
            id: "2",
            seller_id: "5",
        },
        ],
    },
];
