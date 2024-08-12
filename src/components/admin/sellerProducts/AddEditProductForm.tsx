import { DatePicker } from "@/components/custom/DatePicker";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { MultiSelect } from "@/components/custom/MultiSelect";
import { StyledFormField } from "@/components/custom/StyledFormField";
import { TextSeparator } from "@/components/custom/TextSeparator";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/forms/productFormSchema";
import { useProducts } from "@/hooks/useProducts";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface AddEditProductFormProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
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
  const { products: constraint } = useProducts();

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
          label="Disponibilité"
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
      <TextSeparator text="Tickets" />
      <FormField
        control={form.control}
        name="generate_ticket"
        render={({ field }) => (
          <FormItem className="w-full">
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="generate_ticket"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="generate_ticket">
                  {"Générer un ticket pour ce produit"}
                </Label>
              </div>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <div className="flex flex-row gap-2">
        <StyledFormField
          form={form}
          label="Nombre d'utilisations maximum"
          id="ticket_max_use"
          input={(field) => (
            <Input
              {...field}
              type="number"
              disabled={!form.watch("generate_ticket")}
            />
          )}
        />
        <StyledFormField
          form={form}
          label="Date d'expiration"
          id="ticket_expiration"
          input={(field) => (
            <DatePicker
              date={field.value}
              setDate={field.onChange}
              fromDate={new Date()}
              defaultDate={field.value || new Date()}
              disabled={!form.watch("generate_ticket")}
            />
          )}
        />
      </div>
      <TextSeparator text="Conditions" />
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label="Contraintes"
          id="product_constraints"
          input={(field) => (
            <MultiSelect
              options={constraint
                .filter((constraint) => constraint.id !== form.watch("id"))
                .map((constraint) => ({
                  label: constraint.name_fr,
                  value: constraint.id,
                }))}
              selected={field.value}
              {...field}
              className="w-64"
            />
          )}
        />
        <StyledFormField
          form={form}
          label="Signatures"
          id="document_constraints"
          input={(field) => (
            <MultiSelect
              options={
                []
                //   constraint.map((constraint) => ({
                //   label: constraint.name,
                //   value: constraint.id,
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
