import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { variantFormSchema } from "@/forms/variantFormSchema";
import { useCurriculums } from "@/hooks/useCurriculums";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { CurrencyInput } from "../CurrencyInput";
import { LoadingButton } from "../LoadingButton";
import { MultiSelect } from "../MultiSelect";
import { StyledFormField } from "../StyledFormField";

interface AddEditVariantFormProps {
  form: UseFormReturn<z.infer<typeof variantFormSchema>>;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
  isEdit?: boolean;
  isInterestProduct?: boolean;
  isMembershipProduct?: boolean;
}

export const AddEditVariantForm = ({
  form,
  isLoading,
  setIsOpened,
  isEdit = false,
  isInterestProduct = false,
  isMembershipProduct = false,
}: AddEditVariantFormProps) => {
  const { curriculums } = useCurriculums();

  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }
  return (
    <div className="grid gap-6 mt-4">
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label="Nom (français)"
          id="name_fr"
          input={(field) => <Input {...field} />}
        />
        <StyledFormField
          form={form}
          label="Nom (anglais)"
          id="name_en"
          input={(field) => <Input {...field} />}
        />
      </div>
      <div className="flex flex-row gap-2">
        <StyledFormField
          form={form}
          label="Description (français)"
          id="description_fr"
          input={(field) => <Textarea {...field} />}
        />
        <StyledFormField
          form={form}
          label="Description (anglais)"
          id="description_en"
          input={(field) => <Textarea {...field} />}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {!isInterestProduct && (
          <StyledFormField
            form={form}
            label="Prix"
            id="price"
            input={(field) => <CurrencyInput id="price" {...field} />}
          />
        )}
        <StyledFormField
          form={form}
          label="Cursus"
          id="allowed_curriculum"
          input={(field) => (
            <MultiSelect
              options={curriculums.map((curriculum) => ({
                label: curriculum.name,
                value: curriculum.id,
              }))}
              selected={field.value}
              {...field}
              className="w-64"
            />
          )}
        />
      </div>
      {isMembershipProduct && (
        <div className="grid gap-2">
          <StyledFormField
            form={form}
            label="Durée d'adhésion ajoutée (format: 'AYBMCD' pour A an(s), B mois et C jour(s))"
            id="related_membership_added_duration"
            input={(field) => <Input {...field} />}
          />
        </div>
      )}
      {!isInterestProduct && !isMembershipProduct && (
        <div className="grid gap-2">
          <StyledFormField
            form={form}
            label="Achat"
            id="unique"
            input={(field) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unique" id="unique" />
                  <Label htmlFor="unique">
                    {"Ne peux être acheté qu'une seule fois"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <Label htmlFor="multiple">
                    Peux être acheter autant de fois que souhaité
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      )}
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
          {isEdit ? "Modifier" : "Ajouter"}
        </LoadingButton>
      </div>
    </div>
  );
};
