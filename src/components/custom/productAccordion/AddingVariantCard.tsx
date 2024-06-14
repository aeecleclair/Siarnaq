import { Card, CardContent } from "../../ui/card";
import { CustomDialog } from "../CustomDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";
import { ProductVariantBase, postCdrSellersSellerIdProductsProductIdVariants } from "@/api";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { z } from "zod";

interface AddingVariantCardProps {
  sellerId: string;
  productId: string;
  refreshProduct: () => void;
}

export const AddingVariantCard = (
  { sellerId, productId, refreshProduct }: AddingVariantCardProps
) => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    name_fr: z
      .string({
        required_error: "Veuillez renseigner le nom de la variante",
      })
      .min(1, {
        message: "Veuillez renseigner le nom de la variante",
      }),
    name_en: z
      .string({
        required_error: "Veuillez renseigner le nom de la variante",
      })
      .min(1, {
        message: "Veuillez renseigner le nom de la variante",
      }),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    price: z
      .string({
        required_error: "Veuillez renseigner le prix du produit",
      })
      .min(0, {
        message: "Veuillez renseigner le prix du produit",
      }),
    unique: z.enum(["unique", "multiple"], {
      required_error: "Veuillez renseigner la quantité du produit",
    }),
    allowed_curriculum: z.array(z.string(), {
      required_error: "Veuillez renseigner les cursus autorisés",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      allowed_curriculum: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const body: ProductVariantBase = {
      ...values,
      price: parseFloat(values.price),
      unique: values.unique === "unique",
      enabled: true,
    };
    const { data, error } =
      await postCdrSellersSellerIdProductsProductIdVariants({
        path: {
          seller_id: sellerId,
          product_id: productId,
        },
        body: body,
      });
    if (error) {
      console.log(error);
      setIsLoading(false);
      setIsAddDialogOpened(false);
      return;
    }
    refreshProduct();
    setIsAddDialogOpened(false);
    setIsLoading(false);
    form.reset();
  }
  return (
    <CustomDialog
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
      title="Ajouter une variante"
      description={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AddEditVariantForm
              form={form}
              setIsOpened={setIsAddDialogOpened}
              isLoading={isLoading}
            />
          </form>
        </Form>
      }
    >
      <Card className={`min-w-40 min-h-20`}>
        <CardContent className="flex flex-col items-center justify-center m-auto h-full p-0 cursor-pointer">
          <HiPlus className="w-8 h-8" />
        </CardContent>
      </Card>
    </CustomDialog>
  );
};