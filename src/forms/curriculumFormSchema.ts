import { z } from "zod";

export const curriculumFormSchema = z.object({
  name: z
    .string({
      required_error: "Veuillez renseigner le nom de la variante",
    })
    .min(1, {
      message: "Veuillez renseigner le nom de la variante",
    }),
});
