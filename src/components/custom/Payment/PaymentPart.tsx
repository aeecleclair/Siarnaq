import { PaymentItem } from "./PaymentItem";
import {
  CdrUser,
  PaymentBase,
  PaymentType,
  postCdrUsersUserIdPayments,
} from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PriceInput } from "@/components/custom/PriceInput";
import { StyledFormField } from "@/components/custom/StyledFormField";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { paymentFormSchema } from "@/forms/paymentFormSchema";
import { useUserPayments } from "@/hooks/useUserPayments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineArchive,
  HiOutlineAtSymbol,
  HiOutlineCreditCard,
} from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlinePencilSquare } from "react-icons/hi2";
import { z } from "zod";

interface PaymentPartProps {
  user: CdrUser;
  isAdmin?: boolean;
}

export const PaymentPart = ({ user, isAdmin }: PaymentPartProps) => {
  const { payments, total: totalPaid, refetch } = useUserPayments(user.id);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const paymentTypes: PaymentType[] = [
    "cash",
    "check",
    "HelloAsso",
    "card",
    "archived",
  ];

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

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    setIsLoading(true);
    const body: PaymentBase = {
      ...values,
      total: parseFloat(values.total),
    };
    const { data, error } = await postCdrUsersUserIdPayments({
      path: {
        user_id: user.id,
      },
      body: body,
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      setIsOpened(false);
      return;
    }
    refetch();
    setIsOpened(false);
    setIsLoading(false);
    form.reset();
  }
  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }
  return (
    <div className="grid gap-2">
      <div>
        <CardTitle className="flex flex-row justify-between">
          <span>Paiements</span>
          {isAdmin && (
            <CustomDialog
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              title="Ajouter un paiement"
              description={
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6 mt-4">
                      <div className="flex flex-row gap-2 w-full">
                        <StyledFormField
                          form={form}
                          label="Montant"
                          id="total"
                          input={(field) => (
                            <PriceInput id="price" {...field} />
                          )}
                        />
                        <StyledFormField
                          form={form}
                          label="Type de paiement"
                          id="payment_type"
                          input={(field) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent side="top">
                                {paymentTypes.map((paymentType) => (
                                  <SelectItem
                                    key={paymentType}
                                    value={`${paymentType}`}
                                  >
                                    <div className="flex items-center flex-row gap-2">
                                      {paymentIcon(paymentType)}
                                      {paymentType}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
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
                          type="submit"
                        >
                          {"Ajouter"}
                        </LoadingButton>
                      </div>
                    </div>
                  </form>
                </Form>
              }
            >
              <Button className="w-[100px]">Ajouter</Button>
            </CustomDialog>
          )}
        </CardTitle>
      </div>
      <div className="space-y-2">
        {(payments?.length ?? 0) > 0 ? (
          <>
            {payments?.map((payment) => (
              <PaymentItem
                key={payment.id}
                payment={payment}
                refetch={refetch}
                user={user}
              />
            ))}
            <Separator className="my-2" />
            <div className="flex flex-row w-full">
              <span className="font-bold w-1/6">Total</span>
              <span className="ml-auto font-semibold">{totalPaid} €</span>
            </div>
          </>
        ) : (
          <div>Aucun paiement</div>
        )}
      </div>
    </div>
  );
};
