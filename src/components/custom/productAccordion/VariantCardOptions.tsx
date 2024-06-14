import { CustomDialog } from "../CustomDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";
import {
  ProductVariantComplete,
  ProductVariantEdit,
  patchCdrSellersSellerIdProductsProductIdVariantsVariantId,
} from "@/api";
import { Button } from "@/components/ui/button";
import {
  ContextMenuShortcut,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import { Form } from "@/components/ui/form";
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const body: ProductVariantEdit = {
      ...values,
      price: parseFloat(values.price),
      unique: values.unique === "unique",
      enabled: true,
    };
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
    refreshProduct();
    setIsEditDialogOpened(false);
    setIsLoading(false);
    form.reset(values);
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
          <Button className="w-full" variant="ghost">
            Désactiver
            <ContextMenuShortcut>
              <StopIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </Button>
        )}
        {!variant.enabled && canDisable && (
          <Button className="w-full" variant="ghost">
            Activer
            <ContextMenuShortcut>
              <PlayIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </Button>
        )}
        {canRemove && (
          <CustomDialog
            isOpened={isRemoveDialogOpened}
            setIsOpened={setIsRemoveDialogOpened}
            // isLoading={false}
            title="Supprimer la variante"
            description="Êtes-vous sûr de vouloir supprimer cette variante ?"
            // validateLabel="Supprimer"
            // callback={() => {}}
            // variant="destructive"
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
