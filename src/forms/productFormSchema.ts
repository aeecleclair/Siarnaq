import { z } from "zod";

export const productFormSchema = z.object({
  name_fr: z
    .string({
      required_error: "Veuillez renseigner le nom du produit",
    })
    .min(1, {
      message: "Veuillez renseigner le nom du produit",
    }),
  name_en: z
    .string({
      required_error: "Veuillez renseigner le nom du produit",
    })
    .min(1, {
      message: "Veuillez renseigner le nom du produit",
    }),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  available_online: z.enum(["true", "false"], {
    required_error: "Veuillez renseigner la disponibilité du produit",
  }),
});
