import { LoadingButton } from "@/components/custom/LoadingButton";
import { StyledFormField } from "@/components/custom/StyledFormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { migrateUserFormSchema } from "@/forms/migrateUserFormSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface MigrateUserFormProps {
  form: UseFormReturn<z.infer<typeof migrateUserFormSchema>>;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MigrateUserForm = ({
  form,
  isLoading,
  setIsOpened,
  closeDialog,
}: MigrateUserFormProps) => {
  const possibleFloors = [
    "Autre",
    "Adoma",
    "Exte",
    "T1",
    "T2",
    "T3",
    "T4",
    "T56",
    "U1",
    "U2",
    "U3",
    "U4",
    "U56",
    "V1",
    "V2",
    "V3",
    "V45",
    "V6",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
  ];

  return (
    <div className="grid gap-6 mt-4">
      <StyledFormField
        form={form}
        label="Surnom"
        id="nickname"
        input={(field) => <Input {...field} />}
      />
      <StyledFormField
        form={form}
        label="Email de Centrale"
        id="email"
        input={(field) => <Input {...field} type="email" />}
      />
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label="Étage"
          id="floor"
          input={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {possibleFloors.map((floor) => (
                  <SelectItem key={floor} value={floor}>
                    <div className="flex items-center flex-row gap-2">
                      {floor}
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
          {"Modifier"}
        </LoadingButton>
      </div>
    </div>
  );
};
