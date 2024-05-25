import { AppModulesCdrSchemasCdrProductComplete } from "@/api/hyperionSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddEditProductFormProps {
  product?: AppModulesCdrSchemasCdrProductComplete;
}

export const AddEditProductForm = ({ product }: AddEditProductFormProps) => {
  return (
    <div className="grid gap-6 mt-4">
      <div className="grid gap-2">
        <Label htmlFor="subject">Nom</Label>
        <Input id="subject" placeholder={product?.name_en} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder={product?.description_en ?? undefined}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Disponibilité</Label>
        <RadioGroup
          defaultValue={
            product?.available_online ? "available_online" : "onsite"
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available_online" id="available_online" />
            <Label htmlFor="available_online">
              {"Est disponible lors de la chaîne de rentrée en ligne"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onsite" id="onsite" />
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
