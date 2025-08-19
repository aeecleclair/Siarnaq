import {
  ProductVariantComplete,
  ProductVariantEdit,
  deleteCdrSellersSellerIdProductsProductIdVariantsVariantId,
  patchCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId,
  patchCdrSellersSellerIdProductsProductIdVariantsVariantId,
  postCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId,
} from "@/api";
import { Button } from "@/components/ui/button";
import {
  ContextMenuContent,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { variantFormSchema } from "@/forms/variantFormSchema";
import { useSellerProductData } from "@/hooks/useSellerProductData";
import {
  PencilIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomDialog } from "../CustomDialog";
import { LoadingButton } from "../LoadingButton";
import { Answer } from "../customFieldDialog.tsx/CustomFieldInput";
import { CustomFieldsDialog } from "../customFieldDialog.tsx/CustomFieldsDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";

interface VariantCardOptionsProps {
  variant: ProductVariantComplete;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  sellerId: string;
  productId: string;
  userId: string;
  refreshProduct: () => void;
  isInterestProduct: boolean;
}

export const VariantCardOptions = ({
  variant,
  canEdit,
  canRemove,
  canDisable,
  sellerId,
  productId,
  userId,
  refreshProduct,
  isInterestProduct = false,
}: VariantCardOptionsProps) => {
  const { toast } = useToast();
  const { data: productFields } = useSellerProductData(sellerId, productId);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);
  const [isInfoDialogOpened, setIsInfoDialogOpened] = useState(false);
  const showInfo = productFields.length > 0;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof variantFormSchema>>({
    resolver: zodResolver(variantFormSchema),
    mode: "onBlur",
    defaultValues: {
      name_en: variant.name_en || undefined,
      name_fr: variant.name_fr,
      description_en: variant?.description_en || undefined,
      description_fr: variant?.description_fr || undefined,
      price: (variant.price / 100).toString(),
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
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      setIsEditDialogOpened(false);
      return;
    }
  }

  async function onSubmit(values: z.infer<typeof variantFormSchema>) {
    setIsLoading(true);
    const body: ProductVariantEdit = {
      ...values,
      price: Math.round(parseFloat(values.price) * 100),
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
      toast({
        title: "Error",
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      setIsRemoveDialogOpened(false);
      return;
    }
    refreshProduct();
    setIsRemoveDialogOpened(false);
    setIsLoading(false);
  }

  const onCustomFieldValidate = async (answers: Record<string, Answer>) => {
    setIsLoading(true);
    await Promise.all(
      productFields.map((field) => {
        if (!answers[field.id]) return;
        if (!answers[field.id].isNew) {
          patchCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId({
            body: { value: answers[field.id].value },
            path: {
              seller_id: sellerId,
              product_id: productId,
              user_id: userId,
              field_id: field.id,
            },
          });
        } else {
          postCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId({
            body: { value: answers[field.id].value },
            path: {
              seller_id: sellerId,
              product_id: productId,
              user_id: userId,
              field_id: field.id,
            },
          });
        }
      }),
    );
    setIsInfoDialogOpened(false);
    setIsLoading(false);
  };

  return (
    (canEdit || canRemove || canDisable || showInfo) && (
      <ContextMenuContent className="w-40">
        {canEdit && (
          <CustomDialog
            isOpened={isEditDialogOpened}
            setIsOpened={setIsEditDialogOpened}
            title="Modifier la variante"
            isFullWidth
            description={
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AddEditVariantForm
                    form={form}
                    setIsOpened={setIsEditDialogOpened}
                    isLoading={isLoading}
                    isEdit
                    isInterestProduct={isInterestProduct}
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
        {showInfo && (
          <CustomFieldsDialog
            isOpened={isInfoDialogOpened}
            setIsOpened={setIsInfoDialogOpened}
            isLoading={isLoading}
            productFields={productFields}
            onValidate={onCustomFieldValidate}
            sellerId={sellerId}
            productId={productId}
            userId={userId}
          >
            <Button className="w-full" variant="ghost">
              Information
              <ContextMenuShortcut>
                <PencilIcon className="w-4 h-4" />
              </ContextMenuShortcut>
            </Button>
          </CustomFieldsDialog>
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
            isFullWidth
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
