import { LoadingButton } from "@/components/custom/LoadingButton";
import { StyledFormField } from "@/components/custom/StyledFormField";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddEditProductFormProps {
  form: any;
  validateLabel?: string;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
}

export const AddEditProductForm = ({
  form,
  isLoading,
  validateLabel,
  setIsOpened,
}: AddEditProductFormProps) => {
  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }

  return (
    <div className="grid gap-6 mt-4">
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField form={form} label="Nom (français)" id="name_fr" />
        <StyledFormField form={form} label="Nom (anglais)" id="name_en" />
      </div>
      <div className="flex flex-row gap-2">
        <StyledFormField
          form={form}
          label="Description (français)"
          id="description_fr"
        />
        <StyledFormField
          form={form}
          label="Description (anglais)"
          id="description_en"
        />
      </div>
      <div className="grid gap-2">
        <FormField
          control={form.control}
          name="available_online"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 w-full">
                <FormLabel className="font-semibold">Disponibilité</FormLabel>
                <FormControl>
                  <RadioGroup {...field}>
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
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
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
          label={validateLabel}
          className="w-[100px]"
          type="submit"
        />
      </div>
    </div>
  );
};
