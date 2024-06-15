import { AddEditProductForm } from "./AddEditProductForm";
import {
  ProductBase,
  SellerComplete,
  postCdrSellersSellerIdProducts,
} from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { z } from "zod";

interface AddProductAccordionItemProps {
  seller: SellerComplete;
  refreshProduct: () => void;
}

export const AddProductAccordionItem = ({
  seller,
  refreshProduct,
}: AddProductAccordionItemProps) => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    name_fr: z
      .string({
        required_error: "Veuillez renseigner le nom du produit",
      })
      .min(1, {
        message: "Veuillez renseigner le nom du produit",
      }),
    name_en: z
      .string({
        required_error: "Veuillez renseigner le nom du produit",
      })
      .min(1, {
        message: "Veuillez renseigner le nom du produit",
      }),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    available_online: z.enum(["true", "false"], {
      required_error: "Veuillez renseigner la disponibilité du produit",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const body: ProductBase = {
      ...values,
      available_online: values.available_online === "true",
    };
    const { data, error } = await postCdrSellersSellerIdProducts({
      path: {
        seller_id: seller.id,
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
      title="Nouveau produit"
      description={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AddEditProductForm
              form={form}
              setIsOpened={setIsAddDialogOpened}
              isLoading={isLoading}
            />
          </form>
        </Form>
      }
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
    >
      <div className="flex flex-1 items-center justify-start py-4 font-medium border-b cursor-pointer">
        <HiPlus className="w-4 h-4 mr-6" />
        <h3 className="text-lg font-semibold">New Product</h3>
      </div>
    </CustomDialog>
  );
};
