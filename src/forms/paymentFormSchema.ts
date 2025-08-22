import { Messages } from "next-intl";
import z from "zod";

export default function paymentFormSchema(
  t: (arg: keyof Messages["paymentFormSchema"]) => string,
) {
  // useTranslations("paymentFormSchema") (don't remove!)
  return z.object({
    total: z.string().refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 0;
      },
      { message: t("total") },
    ),
    payment_type: z.enum(["cash", "check", "HelloAsso", "card", "archived"], {
      required_error: t("paymentType"),
    }),
  });
}
