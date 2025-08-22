import {
  CdrUser,
  PaymentBase,
  PaymentType,
  postCdrUsersUserIdPayments,
} from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { LoadingButton } from "@/components/custom/LoadingButton";
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
import { useToast } from "@/components/ui/use-toast";
import { paymentFormSchema } from "@/forms/paymentFormSchema";
import { useUserPayments } from "@/hooks/useUserPayments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineArchiveBox,
  HiOutlineAtSymbol,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { HiOutlineBanknotes, HiOutlinePencilSquare } from "react-icons/hi2";
import { z } from "zod";

import { CurrencyInput } from "../CurrencyInput";
import { PaymentItem } from "./PaymentItem";

interface PaymentPartProps {
  user: CdrUser;
  isAdmin?: boolean;
}

export const PaymentPart = ({ user, isAdmin }: PaymentPartProps) => {
  const { toast } = useToast();
  const t = useTranslations("paymentPart");
  const format = useFormatter();
  const { payments, total: totalPaid, refetch } = useUserPayments(user.id);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const PaymentTypes: PaymentType[] = [
    "cash",
    "check",
    "HelloAsso",
    "card",
    "archived",
  ];

  const paymentIcon = (PaymentType: PaymentType) => {
    switch (PaymentType) {
      case "cash":
        return <HiOutlineBanknotes className="w-5 h-5 mr-2" />;
      case "check":
        return <HiOutlinePencilSquare className="w-5 h-5 mr-2" />;
      case "HelloAsso":
        return <HiOutlineAtSymbol className="w-5 h-5 mr-2" />;
      case "card":
        return <HiOutlineCreditCard className="w-5 h-5 mr-2" />;
      case "archived":
        return <HiOutlineArchiveBox className="w-5 h-5 mr-2" />;
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
      total: Math.round(parseFloat(values.total) * 100),
    };
    const { data, error } = await postCdrUsersUserIdPayments({
      path: {
        user_id: user.id,
      },
      body: body,
    });
    if (error) {
      toast({
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
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
          <span>{t("payments")}</span>
          {isAdmin && (
            <CustomDialog
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              title={t("addPayment")}
              description={
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6 mt-4">
                      <div className="flex flex-row gap-2 w-full">
                        <StyledFormField
                          form={form}
                          label={t("amount")}
                          id="total"
                          input={(field) => (
                            <CurrencyInput id="price" {...field} />
                          )}
                        />
                        <StyledFormField
                          form={form}
                          label={t("paymentType")}
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
                                {PaymentTypes.map((PaymentType) => (
                                  <SelectItem
                                    key={PaymentType}
                                    value={`${PaymentType}`}
                                  >
                                    <div className="flex items-center flex-row gap-2">
                                      {paymentIcon(PaymentType)}
                                      {t(PaymentType)}
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
                          {t("cancel")}
                        </Button>
                        <LoadingButton
                          isLoading={isLoading}
                          className="w-[100px]"
                          type="submit"
                        >
                          {t("add")}
                        </LoadingButton>
                      </div>
                    </div>
                  </form>
                </Form>
              }
            >
              <Button className="w-[100px]">{t("add")}</Button>
            </CustomDialog>
          )}
        </CardTitle>
      </div>
      <div className="space-y-2 mt-4">
        {payments.length > 0 ? (
          <>
            {payments?.map((payment) => (
              <PaymentItem
                key={payment.id}
                payment={payment}
                refetch={refetch}
                user={user}
                isAdmin={isAdmin}
              />
            ))}
            <Separator className="my-2" />
            <div className="flex flex-row w-full">
              <span className="font-bold w-1/6">{t("total")}</span>
              <span className="ml-auto font-semibold">
                {totalPaid && format.number(totalPaid, "euro")}
              </span>
            </div>
          </>
        ) : (
          <div>{t("noPayment")}</div>
        )}
      </div>
    </div>
  );
};
