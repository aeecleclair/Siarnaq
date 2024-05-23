import { DialogDescription } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoadingButton } from "../ui/loadingButton";
import { ParticipantPreview, TeamPreview } from "@/src/api/hyperionSchemas";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";

interface RemoveMemberDialogProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  isLoading: boolean;
  title: string;
  team: TeamPreview;
  validateLabel: string;
  callback: (participantId: string) => void;
}

const ParticipantCard = (
  participant: ParticipantPreview,
  selectedMember: ParticipantPreview | null,
  setSelectedMember: (value: ParticipantPreview | null) => void,
) => {
  return (
    <Card
      className={
        selectedMember === participant ? "border-2 border-primary " : "my-[1px]"
      }
      onClick={() => setSelectedMember(participant)}
    >
      <CardContent className="flex flex-col justify-between items-center">
        <div className="h-5"></div>
        <p className="text-lg font-semibold">
          {participant.firstname} {participant.name}
        </p>
        <p className="text-sm text-foreground-muted">{participant.email}</p>
      </CardContent>
    </Card>
  );
};

export const RemoveMemberDialog = ({
  isOpened,
  setIsOpened,
  isLoading,
  title,
  team,
  validateLabel,
  callback,
}: RemoveMemberDialogProps) => {
  const [selectedMember, setSelectedMember] =
    useState<ParticipantPreview | null>(null);

  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }

  function onValidate(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!selectedMember) return;
    callback(selectedMember?.id);
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent
        className="sm:max-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid gap-4 grid-cols-2 mt-2">
            {team.captain &&
              ParticipantCard(team.captain, selectedMember, setSelectedMember)}
            {team.second &&
              ParticipantCard(team.second, selectedMember, setSelectedMember)}
          </div>
        </DialogDescription>
        <div className="flex justify-end mt-2 space-x-4">
          <Button
            variant="outline"
            onClick={closeDialog}
            disabled={isLoading}
            className="w-[100px]"
          >
            Annuler
          </Button>
          <LoadingButton
            isLoading={isLoading}
            onClick={onValidate}
            label={validateLabel}
            className="w-[100px]"
            disabled={!selectedMember}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
