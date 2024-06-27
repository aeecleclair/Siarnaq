import { PaymentPart } from "./Payment/PaymentPart";
import { ProductPart } from "./Product/ProductPart";
import { CdrUser, patchCdrUsersUserIdCurriculumsCurriculumId, postCdrUsersUserIdCurriculumsCurriculumId } from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCurriculums } from "@/hooks/useCurriculums";
import { useUserPayment } from "@/hooks/useUserPayment";
import { useUserPurchases } from "@/hooks/useUserPurchase";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";

interface RecapPanelProps {
  user: CdrUser;
  refetch: () => void;
}

export const RecapPanel = ({ user, refetch }: RecapPanelProps) => {
  const { total: totalPaid } = useUserPayment(user.id);
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

  async function onSubmit() {
    setIsLoading(true);
    if (!selectedCurriculum) {
      setIsLoading(false);
      setIsOpened(false);
      return;
    }
    var data, error;
    if (hasUserCurriculum) {
      const { data: patchData, error: patchError } = await patchCdrUsersUserIdCurriculumsCurriculumId({
        path: {
          user_id: user.id,
          curriculum_id: selectedCurriculum,
        },
      });
      data = patchData;
      error = patchError;
    } else {
      const { data: postData, error: postError } = await postCdrUsersUserIdCurriculumsCurriculumId({
        path: {
          user_id: user.id,
          curriculum_id: selectedCurriculum,
        },
      });
      data = postData;
      error = postError;
    }
    if (error) {
      console.log(error);
      setIsLoading(false);
      setIsOpened(false);
      return;
    }
    refetch();
    setIsOpened(false);
    setIsLoading(false);
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
                        {curriculums?.map((curriculum) => (
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
                      onClick={onSubmit}
                    >
                      {"Modifier"}
                    </LoadingButton>
                  </div>
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
      <ProductPart user={user} />
      <PaymentPart user={user} />
      <div className="grid gap-6">
        <CardTitle className="flex flex-row w-full">
          <span className="font-bold">Reste à payer</span>
          <span className="ml-auto font-semibold">{remainingToPay} €</span>
        </CardTitle>
      </div>
    </div>
  );
};
