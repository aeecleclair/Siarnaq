import {
  CustomDataFieldBase,
  deleteCdrSellersSellerIdProductsProductIdDataFieldId,
  postCdrSellersSellerIdProductsProductIdData,
} from "@/api";
import { DatePicker } from "@/components/custom/DatePicker";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { MultiSelect } from "@/components/custom/MultiSelect";
import { StyledFormField } from "@/components/custom/StyledFormField";
import { TextSeparator } from "@/components/custom/TextSeparator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { productFormSchema } from "@/forms/productFormSchema";
import { useProducts } from "@/hooks/useProducts";
import { useSellerProductData } from "@/hooks/useSellerProductData";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import { z } from "zod";

interface AddEditProductFormProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
  isEdit?: boolean;
  sellerId: string;
  productId?: string;
}

export const AddEditProductForm = ({
  form,
  isLoading,
  setIsOpened,
  sellerId,
  productId,
  isEdit = false,
}: AddEditProductFormProps) => {
  const { products: constraint } = useProducts();
  const { data, refetch } = useSellerProductData(sellerId, productId ?? null);
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }

  async function onAddData() {
    const data = form.getValues("data_field_name");
    if (!data) return;
    if (isEdit) {
      setIsAddingLoading(true);
      const body: CustomDataFieldBase = {
        name: data,
      };
      const { error } = await postCdrSellersSellerIdProductsProductIdData({
        body: body,
        path: { seller_id: sellerId, product_id: productId! },
      });
      if (error) {
        toast({
          title: "Error",
          description: (error as { detail: String }).detail,
          variant: "destructive",
        });
        setIsAddingLoading(false);
        return;
      }
      refetch();
      setIsAddingLoading(false);
    } else {
      form.setValue("data_field_name", "");
      form.setValue("data_fields", [
        ...form.getValues("data_fields"),
        {
          id: form.getValues("data_fields").length.toString(),
          name: data,
          product_id: "",
        },
      ]);
    }
  }

  async function onDeleteData(id: string) {
    if (isEdit) {
      setIsDeletingLoading(true);
      const { error } =
        await deleteCdrSellersSellerIdProductsProductIdDataFieldId({
          path: { seller_id: sellerId, product_id: productId!, field_id: id },
        });
      if (error) {
        toast({
          title: "Error",
          description: (error as { detail: String }).detail,
          variant: "destructive",
        });
        setIsDeletingLoading(false);
        return;
      }
      refetch();
      setIsDeletingLoading(false);
    } else {
      form.setValue(
        "data_fields",
        form.getValues("data_fields").filter((field) => field.id !== id),
      );
    }
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
      <Accordion type="multiple">
        <AccordionItem value="tickets">
          <AccordionTrigger>
            <h3 className="text-primary hover:text-primary">Tickets</h3>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="conditions">
          <AccordionTrigger>
            <h3 className="text-primary hover:text-primary">Conditions</h3>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
            <div className="flex flex-row gap-2 w-full">
              <StyledFormField
                form={form}
                label="Contraintes"
                id="product_constraints"
                input={(field) => (
                  <MultiSelect
                    options={constraint
                      .filter(
                        (constraint) => constraint.id !== form.watch("id"),
                      )
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="information">
          <AccordionTrigger>
            <h3 className="text-primary hover:text-primary">
              Informations supplémentaires
            </h3>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
            <div className="w-full flex flex-row gap-4 p-1">
              <FormField
                control={form.control}
                name="data_field_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Question pour les utilisateurs qui prennent le produit"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <LoadingButton
                variant="outline"
                type="button"
                isLoading={isAddingLoading}
                className="w-[100px]"
                onClick={onAddData}
              >
                Ajouter
              </LoadingButton>
            </div>
            <div className="grid gap-4 px-1">
              {(isEdit ? data : form.watch("data_fields")).map((field) => (
                <div key={field.id} className="flex flex-row items-center">
                  <span>{field.name}</span>
                  <LoadingButton
                    size="icon"
                    variant="destructive"
                    className="flex ml-auto h-8"
                    isLoading={isDeletingLoading}
                    onClick={() => onDeleteData(field.id)}
                  >
                    <HiTrash className="w-5 h-5" />
                  </LoadingButton>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
