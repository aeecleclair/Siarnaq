import { AddEditProductForm } from "./AddEditProductForm";
import { SellerComplete, postCdrSellersSellerIdProducts } from "@/api";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

interface AddProductAccordionItemProps {
  seller: SellerComplete;
  setRefetchSellers: (arg0: boolean) => void;
}

export const AddProductAccordionItem = ({
  seller,
  setRefetchSellers,
}: AddProductAccordionItemProps) => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);

  const [nameEn, setNameEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [availableOnline, setAvailableOnline] = useState<string>("false");

  const onAddProduct = async () => {
    const { data, error } = await postCdrSellersSellerIdProducts({
      path: {
        seller_id: seller.id,
      },
      body: {
        name_fr: nameEn,
        name_en: nameEn,
        description_fr: descriptionEn,
        description_en: descriptionEn,
        available_online: availableOnline === "true",
      },
    });
    if (error) {
      console.log(error);
      return;
    }
    setRefetchSellers(true);
  };

  return (
    <CustomDialog
      title="New Product"
      description={
        <AddEditProductForm
          nameEn={nameEn}
          setNameEn={setNameEn}
          descriptionEn={descriptionEn}
          setDescriptionEn={setDescriptionEn}
          availableOnline={availableOnline}
          setAvailableOnline={setAvailableOnline}
        />
      }
      validateLabel="Add"
      callback={onAddProduct}
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
      isLoading={false}
    >
      <div className="flex flex-1 items-center justify-start py-4 font-medium border-b cursor-pointer">
        <HiPlus className="w-4 h-4 mr-6" />
        <h3 className="text-lg font-semibold">New Product</h3>
      </div>
    </CustomDialog>
  );
};
