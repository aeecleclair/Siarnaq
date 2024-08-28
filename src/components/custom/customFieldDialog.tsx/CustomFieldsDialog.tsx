import { CustomDataFieldComplete } from "@/api";
import React, { useState } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";
import { LoadingButton } from "../LoadingButton";
import { Answer, CustomFieldInput } from "./CustomFieldInput";

interface CustomFieldsDialogProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  isLoading: boolean;
  productFields: CustomDataFieldComplete[];
  onValidate: (answers: Record<string, Answer>) => void;
  sellerId: string;
  productId: string;
  userId: string;
  children?: React.ReactNode;
}

export const CustomFieldsDialog = ({
  isOpened,
  setIsOpened,
  isLoading,
  productFields,
  onValidate,
  sellerId,
  productId,
  userId,
  children,
}: CustomFieldsDialogProps) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      {children && <DialogTrigger className="w-full">{children}</DialogTrigger>}
      <DialogContent
        className="sm:max-w-[600px] m-0 p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <ScrollArea className="max-h-[80vh] px-6">
          <DialogHeader className="pt-6 m-1">
            <DialogTitle>Informations supplémentaire</DialogTitle>
          </DialogHeader>
          <DialogDescription className="py-6 m-1">
            {productFields.map((field) => (
              <CustomFieldInput
                key={field.id}
                field={field}
                answers={answers}
                setAnswers={setAnswers}
                sellerId={sellerId}
                productId={productId}
                userId={userId}
              />
            ))}
            <div className="flex justify-end mt-4 space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsOpened(false)}
                disabled={isLoading}
                className="w-[100px]"
              >
                Annuler
              </Button>
              <LoadingButton
                isLoading={isLoading}
                className="w-[100px]"
                type="button"
                onClick={() => onValidate(answers)}
              >
                {"Valider"}
              </LoadingButton>
            </div>
          </DialogDescription>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
