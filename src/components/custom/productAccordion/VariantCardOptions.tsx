import { CustomDialog } from "../CustomDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";
import {
  ProductVariantComplete,
  app__modules__cdr__schemas_cdr__ProductComplete,
  deleteCdrSellersSellerIdProductsProductIdVariantsVariantIdCurriculumsCurriculumId,
  patchCdrSellersSellerIdProductsProductIdVariantsVariantId,
  postCdrSellersSellerIdProductsProductIdVariants,
  postCdrSellersSellerIdProductsProductIdVariantsVariantIdCurriculumsCurriculumId,
} from "@/api";
import { Button } from "@/components/ui/button";
import {
  ContextMenuShortcut,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import {
  TrashIcon,
  PencilIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface VariantCardOptionsProps {
  variant: ProductVariantComplete;
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  setRefetchSellers: (arg0: boolean) => void;
  canEdit?: boolean;
  canRemove?: boolean;
}

export const VariantCardOptions = ({
  variant,
  product,
  setRefetchSellers,
  canEdit,
  canRemove,
}: VariantCardOptionsProps) => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);

  const [nameEn, setNameEn] = useState<string>(variant.name_en);
  const [descriptionEn, setDescriptionEn] = useState<string>(
    variant.description_en ?? "",
  );
  const [price, setPrice] = useState<number>(variant.price);
  const [curriculum, setCurriculum] = useState<string[]>(
    variant.allowed_curriculum?.map((c) => c.id) ?? [],
  );
  const [unique, setUnique] = useState<string>(
    variant.unique ? "true" : "false",
  );

  const onAddVariant = async () => {
    console.log("add");
    const { data, error } =
      await patchCdrSellersSellerIdProductsProductIdVariantsVariantId({
        path: {
          seller_id: product.seller_id,
          product_id: variant.product_id,
          variant_id: variant.id,
        },
        body: {
          name_fr: nameEn === variant.name_en ? undefined : nameEn,
          name_en: nameEn === variant.name_en ? undefined : nameEn,
          description_fr:
            descriptionEn === variant.description_en
              ? undefined
              : descriptionEn,
          description_en:
            descriptionEn === variant.description_en
              ? undefined
              : descriptionEn,
          price: price === variant.price ? undefined : price,
          enabled: true,
          unique: unique === "true",
        },
      });
    if (error) {
      console.log(error);
      return;
    }
    curriculum.map(async (c) => {
      if (!(c in (variant.allowed_curriculum ?? []).map((d) => d.id))) {
        await postCdrSellersSellerIdProductsProductIdVariantsVariantIdCurriculumsCurriculumId(
          {
            path: {
              seller_id: product.seller_id,
              product_id: variant.product_id,
              variant_id: variant.id,
              curriculum_id: c,
            },
          },
        );
      }
    });
    variant.allowed_curriculum?.map(async (c) => {
      if (!(c.id in curriculum)) {
        await deleteCdrSellersSellerIdProductsProductIdVariantsVariantIdCurriculumsCurriculumId(
          {
            path: {
              seller_id: product.seller_id,
              product_id: variant.product_id,
              variant_id: variant.id,
              curriculum_id: c.id,
            },
          },
        );
      }
    });
    setRefetchSellers(true);
  };

  return (
    <ContextMenuContent className="w-40">
      {canEdit && (
        <CustomDialog
          isOpened={isEditDialogOpened}
          setIsOpened={setIsEditDialogOpened}
          isLoading={false}
          title="Modifer la variante"
          description={
            <AddEditVariantForm
              variant={variant}
              nameEn={nameEn}
              descriptionEn={descriptionEn}
              price={price}
              unique={unique}
              curriculum={curriculum}
              setNameEn={setNameEn}
              setDescriptionEn={setDescriptionEn}
              setPrice={setPrice}
              setUnique={setUnique}
              setCurriculum={setCurriculum}
            />
          }
          validateLabel="Modifier"
          callback={() => {}}
        >
          <Button className="w-full" variant="ghost">
            Modifier
            <ContextMenuShortcut>
              <PencilIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </Button>
        </CustomDialog>
      )}
      {variant.enabled && (
        <Button className="w-full" variant="ghost">
          Désactiver
          <ContextMenuShortcut>
            <StopIcon className="w-4 h-4" />
          </ContextMenuShortcut>
        </Button>
      )}
      {!variant.enabled && (
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
          isLoading={false}
          title="Supprimer la variante"
          description="Êtes-vous sûr de vouloir supprimer cette variante ?"
          validateLabel="Supprimer"
          callback={() => {}}
          variant="destructive"
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
  );
};
