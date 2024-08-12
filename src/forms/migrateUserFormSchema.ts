import { z } from "zod";

const validEmailRegex = /^[\w\-.]*@etu(-enise)?\.ec-lyon\.fr$/;

export const migrateUserFormSchema = z.object({
  nickname: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Veuillez renseigner l'email de Centrale",
    })
    .refine((email) => validEmailRegex.test(email), {
      message: "Veuillez renseigner un email de Centrale",
    }),
  floor: z.enum(
    [
      "Autre",
      "Adoma",
      "Exte",
      "T1",
      "T2",
      "T3",
      "T4",
      "T56",
      "U1",
      "U2",
      "U3",
      "U4",
      "U56",
      "V1",
      "V2",
      "V3",
      "V45",
      "V6",
      "X1",
      "X2",
      "X3",
      "X4",
      "X5",
      "X6",
    ],
    {
      required_error: "Veuillez renseigner l'étage",
    },
  ),
});
