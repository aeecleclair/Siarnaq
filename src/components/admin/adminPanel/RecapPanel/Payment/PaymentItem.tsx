import { PaymentType, PaymentComplete } from "@/api";
import {
  HiOutlineArchive,
  HiOutlineAtSymbol,
  HiOutlineCreditCard,
} from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlinePencilSquare } from "react-icons/hi2";

interface PaymentItemProps {
  payment: PaymentComplete;
}

export const PaymentItem = ({ payment }: PaymentItemProps) => {
  const paymentIcon = (paymentType: PaymentType) => {
    switch (paymentType) {
      case "cash":
        return <HiOutlineBanknotes className="w-5 h-5 mr-2" />;
      case "check":
        return <HiOutlinePencilSquare className="w-5 h-5 mr-2" />;
      case "HelloAsso":
        return <HiOutlineAtSymbol className="w-5 h-5 mr-2" />;
      case "card":
        return <HiOutlineCreditCard className="w-5 h-5 mr-2" />;
      case "archived":
        return <HiOutlineArchive className="w-5 h-5 mr-2" />;
    }
  };
  return (
    <div className="flex flex-row w-full" key={payment.id}>
      <span className="font-bold w-full flex items-center">
        {paymentIcon(payment.payment_type)}
        {payment.payment_type}
      </span>
      <span className="ml-auto font-semibold w-20 flex justify-end">
        {payment.total} €
      </span>
    </div>
  );
};
