import { z } from "zod";

export const paymentFormSchema = z.object({
  total: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    { message: "Veuillez renseigner un montant valide" },
  ),
  payment_type: z.enum(["cash", "check", "HelloAsso", "card", "archived"], {
    required_error: "Veuillez renseigner le type de paiement",
  }),
});
