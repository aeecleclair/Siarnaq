import { MultiSelect } from "../MultiSelect";
import { PriceInput } from "../PriceInput";
import {
  CurriculumComplete,
  ProductVariantComplete,
  getCdrCurriculums,
} from "@/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AddEditVariantFormProps {
  variant?: ProductVariantComplete;
  nameEn: string;
  setNameEn: (arg0: string) => void;
  descriptionEn: string;
  setDescriptionEn: (arg0: string) => void;
  price: number;
  setPrice: (arg0: number) => void;
  curriculum: string[];
  setCurriculum: Dispatch<SetStateAction<string[]>>;
  unique: string;
  setUnique: (arg0: string) => void;
}

export const AddEditVariantForm = ({
  variant,
  nameEn,
  setNameEn,
  descriptionEn,
  setDescriptionEn,
  price,
  setPrice,
  curriculum,
  setCurriculum,
  unique,
  setUnique,
}: AddEditVariantFormProps) => {
  const [curriculums, setCurriculums] = useState<CurriculumComplete[]>([]);
  useEffect(() => {
    const onGetCdrCurriculums = async () => {
      const { data, error } = await getCdrCurriculums({});
      if (error) {
        console.log(error);
        return;
      }
      setCurriculums(data!);
    };
    onGetCdrCurriculums();
  }, []);

  return (
    <div className="grid gap-6 mt-4">
      <div className="grid gap-2">
        <Label htmlFor="subject">Nom</Label>
        <Input
          id="subject"
          placeholder={variant?.name_en}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Prix</Label>
          <PriceInput
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="curriculum">Cursus</Label>
          <MultiSelect
            options={curriculums.map((c) => {
              return { value: c.id, label: c.name };
            })}
            selected={curriculum}
            onChange={setCurriculum}
            className="w-64"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Achat</Label>
        <RadioGroup
          value={unique}
          onChange={(e) => setUnique((e.target as HTMLInputElement).value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unique" id="unique" />
            <Label htmlFor="unique">
              {"Ne peux être acheté qu'une seule fois"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiple" id="multiple" />
            <Label htmlFor="multiple">
              Peux être acheter autant de fois que souhaité
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
