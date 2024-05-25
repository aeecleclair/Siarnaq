import { Card, CardContent } from "../../ui/card";
import { HiPlus } from "react-icons/hi";
import { CustomDialog } from "../CustomDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";
import { useState } from "react";

export const AddingVariantCard = () => {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  return (
    <CustomDialog
      isOpened={isAddDialogOpened}
      setIsOpened={setIsAddDialogOpened}
      isLoading={false}
      title="Ajouter une variante"
      description={<AddEditVariantForm />}
      validateLabel="Ajouter"
      callback={() => {}}
    >
      <Card className={`min-w-40 min-h-24`}>
        <CardContent className="flex flex-col items-center justify-center m-auto h-full p-0">
          <HiPlus className="w-8 h-8" />
        </CardContent>
      </Card>
    </CustomDialog>
  );
};
