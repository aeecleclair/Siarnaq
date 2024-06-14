import { AddEditProductForm } from "./AddEditProductForm";
import { SellerComplete, postCdrSellersSellerIdProducts } from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { z } from "zod";

interface AddProductAccordionItemProps {
  seller: SellerComplete;
  setRefetchSellers: (arg0: boolean) => void;
}

export const AddProductAccordionItem = ({
  seller,
  setRefetchSellers,
}: AddProductAccordionItemProps) => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    name_fr: z.string({
      required_error: "Veuillez renseigner le nom du produit",
    }),
    name_en: z.string({
      required_error: "Veuillez renseigner le nom du produit",
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
    const { data, error } = await postCdrSellersSellerIdProducts({
      path: {
        seller_id: seller.id,
      },
      body: {
        ...values,
        available_online: values.available_online === "true",
      },
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      setIsAddDialogOpened(false);
      return;
    }
    setRefetchSellers(true);
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
              validateLabel="Add"
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
