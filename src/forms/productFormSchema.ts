import { z } from "zod";

export const productFormSchema = z
  .object({
    id: z.string().optional(),
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
    product_constraints: z.array(z.string()),
    document_constraints: z.array(z.string()),
    generate_ticket: z.boolean(),
    ticket_max_use: z
      .string()
      .refine(
        (value) => {
          const parsedValue = parseInt(value);
          return !isNaN(parsedValue) && parsedValue >= 1;
        },
        { message: "Un ticket doit être utilisé au moins une fois" },
      )
      .refine(
        (value) => {
          const isInt = /^\d+$/.test(value);
          return isInt;
        },
        { message: "Veuillez renseigner un nombre entier" },
      )
      .optional(),
    ticket_expiration: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.generate_ticket && !data.ticket_expiration) {
      ctx.addIssue({
        path: ["ticket_expiration"],
        code: z.ZodIssueCode.custom,
        message: "Veuillez renseigner la date d'expiration du ticket",
      });
    }
  });
