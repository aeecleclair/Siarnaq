import { PaymentComplete } from "@/api/types.gen";


export const payements: PaymentComplete[] = [
  {
    id: "1",
    total: 1,
    payment_type: "cash",
    user_id: "1",
  },
  {
    id: "10",
    total: 10,
    payment_type: "check",
    user_id: "1",
  },
  {
    id: "3",
    total: 3,
    payment_type: "HelloAsso",
    user_id: "1",
  },
  {
    id: "5",
    total: 5,
    payment_type: "card",
    user_id: "1",
  },
  {
    id: "15",
    total: 15,
    payment_type: "archived",
    user_id: "1",
  },
];