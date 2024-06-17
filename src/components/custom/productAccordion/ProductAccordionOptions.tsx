import { CustomDialog } from "../CustomDialog";
import { LoadingButton } from "../LoadingButton";
import {
  app__modules__cdr__schemas_cdr__ProductComplete,
  app__modules__cdr__schemas_cdr__ProductEdit,
  deleteCdrSellersSellerIdProductsProductId,
  patchCdrSellersSellerIdProductsProductId,
} from "@/api";
import { AddEditProductForm } from "@/components/admin/sellerProducts/AddEditProductForm";
import { Button } from "@/components/ui/button";
import {
  ContextMenuContent,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { Form } from "@/components/ui/form";
import { productFormSchema } from "@/forms/productFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProductAccordionOptionsProps {
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  sellerId: string;
  refreshProduct: () => void;
  canEdit: boolean;
  canRemove: boolean;
}

export const ProductAccordionOptions = ({
  product,
  sellerId,
  refreshProduct,
  canEdit,
  canRemove,
}: ProductAccordionOptionsProps) => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    mode: "onBlur",
    defaultValues: {
      name_fr: product.name_fr,
      name_en: product.name_en,
      description_fr: product.description_fr || undefined,
      description_en: product.description_en || undefined,
      available_online: product.available_online ? "true" : "false",
    },
  });

  async function patchProduct(
    body: app__modules__cdr__schemas_cdr__ProductEdit,
  ) {
    const { data, error } = await patchCdrSellersSellerIdProductsProductId({
      path: {
        product_id: product.id,
        seller_id: sellerId,
      },
      body: body,
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      setIsEditDialogOpened(false);
      return;
    }
  }

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    setIsLoading(true);
    const body: app__modules__cdr__schemas_cdr__ProductEdit = {
      ...values,
      available_online: values.available_online === "true",
    };
    await patchProduct(body);
    refreshProduct();
    setIsEditDialogOpened(false);
    setIsLoading(false);
    form.reset(values);
  }

  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsRemoveDialogOpened(false);
  }

  async function removeProduct() {
    setIsLoading(true);
    const { data, error } = await deleteCdrSellersSellerIdProductsProductId({
      path: {
        product_id: product.id,
        seller_id: sellerId,
      },
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      setIsRemoveDialogOpened(false);
      return;
    }
    refreshProduct();
    setIsRemoveDialogOpened(false);
    setIsLoading(false);
  }
  return (
    (canEdit || canRemove) && (
      <ContextMenuContent className="w-40">
        {canEdit && (
          <CustomDialog
            isOpened={isEditDialogOpened}
            setIsOpened={setIsEditDialogOpened}
            title="Modifer le produit"
            description={
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AddEditProductForm
                    form={form}
                    setIsOpened={setIsEditDialogOpened}
                    isLoading={isLoading}
                    isEdit
                  />
                </form>
              </Form>
            }
          >
            <Button className="w-full" variant="ghost">
              Modifier
              <ContextMenuShortcut>
                <PencilIcon className="w-4 h-4" />
              </ContextMenuShortcut>
            </Button>
          </CustomDialog>
        )}
        {canRemove && (
          <CustomDialog
            isOpened={isRemoveDialogOpened}
            setIsOpened={setIsRemoveDialogOpened}
            title="Supprimer la producte"
            description={
              <>
                <div>Êtes-vous sûr de vouloir supprimer cette producte ?</div>
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
                    variant="destructive"
                    onClick={removeProduct}
                  >
                    Supprimer
                  </LoadingButton>
                </div>
              </>
            }
          >
            <Button
              className="w-full text-destructive hover:text-destructive"
              variant="ghost"
            >
              Supprimer
              <ContextMenuShortcut>
                <TrashIcon className="w-4 h-4 text-destructive" />
              </ContextMenuShortcut>
            </Button>
          </CustomDialog>
        )}
      </ContextMenuContent>
    )
  );
};
