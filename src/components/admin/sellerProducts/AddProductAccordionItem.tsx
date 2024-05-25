import { SellerComplete } from "@/api/hyperionSchemas";
import { CustomDialog } from "@/components/custom/CustomDialog";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { AddEditProductForm } from "./AddEditProductForm";

interface AddProductAccordionItemProps {
  seller: SellerComplete;
}

export const AddProductAccordionItem = ({
  seller,
}: AddProductAccordionItemProps) => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  return (
    <CustomDialog
      title="New Product"
      description={<AddEditProductForm />}
      validateLabel="Add"
      callback={() => {}}
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
      isLoading={false}
    >
      <div className="flex flex-1 items-center justify-between py-4 font-medium border-b hover:underline">
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">New Product</h3>
          <p className="text-sm text-gray-500">{`Add a product to ${seller.name}`}</p>
        </div>
        <HiPlus className="w-4 h-4" />
      </div>
    </CustomDialog>
  );
};
