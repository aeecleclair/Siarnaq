import { MultiSelect } from "../MultiSelect";
import { PriceInput } from "../PriceInput";
import { ProductVariantComplete } from "@/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddEditVariantFormProps {
  variant?: ProductVariantComplete;
}

export const AddEditVariantForm = ({ variant }: AddEditVariantFormProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="grid gap-6 mt-4">
      <div className="grid gap-2">
        <Label htmlFor="subject">Nom</Label>
        <Input id="subject" placeholder={variant?.name_en} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder={variant?.description_en ?? undefined}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Prix</Label>
          <PriceInput id="price" value={variant?.price} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="curriculum">Cursus</Label>
          <MultiSelect
            options={[
              {
                value: "next.js",
                label: "Next.js",
              },
              {
                value: "sveltekit",
                label: "SvelteKit",
              },
              {
                value: "nuxt.js",
                label: "Nuxt.js",
              },
              {
                value: "remix",
                label: "Remix",
              },
              {
                value: "astro",
                label: "Astro",
              },
              {
                value: "wordpress",
                label: "WordPress",
              },
              {
                value: "express.js",
                label: "Express.js",
              },
            ]}
            selected={selected}
            onChange={setSelected}
            className="w-64"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Achat</Label>
        <RadioGroup defaultValue={variant?.unique ? "unique" : "multiple"}>
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
