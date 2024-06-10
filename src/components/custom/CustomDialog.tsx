import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { LoadingButton } from "./LoadingButton";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface CustomDialogProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  isLoading: boolean;
  title: string;
  description: string | JSX.Element;
  validateLabel?: string;
  callback?: () => void;
  width?: string;
  children?: React.ReactNode;
  variant?:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null;
}

export const CustomDialog = ({
  isOpened,
  setIsOpened,
  isLoading,
  title,
  description,
  validateLabel,
  callback,
  width = "w-[100px]",
  children,
  variant = "default",
}: CustomDialogProps) => {
  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }

  function onValidate(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (callback) callback();
    setIsOpened(false);
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild className="w-full">
        {children}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <div className="flex justify-end mt-2 space-x-4">
          <Button
            variant="outline"
            onClick={closeDialog}
            disabled={isLoading}
            className={width}
          >
            Annuler
          </Button>
          <LoadingButton
            isLoading={isLoading}
            onClick={onValidate}
            label={validateLabel}
            className={width}
            variant={variant}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
