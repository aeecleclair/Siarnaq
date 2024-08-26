import { z } from "zod";

export const variantFormSchema = z.object({
  name_fr: z
    .string({
      required_error: "Veuillez renseigner le nom de la variante",
    })
    .min(1, {
      message: "Veuillez renseigner le nom de la variante",
    }),
  name_en: z.string().optional(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  price: z
    .string({
      required_error: "Veuillez renseigner le prix du produit",
    })
    .min(0, {
      message: "Veuillez renseigner le prix du produit",
    }),
  unique: z.enum(["unique", "multiple"], {
    required_error: "Veuillez renseigner la quantité du produit",
  }),
  allowed_curriculum: z.array(z.string(), {
    required_error: "Veuillez renseigner les cursus autorisés",
  }),
});
