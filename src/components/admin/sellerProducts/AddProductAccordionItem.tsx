import {
  ProductBase,
  SellerComplete,
  postCdrSellersSellerIdProducts,
  postCdrSellersSellerIdProductsProductIdData,
} from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { productFormSchema } from "@/forms/productFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi2";
import { z } from "zod";

import { AddEditProductForm } from "./AddEditProductForm";

interface AddProductAccordionItemProps {
  seller: SellerComplete;
  refreshProduct: () => void;
}

export const AddProductAccordionItem = ({
  seller,
  refreshProduct,
}: AddProductAccordionItemProps) => {
  const { toast } = useToast();
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    mode: "onBlur",
    defaultValues: {
      product_constraints: [],
      document_constraints: [],
      data_fields: [],
      tickets: [],
      ticket_name: "",
      ticket_max_use: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    setIsLoading(true);
    const body: ProductBase = {
      ...values,
      available_online: values.available_online === "true",
      tickets: values.tickets.map((ticket) => ({
        ...ticket,
        expiration: ticket.expiration.toISOString(),
      })),
    };
    const { data, error } = await postCdrSellersSellerIdProducts({
      path: {
        seller_id: seller.id,
      },
      body: body,
    });
    if (error) {
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      setIsAddDialogOpened(false);
      return;
    }
    const data_fields = values.data_fields;
    if (data && data_fields.length) {
      const dataFields = data_fields.map((dataField) => ({
        ...dataField,
        product_id: data.id,
      }));
      await Promise.all(
        dataFields.map((dataField) =>
          postCdrSellersSellerIdProductsProductIdData({
            body: { name: dataField.name },
            path: { seller_id: seller.id, product_id: data.id },
          }),
        ),
      );
    }

    refreshProduct();
    setIsAddDialogOpened(false);
    setIsLoading(false);
    form.reset();
  }

  return (
    <CustomDialog
      title="Nouveau produit"
      isFullWidth
      description={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AddEditProductForm
              form={form}
              setIsOpened={setIsAddDialogOpened}
              isLoading={isLoading}
              sellerId={seller.id}
            />
          </form>
        </Form>
      }
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
    >
      <div className="flex flex-1 items-center justify-start py-4 font-medium border-b cursor-pointer ">
        <HiPlus className="w-4 h-4 mr-6" />
        <h3 className="text-lg font-semibold">Nouveau produit</h3>
        <div className="flex grow"></div>
      </div>
    </CustomDialog>
  );
};
