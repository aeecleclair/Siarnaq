import { ProductVariantComplete } from "@/api";
import {
  ContextMenuShortcut,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import { CustomDialog } from "../CustomDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  TrashIcon,
  PencilIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { AddEditVariantForm } from "./AddEditVariantForm";

interface VariantCardOptionsProps {
  variant: ProductVariantComplete;
  canEdit?: boolean;
  canRemove?: boolean;
}

export const VariantCardOptions = ({
  variant,
  canEdit,
  canRemove,
}: VariantCardOptionsProps) => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);
  return (
    <ContextMenuContent className="w-40">
      {canEdit && (
        <CustomDialog
          isOpened={isEditDialogOpened}
          setIsOpened={setIsEditDialogOpened}
          isLoading={false}
          title="Modifer la variante"
          description={<AddEditVariantForm variant={variant}/>}
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
