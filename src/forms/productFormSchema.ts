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
    name_en: z.string().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    available_online: z.enum(["true", "false"], {
      required_error: "Veuillez renseigner la disponibilité du produit",
    }),
    data_field_name: z.string().optional(),
    data_fields: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
        product_id: z.string(),
      }),
    ),
    product_constraints: z.array(z.string()),
    document_constraints: z.array(z.string()),
    ticket_name: z.string().optional(),
    ticket_max_use: z
      .string()
      .refine(
        (value) => {
          if (!value) return true;
          const parsedValue = parseInt(value);
          return !isNaN(parsedValue) && parsedValue >= 1;
        },
        { message: "Un ticket doit être utilisé au moins une fois" },
      )
      .refine(
        (value) => {
          if (!value) return true;
          const isInt = /^\d+$/.test(value);
          return isInt;
        },
        { message: "Veuillez renseigner un nombre entier" },
      )
      .optional(),
    ticket_expiration: z.date().optional(),
    tickets: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
        max_use: z.number(),
        expiration: z.date(),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    if (
      // at least one of the fields is empty AND one is full => incomplete ticket
      (!data.ticket_name || !data.ticket_max_use || !data.ticket_expiration) &&
      (data.ticket_name || data.ticket_expiration)
    ) {
      if (!data.ticket_name)
        ctx.addIssue({
          path: ["ticket_name"],
          code: z.ZodIssueCode.custom,
          message: "Veuillez renseigner le nom du ticket",
        });
      if (!data.ticket_max_use)
        ctx.addIssue({
          path: ["ticket_max_use"],
          code: z.ZodIssueCode.custom,
          message:
            "Veuillez renseigner le nombre d'utilisations maximum du ticket",
        });
      if (!data.ticket_expiration)
        ctx.addIssue({
          path: ["ticket_expiration"],
          code: z.ZodIssueCode.custom,
          message: "Veuillez renseigner la date d'expiration du ticket",
        });
    }
  });
