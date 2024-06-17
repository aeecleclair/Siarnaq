import { LoadingButton } from "@/components/custom/LoadingButton";
import { MultiSelect } from "@/components/custom/MultiSelect";
import { StyledFormField } from "@/components/custom/StyledFormField";
import { TextSeparator } from "@/components/custom/TextSeparator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface AddEditProductFormProps {
  form: any;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
  isEdit?: boolean;
}

export const AddEditProductForm = ({
  form,
  isLoading,
  setIsOpened,
  isEdit = false,
}: AddEditProductFormProps) => {
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
      <div className="grid gap-2">
        <StyledFormField
          form={form}
          label="Description (anglais)"
          id="available_online"
          input={(field) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="available_online" />
                <Label htmlFor="available_online">
                  {"Est disponible lors de la chaîne de rentrée en ligne"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="onsite" />
                <Label htmlFor="onsite">
                  {
                    "Ne sera disponible que lors de la chaîne de rentrée en physique"
                  }
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>
      <TextSeparator text="Conditions" />
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label="Contraintes"
          id="allowed_curriculum"
          input={(field) => (
            <MultiSelect
              options={[]}
              selected={[]}
              {...field}
              className="w-64"
            />
          )}
        />
        <StyledFormField
          form={form}
          label="Signatures"
          id="allowed_curriculum"
          input={(field) => (
            <MultiSelect
              options={[]
              //   curriculum.map((curriculum) => ({
              //   label: curriculum.name,
              //   value: curriculum.id,
              // }))
            }
              selected={[]}
              {...field}
              className="w-64"
            />
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
          {isEdit ? "Modifier" : "Ajouter"}
        </LoadingButton>
      </div>
    </div>
  );
};
