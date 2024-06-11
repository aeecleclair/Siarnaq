import { Card, CardContent } from "../../ui/card";
import { CustomDialog } from "../CustomDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";
import {
  app__modules__cdr__schemas_cdr__ProductComplete,
  postCdrSellersSellerIdProductsProductIdVariants,
  postCdrSellersSellerIdProductsProductIdVariantsVariantIdCurriculumsCurriculumId,
} from "@/api";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

interface AddingVariantCardProps {
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  setRefetchSellers: (arg0: boolean) => void;
}

export const AddingVariantCard = ({
  product,
  setRefetchSellers,
}: AddingVariantCardProps) => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [nameEn, setNameEn] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [unique, setUnique] = useState<string>("false");

  const onAddVariant = async () => {
    console.log("add");
    const { data, error } =
      await postCdrSellersSellerIdProductsProductIdVariants({
        path: {
          seller_id: product.seller_id,
          product_id: product.id,
        },
        body: {
          name_fr: nameEn,
          name_en: nameEn,
          description_fr: descriptionEn ?? undefined,
          description_en: descriptionEn ?? undefined,
          price: price,
          enabled: true,
          unique: unique === "true",
        },
      });
    if (error) {
      console.log(error);
      return;
    }
    if (!data?.id) return;
    curriculum.map(async (c) => {
      await postCdrSellersSellerIdProductsProductIdVariantsVariantIdCurriculumsCurriculumId(
        {
          path: {
            seller_id: product.seller_id,
            product_id: product.id,
            variant_id: data.id,
            curriculum_id: c,
          },
        },
      );
    });
    setRefetchSellers(true);
  };

  return (
    <CustomDialog
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
      isLoading={false}
      title="Ajouter une variante"
      description={
        <AddEditVariantForm
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
      validateLabel="Ajouter"
      callback={onAddVariant}
    >
      <Card className={`min-w-40 min-h-24`}>
        <CardContent className="flex flex-col items-center justify-center m-auto h-full p-0">
          <HiPlus className="w-8 h-8" />
        </CardContent>
      </Card>
    </CustomDialog>
  );
};
