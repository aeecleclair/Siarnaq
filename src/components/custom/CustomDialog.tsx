import { DialogTrigger } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface CustomDialogProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  title: string;
  description: string | JSX.Element;
  children?: React.ReactNode;
}

export const CustomDialog = ({
  isOpened,
  setIsOpened,
  title,
  description,
  children,
}: CustomDialogProps) => {
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
      </DialogContent>
    </Dialog>
  );
};
