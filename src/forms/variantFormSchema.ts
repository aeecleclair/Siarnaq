import { Messages } from "next-intl";
import z from "zod";

export default function variantFormSchema(
  t: (arg: keyof Messages["variantFormSchema"]) => string,
) {
  return z.object({
    name_fr: z
      .string({
        required_error: t("nameFR"),
      })
      .min(1, {
        message: t("nameFR"),
      }),
    name_en: z.string().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    price: z
      .string({
        required_error: t("price"),
      })
      .min(0, {
        message: t("price"),
      }),
    unique: z.enum(["unique", "multiple"], {
      required_error: t("unique"),
    }),
    allowed_curriculum: z.array(z.string(), {
      required_error: t("allowedCurriculum"),
    }),
  });
}
