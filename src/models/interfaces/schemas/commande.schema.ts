import { z } from "zod";
import { ClientSchema } from "./client.schema";
import { EntrepotSchema } from "./entrepot.schema";

export const CommandeSchema = z.object({
  reference: z.string().min(3),
  etat: z.string(),
  date: z.union([z.date(), z.string()]).optional(),
  horairePreferable: z.string().optional(),
  dateLivre: z.union([z.date(), z.string()]).optional(),
  dateLivraisonEstimee: z.string().optional(),
  montantTotal: z.number().optional(),
  client: ClientSchema,
  tournee: z.any().optional(),
  entrepot: EntrepotSchema.optional(),
});

export type Commande = z.infer<typeof CommandeSchema>;
