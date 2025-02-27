import { optional, z } from "zod";
import { EmployeSchema } from "./employe.schema";
import { AgendaSchema } from "./agenda.schema";

export const LivreurSchema = EmployeSchema.extend({
  disponibilite: AgendaSchema,
  dateExpirationPermis: z.date().optional(),
  aPermis: z.boolean(),
  affecte: z.boolean().optional(),
  entrepot: z.any().optional(),
});

export type Livreur = z.infer<typeof LivreurSchema>;
