import { z } from "zod";
import { EmployeSchema } from "./employe.schema";
import { AgendaSchema } from "./agenda.schema";

export const LivreurSchema = EmployeSchema.extend({
  disponibilite: AgendaSchema,
  dateExpirationPermis: z.date(),
  affecte: z.boolean().optional(),
  entrepot: z.any().optional(),
});

export type Livreur = z.infer<typeof LivreurSchema>;
