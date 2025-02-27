import { z } from "zod";
import { AgendaSchema } from "./agenda.schema";

export const EquipeLivreursSchema = z.object({
  numEquipe: z.number().int().positive(),
  status: z.string(),
  livreurs: z.array(z.any()), 
  agenda: AgendaSchema.optional(),
});

export type EquipeLivreurs = z.infer<typeof EquipeLivreursSchema>;
