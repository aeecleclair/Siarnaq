import { Messages } from "next-intl";
import z from "zod";

export default function curriculumFormSchema(
  t: (arg: keyof Messages["curriculumFormSchema"]) => string,
) {
  return z.object({
    name: z
      .string({
        required_error: t("name"),
      })
      .min(1, {
        message: t("name"),
      }),
  });
}
