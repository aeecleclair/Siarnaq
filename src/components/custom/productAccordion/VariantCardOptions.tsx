import { CustomDialog } from "../CustomDialog";
import { LoadingButton } from "../LoadingButton";
import { AddEditVariantForm } from "./AddEditVariantForm";
import {
  ProductVariantComplete,
  ProductVariantEdit,
  deleteCdrSellersSellerIdProductsProductIdVariantsVariantId,
  patchCdrSellersSellerIdProductsProductIdVariantsVariantId,
} from "@/api";
import { Button } from "@/components/ui/button";
import {
  ContextMenuShortcut,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import { Form } from "@/components/ui/form";
import { variantFormSchema } from "@/forms/variantFormSchema";
import {
  TrashIcon,
  PencilIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface VariantCardOptionsProps {
  variant: ProductVariantComplete;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  sellerId: string;
  productId: string;
  refreshProduct: () => void;
}

export const VariantCardOptions = ({
  variant,
  canEdit,
  canRemove,
  canDisable,
  sellerId,
  productId,
  refreshProduct,
}: VariantCardOptionsProps) => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof variantFormSchema>>({
    resolver: zodResolver(variantFormSchema),
    mode: "onBlur",
    defaultValues: {
      name_en: variant.name_en,
      name_fr: variant.name_fr,
      description_en: variant?.description_en || undefined,
      description_fr: variant?.description_fr || undefined,
      price: variant.price.toString(),
      unique: variant.unique ? "unique" : "multiple",
      allowed_curriculum:
        variant.allowed_curriculum?.map((curriculum) => curriculum.id) || [],
    },
  });

  async function patchVariant(body: ProductVariantEdit) {
    const { data, error } =
      await patchCdrSellersSellerIdProductsProductIdVariantsVariantId({
        path: {
          variant_id: variant.id,
          seller_id: sellerId,
          product_id: productId,
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

  async function onSubmit(values: z.infer<typeof variantFormSchema>) {
    setIsLoading(true);
    const body: ProductVariantEdit = {
      ...values,
      price: parseFloat(values.price),
      unique: values.unique === "unique",
      enabled: true,
    };
    await patchVariant(body);
    refreshProduct();
    setIsEditDialogOpened(false);
    setIsLoading(false);
    form.reset(values);
  }

  async function toggleEnabled() {
    console.log("toggleEnabled");
    setIsLoading(true);
    const body: ProductVariantEdit = {
      enabled: !variant.enabled,
    };
    await patchVariant(body);
    refreshProduct();
    setIsLoading(false);
  }

  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsRemoveDialogOpened(false);
  }

  async function removeVariant() {
    setIsLoading(true);
    const { data, error } =
      await deleteCdrSellersSellerIdProductsProductIdVariantsVariantId({
        path: {
          variant_id: variant.id,
          seller_id: sellerId,
          product_id: productId,
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
    (canEdit || canRemove || canDisable) && (
      <ContextMenuContent className="w-40">
        {canEdit && (
          <CustomDialog
            isOpened={isEditDialogOpened}
            setIsOpened={setIsEditDialogOpened}
            title="Modifer la variante"
            description={
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AddEditVariantForm
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
        {variant.enabled && canDisable && (
          <LoadingButton
            className="w-full"
            variant="ghost"
            onClick={toggleEnabled}
            isLoading={isLoading}
          >
            Désactiver
            <ContextMenuShortcut>
              <StopIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </LoadingButton>
        )}
        {!variant.enabled && canDisable && (
          <LoadingButton
            className="w-full"
            variant="ghost"
            onClick={toggleEnabled}
            isLoading={isLoading}
          >
            Activer
            <ContextMenuShortcut>
              <PlayIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </LoadingButton>
        )}
        {canRemove && (
          <CustomDialog
            isOpened={isRemoveDialogOpened}
            setIsOpened={setIsRemoveDialogOpened}
            title="Supprimer la variante"
            description={
              <>
                <div>Êtes-vous sûr de vouloir supprimer cette variante ?</div>
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
                    onClick={removeVariant}
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
