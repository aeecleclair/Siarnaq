import { app__modules__cdr__schemas_cdr__ProductComplete } from "@/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddEditProductFormProps {
  product?: app__modules__cdr__schemas_cdr__ProductComplete;
  nameEn: string,
  setNameEn: (arg0: string) => void,
  descriptionEn: string,
  setDescriptionEn: (arg0: string) => void,
  availableOnline: string,
  setAvailableOnline: (arg0: string) => void
}

export const AddEditProductForm = ({ product, nameEn, setNameEn, descriptionEn, setDescriptionEn, availableOnline, setAvailableOnline }: AddEditProductFormProps) => {

  return (
    <div className="grid gap-6 mt-4">
      <div className="grid gap-2">
        <Label htmlFor="subject">Nom</Label>
        <Input id="subject" placeholder={product?.name_en} value={nameEn} onChange={e=>setNameEn(e.target.value)}/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={descriptionEn}
          onChange={e=>setDescriptionEn(e.target.value)}
          id="description"
          placeholder={product?.description_en ?? undefined}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Disponibilité</Label>
        <RadioGroup
          defaultValue={
            product?.available_online ? "available_online" : "false"
          }
          value={availableOnline}
          onChange={e=>setAvailableOnline((e.target as HTMLInputElement).value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="available_online" />
            <Label htmlFor="available_online">
              {"Est disponible lors de la chaîne de rentrée en ligne"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="onsite" />
            <Label htmlFor="onsite">
              {
                "Ne sera disponible que lors de la chaîne de rentrée en physique"
              }
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
