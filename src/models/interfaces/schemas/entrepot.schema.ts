import { z } from "zod";
import { AdresseSchema } from "./adresse.schema";

export const EntrepotSchema = z.object({
  nom: z.string().min(3),
  adresse: AdresseSchema.optional(),
  livreurs: z.array(z.any()).optional(),
  camions: z.array(z.any()).optional(),
  commandes: z.array(z.any()).optional(),
});

export type Entrepot = z.infer<typeof EntrepotSchema>;
