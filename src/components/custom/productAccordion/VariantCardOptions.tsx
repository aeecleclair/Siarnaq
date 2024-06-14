import { CustomDialog } from "../CustomDialog";
import { AddEditVariantForm } from "./AddEditVariantForm";
import { ProductVariantComplete } from "@/api";
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
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
}

export const VariantCardOptions = ({
  variant,
  canEdit,
  canRemove,
  canDisable,
}: VariantCardOptionsProps) => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);
  return (
    (canEdit || canRemove || canDisable) && (
      <ContextMenuContent className="w-40">
        {canEdit && (
          <CustomDialog
            isOpened={isEditDialogOpened}
            setIsOpened={setIsEditDialogOpened}
            // isLoading={false}
            title="Modifer la variante"
            description={<></>}
            // validateLabel="Modifier"
            // callback={() => {}}
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
