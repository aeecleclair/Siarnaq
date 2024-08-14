import { PaymentPart } from "../../../custom/Payment/PaymentPart";
import { ProductPart } from "../../../custom/Product/ProductPart";
import { MigrateUserForm } from "./MigrateUserForm";
import {
  CdrUser,
  patchCdrUsersUserIdCurriculumsCurriculumId,
  postCdrSellersSellerIdProducts,
  postCdrUsersUserIdCurriculumsCurriculumId,
  ProductBase,
} from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { TextSeparator } from "@/components/custom/TextSeparator";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { migrateUserFormSchema } from "@/forms/migrateUserFormSchema";
import { useCurriculums } from "@/hooks/useCurriculums";
import { useUserPayments } from "@/hooks/useUserPayments";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePencil } from "react-icons/hi";
import { z } from "zod";

interface RecapPanelProps {
  user: CdrUser;
  refetch: () => void;
}

export const RecapPanel = ({ user, refetch }: RecapPanelProps) => {
  const { toast } = useToast();
  const { total: totalPaid } = useUserPayments(user.id);
  const { total: totalToPay } = useUserPurchases(user.id);
  const { curriculums } = useCurriculums();
  const remainingToPay = (totalToPay ?? 0) - (totalPaid ?? 0);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasUserCurriculum = !!user.curriculum?.id;
  const [selectedCurriculum, setSelectedCurriculum] = useState(
    user.curriculum?.id,
  );
  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }
  async function onCurriculumSubmit() {
    setIsLoading(true);
    if (!selectedCurriculum) {
      setIsLoading(false);
      setIsOpened(false);
      return;
    }
    var data, error;
    if (hasUserCurriculum) {
      const { data: patchData, error: patchError } =
        await patchCdrUsersUserIdCurriculumsCurriculumId({
          path: {
            user_id: user.id,
            curriculum_id: selectedCurriculum,
          },
        });
      data = patchData;
      error = patchError;
    } else {
      const { data: postData, error: postError } =
        await postCdrUsersUserIdCurriculumsCurriculumId({
          path: {
            user_id: user.id,
            curriculum_id: selectedCurriculum,
          },
        });
      data = postData;
      error = postError;
    }
    if (error) {
      toast({
        title: "Error",
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
  }

  const form = useForm<z.infer<typeof migrateUserFormSchema>>({
    resolver: zodResolver(migrateUserFormSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof migrateUserFormSchema>) {
    setIsLoading(true);
    // Waiting for API call
    // const body: ProductBase = {
    //   ...values,
    //   available_online: values.available_online === "true",
    // };
    // const { data, error } = await postCdrSellersSellerIdProducts({
    //   path: {
    //     seller_id: seller.id,
    //   },
    //   body: body,
    // });
    // if (error) {
    //   toast({
    //     title: "Error",
    //     description: (error as { detail: String }).detail,
    //     variant: "destructive",
    //   });
    //   setIsLoading(false);
    //   setIsAddDialogOpened(false);
    //   return;
    // }
    // refreshProduct();
    // setIsAddDialogOpened(false);
    setIsLoading(false);
    form.reset();
  }

  return (
    <div className="grid gap-12 pt-8">
      <div className="space-y-8">
        <CardTitle className="flex flex-row justify-between items-center">
          <div>
            {user.nickname ? (
              <span className="font-bold">
                {user.nickname} ({user.firstname} {user.name})
              </span>
            ) : (
              <span className="font-bold">
                {user.firstname} {user.name}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-semibold text-base">
              {user.curriculum?.name ?? "Pas de cursus"}
            </span>
            <CustomDialog
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              title={"Modifier le cursus"}
              description={
                <div className="grid gap-6 mt-4">
                  <div className="grid gap-2">
                    <Label>Cursus</Label>
                    <Select
                      onValueChange={setSelectedCurriculum}
                      defaultValue={selectedCurriculum}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {curriculums.map((curriculum) => (
                          <SelectItem key={curriculum.id} value={curriculum.id}>
                            <div className="flex items-center flex-row gap-2">
                              {curriculum.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      type="button"
                      onClick={onCurriculumSubmit}
                    >
                      {"Modifier"}
                    </LoadingButton>
                  </div>
                  <TextSeparator text="Modifier l'utilisateur" />
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <MigrateUserForm
                        form={form}
                        setIsOpened={setIsOpened}
                        isLoading={isLoading}
                        closeDialog={closeDialog}
                      />
                    </form>
                  </Form>
                </div>
              }
            >
              <Button size="icon" variant="outline" className="w-[40px]">
                <HiOutlinePencil className="h-5 w-5" />
              </Button>
            </CustomDialog>
          </div>
        </CardTitle>
        <Separator />
      </div>
      <ProductPart user={user} isAdmin />
      <PaymentPart user={user} isAdmin />
      <div className="grid gap-6">
        <CardTitle className="flex flex-row w-full">
          <span className="font-bold">Reste à payer</span>
          <span className="ml-auto font-semibold">
            {remainingToPay.toFixed(2)} €
          </span>
        </CardTitle>
      </div>
    </div>
  );
};
