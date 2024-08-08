import { PaymentType, PaymentComplete, deleteCdrUsersUserIdPaymentsPaymentId, CdrUser } from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { HiOutlineArchive, HiOutlineAtSymbol, HiOutlineCreditCard, HiTrash } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlinePencilSquare } from "react-icons/hi2";


interface PaymentItemProps {
  payment: PaymentComplete;
  refetch: () => void;
  user: CdrUser;
  isAdmin?: boolean;
}

export const PaymentItem = ({
  payment,
  refetch,
  user,
  isAdmin,
}: PaymentItemProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
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
  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }

  async function onDelete() {
    setIsLoading(true);
    const { data, error } = await deleteCdrUsersUserIdPaymentsPaymentId({
      path: {
        user_id: payment.user_id,
        payment_id: payment.id,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsOpened(false);
    refetch();
  }

  return (
    <div className="flex flex-row w-full items-center" key={payment.id}>
      <span className="font-bold w-full flex items-center">
        {paymentIcon(payment.payment_type)}
        {payment.payment_type}
      </span>
      <span className="ml-auto font-semibold w-20 flex justify-end">
        {payment.total} €
      </span>
      {isAdmin && (
        <CustomDialog
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          title="Supprimer le paiement"
          description={
            <div className="grid gap-3">
              <span>
                Êtes-vous sûr de vouloir supprimer le paiement de{" "}
                <span className="font-bold">
                  {user.nickname ? (
                    <span className="font-bold">
                      {user.nickname} ({user.firstname} {user.name})
                    </span>
                  ) : (
                    <span className="font-bold">
                      {user.firstname} {user.name}
                    </span>
                  )}
                </span>
                {" d'un montant de "}
                <span className="font-bold">{payment.total} €</span> effectué
                par <span className="font-bold">{payment.payment_type}</span> ?
              </span>
              <div className="flex justify-end mt-2 space-x-4">
                <Button
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isLoading}
                  className="w-[100px]"
                >
                  Annuler
                </Button>
                <LoadingButton
                  isLoading={isLoading}
                  className="w-[100px]"
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                >
                  {"Supprimer"}
                </LoadingButton>
              </div>
            </div>
          }
        >
          <Button size="icon" variant="destructive" className="ml-4 h-8 w-9">
            <HiTrash className="w-5 h-5" />
          </Button>
        </CustomDialog>
      )}
    </div>
  );
};