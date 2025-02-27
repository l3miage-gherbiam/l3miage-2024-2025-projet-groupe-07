import { z } from "zod";
import { AdresseSchema } from "./adresse.schema";

export const ClientSchema = z.object({
  code: z.string().min(3),
  email: z.string().email("Email invalide"),
  prenom: z.string().min(2),
  nom: z.string().min(2),
  telephone: z.string().optional(),
  adresse: AdresseSchema,
});

export type Client = z.infer<typeof ClientSchema>;
